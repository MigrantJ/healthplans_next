export default async function getPlans({ queryKey }) {
  const zipCode = queryKey[1];
  const state = queryKey[2];
  const countyCode = queryKey[3];
  const res = await fetch(
    `/api/plans?zipcode=${zipCode}&state=${state}&countyCode=${countyCode}`
  );
  return res.json();
}
