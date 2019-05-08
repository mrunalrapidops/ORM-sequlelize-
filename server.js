const express = require('express');
const Sequelize = require('sequelize');
const app = express();
const port = 8001;
const conneciton = new Sequelize ('sampledb','root','root',{dialect:'mysql'});
const Data = require('./data'); 
/* const Post = require('./models/Post')(conneciton);
const User = require('./models/User')(conneciton); */
//models in same file
//console.log(Data);
const User = conneciton.define('User',{ 
    name: {
        type:Sequelize.STRING,
        allowNull:false,
        defaultValue:"name"
    },
    pass:{
      type:Sequelize.STRING,
      validate:{min:4}  
    } 
},{
    hooks:{
        beforeValidate:(User,Options)=>{
            User.pass='1234';
        },
        afterValidate:(User,Options)=>{
            User.pass='0000';
        }
    }
}
);
const post = conneciton.define('posts',{
    title:Sequelize.STRING,
    message:Sequelize.STRING
})
//User.hasOne(post);// 1:1 Relartionship
User.hasMany(post)// 1:M Relartionship
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
.then(()=>{
    User.bulkCreate(Data)
    .then(()=>{console.log("All data add successfully into database")})
    .catch(err=>{console.log("Data is not successfully into database" + err)})
})
.then(()=>{
    /* post.create({
        title:"World is moving to AI",
        message:"Energy Secretary Rick Perry: It is time for America to boost its dominance in artificial intelligence",
        UserId:1
    }) */
    post.bulkCreate([{
            title:"AI",
            message:"In computer science, artificial intelligence, sometimes called machine intelligence, is intelligence demonstrated by machines, in contrast to the natural intelligence displayed by humans and animals.",
            UserId:1
        },
        {
            title:"ML",
            message:"Machine learning is the scientific study of algorithms It is seen as a subset of artificial intelligence.",
            UserId:3
        }
    ])

})
.catch(err=>{console.log('connection not done')})