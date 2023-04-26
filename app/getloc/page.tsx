"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import PlanList from "@/components/PlanList";

// todo: revisit these option settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

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
      <QueryClientProvider client={queryClient}>
        <div>Latitude: {pos?.coords.latitude}</div>
        <div>Longitude: {pos?.coords.longitude}</div>
        <div>
          <form>
            <label htmlFor="zipcode">Zip Code:</label>
            <input
              id="zipcode"
              value={zipCode}
              placeholder="Zip Code"
              onChange={(e) => setZipCode(e.target.value)}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                void getPlaceByZipCode();
              }}
            >
              Use Zip
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                getPosByGPS();
              }}
            >
              Use GPS
            </button>
          </form>
        </div>
        <div>County Code: {countyCode}</div>
        <div>State: {state}</div>
        <PlanList zipCode={zipCode} state={state} countyCode={countyCode} />
      </QueryClientProvider>
    </>
  );
}
