import express from "express"
const router = express.Router()
import { getStreamToken } from "../controllers/chatController.js"
import { protectRoute } from "../middlewares/protectRoute.js"

router.get("/token", protectRoute, getStreamToken)

export default router