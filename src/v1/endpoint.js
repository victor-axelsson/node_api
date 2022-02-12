import klawSync from 'klaw-sync';
import path from 'path';

export default class Endpoint {

    load() {
        // Find all path files
        const basename = path.join(path.resolve(__dirname), `./controllers`);
        const paths = klawSync(basename, { noDir: true })
            .map((fileStats) => fileStats.path)
            .filter((filePath) => filePath.indexOf(`route.`) !== -1);

        // Check for missing routes
        const routes = [];
        paths.forEach((filePath) => {
            const route = require(filePath).default;

            if (!route) {
                throw new Error(`Route cannot be falsy: ${filePath}`);
            }

            routes.push(route);
        });

        return routes;
    }
}