import { useState, useEffect } from "react";
import {
  Input,
  InputGroup,
  Icon,
  FormLabel,
  Editable,
  Tooltip,
  EditablePreview,
  EditableInput,
  useColorModeValue,
  Center,
} from "@chakra-ui/react";
import { BsCurrencyDollar } from "react-icons/bs";

interface IProps {
  income: number;
  setIncome: (i: number) => void;
}

export default function IncomeWidget({ income, setIncome }: IProps) {
  const [innerIncome, setInnerIncome] = useState(0);
  useEffect(() => {
    setInnerIncome(income);
  }, [income]);

  return (
    <>
      <FormLabel>Income</FormLabel>
      <InputGroup size="sm">
        <Center>
          <Icon as={BsCurrencyDollar} boxSize={5} focusable={true} />
        </Center>

        {/* <InputLeftAddon children="$" /> */}
        <Editable
          placeholder={innerIncome.toString()}
          isPreviewFocusable={true}
          selectAllOnFocus={false}
          value={innerIncome.toString()}
          onChange={(t) => setInnerIncome(parseFloat(t))}
          onSubmit={(t) => setIncome(parseFloat(t))}
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
          <Input as={EditableInput} value={innerIncome} />
        </Editable>
      </InputGroup>
    </>
  );
}
