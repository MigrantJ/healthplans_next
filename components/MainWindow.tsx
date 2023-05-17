import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Divider, Flex, Heading } from "@chakra-ui/react";

import getPlans from "@/lib/getPlans";
import ILocation from "@/types/Location";
import IPerson from "@/types/Person";
import IFilter from "@/types/Filter";
import * as GetPlans from "@/types/GetPlans";
import LocationWidget from "./LocationWidget";
import IncomeWidget from "./IncomeWidget";
import PeopleWidget from "./PeopleWidget";
import FilterWidget from "./FilterWidget";
import DataViewer from "./DataViewer";

export default function MainWindow() {
  const [location, setLocation] = useState<ILocation>();
  const [income, setIncome] = useState(0);
  const [people, setPeople] = useState<IPerson[]>([]);
  const [filter, setFilter] = useState<IFilter>();

  const results = useQuery<GetPlans.Response, Error>({
    queryKey: ["query", { location, income, people }],
    queryFn: getPlans,
    enabled: !!location,
  });

  return (
    <>
      <Flex>
        <Flex direction="column" paddingY={10} paddingX={5}>
          <Heading size="md">Setup</Heading>
          <Divider />
          <Heading size="sm">Location</Heading>
          <LocationWidget {...{ location, setLocation }} />
          <Divider />
          <Heading size="sm">Household</Heading>
          <IncomeWidget {...{ income, setIncome }} />
          <PeopleWidget {...{ people, setPeople }} />
          <Divider />
          <Heading size="sm">Filters</Heading>
          <FilterWidget
            {...{ filter, setFilter }}
            facetGroups={[]}
            ranges={{
              premium: { min: 0, max: 100 },
              deductible: { min: 0, max: 100 },
            }}
          />
        </Flex>
        <Flex direction="column" w="100%">
          <DataViewer {...{ results, income, people }} />
        </Flex>
      </Flex>
    </>
  );
}
