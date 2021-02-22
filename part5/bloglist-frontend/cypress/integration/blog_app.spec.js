describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    cy.register({
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
        cy.login({ username: 'kkkk', password: 'password123' });
      });

      it('a blog can be created', function () {
        cy.createBlogUI({
          title: 'new title',
          author: 'new author',
          url: 'new url',
        });

        cy.contains('new title');
      });

      it('blog can be liked', function () {
        cy.createBlogUI({
          title: 'new title',
          author: 'new author',
          url: 'new url',
        });

        cy.contains('show').click();
        cy.contains('like').click();
      });

      describe('deleting blog', function () {
        beforeEach(function () {
          cy.createBlog({ title: 'new title', author: 'author', url: 'url' });
        });

        it('succeeds for user who created it', function () {
          cy.contains('show').click();
          cy.contains('remove').click();
          cy.get('html').should('not.contain', 'new title');
        });

        it('fails for user who did not create it', function () {
          const user = { username: 'qqqq', password: 'password123' };

          cy.register(user);
          cy.login(user);

          cy.contains('show').click().parent().should('not.contain', 'remove');
        });
      });
    });
  });
});
