const bunId = '643d69a5c3f7b9001cfa093c'; // "Краторная булка N-200i"
const ingredientId1 = '643d69a5c3f7b9001cfa0941'; // "Биокотлета из марсианской Магнолии"
const ingredientId2 = "643d69a5c3f7b9001cfa0942"; // "Соус Spicy-X"

describe('Application', () => {
  beforeEach(() => {
    cy.intercept("GET", "ingredients", { fixture: "ingredients" });
    cy.visit("http://localhost:3000/");
  });

  it("should display the same ingredient data in the modal as the one clicked", () => {
    cy.get(`[data-testid="ingredient-item-${bunId}"]`).click();
    cy.get('[class^="modal_modal"]').should("be.visible");
    cy.get('[class^="ingredient-details_title"]').should("have.text", "Краторная булка N-200i");
  });

  it("should close modal as close button is clicked", () => {
    cy.get(`[data-testid="ingredient-item-${ingredientId1}"]`).click();
    cy.get('[class^="modal_modal"]').should("be.visible");
    cy.get('[class^="modal_closeIcon"]').click();
    cy.get('[class^="modal_modal"]').should('not.exist');
  });

  it("should close modal as ESC button is pressed", () => {
    const ingredientId = '643d69a5c3f7b9001cfa0941'; // "Биокотлета из марсианской Магнолии"
    cy.get(`[data-testid="ingredient-item-${ingredientId}"]`).click();
    cy.get('[class^="modal_modal"]').should("be.visible");
    cy.get('body').type('{esc}');
    cy.get('[class^="modal_modal"]').should('not.exist');
  });

  it("should close modal as user clicked on overlay", () => {
    cy.get(`[data-testid="ingredient-item-${ingredientId1}"]`).click();
    cy.get('[class^="modal_modal"]').should("be.visible");
    // click on a specific part of the overlay to close the modal
    // because overlay and modal are overlaps
    cy.get('[class^="modal-overlay_overlay"]').click('topRight', { force: true });
    cy.get('[class^="modal_modal"]').should('not.exist');
  });

  it("should create order with drag element and drop when user is logged out", () => {
    cy.prepareBurger3(bunId, ingredientId1, ingredientId2);
    cy.checkIngredientsAdded("Краторная булка N-200i", "Биокотлета из марсианской Магнолии", "Соус Spicy-X");
    cy.checkCounterValue("Краторная булка N-200i", "2");
    cy.checkCounterValue("Биокотлета из марсианской Магнолии", "1");
    cy.checkCounterValue("Соус Spicy-X", "1");
    cy.get(".button-confirm").click();
    cy.prepareLogin("cat@mail.ru", "123");
    cy.intercept("POST", "orders", { fixture: "orders" });
    cy.get(".button-confirm").click();
    cy.get('[class^="modal_modal"]').should("be.visible");
    cy.get('[class^="order-confirm_number"]').should("have.text", "48210");
  });

  it("should create order with drag element and drop when user is logged in", () => {
    cy.visit("http://localhost:3000/login");
    cy.prepareLogin("cat@mail.ru", "123");
    cy.prepareBurger3(bunId, ingredientId1, ingredientId2);
    cy.checkIngredientsAdded("Краторная булка N-200i", "Биокотлета из марсианской Магнолии", "Соус Spicy-X");
    cy.checkCounterValue("Краторная булка N-200i", "2");
    cy.checkCounterValue("Биокотлета из марсианской Магнолии", "1");
    cy.checkCounterValue("Соус Spicy-X", "1");
    cy.intercept("POST", "orders", { fixture: "orders" });
    cy.intercept("POST", "token", { fixture: "token" });
    cy.get(".button-confirm").click();
    cy.get('[class^="modal_modal"]').should("be.visible");
    cy.get('[class^="order-confirm_number"]').should("have.text", "48210");
  });

  it("should allow to delete an ingredient by clicking on delete button", () => {
    cy.prepareBurger3(bunId, ingredientId1, ingredientId2);
    cy.checkIngredientsAdded("Краторная булка N-200i", "Биокотлета из марсианской Магнолии", "Соус Spicy-X");
    cy.checkCounterValue("Краторная булка N-200i", "2");
    cy.checkCounterValue("Биокотлета из марсианской Магнолии", "1");
    cy.checkCounterValue("Соус Spicy-X", "1");

    //find delete button on "Соус Spicy-X"
    cy.get('[class^="burger-constructor_list"]')
      .contains("Соус Spicy-X")
      .closest('[class^="constructor-item_item"]')
      .find('.delete-lock-item')
      .click();

    //check that there is no deleted ingredient in constructor
    cy.get('[class^="burger-constructor_list"]')
      .find('[class^="constructor-item_item"]')
      .each(($el) => {
        cy.wrap($el).find('[class^="constructor-item_name"]').should("not.contain", "Соус Spicy-X");
      })
    
    cy.checkCounterNotExist("Соус Spicy-X");
  })

  it("should replace a bun in constructor when a new bun is added", () => {
    cy.prepareBurger3(bunId, ingredientId1, ingredientId2);
    cy.checkIngredientsAdded("Краторная булка N-200i", "Биокотлета из марсианской Магнолии", "Соус Spicy-X");
    
    const newBun = "643d69a5c3f7b9001cfa093d"; //"Флюоресцентная булка R2-D3"
    cy.get(`[data-testid="ingredient-item-${newBun}"]`).trigger("dragstart");
    cy.get("[data-testid=drop-zone-bun]").first().trigger("drop");

    cy.checkIngredientsAdded("Флюоресцентная булка R2-D3", "Биокотлета из марсианской Магнолии", "Соус Spicy-X");
    cy.checkCounterNotExist("Краторная булка N-200i");
    cy.checkCounterValue("Флюоресцентная булка R2-D3", "2");
  })
})