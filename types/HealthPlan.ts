import { MetalLevel, PlanType } from "./Filter";

export default interface IHealthPlan {
  id: string;
  name: string;
  premium: number;
  premium_w_credit: number;
  ehb_premium: number;
  pediatric_ehb_premium: number;
  aptc_eligible_premium: number;
  metal_level: MetalLevel;
  type: PlanType;
  design_type: string;
  state: string;
  benefits?: Benefit[] | null;
  deductibles?: DeductibleOrMOOP[] | null;
  tiered_deductibles?: DeductibleOrMOOP[] | null;
  disease_mgmt_programs?: string[] | null;
  has_national_network: boolean;
  market: string;
  max_age_child: number;
  moops?: DeductibleOrMOOP[] | null;
  tiered_moops?: DeductibleOrMOOP[] | null;
  product_division: string;
  benefits_url: string;
  brochure_url: string;
  formulary_url: string;
  network_url: string;
  issuer: Issuer;
  hsa_eligible: boolean;
  insurance_market: string;
  specialist_referral_required: boolean;
  specialist_referral_text: string;
  oopc: number;
  tobacco_lookback: number;
  suppression_state: string;
  guaranteed_rate: boolean;
  simple_choice: boolean;
  quality_rating: QualityRating;
  sbcs: Sbcs;
  is_ineligible: boolean;
  rx_3mo_mail_order: boolean;
  covers_nonhyde_abortion: boolean;
  service_area_id: string;
}

export interface Benefit {
  name: string;
  covered: boolean;
  cost_sharings?: (CostSharing | null)[] | null;
  explanation: string;
  exclusions: string;
  has_limits: boolean;
  limit_unit: string;
  limit_quantity: number;
}

export interface CostSharing {
  coinsurance_rate: number;
  coinsurance_options: string;
  copay_amount: number;
  copay_options: string;
  network_tier: string;
  csr: string;
  display_string: string;
}

export interface DeductibleOrMOOP {
  type: string;
  amount: number;
  csr: string;
  network_tier: string;
  family_cost: string;
  individual: boolean;
  family: boolean;
  display_string: string;
}

export interface Issuer {
  id: string;
  name: string;
  eligible_dependents?: string[] | null;
  state: string;
  individual_url: string;
  shop_url: string;
  toll_free: string;
  tty: string;
}

export interface QualityRating {
  available: boolean;
  year: number;
  global_rating: number;
  clinical_quality_management_rating: number;
  enrollee_experience_rating: number;
  plan_efficiency_rating: number;
  global_not_rated_reason: string;
  clinical_quality_management_not_rated_reason: string;
  enrollee_experience_not_rated_reason: string;
  plan_efficiency_not_rated_reason: string;
}

export interface Sbcs {
  baby: BabyOrDiabetesOrFracture;
  diabetes: BabyOrDiabetesOrFracture;
  fracture: BabyOrDiabetesOrFracture;
}

export interface BabyOrDiabetesOrFracture {
  coinsurance: number;
  copay: number;
  deductible: number;
  limit: number;
}
