!function(t){function e(n){if(r[n])return r[n].exports;var i=r[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var r={};e.m=t,e.c=r,e.i=function(t){return t},e.d=function(t,r,n){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=10)}([function(t,e){t.exports=require("fs")},function(t,e){t.exports=require("path")},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(8),i=r(13),o=r(7),s=function(){function t(t,e,r){this.userArgs=t,this.commands=e,this.program=r,this.init()}return t.fromData=function(e){return new t(e.userArgs?e.userArgs:null,e.commands?e.commands:null,e.program?e.program:null)},t.prototype.init=function(){console.log(this.program.new),console.log(this.program.generate),console.log(this.program.peppers),console.log("----userArgs----"),console.log(this.userArgs),console.log("--------"),console.log("----commands----"),console.log(this.commands),console.log("--------"),this.program.new&&i.isArray(this.program.new)&&(this.program.new.length>0?this.setParams({directoryName:this.program.new[0]}):this.setParams({}),new n.default(this.params))},t.prototype.setParams=function(t){this.params=o.Params.fromData(t)},t}();e.Commands=s,e.default=s},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(9),i=r(5),o=function(){function t(){i.version(n.default.VERSION).option("-n, --new","Add new").option("-g, --generate","Add generate").option("-p, --peppers","Add peppers").option("-P, --pineapple","Add pineapple").option("-b, --bbq-sauce","Add bbq sauce").option("-c, --cheese [type]","Add the specified type of cheese [marble]","marble").parse(process.argv),Object.assign(this,i)}return t}();e.Program=o,e.default=o},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=(r(0),function(){function t(){}return t}());e.Model=n,e.default=n},function(t,e,r){function n(t,e){this.flags=t,this.required=~t.indexOf("<"),this.optional=~t.indexOf("["),this.bool=!~t.indexOf("-no-"),t=t.split(/[ ,|]+/),t.length>1&&!/^[[<]/.test(t[1])&&(this.short=t.shift()),this.long=t.shift(),this.description=e||""}function i(t){this.commands=[],this.options=[],this._execs={},this._allowUnknownOption=!1,this._args=[],this._name=t||""}function o(t){return t.split("-").reduce(function(t,e){return t+e[0].toUpperCase()+e.slice(1)})}function s(t,e){var r=Math.max(0,e-t.length);return t+Array(r+1).join(" ")}function a(t,e){e=e||[];for(var r=0;r<e.length;r++)"--help"!=e[r]&&"-h"!=e[r]||(t.outputHelp(),process.exit(0))}function c(t){var e=t.name+(!0===t.variadic?"...":"");return t.required?"<"+e+">":"["+e+"]"}function u(t){try{if(g.statSync(t).isFile())return!0}catch(t){return!1}}var p=r(12).EventEmitter,h=r(11).spawn,l=r(6).readlinkSync,f=r(1),m=f.dirname,d=f.basename,g=r(0);e=t.exports=new i,e.Command=i,e.Option=n,n.prototype.name=function(){return this.long.replace("--","").replace("no-","")},n.prototype.is=function(t){return t==this.short||t==this.long},i.prototype.__proto__=p.prototype,i.prototype.command=function(t,e,r){r=r||{};var n=t.split(/ +/),o=new i(n.shift());return e&&(o.description(e),this.executables=!0,this._execs[o._name]=!0,r.isDefault&&(this.defaultExecutable=o._name)),o._noHelp=!!r.noHelp,this.commands.push(o),o.parseExpectedArgs(n),o.parent=this,e?this:o},i.prototype.arguments=function(t){return this.parseExpectedArgs(t.split(/ +/))},i.prototype.addImplicitHelpCommand=function(){this.command("help [cmd]","display help for [cmd]")},i.prototype.parseExpectedArgs=function(t){if(t.length){var e=this;return t.forEach(function(t){var r={required:!1,name:"",variadic:!1};switch(t[0]){case"<":r.required=!0,r.name=t.slice(1,-1);break;case"[":r.name=t.slice(1,-1)}r.name.length>3&&"..."===r.name.slice(-3)&&(r.variadic=!0,r.name=r.name.slice(0,-3)),r.name&&e._args.push(r)}),this}},i.prototype.action=function(t){var e=this,r=function(r,n){r=r||[],n=n||[];var i=e.parseOptions(n);a(e,i.unknown),i.unknown.length>0&&e.unknownOption(i.unknown[0]),i.args.length&&(r=i.args.concat(r)),e._args.forEach(function(t,n){t.required&&null==r[n]?e.missingArgument(t.name):t.variadic&&(n!==e._args.length-1&&e.variadicArgNotLast(t.name),r[n]=r.splice(n))}),e._args.length?r[e._args.length]=e:r.push(e),t.apply(e,r)},n=this.parent||this,i=n===this?"*":this._name;return n.on(i,r),this._alias&&n.on(this._alias,r),this},i.prototype.option=function(t,e,r,i){var s=this,a=new n(t,e),c=a.name(),u=o(c);if("function"!=typeof r)if(r instanceof RegExp){var p=r;r=function(t,e){var r=p.exec(t);return r?r[0]:e}}else i=r,r=null;return(0==a.bool||a.optional||a.required)&&(0==a.bool&&(i=!0),void 0!==i&&(s[u]=i)),this.options.push(a),this.on(c,function(t){null!==t&&r&&(t=r(t,void 0===s[u]?i:s[u])),"boolean"==typeof s[u]||void 0===s[u]?s[u]=null==t?!!a.bool&&(i||!0):t:null!==t&&(s[u]=t)}),this},i.prototype.allowUnknownOption=function(t){return this._allowUnknownOption=0===arguments.length||t,this},i.prototype.parse=function(t){this.executables&&this.addImplicitHelpCommand(),this.rawArgs=t,this._name=this._name||d(t[1],".js"),this.executables&&t.length<3&&!this.defaultExecutable&&t.push("--help");var e=this.parseOptions(this.normalize(t.slice(2))),r=this.args=e.args,n=this.parseArgs(this.args,e.unknown),i=n.args[0];return this._execs[i]&&"function"!=typeof this._execs[i]?this.executeSubCommand(t,r,e.unknown):this.defaultExecutable?(r.unshift(i=this.defaultExecutable),this.executeSubCommand(t,r,e.unknown)):n},i.prototype.executeSubCommand=function(t,e,r){e=e.concat(r),e.length||this.help(),"help"==e[0]&&1==e.length&&this.help(),"help"==e[0]&&(e[0]=e[1],e[1]="--help");var n,i=t[1],o=d(i,".js")+"-"+e[0],s=l(i);s!==i&&"/"!==s.charAt(0)&&(s=f.join(m(i),s)),n=m(s);var a=f.join(n,o),c=!1;u(a+".js")?(o=a+".js",c=!0):u(a)&&(o=a),e=e.slice(1);var p;"win32"!==process.platform?c?(e.unshift(a),e=(process.execArgv||[]).concat(e),p=h("node",e,{stdio:"inherit",customFds:[0,1,2]})):p=h(o,e,{stdio:"inherit",customFds:[0,1,2]}):(e.unshift(a),p=h(process.execPath,e,{stdio:"inherit"})),p.on("close",process.exit.bind(process)),p.on("error",function(t){"ENOENT"==t.code?console.error("\n  %s(1) does not exist, try --help\n",o):"EACCES"==t.code&&console.error("\n  %s(1) not executable. try chmod or run with root\n",o),process.exit(1)}),this.runningCommand=p},i.prototype.normalize=function(t){for(var e,r,n,i=[],o=0,s=t.length;o<s;++o){if(e=t[o],o>0&&(r=this.optionFor(t[o-1])),"--"===e){i=i.concat(t.slice(o));break}r&&r.required?i.push(e):e.length>1&&"-"==e[0]&&"-"!=e[1]?e.slice(1).split("").forEach(function(t){i.push("-"+t)}):/^--/.test(e)&&~(n=e.indexOf("="))?i.push(e.slice(0,n),e.slice(n+1)):i.push(e)}return i},i.prototype.parseArgs=function(t,e){var r;return t.length?(r=t[0],this.listeners(r).length?this.emit(t.shift(),t,e):this.emit("*",t)):(a(this,e),e.length>0&&this.unknownOption(e[0])),this},i.prototype.optionFor=function(t){for(var e=0,r=this.options.length;e<r;++e)if(this.options[e].is(t))return this.options[e]},i.prototype.parseOptions=function(t){for(var e,r,n,i=[],o=t.length,s=[],a=0;a<o;++a)if("--"!=(n=t[a]))if(e)i.push(n);else if(r=this.optionFor(n))if(r.required){if(null==(n=t[++a]))return this.optionMissingArgument(r);this.emit(r.name(),n)}else r.optional?(n=t[a+1],null==n||"-"==n[0]&&"-"!=n?n=null:++a,this.emit(r.name(),n)):this.emit(r.name());else n.length>1&&"-"==n[0]?(s.push(n),t[a+1]&&"-"!=t[a+1][0]&&s.push(t[++a])):i.push(n);else e=!0;return{args:i,unknown:s}},i.prototype.opts=function(){for(var t={},e=this.options.length,r=0;r<e;r++){var n=o(this.options[r].name());t[n]="version"===n?this._version:this[n]}return t},i.prototype.missingArgument=function(t){console.error(),console.error("  error: missing required argument `%s'",t),console.error(),process.exit(1)},i.prototype.optionMissingArgument=function(t,e){console.error(),e?console.error("  error: option `%s' argument missing, got `%s'",t.flags,e):console.error("  error: option `%s' argument missing",t.flags),console.error(),process.exit(1)},i.prototype.unknownOption=function(t){this._allowUnknownOption||(console.error(),console.error("  error: unknown option `%s'",t),console.error(),process.exit(1))},i.prototype.variadicArgNotLast=function(t){console.error(),console.error("  error: variadic arguments must be last `%s'",t),console.error(),process.exit(1)},i.prototype.version=function(t,e){return 0==arguments.length?this._version:(this._version=t,e=e||"-V, --version",this.option(e,"output the version number"),this.on("version",function(){process.stdout.write(t+"\n"),process.exit(0)}),this)},i.prototype.description=function(t){return 0===arguments.length?this._description:(this._description=t,this)},i.prototype.alias=function(t){return 0==arguments.length?this._alias:(this._alias=t,this)},i.prototype.usage=function(t){var e=this._args.map(function(t){return c(t)}),r="[options]"+(this.commands.length?" [command]":"")+(this._args.length?" "+e.join(" "):"");return 0==arguments.length?this._usage||r:(this._usage=t,this)},i.prototype.name=function(){return this._name},i.prototype.largestOptionLength=function(){return this.options.reduce(function(t,e){return Math.max(t,e.flags.length)},0)},i.prototype.optionHelp=function(){var t=this.largestOptionLength();return[s("-h, --help",t)+"  output usage information"].concat(this.options.map(function(e){return s(e.flags,t)+"  "+e.description})).join("\n")},i.prototype.commandHelp=function(){if(!this.commands.length)return"";var t=this.commands.filter(function(t){return!t._noHelp}).map(function(t){var e=t._args.map(function(t){return c(t)}).join(" ");return[t._name+(t._alias?"|"+t._alias:"")+(t.options.length?" [options]":"")+" "+e,t.description()]}),e=t.reduce(function(t,e){return Math.max(t,e[0].length)},0);return["","  Commands:","",t.map(function(t){var r=t[1]?"  "+t[1]:"";return s(t[0],e)+r}).join("\n").replace(/^/gm,"    "),""].join("\n")},i.prototype.helpInformation=function(){var t=[];this._description&&(t=["  "+this._description,""]);var e=this._name;this._alias&&(e=e+"|"+this._alias);var r=["","  Usage: "+e+" "+this.usage(),""],n=[],i=this.commandHelp();i&&(n=[i]);var o=["  Options:","",""+this.optionHelp().replace(/^/gm,"    "),"",""];return r.concat(n).concat(t).concat(o).join("\n")},i.prototype.outputHelp=function(t){t||(t=function(t){return t}),process.stdout.write(t(this.helpInformation())),this.emit("--help")},i.prototype.help=function(t){this.outputHelp(t),process.exit()}},function(t,e,r){var n=r(0),i=n.lstatSync;e.readlinkSync=function(t){return i(t).isSymbolicLink()?n.readlinkSync(t):t}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=(r(1),function(){function t(t,e,r,n,i,o,s,a,c){this.rootPath=t,this.directoryName=e,this.directoryPath=r,this.baseDirectoryName=n,this.baseDirectoryPath=i,this.pagesDirectoryName=o,this.pagesDirectoryPath=s,this.partsDirectoryName=a,this.partsDirectoryPath=c,this.directoryPath=this.rootPath+this.directoryName,this.baseDirectoryPath=this.directoryPath+"/"+this.baseDirectoryName,this.pagesDirectoryPath=this.directoryPath+"/"+this.pagesDirectoryName,this.partsDirectoryPath=this.directoryPath+"/"+this.partsDirectoryName}return t.fromData=function(e){return new t(e.path?e.path:"./",e.directoryName?e.directoryName:"scss",null,e.baseDirectoryName?e.baseDirectoryName:"base",null,e.pagesDirectoryName?e.pagesDirectoryName:"pages",null,e.partsDirectoryName?e.partsDirectoryName:"parts",null)},t}());e.Params=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r(0),i=function(){function t(t){console.log("new",t),n.mkdir(t.directoryPath,"757",function(){var e="//test",r=t.directoryPath+"/_common_inc.scss",i=t.directoryPath+"/_parts.scss",o=t.directoryPath+"/style.scss";n.mkdir(t.baseDirectoryPath,"757",function(){var r=t.baseDirectoryPath+"/_base.scss",i=t.baseDirectoryPath+"/_mixin.scss",o=t.baseDirectoryPath+"/_reset.scss",s=t.baseDirectoryPath+"/_setting.scss";n.writeFile(r,e,function(t){if(t)throw t}),n.writeFile(i,e,function(t){if(t)throw t}),n.writeFile(o,e,function(t){if(t)throw t}),n.writeFile(s,e,function(t){if(t)throw t})}),n.mkdir(t.pagesDirectoryPath,"757",function(){var r=t.pagesDirectoryPath+"/_pages_inc.scss",i=t.pagesDirectoryPath+"/_index.scss";n.writeFile(r,e,function(t){if(t)throw t}),n.writeFile(i,e,function(t){if(t)throw t})}),n.mkdir(t.partsDirectoryPath,"757",function(){n.writeFile(t.partsDirectoryPath+"/_animation.scss",e,function(t){if(t)throw t}),n.writeFile(t.partsDirectoryPath+"/_base.scss",e,function(t){if(t)throw t}),n.writeFile(t.partsDirectoryPath+"/_bg.scss",e,function(t){if(t)throw t}),n.writeFile(t.partsDirectoryPath+"/_box.scss",e,function(t){if(t)throw t}),n.writeFile(t.partsDirectoryPath+"/_button.scss",e,function(t){if(t)throw t}),n.writeFile(t.partsDirectoryPath+"/_footer.scss",e,function(t){if(t)throw t}),n.writeFile(t.partsDirectoryPath+"/_header.scss",e,function(t){if(t)throw t}),n.writeFile(t.partsDirectoryPath+"/_icon.scss",e,function(t){if(t)throw t}),n.writeFile(t.partsDirectoryPath+"/_list.scss",e,function(t){if(t)throw t}),n.writeFile(t.partsDirectoryPath+"/_media_queries.scss",e,function(t){if(t)throw t}),n.writeFile(t.partsDirectoryPath+"/_modal.scss",e,function(t){if(t)throw t}),n.writeFile(t.partsDirectoryPath+"/_navigation_menu.scss",e,function(t){if(t)throw t}),n.writeFile(t.partsDirectoryPath+"/_paragraph.scss",e,function(t){if(t)throw t}),n.writeFile(t.partsDirectoryPath+"/_separate.scss",e,function(t){if(t)throw t}),n.writeFile(t.partsDirectoryPath+"/_table.scss",e,function(t){if(t)throw t}),n.writeFile(t.partsDirectoryPath+"/_title.scss",e,function(t){if(t)throw t})}),n.writeFile(r,e,function(t){if(t)throw t}),n.writeFile(i,e,function(t){if(t)throw t}),n.writeFile(o,e,function(t){if(t)throw t})})}return t}();e.New=i,e.default=i},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={VERSION:"0.0.1"};e.default=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=process.argv.slice(2),i=r(3),o=r(4),s=r(2),a=function(){function t(t,e){this.userArgs=t,this.commands=e,this._model=new o.default,s.default.fromData({userArgs:t,commands:e,program:new i.default})}return t.fromData=function(e){return new t(e.userArgs?e.userArgs:null,e.commands?e.commands:null)},t}();e.ApbCli=a,e.default=a.fromData({userArgs:n,commands:n[0]})},function(t,e){t.exports=require("child_process")},function(t,e){t.exports=require("events")},function(t,e){t.exports=require("util")}]);