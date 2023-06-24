import { useState, memo, useRef, KeyboardEvent } from "react";
import {
  Input,
  Icon,
  Flex,
  Text,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { BsCurrencyDollar } from "react-icons/bs";
import { useIncome, useActions, useCreditEstimate } from "@/lib/store";

export default memo(function IncomeWidget() {
  const income = useIncome();
  const { setIncome } = useActions();
  const [innerIncome, setInnerIncome] = useState(income.toString());
  const inputRef = useRef<HTMLInputElement>(null);
  const creditEstimate = useCreditEstimate().data;

  console.log(creditEstimate);

  const focusInput = () => {
    if (innerIncome === "0") {
      setInnerIncome("");
    }
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      inputRef.current.blur();
      submitInput(innerIncome);
    }
  };

  const submitInput = (t: string) => {
    t = t || "0";
    const toFloat = parseFloat(t);
    setInnerIncome(toFloat.toString());
    setIncome(toFloat);
  };

  const taxCredit =
    creditEstimate.aptc > 0 ? `$${creditEstimate.aptc} tax credit` : "";

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
          ref={inputRef}
          variant="sidebar"
          width="130px"
          paddingLeft="30px"
          value={innerIncome}
          inputMode="numeric"
          type="number"
          onChange={(e) => setInnerIncome(e.target.value)}
          onFocus={(_) => focusInput()}
          onBlur={(_) => submitInput(innerIncome)}
          onKeyUp={handleKeyUp}
        />
      </InputGroup>
      <Text as="span" color="green" fontWeight="bold" paddingLeft="10px">
        {taxCredit}
      </Text>
    </Flex>
  );
});
