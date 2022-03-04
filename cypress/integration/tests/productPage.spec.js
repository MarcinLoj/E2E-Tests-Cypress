import * as base from '../../../cypress.json'
import * as endpoints from '../../fixtures/endpoints.json'
import * as keys from '../../fixtures/stringKeys.json'
import GlobalElements from '../../pages/globalElements'

const { addToCartText, viewProductText } = keys;
const { getAllProducts, productsPage, apiUrl } = endpoints
const { productHeader, productParagraph,
        addToCartButton, viewProductButton, 
        productImg
      } = GlobalElements.elements;
describe('Product Page Tests', function() {
    before(() => {
        cy.seedData(`${apiUrl}${getAllProducts}`);
    });
    beforeEach(() => {
        cy.visit(`${productsPage}`)
    })
    it.only('Check products are displaying', function() {
        cy.readFile('cypress/fixtures/data.json').then(({ products }) => {
            cy.wrap(products).each(({ id, name, price}) => {
                addToCartButton(id).should('have.text', `${addToCartText.repeat(2)}`)
                viewProductButton(id).should('have.text', `${viewProductText}`)
                productImg(id).should('be.visible');
                productHeader(id).should('have.text', `${price}`);
                productParagraph(id).should('have.text', `${name}`)
            })
        }) 
        })

    })