import { useState, useEffect } from "react";
import {
  Flex,
  Center,
  Input,
  Button,
  Tooltip,
  Icon,
  Editable,
  EditablePreview,
  EditableInput,
} from "@chakra-ui/react";
import { RiMapPinLine } from "react-icons/ri";

import ILocation from "@/types/Location";
import Modal from "../Modal";

interface IProps {
  location: ILocation;
  setLocation: (location: ILocation) => void;
}

const getLocationByLatLong = async (
  lat: number,
  long: number,
  setLocation: (location: ILocation) => void
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
  setLocation(location);
};

const getPosByGPS = function (setLocation: (location: ILocation) => void) {
  const successCallback: PositionCallback = (position) => {
    void getLocationByLatLong(
      position.coords.latitude,
      position.coords.longitude,
      setLocation
    );
  };

  const errorCallback: PositionErrorCallback = (error) => {
    // todo: better error handling
    console.log(error);
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
};

const getPosByZipCode = async (
  zipcode: string,
  setLocation: (location: ILocation) => void
) => {
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
};

export default function LocationWidget({ location, setLocation }: IProps) {
  const [zipcode, setZipcode] = useState("");
  useEffect(() => {
    setZipcode(location?.zipcode || "");
  }, [location]);

  return (
    <Flex>
      <Modal {...{ getPosByGPS, getPosByZipCode, setLocation }} />
      <Center>
        <Tooltip hasArrow label="Click To Use GPS">
          <Button
            onClick={(_) => {
              getPosByGPS(setLocation);
            }}
          >
            <Icon as={RiMapPinLine} boxSize={5} focusable={true} />
          </Button>
        </Tooltip>
      </Center>

      <Editable
        placeholder={zipcode || "Zip Code"}
        isPreviewFocusable={true}
        selectAllOnFocus={false}
        value={zipcode}
        onChange={(t) => setZipcode(t)}
        onSubmit={(t) => void getPosByZipCode(t, setLocation)}
        w={100}
      >
        <Tooltip hasArrow label="Click to Edit" shouldWrapChildren={true}>
          <EditablePreview
            bg="gray.200"
            px={4}
            py={2}
            _hover={{
              background: "gray.100",
            }}
          />
        </Tooltip>
        <Input
          as={EditableInput}
          value={location?.zipcode}
          inputMode="numeric"
        />
      </Editable>
    </Flex>
  );
}
