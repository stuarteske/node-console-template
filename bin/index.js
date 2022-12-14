#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
//const terminalOverwrite = require('terminal-overwrite');
const axios = require("axios");

// Little example of animations
// const frames = ['-', '\\', '|', '/'];
// let i = 0;
// setInterval(() => {
//     const frame = frames[i = ++i % frames.length];
//     terminalOverwrite(`${frame} Pesty ${frame}`);
// }, 80);

var username = "Guest";

const options = yargs
    .usage("Usage: -n <name>")
    .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: false })
    .option("s", { alias: "search", describe: "Search term", type: "string" })
    .argv;


if (options.name)
    username = options.name;

var greeting = chalk.whiteBright.bgWhite.bold(`Hello, `);
greeting += chalk.whiteBright.bgWhite.bold.underline(`${username}`);
greeting += chalk.whiteBright.bgWhite.bold(`!\n\n`);

const boxenOptions = {
    // title: "magical",        // Not in current version
    // titleAlignment: "left",  // Not in current version
    padding: 1,
    margin: 0,
    backgroundColor: "#373737", // cyanBright cyan
    // Border Style
    borderStyle: "round",       // round double
    borderColor: "green",
    dimBorder: false,
    //topLeft: '+',             // Not in current version
    //topRight: '+',            // Not in current version
    //bottomLeft: '+',          // Not in current version
    //bottomRight: '+',         // Not in current version
    //top: '-',                 // Not in current version
    //bottom: '-',              // Not in current version
    //left: '|',                // Not in current version
    //right: '|'                // Not in current version
    // End Border Style

};

// Get the joke
// Example
// $ curl -H "Accept: application/json" https://icanhazdadjoke.com/
// {
//     "id": "R7UfaahVfFd",
//     "joke": "My dog used to chase people on a bike a lot. It got so bad I had to take his bike away.",
//     "status": 200
// }
let jokeTxt ="Here's a random joke for you: \n"
if (options.search) {
    jokeTxt = chalk.bgGreen.bold(`Searching`);
    jokeTxt += ` for jokes about `;
    jokeTxt += chalk.bgCyan(`"${options.search}"`);
    jokeTxt += `...\n`;
}

// API https://icanhazdadjoke.com/api
// The url depends on searching or not
const url = options.search ? `https://icanhazdadjoke.com/search?term=${escape(options.search)}&limit=3` : "https://icanhazdadjoke.com/";
axios.get(
    url,
    {
    headers: {
        'Accept': "application/json",
        'User-Agent': 'Postman'
    }
}).then(res => {
    let jokesTxt = '';

    if (options.search) {
        // if searching for jokes, loop over the results
        res.data.results.forEach( j => {
            jokesTxt += "\n" + j.joke;
        });
        if (res.data.results.length === 0) {
            jokesTxt = "no jokes found :'(";
        }
    } else {
        jokesTxt = res.data.joke;
    }

    msgBox = boxen( greeting + jokeTxt + jokesTxt, boxenOptions );
    console.log(msgBox);
});





