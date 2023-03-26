/// <reference path="../support/index.d.ts" />

import { SHORT_DELAY_IN_MS } from "./../../src/constants/delays";

describe("Queue page health check", function () {
  const colorDefault = "rgb(0, 50, 255)";
  const colorChanging = "rgb(210, 82, 225)";
  const outArray = [5, 4, 1, 0, 6, 7, 8];
  const sizeCirclersInArray = 7;

  it("Queue page must be available", function () {
    cy.visit("/queue");
  });

  it("Checking if the input is empty, then the add button is not available", function () {
    cy.get('[data-cy="input-queue"]').clear().should("have.value", "");
    cy.get('[data-cy="btn-add-queue"]').should("have.attr", "disabled");
    cy.get('[data-cy="btn-remove-queue"]').should("have.attr", "disabled");
    cy.get('[data-cy="btn-clear-queue"]').should("have.attr", "disabled");
  });

  it("Checking if the input is not empty, then the add button is available", function () {
    cy.get('[data-cy="input-queue"]').type("5").should("have.value", "5");
    cy.get('[data-cy="btn-add-queue"]').should("not.have.attr", "disabled");
    cy.get('[data-cy="btn-remove-queue"]').should("have.attr", "disabled");
    cy.get('[data-cy="btn-clear-queue"]').should("have.attr", "disabled");
    cy.get('[data-cy="input-queue"]').clear().should("have.value", "");
    cy.get('[data-cy="btn-add-queue"]').should("have.attr", "disabled");
  });

  it("Checking whether an element has been added to the queue correctly", function () {
    cy.get('[data-cy="btn-add-queue"]').as("btn-add");

    cy.get('[data-cy="input-queue"]').type("5").should("have.value", "5");
    cy.get("@btn-add").should("not.have.attr", "disabled");
    cy.get("@btn-add").click();

    cy.get("[class^=circle_content]").as("circles");
    cy.get("@circles")
      .should("have.length", sizeCirclersInArray)
      .each((circle, index) => {
        if (index === 0) {
          cy.wrap(circle).contains("head");
          cy.wrap(circle).contains("tail");
          cy.checkStyles(circle, outArray[index], colorChanging);
        } else {
          cy.wrap(circle)
            .contains(index)
            .parent()
            .within(() => {
              cy.get("[class*=circle_circle]").should(
                "have.css",
                "border",
                `3.77953px solid ${colorDefault}`
              );
            });
        }
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", sizeCirclersInArray)
      .each((circle, index) => {
        if (index === 0) {
          cy.wrap(circle).contains("head");
          cy.wrap(circle).contains("tail");
          cy.checkStyles(circle, outArray[index], colorDefault);
        } else {
          cy.wrap(circle)
            .contains(index)
            .parent()
            .within(() => {
              cy.get("[class*=circle_circle]").should(
                "have.css",
                "border",
                `3.77953px solid ${colorDefault}`
              );
            });
        }
      });

    cy.get("@btn-add").should("have.attr", "disabled");
    cy.get('[data-cy="btn-remove-queue"]').should("not.have.attr", "disabled");
    cy.get('[data-cy="btn-clear-queue"]').should("not.have.attr", "disabled");
    cy.get('[data-cy="input-queue"]').type("4").should("have.value", "4");
    cy.get("@btn-add").should("not.have.attr", "disabled");

    cy.get("@btn-add").click();
    cy.get("@circles")
      .should("have.length", sizeCirclersInArray)
      .each((circle, index) => {
        if (index === 0) {
          cy.wrap(circle).contains("head");
          cy.checkStyles(circle, outArray[index], colorDefault);
        } else if (index === 1) {
          cy.wrap(circle).contains("tail");
          cy.checkStyles(circle, outArray[index], colorChanging);
        } else {
          cy.wrap(circle)
            .contains(index)
            .parent()
            .within(() => {
              cy.get("[class*=circle_circle]").should(
                "have.css",
                "border",
                `3.77953px solid ${colorDefault}`
              );
            });
        }
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", sizeCirclersInArray)
      .each((circle, index) => {
        if (index === 0) {
          cy.wrap(circle).contains("head");
          cy.checkStyles(circle, outArray[index], colorDefault);
        } else if (index === 1) {
          cy.wrap(circle).contains("tail");
          cy.checkStyles(circle, outArray[index], colorDefault);
        } else {
          cy.wrap(circle)
            .contains(index)
            .parent()
            .within(() => {
              cy.get("[class*=circle_circle]").should(
                "have.css",
                "border",
                `3.77953px solid ${colorDefault}`
              );
            });
        }
      });

    cy.get('[data-cy="input-queue"]').type("1").should("have.value", "1");
    cy.get("@btn-add").click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="input-queue"]').type("0").should("have.value", "0");
    cy.get("@btn-add").click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="input-queue"]').type("6").should("have.value", "6");
    cy.get("@btn-add").click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="input-queue"]').type("7").should("have.value", "7");
    cy.get("@btn-add").click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[data-cy="input-queue"]').type("8").should("have.value", "8");
    cy.get("@btn-add").click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", sizeCirclersInArray)
      .each((circle, index) => {
        if (index === 0) {
          cy.wrap(circle).contains("head");
        } else if (index === 6) {
          cy.wrap(circle).contains("tail");
        }
        cy.wrap(circle)
          .contains(index)
          .parent()
          .within(() => {
            cy.get("[class*=circle_circle]").should(
              "have.css",
              "border",
              `3.77953px solid ${colorDefault}`
            );
          });
      });

    cy.get('[data-cy="input-queue"]').type("10").should("have.value", "10");
    cy.get("@btn-add").should("have.attr", "disabled");
    cy.get('[data-cy="input-queue"]').clear().should("have.value", "");
  });

  it("Checking whether an element has been removed from the queue correctly", function () {
    cy.get('[data-cy="btn-remove-queue"]').as("btn-remove");
    cy.get("[class^=circle_content]").as("circles");

    cy.get("@btn-remove").click();
    cy.get("@circles")
      .should("have.length", sizeCirclersInArray)
      .each((circle, index) => {
        if (index === 0) {
          cy.wrap(circle).contains("head");
          cy.checkStyles(circle, outArray[index], colorChanging);
        } else if (index === 6) {
          cy.wrap(circle).contains("tail");
          cy.checkStyles(circle, outArray[index], colorDefault);
        } else {
          cy.checkStyles(circle, outArray[index], colorDefault);
        }
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", sizeCirclersInArray)
      .each((circle, index) => {
        if (index === 0) {
          cy.wrap(circle)
            .contains(index)
            .parent()
            .within(() => {
              cy.get("[class*=circle_circle]").should(
                "have.css",
                "border",
                `3.77953px solid ${colorDefault}`
              );
            });
        }
        if (index === 1) cy.wrap(circle).contains("head");
        if (index === 6) cy.wrap(circle).contains("tail");
        if (index !== 0) cy.checkStyles(circle, outArray[index], colorDefault);
      });

    cy.get("@btn-remove").click();
    cy.get("@circles")
      .should("have.length", sizeCirclersInArray)
      .each((circle, index) => {
        if (index === 0) {
          cy.wrap(circle)
            .contains(index)
            .parent()
            .within(() => {
              cy.get("[class*=circle_circle]").should(
                "have.css",
                "border",
                `3.77953px solid ${colorDefault}`
              );
            });
        }
        if (index === 1) {
          cy.wrap(circle).contains("head");
          cy.checkStyles(circle, outArray[index], colorChanging);
        }
        if (index === 6) cy.wrap(circle).contains("tail");
        if (index !== 0 && index !== 1)
          cy.checkStyles(circle, outArray[index], colorDefault);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", sizeCirclersInArray)
      .each((circle, index) => {
        if (index === 0 || index === 1) {
          cy.wrap(circle)
            .contains(index)
            .parent()
            .within(() => {
              cy.get("[class*=circle_circle]").should(
                "have.css",
                "border",
                `3.77953px solid ${colorDefault}`
              );
            });
        }
        if (index === 2) cy.wrap(circle).contains("head");
        if (index === 6) cy.wrap(circle).contains("tail");
        if (index !== 0 && index !== 1)
          cy.checkStyles(circle, outArray[index], colorDefault);
      });
  });

  it("Verifying that the queue has been cleared correctly", function () {
    cy.get('[data-cy="btn-clear-queue"]').as("btn-clear");
    cy.get("[class^=circle_content]").as("circles");

    cy.get("@btn-clear").click();
    cy.get("@circles")
      .should("have.length", sizeCirclersInArray)
      .each((circle, index) => {
        cy.wrap(circle)
          .contains(index)
          .parent()
          .within(() => {
            cy.get("[class*=circle_circle]").should(
              "have.css",
              "border",
              `3.77953px solid ${colorDefault}`
            );
          });
      });

    cy.get('[data-cy="input-queue"]').should("have.value", "");
    cy.get('[data-cy="btn-add-queue"]').should("have.attr", "disabled");
    cy.get('[data-cy="btn-remove-queue"]').should("have.attr", "disabled");
    cy.get("@btn-clear").should("have.attr", "disabled");
  });
});
