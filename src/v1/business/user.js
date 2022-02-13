import DB from '../dal/dbBuilder';

class UserLogic {
    async create(data) {
        console.log("Creating a user...", DB.DAL, data);
        try {
            return await DB.DAL.User.create(data);
        } catch (e) {
            console.log(e);
            return null;
        }
    }
}

const userLogic = new UserLogic();
export default userLogic; 