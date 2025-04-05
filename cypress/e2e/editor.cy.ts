describe('Editor', () => {
  it('allows user to insert new text', () => {
    cy.visit('/')
    cy.get('#editor').within(($div) => {
      cy.get('p').eq(0).type(
        '{leftArrow}'.repeat(20) + 'this is some new text' + '{enter}'
      );

      cy.get('p').eq(0).contains(
        'into a single country called thethis is some new text',
      );
      cy.get('p').eq(1).should(($p) => {
        expect($p).to.have.text(' Dominion of Canada.');
      })
    });
  })
})
