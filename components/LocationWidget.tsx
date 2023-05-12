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

interface IProps {
  zipCode: string;
  setZipCode: (zipcode: string) => void;
  getPosByGPS: () => void;
  getPosByZipCode: (zipcode: string) => Promise<void>;
}

export default function LocationWidget({
  zipCode,
  setZipCode,
  getPosByGPS,
  getPosByZipCode,
}: IProps) {
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
        placeholder={zipCode || "Zip Code"}
        isPreviewFocusable={true}
        selectAllOnFocus={false}
        value={zipCode}
        onChange={(t) => setZipCode(t)}
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
        <Input as={EditableInput} value={zipCode} />
      </Editable>
    </Flex>
  );
}
