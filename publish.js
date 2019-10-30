const path = require("path");
const join = path.join;
const resolve = path.resolve;

const fs = require("fs");
const existsSync = fs.existsSync;

const fse = require("fs-extra");
const execSync = require('child_process').execSync;

console.log("Searching parts...");

const jsdos = resolve(join("..", "js-dos"));
const jsdospages = resolve(join("..", "js-dos-pages"));
const createdosbox = resolve(join("..", "create-dosbox"));

const existsCheck = (repo, path) => {
    if (!existsSync(path)) {
        console.error(repo + " repo '" + path + "' does not exists");
        process.exit(-1);
    }

    console.log(repo + ": " + path)
}

existsCheck("jsdos", jsdos);
existsCheck("jsdospages", jsdospages);
existsCheck("createdosbox", createdosbox);

const jsdos_package = join(jsdos, "package.json");
const createdosbox_package = join(createdosbox, "package.json");
const jsdos_json = require(jsdos_package);
const createdosbox_json = require(join(createdosbox, "package.json"));

const jsdos_version = jsdos_json.version;
const createdosbox_version = createdosbox_json.version;

console.log("--");
console.log("jsdos version: ", jsdos_json.version);
console.log("createdosbox version: ", createdosbox_json.version);

const newversion = process.argv[2];

if (!newversion) {
    console.error("New version not set");
    console.error("Dry run");
} else {
    console.log("--");
    console.log("Updating versions");

    jsdos_json.version = newversion;
    createdosbox_json.version = newversion;

    fs.writeFileSync(jsdos_package, JSON.stringify(jsdos_json, null, 2));
    fs.writeFileSync(createdosbox_package, JSON.stringify(createdosbox_json, null, 2));
}

console.log("Updating readme");
const readme = join(jsdospages, "README.md");
fse.copySync(readme, join(jsdos, "README.md"));
fse.copySync(readme, join(createdosbox, "README.md"));

console.log("--")
console.log("Publishing js-dos")
process.chdir(jsdos);

if (jsdos_version == newversion || !newversion) {
    console.log("Version not changed, skipping...");
} else {
    console.log("Updating current api");
    execSync("gulp clean");
    execSync("gulp");

    console.log("Commiting");
    execSync("git commit -am \"publish: " + newversion + "\"");

    console.log("Pushing");
    execSync("git push origin 6.22");

    console.log("Publishing");
    execSync("npm publish");
}

console.log("--")
console.log("Publishing create-dosbox");
process.chdir(createdosbox);

if (createdosbox_version == newversion || !newversion) {
    console.log("Version not changed, skipping...");
} else {
    console.log("Updating js-dos base");
    execSync("npm i --save js-dos@" + newversion)

    console.log("Commiting");
    execSync("git commit -am \"publish: " + newversion + "\"");

    console.log("Pushing");
    execSync("git push origin master");

    console.log("Publishing");
    execSync("npm publish");
}

console.log("--")
console.log("Publishing js-dos-pages");
process.chdir(join(jsdos, "dist"));

const zip = join(jsdos, newversion + ".zip");
fse.removeSync(zip); 
execSync("zip " + zip + " -r ./*");

const current = join(jsdospages, "6.22", "current");
fse.removeSync(current); 
execSync("unzip " + zip + " -d " + current);

process.chdir(jsdospages);
console.log("Commiting");
execSync("git commit -am \"publish: " + newversion + "\"");

console.log("Pushing");
execSync("git push origin gh-pages");

console.log("Do not forget to upload '" + zip + "' to github!");