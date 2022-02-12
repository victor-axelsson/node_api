class Executor {
    async execute(req, res) {
        res.status(200).send("Register user");
    }
}

const executor = new Executor();
export default executor;