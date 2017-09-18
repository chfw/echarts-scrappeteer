const rewire = require('rewire');
const assert = require('assert');
const path = require('path');
const scrappeteer = require(path.join(process.cwd(), 'src', 'scrappeteer.js'));
const sinon = require('sinon');

var main = rewire(path.join(process.cwd(), 'src', 'main.js'));
var main_func = main.__get__('main');
var snapshot = sinon.stub(scrappeteer, 'snapshot');
snapshot.returns(0);

/* test mockup */
var sandbox   = sinon.sandbox.create({ useFakeTimers : true });
var exitStub  = sandbox.stub(process, 'exit');


describe('main', function(){

  it('should handle a url', function(){
    main_func('file', {format: 'png',
                       output: 'output'});
    assert(snapshot.called);
  });

  it('should handle undefined parameters', function(){
    main_func('file', {});
    assert(snapshot.called);
  });

  it('should reject unsupported format', function(){
    process.once('SIGTERM', () => {
      closeStub = sandbox.stub(server, 'close');
    });
    main_func('file', { format: 'tif', output: 'output' });
  });

  it('should reject invalid view port', function(){
    process.once('SIGTERM', () => {
      closeStub = sandbox.stub(server, 'close');
    });
    main_func('file', {format: 'jpeg', output: 'output', viewPort: [1, 2, 3]});
  });

});


describe('main utils', function(){
  it('should convert number string into number', function(){
    const intValue = main.__get__('intValue');
    var result = intValue('1000');
    assert.equal(result, 1000);
  });

  it('should convert number string array into number array', function(){
    const intArray = main.__get__('intArray');
    var result = intArray('1,2,3');
    assert.equal(result[0], 1);
    assert.equal(result[1], 2);
    assert.equal(result[2], 3);
  });
});
