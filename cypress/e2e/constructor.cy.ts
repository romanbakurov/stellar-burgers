const ingredient = '[data-cy="ingredient-link-item"]';
const constructor = '[data-cy="constructor"]';
const modal = '[data-cy="modal"]';
const modalOverlay = '[data-cy="modal-overlay"]';
const closeModal = '[data-cy="close-modal"]';
const ingredientBun = 'Краторная булка N-200i';

describe('Проверяем бургер конструктор', () => {
  beforeEach(() => {
    cy.intercept('GET', `api/ingredients`, { fixture: 'ingredients.json' }).as(
      'getIngredients'
    );
    cy.intercept('GET', `api/auth/user`, { fixture: 'user.json' }).as(
      'getUser'
    );
    cy.intercept('POST', `api/orders`, { fixture: 'order.json' }).as(
      'postOrder'
    );
    window.localStorage.setItem('refreshToken', JSON.stringify('123456'));
    cy.setCookie('accessToken', JSON.stringify('654321'));

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.clearLocalStorage('refreshToken');
  });

  describe('Проверяем добавление ингредиентов', () => {
    it('Добавляем ингредиент в конструктор', () => {
      cy.get(constructor).should('not.contain.text', ingredientBun);
      cy.get(ingredient)
        .contains(ingredientBun)
        .parent()
        .find('button')
        .click();
      cy.get(constructor).should('contain.text', ingredientBun);
    });

    it('Открывает и закрываем модалку', () => {
      cy.get(modal).should('not.exist');
      cy.get(ingredient).contains(ingredientBun).click();
      cy.get(modal).should('exist');
      cy.get(modal).should('contain', ingredientBun);

      cy.get(closeModal).click();
      cy.get(modal).should('not.exist');
    });

    it('Открывает и закрываем модалку по оверлею', () => {
      cy.get(modal).should('not.exist');
      cy.get(ingredient).contains(ingredientBun).click();
      cy.get(modal).should('exist');
      cy.get(modal).should('contain', ingredientBun);

      cy.get(modalOverlay).click('top', { force: true });
      cy.get(modal).should('not.exist');
    });

    it('Создание заказа', () => {
      cy.get(ingredient)
        .contains(ingredientBun)
        .parent()
        .find('button')
        .click({ force: true });

      cy.get(ingredient)
        .contains('Биокотлета из марсианской Магнолии')
        .parent()
        .find('button')
        .click({ force: true });

      cy.get(constructor)
        .children()
        .last()
        .find('button')
        .click({ force: true });

      cy.wait('@postOrder').its('response.statusCode').should('eq', 200);

      cy.get(modal).should('exist');
      cy.get(modal).should('contain', '777');
      cy.get(closeModal).click();
      cy.get(modal).should('not.exist');

      cy.get(constructor)
        .children()
        .first()
        .should('contain.text', 'Выберите булки');
      cy.get(constructor)
        .children()
        .first()
        .next()
        .should('contain.text', 'Выберите начинку');
    });
  });
});
