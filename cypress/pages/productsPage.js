class ProductsPage {
    elements = {
        searchProductInput: () => cy.get('#search_product')
    }
    
}
module.exports = new ProductsPage();