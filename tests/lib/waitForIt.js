"use strict";

var expect = require('expect.js');
var waitForIt = require('../../lib/waitForIt');

describe('waitForIt', function(){

	it('should call all callbacks when the result becomes available', function(done){
		var _a = 0, _b = 0, _c = 0;
		var a = function(e, x){ _a = x; };
		var b = function(e, x){ _b = x; };
		var c = function(e, x){ _c = x; };

		var fn = waitForIt(function(cb){
			setTimeout(function(){
				cb(null, 4);
			}, 10);
		}).get(a);

		fn.get(b);

		setTimeout(function(){
			expect(_a).to.be(4);
			expect(_b).to.be(4);

			fn.get(c);

			expect(_c).to.be(4);
			done();
		}, 20);

	});

});
