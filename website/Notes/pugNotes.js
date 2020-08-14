const pug = require('pug');

const PORT = process.env.PORT || 2020
const devOption = process.env.NODE_ENV;



const compileFunction = pug.compileFile('pugNotes.pug');

console.log(compiledFunction({
  name: 'Matsu'
}));

console.log(pug.renderFile('pugNotes.pug', {
  name: 'Lucy'
}));

