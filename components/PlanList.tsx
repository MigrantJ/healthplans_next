import { Flex } from "@chakra-ui/react";

import Plan from "./Plan";
import IHealthPlan from "@/types/HealthPlan";

interface IProps {
  plans: IHealthPlan[]
}

export default function PlanList({ plans }: IProps) {
  return (
    <Flex direction="column" gap={1}>
      {plans.map((plan) => (
        <Plan plan={plan} key={plan.name} />
      ))}
    </Flex>
  );
}
