import { useMap } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';

const MapAtribution: React.FC = () => {
  const map = useMap();

  useEffect(() => {
    // Crea un control de atribución en la posición deseada y sin el ícono de Leaflet
    const attributionControl = L.control.attribution({
      position: 'bottomleft',
      prefix: false, // Elimina el ícono predeterminado de Leaflet
    });

    // Agrega la atribución requerida por los proveedores de mapas
    attributionControl.addAttribution(
      '© <a href="#">Triumph México</a>'
    );

    // Agrega el control al mapa
    attributionControl.addTo(map);

    // Limpia el control al desmontar el componente
    return () => {
      attributionControl.remove();
    };
  }, [map]);

  return null;
};

export default MapAtribution;