import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  controllerfile
} from "../controllers/BlogController.js";

const router = express.Router();

router.post("/testfile", controllerfile);
router.get("/staff", getAllBlogs);
router.post("/staff/add", createBlog);
router.put("/staff/edit/:id", updateBlog);
router.delete("/staff/delete/:id", deleteBlog);  
//router.get("/:id", getBlog); //Esto pasa cuando tipiemos la ruta "ID" y me traiga un Dato en particular

export default router;
