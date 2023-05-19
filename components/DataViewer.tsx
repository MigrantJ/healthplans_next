import { useEffect } from "react";
import {
  Flex,
  Text,
  SkeletonText,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { UseInfiniteQueryResult } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import * as GetPlans from "@/types/GetPlans";
import IFilter from "@/types/Filter";
import IHealthPlan from "@/types/HealthPlan";
import filterPlans from "@/lib/filterPlans";

interface IProps {
  results: UseInfiniteQueryResult<GetPlans.Response, Error>;
  filter: IFilter;
}

export default function DataViewer({ results, filter }: IProps) {
  const { ref, inView } = useInView();

  const { hasNextPage, fetchNextPage, isFetching } = results;

  useEffect(() => {
    if (!isFetching && hasNextPage && inView) {
      void fetchNextPage();
    }
  }, [inView]);

  // todo: improve error handling
  if (results.isError) {
    return <Text>{results.error.message}</Text>;
  }

  if (!results.data) {
    return <></>;
  }

  const filteredPlans: IHealthPlan[] = filterPlans(results.data.pages, filter);

  return (
    <Flex direction="column" margin={"0 auto"}>
      <TableContainer>
        <Table variant="striped" colorScheme="gray" size={"sm"}>
          <TableCaption placement="top">Estimates Only</TableCaption>
          <Thead>
            <Tr>
              <Th minW={300} maxW={500}>
                <Text>Issuer</Text>
                <Text>Plan Name</Text>
              </Th>
              <Th minW={200} maxW={200}>
                Premium
                <svg height={20}>
                  <rect width={100} height={20} fill="green" />
                </svg>
              </Th>
              <Th minW={350} maxW={350}>
                Deductible / Max Out-of-Pocket
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredPlans.map((plan) => {
              return (
                <Tr key={plan.id}>
                  <Td minW={300} maxW={500}>
                    <Text as="b">{plan.issuer.name}</Text>
                    <Text overflow={"hidden"} textOverflow={"ellipsis"}>
                      {plan.name}
                    </Text>
                  </Td>
                  <Td minW={200} maxW={200}>
                    <svg height={20}>
                      <rect width={100} height={20} fill="green" />
                    </svg>
                  </Td>
                  <Td minW={350} maxW={350}>
                    <svg height={20}>
                      <rect width={100} height={10} fill="cyan" />
                      <rect y={10} width={100} height={10} fill="blue" />
                    </svg>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>

      {hasNextPage && (
        <Flex direction="column">
          {/* invisible element for tracking when user scrolls to bottom */}
          <Flex ref={ref} position="absolute" display={isFetching && "none"} />
          <SkeletonText noOfLines={4} />
          <SkeletonText noOfLines={4} />
          <SkeletonText noOfLines={4} />
          <SkeletonText noOfLines={4} />
          <SkeletonText noOfLines={4} />
          <SkeletonText noOfLines={4} />
          <SkeletonText noOfLines={4} />
          <SkeletonText noOfLines={4} />
        </Flex>
      )}
    </Flex>
  );
}
