import ILocation from "./Location";
import IHealthPlan from "./HealthPlan";
import IPerson from "./Person";

export interface Request {
  location: ILocation;
  income: number;
  people: IPerson[];
}

export interface SuccessResponse {
  plans: IHealthPlan[];
  total: number;
  rate_area: {
    state: string;
    area: number;
  };
  ranges: {
    premiums: {
      min: number;
      max: number;
    };
    deductibles: {
      min: number;
      max: number;
    };
  };
  facet_groups: FacetGroup[];
}

interface FacetGroup {
  name: string;
  facets: Facet;
}

interface Facet {
  value: string;
  count: number;
  standardized_plans?: number;
}
