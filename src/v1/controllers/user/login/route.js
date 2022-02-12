import BaseRoute from '../../baseRoute';

class Route extends BaseRoute {
    constructor() {
        super(__dirname);
    }

    get httpMethod() {
        return this.HTTP.GET;
    }

    get path() {
        return `/v1/user/login`;
    }

    get middleware() {
        return [];
    }
}

const route = new Route();
export default route;