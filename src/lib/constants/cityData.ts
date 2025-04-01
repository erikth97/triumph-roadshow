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
        id: "puebla",
        name: "PUEBLA",
        date: new Date("2025-05-15T09:30:00"),
        venue: "AUTÓDROMO MIGUEL E. ABED",
        address: "Km 16.5 Autopista México-Puebla, Amozoc, Puebla",
        schedule: "09:30 AM a 06:00 PM",
        coordinates: { x: 64, y: 68 }
    },
    {
        id: "queretaro",
        name: "QUERÉTARO",
        date: new Date("2025-05-19T09:30:00"),
        venue: "CONSTITUYENTES QUERÉTARO",
        address: "Av Constituyentes 57 Esq Fray Pedro, Col Cimatario, Queretaro, 76030",
        schedule: "09:30 AM a 06:00 PM",
        coordinates: { x: 58, y: 61 }
    },
    {
        id: "leon",
        name: "LEÓN",
        date: new Date("2025-05-23T09:30:00"),
        venue: "POLIFORUM LEÓN",
        address: "Blvd. Adolfo López Mateos s/n, Oriental, León, Guanajuato",
        schedule: "09:30 AM a 06:00 PM",
        coordinates: { x: 55, y: 60 }
    },
    {
        id: "morelia",
        name: "MORELIA",
        date: new Date("2025-05-26T09:30:00"),
        venue: "CENTRO DE CONVENCIONES",
        address: "Av. Camelinas 5000, Club Campestre, Morelia, Michoacán",
        schedule: "09:30 AM a 06:00 PM",
        coordinates: { x: 52, y: 66 }
    },
    {
        id: "guadalajara",
        name: "GUADALAJARA",
        date: new Date("2025-05-29T09:30:00"),
        venue: "EXPO GUADALAJARA",
        address: "Av. Mariano Otero 1499, Verde Valle, Guadalajara, Jalisco",
        schedule: "09:30 AM a 06:00 PM",
        coordinates: { x: 46, y: 62 }
    },
    {
        id: "monterrey",
        name: "MONTERREY",
        date: new Date("2025-06-01T09:30:00"),
        venue: "CINTERMEX",
        address: "Av. Fundidora 501, Obrera, Monterrey, Nuevo León",
        schedule: "09:30 AM a 06:00 PM",
        coordinates: { x: 59, y: 45 }
    }
];