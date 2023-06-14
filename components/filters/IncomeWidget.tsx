import { useState, memo } from "react";
import {
  Input,
  Icon,
  Editable,
  Tooltip,
  EditablePreview,
  EditableInput,
  useColorModeValue,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import { BsCurrencyDollar } from "react-icons/bs";
import { Estimate } from "@/types/GetCreditEstimate";

const onlyNumbers = /^[0-9]*$/;

interface IProps {
  income: number;
  setIncome: (i: number) => void;
  creditEstimates: Estimate[];
}

export default memo(function IncomeWidget({
  income,
  setIncome,
  creditEstimates,
}: IProps) {
  const [innerIncome, setInnerIncome] = useState(income.toString());

  const changeInput = (t: string) => {
    if (!onlyNumbers.test(t)) return;
    setInnerIncome(t);
  };

  const submitInput = (t: string) => {
    t = t || "0";
    const toFloat = parseFloat(t);
    setInnerIncome(toFloat.toString());
    setIncome(toFloat);
  };

  const taxCredit =
    creditEstimates?.length && creditEstimates[0].aptc > 0
      ? `$${creditEstimates[0].aptc} tax credit`
      : "";

  return (
    <>
      <Flex alignItems="center">
        <Center>
          <Icon as={BsCurrencyDollar} boxSize={5} focusable={true} />
        </Center>
        <Editable
          placeholder={innerIncome}
          isPreviewFocusable={true}
          selectAllOnFocus={false}
          value={innerIncome}
          onChange={(t) => changeInput(t)}
          onSubmit={(t) => submitInput(t)}
          width="100px"
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
          <Input as={EditableInput} value={innerIncome} inputMode="numeric" />
        </Editable>
        <Text as="span" color="green" fontWeight="bold">
          {taxCredit}
        </Text>
      </Flex>
    </>
  );
});
