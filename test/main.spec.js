const rewire = require('rewire');
const assert = require('assert');
const path = require('path');
const scrappeteer = require(path.join(process.cwd(), 'src', 'scrappeteer.js'));
const sinon = require('sinon');

var main = rewire(path.join(process.cwd(), 'src', 'main.js'));
var main_func = main.__get__('main');
var snapshot = sinon.stub(scrappeteer, 'snapshot');
snapshot.returns(0);


describe('main', function(){

    it('should handle a url', function(){
	main_func('file', 'png', 'output');
        assert(snapshot.called);
    });

    it('should handle undefined parameters', function(){
	main_func('file', undefined, undefined);
        assert(snapshot.called);
    });

    it('should reject unsupported format', function(){
        var sandbox   = sinon.sandbox.create({ useFakeTimers : true });
        var exitStub  = sandbox.stub(process, 'exit');
        process.once('SIGTERM', () => {
            closeStub = sandbox.stub(server, 'close');
        });
        main_func('file', 'gif', 'output');
    });

});
