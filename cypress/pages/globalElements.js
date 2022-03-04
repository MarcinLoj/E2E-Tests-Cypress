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
        addToCartButton: (productId) => cy.get(`a[data-product-id="${productId}"]`),
        productHeader: (productId) => cy.get(`[src="${specifiedProduct}${productId}"] + h2`),
        productParagraph: (productId) => cy.get(`[src="${specifiedProduct}${productId}"] + h2 + p`)
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
        
}

module.exports = new GlobalElements();