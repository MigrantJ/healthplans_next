import IFilter from "@/types/Filter";
import IHealthPlan from "@/types/HealthPlan";

export default function filterPlans(
  plans: IHealthPlan[],
  filter: IFilter
): IHealthPlan[] {
  return plans.filter((plan) => {
    // premium
    if (
      filter?.premium_range &&
      (filter.premium_range.min > plan.premium ||
        plan.premium > filter.premium_range.max)
    )
      return false;

    // deductible
    if (
      filter?.deductible_range &&
      (filter.deductible_range.min > plan.deductibles[0].amount ||
        plan.deductibles[0].amount > filter.deductible_range.max)
    )
      return false;

    // plan types
    if (filter?.types?.length && !filter.types.includes(plan.type))
      return false;

    // metal level
    if (
      filter?.metal_levels?.length &&
      !filter.metal_levels.includes(plan.metal_level)
    )
      return false;

    // medical management programs
    if (
      filter?.disease_mgmt_programs?.length &&
      !filter.disease_mgmt_programs.every((v) =>
        plan.disease_mgmt_programs.includes(v)
      )
    )
      return false;

    // issuers
    if (filter?.issuers?.length && !filter.issuers.includes(plan.issuer.name))
      return false;
    return true;
  });
}
