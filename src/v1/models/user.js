var user = {}; 

user.exists = async function(username){
    return new Promise((resolve, reject) => {
        resolve(false); 
    }); 
}

user.create = async function someF(usermodel){
    return new Promise((resolve, reject) => {
        resolve(usermodel); 
    }); 
}

user.getByUsername = async function(username){
    return new Promise((resolve, reject) => {
        resolve({
            username: username
        }); 
    }); 
}

module.exports = user; 