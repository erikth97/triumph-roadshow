export interface MotorcycleSpec {
    peso: string;
    alturaAsiento: string;
    motor: string;
    torque: string;
    potencia: string;
}

export interface Motorcycle {
    id: number;
    name: string;
    image: string;
    logoPath: string;
    needsSpecialSize: boolean;
    specs: MotorcycleSpec;
}

// Lista de modelos que necesitan un logo con tamaño especial
const modelsWithSpecialSize = [
    "Scrambler 400 X",
    "Speed Twin 900",
    "Daytona 660",
    "Bonneville T120",
    "Rocket 3 Storm GT"
];

// Mapeo de nombres de modelos a rutas de logos
const logoPathMap: Record<string, string> = {
    "Speed 400": "/images/logo_models/Speed_400.webp",
    "Scrambler 400 X": "/images/logo_models/Scrambler_400X.webp",
    "Trident 660": "/images/logo_models/Trident.webp",
    "Daytona 660": "/images/logo_models/Daytona_660.webp",
    "Tiger Sport 660": "/images/logo_models/TigerSport_660.webp",
    "Bonneville T120": "/images/logo_models/Bonneville_T120.webp",
    "Speed Twin 900": "/images/logo_models/SpeedTwin_900.webp",
    "Rocket 3 Storm GT": "/images/logo_models/3Rocket_StormGT.webp",
    "Tiger 900 GT Pro": "/images/logo_models/Tiger_900gt.webp",
    "Tiger 900 Rally Pro": "/images/logo_models/Tiger_900_Rally.webp",
};

// Datos de las motocicletas con información de logos agregada
export const motorcycles: Motorcycle[] = [
    {
        id: 1,
        name: "Speed 400",
        image: "/images/motorcycles/Speed 400_MY24_Caspian Blue_RHS_1200px-Climit.webp",
        logoPath: logoPathMap["Speed 400"],
        needsSpecialSize: modelsWithSpecialSize.includes("Speed 400"),
        specs: {
            peso: "170 kg",
            alturaAsiento: "790 mm",
            motor: "398,15 cc",
            torque: "37,5 Nm a 6.500 rpm",
            potencia: "40 CV a 8.000 rpm"
        }
    },
    {
        id: 2,
        name: "Scrambler 400 X",
        image: "/images/motorcycles/Scrambler 400 X_MY24_Matt Khaki Green_RHS_1200px-Climit.webp",
        logoPath: logoPathMap["Scrambler 400 X"],
        needsSpecialSize: modelsWithSpecialSize.includes("Scrambler 400 X"),
        specs: {
            peso: "179 kg",
            alturaAsiento: "835 mm",
            motor: "398,15 cc",
            torque: "37,5 Nm a 6.500 rpm",
            potencia: "40 CV a 8.000 rpm"
        }
    },
    {
        id: 3,
        name: "Trident 660",
        image: "/images/motorcycles/Trident 660_MY25_Cosmic Yellow_RHS_1200px-Climit.webp",
        logoPath: logoPathMap["Trident 660"],
        needsSpecialSize: modelsWithSpecialSize.includes("Trident 660"),
        specs: {
            peso: "190 kg",
            alturaAsiento: "805 mm",
            motor: "660 cc",
            torque: "64 Nm a 6.250 rpm",
            potencia: "81 CV a 10.250 rpm"
        }
    },
    {
        id: 4,
        name: "Daytona 660",
        image: "/images/motorcycles/Daytona 660_MY24_Snowdonia White_RHS_1200px-Climit.webp",
        logoPath: logoPathMap["Daytona 660"],
        needsSpecialSize: modelsWithSpecialSize.includes("Daytona 660"),
        specs: {
            peso: "201 kg",
            alturaAsiento: "810 mm",
            motor: "660 cc",
            torque: "69 Nm a 8.250 rpm",
            potencia: "95 CV a 11.250 rpm"
        }
    },
    {
        id: 5,
        name: "Tiger Sport 660",
        image: "/images/motorcycles/Tiger Sport_MY24_Snowdonia White-Jet Black_RHS_1200px-Climit.webp",
        logoPath: logoPathMap["Tiger Sport 660"],
        needsSpecialSize: modelsWithSpecialSize.includes("Tiger Sport 660"),
        specs: {
            peso: "207 kg",
            alturaAsiento: "835 mm",
            motor: "660 cc",
            torque: "64 Nm a 6.250 rpm",
            potencia: "81 PS a 10.250 rpm"
        }
    },
    {
        id: 6,
        name: "Bonneville T120",
        image: "/images/motorcycles/Bonneville T120_MY24_Jet Black-Fusion White_RHS_1200px-Climit.webp",
        logoPath: logoPathMap["Bonneville T120"],
        needsSpecialSize: modelsWithSpecialSize.includes("Bonneville T120"),
        specs: {
            peso: "236 kg",
            alturaAsiento: "790 mm",
            motor: "1200 cc",
            torque: "105 Nm a 3.500 rpm",
            potencia: "80 CV a 6550 rpm"
        }
    },
    {
        id: 7,
        name: "Speed Twin 900",
        image: "/images/motorcycles/Speed Twin 900_MY24_Jet Black_RHS_1200px-Climit.webp",
        logoPath: logoPathMap["Speed Twin 900"],
        needsSpecialSize: modelsWithSpecialSize.includes("Speed Twin 900"),
        specs: {
            peso: "216 kg",
            alturaAsiento: "780 mm",
            motor: "900 cc",
            torque: "80 Nm a 3800 rpm",
            potencia: "65 CV a 7500 rpm"
        }
    },
    {
        id: 8,
        name: "Tiger 900 GT Pro",
        image: "/images/motorcycles/Tiger 900 GT Pro_MY24_Carnival Red_RHS_1200px-Climit.webp",
        logoPath: logoPathMap["Tiger 900 GT Pro"],
        needsSpecialSize: modelsWithSpecialSize.includes("Tiger 900 GT Pro"),
        specs: {
            peso: "198 kg",
            alturaAsiento: "820-840 mm",
            motor: "888 cc",
            torque: "87 Nm a 7.250 rpm",
            potencia: "95.2 CV a 8.750 rpm"
        }
    },
    {
        id: 9,
        name: "Tiger 900 Rally Pro",
        image: "/images/motorcycles/Tiger 900 Rally Pro_MY24_Ash Grey_RHS_1200px-Climit.webp",
        logoPath: logoPathMap["Tiger 900 Rally Pro"],
        needsSpecialSize: modelsWithSpecialSize.includes("Tiger 900 Rally Pro"),
        specs: {
            peso: "201 kg",
            alturaAsiento: "860-880 mm",
            motor: "888 cc",
            torque: "87 Nm a 7.250 rpm",
            potencia: "95.2 CV a 8.750 rpm"
        }
    },
    {
        id: 10,
        name: "Rocket 3 Storm GT",
        image: "/images/motorcycles/Rocket 3 GT_MY24_Carnival Red_RHS_1200px-Climit.webp",
        logoPath: logoPathMap["Rocket 3 Storm GT"],
        needsSpecialSize: modelsWithSpecialSize.includes("Rocket 3 Storm GT"),
        specs: {
            peso: "317 kg",
            alturaAsiento: "773 mm",
            motor: "2.458 cc",
            torque: "225 Nm a 4.000 rpm",
            potencia: "182 PS a 7.000 rpm"
        }
    }
];

export default motorcycles;