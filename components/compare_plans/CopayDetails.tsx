import React from "react";
import { Box, Text } from "@chakra-ui/react";

import { Benefit } from "@/types/HealthPlan";

interface IProps {
  benefit: Benefit;
}

export default function CopayDetails({ benefit }: IProps) {
  return (
    <Box justifySelf="start" alignSelf="start">
      {benefit.cost_sharings.map((cs, i) => {
        return (
          <React.Fragment key={i}>
            <Text textDecor="underline">{cs.network_tier}</Text>
            <Text>{cs.display_string}</Text>
          </React.Fragment>
        );
      })}
    </Box>
  );
}
