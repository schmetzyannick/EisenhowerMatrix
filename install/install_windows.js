/*eslint-disable */
const Service = require("node-windows").Service;
// Create a new service object
let svc = new Service({
    name: "Eisenhowermatrix",
    description: "",
    script: __dirname + "\\..\\dist\\backend\\index.js",
    workingDirectory: __dirname + "\\.." + "\\dist"
});
svc.on("install", function () {
    svc.start();
});
svc.on("alreadyinstalled", function () {
    svc.restart();
});
svc.install();
