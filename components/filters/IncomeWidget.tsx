import { useState, memo } from "react";
import {
  Input,
  Icon,
  Flex,
  Text,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { BsCurrencyDollar } from "react-icons/bs";
import { Estimate } from "@/types/GetCreditEstimate";

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
    <Flex flexDirection="column">
      <InputGroup>
        <InputLeftElement>
          <Icon
            as={BsCurrencyDollar}
            boxSize={5}
            marginX="10px"
            color="gray.600"
          />
        </InputLeftElement>
        <Input
          variant="sidebar"
          width="130px"
          paddingLeft="30px"
          value={innerIncome}
          inputMode="numeric"
          type="number"
          onChange={(e) => setInnerIncome(e.target.value)}
          onBlur={(_) => submitInput(innerIncome)}
        />
      </InputGroup>
      <Text as="span" color="green" fontWeight="bold" paddingLeft="10px">
        {taxCredit}
      </Text>
    </Flex>
  );
});
