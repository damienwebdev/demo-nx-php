import {
    ProjectGraph,
    ProjectGraphBuilder,
    ProjectGraphProcessorContext,
    DependencyType,
} from '@nrwl/devkit';

import * as glob from 'glob';
import * as fs from 'fs';

export function processProjectGraph(
    graph: ProjectGraph,
    context: ProjectGraphProcessorContext
): ProjectGraph {
    const builder = new ProjectGraphBuilder(graph);

    const composerPackages = glob.sync('libs/*/composer.json').map((file) => JSON.parse(fs.readFileSync(file).toString()));

    for (const composerPackage of composerPackages) {
        if(!composerPackage.requires){
            //skip if we have no dependencies.
            continue;
        }

        for (const dep of Object.keys(composerPackage.requires)) {
            const packageFiles = glob.sync('libs/' + getProjectPath(composerPackage.name) + '**/**', { nodir: true}); //This is probably overly "watchy", we could trim out markdown, etc.
            
            
            for(const file of packageFiles){
                builder.addExplicitDependency(composerPackage.name, file, dep);
            }
        }
    }
    

    // builder.addExplicitDependency(projectName, join(graph.nodes[projectName].data.root, file), depProjectName);


    // We will see how this is used below.
    return builder.getUpdatedProjectGraph();
}

export const getProjectPath = (packageName: string): string => {
    return packageName.replace('demo-nx-php/', '');
}