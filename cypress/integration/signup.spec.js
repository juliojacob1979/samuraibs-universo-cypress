import SignupPage from '../support/pages/signup'

describe('cadastro', function () {

    context('quando o usuario é novato', function () {
        const user = {
            name: 'Julio Jacob',
            email: 'julio@samuraibs.com',
            password: 'pwd123'
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('deve cadastrar com sucesso', function () {

            SignupPage.go()
            SignupPage.form(user)
            SignupPage.submit()
            SignupPage.toast.shouldHaveText('Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')

        })
    })


    context('quando o email ja existe', function () {
        const user = {
            name: 'Joao Lucas',
            email: 'joao@samuraibs.com',
            password: 'pwd123',
            is_provider: true
        }

        before(function () {
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })

            cy.request(
                'POST',
                'http://localhost:3333/users',
                user
            ).then(function (response) {
                expect(response.status).to.eq(200)
            })
        })

        it('nao deve cadastrar o usuario', function () {

            SignupPage.go()
            SignupPage.form(user)
            SignupPage.submit()
            SignupPage.toast.shouldHaveText('Email já cadastrado para outro usuário.')
        })
    })

    context('quando o email é incorreto', function () {
        const user = {
            name: 'Elizabeth Olsen',
            email: 'liza.yahoo.com',
            password: 'pwd123'
        }

        it('deve exibir mensagem de alerta', function () {
            SignupPage.go()
            SignupPage.form(user)
            SignupPage.submit()
            SignupPage.alertHaveText('Informe um email válido')
        })
    })

    context('quando a senha é muito curta', function () {

        const passwords = ['1', '2a', 'ab3', 'abc4', 'ab#c5']

        beforeEach(function () {
            SignupPage.go()
        })

        passwords.forEach(function (p) {
            it('nao deve cadastrar com a senha: ' + p, function () {
                const user = {
                    name: 'Jason Friday', email: 'jason@gmail.com', password: p}

                SignupPage.form(user)
                SignupPage.submit()
            })
        })

        afterEach(function () {
            SignupPage.alertHaveText('Pelo menos 6 caracteres')
        })
    })

    context.only('quando nao preencho nenhum campo', function () {
        const alertMessages = ['Nome é obrigatório', 'E-mail é obrigatório', 'Senha é obrigatória']

        before(function () {
            SignupPage.go()
            SignupPage.submit()

        })

        alertMessages.forEach(function (alert) {
            it('nao deve cadastrar com a senha: ' + alert.toLowerCase(), function () {
                
                SignupPage.alertHaveText(alert)
                
            })
        })
    })

})





