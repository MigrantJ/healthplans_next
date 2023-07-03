import NextLink from "next/link";
import { Flex, Heading, Text, Link } from "@chakra-ui/react";

interface IProps {
  state: string;
  exchange_name: string;
  exchange_url: string;
}

export default function InvalidStateMessage({
  exchange_name,
  exchange_url,
}: IProps) {
  return (
    <Flex
      direction="column"
      backgroundColor="white"
      alignItems="center"
      padding="10px"
      margin="0 auto"
      width="75%"
      minHeight="100vh"
    >
      <Heading>Sorry!</Heading>
      <Text paddingY="20px">
        It looks like your state does not use the federally-run healthcare
        exchange, so we can&apos;t automatically show healthcare plans for you.
        To visit your state&apos;s exchange, click the link below:
      </Text>
      <Link as={NextLink} href={exchange_url}>
        {exchange_name}
      </Link>
    </Flex>
  );
}
