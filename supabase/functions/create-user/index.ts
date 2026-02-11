import { serve } from "std/http/server.ts";
import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
    // 0. Handle CORS preflight requests
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        console.log("--- Request Received ---");

        // 1. Validate Authorization Header
        const authHeader = req.headers.get("Authorization");
        if (!authHeader) {
            console.error("Missing Authorization header");
            return new Response(JSON.stringify({ error: "Missing Authorization header" }), {
                status: 401,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // 2. Initialize Clients
        const supabaseClient = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_ANON_KEY") ?? "",
            { global: { headers: { Authorization: authHeader } } }
        );

        const supabaseAdmin = createClient(
            Deno.env.get("SUPABASE_URL") ?? "",
            Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
        );

        // 3. User Authentication & Authorization (Manual)
        const { data: { user }, error: userError } = await supabaseClient.auth.getUser();

        if (userError || !user) {
            console.error("Auth Error:", userError);
            return new Response(JSON.stringify({ error: "Unauthorized", details: userError }), {
                status: 401,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // Verifying Super Admin Role
        const { data: profile, error: profileError } = await supabaseAdmin
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (profileError || !profile || profile.role !== "super_admin") {
            console.error("Forbidden: User is not super_admin", profile?.role);
            // Return 200 with error to ensure client sees the message
            return new Response(JSON.stringify({ error: "Forbidden: Only Super Admins can execute this action." }), {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // 4. Parse Request Body
        const body = await req.json();
        console.log("Request Body:", JSON.stringify(body));
        const { email, password, nombre, role, telefono, pais, ciudad } = body;

        if (!email || !password || !nombre) {
            return new Response(JSON.stringify({ error: "Faltan campos obligatorios: email, password, nombre" }), {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        if (password.length < 6) {
            return new Response(JSON.stringify({ error: "La contraseña debe tener al menos 6 caracteres" }), {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // 5. Check if user already exists (Idempotency)
        // Note: listUsers isn't perfect for search by email in all versions, but safer to try createUser and catch
        // We will proceed to create and handle error.

        // 6. Map Roles
        let dbRole = 'tallerista';
        if (role === 'Super Admin' || role === 'super_admin') dbRole = 'super_admin';

        console.log(`Creating user: ${email} with role ${dbRole}`);

        // 7. Create User via Admin API
        const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: {
                full_name: nombre,
                role: dbRole,
                telefono,
                pais,
                ciudad
            }
        });

        if (createError) {
            console.error("Create User API Error:", createError);
            // Return the specific error message from Supabase to the client
            let errorMessage = createError.message || "Error al crear el usuario en Supabase Auth";

            if (errorMessage.toLowerCase().includes("user already registered") || errorMessage.toLowerCase().includes("duplicate")) {
                errorMessage = "El correo electrónico ya está registrado.";
            }

            return new Response(JSON.stringify({
                error: errorMessage,
                details: createError
            }), {
                status: 200, // Changed from 400
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        console.log("User created successfully:", newUser);

        // ============================================================
        // CRITICAL: Auto-create Sede for Tallerista users
        // This prevents "orphan" users who can login but can't create
        // any records because get_owned_sede_id() returns NULL.
        // ============================================================
        let sedeResult = null;
        if (dbRole === 'tallerista' && newUser?.user?.id) {
            console.log("--- Creating Sede for new Tallerista ---");
            const sedeName = `Taller de ${nombre}`;
            const slug = nombre
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '') // Remove accents
                .replace(/[^a-z0-9\s-]/g, '')    // Remove special chars
                .replace(/\s+/g, '-')             // Spaces to hyphens
                .replace(/-+/g, '-')              // Collapse multiple hyphens
                .trim();

            const { data: sedeData, error: sedeError } = await supabaseAdmin
                .from('sedes')
                .insert({
                    owner_id: newUser.user.id,
                    name: sedeName,
                    slug: slug || `taller-${newUser.user.id.substring(0, 8)}`,
                    is_active: true,
                    city: ciudad || null,
                    country: pais || null,
                })
                .select()
                .single();

            if (sedeError) {
                console.error("ERROR creating Sede:", sedeError);
                // Don't fail the whole request — user was created successfully.
                // The sede can be created manually or fixed later.
                sedeResult = { error: sedeError.message };
            } else {
                console.log("Sede created successfully:", sedeData);
                sedeResult = sedeData;
            }
        }

        return new Response(JSON.stringify({
            ...newUser,
            sede: sedeResult
        }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });

    } catch (error: any) {
        console.error("Function Logic Error:", error);
        return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
        });
    }
});
