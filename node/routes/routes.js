import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  dowloadBudgets,
  updateBlog,
  controllerfile,
} from "../controllers/BlogController.js";

import {
  createcsv,
  deletecsv,
  getAllcsv,
  updatecsv,
} from "../controllers/CsvController.js";

const router = express.Router();

router.post("/testfile", controllerfile);
router.get("/staff", getAllBlogs);
router.get("/staff/download", dowloadBudgets);
router.post("/staff/add", createBlog);
router.put("/staff/edit/:id", updateBlog);
router.delete("/staff/delete/:id", deleteBlog);
//router.get("/:id", getBlog); //Esto pasa cuando tipiemos la ruta "ID" y me traiga un Dato en particular

router.post("/csv/add", createcsv);
router.get("/csv" , getAllcsv);
router.put("/csv/edit/:id", updatecsv);
router.delete("/csv/delete/:id",deletecsv);

export default router;
