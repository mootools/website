Central place for ideas and designs for MooTools Projects.

Want to help, go to the [Wiki](https://github.com/mootools/website/wiki) and add your things.

## Installation

To install everything you need to clone the repository and run a little install script.

```bash
$ git clone git://github.com/arian/website.git
$ cd website
$ ./install
```

Or you can do the steps manually:

```bash
~$ git clone git://github.com/arian/website.git
~$ cd website
~/website$ git submodule update --init --recursive
~/website$ npm install
~/website$ cd mootools-microsite
~/website/mootools-microsite$ npm install
~/website/mootools-microsite$ cd ../prime-website
~/website/prime-website$ npm install
~/website/prime-website$ sudo npm link ../mootools-microsite
~/website/prime-website$ node docs/build
~/website/prime-website$ cd ../elements-website
~/website/elements-website$ npm install
~/website/elements-website$ sudo npm link ../mootools-microsite
~/website/elements-website$ node docs/build
~/website/elements-website$ cd ..
~/website$ npm install
~/website$ sudo npm link ./mootools-microsite
~/website$ node index
```


## Run it

To run it, you can either use node directly, use forever or use supervisor.

```bash
node index
```

## Run only a subproject

It is possible to just run `prime-website`:

```bash
cd prime-website
node index
```

Now instead of `/prime` all urls are only `/`.

Same thing for `elements-website`.

