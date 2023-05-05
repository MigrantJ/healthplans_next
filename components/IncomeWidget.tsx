import { Input, InputGroup, InputLeftAddon, FormLabel } from "@chakra-ui/react";

interface IProps {
  income: number;
  setIncome: (i: number) => void;
}

export default function IncomeWidget({ income, setIncome }: IProps) {
  return (
    <>
      <FormLabel>Income</FormLabel>
      <InputGroup size="sm">
        <InputLeftAddon children="$" />
        <Input
          value={income}
          onChange={(e) => setIncome(parseFloat(e.target.value))}
        />
      </InputGroup>
    </>
  );
}
