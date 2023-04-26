import { IHealthPlan } from "@/types/HealthPlan";

interface IProps {
  plan: IHealthPlan;
}

export default function Plan({ plan }: IProps) {
  return <div>{plan.name}</div>;
}
