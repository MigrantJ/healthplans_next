import {
  Flex,
  HTMLChakraProps,
  ThemingProps,
  useStyleConfig,
} from "@chakra-ui/react";

interface IProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"ErrorMessageContainer"> {}

export default function ErrorMessageContainer(props: IProps) {
  const { variant, ...rest } = props;
  const styles = useStyleConfig("ErrorMessageContainer", { variant });

  return <Flex __css={styles} {...rest} />;
}
