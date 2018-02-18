// Type definitions for google-map-react 0.24.0
// Project: https://github.com/istarkov/google-map-react
// Definitions by: goodmind <https://github.com/goodmind>
// Definitions: https://github.com/goodmind/treact

/// <reference types="googlemaps" />

declare module 'google-map-react' {
  import * as React from 'react';

  export type BootstrapURLKeys = { [key: string]: string };

  export type Options = google.maps.MapOptions;

  export type Maps = typeof google.maps;

  export interface Bounds {
    nw: number;
    ne: number;
    sw: number;
    se: number;
  }

  export interface Point {
    x: number;
    y: number;
  }

  export interface Coords {
    lat: number;
    lng: number;
  }

  export interface ClickEventValue extends Point, Coords {
    event: any;
  }

  export interface ChangeEventValue {
    center: Coords;
    zoom: number;
    bounds: Bounds;
    marginBounds: Bounds;
  }

  export interface Props {
    bootstrapURLKeys?: BootstrapURLKeys;
    defaultCenter?: Coords;
    center?: Coords;
    defaultZoom?: number;
    zoom?: number;
    hoverDistance?: number;
    options?: Options | ((maps: Maps) => Options);
    margin?: any[];
    debounced?: boolean;
    layerTypes?: string[];
    onClick?(value: ClickEventValue): any;
    onChange?(value: ChangeEventValue): any;
    resetBoundsOnResize?: boolean;
    onChildClick?(hoverKey: any, childProps: any): void;
    onChildMouseEnter?(hoverKey: any, childProps: any): void;
    onChildMouseLeave?(hoverKey: any, childProps: any): void;
    onZoomAnimationStart?(args: any): void;
    onZoomAnimationEnd?(args: any): void;
    onMapTypeIdChange?(args: any): void;
    distanceToMouse?(pt: Point, mousePos: Point): void;
    googleMapLoader?(bootstrapURLKeys: any): void;
    onGoogleApiLoaded?(maps: { map: any, maps: any }): void;
    yesIWantToUseGoogleMapApiInternals?: boolean;
  }

  export default class GoogleMapReact extends React.Component<Props> {}

  export interface ChildComponentProps extends Coords {
    $hover?: boolean;
  }
}
