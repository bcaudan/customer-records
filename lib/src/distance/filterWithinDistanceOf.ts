import Coordinates from "../model/Coordinates";

const CONVERSION_FACTOR = Math.PI / 180;
const EARTH_RADIUS_IN_KM = 6371;

export default function(
  candidates: Coordinates[],
  maxDistanceInKm: number,
  origin: Coordinates
) {
  return candidates.filter(
    isWithinDistanceOf(maxDistanceInKm, convertToRadians(origin))
  );
}

function isWithinDistanceOf(maxDistanceInKm: number, origin: Coordinates) {
  return (candidate: Coordinates) => {
    return (
      computeDistanceInKm(convertToRadians(candidate), origin) <=
      maxDistanceInKm
    );
  };
}

function convertToRadians({ latitude, longitude }: Coordinates) {
  return {
    latitude: latitude * CONVERSION_FACTOR,
    longitude: longitude * CONVERSION_FACTOR
  };
}

function computeDistanceInKm(a: Coordinates, b: Coordinates) {
  return (
    Math.acos(
      Math.sin(a.latitude) * Math.sin(b.latitude) +
        Math.cos(a.latitude) *
          Math.cos(b.latitude) *
          Math.cos(b.longitude - a.longitude)
    ) * EARTH_RADIUS_IN_KM
  );
}
