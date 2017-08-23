import GoogleMapReact, { Options } from 'google-map-react';
import * as React from 'react';

interface Props {
  geo: { lat: number, lng: number };
  width?: string;
  height?: string;
  place?: {
    title: string,
    address: string,
  };
}
interface LazyMaps {
  map: google.maps.Map;
  maps: typeof google.maps;
}
export class LocationMap extends React.Component<Props, {}> {
  public static defaultProps = {
    width: '320px',
    height: '240px',
  };

  private createOptions = (): Options => ({
    disableDefaultUI: true,
    draggable: false,
    zoomControl: false,
  })

  private addMarker = ({ map, maps }: LazyMaps) => {
    const { geo: { lat, lng }, place } = this.props;
    const loc = new maps.LatLng(lat, lng);

    if (place) {
      const service = new maps.places.PlacesService(map);
      service.textSearch({ query: `${place.title} ${place.address}`, location: loc, radius: 10 }, places => {
        const { place_id: placeId, geometry: { location } } = places[0];
        const infowindow = new maps.InfoWindow();
        const marker = new maps.Marker({
          map,
          position: location,
          place: { placeId, location },
        });
        marker.addListener('click', () => {
          infowindow.open(map, marker);
        });
      });
    } else {
      const marker = new maps.Marker({
        position: loc,
      });
      marker.setMap(map);
    }
  }
  public render() {
    const { geo: { lat, lng }, width, height } = this.props;

    return (
      <div style={{ width, height }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyB7McnH-GPMOa1yrY7I9yeGa3Lv19YcX-I',
            language: 'en',
            libraries: 'places',
          }}
          defaultCenter={{ lat, lng }}
          zoom={11}
          options={this.createOptions}
          onGoogleApiLoaded={this.addMarker} />
      </div>
    );
  }
}
