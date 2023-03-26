/// <reference path="../support/index.d.ts" />

describe("Fibonacci page health check", function () {
  const colorDefault = "rgb(0, 50, 255)";
  const inputFibo = '[data-cy="input-fibo"]';
  const btnFibo = '[data-cy="btn-fibo"]'

    it("Fibonacci page must be available", function () {
      cy.visit("/fibonacci");
    });

  it("Checking if the input is empty, then the add button is not available", function () {
    cy.get(inputFibo).clear().should("have.value", "0");
    cy.get(btnFibo).should("have.attr", "disabled");
  });

  it("Checking if the input is not empty, then the add button is available", function () {
    cy.get(inputFibo).type("1").should("have.value", "10");
    cy.get(btnFibo).should("not.have.attr", "disabled");
    cy.get(inputFibo).clear().should("have.value", "0");
  });

  it("Checking the correctness of generating numbers", function () {
    const outArray = [1, 1, 2, 3, 5, 8];
    cy.get(btnFibo).as("btn");
    cy.get(inputFibo).type("1").should("have.value", "10");
    cy.get("@btn").should("not.have.attr", "disabled");
    cy.get("@btn").click();

    cy.get("[class^=circle_circle]").as("circles");
    cy.get("@circles")
      .should("have.length", 6)
      .each((circle, index) => {
        cy.checkStyles(circle, outArray[index], colorDefault);
      });
  });
});
