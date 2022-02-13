import UserLogic from '../../../business/user';

class Executor {
    async execute(req, res) {
        const result = await UserLogic.create({
            firstName: "some",
            lastName: "Some last name",
            email: "something@mmm.se",
            countryId: 1,
            languageId: 1
        })

        res.status(200).send(result);
    }
}

const executor = new Executor();
export default executor;