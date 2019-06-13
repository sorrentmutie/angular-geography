export interface MyCoordinates {
  latitude: number;
  longitude: number;
}

export interface ThreeDimensionalPoint {
  x: number;
  y: number;
  z: number;
}

export class GeographicalHelper {

    convertLatitudeAndLongitudeToThreeDimensionalPoint(point: MyCoordinates): ThreeDimensionalPoint {
      const lat = this.radiansConverter(point.latitude);
      const lon = this.radiansConverter(point.longitude);
      return { x: Math.cos(lat)  * Math.cos(lon),
        y: Math.cos(lat) * Math.sin(lon),
        z: Math.sin(lat)
      };
    }

    convertThreeDimensionalPointToLatitudeAndLongitude(point: ThreeDimensionalPoint): MyCoordinates {
      const centralLongitude = Math.atan2(point.y, point.x);
      const centralSquareRoot = Math.sqrt(point.x * point.x  +  point.y * point.y);
      const centralLatitude = Math.atan2(point.z, centralSquareRoot);
      return { latitude : this.radiansBackConverter(centralLatitude), longitude : this.radiansBackConverter(centralLongitude) };
    }

    radiansConverter(x: number): number {
      return x * Math.PI / 180;
    }

    radiansBackConverter(x: number): number {
      return x * 180 / Math.PI;
    }

    calculateAveragePoint(points: ThreeDimensionalPoint[]): ThreeDimensionalPoint {
      const sumX = points.reduce((accumulator, point) => accumulator + point.x, 0);
      const sumY = points.reduce((accumulator, point) => accumulator + point.y, 0);
      const sumZ = points.reduce((accumulator, point) => accumulator + point.z, 0);

      return{
        x: sumX / points.length, y: sumY / points.length, z: sumZ / points.length
      };
    }

}

