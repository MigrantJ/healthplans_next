//todo: only import the necessary d3 modules
import * as d3 from "d3";

import IHealthPlan from "@/types/HealthPlan";

interface IProps {
  plans: IHealthPlan[];
}

export default function PlanGraph({ plans }: IProps) {
  const graphWidth = 1200;
  const graphHeight = 300;

  const premiumExtent = d3.extent(plans, (p) => p.premium);
  const xScalePremium = d3
    .scaleLinear()
    .domain([0, premiumExtent[1]])
    .range([0, 190]);

  const deductibleExtent = d3.extent(plans, (p) => p.moops[0].amount);
  const xScaleDeductible = d3
    .scaleLinear()
    .domain([0, deductibleExtent[1]])
    .range([0, 590]);
  let y = -20;
  y = -15;
  const premiumBars = plans.flatMap((p) => {
    y += 20;
    return [
      {
        x: 400,
        y: y,
        width: xScalePremium(p.premium),
        height: 10,
        fill: "green",
      },
    ];
  });
  y = -20;
  const deductibleBars = plans.flatMap((p) => {
    y += 20;
    return [
      {
        x: 600,
        y: y,
        width: xScaleDeductible(p.deductibles[0].amount),
        height: 10,
        fill: "cyan",
      },
      {
        x: 600,
        y: y + 10,
        width: xScaleDeductible(p.moops[0].amount),
        height: 10,
        fill: "blue",
      },
    ];
  });
  y = 0;
  const planNames = plans.flatMap((p) => {
    y += 20;
    return {
      x: 200,
      y: y - 5,
      text: p.name.length > 30 ? p.name.substring(0, 30) + "..." : p.name,
    };
  });
  y = 0;
  const providers = plans.flatMap((p) => {
    y += 20;
    return {
      x: 0,
      y: y - 5,
      text:
        p.issuer.name.length > 30
          ? p.issuer.name.substring(0, 30) + "..."
          : p.issuer.name,
    };
  });
  return (
    <svg width={graphWidth} height={graphHeight}>
      {providers.map((p, i) => (
        <text key={i} x={p.x} y={p.y} font-size="12px" font-weight="bold">
          {p.text}
        </text>
      ))}

      {planNames.map((p, i) => (
        <text key={i} x={p.x} y={p.y} font-size="12px">
          {p.text}
        </text>
      ))}

      {premiumBars.map((p, i) => (
        <rect
          key={i}
          x={p.x}
          y={p.y}
          width={p.width}
          height={p.height}
          fill={p.fill}
        />
      ))}

      {deductibleBars.map((p, i) => (
        <rect
          key={i}
          x={p.x}
          y={p.y}
          width={p.width}
          height={p.height}
          fill={p.fill}
        />
      ))}
    </svg>
  );
}
