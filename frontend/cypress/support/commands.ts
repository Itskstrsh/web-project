// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

declare global {
    namespace Cypress {
      interface Chainable {
        // Кастомные команды для вашего приложения
        login(email: string, password: string): Chainable<void>
        // Добавьте свои кастомные команды здесь
      }
    }
  }
  
  // Пример кастомной команды
  Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login')
    cy.get('[data-testid="email"]').type(email)
    cy.get('[data-testid="password"]').type(password)
    cy.get('[data-testid="submit"]').click()
  })