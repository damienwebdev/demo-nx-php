"use strict";
exports.__esModule = true;
exports.getProjectPath = exports.processProjectGraph = void 0;
var devkit_1 = require("@nrwl/devkit");
var glob = require("glob");
var fs = require("fs");
function processProjectGraph(graph, context) {
    var builder = new devkit_1.ProjectGraphBuilder(graph);
    var composerPackages = glob.sync('libs/*/composer.json').map(function (file) { return JSON.parse(fs.readFileSync(file).toString()); });
    for (var _i = 0, composerPackages_1 = composerPackages; _i < composerPackages_1.length; _i++) {
        var composerPackage = composerPackages_1[_i];
        if (!composerPackage.requires) {
            //skip if we have no dependencies.
            continue;
        }
        for (var _a = 0, _b = Object.keys(composerPackage.requires); _a < _b.length; _a++) {
            var dep = _b[_a];
            var packageFiles = glob.sync('libs/' + (0, exports.getProjectPath)(composerPackage.name) + '**/**', { nodir: true }); //This is probably overly "watchy", we could trim out markdown, etc.
            for (var _c = 0, packageFiles_1 = packageFiles; _c < packageFiles_1.length; _c++) {
                var file = packageFiles_1[_c];
                builder.addExplicitDependency(composerPackage.name, file, dep);
            }
        }
    }
    // builder.addExplicitDependency(projectName, join(graph.nodes[projectName].data.root, file), depProjectName);
    // We will see how this is used below.
    return builder.getUpdatedProjectGraph();
}
exports.processProjectGraph = processProjectGraph;
var getProjectPath = function (packageName) {
    return packageName.replace('demo-nx-php/', '');
};
exports.getProjectPath = getProjectPath;
