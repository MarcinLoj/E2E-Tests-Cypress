class ContactUsPage {
    elements = {
        headerContactUs: () => cy.get('.col-sm-12 > .title')
    }
}
module.exports = new ContactUsPage();