class CartPage {
    elements = {
        breadcrumb: () => cy.get('.active')
    }
}
module.exports = new CartPage();