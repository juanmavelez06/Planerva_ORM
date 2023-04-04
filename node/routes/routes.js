import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
} from "../controllers/BlogController.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlog); //Esto pasa cuando tipiemos la ruta "ID" y me traiga un Dato en particular
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
