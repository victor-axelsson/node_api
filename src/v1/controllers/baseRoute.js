export default class BaseRoute {
    constructor(childDir) {
        this.HTTP = {
            GET: 'get',
            PUT: 'put',
            POST: 'post',
            DELETE: 'delete'
        }
        this.childDir = childDir;
    }

    get executor() {
        const executor = require(`${this.childDir}/executor.js`);
        return executor.default || executor;
    }
}