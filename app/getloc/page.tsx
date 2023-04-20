"use client";
import { useState, useEffect } from "react";

export default function GetLocPage() {
  const [pos, setPos] = useState<GeolocationPosition>(null);
  const [zip, setZip] = useState(0);
  useEffect(() => {
    // render functions can't be async, so define inside useEffect
    const fetchData = async (lat: number, long: number) => {
      const res = await fetch(`/api/zipcode?lat=${lat}&long=${long}`);
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const { closestZipCode } = await res.json();
      setZip(closestZipCode);
    };

    const successCallback: PositionCallback = (position) => {
      setPos(position);
      fetchData(position.coords.latitude, position.coords.longitude);
    };

    const errorCallback: PositionErrorCallback = (error) => {
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  return <><div>Latitude: {pos?.coords.latitude}</div>
    <div>Longitude: {pos?.coords.longitude}</div>
    <div>Zip Code: {zip}</div>
  </>;
}