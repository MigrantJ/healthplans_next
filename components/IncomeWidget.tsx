import { Input, InputGroup, InputLeftAddon, FormLabel } from "@chakra-ui/react";

export default function IncomeWidget({ income, setIncome }) {
  return (
    <>
      <FormLabel>Income</FormLabel>
      <InputGroup size="sm">
        <InputLeftAddon children="$" />
        <Input value={income} onChange={(e) => setIncome(e.target.value)} />
      </InputGroup>
    </>
  );
}
