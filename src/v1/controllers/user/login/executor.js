class Executor {
    async execute(req, res) {
        res.status(200).send("Logion user");
    }
}

const executor = new Executor();
export default executor;