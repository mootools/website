"use strict";

module.exports = function splitMetaData(str){
	var i = 0;
	var line = '';
	while (i < str.length){
		if (str[i] == '\n'){
			if (/^-+\s*$/.test(line)){
				var data = str.slice(0, i - line.length).trim();
				var md = str.slice(i + 1);
				return [data, md];
			}
			line = '';
		} else {
			line += str[i];
		}
		i++;
	}
};
