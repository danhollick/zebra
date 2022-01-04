export const apcaInfo = [
  {
    rangeMin: 15,
    rangeMax: 30,
    heading: 'Minimum contrast',
    body: `The absolute minimum for any non-text that needs to be discernible and differentiable, such as dividers/outlines.
    
    Contrast levels below 15 are effectively invisible to a significant portion of the population.`,
    color: '$contrast30',
  },
  {
    rangeMin: 30,
    rangeMax: 45,
    heading: 'Minimum level for non-text elements',
    body: `The absolute minimum for any text regardless of size or weight, including text for spot reading such as placeholder text or disabled element text.
    
    Understandable non-text elements, such as icons and shapes, will not be recognized below 30.`,
    color: '$contrast45',
  },
  {
    rangeMin: 45,
    rangeMax: 60,
    heading: 'Minimum level for any text.',
    body: `The minimum for larger text (>24px normal weight or >19px bold) such as headlines, that should be fluently readable. 

    Also the minimum for pictograms with fine details, or smaller outline icons.

    Similar to 3:1 in WCAG 2.`,
    color: '$contrast60',
  },
  {
    rangeMin: 60,
    rangeMax: 75,
    heading: 'Minimum level for content text.',
    body: `The minimum level recommended for readable content text that is not body text.

    Button text, captions and other text where readability is important.

    Similar to 4.5:1 in WCAG 2.`,
    color: '$contrast75',
  },
  {
    rangeMin: 75,
    rangeMax: 90,
    heading: 'Minimum level for body text.',
    body: `The minimum level for columns of body text with a font no smaller than 18px, or non-body text with a font no smaller than 14px.

    Similar to 7:1 in WCAG 2.`,
    color: '$contrast90',
  },
  {
    rangeMin: 90,
    rangeMax: 106,
    heading: 'Preferred level for body text.',
    body: `This is the preferred level for text that a user is expected to read and comprehend at best speed, ie: body text, paragraphs.
    
    Also the minimum level for very thin font weights. 
    
    This level is similar to ISO 10:1.`,
    color: '$contrast100',
  },
]

// `These general levels are appropriate for use without reference to the lookup table.

// 90 • Preferred level for fluent text and columns of body text with a font no smaller than 14px, or non-body text with a font no smaller than 12px. Also a recommended minimum for extremely thin fonts (light weight) of any size. Lc 90 is a suggested maximum for very large and bold fonts (greater than 36px bold), and large areas of color. This level is similar to ISO 10:1.
// 75 • The minimum level for columns of body text with a font no smaller than 18px, or non-body text with a font no smaller than 14px. Also, should be used for any text where readability is important. This level is functionally similar to 6:1 ~ 7:1 relative to WCAG2.
// 60 • The minimum level recommended for readable content text, that is, text you want people to read, and no smaller than 16px, and not used as body text. This level is functionally similar to the old 4.5:1 in WCAG2.
// 45 • The minimum for larger text (larger than 24px normal weight or 19px bold) such as headlines, and large text that should be fluently readable. This is also the minimum for pictograms with fine details, or smaller outline icons. This level is functionally similar to the old 3:1 in WCAG2.
// 30 • The absolute minimum for any text regardless of size or weight, including text for spot reading such as placeholder text, disabled element text, copyright, etc. Also the minimum for "understandable" or "uniquely identifiable" non-text elements such as "mostly solid" icons or bold pictograms, and controls or focus with a minimum dimension of 4px on the shortest area. This is the minimum for controls such as radio buttons or checkboxes, provided they are of sufficient size and thickness.
// 15 • The absolute minimum for any non-text that needs to be discernible and differentiable, such as dividers, and in some cases form outlines, but more for disabled elements, such as a disabled submit button — and this applies to the button shape and not the text (text of a disabled element is Lc30). Designers should treat anything below this level as invisible, as it will not be visible for many users. This minimum level should be avoided for items important to the use or interaction of the site. The range from Lc15 to Lc30 should be approached carefully and never used for elements that are critical to a task, such as a checkbox or radio button, except when they are in a "disabled" state.`
