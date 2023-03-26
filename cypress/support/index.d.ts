/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     *
     * @param element Элемент разметки
     * @param letter Символ в круге
     * @param color Цвет круга
     */
    checkStyles(
      element: HTMLElement | JQuery<HTMLElement>,
      letter: string | number,
      color: string
    ): void;
  }
}
