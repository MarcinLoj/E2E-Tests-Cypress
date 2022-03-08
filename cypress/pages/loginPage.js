class LoginPage {
    elements = {
        emailAddressInput: () => cy.get('.login-form > form > [type="email"]'),
        signUpButton: () => cy.get('[data-qa="signup-button"]'),
        nameInput: () => cy.get('[data-qa="signup-name"]'),
        emailInput: () => cy.get('[data-qa="signup-email"]')
    }
}
module.exports = new LoginPage();