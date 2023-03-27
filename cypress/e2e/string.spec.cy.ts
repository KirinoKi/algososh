/// <reference path="../support/index.d.ts" />

import { DELAY_IN_MS } from "./../../src/constants/delays";
import {colorDefault, colorChanging, colorModified} from '../support/constants'

describe("Recursion page health check", function () {

  const input = '[data-cy="input-reverse"]';
  const btn = '[data-cy="btn-reverse"]'

  it("Recursion page must be available", function () {
    cy.visit("/recursion");
  });

  it("Checking if the input is empty, then the add button is not available", function () {
    cy.get(input).clear().should("have.value", "");
    cy.get(btn).should("have.attr", "disabled");
  });

  it("Checking if the input is not empty, then the add button is available", function () {
    cy.get(input)
      .type("Test")
      .should("have.value", "Test");
    cy.get(btn).should("not.have.attr", "disabled");
    cy.get(input).clear().should("have.value", "");
  });

  it("Checking if the string is reversed correctly", function () {
    cy.get(input)
      .type("string")
      .should("have.value", "string");
    cy.get(btn).as("btn");
    cy.get("@btn").should("not.have.attr", "disabled");
    cy.get("[class^=circle_circle]").as("circles");

    cy.get("@circles")
      .should("have.length", 6)
      .each((circle, index) => {
        if (index === 0) cy.checkStyles(circle, "s", colorDefault);
        if (index === 1) cy.checkStyles(circle, "t", colorDefault);
        if (index === 2) cy.checkStyles(circle, "r", colorDefault);
        if (index === 3) cy.checkStyles(circle, "i", colorDefault);
        if (index === 4) cy.checkStyles(circle, "n", colorDefault);
        if (index === 5) cy.checkStyles(circle, "g", colorDefault);
      });

    cy.get("@btn").click();

    cy.get("@circles")
      .should("have.length", 6)
      .each((circle, index) => {
        if (index === 0) cy.checkStyles(circle, "s", colorChanging);
        if (index === 1) cy.checkStyles(circle, "t", colorDefault);
        if (index === 2) cy.checkStyles(circle, "r", colorDefault);
        if (index === 3) cy.checkStyles(circle, "i", colorDefault);
        if (index === 4) cy.checkStyles(circle, "n", colorDefault);
        if (index === 5) cy.checkStyles(circle, "g", colorChanging);
      });

    cy.wait(DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", 6)
      .each((circle, index) => {
        if (index === 0) cy.checkStyles(circle, "g", colorModified);
        if (index === 1) cy.checkStyles(circle, "t", colorDefault);
        if (index === 2) cy.checkStyles(circle, "r", colorDefault);
        if (index === 3) cy.checkStyles(circle, "i", colorDefault);
        if (index === 4) cy.checkStyles(circle, "n", colorDefault);
        if (index === 5) cy.checkStyles(circle, "s", colorModified);
      });

    cy.wait(DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", 6)
      .each((circle, index) => {
        if (index === 0) cy.checkStyles(circle, "g", colorModified);
        if (index === 1) cy.checkStyles(circle, "t", colorChanging);
        if (index === 2) cy.checkStyles(circle, "r", colorDefault);
        if (index === 3) cy.checkStyles(circle, "i", colorDefault);
        if (index === 4) cy.checkStyles(circle, "n", colorChanging);
        if (index === 5) cy.checkStyles(circle, "s", colorModified);
      });

    cy.wait(DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", 6)
      .each((circle, index) => {
        if (index === 0) cy.checkStyles(circle, "g", colorModified);
        if (index === 1) cy.checkStyles(circle, "n", colorModified);
        if (index === 2) cy.checkStyles(circle, "r", colorDefault);
        if (index === 3) cy.checkStyles(circle, "i", colorDefault);
        if (index === 4) cy.checkStyles(circle, "t", colorModified);
        if (index === 5) cy.checkStyles(circle, "s", colorModified);
      });

    cy.wait(DELAY_IN_MS);

    cy.get("@circles")
      .should("have.length", 6)
      .each((circle, index) => {
        if (index === 0) cy.checkStyles(circle, "g", colorModified);
        if (index === 1) cy.checkStyles(circle, "n", colorModified);
        if (index === 2) cy.checkStyles(circle, "r", colorChanging);
        if (index === 3) cy.checkStyles(circle, "i", colorChanging);
        if (index === 4) cy.checkStyles(circle, "t", colorModified);
        if (index === 5) cy.checkStyles(circle, "s", colorModified);
      });

    cy.get("@circles")
      .should("have.length", 6)
      .each((circle, index) => {
        if (index === 0) cy.checkStyles(circle, "g", colorModified);
        if (index === 1) cy.checkStyles(circle, "n", colorModified);
        if (index === 2) cy.checkStyles(circle, "i", colorModified);
        if (index === 3) cy.checkStyles(circle, "r", colorModified);
        if (index === 4) cy.checkStyles(circle, "t", colorModified);
        if (index === 5) cy.checkStyles(circle, "s", colorModified);
      });
  });
});
