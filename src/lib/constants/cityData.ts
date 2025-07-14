export interface City {
    id: string;
    name: string;
    date: Date;
    venue: string;
    address: string;
    schedule: string;
    mapUrl?: string; // URL de Google Maps, opcional para ciudades sin ubicación definida
    coordinates: {
        x: number; // Porcentaje en el mapa (0-100)
        y: number; // Porcentaje en el mapa (0-100)
    };
}

export const cities: City[] = [
    {
        id: "monterrey",
        name: "MONTERREY",
        date: new Date("2025-07-26T09:30:00"),
        venue: "SantiaGoBike renta de bicis \"Cielo Magico\"",
        address: "Calle Juan Tamez, Los Cavazos 67318 Santiago NL",
        schedule: "09:30 AM a 02:00 PM",
        coordinates: { x: 59, y: 40 }
    }
];