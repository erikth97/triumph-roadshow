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
        id: "querétaro",
        name: "QUERÉTARO",
        date: new Date("2025-06-14T09:30:00"),
        venue: "Autódromo Ecocentro",
        address: "Km. 5, Prol. Constituyentes S/N, El Marqués, 76047 Santiago de Querétaro, Qro.",
        schedule: "09:30 AM a 02:00 PM",
        mapUrl: "https://maps.app.goo.gl/gSXnXQTazcxXypmt5",
        coordinates: { x: 58, y: 56 }
    },
    {
        id: "guadalajara",
        name: "GUADALAJARA",
        date: new Date("2025-06-28T09:30:00"),
        venue: "Próximamente",
        address: "",
        schedule: "09:30 AM a 02:00 PM",
        coordinates: { x: 46, y: 58 }
    },
    {
        id: "aguascalientes",
        name: "AGUASCALIENTES",
        date: new Date("2025-07-05T09:30:00"),
        venue: "Próximamente",
        address: "",
        schedule: "09:30 AM a 02:00 PM",
        coordinates: { x: 51, y: 52 }
    },
    {
        id: "monterrey",
        name: "MONTERREY",
        date: new Date("2025-07-12T09:30:00"),
        venue: "Próximamente",
        address: "",
        schedule: "09:30 AM a 02:00 PM",
        coordinates: { x: 59, y: 40 }
    }
];