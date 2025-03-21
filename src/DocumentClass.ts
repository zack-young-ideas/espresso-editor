/*
Defines class used to update and render the editor document.
*/

export type InlineNode = {
  type?: string;
  text?: string;
  bold?: boolean;
  italic?: boolean;
  url?: string;
  children?: InlineNode[];
}

export type BlockNode = {
  type: string;
  children?: InlineNode[];
  src?: string;
  alt?: string;
}

export class DocumentClass {
  constructor(html: string | null, document: BlockNode[] | null) {
  }

  html() {
    return;
  }

  nodes() {
    return;
  }
}
