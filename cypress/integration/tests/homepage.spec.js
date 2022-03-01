import Homepage from '../../pages/homepage'
import ProductsPage from '../../pages/productsPage'
import CartPage from '../../pages/cartPage'
import LoginPage from '../../pages/loginPage'
import TestCasesPage from '../../pages/testCasesPage'
import ApiTestingPage from '../../pages/apiTestingPage'
import ContactUsPage from '../../pages/contactUsPage'
import GlobalElements from '../../pages/globalElements'
import * as endpoints from '../../fixtures/endpoints.json'
import * as keys from '../../fixtures/stringKeys.json'
import * as styleGuide from '../../fixtures/styleGuide.json'
import * as config from '../../../cypress.json'

const { baseUrl } = config

const { 
        homepage, productsPage, contactUsPage,
        loginPage, testCasesPage, apiTestingPage,
        cartPage, carouselImages, womenDressCategoryPage,
        menJeansCategoryPage, kidsDressCategoryPage,
        womenTopsCategoryPage, menTShirtsCategoryPage,
        womenSareeCategoryPage, kidsTopsAndShirtsCategoryPage,
        poloBrandPage, bibaBrandPage, madameBrandPage,
        babyhugBrandPage, kookieKidsBrandPage, mastAndHarbourBrandPage,
        allenSollyJuniorBrandPage, hAndMBrandPage
      } = endpoints

const {
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
        brandHeaderText, categoryHeaderText,
        womenDressCategoryText, womenSareeCategoryText,
        womenTopsCategoryText, menJeansCategoryText,
        menTShirtsCategoryText, kidsDressCategoryText,
        kidsTopsAndShirtsCategoryText, brandAllenSollyJuniorHeaderText,
        brandBabyhugHeaderText, brandBibaHeaderText,
        brandHAndMHeaderText, brandKookieKidsHeaderText,
        brandMadameHeaderText, brandMastAndHarbourHeaderText,
        brandPoloHeaderText
      } = keys
const {
        textGrayColorFirst, textBoldColor,
        hoverColor, textOrangeColor,
        textGrayColorSecond
      } = styleGuide
      
const { timesToUseCarousel } = Homepage.state;
const { searchProductInput } = ProductsPage.elements
const { breadcrumb } = CartPage.elements;
const { emailAddressInput } = LoginPage.elements;
const { headerTC } = TestCasesPage.elements;
const { headerApi } = ApiTestingPage.elements;
const { headerContactUs } = ContactUsPage.elements;

const { carouselImage, testCasesButton,
    carouselHeader1, carouselHeader2, 
    carouselIndicator, carouselParagraph, 
    carouselRightChevron, productsButton,
    cartButton, signupButton,
    carouselButtonTestCase, carouselButtonApisList,
    logo, homeButton,
    carouselLeftChevron, apiTestingButton,
    contactUsButton
  } = Homepage.elements;

const { 
    categoryHeader,
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
    kidsTopsAndShirtsCategory, featuresItemsHeader
    } = GlobalElements.elements

