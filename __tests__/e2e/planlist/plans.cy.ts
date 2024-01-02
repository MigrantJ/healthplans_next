/* eslint-disable */
describe("Plans Page", () => {
  beforeEach(() => {
    cy.intercept("POST", "/api/location", {
      zipcode: "12345",
      state: "IL",
      countyfips: "67890",
    }).as("location");
    cy.intercept("POST", "/api/plans", {
      plans: [],
      total: 0,
      facet_groups: [],
      ranges: {
        premiums: {
          min: 0,
          max: 1,
        },
        deductibles: {
          min: 0,
          max: 1,
        },
      },
    }).as("plans");
    cy.visit("http://localhost:3000/app/plans");
  });

  it("should show the About modal", () => {
    cy.contains("About").click();
    cy.contains("About This App").should("exist");
  });

  it("should show the help popover on first visit", () => {
    expect(localStorage.getItem("closedHouseholdNote")).to.eq(null);
    cy.contains("For more accurate premium estimates").should("exist");
    cy.findByRole("dialog").find("button").click();
    expect(localStorage.getItem("closedHouseholdNote")).to.eq(true);
  });

  it("should not allow navigation to Compare page without selected plans", () => {
    cy.findByRole("button", { name: "Compare (0)" }).should("be.disabled");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
