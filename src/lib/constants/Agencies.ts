// constants/Agencies.ts 


export interface Agency{

    name: string;
    address: string;
    coordinates: {
        lat: number; // Latitud
        lng: number; // Longitud

    };
}

export const agencies : Agency[] = [
    {
        name: "Triumph Capital",
        address: "Nicolás San Juan 8, Piedad Narvarte, Benito Juárez, 03000 Ciudad de México, CDMX",
        coordinates: { lat: 19.40253484044347, lng:-99.16054010441061},
    },

    {
        name: "Triumph CDMX Sur",
        address: "Av. Insurgentes Sur 3838, Tlalpan Centro I, Tlalpan, 14000 Ciudad de México, CDMX",
        coordinates: { lat: 19.352536, lng:-99.162540},   
    },

    {
        name: "Triumph CDMX Sur",
        address: "Av. Insurgentes Sur 3838, Tlalpan Centro I, Tlalpan, 14000 Ciudad de México, CDMX",
        coordinates: { lat: 19.292086572122145,  lng:-99.17564496208519},   
    },
    
    {
        name: "Triumph Cuernavaca Autopista",
        address: "Cuernavaca - Cdad. de México KM 85.5, 62320 Cuernavaca, Mor.",
        coordinates: { lat:18.95426055988873,  lng:-99.19476104675078},   
    },

    {
        name: "Triumph Las Torres",
        address: "Av Lázaro Cárdenas 2904, Mirador Residencial, 64910 Monterrey, N.L.",
        coordinates: { lat:25.62645819399737, lng:-100.29414504654653},
    },

    {
        name: "Triumph Leon",
        address: "Blvd. Campestre 60, Casa Blanca, 37170 León de los Aldama, Gto.",
        coordinates: { lat:21.151628332329523, lng:-101.67984462640844},   
    },

    {
        name: "Triumph Lerma",
        address: "Carrertera Toluca - México Km. 42.5 Ortiz Rubio Lerma Ocoyoacac, 52740 Toluca de Lerdo, Méx.",
        coordinates: { lat:19.28846910789296, lng:-99.44274041613586},   
    },

    {
        name: "Triumph Morelia",
        address: "Av. Tres Marias 455, 58254 Morelia, Mich.",
        coordinates: { lat:19.70300779210277, lng:-101.11802465043262},   
    },

    {
        name: "Triumph Patria",
        address: "Av. Patria 578, Jardines de Guadalupe, 45030 Guadalajara, Jal.",
        coordinates: { lat:20.663116444920227, lng:-103.42329997368888},   
    },

    {
        name: "Triumph Periférico",
        address: "Santa María Nonoalco, 01420 Mexico City, CDMX",
        coordinates: { lat:19.382172547094378, lng: -99.19198988728307},   
    },

    {
        name: "Triumph Puebla",
        address: "Cto Juan Pablo II 3515, La Providencia, 72400 Heroica Puebla de Zaragoza, Pue.",
        coordinates: { lat:19.043722181940918, lng:-98.23447070256918},   
    },

    {
        name: "Triumph Queretaro 57",
        address: "Carretera 57, San Luis Potosí - Santiago de Querétaro Km 14, Paseo de la Republica, 76230 Juriquilla, Qro.",
        coordinates: { lat:20.68954361234327, lng:-100.43648605591497},   
    },

    {
        name: "Triumph Santa Fe",
        address: "Carretera Federal, Carr. México-Toluca 5319, Lomas de Vista Hermosa, Cuajimalpa de Morelos, 05100 Ciudad de México, CDMX",
        coordinates: { lat:19.36453967305191, lng:-99.27940988728632},   
    },

    {
        name: "Triumph Satelite",
        address: "Perif. Blvd. Manuel Ávila Camacho 1817, Cd. Satélite, 53100 Naucalpan de Juárez, Méx.",
        coordinates: { lat:19.500860935366248, lng:-99.23593360679477},   
    },

];