function User(conneciton){
    const UserSchema = conneciton.define('User',{
    name: Sequelize.STRING,
    pass: Sequelize.STRING
    });
}
    
module.exports = User;