describe("Admin Routes", () => {
  it("should load the login page", () => {
    cy.visit("http://localhost:3000/login");
    cy.contains("Admin Login"); // Verify the page content
    cy.get("input[name='username']").should("exist"); // Check for username input
    cy.get("input[name='password']").should("exist"); // Check for password input
    cy.get("button[type='submit']").should("exist"); // Check for submit button
  });

  it("should redirect unauthenticated users from admin-dashboard", () => {
    cy.visit("http://localhost:3000/admin-dashboard");
    cy.url().should("include", "/login"); // Verify redirection to login
  });
});
