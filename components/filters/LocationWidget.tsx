import { useState, memo, useEffect, useRef, KeyboardEvent } from "react";
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

import { useHouseholdActions } from "@/lib/householdStore";

const getPosByGPS = function (
  setLatLong: (newLatLong: { lat: number; long: number }) => void
) {
  const successCallback: PositionCallback = (position) => {
    setLatLong({
      lat: parseFloat(position.coords.latitude.toFixed(3)),
      long: parseFloat(position.coords.longitude.toFixed(3)),
    });
  };

  const errorCallback: PositionErrorCallback = (error) => {
    // todo: better error handling
    console.log(error);
  };

  navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
};

interface IProps {
  zipcode: string;
  isFetching: boolean;
}

export default memo(function LocationWidget({ zipcode, isFetching }: IProps) {
  const { setLatLong, setZipcode } = useHouseholdActions();
  const [innerZipcode, setInnerZipcode] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInnerZipcode(zipcode);
  }, [zipcode]);

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      inputRef.current.blur();
      onSubmit();
    }
  };

  const onSubmit = () => {
    setLatLong({ lat: null, long: null });
    setZipcode(innerZipcode);
  };

  return (
    <Flex>
      <InputGroup sx={{ "div[data-lastpass-icon-root]": { display: "none" } }}>
        <InputLeftElement>
          {isFetching ? (
            <Spinner size="sm" marginLeft="5px" />
          ) : (
            <Tooltip hasArrow label="Click To Use GPS">
              <Button
                variant="sidebar"
                onClick={(_) => {
                  setZipcode("");
                  getPosByGPS(setLatLong);
                }}
              >
                <Icon as={RiMapPinLine} boxSize={5} focusable={true} />
              </Button>
            </Tooltip>
          )}
        </InputLeftElement>
        <Input
          ref={inputRef}
          variant="sidebar"
          width="125px"
          marginLeft="7px"
          placeholder="Zip Code"
          value={innerZipcode}
          inputMode="numeric"
          autoComplete="off"
          type="number"
          onChange={(e) => setInnerZipcode(e.target.value)}
          onBlur={onSubmit}
          onKeyUp={handleKeyUp}
        />
      </InputGroup>
    </Flex>
  );
});
