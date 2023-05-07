//todo: only import the necessary d3 modules
import * as d3 from "d3";
//todo: there may be package conflicts with the following:
import { Axis, Orient } from "d3-axis-for-react";
import IHealthPlan from "@/types/HealthPlan";

interface IProps {
  plans: IHealthPlan[];
}

const graphWidth = 1600;
const graphHeight = 300;

export default function PlanGraph({ plans }: IProps) {
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
  let y: number;
  y = 0;
  const premiumBars = plans.flatMap((p) => {
    y += 25;
    return [
      {
        x: 400,
        y: y,
        width: xScalePremium(p.premium),
        height: 20,
        fill: "green",
      },
    ];
  });
  y = 0;
  const deductibleBars = plans.flatMap((p) => {
    y += 25;
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
  y = 20;
  const planNames = plans.flatMap((p) => {
    y += 25;
    return {
      x: 200,
      y: y - 5,
      text: p.name.length > 30 ? p.name.substring(0, 30) + "..." : p.name,
    };
  });
  y = 20;
  const providers = plans.flatMap((p) => {
    y += 25;
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
      <text x={0} y={15} fontWeight="bold">
        Provider
      </text>
      <text x={200} y={15} fontWeight="bold">
        Plan
      </text>
      <text x={400} y={15} fontWeight="bold">
        Premium
      </text>
      <text x={600} y={15} fontWeight="bold">
        Deductible / Max Out-Of-Pocket
      </text>
      {providers.map((p, i) => (
        <text key={i} x={p.x} y={p.y} fontSize="12px" fontWeight="bold">
          {p.text}
        </text>
      ))}

      {planNames.map((p, i) => (
        <text key={i} x={p.x} y={p.y} fontSize="12px">
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

      <g transform={`translate(400, 275)`}>
        <Axis
          orient={Orient.bottom}
          scale={xScalePremium}
          ticks={[4]}
          tickSizeOuter={0}
        />
      </g>

      <g transform={`translate(600, 275)`}>
        <Axis
          orient={Orient.bottom}
          scale={xScaleDeductible}
          ticks={[7]}
          tickSizeOuter={0}
        />
      </g>
    </svg>
  );
}