describe('Homepage tests', function() {
    beforeEach(() => {
        cy.visit(`${homepage}`);
        Homepage.state.count = 1;
    })
    context('Navigation bar tests', function() {
        context('Reload page using', function() {
            it('Home button', function() {
                homeButton().should('be.visible');
                Homepage.checkPageRefreshUsing('homeButton');
            })
            it('Logo', function() {
                logo().should('be.visible');
                Homepage.checkPageRefreshUsing('logo');
            })
        })
        context('Navigate to', function() {
            it('Products Page', function() {
                productsButton().should('be.visible');
                Homepage.navigateTo('products page', productsButton())

                searchProductInput().should('be.visible');
                searchProductInput().invoke('attr', 'placeholder').should('eq', 'Search Product')
                cy.url().should('eq', `${baseUrl}${productsPage}`)
            })
            it('Cart Page', function() {
                cartButton().should('be.visible');
                Homepage.navigateTo('cart page',cartButton())

                breadcrumb().should('be.visible');
                breadcrumb().should('have.text', 'Shopping Cart')
                cy.url().should('eq', `${baseUrl}${cartPage}`)
            })
            it('Signup/Login Page', function() {
                signupButton().should('be.visible');
                Homepage.navigateTo('signup/login page', signupButton());

                emailAddressInput().should('be.visible');
                emailAddressInput().invoke('attr', 'placeholder').should('eq', 'Email Address')
                cy.url().should('eq', `${baseUrl}${loginPage}`)
            })
            it('Test Cases Page', function() {
                testCasesButton().should('be.visible');
                Homepage.navigateTo('test cases page', testCasesButton());

                headerTC().should('be.visible');
                headerTC().should('have.text', 'Test Cases')
                cy.url().should('eq', `${baseUrl}${testCasesPage}`)
            })
            it('API Testing Page', function() {
                apiTestingButton().should('be.visible');
                Homepage.navigateTo('api testing page', apiTestingButton());

                headerApi().should('be.visible');
                headerApi().should('have.text', 'APIs List for practice')
                cy.url().should('eq', `${baseUrl}${apiTestingPage}`)
            })
            it('Contact Us Page', function() {
                contactUsButton().should('be.visible');

                Homepage.navigateTo('contact page', contactUsButton());

                headerContactUs().should('be.visible');
                headerContactUs().should('have.text', 'Contact Us');
                cy.url().should('eq', `${baseUrl}${contactUsPage}`);
            })
        })  
    })
    context('Carousel Tests', function() {
        it('check right chevron is clickable', function() {
            for(let i = timesToUseCarousel; i > 0; i--) {
            carouselIndicator().invoke('attr', 'class').should('eq', 'active');
            carouselRightChevron().should('be.visible');
            Homepage.navigateTo('next slide', carouselRightChevron());
            }
        })
        it('check left chevron is clickable', function() {
            for(let i = timesToUseCarousel; i > 0; i--) {
                Homepage.navigateTo('prev slide', carouselLeftChevron());
                carouselIndicator().invoke('attr', 'class').should('eq', 'active');
                carouselRightChevron().should('be.visible');
                }
        })
        it('check chevrons CSS', function() {
            carouselRightChevron().should('have.css', 'color', 'rgb(194, 194, 193)');
            carouselLeftChevron().should('have.css', 'color', 'rgb(194, 194, 193)');
            carouselRightChevron().realHover().wait(2000).should('have.css', 'color', `${hoverColor}`)
            carouselLeftChevron().realHover().wait(2000).should('have.css', 'color', `${hoverColor}`)
        })
        it('check slides content', function() {
            for(let i = timesToUseCarousel; i > 0; i--) {
                carouselIndicator().invoke('attr', 'class').should('eq', 'active');

                carouselIndicator().should('be.visible');
                carouselHeader1().should('be.visible');
                carouselHeader2().should('be.visible');
                carouselParagraph().should('be.visible');

                carouselHeader1().find('span').should('have.css', 'color', `${textOrangeColor}`).
                and('have.text', `${carouselHeader1SpanText}`)
                
                carouselHeader1().should('have.css', 'color', `${textGrayColorFirst}`).
                and('have.text', `${carouselHeader1SpanText}${carouselHeader1Text}`);

                carouselHeader2().should('have.css', 'color', `${textBoldColor}`).
                and('have.text', `${carouselHeader2Text}`);

                carouselParagraph().should('have.text', `${carouselParagraphText}`);

                Homepage.navigateTo('next slide', carouselRightChevron());
            }  
        })
        it('check slides images endpoints', function() {
            for(let i = timesToUseCarousel; i > 0; i--) {
                carouselIndicator().invoke('attr','class').should('eq', 'active');

                carouselIndicator().should('be.visible');
                carouselImage().should('be.visible');

                carouselImage().invoke('attr', 'src').should('eq', `${carouselImages}${Homepage.getGirlImageNumber()}`);

                Homepage.navigateTo('next slide', carouselRightChevron());
            }
        })
        it('check buttons CSS', function() {
            for(let i = timesToUseCarousel; i > 0; i--) {
                carouselIndicator().invoke('attr','class').should('eq', 'active');

                carouselButtonApisList().should('be.visible');
                carouselButtonTestCase().should('be.visible');

                carouselButtonTestCase().should('have.css', 'color', 'rgb(255, 255, 255)').
                and('have.css', 'background-color', 'rgb(92, 184, 92)').
                and('have.css', 'border-color', 'rgb(76, 174, 76)');

                carouselButtonTestCase().realHover().should('have.css', 'background-color', `${hoverColor}`);

                carouselButtonApisList().should('have.css', 'color', 'rgb(255, 255, 255)').
                and('have.css', 'background-color', 'rgb(92, 184, 92)').
                and('have.css', 'border-color', 'rgb(76, 174, 76)');

                carouselButtonApisList().realHover().should('have.css', 'background-color', `${hoverColor}`)

                Homepage.navigateTo('next slide', carouselRightChevron());
            }
        })
    })  
    context('Left Sidebar Tests', function () {
        it('check section elements content and CSS', function() {
            categoryHeader().should('be.visible').
            and('have.text', `${categoryHeaderText}`).
            and('have.css', 'color', `${textOrangeColor}`);

            brandsHeader().should('be.visible').
            and('have.text', `${brandHeaderText}`).
            and('have.css', 'color', `${textOrangeColor}`);

            womenCategory().should('be.visible').
            and(elem => {
                const txt = Homepage.getSidebarElementText(elem)
                expect(txt).to.eq(`${womenCategoryText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })

            menCategory().should('be.visible').
            and(elem => {
                const txt = Homepage.getSidebarElementText(elem)
                expect(txt).to.eq(`${menCategoryText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })

            kidsCategory().should('be.visible').
            and(elem => {
                const txt = Homepage.getSidebarElementText(elem)
                expect(txt).to.eq(`${kidsCategoryText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })
            hmBrand().should('be.visible').
            and(elem => {
                const txt = Homepage.getSidebarElementText(elem)
                expect(txt).to.eq(`${brandHMText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })

            poloBrand().should('be.visible').
            and(elem => {
                const txt = Homepage.getSidebarElementText(elem)
                expect(txt).to.eq(`${brandPoloText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })

            bibaBrand().should('be.visible').
            and(elem => {
                const txt = Homepage.getSidebarElementText(elem)
                expect(txt).to.eq(`${brandBibaText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })

            madameBrand().should('be.visible').
            and(elem => {
                const txt = Homepage.getSidebarElementText(elem)
                expect(txt).to.eq(`${brandMadameText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })

            babyhugBrand().should('be.visible').
            and(elem => {
                const txt = Homepage.getSidebarElementText(elem)
                expect(txt).to.eq(`${brandBabyhugText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })

            kookiekidsBrand().should('be.visible').
            and(elem => {
                const txt = Homepage.getSidebarElementText(elem)
                expect(txt).to.eq(`${brandKookiekidsText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })

            mastharbourBrand().should('be.visible').
            and(elem => {
                const txt = Homepage.getSidebarElementText(elem)
                expect(txt).to.eq(`${brandMastAndHarbourText.toUpperCase()}`)
                expect(elem).to.have.css('color',`${textGrayColorSecond}`)
            })

            allensollyjuniorBrand().should('be.visible').
            and(elem => {
                const txt = Homepage.getSidebarElementText(elem)
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
        context('Navigate to', function() {
            context('Specified categories', function() {
                context('Women', function() {
                    it('Dress', function() {
                        womenCategoryExpandIcon().click();
                        Homepage.navigateTo('Dress', womenDressCategory());
                        cy.url().should('eq', `${baseUrl}${womenDressCategoryPage}`);
                        featuresItemsHeader().should('have.text', `${womenDressHeaderText}`).
                        and('have.css', 'color', `${textOrangeColor}`)
                    })
                    it('Tops', function() {
                        womenCategoryExpandIcon().click();
                        Homepage.navigateTo('Tops', womenTopsCategory());
                        cy.url().should('eq', `${baseUrl}${womenTopsCategoryPage}`);
                        featuresItemsHeader().should('have.text', `${womenTopsHeaderText}`).
                        and('have.css', 'color', `${textOrangeColor}`)
                    })
                    it('Saree', function() {
                        womenCategoryExpandIcon().click();
                        Homepage.navigateTo('Saree', womenSareeCategory());
                        cy.url().should('eq', `${baseUrl}${womenSareeCategoryPage}`);
                        featuresItemsHeader().should('have.text', `${womenSareeHeaderText}`).
                        and('have.css', 'color', `${textOrangeColor}`)
                    })
                })
                context('Men', function() {
                    it('TShirts', function() {
                        menCategoryExpandIcon().click();
                        Homepage.navigateTo('TShirts', menTShirtsCategory());
                        cy.url().should('eq', `${baseUrl}${menTShirtsCategoryPage}`);
                        featuresItemsHeader().should('have.text', `${menTShirtsHeaderText}`).
                        and('have.css', 'color', `${textOrangeColor}`)
                    })
                    it('Jeans', function() {
                        menCategoryExpandIcon().click();
                        Homepage.navigateTo('Jeans', menJeansCategory());
                        cy.url().should('eq', `${baseUrl}${menJeansCategoryPage}`);
                        featuresItemsHeader().should('have.text', `${menJeansHeaderText}`).
                        and('have.css', 'color', `${textOrangeColor}`)
                    })  
                })
                context('Kids', function() {
                    it('Dress', function() {
                        kidsCategoryExpandIcon().click();
                        Homepage.navigateTo('TShirts', kidsDressCategory());
                        cy.url().should('eq', `${baseUrl}${kidsDressCategoryPage}`);
                        featuresItemsHeader().should('have.text', `${kidsDressHeaderText}`).
                        and('have.css', 'color', `${textOrangeColor}`)
                    })
                    it('Tops and Shirts', function() {
                        kidsCategoryExpandIcon().click();
                        Homepage.navigateTo('Tops and Shirts', kidsTopsAndShirtsCategory());
                        cy.url().should('eq', `${baseUrl}${kidsTopsAndShirtsCategoryPage}`);
                        featuresItemsHeader().should('have.text', `${kidsTopsAndShirtsHeaderText}`).
                        and('have.css', 'color', `${textOrangeColor}`)
                    })  
                })
            })
            context('Specified brands', function() {
                it('Polo', function() {
                    Homepage.navigateTo('Polo', poloBrand());
                    cy.url().should('eq', `${baseUrl}${poloBrandPage}`);
                    featuresItemsHeader().should('have.text', `${brandPoloHeaderText}`).
                    and('have.css', 'color', `${textOrangeColor}`)
                })
                it('H&M', function() {
                    Homepage.navigateTo('H&M', hmBrand());
                    cy.url().should('eq', `${baseUrl}${hAndMBrandPage}`);
                    featuresItemsHeader().should('have.text', `${brandHAndMHeaderText}`).
                    and('have.css', 'color', `${textOrangeColor}`)
                })
                it('Madame', function() {
                    Homepage.navigateTo('Madame', madameBrand());
                    cy.url().should('eq', `${baseUrl}${madameBrandPage}`)
                    featuresItemsHeader().should('have.text', `${brandMadameHeaderText}`).
                    and('have.css', 'color', `${textOrangeColor}`)
                })
                it('Mast & Harbour', function() {
                    Homepage.navigateTo('Mast & Harbour', mastharbourBrand());
                    cy.url().should('eq', `${baseUrl}${mastAndHarbourBrandPage}`)
                    featuresItemsHeader().should('have.text', `${brandMastAndHarbourHeaderText}`).
                    and('have.css', 'color', `${textOrangeColor}`)
                })
                it('Babyhug', function() {
                    Homepage.navigateTo('Babyhug', babyhugBrand());
                    cy.url().should('eq', `${baseUrl}${babyhugBrandPage}`)
                    featuresItemsHeader().should('have.text', `${brandBabyhugHeaderText}`).
                    and('have.css', 'color', `${textOrangeColor}`)
                })
                it('Allen Solly Junior', function() {
                    Homepage.navigateTo('Allen Solly Junior', allensollyjuniorBrand());
                    cy.url().should('eq', `${baseUrl}${allenSollyJuniorBrandPage}`)
                    featuresItemsHeader().should('have.text', `${brandAllenSollyJuniorHeaderText}`).
                    and('have.css', 'color', `${textOrangeColor}`)
                })
                it('Kookie Kids', function() {
                    Homepage.navigateTo('Kookie Kids', kookiekidsBrand());
                    cy.url().should('eq', `${baseUrl}${kookieKidsBrandPage}`)
                    featuresItemsHeader().should('have.text', `${brandKookieKidsHeaderText}`).
                    and('have.css', 'color', `${textOrangeColor}`)
                })
                it('Biba', function() {
                    Homepage.navigateTo('Biba', bibaBrand());
                    cy.url().should('eq', `${baseUrl}${bibaBrandPage}`)
                    featuresItemsHeader().should('have.text', `${brandBibaHeaderText}`).
                    and('have.css', 'color', `${textOrangeColor}`)
                })
            })
        })
        
    })
})