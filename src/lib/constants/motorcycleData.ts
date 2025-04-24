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
    specs: MotorcycleSpec;
}

// Datos de las motocicletas
export const motorcycles: Motorcycle[] = [
    {
        id: 1,
        name: "Speed 400",
        image: "/images/motorcycles/Speed 400_MY24_Caspian Blue_RHS_1200px-Climit.webp",
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
        image: "/images/motorcycles/Trident_MY24_Sapphire Black_RHS_1200px-Climit.webp",
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