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
      cy.loginUI({ username: 'kkkk', password: 'password123' });
      cy.contains('kkkk is logged in');
    });

    it('fails with wrong credentials', function () {
      cy.loginUI({ username: 'kkkk', password: 'wrong' });
      cy.get('#loginButton').click();

      cy.contains('Username or password incorrect');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });

    describe('When logged in', function () {
      beforeEach(function () {
        cy.loginUI({ username: 'kkkk', password: 'password123' });
      });

      it('a blog can be created', function () {
        cy.contains('New Blog').click();

        cy.get('#title').type('new title');
        cy.get('#author').type('an author');
        cy.get('#url').type('http://example.com/blog/24');
        cy.contains('add blog').click();

        cy.contains('new title');
      });
    });
  });
});
