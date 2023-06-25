import { memo } from "react";
import { MetalLevel, DiseaseMgmtPrograms, PlanType } from "@/types/Filter";
import { Facet } from "@/types/MarketplaceSearch";
import DualSlider from "./DualSlider";
import MultiSelect from "./MultiSelect";
import FilterGroup from "./FilterGroup";
import currencyFormatter from "@/lib/currencyFormatter";
import {
  useHouseholdActions,
  useCreditEstimate,
  useFilter,
  usePlanFacetGroups,
  usePlanRanges,
} from "@/lib/store";

export default memo(function FilterWidget() {
  const creditEstimate = useCreditEstimate().data;
  const filter = useFilter();
  const { setFilter } = useHouseholdActions();
  const facetGroups = usePlanFacetGroups();
  const ranges = usePlanRanges();
  if (!facetGroups || !ranges) return <></>;
  const facetGroupMap: { [k: string]: Facet[] } =
    facetGroups?.reduce((acc, curr) => {
      acc[curr.name] = curr.facets;
      return acc;
    }, {}) || {};

  const taxCredit = creditEstimate.aptc || 0;
  const premiumRangeExtents = {
    min: Math.max(ranges.premiums.min - taxCredit, 0),
    max: Math.max(ranges.premiums.max - taxCredit, 1),
  };

  return (
    <>
      <FilterGroup
        isFormLabel={false}
        headingText="Premium"
        infoText="This is the amount you'll pay for your insurance each month."
      >
        <DualSlider
          rangeExtents={premiumRangeExtents}
          displayMod={(num: number) => {
            return currencyFormatter.format(num);
          }}
          onChangeEnd={([min, max]) =>
            setFilter({ ...filter, premium_range: { min, max } })
          }
        />
      </FilterGroup>
      <FilterGroup
        isFormLabel={false}
        headingText="Deductible"
        infoText="This is the amount you'll pay for covered services before your plan starts to pay."
      >
        <DualSlider
          rangeExtents={ranges.deductibles}
          displayMod={(num: number) => {
            return currencyFormatter.format(num);
          }}
          onChangeEnd={([min, max]) =>
            setFilter({ ...filter, deductible_range: { min, max } })
          }
        />
      </FilterGroup>
      {facetGroupMap["types"] && (
        <FilterGroup
          headingText="Plan Types"
          infoText="Most plans are either HMO or PPO. HMOs tend to have lower monthly premiums, while PPOs offer more flexibility in what providers you can use."
        >
          <MultiSelect<PlanType>
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
        </FilterGroup>
      )}
      {facetGroupMap["metalLevels"] && (
        <FilterGroup
          headingText="Metal Levels"
          infoText="These categories are based on how you and your plan split the costs of your healthcare. Bronze plans have low premiums, but high deductibles. Gold / Platinum plans have the opposite. Silver plans are more in the middle, and may offer cost-sharing reductions depending on your income."
        >
          <MultiSelect<MetalLevel>
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
        </FilterGroup>
      )}
      {facetGroupMap["diseaseMgmtPrograms"] && (
        <FilterGroup
          headingText="Medical Management Programs"
          infoText="Filter plans based on covered services."
        >
          <MultiSelect<DiseaseMgmtPrograms>
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
        </FilterGroup>
      )}
      {facetGroupMap["issuers"] && (
        <FilterGroup
          headingText="Insurance Companies"
          infoText="Filter plans based on which insurance company provides them."
        >
          <MultiSelect<string>
            options={facetGroupMap["issuers"].map((e) => [e.value, e.count])}
            onChangeEnd={(e) => {
              setFilter({
                ...filter,
                issuers: e,
              });
            }}
          />
        </FilterGroup>
      )}
    </>
  );
});
