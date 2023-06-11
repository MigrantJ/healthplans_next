interface IProps {
  condition: boolean;
  wrap: (n: JSX.Element[]) => JSX.Element;
  children: JSX.Element[];
}

export default function ConditionalWrapper({
  condition,
  wrap,
  children,
}: IProps) {
  return condition ? wrap(children) : <>{children}</>;
}
