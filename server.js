const express = require('express')
const bodyParser = require("body-parser")
const path = require("path")
const app = express()
const PORT = process.env.PORT||3000 

//CRUD 
//CREATE 
//READ 
//UPDATE 
//DELETE

function customMiddleware(req, res, next){
        console.log("**************")
        console.log("INSIDE CUSTOM MIDDLEWARE")
        console.log("**************")
        next()
}

app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(customMiddleware)


const poundInventory = [{name:"runa", age:4, breed:"bull"}, 
                        {name:"hunter", age:2, breed:"staffordshire"},
                        {name:"skadi", age:1, breed:"pit"},
                        {name:"odie", age:7, breed:"husky"}]

function checkIfUserIsLoggedIn(req, res, next){
    console.log("YOU ARE INSIDE THE MIDDLE WARE")
   next()
    // if(req.body.user==="ryan"){
    //     next()
    // }else{
    //     res.send("you need to be looggged in")
    // }
}    

function doSomeAnalytics(req, res, next){
    console.log("-------------------------------------")
    console.log("YOU ARE INSIDE THE MIDDLE WARE")
    console.log("-------------------------------------")
  
    next()
}   

app.get('/', checkIfUserIsLoggedIn, doSomeAnalytics, function (req, res) {
    // console.log("----------------")
    // console.log(__dirname)
    // console.log("----------------")
    console.log("THIS IS THE TERMINAL FUNCTION")
     res.sendFile(path.join(__dirname, "frontend", "index.html"))
 })

app.post("/api/:dogname", (req, res)=>{
    console.log("INSIDE API POST REQUEST")
    console.log(req.body)
    poundInventory.push(req.body)
    res.json(poundInventory)
})

app.get('/api/:dogname', function (req, res) { 
    let matchedDog
    for (let i = 0; i < poundInventory.length; i++) {
        if(req.params.dogname === poundInventory[i].name){
            matchedDog = poundInventory[i]
            res.send(matchedDog)
        }
      }

    //res.send("uyou shouldnt be here")
})

app.get('/firstpage', function (req, res) {
    res.sendFile(path.join(__dirname, "frontend", "index.html"))
  })

// app.delete()
// app.put()

app.get('/contact', function (req, res) {
    res.send('Contact Route')
})

app.get('/bulldog', function (req, res) {
    res.send('BULLDOG ROUTe')
  })  

app.listen(PORT, ()=>{
    console.log("listening on port " + PORT)
})