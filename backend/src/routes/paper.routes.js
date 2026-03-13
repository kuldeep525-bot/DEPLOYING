import express from "express";

import { authenticate } from "../middleware/jwt.middleware.js";
import { delBlocked } from "../middleware/block.middleware.js";

import {
  downloadAnswer,
  downloadQuestionPdf,
  getPaper,
  getSinglePaper,
  generateUpiLink,
  submitUpiTransaction,
  getPYQStructure,
} from "../controllers/paper.controller.js";

const router = express.Router();

router.get("/getAllPaper", authenticate, delBlocked, getPaper);
router.get("/getPaper/:paperId", authenticate, delBlocked, getSinglePaper);
router.get("/dwnlQues/:paperId", authenticate, delBlocked, downloadQuestionPdf);
router.get("/dwnlAns/:paperId", authenticate, delBlocked, downloadAnswer);
router.get("/generateUpi/:paperId", authenticate, delBlocked, generateUpiLink);
router.post(
  "/submitUpi/:paperId",
  authenticate,
  delBlocked,
  submitUpiTransaction,
);

router.get("/pyq", authenticate, delBlocked, getPYQStructure);

export default router;
