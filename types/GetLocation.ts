import ILocation from "./Location";

export type Request = LatLongRequest | ZipCodeRequest;

interface LatLongRequest {
  lat: number;
  long: number;
}

interface ZipCodeRequest {
  zipcode: string;
}

export type SuccessResponse = ILocation;

export interface ErrorResponse {
  status: number;
  message: string;
}
