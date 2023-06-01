import { Grid, Text } from "@chakra-ui/react";

import IHealthPlan from "@/types/HealthPlan";

interface IProps {
  plans: IHealthPlan[];
}

export default function ComparePlans({ plans }: IProps) {
  return (
    <Grid>
      {plans.map((plan, i) => {
        return <Text key={plan.id}>{plan.name}</Text>;
      })}
    </Grid>
  );
}
