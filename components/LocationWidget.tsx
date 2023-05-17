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
  useColorModeValue,
} from "@chakra-ui/react";
import { RiMapPinLine } from "react-icons/ri";

import ILocation from "@/types/Location";

interface IProps {
  location: ILocation;
  getPosByGPS: () => void;
  getPosByZipCode: (zipcode: string) => Promise<void>;
}

export default function LocationWidget({
  location,
  getPosByGPS,
  getPosByZipCode,
}: IProps) {
  const [zipcode, setZipcode] = useState("");
  useEffect(() => {
    setZipcode(location?.zipcode || "");
  }, [location]);

  return (
    <Flex>
      <Center>
        <Tooltip hasArrow label="Click To Use GPS">
          <Button
            onClick={(e) => {
              getPosByGPS();
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
        onSubmit={(t) => void getPosByZipCode(t)}
        w={100}
      >
        <Tooltip hasArrow label="Click to Edit" shouldWrapChildren={true}>
          <EditablePreview
            bg={useColorModeValue("gray.100", "gray.700")}
            px={4}
            py={2}
            _hover={{
              background: useColorModeValue("gray.200", "gray.700"),
            }}
          />
        </Tooltip>
        <Input as={EditableInput} value={location?.zipcode} />
      </Editable>
    </Flex>
  );
}
