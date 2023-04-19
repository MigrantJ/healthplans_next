"use client";
import {useState, useEffect} from "react";

export default function GetLocPage() {
    // useState and useEffect are used here because the Geolocation API is client-side, and will break server-side compilation
    const [pos, setPos] = useState("");
    useEffect(() => {
        const successCallback = (position) => {
            setPos(position.coords.latitude);
          };
          
          const errorCallback = (error) => {
            setPos(error);
          };
        
          navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    });

    return <div>Hello {pos}
    </div>;
}