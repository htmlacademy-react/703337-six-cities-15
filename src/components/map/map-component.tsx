import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import useMap from './useMap';
import { CardsType } from '../../types/card';
import cn from 'classnames';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  rentsCard: CardsType;
  selectedCard: string | undefined;
  params: boolean;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

function MapComponent(props: MapProps): JSX.Element {
  const {rentsCard, selectedCard, params} = props;
  const city = rentsCard[0].city;
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      rentsCard.forEach((point) => {
        const marker = new Marker({
          lat: point.location.latitude,
          lng: point.location.longitude
        });

        marker
          .setIcon(
            selectedCard !== undefined && point.id === selectedCard
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, rentsCard, selectedCard]);

  return (
    <section className={cn('map', {'cities__map': !params, 'offer__map': params})} ref={mapRef}></section>
  );
}

export default MapComponent;

