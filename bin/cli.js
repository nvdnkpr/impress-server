#!/usr/bin/env node
var path = require("path"),
	Server = require("./../index"),
	argv = require("optimist")
	.usage([
		"USAGE: $0 [-p <port>] [-d <directory>]\n"
	])
	.options("port", {
		alias: "p",
		default: 8080,
		description: "Port at which presentation will be served"
	}).options("directory", {
		alias: "d",
		default: ".",
		description: "Directory to serve presentation from. Defaults to current directory"
	}).options("version", {
		alias: "v",
		description: "Returns the version of impress-server you are running"
	}).options("help", {
		alias: "h",
		description: "Shows this help message"
	}).argv;

var dir = argv._[0] || ".";
if(argv.directory) {
	dir = argv.directory;
}
dir = path.resolve(dir);

console.dir(Server);

var server = new Server(dir, argv.port);
server.start();

if (argv.help){
	require('optimist').showHelp(console.log);
	process.exit(0);
}

if (argv.version){
	var fs = require("fs"),
		path = require("path"),
		info = JSON.parse(fs.readFileSync(path.join(__dirname, "../package.json"), "utf8"));
	console.log("impress-server: " + info.version);
	process.exit(0);
}

