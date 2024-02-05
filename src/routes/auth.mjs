import  express  from "express";

const authRouter = express.Router();

authRouter.get('/signup', (req, res) => {
   res.render('login/signUp')
})
authRouter.post('/signup', (req, res) => {
   
})
authRouter.get('/login', (req, res) => {
   
})
authRouter.post('/login', (req, res) => {
   
})
export default authRouter;