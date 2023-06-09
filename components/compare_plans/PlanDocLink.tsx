import NextLink from "next/link";
import { Flex, Icon, Link, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface IProps {
  text: string;
  icon: IconType;
  url: string;
}

export default function PlanDocLink({ text, icon, url }: IProps) {
  return (
    <Link as={NextLink} href={url} isExternal>
      <Flex alignItems="center">
        <span>
          <Icon as={icon} boxSize={7} />
        </span>
        <Text display="inline-block">{text}</Text>
      </Flex>
    </Link>
  );
}
