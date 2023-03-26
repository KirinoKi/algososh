/// <reference path="../support/index.d.ts" />

import { SHORT_DELAY_IN_MS } from "./../../src/constants/delays";

describe("Stack page health check", function () {
  const colorDefault = "rgb(0, 50, 255)";
  const colorChanging = "rgb(210, 82, 225)";
  const outArray = [5, 4, 1, 0];

  it("Stack page must be available", function () {
    cy.visit("/stack");
  });

  it("Checking if the input is empty, then the add button is not available", function () {
    cy.get('[data-cy="input-stack"]').clear().should("have.value", "");
    cy.get('[data-cy="btn-add-stack"]').should("have.attr", "disabled");
    cy.get('[data-cy="btn-remove-stack"]').should("have.attr", "disabled");
    cy.get('[data-cy="btn-clear-stack"]').should("have.attr", "disabled");
  });

  it("Checking if the input is not empty, then the add button is available", function () {
    cy.get('[data-cy="input-stack"]').type("5").should("have.value", "5");
    cy.get('[data-cy="btn-add-stack"]').should("not.have.attr", "disabled");
    cy.get('[data-cy="btn-remove-stack"]').should("have.attr", "disabled");
    cy.get('[data-cy="btn-clear-stack"]').should("have.attr", "disabled");
    cy.get('[data-cy="input-stack"]').clear().should("have.value", "");
    cy.get('[data-cy="btn-add-stack"]').should("have.attr", "disabled");
  });

  it("Checking whether an element has been added to the stack correctly", function () {
    cy.get('[data-cy="btn-add-stack"]').as("btn-add");

    cy.get('[data-cy="input-stack"]').type("5").should("have.value", "5");
    cy.get("@btn-add").should("not.have.attr", "disabled");
    cy.get("@btn-add").click();

    cy.get("[class^=circle_content]").as("circles");
    cy.get("@circles")
      .should("have.length", 1)
      .each((circle, index) => {
        cy.wrap(circle).contains("top");
        cy.checkStyles(circle, outArray[index], colorChanging);
      });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get('[data-cy="btn-remove-stack"]').should("not.have.attr", "disabled");
    cy.get('[data-cy="btn-clear-stack"]').should("not.have.attr", "disabled");
    cy.get('[data-cy="input-stack"]').type("4").should("have.value", "4");
    cy.get("@btn-add").click();
    cy.get("@circles")
      .should("have.length", 1)
      .each((circle, index) => {
        if (index === 1) {
          cy.wrap(circle).contains("top");
          cy.checkStyles(circle, outArray[index], colorChanging);
        }
        cy.checkStyles(circle, outArray[index], colorDefault);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="input-stack"]').type("1").should("have.value", "1");
    cy.get("@btn-add").click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="input-stack"]').type("0").should("have.value", "0");
    cy.get("@btn-add").click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", 4)
      .each((circle, index) => {
        if (index === 3) cy.wrap(circle).contains("top");
        cy.checkStyles(circle, outArray[index], colorDefault);
      });
  });

  it("Checking whether an element has been removed from the stack correctly", function () {
    cy.get('[data-cy="btn-remove-stack"]').as("btn-remove");
    cy.get("[class^=circle_content]").as("circles");

    cy.get("@btn-remove").click();
    cy.get("@circles")
      .should("have.length", 4)
      .each((circle, index) => {
        if (index === 3) {
          cy.wrap(circle).contains("top");
          cy.checkStyles(circle, outArray[index], colorChanging);
        } else {
          cy.checkStyles(circle, outArray[index], colorDefault);
        }
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", 3)
      .each((circle, index) => {
        if (index === 2) cy.wrap(circle).contains("top");
        cy.checkStyles(circle, outArray[index], colorDefault);
      });

    cy.get("@btn-remove").click();
    cy.get("@circles")
      .should("have.length", 3)
      .each((circle, index) => {
        if (index === 2) {
          cy.wrap(circle).contains("top");
          cy.checkStyles(circle, outArray[index], colorChanging);
        } else {
          cy.checkStyles(circle, outArray[index], colorDefault);
        }
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", 2)
      .each((circle, index) => {
        if (index === 1) cy.wrap(circle).contains("top");
        cy.checkStyles(circle, outArray[index], colorDefault);
      });
  });

  it("Verifying that the stack has been cleared correctly", function () {
    cy.get('[data-cy="btn-clear-stack"]').as("btn-clear");
    cy.get("[class^=circle_content]").as("circles");

    cy.get("@btn-clear").click();
    cy.get("@circles").should("have.length", 0);

    cy.get('[data-cy="input-stack"]').should("have.value", "");
    cy.get('[data-cy="btn-add-stack"]').should("have.attr", "disabled");
    cy.get('[data-cy="btn-remove-stack"]').should("have.attr", "disabled");
    cy.get("@btn-clear").should("have.attr", "disabled");
  });
});
