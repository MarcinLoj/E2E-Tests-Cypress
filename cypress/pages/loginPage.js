class LoginPage {
    elements = {
        emailAddressInput: () => cy.get('.login-form > form > [type="email"]')
    }
}
module.exports = new LoginPage();