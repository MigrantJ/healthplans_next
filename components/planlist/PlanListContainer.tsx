import {
  Grid,
  HTMLChakraProps,
  ThemingProps,
  useStyleConfig,
} from "@chakra-ui/react";

interface IProps
  extends HTMLChakraProps<"div">,
    ThemingProps<"PlanListContainer"> {}

export default function PlanListContainer(props: IProps) {
  const { variant, ...rest } = props;
  const styles = useStyleConfig("PlanListContainer", { variant });

  return <Grid __css={styles} {...rest} />;
}
