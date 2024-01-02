/* eslint-disable */
describe("Plans Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/app/plans");
  });

  it("should try out different viewports", () => {
    cy.viewport("macbook-15");
    cy.wait(200);
    cy.viewport("macbook-13");
    cy.wait(200);
    cy.viewport("macbook-11");
    cy.wait(200);
    cy.viewport("ipad-2");
    cy.wait(200);
  });
});

// Prevent TypeScript from reading file as legacy script
export {};
