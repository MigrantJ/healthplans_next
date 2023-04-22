"use client";
import { useState } from "react";

export default function GetLocPage() {
  const [pos, setPos] = useState<GeolocationPosition>(null);
  const [zipCode, setZipCode] = useState("");
  const [countyCode, setCountyCode] = useState("");
  const [state, setState] = useState("");
  const [plans, setPlans] = useState([]);

  const getPlaceByLatLong = async (lat: number, long: number) => {
    const res = await fetch(`/api/location?lat=${lat}&long=${long}`);
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const place = await res.json();
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
    const place = await res.json();
    setZipCode(place.zipcode);
    setCountyCode(place.countyfips);
    setState(place.state);
  };

  const useGPS = function () {
    const successCallback: PositionCallback = (position) => {
      setPos(position);
      getPlaceByLatLong(position.coords.latitude, position.coords.longitude);
    };

    const errorCallback: PositionErrorCallback = (error) => {
      // todo: better error handling
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  };

  const getPlans = async () => {
    const res = await fetch(
      `/api/plans?zipcode=${zipCode}&state=${state}&countyCode=${countyCode}`
    );
    const plans = await res.json();
    //todo: assert that plans is the correct type or something. you can add types to NextAPIResponse
    setPlans(plans);
  };

  return (
    <>
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
              getPlaceByZipCode();
            }}
          >
            Use Zip
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              useGPS();
            }}
          >
            Use GPS
          </button>
        </form>
      </div>
      <div>County Code: {countyCode}</div>
      <div>State: {state}</div>
      {countyCode && (
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              getPlans();
            }}
          >
            Get Plans
          </button>
        </div>
      )}
      <div>
        {plans?.map((plan) => (
          <div>{plan.name}</div>
        ))}
      </div>
    </>
  );
}
