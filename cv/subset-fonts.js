let fontkit = require('fontkit');
let fs = require('fs');
let { promisify } = require('util');
let openFont = promisify(fontkit.open);

// open a font synchronously
let fontStyles = [
  // {
  //   name: 'Black',
  //   chars: '%&(),-./012346789@ABCDEFGHIJKLMNOPRSTUWXabcdefghijklmnoprstuvwxy',
  // },
  // {
  //   name: 'Bold',
  //   chars: '%&(),-./012346789@ABCDEFGHIJKLMNOPRSTUWXabcdefghijklmnoprstuvwxy',
  // },
  // {
  //   name: 'Light',
  //   chars: '%&(),-./012346789@ABCDEFGHIJKLMNOPRSTUWXabcdefghijklmnoprstuvwxy',
  // },
  {
    name: 'Medium',
    chars: '/CESUacdeghiklmnoprstuy',
  },
  {
    name: 'Regular',
    chars: '()ABCDHTaceghilnorstvy',
  },
  // {
  //   name: 'SemiBold',
  //   chars: '%&(),-./012346789@ABCDEFGHIJKLMNOPRSTUWXabcdefghijklmnoprstuvwxy',
  // },
  {
    name: 'Thin',
    chars: '%&,-./012346789@ABCDEFGHIJKLMNOPRSTUWXabcdefghijklmnoprstuvwxy',
  },
  {
    name: 'XThin',
    chars: '.BJabdegijnorst',
  },
];

fontStyles.forEach(async style => {
  try {
    console.log(`Loading font from: "fonts/original/Moreno-${style.name}.woff"`);
    let font = await openFont(`fonts/original/Moreno-${style.name}.woff`, null);
    console.log(`Loaded: ${font.fullName}`);
    console.log(`Subsetting…`);
    let subset = font.createSubset();
    let glyphs = font.glyphsForString(style.chars);
    glyphs.forEach(({ id: glyphID }) => {
      subset.includeGlyph(glyphID);
    });
    console.log(`Encoding…`);
    let stream = subset.encodeStream()
          .pipe(fs.createWriteStream(`fonts/Moreno-${style.name}.woff`));
    stream.on('finish', () => { console.log(`Saved: "fonts/Moreno-${style.name}.woff"`); });
  } catch (error) {
    console.log(error);
  }
});
