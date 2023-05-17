export default interface IFilter {
  disease_mgmt_programs: DiseaseMgmtPrograms[];
  division: ProductDivision;
  issuer: string;
  issuers: string[];
  metal_levels: MetalLevel[];
  metal_level: MetalLevel;
  metal_design_types: MetalDesignType[];
  design_types: DesignType;
  premium: number;
  type: PlanType;
  types: PlanType[];
  deductible: number;
  hsa: boolean;
  oopc: number;
  child_dental_coverage: boolean;
  adult_dental_coverage: boolean;
  drugs: string[];
  // NPIs
  providers: string[];
  quality_rating: number;
  simple_choice: boolean;
  premium_range: Range;
  deductible_range: Range;
}

export const diseaseMgmtProgramsOptions = [
  "Asthma",
  "Heart Disease",
  "Depression",
  "Diabetes",
  "High Blood Pressure and High Cholesterol",
  "Low Back Pain",
  "Pain Management",
  "Pregnancy",
  "Weight Loss Programs",
] as const;
export type DiseaseMgmtPrograms = (typeof diseaseMgmtProgramsOptions)[number];

export const productDivisionOptions = ["HealthCare", "Dental"] as const;
type ProductDivision = (typeof productDivisionOptions)[number];

export const metalLevelOptions = [
  "Catastrophic",
  "Silver",
  "Bronze",
  "Gold",
  "Platinum",
] as const;
export type MetalLevel = (typeof metalLevelOptions)[number];

interface MetalDesignType {
  metal_level: MetalLevel;
  design_types: DesignType[];
}

export const designTypeOptions = [
  "DESIGN1",
  "DESIGN2",
  "DESIGN3",
  "DESIGN4",
  "DESIGN5",
  "NOT_APPLICABLE",
];
type DesignType = (typeof designTypeOptions)[number];

export const planTypeOptions = [
  "Indemnity",
  "PPO",
  "HMO",
  "EPO",
  "POS",
] as const;
export type PlanType = (typeof planTypeOptions)[number];

interface Range {
  min: number;
  max: number;
}
