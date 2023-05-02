//todo: only import the necessary d3 modules
import * as d3 from "d3";

import IHealthPlan from "@/types/HealthPlan";

interface IProps {
  plans: IHealthPlan[];
}

export default function PlanGraph({ plans }: IProps) {
  const graphWidth = 400;
  const graphHeight = 300;

  const extent = d3.extent(plans, (p) => p.moops[0].amount);
  const yScale = d3
    .scaleLinear()
    .domain([0, extent[1]])
    .range([0, graphHeight]);
  let x = -40;
  const bars = plans.flatMap((p) => {
    x += 40;
    return [
      {
        x: x,
        y: graphHeight - yScale(p.deductibles[0].amount),
        height: yScale(p.deductibles[0].amount),
        fill: "red",
      },
      {
        x: x + 10,
        y: graphHeight - yScale(p.moops[0].amount),
        height: yScale(p.moops[0].amount),
        fill: "blue",
      },
    ];
  });
  return (
    <svg width={graphWidth} height={graphHeight}>
      {bars.map((p) => (
        <rect x={p.x} y={p.y} width={10} height={p.height} fill={p.fill} />
      ))}
    </svg>
  );
}
