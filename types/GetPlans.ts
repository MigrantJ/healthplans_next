import ILocation from "./Location";
import IHealthPlan from "./HealthPlan";
import IPerson from "./Person";

export interface Request {
  location: ILocation;
  income: number;
  people: IPerson[];
}

export interface Response {
  alt_data?: AltData;
  plans: IHealthPlan[];
  total: number;
  ranges?: {
    premiums: {
      min: number;
      max: number;
    };
    deductibles: {
      min: number;
      max: number;
    };
  };
  facet_groups?: FacetGroup[];
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

type AltData = AltDataNone | AltDataInvalidState;

interface AltDataNone {
  type: "None";
}

interface AltDataInvalidState {
  type: "InvalidState";
  state: string;
  exchange_name: string;
  exchange_url: string;
}