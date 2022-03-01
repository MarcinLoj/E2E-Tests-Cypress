class TestCasesPage {
    elements = {
        headerTC: () => cy.get('h2 b')
    }
}

module.exports = new TestCasesPage();