/// <reference path="../support/index.d.ts" />

import { DELAY_IN_MS } from "./../../src/constants/delays";
import {colorDefault, colorChanging, colorModified} from '../support/constants'

describe("list page health check", function () {
  const inputList = '[data-cy="input-value-list"]';
  const btnListAddHead = '[data-cy="btn-add-head-list"]';
  const btnListAddTail = '[data-cy="btn-add-tail-list"]';
  const btnListAddIndex = '[data-cy="btn-add-byIndex-list"]';
  const btnListRemoveIndex = '[data-cy="btn-remove-byIndex-list"]';
  const inputListIndex = '[data-cy="input-index-list"]';
  const btnListRemoveHead = '[data-cy="btn-remove-head-list"]';
  const btnListRemoveTail = '[data-cy="btn-remove-tail-list"]';
  const cicrle = "[class^=list-page_circle]";
  const cicrleAdd = "[class*=list-page_circle__add]";
  const circleSmall = "[class*=circle_small]";
  const cicrleHead = "[class*=circle_head]";
  const circleIndex = "[class*=circle_index]";
  const cicrleRemove = "[class*=list-page_circle__remove]";
  



  const defaultArray = [2, 34, 8, 1];

  it("list page must be available", function () {
    cy.visit("/list");
  });

  it("Checking if the input-value is empty, then the add button is not available", function () {
    cy.get(inputList).clear().should("have.value", "");
    cy.get(btnListAddHead).should("have.attr", "disabled");
    cy.get(btnListAddTail).should("have.attr", "disabled");
    cy.get(btnListAddIndex).should("have.attr", "disabled");
    cy.get(btnListRemoveIndex).should(
      "have.attr",
      "disabled"
    );
  });

  it("Checking if the input-index is empty, then the add button is not available", function () {
    cy.get(inputListIndex).clear().should("have.value", "0");
    cy.get(btnListAddHead).should("have.attr", "disabled");
    cy.get(btnListAddTail).should("have.attr", "disabled");
    cy.get(btnListAddIndex).should("have.attr", "disabled");
    cy.get(btnListRemoveIndex).should(
      "have.attr",
      "disabled"
    );
  });

  it("Checking if the input-value is not empty, then the add button is available", function () {
    cy.get(inputList).type("5").should("have.value", "5");
    cy.get(btnListAddHead).should("not.have.attr", "disabled");
    cy.get(btnListAddTail).should("not.have.attr", "disabled");
    cy.get(btnListAddIndex).should("have.attr", "disabled");
    cy.get(btnListRemoveIndex).should(
      "have.attr",
      "disabled"
    );
    cy.get(inputList).clear().should("have.value", "");
  });

  it("Checking input-index is not empty and number is within the tolerance, an add button is available", function () {
    cy.get(inputListIndex).type("3").should("have.value", "03");
    cy.get(btnListAddHead).should("have.attr", "disabled");
    cy.get(btnListAddTail).should("have.attr", "disabled");
    cy.get(btnListAddIndex).should("have.attr", "disabled");
    cy.get(btnListRemoveIndex).should(
      "not.have.attr",
      "disabled"
    );
    cy.get(inputListIndex).clear().should("have.value", "0");
  });

  it("Checking default rendering", function () {
    cy.get("[class^=circle_content]").as("circles");
    cy.get("@circles")
      .should("have.length", defaultArray.length)
      .each((circle, index) => {
        if (index === 0) {
          cy.wrap(circle).contains("head");
        } else if (index === defaultArray.length - 1) {
          cy.wrap(circle).contains("tail");
        }
        cy.checkStyles(circle, defaultArray[index], colorDefault);
      });

    cy.get(btnListRemoveHead).should(
      "not.have.attr",
      "disabled"
    );
    cy.get(btnListRemoveTail).should(
      "not.have.attr",
      "disabled"
    );
  });

  it("Checking for adding an element to the head by index-input", function () {
    const newElement = "6";
    const newArray = [2, 6, 34, 8, 1];
    cy.get(inputList).as("input-value");
    cy.get(inputListIndex).as("input-index");

    cy.get(btnListAddIndex).as("btn-add-byIndex");
    cy.get(btnListRemoveIndex).as("btn-remove-byIndex");

    cy.get("@input-value").type(newElement).should("have.value", newElement);
    cy.get("@input-index").type("1").should("have.value", "01");
    cy.get("@btn-add-byIndex").click();

    cy.get("@btn-add-byIndex").find("img");
    cy.get("@btn-add-byIndex").should("have.attr", "disabled");
    cy.get("@btn-remove-byIndex").should("have.attr", "disabled");

    cy.get(cicrle).as("circles");

    cy.get("@circles")
      .should("have.length", defaultArray.length)
      .each((circle, index) => {
        if (index === 0) {
          cy.wrap(circle).within(() => {
            // верхний малый круг
            cy.get(cicrleAdd).as("small-cicrle");

            cy.get("@small-cicrle").contains(newElement);
            cy.get("@small-cicrle")
              .find(circleSmall)
              .should("have.css", "border", `4px solid ${colorChanging}`);
            cy.get(cicrleHead).should("have.text", "head");
          });
          cy.checkStyles(circle, defaultArray[index], colorChanging);
        } else if (index === defaultArray.length - 1) {
          cy.wrap(circle).contains("tail");
        } else {
          cy.wrap(circle).find(circleIndex).contains(index);
          cy.checkStyles(circle, defaultArray[index], colorDefault);
        }
      });
    cy.wait(DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", defaultArray.length)
      .each((circle, index) => {
        if (index === 0) {
          cy.checkStyles(circle, defaultArray[index], colorChanging);
        } else if (index === 1) {
          cy.wrap(circle).within(() => {
            // верхний малый круг
            cy.get(cicrleAdd).as("small-cicrle");

            cy.get("@small-cicrle").contains(newElement);
            cy.get("@small-cicrle")
              .find(circleSmall)
              .should("have.css", "border", `4px solid ${colorChanging}`);
          });
          cy.checkStyles(circle, defaultArray[index], colorChanging);
        } else if (index === defaultArray.length - 1) {
          cy.wrap(circle).contains("tail");
        } else {
          cy.checkStyles(circle, defaultArray[index], colorDefault);
        }
        cy.wrap(circle).find(circleIndex).contains(index);
      });

    cy.wait(DELAY_IN_MS);

    cy.get(cicrle).as("circles");
    cy.get("@circles")
      .should("have.length", newArray.length)
      .each((circle, index) => {
        if (index === 0 || index === 2) {
          cy.checkStyles(circle, newArray[index], colorChanging);
        } else if (index === 1) {
          cy.checkStyles(circle, newArray[index], colorModified);
        } else if (index === newArray.length - 1) {
          cy.wrap(circle).contains("tail");
        } else {
          cy.checkStyles(circle, newArray[index], colorDefault);
        }
        cy.wrap(circle).find(circleIndex).contains(index);
      });
    cy.wait(DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", newArray.length)
      .each((circle, index) => {
        if (index === 0) cy.wrap(circle).contains("head");
        if (index === newArray.length - 1) cy.wrap(circle).contains("tail");
        cy.checkStyles(circle, newArray[index], colorDefault);
        cy.wrap(circle).find(circleIndex).contains(index);
      });
  });

  it("Checking for the removal of an element by index", function () {
    const newArray = [2, 6, 34, 8, 1];
    cy.get(inputListIndex).as("input-index");

    cy.get(btnListRemoveIndex).as("btn-remove-byIndex");

    cy.get("@input-index").type("1").should("have.value", "01");
    cy.get("@btn-remove-byIndex").should("not.have.attr", "disabled");
    cy.get("@btn-remove-byIndex").click();

    cy.get("@btn-remove-byIndex").find("img");
    cy.get("@btn-remove-byIndex").should("have.attr", "disabled");

    cy.get(cicrle).as("circles");

    cy.get("@circles")
      .should("have.length", newArray.length)
      .each((circle, index) => {
        if (index === 0) {
          cy.checkStyles(circle, newArray[index], colorChanging);
        } else {
          cy.checkStyles(circle, newArray[index], colorDefault);
        }
        cy.wrap(circle).find(circleIndex).contains(index);
      });
    cy.wait(DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", newArray.length)
      .each((circle, index) => {
        if (index === 0 || index === 1) {
          cy.checkStyles(circle, newArray[index], colorChanging);
        } else {
          cy.checkStyles(circle, newArray[index], colorDefault);
        }
        cy.wrap(circle).find(circleIndex).contains(index);
      });

    cy.wait(DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", newArray.length)
      .each((circle, index) => {
        if (index === 0) {
          cy.checkStyles(circle, newArray[index], colorChanging);
        } else if (index === 1) {
          cy.wrap(circle).within(() => {
            // верхний малый круг
            cy.get(cicrleRemove).as("small-cicrle");

            cy.get("@small-cicrle").contains(newArray[index]);
            cy.get("@small-cicrle")
              .find(circleSmall)
              .should("have.css", "border", `4px solid ${colorChanging}`);
          });
        } else {
          cy.wrap(circle).find(circleIndex).contains(index);
          cy.checkStyles(circle, newArray[index], colorDefault);
        }
      });
    cy.wait(DELAY_IN_MS);

    cy.get(cicrle).as("circles");
    cy.get("@circles")
      .should("have.length", defaultArray.length)
      .each((circle, index) => {
        if (index === 0) {
          cy.checkStyles(circle, defaultArray[index], colorChanging);
        } else {
          cy.checkStyles(circle, defaultArray[index], colorDefault);
        }
        cy.wrap(circle).find(circleIndex).contains(index);
      });
    cy.wait(DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", defaultArray.length)
      .each((circle, index) => {
        cy.checkStyles(circle, defaultArray[index], colorDefault);
        cy.wrap(circle).find(circleIndex).contains(index);
      });
  });

  it("Checking for adding an element to the head", function () {
    const newElement = "6";
    cy.get(inputList).as("input-value");
    cy.get(btnListAddHead).as("btn-add-head");
    cy.get(btnListAddTail).as("btn-add-tail");
    cy.get(btnListRemoveHead).as("btn-remove-head");
    cy.get(btnListRemoveTail).as("btn-remove-tail");
    cy.get(btnListAddIndex).as("btn-add-byIndex");
    cy.get(btnListRemoveIndex).as("btn-remove-byIndex");

    cy.get("@input-value").type(newElement).should("have.value", newElement);
    cy.get("@btn-add-head").click();

    cy.get("@btn-add-head").find("img");
    cy.get("@btn-add-tail").should("have.attr", "disabled");
    cy.get("@btn-remove-head").should("have.attr", "disabled");
    cy.get("@btn-remove-tail").should("have.attr", "disabled");
    cy.get("@btn-add-byIndex").should("have.attr", "disabled");
    cy.get("@btn-remove-byIndex").should("have.attr", "disabled");

    cy.get(cicrle).as("circles");

    cy.get("@circles")
      .should("have.length", 4)
      .each((circle, index) => {
        if (index === 0) {
          cy.wrap(circle).within(() => {
            // верхний малый круг
            cy.get(cicrleAdd).as("small-cicrle");

            cy.get("@small-cicrle").contains(newElement);
            cy.get("@small-cicrle")
              .find(circleSmall)
              .should("have.css", "border", `4px solid ${colorChanging}`);
            cy.get(cicrleHead).should("have.text", "");
          });
          cy.wrap(circle).find(circleIndex).contains(index);
          cy.checkStyles(circle, defaultArray[index], colorChanging);
        } else if (index === defaultArray.length - 1) {
          cy.wrap(circle).contains("tail");
        } else {
          cy.checkStyles(circle, defaultArray[index], colorDefault);
        }
      });
    cy.wait(DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", 4)
      .each((circle, index) => {
        if (index === 3) {
          cy.wrap(circle).contains("tail");
        }
        cy.checkStyles(circle, defaultArray[index], colorDefault);
      });
    cy.wait(DELAY_IN_MS);

    cy.get(cicrle).as("circles");
    cy.get("@circles")
      .should("have.length", 5)
      .each((circle, index) => {
        if (index === 4) cy.wrap(circle).contains("tail");
        if (index === 0) {
          cy.checkStyles(circle, newElement, colorModified);
        } else {
          cy.checkStyles(circle, defaultArray[index - 1], colorDefault);
        }
        cy.wrap(circle).find(circleIndex).contains(index);
      });
    cy.wait(DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", 5)
      .each((circle, index) => {
        if (index === 4) cy.wrap(circle).contains("tail");
        if (index === 0) {
          cy.wrap(circle).contains("head");
          cy.checkStyles(circle, newElement, colorDefault);
        } else {
          cy.checkStyles(circle, defaultArray[index - 1], colorDefault);
        }
      });
  });

  it("Checking for adding an element to the tail", function () {
    const newArray = [6, 2, 34, 8, 1];
    const newElement = "9";
    cy.get(inputList).as("input-value");
    cy.get(btnListAddTail).as("btn-add-tail");

    cy.get("@input-value").type(newElement).should("have.value", newElement);
    cy.get("@btn-add-tail").click();

    cy.get("@btn-add-tail").find("img");
    cy.get("@btn-add-tail").should("have.attr", "disabled");

    cy.get(cicrle).as("circles");

    cy.get("@circles")
      .should("have.length", 5)
      .each((circle, index) => {
        if (index === newArray.length - 1) {
          cy.wrap(circle).within(() => {
            // верхний малый круг
            cy.get(cicrleAdd).as("small-cicrle");

            cy.get("@small-cicrle").contains(newElement);
            cy.get("@small-cicrle")
              .find(circleSmall)
              .should("have.css", "border", `4px solid ${colorChanging}`);
          });
          cy.wrap(circle).find(circleIndex).contains(index);
          cy.checkStyles(circle, newArray[index], colorChanging);
        } else if (index === 0) {
          cy.wrap(circle).contains("head");
        } else {
          cy.checkStyles(circle, newArray[index], colorDefault);
        }
      });
    cy.wait(DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", 5)
      .each((circle, index) => {
        if (index === 0) cy.wrap(circle).contains("head");
        cy.checkStyles(circle, newArray[index], colorDefault);
      });
    cy.wait(DELAY_IN_MS);

    cy.get(cicrle).as("circles");
    cy.get("@circles")
      .should("have.length", 6)
      .each((circle, index) => {
        if (index === 0) cy.wrap(circle).contains("head");
        if (index === newArray.length) {
          cy.checkStyles(circle, newElement, colorModified);
        } else {
          cy.checkStyles(circle, newArray[index], colorDefault);
        }
        cy.wrap(circle).find(circleIndex).contains(index);
      });
    cy.wait(DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", 6)
      .each((circle, index) => {
        if (index === 0) cy.wrap(circle).contains("head");
        if (index === newArray.length) {
          cy.wrap(circle).contains("tail");
          cy.checkStyles(circle, newElement, colorDefault);
        } else {
          cy.checkStyles(circle, newArray[index], colorDefault);
        }
      });

    cy.get("@input-value").should("have.attr", "disabled");
  });

  it("Checking for the removal of an element in the head", function () {
    const initArray = [6, 2, 34, 8, 1, 9];
    cy.get(inputList).as("input-value");
    cy.get(btnListRemoveHead).as("btn-remove-head");

    cy.get("@input-value").should("have.attr", "disabled");
    cy.get("@btn-remove-head").click();

    cy.get("@btn-remove-head").find("img");
    cy.get("@btn-remove-head").should("have.attr", "disabled");

    cy.get(cicrle).as("circles");

    cy.get("@circles")
      .should("have.length", initArray.length)
      .each((circle, index) => {
        if (index === 0) {
          cy.wrap(circle).within(() => {
            // нижний малый круг
            cy.get(cicrleRemove).as("small-cicrle");

            cy.get("@small-cicrle").contains(initArray[index]);
            cy.get("@small-cicrle")
              .find(circleSmall)
              .should("have.css", "border", `4px solid ${colorChanging}`);
            cy.get(cicrleHead).should("have.text", "");
          });
          cy.wrap(circle).find(circleIndex).contains(index);
          cy.checkStyles(circle, initArray[index], colorChanging);
        } else if (index === initArray.length - 1) {
          cy.wrap(circle).contains("tail");
        } else {
          cy.checkStyles(circle, initArray[index], colorDefault);
        }
      });
    cy.wait(DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", initArray.length - 1)
      .each((circle, index) => {
        if (index === initArray.length - 2) cy.wrap(circle).contains("tail");
        cy.checkStyles(circle, initArray[index + 1], colorDefault);
      });
    cy.wait(DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", initArray.length - 1)
      .each((circle, index) => {
        if (index === 0) cy.wrap(circle).contains("head");
        if (index === initArray.length - 2) cy.wrap(circle).contains("tail");
        cy.checkStyles(circle, initArray[index + 1], colorDefault);
      });
  });

  it("Checking for the removal of an element in the tail", function () {
    const initArray = [2, 34, 8, 1, 9];
    cy.get(btnListRemoveTail).as("btn-remove-tail");

    cy.get("@btn-remove-tail").click();

    cy.get("@btn-remove-tail").find("img");
    cy.get("@btn-remove-tail").should("have.attr", "disabled");

    cy.get(cicrle).as("circles");

    cy.get("@circles")
      .should("have.length", initArray.length)
      .each((circle, index) => {
        if (index === initArray.length - 1) {
          cy.wrap(circle).within(() => {
            // нижний малый круг
            cy.get(cicrleRemove).as("small-cicrle");

            cy.get("@small-cicrle").contains(initArray[index]);
            cy.get("@small-cicrle")
              .find(circleSmall)
              .should("have.css", "border", `4px solid ${colorChanging}`);
            cy.get(cicrleHead).should("have.text", "");
          });
          cy.wrap(circle).find(circleIndex).contains(index);
          cy.checkStyles(circle, initArray[index], colorChanging);
        } else if (index === 0) {
          cy.wrap(circle).contains("head");
        } else {
          cy.checkStyles(circle, initArray[index], colorDefault);
        }
      });
    cy.wait(DELAY_IN_MS);

    cy.get(cicrle).as("circles");
    cy.get("@circles")
      .should("have.length", initArray.length - 1)
      .each((circle, index) => {
        if (index === 0) cy.wrap(circle).contains("head");
        if (index === initArray.length - 2) {
          cy.checkStyles(circle, initArray[index], colorModified);
        } else {
          cy.checkStyles(circle, initArray[index], colorDefault);
        }
      });
    cy.wait(DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", initArray.length - 1)
      .each((circle, index) => {
        if (index === 0) cy.wrap(circle).contains("head");
        if (index === initArray.length - 2) cy.wrap(circle).contains("tail");
        cy.checkStyles(circle, initArray[index], colorDefault);
      });
  });
});