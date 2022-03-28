

it('webapp deve esta online', function(){
    cy.visit('/')

    cy.title()
        .should('eq', 'Samurai Barbershop by QAninja')
})