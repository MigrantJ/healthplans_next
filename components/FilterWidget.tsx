import IFilter, {
  metalLevelOptions,
  MetalLevel,
  diseaseMgmtProgramsOptions,
  DiseaseMgmtPrograms,
  PlanType,
  planTypeOptions,
} from "@/types/Filter";
import { FacetGroup } from "@/types/MarketplaceSearch";
import DualSlider from "./DualSlider";
import MultiSelect from "./MultiSelect";

interface IProps {
  filter: IFilter;
  setFilter: (f: IFilter) => void;
  facetGroups: FacetGroup[];
  ranges: {
    premium: { min: number; max: number };
    deductible: { min: number; max: number };
  };
}

export default function FilterWidget({
  filter,
  setFilter,
  facetGroups,
  ranges,
}: IProps) {
  const facetGroupMap =
    facetGroups?.reduce((acc, curr) => {
      acc[curr.name] = curr.facets;
      return acc;
    }, {}) || {};

  return (
    <>
      <DualSlider
        label="Premium"
        initRange={filter?.premium_range || ranges.premium}
        rangeExtents={ranges.premium}
        onChangeEnd={([min, max]) =>
          setFilter({ ...filter, premium_range: { min, max } })
        }
      />
      <DualSlider
        label="Deductible"
        initRange={filter?.deductible_range || ranges.deductible}
        rangeExtents={ranges.deductible}
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
    </>
  );
}
