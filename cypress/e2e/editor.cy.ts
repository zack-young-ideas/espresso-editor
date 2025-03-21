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
        'This is some text. It is a parinsertagraph, to be exact.'
      );
    });
  })
})
