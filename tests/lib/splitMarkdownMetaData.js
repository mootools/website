"use strict";

var expect = require('expect.js');
var split  = require('../../lib/splitMarkdownMetaData');

describe('splitMarkdownMetaData', function(){

	it('should split the file on ---', function(){

		var str = 'first\n---\nsecond';
		var data = split(str);

		expect(data).to.be.ok();
		expect(data[0]).to.be('first');
		expect(data[1]).to.be('second');

	});

	it('should allow some extra whitespace after ---', function(){

		var str = 'first\n--- \t \nsecond';
		var data = split(str);

		expect(data).to.be.ok();
		expect(data[0]).to.be('first');
		expect(data[1]).to.be('second');

	});

	it('should work with windows line endings', function(){

		var str = 'first\r\n---\r\nsecond';
		var data = split(str);

		expect(data).to.be.ok();
		expect(data[0]).to.be('first');
		expect(data[1]).to.be('second');

	});

});
