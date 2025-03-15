/*
Defines class used to update and render the editor document.
*/

export type InlineNode = {
  text?: string;
  bold?: boolean;
  italic?: boolean;
  url?: string;
  children?: InlineNode[];
}

export type BlockNode = {
  type: string;
  children: InlineNode[];
  src?: string;
  alt?: string;
}

export class DocumentClass {
  constructor(nodes) {
  }

  html() {
    return;
  }

  nodes() {
    return;
  }
}
