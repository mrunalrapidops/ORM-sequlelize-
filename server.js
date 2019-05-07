const express = require('express');
const Sequelize = require('sequelize');
const app = express();
const port = 8001;
const conneciton = new Sequelize ('sampledb','root','root',{dialect:'mysql'});
//schema model
/* const USer = conneciton.define('User',{
    uuid:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue :Sequelize.UUIDV4
    },
    name: Sequelize.STRING,
    bio: Sequelize.TEXT
}); */
const USer = conneciton.define('User',{
    name: Sequelize.STRING,
    pass: Sequelize.STRING
});
const post = conneciton.define('posts',{
    title:Sequelize.STRING,
    message:Sequelize.STRING
})
USer.hasOne(post);


//how to make sure cionnection is done and every thing is fine
conneciton.authenticate({
})
.then (()=>{console.log('connection done')})
.catch(err=>{console.log('connection not done')})

conneciton.sync({
    logging: console.log,
    force:true
})
.then (()=>{console.log('connection done');
    app.listen(port,()=>{
        console.log("Server running on: " + port);
    })
})
.catch(err=>{console.log('connection not done')})