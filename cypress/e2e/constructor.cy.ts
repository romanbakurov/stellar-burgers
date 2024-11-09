const ingredient = '[data-cy="ingredient-link-item"]';
const constructor = '[data-cy="constructor"]';
const modal = '[data-cy="modal"]';
const modalOverlay = '[data-cy="modal-overlay"]';
const order = '[data-cy="order-button"]';
const closeModal = '[data-cy="close-modal"]';

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
      cy.get(ingredient).first().next().click();
      cy.get(ingredient).eq(2).next().click();
      cy.get(constructor).as('constructor');
      cy.get('@constructor').should('contain', 'Краторная булка N-200i');
      cy.get('@constructor').should(
        'contain',
        'Биокотлета из марсианской Магнолии'
      );
    });

    it('Открывает и закрываем модалку', () => {
      cy.get(ingredient).first().click();
      cy.get(modal).as('modal');
      cy.get('@modal').should('exist');
      cy.get(closeModal).click();
      cy.get('@modal').should('not.exist');
    });

    it('Открывает и закрываем модалку по оверлею', () => {
      cy.get(ingredient).first().click();
      cy.get(modal).as('modal');
      cy.get('@modal').should('exist');
      cy.get(modalOverlay).click('top', { force: true });
      cy.get('@modal').should('not.exist');
    });

    it('Создание заказа', () => {
      cy.get(ingredient).first().next().click();
      cy.get(constructor).as('constructor');
      cy.get(ingredient).eq(2).next().click();
      cy.get(order).click();
      cy.wait('@postOrder');
      cy.get(modal).as('modal');
      cy.get('@modal').should('exist');
      cy.get('@modal').should('contain', '777');
      cy.get('@modal').should('exist');
      cy.get(modalOverlay).click('top', { force: true });
      cy.get('@modal').should('not.exist');
      cy.get('@constructor').should('contain', '');
    });
  });
});
