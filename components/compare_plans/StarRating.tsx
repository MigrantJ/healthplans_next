import { Flex, Text, Icon } from "@chakra-ui/react";
import { RiStarFill, RiStarLine } from "react-icons/ri";
import InfoIcon from "../InfoIcon";

interface IProps {
  numStars: number;
  reasonForZero: string;
}

export default function StarRating({ numStars, reasonForZero }: IProps) {
  if (numStars > 0) {
    return (
      <>
        {[...Array<null>(5)].map((_, i) =>
          i + 1 <= numStars ? (
            <Icon as={RiStarFill} key={i} />
          ) : (
            <Icon as={RiStarLine} key={i} />
          )
        )}
      </>
    );
  } else {
    return (
      <Flex>
        <Text>N/A</Text>
        <InfoIcon text={reasonForZero} />
      </Flex>
    );
  }
}
