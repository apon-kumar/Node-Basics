function show(){
    console.log('show function called.');
}

var test = 'import';

module.exports.show = show;
module.exports.test = test;
