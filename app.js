// 
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
var session = require('express-session')

const passport = require('passport')
const LocalStrategy = require('passport-local')


var bodyParser = require('body-parser')
const Schema = mongoose.Schema;
const authmodel=require('./bds/db')



mongoose.connect('mongodb://localhost:27017/pass');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


var sessionconfig={secret: 'secrete',
resave: false,
saveUninitialized: true,
cookie: { 
    httpOnly:true,
    expires:Date.now()+1000*60*60*24*7,
    maxAge:1000*60*60*24*7
 }
}
app.use(session(sessionconfig))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(authmodel.authenticate()));
passport.serializeUser(authmodel.serializeUser())
passport.deserializeUser(authmodel.deserializeUser())


app.get('/fake',(req,res)=>{
const usernew= authmodel({ username:'Ab'});
const reguser=authmodel.register(usernew,'Ab');
res.json(reguser)
})

  app.get('/', (req, res) => {
    res.send('home page sucess')
  })

app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register',async(req,res)=>{
var name=req.body.uname;
var pass=req.body.pass;
var saveuser= new authmodel(
    {
        username:name,
        password:pass
    }
)

// instance of the user and the paasword of the user with register build in method
const registeruser= await authmodel.register(saveuser,pass) 
console.log(registeruser)
res.redirect('/')
})



app.get('/login',(req,res)=>{
res.render('login')
})

// make sure that the user is authenticate passport.authenticate is build in with passport
app.post('/login',passport.authenticate('local', {failureRedirect:'/login'}), (req,res)=>{

    // if success redirect to / route(ie home page)

    res.redirect('/')
   
   
    })


    // note : passport give a helper method which allow to identify a 
    // user after login and want go to any page to check
    // if they are authenticated . that method is call 'isAthenticated' it is present in req like req.isAuthenticated.
    // e.g if the user wants to edit or create or update we must check if the are authenticated so anybody after logged in 
    // can make such operations

    // it also has a req.user object which allow to exactly identifify a user who log in with all their credencials
    // except the password
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})