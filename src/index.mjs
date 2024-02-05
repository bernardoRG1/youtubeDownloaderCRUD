import  {fileURLToPath}  from 'url';
import  {dirname}  from "path";
import path from 'path';
import methodOverride from 'method-override';
import express from "express";
import  Sequelize  from 'sequelize';
import  jwt  from 'jsonwebtoken';
import bodyParser from 'body-parser';
import  morgan  from 'morgan';
import  {engine}  from 'express-handlebars';
import authRouter from './routes/auth.mjs';
import linksRouter from './routes/links.mjs';
import indexRouter from './routes/index.mjs'
import helpers from "./lib/handlebars.mjs";



// systems consts

const port = process.env.PORT || 1235;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

app.engine('handlebars', engine({helpers}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use((req,res, next) => {
   next();
})
// settings 



// middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(methodOverride('_method'));
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');
   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
   next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static(path.join(__dirname, '.', 'index', 'public')));
app.use(express.static(path.join(__dirname, 'public', 'css')));

 // routes
app.use('/', indexRouter);
app.use('/links', linksRouter);
app.use('/auth', authRouter);




// Starting server
app.listen(port, () => {
   console.log(`Servidor en http://localhost:${port}`);
})
