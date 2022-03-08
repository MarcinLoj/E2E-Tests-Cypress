import * as endpoints from '../../fixtures/endpoints.json';
import * as keys from '../../fixtures/stringKeys.json';
import * as styleGuide from '../../fixtures/styleGuide.json';
import * as config from '../../../cypress.json';
import GlobalElements from '../../pages/globalElements'
import ProductsPage from '../../pages/productsPage'
import CartPage from '../../pages/cartPage';

const pathToDataFile = 'cypress/fixtures/data.json'
const { addToCartText, viewProductText, categoryText, inStockText, conditionText, brandText, labelText,
        modalContinueButtonText,modalHeaderText, modalLinkButtonText, modalParagraphText,
        carouselHeader1Text, carouselHeader2Text,
        carouselParagraphText, carouselHeader1SpanText,
        womenDressHeaderText, womenTopsHeaderText,
        womenSareeHeaderText, menTShirtsHeaderText,
        menJeansHeaderText, kidsDressHeaderText,
        kidsTopsAndShirtsHeaderText, brandPoloText,
        brandHMText, brandAllenSollyJuniorText, 
        brandBabyhugText, brandBibaText, 
        brandKookiekidsText, brandMadameText,
        brandMastAndHarbourText, womenCategoryText,
        menCategoryText, kidsCategoryText,
        brandHeaderText,
        womenDressCategoryText, womenSareeCategoryText,
        womenTopsCategoryText, menJeansCategoryText,
        menTShirtsCategoryText, kidsDressCategoryText,
        kidsTopsAndShirtsCategoryText, brandAllenSollyJuniorHeaderText,
        brandBabyhugHeaderText, brandBibaHeaderText,
        brandHAndMHeaderText, brandKookieKidsHeaderText,
        brandMadameHeaderText, brandMastAndHarbourHeaderText,
        brandPoloHeaderText
        } = keys;
const { productItem } = CartPage.elements
const { baseUrl } = config

const { getAllProducts, productsPage, apiUrl, specifiedProductDetail,
        womenDressCategoryPage,
        menJeansCategoryPage, kidsDressCategoryPage,
        womenTopsCategoryPage, menTShirtsCategoryPage,
        womenSareeCategoryPage, kidsTopsAndShirtsCategoryPage,
        poloBrandPage, bibaBrandPage, madameBrandPage,
        babyhugBrandPage, kookieKidsBrandPage, mastAndHarbourBrandPage,
        allenSollyJuniorBrandPage, hAndMBrandPage, cartPage
        } = endpoints

const { productHeader, productParagraph, addToCartButton, viewProductButton, productImg, modalContinueButton,
        modalHeader, modalParagraph, modalLinkButton, categoryHeader,
        brandsHeader, kidsCategoryExpandIcon,
        womenCategory, menCategory, 
        kidsCategory, poloBrand,
        hmBrand, bibaBrand,
        madameBrand, babyhugBrand,
        kookiekidsBrand, mastharbourBrand,
        allensollyjuniorBrand, womenCategoryExpandIcon,
        menCategoryExpandIcon, womenCategoryList,
        menCategoryList, kidsCategoryList,
        womenDressCategory, womenTopsCategory,
        womenSareeCategory, menTShirtsCategory,
        menJeansCategory, kidsDressCategory,
        kidsTopsAndShirtsCategory, featuresItemsHeader,
        getSidebarElementText, apiTestingButton,
        contactUsButton, logo, homeButton,
        productsButton, testCasesButton,
        cartButton, signupButton,
        } = GlobalElements.elements;

const { textGrayColorSecond, orangeColor, textBrownColor, grayColorThird } = styleGuide;

const { productDetailsHeader, productDetailsCategoryParagraph, productDetailsPrice,
        productAvailabilityParagraph, productBrandParagraph, productConditionParagraph, 
        productNewLabel, productQuantityLabel, productInput, addToCartButtonOnSpecifiedPage
        } = ProductsPage.elements

