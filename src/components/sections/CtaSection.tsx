import React from 'react';

const CtaSection: React.FC = () => {
  return (
    <section className="bg-black text-white py-12 content-between">
      <div className="container mx-auto px-4 text-center">
        {/* Título principal */}
        <h2 className="text-2xl md:text-4xl lg:text-2xl font-bold mb-6">
          ¡NO PIERDAS LA OPORTUNIDAD!"
        </h2>

        {/* Texto descriptivo */}
        <p className="text-base md:text-lg lg:text-xl mb-8 mx-auto">
          Regístrate ahora para asegurar tu lugar en el Demo Road Show Triumph <br />
          en tu ciudad.
          Las plazas son limitadas, ¡así que no esperes más!<br />
          <span className="text-[#ABABAB] text-2xs">Máximo 1 registro por persona.</span>
        </p>

        {/* Mensaje final */}
        <p className="text-lg md:text-xl lg:text-2xl font-normal">
          ¡Nos vemos en el Demo Road Show!
        </p>
      </div>
    </section>
  );
};

export default CtaSection;
