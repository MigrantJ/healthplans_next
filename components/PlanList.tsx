import { Flex } from "@chakra-ui/react";
import Plan from "./Plan";

export default function PlanList({ plans }) {
  return (
    <Flex direction="column" gap={1}>
      {plans.map((plan) => (
        <Plan plan={plan} key={plan.name} />
      ))}
    </Flex>
  );
}
