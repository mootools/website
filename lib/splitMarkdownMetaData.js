"use strict";

module.exports = function splitMetaData(str){
	var i = 0;
	var line = '';
	while (i < str.length){
		if (str[i] == '\n'){
			if (/^\-+$/.test(line)){
				var data = str.slice(0, i - line.length).trim();
				var md = str.slice(i);
				return [data, md];
			}
			line = '';
		} else {
			line += str[i];
		}
		i++;
	}
};
