import { useState, memo } from "react";
import {
  Flex,
  Input,
  Button,
  Tooltip,
  Icon,
  InputGroup,
  InputLeftElement,
  Spinner,
} from "@chakra-ui/react";
import { RiMapPinLine } from "react-icons/ri";

import ILocation from "@/types/Location";

interface IProps {
  location: ILocation;
  setLocation: (location: ILocation) => void;
}

const getLocationByLatLong = async (
  lat: number,
  long: number,
  setZipcode: (z: string) => void,
  setLocation: (location: ILocation) => void,
  setIsLoading: (l: boolean) => void
) => {
  const res = await fetch(`/api/location`, {
    method: "post",
    body: JSON.stringify({ lat, long }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  const location = (await res.json()) as ILocation;
  setZipcode(location.zipcode);
  setLocation(location);
  setIsLoading(false);
};

const getPosByGPS = function (
  setZipcode: (z: string) => void,
  setLocation: (location: ILocation) => void,
  setIsLoading: (l: boolean) => void
) {
  const successCallback: PositionCallback = (position) => {
    void getLocationByLatLong(
      position.coords.latitude,
      position.coords.longitude,
      setZipcode,
      setLocation,
      setIsLoading
    );
  };

  const errorCallback: PositionErrorCallback = (error) => {
    // todo: better error handling
    console.log(error);
  };

  setIsLoading(true);
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
};

const getPosByZipCode = async (
  zipcode: string,
  setLocation: (location: ILocation) => void,
  setIsLoading: (l: boolean) => void
) => {
  if (zipcode === "") return;
  setIsLoading(true);
  const res = await fetch(`/api/location`, {
    method: "post",
    body: JSON.stringify({ zipcode }),
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }
  const location = (await res.json()) as ILocation;
  setLocation(location);
  setIsLoading(false);
};

export default memo(function LocationWidget({ location, setLocation }: IProps) {
  const [zipcode, setZipcode] = useState(location?.zipcode || "");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Flex>
      <InputGroup sx={{ "div[data-lastpass-icon-root]": { display: "none" } }}>
        <InputLeftElement>
          {isLoading ? (
            <Spinner size="sm" marginLeft="5px" />
          ) : (
            <Tooltip hasArrow label="Click To Use GPS">
              <Button
                variant="sidebar"
                onClick={(_) => {
                  getPosByGPS(setZipcode, setLocation, setIsLoading);
                }}
              >
                <Icon as={RiMapPinLine} boxSize={5} focusable={true} />
              </Button>
            </Tooltip>
          )}
        </InputLeftElement>
        <Input
          variant="sidebar"
          width="125px"
          marginLeft="7px"
          placeholder="Zip Code"
          value={zipcode}
          inputMode="numeric"
          autoComplete="off"
          type="number"
          onChange={(e) => setZipcode(e.target.value)}
          onBlur={(_) =>
            void getPosByZipCode(zipcode, setLocation, setIsLoading)
          }
        />
      </InputGroup>
    </Flex>
  );
});
