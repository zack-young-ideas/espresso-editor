import { type InlineNode, type BlockNode } from '../DocumentClass.ts'

export const html: string = [
  ,'<h1>Canadian Confederation: The Birth of a Nation</h1>'
  ,'<h2>Introduction</h2>'
  ,'<p>On <bold>July 1, 1867</bold>, Canada officially became a '
  ,'self-governing dominion within the British Empire through an '
  ,'agreement known as <bold>Confederation</bold>. This landmark event '
  ,'united four provinces--<bold>Ontario, Quebec, New Brunswick, and '
  ,'Nova Scotia</bold>--into a single country called the <bold>Dominion '
  ,'of Canada</bold>.</p>'
  ,'<img src="example.jpg" alt="Canada" />'
  ,'<h2>Background</h2>'
  ,'<p>The <bold>Charlottetown Conference</bold> in 1864 was the first '
  ,'step toward union. Originally intended to discuss the possible '
  ,'unification of the Maritime provinces, the conference expanded after '
  ,'leaders from Canada joned the talks. This led to the <bold>Quebec '
  ,'Conference</bold>, where the <i>72 Resolutions</i> were drafted, '
  ,'outlining the framework for a new nation.</p>'
  ,'<p>Click <a href="example.html">here</a> to learn more.</p>'
].join('');

export const documentObject: BlockNode[] = [
  {
    type: 'h1',
    children: [
      {
        text: 'Canadian Confederation: The Birth of a Nation',
      }
    ],
  },
  {
    type: 'h2',
    children: [
      {
        text: 'Introduction',
      }
    ],
  },
  {
    type: 'p',
    children: [
      {
        text: 'On ',
      },
      {
        text: 'July 1, 1867',
        bold: true,
      },
      {
        text: [
          ', Canada officially became a self-governing dominion within '
          ,'the British Empire through an agreement known as '
        ].join(''),
      },
      {
        text: 'Confederation',
        bold: true,
      },
      {
        text: '. This landmark event united four provinces--',
      },
      {
        text: 'Ontario, Quebec, New Brunswick, and Nova Scotia',
        bold: true,
      },
      {
        text: '--into a single country called the',
      },
      {
        text: 'Dominion of Canada',
        bold: true,
      },
    ],
  },
  {
    type: 'img',
    src: 'example.jpg',
    alt: 'Canada',
  },
  {
    type: 'h2',
    children: [
      {
        text: 'Background',
      }
    ],
  },
  {
    type: 'p',
    children: [
      {
        text: 'The ',
      },
      {
        text: 'Charlottetown Conference',
        bold: true,
      },
      {
        text: [
          'in 1864 was the first step toward union. Originally intended '
          ,'to discuss the possible unification of the Maritime provinces, '
          ,'the conference expanded after leaders from Canada joined the '
          ,'talks. This led to the '
        ].join(''),
      },
      {
        text: 'Quebec Conference',
        bold: true,
      },
      {
        text: ', where the ',
      },
      {
        text: '72 Resolutions',
        italic: true,
      },

      {
        text: ' were drafted, outlining the framework for a new nation.',
      },
    ],
  },
  {
    type: 'p',
    children: [
      {
        text: 'Click ',
      },
      {
        type: 'link',
        url: 'example.html',
        children: [
          {
            text: 'here'
          },
        ],
      },
      {
        text: ' to learn more. ',
      },
    ],
  },
];
