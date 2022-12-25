import express from 'express';
import mongoose from 'mongoose';
import router from './router.js';
import fileUpload from 'express-fileupload';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import authRouter from './authRouter.js';
import 'dotenv/config'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import router2 from './server/router/router.js';
import errorMiddleware from './server/middlewares/error-middleware.js';


const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;
/*
email for mongo db
pahomol497@safe-cart.com
*/
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public/'));
app.use(express.static('static'));
app.use(express.json());
app.use(fileUpload({}));
app.use('/api', router);
app.use('/api2', router2);
app.use('/auth', authRouter);
app.use(cookieParser());
app.use(cors());


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

app.use(errorMiddleware);

async function startApp() {
    try {
      await  mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
        app.listen(PORT, () => console.log("server started in port: " + PORT)) 
    } catch (e) {
        console.log(e);
    }
}

startApp()





// http.createServer(async (request, 
// 	response) => { 
// 	let text;
// 	let status;
// 	let path = 'root' + request.url;
	
// 	try {
// 		if ((await fs.promises.stat(path)).isDirectory()) {
// 			path += '/index.html';
// 		}
		
// 		status = 200;
// 		text = await fs.promises.readFile(path, 'utf8');
// 	} catch (err) {
// 		status = 404;
// 		text = 'page not found';
// 	}
	
// 	response.writeHead(status, {'Content-Type': 
// 		getMimeType(path)}); // изменение 
// 	response.write(text);
// 	response.end();
// }).listen(3000);

// function getMimeType(path) {
// 	let mimes = {
// 		html: 'text/html',
// 		jpeg: 'image/jpeg',
// 		jpg:  'image/jpeg',
// 		png:  'image/png',
// 		svg:  'image/svg+xml',
// 		json: 'application/json',
// 		js:   'text/javascript',
// 		css:  'text/css',
// 		ico:  'image/x-icon',
// 	};
	
// 	let exts = Object.keys(mimes);
// 	let extReg = new RegExp('\\.(' + exts.join('|') 
// 		+ ')$'); 
	
// 	let ext = path.match(extReg)[1];
	
// 	if (ext) {
// 		return mimes[ext];
// 	} else {
// 		return 'text/plain';
// 	}
// }




// let b = require('./test');
// console.log(b);






// const http = require('http');
// const fs = require('fs');
// const path = require('path');


// const server = http.createServer((req, res) => {

// //     // res.writeHead(200, {
// //     //     'Content-Type' : 'text/html', // plaini poxaren html 
// //     // })
// //     // console.log(fs, path);

// //     // if(req.url === '/') {
// //     //     fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
// //     //         if(err) {
// //     //             throw err;
// //     //         }
// //     //          res.writeHead(200, {
// //     //             'Content-Type' : 'text/html', // plaini poxaren html 
// //     //         })
// //     //         res.end(data)
// //     //     })
// //     //}

//     let filePath = path.join(__dirname, 'public' , req.url === '/' ? 'index.html' : req.url);
   
//     const ext = path.extname(filePath);

//     let contentType = 'text/html';
//     switch (ext) {
//         case '.css':
//             contentType = 'text/css'; 
//             break;
//         case '.js':
//             contentType = 'text/javascript'; 
//             break;
//         default : 
//         contentType = 'text/html';
//     }
//     if(!ext){
//         filePath += '.html';
//     }

//     fs.readFile(filePath, (err, content) => {
//         if(err) {
//             fs.readFile(path.join(__dirname, 'public', '404.html'), (err, data) => {
//                 if(err) {
//                     res.writeHead(500)
//                     res.end('Error')
//                 }else{
//                     res.writeHead(200, {
//                         'Content-Type' : 'text/html'
//                     })
//                     res.end(data)
//                 }
//             })
//         }else{
//             res.writeHead(200, {
//                 'Content-Type' : contentType
//             })
//             res.end(content)
//         }
//     }) 
// })
// const PORT = process.env.PORT || 3000

// server.listen(PORT, () => {
//   console.log(`Server has been started on ${PORT}...`)
// })