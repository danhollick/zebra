export const apcaInfo = [
  {
    rangeMin: 15,
    rangeMax: 30,
    heading: 'Minimum contrast',
    body: `Contrast levels below 15 are effectively invisible to a significant portion of the population. 
    
    Not suitable for anything that needs to be recognized or understood.`,
    color: '$contrast30',
  },
  {
    rangeMin: 30,
    rangeMax: 45,
    heading: 'Minimum level for non-text elements',
    body: `Understandable non-text elements, such as icons and shapes, will not be recognized below 30.
    
    Text at this level will have reduced readability unless very large and bold.`,
    color: '$contrast45',
  },
  {
    rangeMin: 45,
    rangeMax: 60,
    heading: 'Minimum level for any text.',
    body: `This is the minimum level for any text, regardless of size. 

    Roughly equivalent to 3:1 in WCAG 2`,
    color: '$contrast60',
  },
  {
    rangeMin: 60,
    rangeMax: 75,
    heading: 'Minimum level for spot text.',
    body: `This is the minimum level for text where legibility is less important ie: copyright notices, footer material.

    Roughly equivalent to 4.5:1 in WCAG 2`,
    color: '$contrast75',
  },
  {
    rangeMin: 75,
    rangeMax: 90,
    heading: 'Minimum level for body text.',
    body: `This is the minimum level for text that a user is expected to read and comprehend at best speed, ie: body text, paragraphs.

    Roughly equivalent to 7:1 in WCAG 2`,
    color: '$contrast90',
  },
  {
    rangeMin: 90,
    rangeMax: 106,
    heading: 'Preferred level for body text.',
    body: `This is the preferred level for text that a user is expected to read and comprehend at best speed, ie: body text, paragraphs.
    
    Also the minimum level for very thin font weights. `,
    color: '$contrast100',
  },
]
