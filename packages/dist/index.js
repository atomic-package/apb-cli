(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("path"), require("fs"), require("child_process"), require("events"));
	else if(typeof define === 'function' && define.amd)
		define(["path", "fs", "child_process", "events"], factory);
	else if(typeof exports === 'object')
		exports["apb-cli"] = factory(require("path"), require("fs"), require("child_process"), require("events"));
	else
		root["apb-cli"] = factory(root["path"], root["fs"], root["child_process"], root["events"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_14__, __WEBPACK_EXTERNAL_MODULE_15__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var path = __webpack_require__(0);
var App = {
    VERSION: "0.1.1",
    DIRECTORY_PERMISSION: '757',
    SCSS_FILES_PATH: path.resolve(process.argv[1], '../../lib/node_modules/@atomic-package/apb-cli/packages/lib/files/scss'),
    PACKAGE_PATH: path.resolve(process.argv[1], '../../lib/node_modules/@atomic-package/apb-cli/')
};
exports.default = App;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __webpack_require__(1);
var common_model_1 = __webpack_require__(11);
var File_1 = __webpack_require__(12);
var fs = __webpack_require__(2);
var path = __webpack_require__(0);
var CreateModel = (function () {
    function CreateModel(directoryPath, directoryName, callback) {
        var _this = this;
        this.directoryPath = './scss/base';
        this.directoryName = 'base';
        this.scss_files = [];
        this.files = [];
        this.directoryPath = directoryPath;
        this.directoryName = directoryName;
        console.log(this.directoryName);
        this.fetchScssFiles(function () {
            _this.filterScssFiles(directoryPath, function () { });
            _this.createFilesData();
            _this.makeFiles();
            callback();
        });
    }
    CreateModel.prototype.filterScssFiles = function (pagesDirectoryPath, callback) {
        this.scss_files = this.scss_files.filter(function (file) {
            return !(new common_model_1.default().isFile(pagesDirectoryPath + '/' + file));
        });
        callback();
    };
    CreateModel.prototype.fetchScssFiles = function (callback) {
        var _this = this;
        new common_model_1.default().fetchScssFiles(this.directoryName, function (data) {
            _this.scss_files = data;
            callback();
        });
    };
    CreateModel.prototype.createFilesData = function () {
        var _this = this;
        this.scss_files.forEach(function (file) {
            _this.files.push(File_1.default.fromData({
                name: file,
                path: _this.directoryPath + '/' + file,
                data: _this.fetchFileData(path.resolve(app_1.default.SCSS_FILES_PATH, _this.directoryName, file))
            }));
        });
    };
    CreateModel.prototype.makeFiles = function () {
        var _this = this;
        this.files.forEach(function (file) {
            fs.mkdir(_this.directoryPath, app_1.default.DIRECTORY_PERMISSION, function () {
                fs.writeFile(file.path, file.data, function (err) {
                    if (err) {
                        throw err;
                    }
                    console.log("created file: " + file.path);
                });
            });
        });
    };
    CreateModel.prototype.fetchFileData = function (filePath) {
        return fs.readFileSync(filePath, 'utf8', function (err, text) {
            if (err) {
                throw err;
            }
            return text;
        });
    };
    return CreateModel;
}());
exports.CreateModel = CreateModel;
exports.default = CreateModel;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Create_1 = __webpack_require__(8);
var Generate_1 = __webpack_require__(9);
var Params_1 = __webpack_require__(13);
var app_1 = __webpack_require__(1);
var Commands = (function () {
    function Commands(userArgs, commands, program) {
        this.userArgs = userArgs;
        this.commands = commands;
        this.program = program;
        this.init();
    }
    Commands.fromData = function (data) {
        return new Commands(data.userArgs ? data.userArgs : null, data.commands ? data.commands : null, data.program ? data.program : null);
    };
    Commands.prototype.init = function () {
        console.log("apb-cli start of version " + app_1.default.VERSION);
        if (this.program.new) {
            this.runNewCommand();
        }
        if (this.program.generate) {
            this.runGenerateCommand();
        }
    };
    Commands.prototype.getInputPath = function () {
        var path = null;
        this.userArgs.forEach(function (args) {
            if (/^--path=."?.+."?$/.test(args)) {
                path = args.replace(/--path=/g, "");
            }
        });
        return path;
    };
    Commands.prototype.getDirectoryName = function () {
        if (!this.isDirectoryName())
            return null;
        for (var i = 1; i < this.userArgs.length; i++) {
            if (!/^--path=."?.+."?$/.test(this.userArgs[i])) {
                if (this.program.generate) {
                    if (!/^base$/.test(this.userArgs[i]) &&
                        !/^parts$/.test(this.userArgs[i]) &&
                        !/^pages$/.test(this.userArgs[i])) {
                        return this.userArgs[i];
                    }
                }
                else {
                    return this.userArgs[i];
                }
            }
        }
    };
    Commands.prototype.isDirectoryName = function () {
        if (this.userArgs.length < 1)
            return false;
        var isDirectoryName = false;
        for (var i = 1; i < this.userArgs.length; i++) {
            if (!/^--path=."?.+."?$/.test(this.userArgs[i])) {
                isDirectoryName = true;
            }
        }
        return isDirectoryName;
    };
    Commands.prototype.getGenerateType = function () {
        for (var i = 1; i < this.userArgs.length; i++) {
            if (!/^--path=."?.+."?$/.test(this.userArgs[i])) {
                if (/^base$/.test(this.userArgs[i])) {
                    return 'base';
                }
                else if (/^parts$/.test(this.userArgs[i])) {
                    return 'parts';
                }
                else if (/^pages$/.test(this.userArgs[i])) {
                    return 'pages';
                }
            }
        }
    };
    Commands.prototype.runNewCommand = function () {
        this.setParams({
            directoryName: this.getDirectoryName(),
            path: this.getInputPath()
        });
        new Create_1.default(this.params);
    };
    Commands.prototype.runGenerateCommand = function () {
        this.setParams({
            generateParams: {
                directoryName: this.getDirectoryName(),
                path: this.getInputPath(),
                type: this.getGenerateType()
            }
        });
        new Generate_1.default(this.params);
    };
    Commands.prototype.setParams = function (data) {
        this.params = Params_1.Params.fromData(data);
    };
    return Commands;
}());
exports.Commands = Commands;
exports.default = Commands;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __webpack_require__(1);
var program = __webpack_require__(6);
var Program = (function () {
    function Program() {
        program
            .version(app_1.default.VERSION)
            .option('-n, --new', 'Add new')
            .option('-g, --generate', 'Add generate')
            .option('-p, --path', 'Add path')
            .parse(process.argv);
        Object.assign(this, program);
    }
    return Program;
}());
exports.Program = Program;
exports.default = Program;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Module dependencies.
 */

var EventEmitter = __webpack_require__(15).EventEmitter;
var spawn = __webpack_require__(14).spawn;
var readlink = __webpack_require__(7).readlinkSync;
var path = __webpack_require__(0);
var dirname = path.dirname;
var basename = path.basename;
var fs = __webpack_require__(2);

/**
 * Expose the root command.
 */

exports = module.exports = new Command();

/**
 * Expose `Command`.
 */

exports.Command = Command;

/**
 * Expose `Option`.
 */

exports.Option = Option;

/**
 * Initialize a new `Option` with the given `flags` and `description`.
 *
 * @param {String} flags
 * @param {String} description
 * @api public
 */

function Option(flags, description) {
  this.flags = flags;
  this.required = ~flags.indexOf('<');
  this.optional = ~flags.indexOf('[');
  this.bool = !~flags.indexOf('-no-');
  flags = flags.split(/[ ,|]+/);
  if (flags.length > 1 && !/^[[<]/.test(flags[1])) this.short = flags.shift();
  this.long = flags.shift();
  this.description = description || '';
}

/**
 * Return option name.
 *
 * @return {String}
 * @api private
 */

Option.prototype.name = function() {
  return this.long
    .replace('--', '')
    .replace('no-', '');
};

/**
 * Check if `arg` matches the short or long flag.
 *
 * @param {String} arg
 * @return {Boolean}
 * @api private
 */

Option.prototype.is = function(arg) {
  return arg == this.short || arg == this.long;
};

/**
 * Initialize a new `Command`.
 *
 * @param {String} name
 * @api public
 */

function Command(name) {
  this.commands = [];
  this.options = [];
  this._execs = {};
  this._allowUnknownOption = false;
  this._args = [];
  this._name = name || '';
}

/**
 * Inherit from `EventEmitter.prototype`.
 */

Command.prototype.__proto__ = EventEmitter.prototype;

/**
 * Add command `name`.
 *
 * The `.action()` callback is invoked when the
 * command `name` is specified via __ARGV__,
 * and the remaining arguments are applied to the
 * function for access.
 *
 * When the `name` is "*" an un-matched command
 * will be passed as the first arg, followed by
 * the rest of __ARGV__ remaining.
 *
 * Examples:
 *
 *      program
 *        .version('0.0.1')
 *        .option('-C, --chdir <path>', 'change the working directory')
 *        .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
 *        .option('-T, --no-tests', 'ignore test hook')
 *
 *      program
 *        .command('setup')
 *        .description('run remote setup commands')
 *        .action(function() {
 *          console.log('setup');
 *        });
 *
 *      program
 *        .command('exec <cmd>')
 *        .description('run the given remote command')
 *        .action(function(cmd) {
 *          console.log('exec "%s"', cmd);
 *        });
 *
 *      program
 *        .command('teardown <dir> [otherDirs...]')
 *        .description('run teardown commands')
 *        .action(function(dir, otherDirs) {
 *          console.log('dir "%s"', dir);
 *          if (otherDirs) {
 *            otherDirs.forEach(function (oDir) {
 *              console.log('dir "%s"', oDir);
 *            });
 *          }
 *        });
 *
 *      program
 *        .command('*')
 *        .description('deploy the given env')
 *        .action(function(env) {
 *          console.log('deploying "%s"', env);
 *        });
 *
 *      program.parse(process.argv);
  *
 * @param {String} name
 * @param {String} [desc] for git-style sub-commands
 * @return {Command} the new command
 * @api public
 */

Command.prototype.command = function(name, desc, opts) {
  opts = opts || {};
  var args = name.split(/ +/);
  var cmd = new Command(args.shift());

  if (desc) {
    cmd.description(desc);
    this.executables = true;
    this._execs[cmd._name] = true;
    if (opts.isDefault) this.defaultExecutable = cmd._name;
  }

  cmd._noHelp = !!opts.noHelp;
  this.commands.push(cmd);
  cmd.parseExpectedArgs(args);
  cmd.parent = this;

  if (desc) return this;
  return cmd;
};

/**
 * Define argument syntax for the top-level command.
 *
 * @api public
 */

Command.prototype.arguments = function (desc) {
  return this.parseExpectedArgs(desc.split(/ +/));
};

/**
 * Add an implicit `help [cmd]` subcommand
 * which invokes `--help` for the given command.
 *
 * @api private
 */

Command.prototype.addImplicitHelpCommand = function() {
  this.command('help [cmd]', 'display help for [cmd]');
};

/**
 * Parse expected `args`.
 *
 * For example `["[type]"]` becomes `[{ required: false, name: 'type' }]`.
 *
 * @param {Array} args
 * @return {Command} for chaining
 * @api public
 */

Command.prototype.parseExpectedArgs = function(args) {
  if (!args.length) return;
  var self = this;
  args.forEach(function(arg) {
    var argDetails = {
      required: false,
      name: '',
      variadic: false
    };

    switch (arg[0]) {
      case '<':
        argDetails.required = true;
        argDetails.name = arg.slice(1, -1);
        break;
      case '[':
        argDetails.name = arg.slice(1, -1);
        break;
    }

    if (argDetails.name.length > 3 && argDetails.name.slice(-3) === '...') {
      argDetails.variadic = true;
      argDetails.name = argDetails.name.slice(0, -3);
    }
    if (argDetails.name) {
      self._args.push(argDetails);
    }
  });
  return this;
};

/**
 * Register callback `fn` for the command.
 *
 * Examples:
 *
 *      program
 *        .command('help')
 *        .description('display verbose help')
 *        .action(function() {
 *           // output help here
 *        });
 *
 * @param {Function} fn
 * @return {Command} for chaining
 * @api public
 */

Command.prototype.action = function(fn) {
  var self = this;
  var listener = function(args, unknown) {
    // Parse any so-far unknown options
    args = args || [];
    unknown = unknown || [];

    var parsed = self.parseOptions(unknown);

    // Output help if necessary
    outputHelpIfNecessary(self, parsed.unknown);

    // If there are still any unknown options, then we simply
    // die, unless someone asked for help, in which case we give it
    // to them, and then we die.
    if (parsed.unknown.length > 0) {
      self.unknownOption(parsed.unknown[0]);
    }

    // Leftover arguments need to be pushed back. Fixes issue #56
    if (parsed.args.length) args = parsed.args.concat(args);

    self._args.forEach(function(arg, i) {
      if (arg.required && null == args[i]) {
        self.missingArgument(arg.name);
      } else if (arg.variadic) {
        if (i !== self._args.length - 1) {
          self.variadicArgNotLast(arg.name);
        }

        args[i] = args.splice(i);
      }
    });

    // Always append ourselves to the end of the arguments,
    // to make sure we match the number of arguments the user
    // expects
    if (self._args.length) {
      args[self._args.length] = self;
    } else {
      args.push(self);
    }

    fn.apply(self, args);
  };
  var parent = this.parent || this;
  var name = parent === this ? '*' : this._name;
  parent.on(name, listener);
  if (this._alias) parent.on(this._alias, listener);
  return this;
};

/**
 * Define option with `flags`, `description` and optional
 * coercion `fn`.
 *
 * The `flags` string should contain both the short and long flags,
 * separated by comma, a pipe or space. The following are all valid
 * all will output this way when `--help` is used.
 *
 *    "-p, --pepper"
 *    "-p|--pepper"
 *    "-p --pepper"
 *
 * Examples:
 *
 *     // simple boolean defaulting to false
 *     program.option('-p, --pepper', 'add pepper');
 *
 *     --pepper
 *     program.pepper
 *     // => Boolean
 *
 *     // simple boolean defaulting to true
 *     program.option('-C, --no-cheese', 'remove cheese');
 *
 *     program.cheese
 *     // => true
 *
 *     --no-cheese
 *     program.cheese
 *     // => false
 *
 *     // required argument
 *     program.option('-C, --chdir <path>', 'change the working directory');
 *
 *     --chdir /tmp
 *     program.chdir
 *     // => "/tmp"
 *
 *     // optional argument
 *     program.option('-c, --cheese [type]', 'add cheese [marble]');
 *
 * @param {String} flags
 * @param {String} description
 * @param {Function|Mixed} fn or default
 * @param {Mixed} defaultValue
 * @return {Command} for chaining
 * @api public
 */

Command.prototype.option = function(flags, description, fn, defaultValue) {
  var self = this
    , option = new Option(flags, description)
    , oname = option.name()
    , name = camelcase(oname);

  // default as 3rd arg
  if (typeof fn != 'function') {
    if (fn instanceof RegExp) {
      var regex = fn;
      fn = function(val, def) {
        var m = regex.exec(val);
        return m ? m[0] : def;
      }
    }
    else {
      defaultValue = fn;
      fn = null;
    }
  }

  // preassign default value only for --no-*, [optional], or <required>
  if (false == option.bool || option.optional || option.required) {
    // when --no-* we make sure default is true
    if (false == option.bool) defaultValue = true;
    // preassign only if we have a default
    if (undefined !== defaultValue) self[name] = defaultValue;
  }

  // register the option
  this.options.push(option);

  // when it's passed assign the value
  // and conditionally invoke the callback
  this.on(oname, function(val) {
    // coercion
    if (null !== val && fn) val = fn(val, undefined === self[name]
      ? defaultValue
      : self[name]);

    // unassigned or bool
    if ('boolean' == typeof self[name] || 'undefined' == typeof self[name]) {
      // if no value, bool true, and we have a default, then use it!
      if (null == val) {
        self[name] = option.bool
          ? defaultValue || true
          : false;
      } else {
        self[name] = val;
      }
    } else if (null !== val) {
      // reassign
      self[name] = val;
    }
  });

  return this;
};

/**
 * Allow unknown options on the command line.
 *
 * @param {Boolean} arg if `true` or omitted, no error will be thrown
 * for unknown options.
 * @api public
 */
Command.prototype.allowUnknownOption = function(arg) {
    this._allowUnknownOption = arguments.length === 0 || arg;
    return this;
};

/**
 * Parse `argv`, settings options and invoking commands when defined.
 *
 * @param {Array} argv
 * @return {Command} for chaining
 * @api public
 */

Command.prototype.parse = function(argv) {
  // implicit help
  if (this.executables) this.addImplicitHelpCommand();

  // store raw args
  this.rawArgs = argv;

  // guess name
  this._name = this._name || basename(argv[1], '.js');

  // github-style sub-commands with no sub-command
  if (this.executables && argv.length < 3 && !this.defaultExecutable) {
    // this user needs help
    argv.push('--help');
  }

  // process argv
  var parsed = this.parseOptions(this.normalize(argv.slice(2)));
  var args = this.args = parsed.args;

  var result = this.parseArgs(this.args, parsed.unknown);

  // executable sub-commands
  var name = result.args[0];
  if (this._execs[name] && typeof this._execs[name] != "function") {
    return this.executeSubCommand(argv, args, parsed.unknown);
  } else if (this.defaultExecutable) {
    // use the default subcommand
    args.unshift(name = this.defaultExecutable);
    return this.executeSubCommand(argv, args, parsed.unknown);
  }

  return result;
};

/**
 * Execute a sub-command executable.
 *
 * @param {Array} argv
 * @param {Array} args
 * @param {Array} unknown
 * @api private
 */

Command.prototype.executeSubCommand = function(argv, args, unknown) {
  args = args.concat(unknown);

  if (!args.length) this.help();
  if ('help' == args[0] && 1 == args.length) this.help();

  // <cmd> --help
  if ('help' == args[0]) {
    args[0] = args[1];
    args[1] = '--help';
  }

  // executable
  var f = argv[1];
  // name of the subcommand, link `pm-install`
  var bin = basename(f, '.js') + '-' + args[0];


  // In case of globally installed, get the base dir where executable
  //  subcommand file should be located at
  var baseDir
    , link = readlink(f);

  // when symbolink is relative path
  if (link !== f && link.charAt(0) !== '/') {
    link = path.join(dirname(f), link)
  }
  baseDir = dirname(link);

  // prefer local `./<bin>` to bin in the $PATH
  var localBin = path.join(baseDir, bin);

  // whether bin file is a js script with explicit `.js` extension
  var isExplicitJS = false;
  if (exists(localBin + '.js')) {
    bin = localBin + '.js';
    isExplicitJS = true;
  } else if (exists(localBin)) {
    bin = localBin;
  }

  args = args.slice(1);

  var proc;
  if (process.platform !== 'win32') {
    if (isExplicitJS) {
      args.unshift(localBin);
      // add executable arguments to spawn
      args = (process.execArgv || []).concat(args);

      proc = spawn('node', args, { stdio: 'inherit', customFds: [0, 1, 2] });
    } else {
      proc = spawn(bin, args, { stdio: 'inherit', customFds: [0, 1, 2] });
    }
  } else {
    args.unshift(localBin);
    proc = spawn(process.execPath, args, { stdio: 'inherit'});
  }

  proc.on('close', process.exit.bind(process));
  proc.on('error', function(err) {
    if (err.code == "ENOENT") {
      console.error('\n  %s(1) does not exist, try --help\n', bin);
    } else if (err.code == "EACCES") {
      console.error('\n  %s(1) not executable. try chmod or run with root\n', bin);
    }
    process.exit(1);
  });

  // Store the reference to the child process
  this.runningCommand = proc;
};

/**
 * Normalize `args`, splitting joined short flags. For example
 * the arg "-abc" is equivalent to "-a -b -c".
 * This also normalizes equal sign and splits "--abc=def" into "--abc def".
 *
 * @param {Array} args
 * @return {Array}
 * @api private
 */

Command.prototype.normalize = function(args) {
  var ret = []
    , arg
    , lastOpt
    , index;

  for (var i = 0, len = args.length; i < len; ++i) {
    arg = args[i];
    if (i > 0) {
      lastOpt = this.optionFor(args[i-1]);
    }

    if (arg === '--') {
      // Honor option terminator
      ret = ret.concat(args.slice(i));
      break;
    } else if (lastOpt && lastOpt.required) {
      ret.push(arg);
    } else if (arg.length > 1 && '-' == arg[0] && '-' != arg[1]) {
      arg.slice(1).split('').forEach(function(c) {
        ret.push('-' + c);
      });
    } else if (/^--/.test(arg) && ~(index = arg.indexOf('='))) {
      ret.push(arg.slice(0, index), arg.slice(index + 1));
    } else {
      ret.push(arg);
    }
  }

  return ret;
};

/**
 * Parse command `args`.
 *
 * When listener(s) are available those
 * callbacks are invoked, otherwise the "*"
 * event is emitted and those actions are invoked.
 *
 * @param {Array} args
 * @return {Command} for chaining
 * @api private
 */

Command.prototype.parseArgs = function(args, unknown) {
  var name;

  if (args.length) {
    name = args[0];
    if (this.listeners(name).length) {
      this.emit(args.shift(), args, unknown);
    } else {
      this.emit('*', args);
    }
  } else {
    outputHelpIfNecessary(this, unknown);

    // If there were no args and we have unknown options,
    // then they are extraneous and we need to error.
    if (unknown.length > 0) {
      this.unknownOption(unknown[0]);
    }
  }

  return this;
};

/**
 * Return an option matching `arg` if any.
 *
 * @param {String} arg
 * @return {Option}
 * @api private
 */

Command.prototype.optionFor = function(arg) {
  for (var i = 0, len = this.options.length; i < len; ++i) {
    if (this.options[i].is(arg)) {
      return this.options[i];
    }
  }
};

/**
 * Parse options from `argv` returning `argv`
 * void of these options.
 *
 * @param {Array} argv
 * @return {Array}
 * @api public
 */

Command.prototype.parseOptions = function(argv) {
  var args = []
    , len = argv.length
    , literal
    , option
    , arg;

  var unknownOptions = [];

  // parse options
  for (var i = 0; i < len; ++i) {
    arg = argv[i];

    // literal args after --
    if ('--' == arg) {
      literal = true;
      continue;
    }

    if (literal) {
      args.push(arg);
      continue;
    }

    // find matching Option
    option = this.optionFor(arg);

    // option is defined
    if (option) {
      // requires arg
      if (option.required) {
        arg = argv[++i];
        if (null == arg) return this.optionMissingArgument(option);
        this.emit(option.name(), arg);
      // optional arg
      } else if (option.optional) {
        arg = argv[i+1];
        if (null == arg || ('-' == arg[0] && '-' != arg)) {
          arg = null;
        } else {
          ++i;
        }
        this.emit(option.name(), arg);
      // bool
      } else {
        this.emit(option.name());
      }
      continue;
    }

    // looks like an option
    if (arg.length > 1 && '-' == arg[0]) {
      unknownOptions.push(arg);

      // If the next argument looks like it might be
      // an argument for this option, we pass it on.
      // If it isn't, then it'll simply be ignored
      if (argv[i+1] && '-' != argv[i+1][0]) {
        unknownOptions.push(argv[++i]);
      }
      continue;
    }

    // arg
    args.push(arg);
  }

  return { args: args, unknown: unknownOptions };
};

/**
 * Return an object containing options as key-value pairs
 *
 * @return {Object}
 * @api public
 */
Command.prototype.opts = function() {
  var result = {}
    , len = this.options.length;

  for (var i = 0 ; i < len; i++) {
    var key = camelcase(this.options[i].name());
    result[key] = key === 'version' ? this._version : this[key];
  }
  return result;
};

/**
 * Argument `name` is missing.
 *
 * @param {String} name
 * @api private
 */

Command.prototype.missingArgument = function(name) {
  console.error();
  console.error("  error: missing required argument `%s'", name);
  console.error();
  process.exit(1);
};

/**
 * `Option` is missing an argument, but received `flag` or nothing.
 *
 * @param {String} option
 * @param {String} flag
 * @api private
 */

Command.prototype.optionMissingArgument = function(option, flag) {
  console.error();
  if (flag) {
    console.error("  error: option `%s' argument missing, got `%s'", option.flags, flag);
  } else {
    console.error("  error: option `%s' argument missing", option.flags);
  }
  console.error();
  process.exit(1);
};

/**
 * Unknown option `flag`.
 *
 * @param {String} flag
 * @api private
 */

Command.prototype.unknownOption = function(flag) {
  if (this._allowUnknownOption) return;
  console.error();
  console.error("  error: unknown option `%s'", flag);
  console.error();
  process.exit(1);
};

/**
 * Variadic argument with `name` is not the last argument as required.
 *
 * @param {String} name
 * @api private
 */

Command.prototype.variadicArgNotLast = function(name) {
  console.error();
  console.error("  error: variadic arguments must be last `%s'", name);
  console.error();
  process.exit(1);
};

/**
 * Set the program version to `str`.
 *
 * This method auto-registers the "-V, --version" flag
 * which will print the version number when passed.
 *
 * @param {String} str
 * @param {String} flags
 * @return {Command} for chaining
 * @api public
 */

Command.prototype.version = function(str, flags) {
  if (0 == arguments.length) return this._version;
  this._version = str;
  flags = flags || '-V, --version';
  this.option(flags, 'output the version number');
  this.on('version', function() {
    process.stdout.write(str + '\n');
    process.exit(0);
  });
  return this;
};

/**
 * Set the description to `str`.
 *
 * @param {String} str
 * @return {String|Command}
 * @api public
 */

Command.prototype.description = function(str) {
  if (0 === arguments.length) return this._description;
  this._description = str;
  return this;
};

/**
 * Set an alias for the command
 *
 * @param {String} alias
 * @return {String|Command}
 * @api public
 */

Command.prototype.alias = function(alias) {
  if (0 == arguments.length) return this._alias;
  this._alias = alias;
  return this;
};

/**
 * Set / get the command usage `str`.
 *
 * @param {String} str
 * @return {String|Command}
 * @api public
 */

Command.prototype.usage = function(str) {
  var args = this._args.map(function(arg) {
    return humanReadableArgName(arg);
  });

  var usage = '[options]'
    + (this.commands.length ? ' [command]' : '')
    + (this._args.length ? ' ' + args.join(' ') : '');

  if (0 == arguments.length) return this._usage || usage;
  this._usage = str;

  return this;
};

/**
 * Get the name of the command
 *
 * @param {String} name
 * @return {String|Command}
 * @api public
 */

Command.prototype.name = function() {
  return this._name;
};

/**
 * Return the largest option length.
 *
 * @return {Number}
 * @api private
 */

Command.prototype.largestOptionLength = function() {
  return this.options.reduce(function(max, option) {
    return Math.max(max, option.flags.length);
  }, 0);
};

/**
 * Return help for options.
 *
 * @return {String}
 * @api private
 */

Command.prototype.optionHelp = function() {
  var width = this.largestOptionLength();

  // Prepend the help information
  return [pad('-h, --help', width) + '  ' + 'output usage information']
      .concat(this.options.map(function(option) {
        return pad(option.flags, width) + '  ' + option.description;
      }))
      .join('\n');
};

/**
 * Return command help documentation.
 *
 * @return {String}
 * @api private
 */

Command.prototype.commandHelp = function() {
  if (!this.commands.length) return '';

  var commands = this.commands.filter(function(cmd) {
    return !cmd._noHelp;
  }).map(function(cmd) {
    var args = cmd._args.map(function(arg) {
      return humanReadableArgName(arg);
    }).join(' ');

    return [
      cmd._name
        + (cmd._alias ? '|' + cmd._alias : '')
        + (cmd.options.length ? ' [options]' : '')
        + ' ' + args
      , cmd.description()
    ];
  });

  var width = commands.reduce(function(max, command) {
    return Math.max(max, command[0].length);
  }, 0);

  return [
    ''
    , '  Commands:'
    , ''
    , commands.map(function(cmd) {
      var desc = cmd[1] ? '  ' + cmd[1] : '';
      return pad(cmd[0], width) + desc;
    }).join('\n').replace(/^/gm, '    ')
    , ''
  ].join('\n');
};

/**
 * Return program help documentation.
 *
 * @return {String}
 * @api private
 */

Command.prototype.helpInformation = function() {
  var desc = [];
  if (this._description) {
    desc = [
      '  ' + this._description
      , ''
    ];
  }

  var cmdName = this._name;
  if (this._alias) {
    cmdName = cmdName + '|' + this._alias;
  }
  var usage = [
    ''
    ,'  Usage: ' + cmdName + ' ' + this.usage()
    , ''
  ];

  var cmds = [];
  var commandHelp = this.commandHelp();
  if (commandHelp) cmds = [commandHelp];

  var options = [
    '  Options:'
    , ''
    , '' + this.optionHelp().replace(/^/gm, '    ')
    , ''
    , ''
  ];

  return usage
    .concat(cmds)
    .concat(desc)
    .concat(options)
    .join('\n');
};

/**
 * Output help information for this command
 *
 * @api public
 */

Command.prototype.outputHelp = function(cb) {
  if (!cb) {
    cb = function(passthru) {
      return passthru;
    }
  }
  process.stdout.write(cb(this.helpInformation()));
  this.emit('--help');
};

/**
 * Output help information and exit.
 *
 * @api public
 */

Command.prototype.help = function(cb) {
  this.outputHelp(cb);
  process.exit();
};

/**
 * Camel-case the given `flag`
 *
 * @param {String} flag
 * @return {String}
 * @api private
 */

function camelcase(flag) {
  return flag.split('-').reduce(function(str, word) {
    return str + word[0].toUpperCase() + word.slice(1);
  });
}

/**
 * Pad `str` to `width`.
 *
 * @param {String} str
 * @param {Number} width
 * @return {String}
 * @api private
 */

function pad(str, width) {
  var len = Math.max(0, width - str.length);
  return str + Array(len + 1).join(' ');
}

/**
 * Output help information if necessary
 *
 * @param {Command} command to output help for
 * @param {Array} array of options to search for -h or --help
 * @api private
 */

function outputHelpIfNecessary(cmd, options) {
  options = options || [];
  for (var i = 0; i < options.length; i++) {
    if (options[i] == '--help' || options[i] == '-h') {
      cmd.outputHelp();
      process.exit(0);
    }
  }
}

/**
 * Takes an argument an returns its human readable equivalent for help usage.
 *
 * @param {Object} arg
 * @return {String}
 * @api private
 */

function humanReadableArgName(arg) {
  var nameOutput = arg.name + (arg.variadic === true ? '...' : '');

  return arg.required
    ? '<' + nameOutput + '>'
    : '[' + nameOutput + ']'
}

// for versions before node v0.8 when there weren't `fs.existsSync`
function exists(file) {
  try {
    if (fs.statSync(file).isFile()) {
      return true;
    }
  } catch (e) {
    return false;
  }
}



/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(2)
  , lstat = fs.lstatSync;

exports.readlinkSync = function (p) {
  if (lstat(p).isSymbolicLink()) {
    return fs.readlinkSync(p);
  } else {
    return p;
  }
};




/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(3);
var Create = (function () {
    function Create(params) {
        new index_1.default(params.directoryPath, '', function () {
            new index_1.default(params.baseDirectoryPath, params.baseDirectoryName, function () { });
            new index_1.default(params.pagesDirectoryPath, params.pagesDirectoryName, function () { });
            new index_1.default(params.partsDirectoryPath, params.partsDirectoryName, function () { });
        });
    }
    return Create;
}());
exports.Create = Create;
exports.default = Create;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(3);
var Generate = (function () {
    function Generate(params) {
        switch (params.generateParams.type) {
            case 'base':
                new index_1.default(params.directoryPath, params.baseDirectoryName, function () { });
                break;
            case 'pages':
                new index_1.default(params.directoryPath, params.pagesDirectoryName, function () { });
                break;
            case 'parts':
                new index_1.default(params.directoryPath, params.partsDirectoryName, function () { });
        }
    }
    return Generate;
}());
exports.Generate = Generate;
exports.default = Generate;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var userArgs = process.argv.slice(2);
var commander_1 = __webpack_require__(5);
var commands_1 = __webpack_require__(4);
console.log(process.argv[1]);
var ApbCli = (function () {
    function ApbCli(userArgs, commands) {
        this.userArgs = userArgs;
        this.commands = commands;
        commands_1.default.fromData({
            userArgs: userArgs,
            commands: commands,
            program: new commander_1.default()
        });
    }
    ApbCli.fromData = function (data) {
        return new ApbCli(data.userArgs ? data.userArgs : null, data.commands ? data.commands : null);
    };
    return ApbCli;
}());
exports.ApbCli = ApbCli;
exports.default = ApbCli.fromData({
    userArgs: userArgs,
    commands: userArgs[0]
});


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __webpack_require__(1);
var fs = __webpack_require__(2);
var path = __webpack_require__(0);
var CreateCommonModel = (function () {
    function CreateCommonModel() {
    }
    CreateCommonModel.prototype.isDir = function (filepath) {
        return fs.existsSync(filepath) && fs.statSync(filepath).isDirectory();
    };
    CreateCommonModel.prototype.isFile = function (filepath) {
        try {
            fs.statSync(filepath);
            return true;
        }
        catch (err) {
            if (err.code === 'ENOENT')
                return false;
        }
    };
    CreateCommonModel.prototype.makeDirectory = function (directoryPath, callback) {
        fs.mkdir(directoryPath, app_1.default.DIRECTORY_PERMISSION, function (err) {
            if (err) {
                console.error(err);
            }
            else {
                callback();
            }
        });
    };
    CreateCommonModel.prototype.fetchScssFiles = function (directoryName, callback) {
        fs.readdir((app_1.default.PACKAGE_PATH + '/packages/lib/files/scss/' + directoryName), function (err, files) {
            if (err)
                throw err;
            var fileList = [];
            files.filter(function (file) {
                return /.*\.scss/.test(file);
            }).forEach(function (file) {
                fileList.push(file);
            });
            callback(fileList);
        });
    };
    CreateCommonModel.prototype.getScssFilesData = function (directoryPath, directoryName, callback) {
        fs.readdir((directoryPath + directoryName), function (err, files) {
            if (err)
                throw err;
            var fileDataList = [];
            files.forEach(function (file) {
                fileDataList.push(file);
            });
            callback(fileDataList);
        });
    };
    return CreateCommonModel;
}());
exports.CreateCommonModel = CreateCommonModel;
exports.default = CreateCommonModel;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var File = (function () {
    function File(name, extension, path, data) {
        this.name = name;
        this.extension = extension;
        this.path = path;
        this.data = data;
    }
    File.fromData = function (data) {
        return new File(data.name ? data.name : '', data.extension ? data.extension : '.scss', data.path ? data.path : './', data.data ? data.data : '');
    };
    return File;
}());
exports.File = File;
exports.default = File;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var path = __webpack_require__(0);
var Params = (function () {
    function Params(rootPath, directoryName, directoryPath, baseDirectoryName, baseDirectoryPath, pagesDirectoryName, pagesDirectoryPath, partsDirectoryName, partsDirectoryPath, generateParams) {
        this.rootPath = rootPath;
        this.directoryName = directoryName;
        this.directoryPath = directoryPath;
        this.baseDirectoryName = baseDirectoryName;
        this.baseDirectoryPath = baseDirectoryPath;
        this.pagesDirectoryName = pagesDirectoryName;
        this.pagesDirectoryPath = pagesDirectoryPath;
        this.partsDirectoryName = partsDirectoryName;
        this.partsDirectoryPath = partsDirectoryPath;
        this.generateParams = generateParams;
        this.init();
    }
    Params.fromData = function (data) {
        return new Params(data.path ? path.resolve(process.cwd(), data.path) : process.cwd() + '/', data.directoryName ? data.directoryName : 'scss', null, data.baseDirectoryName ? data.baseDirectoryName : 'base', data.baseDirectoryPath ? data.baseDirectoryPath : null, data.pagesDirectoryName ? data.pagesDirectoryName : 'pages', null, data.partsDirectoryName ? data.partsDirectoryName : 'parts', null, data.generateParams ? GenerateParams.fromData(data.generateParams) : null);
    };
    Params.prototype.init = function () {
        if (!this.directoryPath) {
            this.directoryPath = this.getDirectoryPath();
        }
        if (!this.baseDirectoryPath) {
            this.baseDirectoryPath = this.getBaseDirectoryPath();
        }
        if (!this.pagesDirectoryPath) {
            this.pagesDirectoryPath = this.getPagesDirectoryPath();
        }
        if (!this.partsDirectoryPath) {
            this.partsDirectoryPath = this.getPartsDirectoryPath();
        }
    };
    Params.prototype.getDirectoryPath = function () {
        if (this.generateParams) {
            return this.generateParams.getDirectoryPath();
        }
        else {
            return path.resolve(this.rootPath, this.directoryName);
        }
    };
    Params.prototype.getBaseDirectoryPath = function () {
        return path.resolve(this.directoryPath, this.baseDirectoryName);
    };
    Params.prototype.getPagesDirectoryPath = function () {
        return path.resolve(this.directoryPath, this.pagesDirectoryName);
    };
    Params.prototype.getPartsDirectoryPath = function () {
        return path.resolve(this.directoryPath, this.partsDirectoryName);
    };
    return Params;
}());
exports.Params = Params;
var GenerateParams = (function () {
    function GenerateParams(rootPath, directoryName, type) {
        this.rootPath = rootPath;
        this.directoryName = directoryName;
        this.type = type;
    }
    GenerateParams.fromData = function (data) {
        return new GenerateParams(data.path ? path.resolve(process.cwd(), data.path) : process.cwd() + '/', data.directoryName ? data.directoryName : data.type, data.type ? data.type : 'base');
    };
    GenerateParams.prototype.getDirectoryPath = function () {
        return path.resolve(this.rootPath, this.directoryName);
    };
    return GenerateParams;
}());
exports.GenerateParams = GenerateParams;


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ })
/******/ ]);
});