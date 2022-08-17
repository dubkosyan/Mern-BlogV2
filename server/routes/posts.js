import { Router } from 'express'
import { register, login, getMe } from '../controllers/auth.js'
import { checkAuth } from '../utils/checkAuth.js'
import {createPost} from "../controllers/posts.js";
const router = new Router()

// Create post
// http://localhost:3002/api/posts
router.post('/post',checkAuth, createPost)


export default router