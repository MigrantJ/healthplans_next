import { Flex } from "@chakra-ui/react";
//todo: only import the necessary d3 modules
import * as d3 from "d3";
import { Axis, Orient } from "d3-axis-for-react";
import IHealthPlan from "@/types/HealthPlan";

interface IProps {
  plans: IHealthPlan[];
}

interface PlanText {
  x: number;
  y: number;
  text: string;
}

interface PlanBar {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
}

const GRAPH_WIDTH = 1000;
const GRAPH_HEIGHT = 600;
const PLAN_NAMES_X = 150;
const PREMIUM_BARS_X = 450;
const DEDUCTIBLE_BARS_X = 650;

export default function PlanGraph({ plans }: IProps) {
  const premiumExtent = d3.extent(plans, (p) => p.premium);
  const xScalePremium = d3
    .scaleLinear()
    .domain([0, premiumExtent[1]])
    .range([0, DEDUCTIBLE_BARS_X - PREMIUM_BARS_X - 20]);

  const deductibleExtent = d3.extent(plans, (p) => p.moops[0].amount);
  const xScaleDeductible = d3
    .scaleLinear()
    .domain([0, deductibleExtent[1]])
    .range([0, GRAPH_WIDTH - DEDUCTIBLE_BARS_X - 30]);

  const issuers: PlanText[] = [];
  const planNames: PlanText[] = [];
  const premiumBars: PlanBar[] = [];
  const deductibleBars: PlanBar[] = [];

  let row_y = 0;
  for (const p of plans) {
    issuers.push({
      x: 0,
      y: row_y + 20,
      text:
        p.issuer.name.length > 25
          ? p.issuer.name.substring(0, 22) + "..."
          : p.issuer.name,
    });
    planNames.push({
      x: PLAN_NAMES_X,
      y: row_y + 20,
      text: p.name.length > 55 ? p.name.substring(0, 52) + "..." : p.name,
    });
    premiumBars.push({
      x: PREMIUM_BARS_X,
      y: row_y,
      width: xScalePremium(p.premium),
      height: 20,
      fill: "green",
    });
    deductibleBars.push({
      x: DEDUCTIBLE_BARS_X,
      y: row_y,
      width: xScaleDeductible(p.deductibles[0].amount),
      height: 10,
      fill: "cyan",
    });
    deductibleBars.push({
      x: DEDUCTIBLE_BARS_X,
      y: row_y + 10,
      width: xScaleDeductible(p.moops[0].amount),
      height: 10,
      fill: "blue",
    });
    row_y += 25;
  }

  return (
    <>
      <Flex height="20px">
        <svg width={GRAPH_WIDTH}>
          <text x={0} y={15} fontWeight="bold">
            Issuer
          </text>
          <text x={PLAN_NAMES_X} y={15} fontWeight="bold">
            Plan
          </text>
          <text x={PREMIUM_BARS_X} y={15} fontWeight="bold">
            Premium
          </text>
          <text x={DEDUCTIBLE_BARS_X} y={15} fontWeight="bold">
            Deductible / Max Out-Of-Pocket
          </text>
        </svg>
      </Flex>
      <Flex width={GRAPH_WIDTH} height={GRAPH_HEIGHT} overflowY="auto">
        <svg width={GRAPH_WIDTH} height={row_y}>
          {issuers.map((p, i) => (
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
        </svg>
      </Flex>
      <Flex width={GRAPH_WIDTH} height="20px">
        <svg width={GRAPH_WIDTH}>
          <g transform={`translate(${PREMIUM_BARS_X}, 0)`}>
            <Axis
              orient={Orient.bottom}
              scale={xScalePremium}
              tickValues={[
                0,
                premiumExtent[1] * 0.33,
                premiumExtent[1] * 0.66,
                premiumExtent[1],
              ]}
              tickFormat={(d, i) => {
                return Math.ceil(d / 50) * 50;
              }}
              tickSizeOuter={0}
            />
          </g>
          <g transform={`translate(${DEDUCTIBLE_BARS_X}, 0)`}>
            <Axis
              orient={Orient.bottom}
              scale={xScaleDeductible}
              tickValues={[
                0,
                deductibleExtent[1] * 0.2,
                deductibleExtent[1] * 0.4,
                deductibleExtent[1] * 0.6,
                deductibleExtent[1] * 0.8,
                deductibleExtent[1],
              ]}
              tickFormat={(d, i) => {
                return Math.ceil(d / 100) * 100;
              }}
              tickSizeOuter={0}
            />
          </g>
        </svg>
      </Flex>
    </>
  );
}
