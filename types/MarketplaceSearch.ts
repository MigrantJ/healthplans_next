import IHealthPlan from "./HealthPlan";
import ILocation from "./Location";
import IPerson from "./Person";

export interface Request {
  place: ILocation;
  // API also supports "SHOP" and "Any" values
  market: "Individual";
  household?: IHousehold;
  filter?: object;
  offset?: number;
}

interface IHousehold {
  income?: number;
  people?: IPerson[];
  has_married_couple?: boolean;
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

export interface ErrorResponse {
  code: string;
  status: string;
  message: string;
}
