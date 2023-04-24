import Plan from "./Plan";

export default function PlanList({ plans }) {
  return (
    <>
      {plans?.map((plan) => (
        <Plan plan={plan} />
      ))}
    </>
  );
}
