export default interface IHousehold {
  people: IPerson[];
  has_married_couple: boolean;
}

export interface IPerson {
  age: number;
  gender: "Male" | "Female";
  has_mec: boolean;
  is_parent: boolean;
  is_pregnant: boolean;
  pregnant_with?: number;
  uses_tobacco: boolean;
  relationship: Relationship;
}

type Relationship =
  | "Self"
  | "Brother"
  | "Sister"
  | "Child"
  | "Collateral Dependent"
  | "Ex-Spouse"
  | "Foster Child"
  | "Grandson"
  | "Granddaughter"
  | "Life Partner"
  | "Nephew"
  | "Niece"
  | "Other Relationship"
  | "Other Relative"
  | "Sponsored Dependent"
  | "Spouse"
  | "Stepson"
  | "Stepdaughter"
  | "Ward";
