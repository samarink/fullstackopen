Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3001/api/login', {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedNoteappUser', JSON.stringify(body));
    cy.visit('http://localhost:3000');
  });
});

Cypress.Commands.add('loginUI', ({ username, password }) => {
  cy.get('#username').type(username);
  cy.get('#password').type(password);
  cy.get('#loginButton').click();
});
