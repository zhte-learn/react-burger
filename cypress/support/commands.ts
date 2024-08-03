/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
declare namespace Cypress {
  interface Chainable<Subject> {
    prepareLogin(email: string, password: string): Chainable<any>;
  }

  interface Chainable<Subject> {
    prepareBurger3(bun: string, ingredient1: string, ingredient2: string): Chainable<any>;
  }

  interface Chainable<Subject> {
    prepareTokens(): Chainable<any>;
  }

  interface Chainable<Subject> {
    checkIngredientsAdded(bun: string, ingredient1: string, ingredient2: string): Chainable<any>;
  }

  interface Chainable<Subject> {
    checkCounterNotExist(ingredientName: string): Chainable<any>;
  }

  interface Chainable<Subject> {
    checkCounterValue(ingredientName: string, counterValue: string): Chainable<any>;
  }
};

// -- This is a parent command --
Cypress.Commands.add('prepareLogin', (email: string, password: string) => { 
  cy.intercept("POST", "login", { fixture: "login" });
  cy.get(".input_type_email").type(`${email}{enter}`);
  cy.get(".input_type_password").type(`${password}{enter}`);
});

Cypress.Commands.add('prepareBurger3', (bun: string, ingredient1: string, ingredient2: string) => { 
  cy.get(`[data-testid="ingredient-item-${bun}"]`).trigger("dragstart");
  cy.get("[data-testid=drop-zone-bun]").first().trigger("drop");
  cy.get(`[data-testid="ingredient-item-${ingredient1}"]`).trigger("dragstart");
  cy.get("[data-testid=drop-zone-fillings]").first().trigger("drop");
  cy.get(`[data-testid="ingredient-item-${ingredient2}"]`).trigger("dragstart");
  cy.get("[data-testid=drop-zone-fillings]").first().trigger("drop");
});

Cypress.Commands.add('prepareTokens', () => { 
  window.localStorage.setItem("accessToken", JSON.stringify("test-accessToken"));
  window.localStorage.setItem("refreshToken", JSON.stringify("test-refreshToken"));
});

Cypress.Commands.add(
  'checkIngredientsAdded', (bun: string, ingredient1: string, ingredient2: string) => { 
      cy.get("[data-testid=drop-zone-bun]")
        .first()
        .find('[class^="constructor-item_name"]')
        .should("have.text", `${bun} (верх)`);
      cy.get("[data-testid=drop-zone-bun]")
        .last()
        .find('[class^="constructor-item_name"]')
        .should("have.text", `${bun} (низ)`);
      cy.get('[class^="burger-constructor_list"]').contains(`${ingredient1}`);
      cy.get('[class^="burger-constructor_list"]').contains(`${ingredient2}`);
  }
);

Cypress.Commands.add('checkCounterNotExist', (ingredientName: string) => { 
  cy.get('[class^="burger-ingredients"]')
    .contains(ingredientName)
    .closest('[class^="ingredient-item_item"]')
    .find('.counter')
    .should("not.exist");
});

Cypress.Commands.add('checkCounterValue', (ingredientName: string, counterValue: string) => { 
  cy.get('[class^="burger-ingredients"]')
    .contains(ingredientName)
    .closest('[class^="ingredient-item_item"]')
    .find('.counter')
    .should("have.text", counterValue);
});

//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }