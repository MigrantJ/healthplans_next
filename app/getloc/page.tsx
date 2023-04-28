"use client";
import { useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import PlanList from "@/components/PlanList";

interface Place {
  zipcode: string;
  countyfips: string;
  state: string;
}

export default function GetLocPage() {
  const [pos, setPos] = useState<GeolocationPosition>(null);
  const [zipCode, setZipCode] = useState("");
  const [countyCode, setCountyCode] = useState("");
  const [state, setState] = useState("");

  const getPlaceByLatLong = async (lat: number, long: number) => {
    const res = await fetch(`/api/location?lat=${lat}&long=${long}`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const place = (await res.json()) as Place;
    setZipCode(place.zipcode);
    setCountyCode(place.countyfips);
    setState(place.state);
  };

  const getPlaceByZipCode = async () => {
    // todo: input sanitization
    const res = await fetch(`/api/location?zipcode=${zipCode}`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const place = (await res.json()) as Place;
    setZipCode(place.zipcode);
    setCountyCode(place.countyfips);
    setState(place.state);
  };

  const getPosByGPS = function () {
    const successCallback: PositionCallback = (position) => {
      setPos(position);
      void getPlaceByLatLong(
        position.coords.latitude,
        position.coords.longitude
      );
    };

    const errorCallback: PositionErrorCallback = (error) => {
      // todo: better error handling
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  return (
    <>
      <div>Latitude: {pos?.coords.latitude}</div>
      <div>Longitude: {pos?.coords.longitude}</div>
      <div>
        <form>
          <label htmlFor="zipcode">Zip Code:</label>
          <Input
            id="zipcode"
            value={zipCode}
            placeholder="Zip Code"
            onChange={(e) => setZipCode(e.target.value)}
          />
          <Button
            colorScheme="teal"
            onClick={(e) => {
              e.preventDefault();
              void getPlaceByZipCode();
            }}
          >
            Use Zip
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              getPosByGPS();
            }}
          >
            Use GPS
          </Button>
        </form>
      </div>
      <div>County Code: {countyCode}</div>
      <div>State: {state}</div>
      <PlanList zipCode={zipCode} state={state} countyCode={countyCode} />
    </>
  );
}
