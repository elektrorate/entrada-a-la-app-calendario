import { serve } from "std/http/server.ts";
import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("ok", { headers: corsHeaders });
    }

    try {
        console.log("--- DELETE USER Request ---");

        // 1. Validate Authorization
        const authHeader = req.headers.get("Authorization");
        if (!authHeader) {
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

        // 3. Verify caller is Super Admin
        const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
        if (userError || !user) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), {
                status: 401,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        const { data: profile } = await supabaseAdmin
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (!profile || profile.role !== "super_admin") {
            return new Response(JSON.stringify({ error: "Forbidden: Only Super Admins can delete users." }), {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // 4. Parse body — we need the userId to delete
        const body = await req.json();
        const { userId } = body;

        if (!userId) {
            return new Response(JSON.stringify({ error: "Falta el campo userId" }), {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        // 5. Prevent self-deletion
        if (userId === user.id) {
            return new Response(JSON.stringify({ error: "No puedes eliminarte a ti mismo" }), {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        console.log(`Deleting user: ${userId}`);

        // 6. Delete all related data using admin client (bypasses RLS)
        // Find sede owned by this user
        const { data: sede } = await supabaseAdmin
            .from("sedes")
            .select("id")
            .eq("owner_id", userId)
            .single();

        if (sede) {
            console.log(`Found sede: ${sede.id} — deleting all dependent data...`);
            // Delete in dependency order
            await supabaseAdmin.from("session_students").delete().eq("sede_id", sede.id);
            await supabaseAdmin.from("sessions").delete().eq("sede_id", sede.id);
            await supabaseAdmin.from("student_assigned_classes").delete().eq("sede_id", sede.id);
            await supabaseAdmin.from("students").delete().eq("sede_id", sede.id);
            await supabaseAdmin.from("teachers").delete().eq("sede_id", sede.id);
            await supabaseAdmin.from("pieces").delete().eq("sede_id", sede.id);
            await supabaseAdmin.from("gift_cards").delete().eq("sede_id", sede.id);
            await supabaseAdmin.from("inventory_movements").delete().eq("sede_id", sede.id);
            await supabaseAdmin.from("inventory_items").delete().eq("sede_id", sede.id);
            await supabaseAdmin.from("payments").delete().eq("sede_id", sede.id);
            await supabaseAdmin.from("sede_members").delete().eq("sede_id", sede.id);

            // Delete the sede
            const { error: sedeDelError } = await supabaseAdmin.from("sedes").delete().eq("id", sede.id);
            if (sedeDelError) console.error("Error deleting sede:", sedeDelError);
            else console.log("Sede deleted successfully");
        }

        // 7. Delete profile
        const { error: profileDelError } = await supabaseAdmin
            .from("profiles")
            .delete()
            .eq("id", userId);

        if (profileDelError) {
            console.error("Error deleting profile:", profileDelError);
        } else {
            console.log("Profile deleted successfully");
        }

        // 8. Delete Auth user (this is the key step that requires admin API)
        const { error: authDelError } = await supabaseAdmin.auth.admin.deleteUser(userId);

        if (authDelError) {
            console.error("Error deleting auth user:", authDelError);
            return new Response(JSON.stringify({
                error: `Error al eliminar usuario de Auth: ${authDelError.message}`
            }), {
                status: 200,
                headers: { ...corsHeaders, "Content-Type": "application/json" },
            });
        }

        console.log("Auth user deleted successfully");

        return new Response(JSON.stringify({
            success: true,
            message: "Usuario y todos sus datos eliminados correctamente"
        }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });

    } catch (error: any) {
        console.error("Function Error:", error);
        return new Response(JSON.stringify({ error: error.message || "Internal Server Error" }), {
            status: 200,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
    }
});
