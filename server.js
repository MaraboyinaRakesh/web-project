const express=require('express')

const app=express()
app.use(express.json())

const port=process.env.PORT || 8080

const users=[
    {
        "id":1,
        "name": "Kasper Christiansen",
        "gender":"Male",
        "image" :"https://randomuser.me/api/portraits/men/26.jpg"
    },
    {
        "id":2,
        "name": "Marshall Carlson",
        "gender":"Male",
        "image" :"https://randomuser.me/api/portraits/men/68.jpg"
    },
    {
        "id":3,
        "name": "Edwards Jack",
        "gender":"Male",
        "image" :"https://randomuser.me/api/portraits/men/64.jpg"
    },
    {
        "id":4,
        "name": "Ramona Lewis",
        "gender":"female",
        "image" :"https://randomuser.me/api/portraits/women/56.jpg"
    },
    {
        "id":5,
        "name": "Robert Hamann",
        "gender":"Male",
        "image" :"https://randomuser.me/api/portraits/men/88.jpg"
    },
    {
        "id":6,
        "name": "Natalie Thompson",
        "gender":"female",
        "image" :"https://randomuser.me/api/portraits/women/83.jpg"
    }
]

//api server
app.get("/api/users",function(req,res){
    res.status(200).json(users);
})

function getUserById(uid){
    for(var i=0;i<users.length;i++){
        if(uid==users[i].id){
            return i;
        }
    }
    return-1;
}

//get user by id
app.get("/api/users/:id",function(req,res){
    var uid=req.params.id;
    var userid=getUserById(uid);

    if(userid==-1){
        res.status(404).json({"message":"user not found"})
    }
    res.status(200).json(users[userid])
})

// random user

app.get("/api/randomuser",function(req,res){
    var n=users.length;
    const randomid=Math.floor(Math.random() * n);
    res.status(200).json(users[randomid])
})
// post  new users

let newuserid=users.length+1;
app.post("/api/users",function(req,res){
    let user=req.body;
    user.id=newuserid;
    newuserid++;
    users.push(user);
    res.status(200).json({"message":"added successfully"});
})

//update //put
app.put("/api/users/:id",function(req,res){
    var userid=getUserById(req.params.id);
    if(userid==-1)
        return res.json({"message":"user not found"})
    if(req.body.name)
        users[userid].name=req.body.name;
    if(req.body.gender)
     users[userid].gender = req.body.gender;


    if(req.body.image)
     users[userid].image = req.body.image;


   return res.status(200).json({"message" : "user details updated", "user" : users[userid]})

})
app.delete("/api/users/:id", function(req, res){
 var userid = getUserById(req.params.id);
 if(userid == -1)
   return res.json({"message" : "user not found"})


 users.splice(userid, 1);


 res.status(200).json({"message" : "user deleted successfully"})


})

app.use(express.static("frontend"))
app.listen(port,function(){
    console.log("my app is running at http://localhost:"+port);
})