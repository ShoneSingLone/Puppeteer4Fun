const http = require("http");
const url = require("url");
const fs = require("fs");

var args = process.argv.slice(2);

const OPTIONS = (() => {
  function help() {
    console.log(args);
  }

  function curl() {
    let target = url.parse(args[1]);
    console.log("target", target);
    let req = http.get(target, (res) =>
      res.pipe(process.stdout.pipe(fs.createWriteStream("ls-result.html")))
    );
  }

  function input() {
    let requiredAge = 18;
    process.stdout.write("Please enter your age: ");
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (data) => {
      let age = parseInt(data, 10);
      if (isNaN(age)) {
        console.log("%s is not a valid number!", data);
      } else if (age < requiredAge) {
        console.log(
          `
                You must be at least %d to enger,
                come back in %d years`,
          requiredAge,
          requiredAge - age
        );
      } else {
        enterTheSecretDungeon();
      }
    });
    process.stdin.resume();

    function enterTheSecretDungeon(params) {
      console.log("Welcome to The Program :)");
      process.stdin.pause();
    }
  }

  return {
    "-h": help,
    curl: curl,
    in: input,
  };
})();

OPTIONS[args[0]] && OPTIONS[args[0]]();
