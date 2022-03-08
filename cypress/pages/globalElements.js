import * as endpoints from '../fixtures/endpoints.json';

const { womenDressCategoryPage, womenTopsCategoryPage, womenSareeCategoryPage, 
    menJeansCategoryPage, menTShirtsCategoryPage, kidsDressCategoryPage, 
    kidsTopsAndShirtsCategoryPage, poloBrandPage, bibaBrandPage,
    madameBrandPage, babyhugBrandPage, kookieKidsBrandPage,
    mastAndHarbourBrandPage, allenSollyJuniorBrandPage,
    hAndMBrandPage, specifiedProduct, specifiedProductDetail } = endpoints;

class GlobalElements {
    elements = {
        categoryHeader: () => cy.get('.left-sidebar > h2'),
        brandsHeader: () => cy.get('.brands_products > h2'),
        womenCategory: () => cy.get('.panel-title > [href="#Women"]'),
        menCategory: () => cy.get('.panel-title > [href="#Men"]'),
        kidsCategory: () => cy.get('.panel-title > [href="#Kids"]'),
        poloBrand: () => cy.get(`[href="${poloBrandPage}"]`),
        hmBrand: () => cy.get(`[href="${hAndMBrandPage}"]`),
        madameBrand: () => cy.get(`[href="${madameBrandPage}"]`),
        mastharbourBrand: () => cy.get(`[href="${mastAndHarbourBrandPage.replaceAll('%20', ' ')}"]`),
        babyhugBrand: () => cy.get(`[href="${babyhugBrandPage}"]`),
        allensollyjuniorBrand: () => cy.get(`[href="${allenSollyJuniorBrandPage.replaceAll('%20', ' ')}"]`),
        kookiekidsBrand: () => cy.get(`[href="${kookieKidsBrandPage.replace('%20', ' ')}"]`),
        bibaBrand: () => cy.get(`[href="${bibaBrandPage}"]`),
        womenCategoryExpandIcon: () => cy.get('.panel-title > [href="#Women"] > span > i'),
        menCategoryExpandIcon: () => cy.get('.panel-title > [href="#Men"] > span > i'),
        kidsCategoryExpandIcon: () => cy.get('.panel-title > [href="#Kids"] > span > i'),
        womenCategoryList: () => cy.get('div > #Women'),
        menCategoryList: () => cy.get('div > #Men'),
        kidsCategoryList: () => cy.get('div > #Kids'),
        womenDressCategory: () => cy.get(`[href="${womenDressCategoryPage}"]`),
        womenTopsCategory: () => cy.get(`[href="${womenTopsCategoryPage}"]`),
        womenSareeCategory: () => cy.get(`[href="${womenSareeCategoryPage}"]`),
        menTShirtsCategory: () => cy.get(`[href="${menTShirtsCategoryPage}"]`),
        menJeansCategory: () => cy.get(`[href="${menJeansCategoryPage}"]`),
        kidsDressCategory: () => cy.get(`[href="${kidsDressCategoryPage}"]`),
        kidsTopsAndShirtsCategory: () => cy.get(`[href="${kidsTopsAndShirtsCategoryPage}"]`),
        featuresItemsHeader: () => cy.get('.features_items > h2'),
        productImg: (productId) => cy.get(`[src="${specifiedProduct}${productId}"]`),
        viewProductButton: (productId) => cy.get(`a[href="${specifiedProductDetail}${productId}"]`),
        addToCartButton: (productId) => cy.get(`.productinfo.text-center > a[data-product-id="${productId}"]`),
        productHeader: (productId) => cy.get(`[src="${specifiedProduct}${productId}"] + h2`),
        productParagraph: (productId) => cy.get(`[src="${specifiedProduct}${productId}"] + h2 + p`),
        modalHeader: () => cy.get('.modal-title.w-100'),
        modalParagraph: () => cy.get('.modal-body > .text-center:nth-of-type(1)'),
        modalLinkButton: () => cy.get('.modal-body > .text-center > a'),
        modalContinueButton: () => cy.get('.btn.btn-success.close-modal.btn-block'),
        homeButton: () => cy.get('.shop-menu > .nav > :nth-child(1) > a'),
        logo: () => cy.get('a > img'),
        productsButton: () => cy.get('.shop-menu > .nav > :nth-child(2) > a'),
        cartButton: () => cy.get('.shop-menu > .nav > :nth-child(3) > a'),
        signupButton: () => cy.get('.shop-menu > .nav > :nth-child(4) > a'),
        testCasesButton: () => cy.get('.shop-menu > .nav > :nth-child(5) > a'),
        apiTestingButton: () => cy.get('.shop-menu > .nav > :nth-child(6) > a'),
        contactUsButton: () => cy.get('.shop-menu > .nav > :nth-child(7) > a')
    }
        state() {
            count = 3;
            return {
                increment: (data) => {
                    if(count < data.length) 
                    count++;
                }
            }
        }
        getSidebarElementText(element, contentNumber = 2) {
            return element.contents().get(contentNumber).nodeValue.trim().toUpperCase()
        }
}

module.exports = new GlobalElements();