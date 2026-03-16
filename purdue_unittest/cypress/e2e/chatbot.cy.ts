describe('KYC/AML Chatbot E2E Tests', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display the main title', () => {
    cy.get('h1').should('contain', 'KYC/AML Chatbot Test Platform')
  })

  it('should handle KYC onboarding query', () => {
    cy.get('input[placeholder="Ask about KYC/AML..."]').type('How do I onboard?')
    cy.get('button').contains('Send').click()
    cy.get('.responses').should('contain', 'Provide your documents for verification.')
  })

  it('should handle AML query', () => {
    cy.get('input[placeholder="Ask about KYC/AML..."]').type('Tell me about AML')
    cy.get('button').contains('Send').click()
    cy.get('.responses').should('contain', 'AML monitoring is active')
  })

  it('should generate synthetic KYC data', () => {
    cy.get('button').contains('Generate Synthetic KYC Data').click()
    cy.get('pre').should('not.be.empty')
    cy.get('pre').invoke('text').then((text) => {
      const data = JSON.parse(text)
      expect(data).to.have.length(3)
      expect(data[0]).to.have.property('name')
      expect(data[0]).to.have.property('idType')
    })
  })
})
