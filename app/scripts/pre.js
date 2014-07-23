var jade = require('jade');
console.log(jade);
// Compile a function
var fn = jade.compile('string of jade', options);
console.log(fn);
fn(locals);