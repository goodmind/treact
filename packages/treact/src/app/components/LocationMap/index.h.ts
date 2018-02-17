export interface Props {
  geo: { lat: number, lng: number }
  width?: string
  height?: string
  place?: {
    title: string,
    address: string,
  }
}

export interface LazyMaps {
  map: google.maps.Map
  maps: typeof google.maps
}
