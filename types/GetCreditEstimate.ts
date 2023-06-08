import ILocation from "./Location";
import IPerson from "./Person";

export interface InitRequest {
  location: ILocation;
  income: number;
  people: IPerson[];
}

export interface Request {
  place: ILocation;
  market: "Individual";
  household: IHousehold;
}

export interface Response {
  estimates: Estimate[];
}

interface IHousehold {
  income?: number;
  people?: IPerson[];
  has_married_couple?: boolean;
}

export interface Estimate {
  aptc: number;
  csr: CSR;
  hardship_exemption: boolean;
  is_medicaid_chip: boolean;
  in_coverage_gap: boolean;
}

type CSR =
  | "73% AV Level Silver Plan CSR"
  | "87% AV Level Silver Plan CSR"
  | "94% AV Level Silver Plan CSR";
