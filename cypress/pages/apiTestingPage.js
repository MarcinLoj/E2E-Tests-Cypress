class ApiTestingPage {
    elements = {
        headerApi: () => cy.get('.title > b')
    }
}
module.exports = new ApiTestingPage();