/*
Defines classes used to represent the editor document.
*/

type InlineNodeType = {
  bold?: boolean;
  children?: InlineNode[];
  italic?: boolean;
  type?: string;
  text?: string;
  url?: string;
};

export type BlockNodeType = {
  alt?: string;
  type: string;
  children?: InlineNode[];
  src?: string;
};

class InlineNode {
  /*
  Represents inline HTML elements.
  */

  constructor(element: InlineNodeType) {
    this.bold = element.bold;
    this.italic = element.italic;
    this.type = element.type;
    this.text = element.text;
    this.url = element.url;
    if (element.children) {
      this.children = [];
      for (let i = 0; i < element.children.length; i++) {
        this.children.push(new InlineNode(element.children[i]));
      }
    }
  }

  html() {
    /*
    Returns a string that displays the element's HTML.
    */
    let output = '';
    if (this.type === 'link') {
      output += `<a href="${this.url}">`;
      for (let i = 0; i < this.children.length; i++) {
        output += this.children[i].html();
      }
      output += '</a>';
    }
    if (this.text) {
      output += this.text;
    }
    if (this.bold) {
      output = '<strong>' + output + '</strong>';
    }
    if (this.italic) {
      output = '<i>' + output + '</i>';
    }
    return output;
  }
}


class BlockNode {
  /*
  Represents block HTML elements.
  */

  constructor(block: BlockNodeType) {
    this.alt = block.alt;
    this.src = block.src;
    this.type = block.type;
    if (block.children) {
      this.children = [];
      for (let i = 0; i < block.children.length; i++) {
        this.children.push(new InlineNode(block.children[i]));
      }
    }
  }

  html() {
    /*
    Renders the block element, and nested inline elements
    as HTML.
    */
    let output = '';
    if (this.type === 'img') {
      output += `<img src="${this.src}" alt="${this.alt}" />`;
    } else {
      output += `<${this.type}>`;
      for (let i = 0; i < this.children.length; i++) {
        output += this.children[i].html();
      }
      output += `</${this.type}>`;
    }
    return output;
  }
}

export class EditorModel {
  /*
  Represents the document.
  */

  constructor(document: BlockNodeType[]) {
    this.nodes = [];
    for (let i = 0; i < document.length; i++) {
      this.nodes.push(new BlockNode(document[i]));
    }
  }

  html() {
    let output = '';
    for (let i = 0; i < this.nodes.length; i++) {
      output += this.nodes[i].html();
    }
    return output;
  }

  applyCommand(command) {
    if (command.type === 'text') {
      if (command.value.match('\u232b')) {
        return;
      } else {
        let node = this.nodes[command.anchor.path[0]];
        let i = 1;
        while (i < command.anchor.path.length) {
          node = node.children[command.anchor.path[i]];
          i++;
        }
        node.text = [
          node.text.slice(0, command.anchor.offset),
          command.value,
          node.text.slice(command.anchor.offset)
        ].join('');
      }
    }
  }
}
