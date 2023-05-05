import IHousehold from "./Household";
import ILocation from "./Location";

export default interface GetPlansRequest {
  location: ILocation;
  income: number;
  household: IHousehold;
}
