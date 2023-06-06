import IFilter, {
  MetalLevel,
  DiseaseMgmtPrograms,
  PlanType,
} from "@/types/Filter";
import { FacetGroup, Facet } from "@/types/MarketplaceSearch";
import DualSlider from "./DualSlider";
import MultiSelect from "./MultiSelect";
import { Estimate } from "@/types/GetCreditEstimate";

interface IProps {
  filter: IFilter;
  setFilter: (f: IFilter) => void;
  facetGroups: FacetGroup[];
  ranges: {
    premiums: { min: number; max: number };
    deductibles: { min: number; max: number };
  };
  creditEstimates: Estimate[];
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export default function FilterWidget({
  filter,
  setFilter,
  facetGroups,
  ranges,
  creditEstimates,
}: IProps) {
  const facetGroupMap: { [k: string]: Facet[] } =
    facetGroups?.reduce((acc, curr) => {
      acc[curr.name] = curr.facets;
      return acc;
    }, {}) || {};

  const taxCredit = creditEstimates?.[0].aptc || 0;
  const premiumRangeExtents = {
    min: Math.max(ranges.premiums.min - taxCredit, 0),
    max: Math.max(ranges.premiums.max - taxCredit, 1),
  };

  return (
    <>
      <DualSlider
        label="Premium"
        initRange={filter?.premium_range || premiumRangeExtents}
        rangeExtents={premiumRangeExtents}
        displayMod={(num) => {
          return formatter.format(num);
        }}
        onChangeEnd={([min, max]) =>
          setFilter({ ...filter, premium_range: { min, max } })
        }
      />
      <DualSlider
        label="Deductible"
        initRange={filter?.deductible_range || ranges.deductibles}
        rangeExtents={ranges.deductibles}
        displayMod={(num) => {
          return formatter.format(num);
        }}
        onChangeEnd={([min, max]) =>
          setFilter({ ...filter, deductible_range: { min, max } })
        }
      />
      <MultiSelect<PlanType>
        label="Plan Types"
        options={facetGroupMap["types"].map((e) => [
          e.value as PlanType,
          e.count,
        ])}
        onChangeEnd={(e) => {
          setFilter({
            ...filter,
            types: e,
          });
        }}
      />
      <MultiSelect<MetalLevel>
        label="Metal Levels"
        options={facetGroupMap["metalLevels"].map((e) => [
          e.value as MetalLevel,
          e.count,
        ])}
        onChangeEnd={(e) => {
          setFilter({
            ...filter,
            metal_levels: e,
          });
        }}
      />

      <MultiSelect<DiseaseMgmtPrograms>
        label="Medical Management Programs"
        options={facetGroupMap["diseaseMgmtPrograms"].map((e) => [
          e.value as DiseaseMgmtPrograms,
          e.count,
        ])}
        onChangeEnd={(e) => {
          setFilter({
            ...filter,
            disease_mgmt_programs: e,
          });
        }}
      />
      <MultiSelect<string>
        label="Insurance Companies"
        options={facetGroupMap["issuers"].map((e) => [e.value, e.count])}
        onChangeEnd={(e) => {
          setFilter({
            ...filter,
            issuers: e,
          });
        }}
      />
    </>
  );
}
