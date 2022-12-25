import Router from 'express';
import Post from './Post.js';
import PostController from "./PostController.js";

const router = new Router();

router.post('/posts', PostController.create)
/*

 try{
        const {author, title, content, picture} = req.body
        let post = await Post.create({author, title, content, picture })
        res.status(200).json(post)
    }catch (e) {
        res.status(500).json(e)
    }

*/
router.get('/posts', PostController.getAll)
router.get('/posts/:id', PostController.getOne)
router.put('/posts', PostController.update)
router.delete('/posts/:id', PostController.delete)

export default router;