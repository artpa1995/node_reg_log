import express from 'express';
import mongoose from 'mongoose';
import router from './router.js';
import fileUpload from 'express-fileupload';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import bodyParser from 'body-parser';


const __dirname = dirname(fileURLToPath(import.meta.url));
const DB_URL = `mongodb+srv://test_mongo:111qqqAAA@cluster0.v6ylw73.mongodb.net/?retryWrites=true&w=majority`
const app = express();
const PORT = 5000;

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});

app.get('/contact/', function(req, res) {
	res.sendFile(__dirname + '/public/contact.html');
});

app.get('/test/:num/', function(req, res) {
	let num = req.params.num;
	
	if (num >= 1 && num <= 9) {
		res.send('your num: ' + num);
	} else {
		res.status(404).send('not found');
	}
});
// app.use(function(req, res) {
// 	res.status(404).send('not found 404');
// });

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public/'))
app.use(express.static('static'))
app.use(express.json());
app.use(fileUpload({}))

async function startApp() {
    try {
      await  mongoose.connect(DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log("server started in port: " + PORT)) 
    } catch (e) {
        console.log(e);
    }
}

startApp()

export default app;