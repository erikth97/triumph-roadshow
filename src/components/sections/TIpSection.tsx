const TipSection = () => {
  return (
    <section className="tip-section bg-black text-white" >

        <div className="text-center">
        <h2 className="pb-6 text-[32px]">
        Tips y Recomendaciones de Seguridad</h2>

        <p className="text-[16px]">Para garantizar que disfrutes de una experiencia segura y placentera, <br />
        es fundamental seguir ciertas recomendaciones antes y durante el evento:</p>

        {/* Icons and Text */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-8 pl-40 pr-40 py-10 text-center">
            {[
                {
                    icon: "../../public/images/tips_icon/Equip_protección.png",
                    title: "Equipo de protección:",
                    description:
                        "Siempre usa casco, guantes, chaqueta con protecciones, botas y pantalones adecuados para la conducción.",
                },
                {
                    icon: "../../public/images/tips_icon/Chequeo_previo.png",
                    title: "Chequeo previo:",
                    description:
                        "Asegúrate de que tu estado físico sea adecuado para conducir. Es importante señalar que no se permitirá el acceso a personas que se encuentren en estado de ebriedad. Se realizarán pruebas de alcoholemia antes de permitir la participación en las pruebas de manejo.",
                },
                {
                    icon: "../../public/images/tips_icon/Conducción_responsable.png",
                    title: "Conducción responsable:",
                    description:
                        "Recuerda que este evento no es una prueba de velocidad ni un curso de manejo. El objetivo es que disfrutes de una experiencia de conducción segura, probando el rendimiento de las motos en un entorno controlado. Siempre sigue las indicaciones de los guías, respeta las normas del recorrido y mantén una velocidad adecuada a las condiciones del evento.",
                },
            ].map((card, index) => (
                <div
                    key={index}
                    className="bg-[#292929] p-6 flex flex-col items-center h-[400px] transition-transform duration-300 hover:scale-105"
                >
                    <img
                        src={card.icon}
                        alt={card.title}
                        className="w-20 h-20 mb-4 mx-auto"
                    />
                    <h3 className="text-lg font-semibold mb-2 text-white">{card.title}</h3>
                    <p className="text-[#ABABAB] text-justify">{card.description}</p>
                </div>
            ))}
        </div>
        </div>

    </section>
  );
}

export default TipSection;