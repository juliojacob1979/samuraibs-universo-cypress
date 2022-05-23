
import fpPage from '../support/pages/forgotpass'
import rpPage from '../support/pages/resetpass'

describe('regaste de senha', function () {

    before(function () {
        cy.fixture('recovery').then(function (recovery) {
            this.data = recovery
        })
    })

    context('quando o usuario esquece a senha', function () {

        before(function () {
            cy.postUser(this.data)
        })

        it('deve poder resgatar por email', function () {
            fpPage.go()
            fpPage.form(this.data.email)
            fpPage.submit()

            const message = 'Enviamos um e-mail para confirmar a recuperação de senha, cheque sua caixa de entrada.'
            fpPage.toast.shouldHaveText(message)
        })
    })

    context.only('quando o usuario solicita o resgate', function () {

        before(function () {
            cy.postUser(this.data)
            cy.recoveryPass(this.data.email)
        })

        it('deve poder cadastrar uma nova sennha', function () {

            console.log(Cypress.env('recoveryToken'))


        })
    })
})