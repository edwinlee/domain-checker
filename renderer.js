var fs = require('fs');

function mergeValues(values, content) {
	//cycle over keys and replace all with values from object

	for(var key in values) {
		content = content.replace("{{" + key + "}}", values[key]);
	}

	//return merged content
	return content;
}

function view(templateName, values, res) {
	//read from the template file
	var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: "utf8"});

	//insert values into content
	fileContents = mergeValues(values, fileContents);

	//write out contents to response
	res.write(fileContents);
}

module.exports.view = view;