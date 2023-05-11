import NextLink from "next/link";
import { Text, Link } from "@chakra-ui/react";

export default function InvalidStateMessage({
  state,
  exchange_name,
  exchange_url,
}) {
  return (
    <>
      <Text>
        Your state does not use the federally-run healthcare exchange. To visit
        your state's exchange, click the link below:
      </Text>
      <Link as={NextLink} href={exchange_url}>
        {exchange_name}
      </Link>
    </>
  );
}
