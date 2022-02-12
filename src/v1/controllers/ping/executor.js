class Executor {
    async execute(req, res) {
        res.status(200).send("pong from ping");
    }
}

const executor = new Executor();
export default executor;