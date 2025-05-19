export interface City {
    id: string;
    name: string;
    date: Date;
    venue: string;
    address: string;
    schedule: string;
    coordinates: {
        x: number; // Porcentaje en el mapa (0-100)
        y: number; // Porcentaje en el mapa (0-100)
    };
}

export const cities: City[] = [
    {
        id: "cuernavaca",
        name: "CUERNAVACA",
        date: new Date("2025-05-24T09:30:00"),
        venue: "Pista Cuautla Karts",
        address: "Liborio Martinez 5, 62766 Atlatlahucan, Mor.",
        schedule: "24 y 25 de Mayo - 09:30 AM a 06:00 PM",
        coordinates: { x: 61, y: 63 }
    },
    {
        id: "puebla",
        name: "PUEBLA",
        date: new Date("2025-05-31T09:30:00"),
        venue: "Próximamente",
        address: "",
        schedule: "09:30 AM a 06:00 PM",
        coordinates: { x: 64, y: 63 }
    },
    {
        id: "queretaro-leon",
        name: "QRO Y LEÓN",
        date: new Date("2025-06-14T09:30:00"),
        venue: "Autódromo Ecocentro",
        address: "Km. 5, Prol. Constituyentes S/N, El Marqués, 76047 Santiago de Querétaro, Qro.",
        schedule: "09:30 AM a 06:00 PM",
        coordinates: { x: 58, y: 56 }
    },
    {
        id: "morelia",
        name: "MORELIA",
        date: new Date("2025-06-21T09:30:00"),
        venue: "Próximamente",
        address: "",
        schedule: "09:30 AM a 06:00 PM",
        coordinates: { x: 52, y: 62 }
    },
    {
        id: "guadalajara",
        name: "GUADALAJARA",
        date: new Date("2025-06-28T09:30:00"),
        venue: "Próximamente",
        address: "",
        schedule: "09:30 AM a 06:00 PM",
        coordinates: { x: 46, y: 58 }
    },
    {
        id: "aguascalientes",
        name: "AGUASCALIENTES",
        date: new Date("2025-07-05T09:30:00"),
        venue: "Próximamente",
        address: "",
        schedule: "09:30 AM a 06:00 PM",
        coordinates: { x: 51, y: 52 }
    },
    {
        id: "monterrey",
        name: "MONTERREY",
        date: new Date("2025-07-12T09:30:00"),
        venue: "Próximamente",
        address: "",
        schedule: "09:30 AM a 06:00 PM",
        coordinates: { x: 59, y: 40 }
    }
];