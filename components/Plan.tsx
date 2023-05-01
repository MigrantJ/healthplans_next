import { Card, CardHeader, CardBody, Text, Heading } from "@chakra-ui/react";

import IHealthPlan from "@/types/HealthPlan";

interface IProps {
  plan: IHealthPlan;
}

export default function Plan({ plan }: IProps) {
  return (
    <Card>
      <CardHeader>
        <Heading>{plan.name}</Heading>
      </CardHeader>
      <CardBody>
        <Text data-testid="plan-name-display">{plan.metal_level}</Text>
      </CardBody>
    </Card>
  );
}
