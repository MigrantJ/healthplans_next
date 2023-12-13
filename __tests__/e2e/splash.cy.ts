/* eslint-disable */
describe("Splash Page", () => {
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
    cy.visit("http://localhost:3000");
  });

  it("should show the About modal", () => {
    cy.contains("About").click();
    cy.contains("About This App").should("exist");
  });

  it("should allow input of zip code", () => {
    cy.get("input").type("00000").blur().should("have.value", "00000");
    cy.wait("@location").then((xhr) => {
      expect(xhr.response.statusCode).to.equal(200);
    });
    cy.get(`[aria-label="gps"]`).first().click();
    cy.get("input").should("have.value", "12345");
  });

  it("should allow navigation to plan list only after zip code input", () => {
    cy.contains("See Plans").should("be.disabled");
    cy.get("input").type("00000").blur();
    cy.wait("@plans");
    cy.contains("See Plans").should("be.enabled").click();
    cy.url().should("contains", "app/plans");
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
