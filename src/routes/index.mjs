import express from "express";
import { Sequelize } from 'sequelize';
import exphbs from 'express-handlebars';
import pool from "../database.mjs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)
const indexRouter = express.Router();

indexRouter.get('/',async (req, res) => {
   res.render('home');
   
});

indexRouter.get('/css/main',async (req, res) => {
   try {
      res.sendFile(path.join(__dirname, "..", "public", "css", "styles.css"))
   } catch (error) {
      console.log(error)
   }
   
});

indexRouter.get('/about', (req, res) => {
   res.render('about', { title: 'Exe' });
});

export default indexRouter;