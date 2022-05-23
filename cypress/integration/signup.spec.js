import SignupPage from '../support/pages/signup'

describe('cadastro', function () {

    before(function () {
        cy.fixture('signup').then(function (signup) {
            this.success = signup.success
            this.email_dup = signup.email_dup
            this.email_inv = signup.email_inv
            this.short_password = signup.short_password
        })
    })

    context('quando o usuario é novato', function () {
        before(function () {
            cy.task('removeUser', this.success.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('deve cadastrar com sucesso', function () {

            SignupPage.go()
            SignupPage.form(this.success)
            SignupPage.submit()
            SignupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })
    })

    context('quando o email ja existe', function () {
        before(function () {
            cy.postUser(this.email_dup)
        })

        it('nao deve cadastrar o usuario', function () {

            SignupPage.go()
            SignupPage.form(this.email_dup)
            SignupPage.submit()
            SignupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('quando o email é incorreto', function () {
        it('deve exibir mensagem de alerta', function () {
            SignupPage.go()
            SignupPage.form(this.email_inv)
            SignupPage.submit()
            SignupPage.alert.haveText('Informe um email válido')
        })
    })

    context('quando a senha é muito curta', function () {

        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

        beforeEach(function () {
            SignupPage.go()
        })

        passwords.forEach(function (p) {
            it('nao deve cadastrar com a senha: ' + p, function () {

                this.short_password.password = p

                SignupPage.form(this.short_password)
                SignupPage.submit()
            })
        })

        afterEach(function () {
            SignupPage.alert.haveText('Pelo menos 6 caracteres')
        })
    })

    context('quando nao preencho nenhum dos campos', function () {
        const alertMessages = [
            'Nome é obrigatório',
            'E-mail é obrigatório',
            'Senha é obrigatória'
        ]

        before(function () {
            SignupPage.go()
            SignupPage.submit()

        })

        alertMessages.forEach(function (alert) {
            it('deve exibir ' + alert.toLowerCase(), function () {

                SignupPage.alert.haveText(alert)

            })
        })
    })

})