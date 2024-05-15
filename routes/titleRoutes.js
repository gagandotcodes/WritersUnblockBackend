import { Router } from "express";
import titleController from "../controllers/titleController.js";


const router = Router();


// generate keywords
router.route("/generate").post(titleController.generateTitles);



export default router;
