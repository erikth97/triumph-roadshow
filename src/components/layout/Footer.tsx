import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-white text-black py-12 px-10">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Columna 1 - 25% */}
                <div className="col-span-1 flex justify-center">
                    <img 
                        src="../../public/Demo_Road_Show.png" 
                        alt="Evento Triumph Demo Road Show" 
                        className="w-45 h-auto object-contain"
                    />
                </div>

                {/* Columna 2 - 25% */}
                <div className="col-span-1">
                    <h3 className="text-lg font-semibold mb-4">Información Legal</h3>
                    <ul className="text-gray-400 text-sm space-y-2">
                        <li><a href="#" className="hover:text-black">Aviso de privacidad</a></li>
                        <li><a href="#" className="hover:text-black">Términos y Condiciones</a></li>
                    </ul>
                </div>

                {/* Columna 3 - 25% */}
                <div className="col-span-1">
                    <h3 className="text-lg font-semibold mb-4">¡En marcha!</h3>
                    <ul className="text-gray-400 text-sm space-y-2">
                        <li><a href="#" className="hover:text-black">Prueba de conducción</a></li>
                        <li><a href="#" className="hover:text-black">Configura tu moto</a></li>
                        <li><a href="#" className="hover:text-black">Concesionarios</a></li>
                    </ul>
                </div>

                {/* Columna 4 - 25% */}
                <div className="col-span-1 text-center">
                    <img 
                        src="../../public/Motomex.png" 
                        alt="Contact Us" 
                        className="w-60 h-auto object-contain mx-auto"
                    />
                    <div className="flex justify-end space-x-4 mt-4">
                        <a href="#" className="text-gray-400 hover:text-black">
                            <FaFacebook className="w-8 h-8 rounded-full" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-black">
                            <FaInstagram className="w-8 h-8 rounded-full" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
