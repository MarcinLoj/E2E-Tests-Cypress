class Homepage {
    elements = {
        homeButton: () => cy.get('.shop-menu > .nav > :nth-child(1) > a'),
        logo: () => cy.get('a > img'),
        productsButton: () => cy.get('.shop-menu > .nav > :nth-child(2) > a'),
        cartButton: () => cy.get('.shop-menu > .nav > :nth-child(3) > a'),
        signupButton: () => cy.get('.shop-menu > .nav > :nth-child(4) > a'),
        testCasesButton: () => cy.get('.shop-menu > .nav > :nth-child(5) > a'),
        apiTestingButton: () => cy.get('.shop-menu > .nav > :nth-child(6) > a'),
        contactUsButton: () => cy.get('.shop-menu > .nav > :nth-child(7) > a'),
        carouselHeader1: () => cy.get(`.item:nth-child(${this.state.count}) > .col-sm-6 > h1`),
        carouselHeader2: () => cy.get(`.item:nth-child(${this.state.count}) > .col-sm-6 > h2`),
        carouselParagraph: () => cy.get(`.item:nth-child(${this.state.count}) > .col-sm-6 > p`),
        carouselIndicator: () => cy.get(`.carousel-indicators > li:nth-child(${this.state.count})`),
        carouselImage: () => cy.get(`.item:nth-child(${this.state.count}) > .col-sm-6 > img`),
        carouselButtonTestCase: () => cy.get(`.item:nth-child(${this.state.count}) > .col-sm-6 > .test_cases_list > .btn.btn-success`),
        carouselButtonApisList: () => cy.get(`.item:nth-child(${this.state.count}) > .col-sm-6 > .apis_list > .btn.btn-success`),
        carouselRightChevron: () => cy.get('.right.control-carousel.hidden-xs'),
        carouselLeftChevron: () => cy.get('.left.control-carousel.hidden-xs')
    }
    state = {
        count: 1,
        timesToUseCarousel: 4
    }
    setSliderState(action = '') {
        if(action === 'next slide') {
            this.state.count++;
            if(this.state.count === 4) {
                this.state.count = 1;
            };
        };
        if(action === 'prev slide') {
            this.state.count--;
            if(this.state.count === 0) {
                this.state.count = 3;
            };
        };
    };
    navigateTo(desire = '', usingElement) {
        this.setSliderState(desire)
        usingElement.click();
    };
    checkPageRefreshUsing(element) {
        cy.window().then(w => w.beforeReload = true)
        cy.window().should('have.prop', 'beforeReload', true)
        this.elements[element]().click();
        cy.window().should('not.have.prop', 'beforeReload')
    };
    getGirlImageNumber() {
        const imgFormat = '.jpg'
        if(this.state.count === 1) return `2${imgFormat}`;
        if(this.state.count === 2) return `1${imgFormat}`;
        return `3${imgFormat}`;
    }
    getSidebarElementText(element, contentNumber = 2) {
        return element.contents().get(contentNumber).nodeValue.trim().toUpperCase()
    }
}

module.exports = new Homepage();