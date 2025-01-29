describe("Public Routes", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // Replace with your app's URL
  });

  it("should load the homepage", () => {
    cy.contains("Laptop & Desktop Rentals"); // Verify content on the homepage
    cy.title().should("eq", "Home - Laptop & Desktop Rentals"); // Verify page title
  });

  it("should navigate to Rental Laptops page", () => {
    cy.get('a[href="/rental-laptops"]').click(); // Click the Rental Laptops link
    cy.url().should("include", "/rental-laptops"); // Verify the URL
    cy.title().should("eq", "Rental Laptops - Affordable Laptop Rentals"); // Verify title
  });

  it("should navigate to Rental Desktops page", () => {
    cy.get('a[href="/rental-desktops"]').click(); // Click the Rental Desktops link
    cy.url().should("include", "/rental-desktops"); // Verify the URL
    cy.title().should("eq", "Rental Desktops - Rent Desktops Easily"); // Verify title
  });

  it("should navigate to How to Rent page", () => {
    cy.get('a[href="/how-to-rent"]').click(); // Click the How to Rent link
    cy.url().should("include", "/how-to-rent"); // Verify the URL
    cy.title().should("eq", "How to Rent - Rental Process Explained"); // Verify title
  });
});
