const express 		= require('express');
const bodyParser 	= require('body-parser');
const bcrypt 		= require('bcrypt-nodejs');
const cors 			= require('cors');
const mongoose 		= require('mongoose');

const User 			= require('./models/user');
const Login 		= require('./models/login');

const register		= require('./controllers/register');
const signin		= require('./controllers/signin');
const profile		= require('./controllers/profile');
const image			= require('./controllers/image');

const app = express();

mongoose.connect('mongodb://localhost:27017/smart-brain',  { useNewUrlParser: true });
app.use(bodyParser.json());
app.use(cors());

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Database Connected`); 
});

app.get("/", (req, res)=>{
	res.redirect('/signin');
});

app.post('/signin', (req, res) => { signin.handleSignin(req, res, Login, User, bcrypt)  })
app.post('/register', (req, res) => { register.handleRegister(req, res, Login, User, bcrypt) }) 
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, User) })
app.put('/image', (req, res) => { image.handleImage(req, res, User) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})
		

app.listen(3000, () => {
	console.log("App is running on port 3000");
});