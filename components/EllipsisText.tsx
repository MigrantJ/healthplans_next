import { Text, chakra } from "@chakra-ui/react";

const EllipsisText = chakra(Text, {
  baseStyle: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
});

export default EllipsisText;
