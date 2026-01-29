
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { Workshop } from '../types';

interface MockMapProps {
  workshops: Workshop[];
  onPinClick: (workshop: Workshop) => void;
  selectedWorkshopId?: string;
}

export const MockMap: React.FC<MockMapProps> = ({ workshops, onPinClick, selectedWorkshopId }) => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<Record<string, L.Marker>>({});

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Initialize map
    // Centered roughly on Barcelona/Spain as in the requested FacilMap link
    mapRef.current = L.map(containerRef.current, {
        zoomControl: false // We use our own controls
    }).setView([41.3851, 2.1734], 13);

    // Use OpenStreetMap Mapnik style (standard FacilMap look)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapRef.current);

    // Add zoom control at bottom right
    L.control.zoom({
        position: 'bottomright'
    }).addTo(mapRef.current);

    return () => {
        if (mapRef.current) {
            mapRef.current.remove();
            mapRef.current = null;
        }
    };
  }, []);

  // Update markers when workshops or selection changes
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    
    // Clear old markers that aren't in current list
    const currentIds = new Set(workshops.map(w => w.id));
    Object.keys(markersRef.current).forEach(id => {
        if (!currentIds.has(id)) {
            markersRef.current[id].remove();
            delete markersRef.current[id];
        }
    });

    // Add/Update markers
    workshops.forEach(w => {
        const isSelected = selectedWorkshopId === w.id;
        const icon = L.divIcon({
            className: 'custom-div-icon',
            html: `<div class="marker-pin ${isSelected ? 'selected' : ''}"></div>`,
            iconSize: [30, 42],
            iconAnchor: [15, 42]
        });

        if (markersRef.current[w.id]) {
            markersRef.current[w.id].setLatLng([w.lat, w.lng]);
            markersRef.current[w.id].setIcon(icon);
            if (isSelected) markersRef.current[w.id].setZIndexOffset(1000);
            else markersRef.current[w.id].setZIndexOffset(0);
        } else {
            const marker = L.marker([w.lat, w.lng], { icon })
                .addTo(map)
                .on('click', () => onPinClick(w));
            markersRef.current[w.id] = marker;
        }
    });

    // If a workshop is selected, pan to it
    if (selectedWorkshopId && markersRef.current[selectedWorkshopId]) {
        const selectedW = workshops.find(w => w.id === selectedWorkshopId);
        if (selectedW) {
            map.panTo([selectedW.lat, selectedW.lng], { animate: true });
        }
    } else if (workshops.length > 0 && !selectedWorkshopId) {
        // Fit bounds if no selection and we have multiple workshops
        const group = L.featureGroup(Object.values(markersRef.current));
        if (group.getBounds().isValid()) {
            map.fitBounds(group.getBounds(), { padding: [50, 50], maxZoom: 15 });
        }
    }
  }, [workshops, selectedWorkshopId, onPinClick]);

  return (
    <div className="w-full h-full relative">
        <div ref={containerRef} className="w-full h-full rounded-xl border border-gray-200 overflow-hidden shadow-inner" />
        
        {/* Layer Badge Over map */}
        <div className="absolute top-4 right-4 z-[500] pointer-events-none">
            <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Leaflet + OSM Tiles
            </div>
        </div>
    </div>
  );
};
