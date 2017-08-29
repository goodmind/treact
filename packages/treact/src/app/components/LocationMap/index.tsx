import GoogleMapReact, { Options } from 'google-map-react';
import * as React from 'react';
import { LazyMaps, Props } from './index.h';

export class LocationMap extends React.Component<Props, {}> {
  private map: LazyMaps['map'];
  private maps: LazyMaps['maps'];

  public static defaultProps = {
    width: '320px',
    height: '240px',
  };

  private createOptions = (): Options => ({
    disableDefaultUI: true,
    draggable: false,
    zoomControl: false,
  })

  private onSearch = (places: google.maps.places.PlaceResult[]) => {
    const { place_id: placeId, geometry: { location } } = places[0];
    const { InfoWindow, Marker } = this.maps;

    const infowindow = new InfoWindow();
    const marker = new Marker({
      map: this.map,
      position: location,
      place: { placeId, location },
    });
    marker.addListener('click', () =>
      infowindow.open(this.map, marker));
  }

  private addMarker = () => {
    const { geo: { lat, lng }, place } = this.props;
    const { LatLng, places, Marker } = this.maps;
    const loc = new LatLng(lat, lng);

    if (place) {
      const service = new places.PlacesService(this.map);
      service.textSearch(
        { query: `${place.title} ${place.address}`, location: loc, radius: 10 },
        this.onSearch,
      );
    } else {
      const marker = new Marker({
        position: loc,
      });
      marker.setMap(this.map);
    }
  }

  private onGoogleAPILoad = ({ map, maps }: LazyMaps) => {
    this.map = map;
    this.maps = maps;
    this.addMarker();
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
          onGoogleApiLoaded={this.onGoogleAPILoad} />
      </div>
    );
  }
}
