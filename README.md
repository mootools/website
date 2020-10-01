## Installation

To install everything you need to clone the repository and submodules (for the docs), install dependencies, build the documentation and run the server:

```bash

	git clone git://github.com/mootools/website.git
	cd website
	npm install
	cp config/api_keys.sample.json config/api_keys.json
	cp config/databases.sample.json config/databases.json
	node build/all # optional "--add-keys" to update api_keys.json
	node index

```

### Notes:points

- Some dependencies use native C code which requires some compiler.
  - For **Mac** users this means that Xcode (Command Line Tools) should be installed.
  - For **Windows** you need *python* (2.7, and don't forget to add it you your `%PATH%`) and a C++ compiler like [Visual Studio Express](http://www.microsoft.com/visualstudio/eng/downloads#d-express-windows-desktop)

## Run it

To run it, you can either use node directly.

```bash

	node index

```
Now the website is running on `http://localhost:3000`.

Alternatively use `forever` or use `supervisor`. `supervisor` watches all files, while wrapup/stylus write to the `public` folder. It is advised to use `supervisor --ignore public index`.

## Like to help?

We have a [Trello board](https://trello.com/b/84PZ53Pr/development) that you can follow and comment on. Also you can find [opened issues](https://github.com/mootools/website/issues) and create pull requests.

## Folder structure

- `/index.js`, is the main file, you can find everything from there
- `/views` is where all the views and uncompiled js/css is
- `/public` is where compiled css/js is saved. Also contains other things like images or fonts
- `/{core,more}` is where the routes of those projects are defined also the source files (markdown) of the guides/tutorials
- `/blog` is where the routes and blogposts are stored
- `/{middleware,lib}` are some library/helper modules
- `/tests` is where some unit tests for some modules are located
- `/design` contains some .ai files and other design specifications
- `/builder` is for the wrapup web UI front-end
- `/build` contains build scripts for the blog/guides and more
- `/cache` is where the output of the build scripts is stored

## Adding new release of project (untested as of 2014-11-04)

```bash

	node build/release [project] [tag]

```

this command should update the `package.json` configuration fields. After that
doing as `node build/all` will clone the repository and build docs etc.
