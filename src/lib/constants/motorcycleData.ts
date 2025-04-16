export interface MotorcycleSpec {
    tipo: string;
    cilindrada: string;
    parMaximo: string;
    cajaCambios: string;
    consumo: string;
}

export interface Motorcycle {
    id: number;
    name: string;
    image: string;
    specs: MotorcycleSpec;
}

// Datos de las motocicletas
export const motorcycles: Motorcycle[] = [
    {
        id: 1,
        name: "Speed 400",
        image: "/images/motorcycles/Speed 400_MY24_Caspian Blue_RHS_1200px-Climit.webp",
        specs: {
            tipo: "Monocilíndrico con refrigeración líquida, 4 válvulas y doble árbol de levas en cabeza (DOHC)",
            cilindrada: "398,15 cc",
            parMaximo: "37,5 Nm a 6.500 rpm",
            cajaCambios: "6 velocidades",
            consumo: "3.5L/100km (80.7 mpg)"
        }
    },
    {
        id: 2,
        name: "Scrambler 400 X",
        image: "/images/motorcycles/Scrambler 400 X_MY24_Matt Khaki Green_RHS_1200px-Climit.webp",
        specs: {
            tipo: "Monocilíndrico con refrigeración líquida, 4 válvulas y doble árbol de levas en cabeza (DOHC)",
            cilindrada: "398,15 cc",
            parMaximo: "37,5 Nm a 6.500 rpm",
            cajaCambios: "6 velocidades",
            consumo: "3.5L/100km (80.7 mpg)"
        }
    },
    {
        id: 3,
        name: "Trident 660 2024",
        image: "/images/motorcycles/Trident_MY24_Sapphire Black_RHS_1200px-Climit.webp",
        specs: {
            tipo: "Triple en línea con refrigeración líquida, 12 válvulas y DOHC",
            cilindrada: "660 cc",
            parMaximo: "64 Nm a 6.250 rpm",
            cajaCambios: "6 velocidades",
            consumo: "4.5L/100km (62.8 mpg)"
        }
    },
    {
        id: 4,
        name: "Trident 660 2025",
        image: "/images/motorcycles/Trident 660_MY25_Cosmic Yellow_RHS_1200px-Climit.webp",
        specs: {
            tipo: "Triple en línea con refrigeración líquida, 12 válvulas y DOHC",
            cilindrada: "660 cc",
            parMaximo: "64 Nm a 6.250 rpm",
            cajaCambios: "6 velocidades",
            consumo: "4.5L/100km (62.8 mpg)"
        }
    },
    {
        id: 5,
        name: "Daytona 660",
        image: "/images/motorcycles/Daytona 660_MY24_Snowdonia White_RHS_1200px-Climit.webp",
        specs: {
            tipo: "Triple en línea con refrigeración líquida, 12 válvulas y DOHC",
            cilindrada: "660 cc",
            parMaximo: "69 Nm a 8.250 rpm",
            cajaCambios: "6 velocidades",
            consumo: "4.3L/100km (65.7 mpg)"
        }
    },
    {
        id: 6,
        name: "Tiger Sport 660",
        image: "/images/motorcycles/Tiger Sport_MY24_Snowdonia White-Jet Black_RHS_1200px-Climit.webp",
        specs: {
            tipo: "Triple en línea con refrigeración líquida, 12 válvulas y DOHC",
            cilindrada: "660 cc",
            parMaximo: "64 Nm a 6.250 rpm",
            cajaCambios: "6 velocidades",
            consumo: "4.5L/100km (62.8 mpg)"
        }
    },
    {
        id: 7,
        name: "Bonneville T120",
        image: "/images/motorcycles/Bonneville T120_MY24_Jet Black-Fusion White_RHS_1200px-Climit.webp",
        specs: {
            tipo: "Bicilíndrico paralelo con refrigeración líquida, 8 válvulas y SOHC",
            cilindrada: "1.200 cc",
            parMaximo: "105 Nm a 3.500 rpm",
            cajaCambios: "6 velocidades",
            consumo: "4.7L/100km (60.1 mpg)"
        }
    },
    {
        id: 8,
        name: "Speed Twin 900",
        image: "/images/motorcycles/Speed Twin 900_MY24_Jet Black_RHS_1200px-Climit.webp",
        specs: {
            tipo: "Bicilíndrico paralelo con refrigeración líquida, 8 válvulas y SOHC",
            cilindrada: "900 cc",
            parMaximo: "80 Nm a 3.800 rpm",
            cajaCambios: "5 velocidades",
            consumo: "4.2L/100km (67.3 mpg)"
        }
    },
    {
        id: 9,
        name: "Rocket 3 Storm GT",
        image: "/images/motorcycles/Rocket 3 GT_MY24_Carnival Red_RHS_1200px-Climit.webp",
        specs: {
            tipo: "Tricilíndrico en línea con refrigeración líquida, 12 válvulas y DOHC",
            cilindrada: "2.458 cc",
            parMaximo: "221 Nm a 4.000 rpm",
            cajaCambios: "6 velocidades",
            consumo: "6.8L/100km (41.5 mpg)"
        }
    },
    {
        id: 10,
        name: "Tiger 900 GT Pro",
        image: "/images/motorcycles/Tiger 900 GT Pro_MY24_Carnival Red_RHS_1200px-Climit.webp",
        specs: {
            tipo: "Tricilíndrico en línea con refrigeración líquida, 12 válvulas y DOHC",
            cilindrada: "888 cc",
            parMaximo: "87 Nm a 7.250 rpm",
            cajaCambios: "6 velocidades",
            consumo: "5.2L/100km (54.3 mpg)"
        }
    },
    {
        id: 11,
        name: "Tiger 900 Rally Pro",
        image: "/images/motorcycles/Tiger 900 Rally Pro_MY24_Ash Grey_RHS_1200px-Climit.webp",
        specs: {
            tipo: "Tricilíndrico en línea con refrigeración líquida, 12 válvulas y DOHC",
            cilindrada: "888 cc",
            parMaximo: "87 Nm a 7.250 rpm",
            cajaCambios: "6 velocidades",
            consumo: "5.2L/100km (54.3 mpg)"
        }
    }
];

export default motorcycles;