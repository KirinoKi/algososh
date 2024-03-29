/// <reference path="../support/index.d.ts" />

import { SHORT_DELAY_IN_MS } from "./../../src/constants/delays";
import {colorDefault, colorChanging, content} from '../support/constants'

describe("Queue page health check", function () {
  const outArray = [5, 4, 1, 0, 6, 7, 8];
  const sizeCirclersInArray = 7;

  const input = '[data-cy="input-queue"]';
  const add = '[data-cy="btn-add-queue"]';
  const remove = '[data-cy="btn-remove-queue"]';
  const clear = '[data-cy="btn-clear-queue"]';

  const contentCircle = "[class*=circle_circle]";

  it("Queue page must be available", function () {
    cy.visit("/queue");
  });

  it("Checking if the input is empty, then the add button is not available", function () {
    cy.get(input).clear().should("have.value", "");
    cy.get(add).should("have.attr", "disabled");
    cy.get(remove).should("have.attr", "disabled");
    cy.get(clear).should("have.attr", "disabled");
  });

  it("Checking if the input is not empty, then the add button is available", function () {
    cy.get(input).type("5").should("have.value", "5");
    cy.get(add).should("not.have.attr", "disabled");
    cy.get(remove).should("have.attr", "disabled");
    cy.get(clear).should("have.attr", "disabled");
    cy.get(input).clear().should("have.value", "");
    cy.get(add).should("have.attr", "disabled");
  });

  it("Checking whether an element has been added to the queue correctly", function () {
    cy.get(add).as("btn-add");

    cy.get(input).type("5").should("have.value", "5");
    cy.get("@btn-add").should("not.have.attr", "disabled");
    cy.get("@btn-add").click();

    cy.get(content).as("circles");
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
              cy.get(contentCircle).should(
                "have.css",
                "border",
                `4px solid ${colorDefault}`
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
              cy.get(contentCircle).should(
                "have.css",
                "border",
                `4px solid ${colorDefault}`
              );
            });
        }
      });

    cy.get("@btn-add").should("have.attr", "disabled");
    cy.get(remove).should("not.have.attr", "disabled");
    cy.get(clear).should("not.have.attr", "disabled");
    cy.get(input).type("4").should("have.value", "4");
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
              cy.get(contentCircle).should(
                "have.css",
                "border",
                `4px solid ${colorDefault}`
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
              cy.get(contentCircle).should(
                "have.css",
                "border",
                `4px solid ${colorDefault}`
              );
            });
        }
      });

    cy.get(input).type("1").should("have.value", "1");
    cy.get("@btn-add").click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(input).type("0").should("have.value", "0");
    cy.get("@btn-add").click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(input).type("6").should("have.value", "6");
    cy.get("@btn-add").click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(input).type("7").should("have.value", "7");
    cy.get("@btn-add").click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(input).type("8").should("have.value", "8");
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
            cy.get(contentCircle).should(
              "have.css",
              "border",
              `4px solid ${colorDefault}`
            );
          });
      });

    cy.get(input).type("10").should("have.value", "10");
    cy.get("@btn-add").should("have.attr", "disabled");
    cy.get(input).clear().should("have.value", "");
  });

  it("Checking whether an element has been removed from the queue correctly", function () {
    cy.get(remove).as("btn-remove");
    cy.get(content).as("circles");

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
              cy.get(contentCircle).should(
                "have.css",
                "border",
                `4px solid ${colorDefault}`
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
              cy.get(contentCircle).should(
                "have.css",
                "border",
                `4px solid ${colorDefault}`
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
              cy.get(contentCircle).should(
                "have.css",
                "border",
                `4px solid ${colorDefault}`
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
    cy.get(clear).as("btn-clear");
    cy.get(content).as("circles");

    cy.get("@btn-clear").click();
    cy.get("@circles")
      .should("have.length", sizeCirclersInArray)
      .each((circle, index) => {
        cy.wrap(circle)
          .contains(index)
          .parent()
          .within(() => {
            cy.get(contentCircle).should(
              "have.css",
              "border",
              `4px solid ${colorDefault}`
            );
          });
      });

    cy.get(input).should("have.value", "");
    cy.get(add).should("have.attr", "disabled");
    cy.get(remove).should("have.attr", "disabled");
    cy.get("@btn-clear").should("have.attr", "disabled");
  });
});
