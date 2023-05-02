import { Card, CardHeader, CardBody, Text, Heading } from "@chakra-ui/react";

import IHealthPlan from "@/types/HealthPlan";

interface IProps {
  plan: IHealthPlan;
}

export default function Plan({ plan }: IProps) {
  return (
    <Card>
      <CardBody>
        <Text data-testid="plan-name-display" size="sm">
          {plan.name}
        </Text>
        <Text>Deductible: {plan.deductibles[0]?.amount}</Text>
        <Text>Max Out-Of-Pocket: {plan.moops[0]?.amount}</Text>
      </CardBody>
    </Card>
  );
}
