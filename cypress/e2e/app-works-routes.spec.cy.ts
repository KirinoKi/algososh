describe("App works correctly with routes", function () {
  it("Should be available on localhost:3000", function () {
    cy.visit("/");
  });

  beforeEach(function () {
    cy.visit("/");
  });

  it("Should open recursion page", function () {
    cy.get('a[href*="recursion"]').click();
    cy.contains("Строка");
  });

  it("Should open fibonacci page", function () {
    cy.get('a[href*="fibonacci"]').click();
    cy.contains("Последовательность Фибоначчи");
  });

  it("Should open sorting page", function () {
    cy.get('a[href*="sorting"]').click();
    cy.contains("Сортировка массива");
  });

  it("Should open stack page", function () {
    cy.get('a[href*="stack"]').click();
    cy.contains("Стек");
  });

  it("Should open queue page", function () {
    cy.get('a[href*="queue"]').click();
    cy.contains("Очередь");
  });

  it("Should open list page", function () {
    cy.get('a[href*="list"]').click();
    cy.contains("Связный список");
  });
});
