import * as endpoints from '../fixtures/endpoints.json'
const { productDetailsImages } = endpoints;

class ProductsPage {
    elements = {
        searchProductInput: () => cy.get('#search_product'),
        productDetailsHeader: () => cy.get('.product-information > h2'),
        productDetailsCategoryParagraph: () => cy.get('.product-information > p:nth-of-type(1)'),
        productDetailsPrice: () => cy.get('.product-information > span > span'),
        productAvailabilityParagraph: () => cy.get('.product-information > p:nth-of-type(2)'),
        productConditionParagraph: () => cy.get('.product-information > p:nth-of-type(3)'),
        productBrandParagraph: () => cy.get('.product-information > p:nth-of-type(4)'),
        productNewLabel: () => cy.get(`[src="${productDetailsImages}new.jpg"]`),
        productQuantityLabel: () => cy.get('.product-information > span > label'),
        productInput: () => cy.get('.product-information > span > input[name="quantity"]'),
        addToCartButtonOnSpecifiedPage: () => cy.get('.btn.btn-default.cart')
    }
    
}
module.exports = new ProductsPage();