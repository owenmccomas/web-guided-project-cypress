// write tests here
describe('Quotes App', () => {
    beforeEach(() => {
        //Each test needs fresh state
        //Tests shouldn't rely on other tests
        //Every test should work in isolation



        cy.visit('http://localhost:1234') // CAREFUL
    })

    //Helpers (GETTERS)
    const textInput = () => cy.get('input[name=text]')
    const authorInput = () => cy.get('input[name=author]')
    const foobarInput = () => cy.get('input[name=foobar]')
    const submitBtn = () => cy.get(`button[id='submitBtn']`)
    const cancelBtn = () => cy.get(`button[id='cancelBtn']`)
    
    it('sanity check to make sure tests work', () => {
        // 'it' is a test
        // 'expect' is an assertation
        // There can be multiple assertations per test, but they all need-
        // to relate to the 'one thing' that we're testing

        expect(true).to.equal(true)
        expect(2 + 2).not.equal(5) // strict === vs ==!! === strict, does NOT do type coercion
        expect({}).not.to.equal({}) // Is this true?
    })

    it('the proper elements are showing', () => {
        textInput().should('exist')
        authorInput().should('exist')
        foobarInput().should('not.exist')
        submitBtn().should('exist')
        cancelBtn().should('exist')

        cy.contains("Submit Quote").should('exist')
        cy.contains(/submit quote/i).should('exist')
    })

    describe('Filling out the inputs and cancelling', () => {
        it('can navigate to the site', () => {
            cy.url().should('include', 'localhost')
        })

        it('submit button starts out disabled', () => {
            submitBtn().should('be.disabled')
        })

        it('can type in the inputs', () => {
            textInput()
            .should('have.value', '')
            .type('CSS rules')
            .should('have.value', 'CSS rules')

            authorInput()
            .should('have.value', '')
            .type('owenmccomas')
            .should('have.value', 'owenmccomas') 
        })

        it('the submit button enables when both inputs are filled out', () => {
            authorInput().type('Owen')
            textInput().type('This is fun')
            submitBtn().should('not.be.disabled')
        })

        it('the cancel button can reset the inputs and disable the submit button', () => {
            authorInput().type('Owen')
            textInput().type('Fun')
            cancelBtn().click();
            textInput().should('have.value', '')
            authorInput().should('have.value', '')
            submitBtn().should('be.disabled')
        })
    })


    describe('adding a new quote', () => {
        it('create a new custom quote', () => {
            authorInput().type('Owen McComas')
            textInput().type('Quote!')
            submitBtn().click();
            cy.contains('Quote!').siblings('button:nth-of-type(2)').click()
            cy.contains('Quote!').should('not.exist')        
        })

        it('variation of can submit a new quote', () => {
            cy.contains('Quote!').should('not.exist')
            textInput().type('Quote!')
            authorInput().type('Owen')
            submitBtn().click()
            cy.contains('Quote!')
            cy.contains('Owen')
            cy.contains('Quote!').next().next().click()
            cy.contains('Quote!').should('not.exist')
        })
    })


    describe('editing an existing quote', () => {
        it('can edit a quote', () => {
            textInput().type('Lorem Ipsum')
            authorInput().type('Owen')
            submitBtn().click()
            cy.contains('Lorem Ipsum').siblings('button:nth-of-type(1)').click()
            textInput().should('have.value', 'Lorem Ipsum')
            authorInput().should('have.value', 'Owen')
            textInput().type(' dolor sit')
            authorInput().type(' McComas')
            submitBtn().click()
            cy.contains('Lorem Ipsum dolor sit (Owen McComas)')
            cy.contains('Lorem Ipsum dolor sit (Owen McComas)').next().next().click();
            cy.contains('Lorem Ipsum dolor sit (Owen McComas)').should('not.exist')
        })
    })
})