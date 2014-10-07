'use strict';

var path = require('path');
var fs = require('fs');

// dir: string - path to directory from script path
// files_: array - files array to add to, optional
// fileType: string - filter fileextension, defaults to no filter

function getFiles(dir, files_, fileType){

	var regex = fileType ? new RegExp('\\' + fileType + '$') : '';

	return fs.readdirSync(dir).reduce(function(allFiles, file){
		var name = path.join(dir, file);
		if (fs.statSync(name).isDirectory()){
			getFiles(name, allFiles, fileType);
		} else if (file.match(regex)){
			allFiles.push(name);
		}
		return allFiles;
	}, files_ || []);

}

module.exports = getFiles;
