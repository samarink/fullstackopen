Cypress.Commands.add('register', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/users', {
    username,
    password,
  });
});

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body));
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      Authorization: `bearer ${
        JSON.parse(localStorage.getItem('loggedBlogAppUser')).token
      }`,
    },
  });

  cy.visit('http://localhost:3000');
});

Cypress.Commands.add('loginUI', ({ username, password }) => {
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('#loginButton').click();
});

Cypress.Commands.add('createBlogUI', ({ title, author, url }) => {
  cy.contains('New Blog').click();

  cy.get('#title').type(title);
  cy.get('#author').type(author);
  cy.get('#url').type(url);

  cy.contains('add blog').click();
});
