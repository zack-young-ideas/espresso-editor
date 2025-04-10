describe('Editor', () => {
  it('allows user to insert new text', () => {
    /*
    The user should be able to click inside an existing test node,
    type some characters, and the document should render properly with
    these new characters inserted.
    */
    cy.visit('/')
    cy.get('#editor').within(($div) => {
      cy.get('p').eq(0).type(
        '{leftArrow}'.repeat(20) + 'this is some new text'
      );

      cy.get('p').eq(0).contains(
        'into a single country called thethis is some new text Dominion',
      );
    });
  })
  it('allows user to remove text within text node', () => {
    /*
    The user should be able to click inside an existing text node,
    press Backspace several times to delete several characters, and the
    document should still be rendered properly.
    */
    cy.visit('/')
    cy.get('#editor').within(($div) => {
      cy.get('p').eq(1).type(
        '{leftArrow}'.repeat(20) + '{backspace}'.repeat(10)
      );

      cy.get('p').eq(1).contains(
        'were drafted, outlining trk for a new nation.',
      );
    });
  });
  it('allows user to remove text across multiple nodes', () => {
    /*
    The user should be able to click inside an existing text node,
    press Backspace several times to delete characters in the currently
    selected node, and the previous node, and the node before that,
    and the document should still be rendered properly.
    */
    cy.visit('/')
    cy.get('#editor').within(($div) => {
      cy.get('p').eq(1).type(
        '{leftArrow}'.repeat(50) + '{backspace}'.repeat(40)
      );

      cy.get('p').eq(1).contains(
        'to the Quebec Codrafted,',
      );
      cy.get('p').eq(1).find('strong').eq(1).should(($strong) => {
        expect($strong.text()).to.equal('Quebec Co');
      });
    });
  });
  it('allows user to remove text into previous block node', () => {
    /*
    The user should be allowed to click inside an existing block node,
    press Backspace to remove the first several characters within that
    block, and then continue to press Backspace to continue removing
    characters in the previous block as well. This should cause the
    remaining contents of both blocks to be merged into one block.
    */
  });
})