describe('Product Page Tests', function() {
    before(() => {
        cy.seedData(`${apiUrl}${getAllProducts}`);
    });
    beforeEach(() => {
        cy.visit(`${productsPage}`)
    })
    it('Check products are displaying in the overall page, their content and CSS', function() {
        cy.readFile('cypress/fixtures/data.json').then(({ products }) => {
            cy.wrap(products).each(({ id, name, price}) => {
                addToCartButton(id).should('have.text', `${addToCartText}`).
                and('have.css', 'color', `${textGrayColorSecond}`).
                and('be.visible');
                viewProductButton(id).should('have.text', `${viewProductText}`).
                and('have.css', 'color', `${textBrownColor}`);
                productImg(id).should('be.visible');
                productHeader(id).should('have.text', `${price}`).
                and('have.css', 'color', `${orangeColor}`);
                productParagraph(id).should('have.text', `${name}`).
                and('have.css', 'color', `${textGrayColorSecond}`);
            })
        }) 
    })
    it.only('Check overlay when hover over an product', function() {
        cy.readFile('cypress/fixtures/data.json').then(({ products }) => {
            cy.wrap(products).each(({ id, name, price }) => {
                productImg(id).realHover().
                    parent('.productinfo.text-center').
                    siblings('.product-overlay').
                    children('.overlay-content').should('be.visible').
                    children('h2').should('be.visible').
                    and('have.text', `${price}`).
                    siblings('p').should('be.visible').
                    and('have.text', `${name}`).
                    siblings(`[data-product-id="${id}"]`).should('be.visible').
                    and('have.text', `${addToCartText}`).
                    children('i').should('be.visible');
            })
        })
    })
    it('Navigate to product details page and check their content / CSS', function() {
        cy.readFile('cypress/fixtures/data.json').then(({ products }) => {
            cy.wrap(products).each(({ id, name, price, brand, category: { category }, category: {usertype: { usertype }} }) => {
                viewProductButton(id).click();
                productImg(id).should('be.visible')
                cy.url().should('eq', `${baseUrl}${specifiedProductDetail}${id}`)
                productDetailsHeader().should('have.text', `${name}`)
                productDetailsPrice().should('have.text', `${price}`)
                productDetailsCategoryParagraph().should('have.text', `${categoryText}: ${usertype} > ${category}`)
                productAvailabilityParagraph().should('have.text', `${inStockText}`)
                productConditionParagraph().should('have.text', `${conditionText}`)
                productBrandParagraph().should('have.text', `${brandText}${brand}`)
                productQuantityLabel().should('have.text', `${labelText}`)
                productNewLabel().should('be.visible')
                cy.go('back')
            })
        })
    })
    context('Add items to cart and check their are displaying in the cart', function() {
        it('From overall products page', function() {
            cy.readFile('cypress/fixtures/data.json').then(({ products }) => {
                cy.wrap(products).each(({ id }) => {
                    addToCartButton(id).click();
                    modalHeader().should('have.text', `${modalHeaderText}`).
                        and('be.visible')
                        modalParagraph().should('have.text', `${modalParagraphText}`).
                        and('be.visible')
                        modalLinkButton().should('have.text', `${modalLinkButtonText}`).
                        and('be.visible')
                        if(id !== products[products.length-1].id) {
                            modalContinueButton().should('have.text', `${modalContinueButtonText}`).click();
                            modalContinueButton().should('not.be.visible');
                        }
                        else {
                        modalLinkButton().click();
                        cy.url().should('eq', `${baseUrl}${cartPage}`)
                        productItem().parent().find('tr').should('have.length', products.length)
                        }
                })
            })
        })
        it('From specified product page', function() {
            cy.readFile('cypress/fixtures/data.json').then(({ products }) => {
                cy.wrap(products).each(({ id }) => {
                    viewProductButton(id).click();
                    productInput().clear().type(3).wait(200).should(input => {
                        const currentValue = input.val();
                        expect(currentValue).to.eq('3')
                        addToCartButtonOnSpecifiedPage().click().wait(500).should('have.css', 'color', `${grayColorThird}`);
                        modalHeader().should('have.text', `${modalHeaderText}`).
                        and('be.visible')
                        modalParagraph().should('have.text', `${modalParagraphText}`).
                        and('be.visible')
                        modalLinkButton().should('have.text', `${modalLinkButtonText}`).
                        and('be.visible')
                        if(id !== products[products.length-1].id) {
                            modalContinueButton().should('have.text', `${modalContinueButtonText}`).click();
                            modalContinueButton().should('not.be.visible');
                        }
                        else {
                        modalLinkButton().click();
                        cy.url().should('eq', `${baseUrl}${cartPage}`)
                        productItem().parent().find('tr').should('have.length', products.length)
                        }
                        cy.go('back')
                    })
                })
            })
        })
    })
    context('Left Sidebar Tests', function () {
        it('check section elements content and CSS', function() {
            categoryHeader().should('be.visible').
            and('have.text', `${categoryText}`).
            and('have.css', 'color', `${orangeColor}`);

            brandsHeader().should('be.visible').
            and('have.text', `${brandHeaderText}`).
            and('have.css', 'color', `${orangeColor}`);

            womenCategory().should('be.visible').
            and(elem => {
                const txt = getSidebarElementText(elem)
                expect(txt).to.eq(`${womenCategoryText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })

            menCategory().should('be.visible').
            and(elem => {
                const txt = getSidebarElementText(elem)
                expect(txt).to.eq(`${menCategoryText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })

            kidsCategory().should('be.visible').
            and(elem => {
                const txt = getSidebarElementText(elem)
                expect(txt).to.eq(`${kidsCategoryText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })
            hmBrand().should('be.visible').
            and(elem => {
                const txt = getSidebarElementText(elem)
                expect(txt).to.eq(`${brandHMText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })

            poloBrand().should('be.visible').
            and(elem => {
                const txt = getSidebarElementText(elem)
                expect(txt).to.eq(`${brandPoloText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })

            bibaBrand().should('be.visible').
            and(elem => {
                const txt = getSidebarElementText(elem)
                expect(txt).to.eq(`${brandBibaText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })

            madameBrand().should('be.visible').
            and(elem => {
                const txt = getSidebarElementText(elem)
                expect(txt).to.eq(`${brandMadameText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })

            babyhugBrand().should('be.visible').
            and(elem => {
                const txt = getSidebarElementText(elem)
                expect(txt).to.eq(`${brandBabyhugText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })

            kookiekidsBrand().should('be.visible').
            and(elem => {
                const txt = getSidebarElementText(elem)
                expect(txt).to.eq(`${brandKookiekidsText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })

            mastharbourBrand().should('be.visible').
            and(elem => {
                const txt = getSidebarElementText(elem)
                expect(txt).to.eq(`${brandMastAndHarbourText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })

            allensollyjuniorBrand().should('be.visible').
            and(elem => {
                const txt = getSidebarElementText(elem)
                expect(txt).to.eq(`${brandAllenSollyJuniorText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })
        })
        it('check category expansion', function() {
            womenCategoryExpandIcon().click();
            womenCategoryList().should('have.attr', 'class', 'panel-collapse in');
            womenCategoryList().find('.panel-body > ul > li').its('length').should('eq', 3);
            womenDressCategory().should('have.text', `${womenDressCategoryText}`);
            womenTopsCategory().should('have.text', `${womenTopsCategoryText}`);
            womenSareeCategory().should('have.text', `${womenSareeCategoryText}`);
            womenCategoryExpandIcon().click();
            womenCategory().should('have.attr', 'class', 'collapsed');
            womenCategoryList().should('have.attr', 'class', 'panel-collapse collapse');

            menCategoryExpandIcon().click();
            menCategoryList().should('have.attr', 'class', 'panel-collapse in');
            menCategoryList().find('.panel-body > ul > li').its('length').should('eq', 2);
            menJeansCategory().should('have.text', `${menJeansCategoryText}`);
            menTShirtsCategory().should('have.text', `${menTShirtsCategoryText}`);
            menCategoryExpandIcon().click();
            menCategory().should('have.attr', 'class', 'collapsed');
            menCategoryList().should('have.attr', 'class', 'panel-collapse collapse');

            kidsCategoryExpandIcon().click();
            kidsCategoryList().should('have.attr', 'class', 'panel-collapse in');
            kidsCategoryList().find('.panel-body > ul > li').its('length').should('eq', 2);
            kidsDressCategory().should('have.text', `${kidsDressCategoryText}`);
            kidsTopsAndShirtsCategory().should('have.text', `${kidsTopsAndShirtsCategoryText}`);
            kidsCategoryExpandIcon().click();
            kidsCategory().should('have.attr', 'class', 'collapsed');
            kidsCategoryList().should('have.attr', 'class', 'panel-collapse collapse');
        })
        context('Check is category hiding after clicking on another category', function() {
            context('Hide Women', function() {
                it('Collapse Men', function() {
                    womenCategoryExpandIcon().click();
                    womenCategoryList().should('have.attr', 'class', 'panel-collapse in');
                    menCategoryExpandIcon().click();
                    womenCategory().should('have.attr', 'class', 'collapsed');
                    menCategoryList().should('have.attr', 'class', 'panel-collapse in');
                })
                it('Collapse Kids', function() {
                    womenCategoryExpandIcon().click();
                    womenCategoryList().should('have.attr', 'class', 'panel-collapse in');
                    kidsCategoryExpandIcon().click();
                    womenCategory().should('have.attr', 'class', 'collapsed');
                    kidsCategoryList().should('have.attr', 'class', 'panel-collapse in');
                })
            })
            context('Hide Men', function() {
                it('Collapse Women', function() {
                    menCategoryExpandIcon().click();
                    menCategoryList().should('have.attr', 'class', 'panel-collapse in');
                    womenCategoryExpandIcon().click();
                    menCategory().should('have.attr', 'class', 'collapsed');
                    womenCategoryList().should('have.attr', 'class', 'panel-collapse in');
                })
                it('Collapse Kids', function() {
                    menCategoryExpandIcon().click();
                    menCategoryList().should('have.attr', 'class', 'panel-collapse in');
                    kidsCategoryExpandIcon().click();
                    menCategory().should('have.attr', 'class', 'collapsed');
                    kidsCategoryList().should('have.attr', 'class', 'panel-collapse in');
                })
            })
            context('Hide Kids', function() {
                it('Collapse Men', function() {
                    kidsCategoryExpandIcon().click();
                    kidsCategoryList().should('have.attr', 'class', 'panel-collapse in');
                    menCategoryExpandIcon().click();
                    kidsCategory().should('have.attr', 'class', 'collapsed');
                    menCategoryList().should('have.attr', 'class', 'panel-collapse in');
                })
                it('Collapse Women', function() {
                    kidsCategoryExpandIcon().click();
                    kidsCategoryList().should('have.attr', 'class', 'panel-collapse in');
                    womenCategoryExpandIcon().click();
                    kidsCategory().should('have.attr', 'class', 'collapsed');
                    womenCategoryList().should('have.attr', 'class', 'panel-collapse in');
                })
            })
        })
        context('Navigate to and check products are displaying properly', function() {
            context('To Specified category', function() {
                context('Women', function() {
                    it('Dress', function() {
                        womenCategoryExpandIcon().click();
                        womenDressCategory().click();
                        cy.url().should('eq', `${baseUrl}${womenDressCategoryPage}`);
                        featuresItemsHeader().should('have.text', `${womenDressHeaderText}`).
                        and('have.css', 'color', `${orangeColor}`)
                        cy.wrapProductsOnSpecifiedPage(pathToDataFile, 'Women', 'Dress').
                        each(({ id, name, price }) => {
                            productImg(id).should('be.visible')
                            productHeader(id).should('have.text', `${price}`)
                            productParagraph(id).should('have.text', `${name}`)
                            addToCartButton(id).should('be.visible')
                            viewProductButton(id).should('be.visible')
                        })
                    })
                    it('Tops', function() {
                        womenCategoryExpandIcon().click();
                        womenTopsCategory().click();
                        cy.url().should('eq', `${baseUrl}${womenTopsCategoryPage}`);
                        featuresItemsHeader().should('have.text', `${womenTopsHeaderText}`).
                        and('have.css', 'color', `${orangeColor}`)
                        cy.wrapProductsOnSpecifiedPage(pathToDataFile, 'Women', 'Tops').
                        each(({ id, name, price }) => {
                            productImg(id).should('be.visible')
                            productHeader(id).should('have.text', `${price}`)
                            productParagraph(id).should('have.text', `${name}`)
                            addToCartButton(id).should('be.visible')
                            viewProductButton(id).should('be.visible')
                        })
                    })
                    it('Saree', function() {
                        womenCategoryExpandIcon().click();
                        womenSareeCategory().click();
                        cy.url().should('eq', `${baseUrl}${womenSareeCategoryPage}`);
                        featuresItemsHeader().should('have.text', `${womenSareeHeaderText}`).
                        and('have.css', 'color', `${orangeColor}`)
                        cy.wrapProductsOnSpecifiedPage(pathToDataFile, 'Women', 'Saree').
                        each(({ id, name, price }) => {
                            productImg(id).should('be.visible')
                            productHeader(id).should('have.text', `${price}`)
                            productParagraph(id).should('have.text', `${name}`)
                            addToCartButton(id).should('be.visible')
                            viewProductButton(id).should('be.visible')
                        })
                    })
                })
                context('Men', function() {
                    it('TShirts', function() {
                        menCategoryExpandIcon().click();
                        menTShirtsCategory().click();
                        cy.url().should('eq', `${baseUrl}${menTShirtsCategoryPage}`);
                        featuresItemsHeader().should('have.text', `${menTShirtsHeaderText}`).
                        and('have.css', 'color', `${orangeColor}`)
                        cy.wrapProductsOnSpecifiedPage(pathToDataFile, 'Men', 'TShirts').
                        each(({ id, name, price }) => {
                            productImg(id).should('be.visible')
                            productHeader(id).should('have.text', `${price}`)
                            productParagraph(id).should('have.text', `${name}`)
                            addToCartButton(id).should('be.visible')
                            viewProductButton(id).should('be.visible')
                        })
                    })
                    it('Jeans', function() {
                        menCategoryExpandIcon().click();
                        menJeansCategory().click();
                        cy.url().should('eq', `${baseUrl}${menJeansCategoryPage}`);
                        featuresItemsHeader().should('have.text', `${menJeansHeaderText}`).
                        and('have.css', 'color', `${orangeColor}`)
                        cy.wrapProductsOnSpecifiedPage(pathToDataFile, 'Men', 'Jeans').
                        each(({ id, name, price }) => {
                            productImg(id).should('be.visible')
                            productHeader(id).should('have.text', `${price}`)
                            productParagraph(id).should('have.text', `${name}`)
                            addToCartButton(id).should('be.visible')
                            viewProductButton(id).should('be.visible')
                        })
                    })  
                })
                context('Kids', function() {
                    it('Dress', function() {
                        kidsCategoryExpandIcon().click();
                        kidsDressCategory().click();
                        cy.url().should('eq', `${baseUrl}${kidsDressCategoryPage}`);
                        featuresItemsHeader().should('have.text', `${kidsDressHeaderText}`).
                        and('have.css', 'color', `${orangeColor}`)
                        cy.wrapProductsOnSpecifiedPage(pathToDataFile, 'Kids', 'Dress').
                        each(({ id, name, price }) => {
                            productImg(id).should('be.visible')
                            productHeader(id).should('have.text', `${price}`)
                            productParagraph(id).should('have.text', `${name}`)
                            addToCartButton(id).should('be.visible')
                            viewProductButton(id).should('be.visible')
                        })
                    })
                    it('Tops & Shirts', function() {
                        kidsCategoryExpandIcon().click();
                        kidsTopsAndShirtsCategory().click();
                        cy.url().should('eq', `${baseUrl}${kidsTopsAndShirtsCategoryPage}`);
                        featuresItemsHeader().should('have.text', `${kidsTopsAndShirtsHeaderText}`).
                        and('have.css', 'color', `${orangeColor}`)
                        cy.wrapProductsOnSpecifiedPage(pathToDataFile, 'Kids', 'Tops & Shirts').
                        each(({ id, name, price }) => {
                            productImg(id).should('be.visible')
                            productHeader(id).should('have.text', `${price}`)
                            productParagraph(id).should('have.text', `${name}`)
                            addToCartButton(id).should('be.visible')
                            viewProductButton(id).should('be.visible')
                        })
                    })  
                })
            })
            context('Specified brands', function() {
                it('Polo', function() {
                    poloBrand().click();
                    cy.url().should('eq', `${baseUrl}${poloBrandPage}`);
                    featuresItemsHeader().should('have.text', `${brandPoloHeaderText}`).
                    and('have.css', 'color', `${orangeColor}`)
                    cy.wrapProductsOnSpecifiedPage(pathToDataFile, 'Brand', 'Polo').
                        each(({ id, name, price }) => {
                            productImg(id).should('be.visible')
                            productHeader(id).should('have.text', `${price}`)
                            productParagraph(id).should('have.text', `${name}`)
                            addToCartButton(id).should('be.visible')
                            viewProductButton(id).should('be.visible')
                    })
                })
                it('H&M', function() {
                    hmBrand().click();
                    cy.url().should('eq', `${baseUrl}${hAndMBrandPage}`);
                    featuresItemsHeader().should('have.text', `${brandHAndMHeaderText}`).
                    and('have.css', 'color', `${orangeColor}`)
                    cy.wrapProductsOnSpecifiedPage(pathToDataFile, 'Brand', 'H&M').
                        each(({ id, name, price }) => {
                            productImg(id).should('be.visible')
                            productHeader(id).should('have.text', `${price}`)
                            productParagraph(id).should('have.text', `${name}`)
                            addToCartButton(id).should('be.visible')
                            viewProductButton(id).should('be.visible')
                    })
                })
                it('Madame', function() {
                    madameBrand().click();
                    cy.url().should('eq', `${baseUrl}${madameBrandPage}`)
                    featuresItemsHeader().should('have.text', `${brandMadameHeaderText}`).
                    and('have.css', 'color', `${orangeColor}`)
                    cy.wrapProductsOnSpecifiedPage(pathToDataFile, 'Brand', 'Madame').
                        each(({ id, name, price }) => {
                            productImg(id).should('be.visible')
                            productHeader(id).should('have.text', `${price}`)
                            productParagraph(id).should('have.text', `${name}`)
                            addToCartButton(id).should('be.visible')
                            viewProductButton(id).should('be.visible')
                    })
                })
                it('Mast & Harbour', function() {
                    mastharbourBrand().click();
                    cy.url().should('eq', `${baseUrl}${mastAndHarbourBrandPage}`)
                    featuresItemsHeader().should('have.text', `${brandMastAndHarbourHeaderText}`).
                    and('have.css', 'color', `${orangeColor}`)
                    cy.wrapProductsOnSpecifiedPage(pathToDataFile, 'Brand', 'Mast & Harbour').
                        each(({ id, name, price }) => {
                            productImg(id).should('be.visible')
                            productHeader(id).should('have.text', `${price}`)
                            productParagraph(id).should('have.text', `${name}`)
                            addToCartButton(id).should('be.visible')
                            viewProductButton(id).should('be.visible')
                    })
                })
                it('Babyhug', function() {
                    babyhugBrand().click();
                    cy.url().should('eq', `${baseUrl}${babyhugBrandPage}`)
                    featuresItemsHeader().should('have.text', `${brandBabyhugHeaderText}`).
                    and('have.css', 'color', `${orangeColor}`)
                    cy.wrapProductsOnSpecifiedPage(pathToDataFile, 'Brand', 'Babyhug').
                        each(({ id, name, price }) => {
                            productImg(id).should('be.visible')
                            productHeader(id).should('have.text', `${price}`)
                            productParagraph(id).should('have.text', `${name}`)
                            addToCartButton(id).should('be.visible')
                            viewProductButton(id).should('be.visible')
                    })
                })
                it('Allen Solly Junior', function() {
                    allensollyjuniorBrand().click();
                    cy.url().should('eq', `${baseUrl}${allenSollyJuniorBrandPage}`)
                    featuresItemsHeader().should('have.text', `${brandAllenSollyJuniorHeaderText}`).
                    and('have.css', 'color', `${orangeColor}`)
                    cy.wrapProductsOnSpecifiedPage(pathToDataFile, 'Brand', 'Allen Solly Junior').
                        each(({ id, name, price }) => {
                            productImg(id).should('be.visible')
                            productHeader(id).should('have.text', `${price}`)
                            productParagraph(id).should('have.text', `${name}`)
                            addToCartButton(id).should('be.visible')
                            viewProductButton(id).should('be.visible')
                    })
                })
                it('Kookie Kids', function() {
                    kookiekidsBrand().click();
                    cy.url().should('eq', `${baseUrl}${kookieKidsBrandPage}`)
                    featuresItemsHeader().should('have.text', `${brandKookieKidsHeaderText}`).
                    and('have.css', 'color', `${orangeColor}`)
                    cy.wrapProductsOnSpecifiedPage(pathToDataFile, 'Brand', 'Kookie Kids').
                        each(({ id, name, price }) => {
                            productImg(id).should('be.visible')
                            productHeader(id).should('have.text', `${price}`)
                            productParagraph(id).should('have.text', `${name}`)
                            addToCartButton(id).should('be.visible')
                            viewProductButton(id).should('be.visible')
                    })
                })
                it('Biba', function() {
                    bibaBrand().click();
                    cy.url().should('eq', `${baseUrl}${bibaBrandPage}`)
                    featuresItemsHeader().should('have.text', `${brandBibaHeaderText}`).
                    and('have.css', 'color', `${orangeColor}`)
                    cy.wrapProductsOnSpecifiedPage(pathToDataFile, 'Brand', 'Biba').
                        each(({ id, name, price }) => {
                            productImg(id).should('be.visible')
                            productHeader(id).should('have.text', `${price}`)
                            productParagraph(id).should('have.text', `${name}`)
                            addToCartButton(id).should('be.visible')
                            viewProductButton(id).should('be.visible')
                    })
                })
            })
        })
    })
})