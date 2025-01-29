describe("Protected Admin Dashboard", () => {
  it("should allow access to admin-dashboard when authenticated", () => {
    // Mock authentication (replace with your auth method)
    window.localStorage.setItem("authToken", "mock-valid-token");

    cy.visit("http://localhost:3000/admin-dashboard");
    cy.contains("Admin Dashboard"); // Verify the page content
    cy.title().should("eq", "Admin Dashboard"); // Verify page title
  });
});
