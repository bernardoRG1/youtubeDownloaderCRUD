import  express  from "express";
import pool from "../database.mjs";
import e from "express";
import axios from "axios";
import { getVideo, getVideInfo } from "../api/youtube2.mjs";


const linksRouter = express.Router();

linksRouter.get('/add', (req, res) => {
   res.render('links/add');
})

   linksRouter.get('/',async (req, res) => {
      const links = await pool.query('SELECT * from links;');


   
      for (const link of links) {
         const data = await getVideInfo(link.url)
         link.img = data.iframeUrl
      }

      res.render('links/links',{links})
   })

linksRouter.post('/add', async (req, res) => {
   const {title, url , description} = req.body;
   const newLink = { title,url,description };
   // const data = await getVideoData(url);
   

   try {
      const insertLinkResult = await pool.query('INSERT INTO links (title, url, description) VALUES (?, ?, ?)', [title, url, description], (error, results) => {
         if (error) {
            console.log(error);
         } else {
            console.log('Se guardó el link');
            res.redirect('/links/')
         }
      });

      const linkId = insertLinkResult.insertId;
      console.log('se guardo con el id: ', linkId)


      await pool.query('INSERRT INTO links (link_id, response_json) values (?,?):', [linkId, JSON.stringify(data)], (error, result) => {
         if(error) {
            console.log(error)
         } else {
            console.log('Se guardó la respuesta asociada al link');
            res.redirect('/links/');
         }
      })
   } catch (error) {
      console.log(error)
   }
})

linksRouter.get('/delete/:id', async (req, res) => {
   const id = req.params.id;
   try {
      await pool.query(`DELETE FROM links where id = ?`, [id], (error, results) => {
         if(error) {
            console.log(error)
         } else {
            console.log('Se guardó el link');
            res.redirect('/links/')
         }
      })
      console.log('se elimino con exito');
   } catch (error) {
      console.log(error)
   }
})

linksRouter.get('/update/:id', async (req, res) => {
   const id = req.params.id;
   let oldData = 0;
   await pool.query('select * from links where id = ?', [id], (error, results) => {
      if(error) {
         console.log(error)
      } else {
         console.log(oldData)
         res.render('links/update', {id});

      }
   });
})


linksRouter.post('/update/add/:id', (req, res) => {
   const id = req.params.id;
   const {title, url, description} = req.body;

   try {
      pool.query(`UPDATE links SET title = ?, url = ?, description = ? where id = ?;`, [title,url, description, id], (error, result) => {
         if(error) {
            console.log(error);
         } else {
            console.log('se actualizo', result)
            res.redirect('/links/')
         }
      })

      res.render()
   } catch (error) {
      console.log(error)
   }

})
linksRouter.get('/search', async (req, res) => {
   const { videoUrl } = req.query;
  const data = await getVideInfo(videoUrl)


   res.render('links/search', { videoUrl, title : data.title, time : data. duration, iframe : data.iframeUrl });
});

linksRouter.get('/search/download', async (req, res) => {

   const { videoUrl, dataType } = req.query;
   console.log(dataType)

   res.render("links/descargar", {url : videoUrl, data : dataType})
});



linksRouter.post('/search/download', async (req, res) => {

   const { videoUrl, dataType } = req.body;
   await getVideo(videoUrl, dataType)
   console.log(dataType)

   res.render("links/descargar", {url : videoUrl, data : dataType})
});



export default linksRouter;