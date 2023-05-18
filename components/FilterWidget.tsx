import IFilter, {
  metalLevelOptions,
  MetalLevel,
  diseaseMgmtProgramsOptions,
  DiseaseMgmtPrograms,
  PlanType,
  planTypeOptions,
} from "@/types/Filter";
import { FacetGroup, Facet } from "@/types/MarketplaceSearch";
import DualSlider from "./DualSlider";
import MultiSelect from "./MultiSelect";

interface IProps {
  filter: IFilter;
  setFilter: (f: IFilter) => void;
  facetGroups: FacetGroup[];
  ranges: {
    premiums: { min: number; max: number };
    deductibles: { min: number; max: number };
  };
}

export default function FilterWidget({
  filter,
  setFilter,
  facetGroups,
  ranges,
}: IProps) {
  const facetGroupMap: { [k: string]: Facet[] } =
    facetGroups?.reduce((acc, curr) => {
      acc[curr.name] = curr.facets;
      return acc;
    }, {}) || {};

  return (
    <>
      <DualSlider
        label="Premium"
        initRange={filter?.premium_range || ranges.premiums}
        rangeExtents={ranges.premiums}
        onChangeEnd={([min, max]) =>
          setFilter({ ...filter, premium_range: { min, max } })
        }
      />
      <DualSlider
        label="Deductible"
        initRange={filter?.deductible_range || ranges.deductibles}
        rangeExtents={ranges.deductibles}
        onChangeEnd={([min, max]) =>
          setFilter({ ...filter, deductible_range: { min, max } })
        }
      />
      {/* spread is used to remove readonly from list */}
      <MultiSelect<PlanType>
        label="Plan Types"
        options={[...planTypeOptions]}
        onChangeEnd={(e) => {
          setFilter({
            ...filter,
            types: e,
          });
        }}
      />
      <MultiSelect<MetalLevel>
        label="Metal Levels"
        options={[...metalLevelOptions]}
        onChangeEnd={(e) => {
          setFilter({
            ...filter,
            metal_levels: e,
          });
        }}
      />
      <MultiSelect<DiseaseMgmtPrograms>
        label="Medical Management Programs"
        options={[...diseaseMgmtProgramsOptions]}
        onChangeEnd={(e) => {
          setFilter({
            ...filter,
            disease_mgmt_programs: e,
          });
        }}
      />
      <MultiSelect<string>
        label="Insurance Companies"
        options={facetGroupMap["issuers"].map((e) => e.value)}
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
