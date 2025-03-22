describe('Editor', () => {
  it('allows user to insert new text', () => {
    cy.visit('/')
    cy.get('#editor').within(($div) => {
      cy.get('p').eq(0).type(
        '{leftArrow}'.repeat(20) + 'insert'
      );
    });
    cy.get('#editor').within(($div) => {
      cy.get('p').eq(0).contains(
        'into a single country called theinsert Dominion of Canada.'
      );
    });
  })
})
