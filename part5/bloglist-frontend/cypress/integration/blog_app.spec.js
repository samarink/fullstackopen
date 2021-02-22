describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'kkkk',
      password: 'password123',
    });
    cy.visit('http://localhost:3000');
  });

  it('login form is shown', function () {
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('kkkk');
      cy.get('#password').type('password123');
      cy.get('#loginButton').click();

      cy.contains('kkkk is logged in');
    });

    it.only('fails with wrong credentials', function () {
      cy.get('#username').type('kkkk');
      cy.get('#password').type('wrong');
      cy.get('#loginButton').click();

      cy.contains('Username or password incorrect');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
});
