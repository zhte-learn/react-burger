const bunId = '643d69a5c3f7b9001cfa093c';
const bunName = 'Краторная булка N-200i';
const mainIngredientId = '643d69a5c3f7b9001cfa0941';
const mainIngredientName = 'Биокотлета из марсианской Магнолии';
const sauceId = '643d69a5c3f7b9001cfa0942';
const sauceName = 'Соус Spicy-X';
const newBunId = '643d69a5c3f7b9001cfa093d';
const newBunName = 'Флюоресцентная булка R2-D3';

const modalClass = '[class^="modal_modal"]';
const ingredientItemClass = "ingredient-item";
const buttonConfirmClass = ".button-confirm";
const orderNumberClass = '[class^="order-confirm_number"]';

describe('Application', () => {
  beforeEach(() => {
    cy.intercept("GET", "ingredients", { fixture: "ingredients" });
    cy.visit('/');
  });

  it("should display the same ingredient data in the modal as the one clicked", () => {
    cy.get(`[data-testid="${ingredientItemClass}-${bunId}"]`).click();
    cy.checkModalIsVisible(modalClass);
    cy.get('[class^="ingredient-details_title"]').should("have.text", bunName);
  });

  it("should close modal as close button is clicked", () => {
    cy.get(`[data-testid="${ingredientItemClass}-${mainIngredientId}"]`).click();
    cy.checkModalIsVisible(modalClass);
    cy.get('[class^="modal_closeIcon"]').click();
    cy.checkModalIsNotExist(modalClass);
  });

  it("should close modal as ESC button is pressed", () => {
    cy.get(`[data-testid="${ingredientItemClass}-${mainIngredientId}"]`).click();
    cy.checkModalIsVisible(modalClass);
    cy.get('body').type('{esc}');
    cy.checkModalIsNotExist(modalClass);
  });

  it("should close modal as user clicked on overlay", () => {
    cy.get(`[data-testid="${ingredientItemClass}-${mainIngredientId}"]`).click();
    cy.checkModalIsVisible(modalClass);
    // click on a specific part of the overlay to close the modal
    // because overlay and modal are overlaps
    cy.get('[class^="modal-overlay_overlay"]').click('topRight', { force: true });
    cy.checkModalIsNotExist(modalClass);
  });

  it("should create order with drag element and drop when user is logged out", () => {
    cy.prepareBurger3(bunId, mainIngredientId, sauceId);
    cy.checkIngredientsAdded(bunName, mainIngredientName, sauceName);
    cy.checkCounterValue(bunName, "2");
    cy.checkCounterValue(mainIngredientName, "1");
    cy.checkCounterValue(sauceName, "1");
    cy.get(buttonConfirmClass).click();
    cy.prepareLogin("cat@mail.ru", "123");
    cy.intercept("POST", "orders", { fixture: "orders" });
    cy.get(buttonConfirmClass).click();
    cy.checkModalIsVisible(modalClass);
    cy.get(orderNumberClass).should("have.text", "48210");
  });

  it("should create order with drag element and drop when user is logged in", () => {
    cy.visit('login');
    cy.prepareLogin("cat@mail.ru", "123");
    cy.prepareBurger3(bunId, mainIngredientId, sauceId);
    cy.checkIngredientsAdded(bunName, mainIngredientName, sauceName);
    cy.checkCounterValue(bunName, "2");
    cy.checkCounterValue(mainIngredientName, "1");
    cy.checkCounterValue(sauceName, "1");
    cy.intercept("POST", "orders", { fixture: "orders" });
    cy.intercept("POST", "token", { fixture: "token" });
    cy.get(buttonConfirmClass).click();
    cy.checkModalIsVisible(modalClass);
    cy.get(orderNumberClass).should("have.text", "48210");
  });

  it("should allow to delete an ingredient by clicking on delete button", () => {
    cy.prepareBurger3(bunId, mainIngredientId, sauceId);
    cy.checkIngredientsAdded(bunName, mainIngredientName, sauceName);
    cy.checkCounterValue(bunName, "2");
    cy.checkCounterValue(mainIngredientName, "1");
    cy.checkCounterValue(sauceName, "1");

    //find delete button on "Соус Spicy-X"
    cy.get('[class^="burger-constructor_list"]')
      .contains(sauceName)
      .closest('[class^="constructor-item_item"]')
      .find('.delete-lock-item')
      .click();

    //check that there is no deleted ingredient in constructor
    cy.get('[class^="burger-constructor_list"]')
      .find('[class^="constructor-item_item"]')
      .each(($el) => {
        cy.wrap($el).find('[class^="constructor-item_name"]').should("not.contain", sauceName);
      })
    
    cy.checkCounterNotExist(sauceName);
  })

  it("should replace a bun in constructor when a new bun is added", () => {
    cy.prepareBurger3(bunId, mainIngredientId, sauceId);
    cy.checkIngredientsAdded(bunName, mainIngredientName, sauceName);
    cy.get(`[data-testid="${ingredientItemClass}-${newBunId}"]`).trigger("dragstart");
    cy.get("[data-testid=drop-zone-bun]").first().trigger("drop");

    cy.checkIngredientsAdded(newBunName, mainIngredientName, sauceName);
    cy.checkCounterNotExist(bunName);
    cy.checkCounterValue(newBunName, "2");
  })
})
