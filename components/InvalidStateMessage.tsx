import NextLink from "next/link";
import { Heading, Text, Link } from "@chakra-ui/react";

interface IProps {
  state: string;
  exchange_name: string;
  exchange_url: string;
}

export default function InvalidStateMessage({
  state,
  exchange_name,
  exchange_url,
}: IProps) {
  return (
    <>
      <Heading>Sorry!</Heading>
      <Text>
        It looks like your state does not use the federally-run healthcare
        exchange, so we can&apos;t automatically show healthcare plans for you.
        To visit your state&apos;s exchange, click the link below:
      </Text>
      <Link as={NextLink} href={exchange_url}>
        {exchange_name}
      </Link>
    </>
  );
}
