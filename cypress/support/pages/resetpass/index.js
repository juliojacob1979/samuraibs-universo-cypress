

class ResetPassPage {

    go(token) {
        cy.visit('/reset-password?token=' + token)
    }
}

export default new ResetPassPage()