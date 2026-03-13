import mongoose from "mongoose";
import User from "../models/user.Model.js";
import Paper from "../models/paper.model.js";
import { v2 as cloudinary } from "cloudinary";
import { sendEmail } from "../../utils/sendEmail.js";
export const getPaper = async (req, res) => {
  try {
    // query params se page & limit lo
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    // total active papers count
    const total = await Paper.countDocuments({
      isActive: true,
      isDeleted: false,
    });

    // paginated result
    const papers = await Paper.find({ isActive: true, isDeleted: false })
      .select("title subject year price")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // latest first

    if (papers.length === 0) {
      return res.status(200).json({
        message: "No papers found",
        totalPapers: total,
        page,
        totalPages: Math.ceil(total / limit),
        papers: [],
      });
    }

    return res.status(200).json({
      success: true,
      message: "All Papers",
      totalPapers: total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      papers,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const getSinglePaper = async (req, res) => {
  try {
    const paperId = req.params.paperId;

    // VERY IMPORTANT FIX
    if (!mongoose.Types.ObjectId.isValid(paperId)) {
      return res.status(400).json({ message: "Invalid paper ID" });
    }

    const paper = await Paper.findOne({
      _id: paperId,
      isActive: true,
      isDeleted: false,
    }).select("title subject year price isPaid");

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    let isPurchased = false;

    if (req.user) {
      const user = await User.findById(req.user.userId);

      isPurchased = user.purchasedPapers.some(
        (id) => id.toString() === paperId,
      );
    }

    return res.status(200).json({
      ...paper._doc,
      isPurchased,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const downloadQuestionPdf = async (req, res) => {
  try {
    const { paperId } = req.params;

    const paper = await Paper.findOne({
      _id: paperId,
      isActive: true,
      isDeleted: false,
    });

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    if (!paper.questionPdf) {
      return res.status(404).json({ message: "PDF not available" });
    }

    // Direct redirect to secure_url
    return res.redirect(paper.questionPdf);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};
export const downloadAnswer = async (req, res) => {
  try {
    const { paperId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(paperId)) {
      return res.status(400).json({ message: "Invalid paper ID" });
    }

    const paper = await Paper.findOne({
      _id: paperId,
      isActive: true,
      isDeleted: false,
    });

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    // FREE PAPER → direct redirect
    if (!paper.isPaid) {
      return res.redirect(paper.answerPdf);
    }

    const user = await User.findById(req.user.userId);

    const hasPurchased = user.purchasedPapers.some(
      (id) => id.toString() === paperId,
    );

    if (!hasPurchased) {
      return res.status(403).json({
        message: "You have not purchased this paper",
      });
    }

    if (!paper.answerPublicId) {
      return res.status(404).json({ message: "PDF not available" });
    }

    return res.redirect(paper.answerPdf);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const generateUpiLink = async (req, res) => {
  try {
    const paperId = req.params.paperId;
    const paper = await Paper.findById(paperId);

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    if (!paper.isPaid) {
      return res.status(400).json({ message: "This paper is free" });
    }

    const upiId = "9779781674@fam";
    const name = "kuldeep kumar";
    // const upiId = "rishabhrawat1800@okhdfcbank";
    // const name = "rishabh Rawat";
    //upi link created
    const upiLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      name,
    )}&am=${paper.price}&cu=INR&tn=${encodeURIComponent(
      `Purchase ${paper.title}`,
    )}`;

    return res.status(200).json({
      success: true,
      upiLink,
      amount: paper.price,
      paperTitle: paper.title,
    });
  } catch (error) {
    console.log("UPI Link Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const submitUpiTransaction = async (req, res) => {
  try {
    const { transactionId } = req.body;
    const paperId = req.params.paperId;

    if (!transactionId) {
      return res.status(400).json({ message: "Transaction ID required" });
    }

    if (!paperId) {
      return res.status(404).json({ message: "Paper not found" });
    }

    const user = await User.findById(req.user.userId);
    const paper = await Paper.findById(paperId); // FIXED

    if (!paper) {
      return res.status(404).json({ message: "Paper not found in database" });
    }

    // Check duplicate in pendingPayments
    const alreadyExists = user.pendingPayments.find(
      (p) => p.transactionId === transactionId,
    );

    if (alreadyExists) {
      return res.status(400).json({ message: "Transaction already submitted" });
    }

    // Save to pendingPayments
    user.pendingPayments.push({
      paper: paper._id,
      transactionId,
      status: "pending",
    });

    await user.save();

    // Email to admin
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: "Payment Approval Request – Pending Transaction",
      text: `Hello Admin,

A new payment request has been received that requires your approval.

--- Payment Details ---
User Name: ${user.name}
User Email: ${user.email}
Paper Title: ${paper.title}
Paper ID: ${paper._id}
Transaction ID: ${transactionId}

The user has completed the payment and is requesting approval to unlock the paper.

Please review and approve the transaction in the admin panel.

Thank you,
StudentMgt System`,
    });

    return res.status(200).json({
      message: "Transaction submitted. Waiting for admin approval.",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const getPYQStructure = async (req, res) => {
  try {
    const { course } = req.query;

    const papers = await Paper.aggregate([
      {
        $match: {
          course: course,
          isActive: true,
          isDeleted: false,
        },
      },

      {
        $group: {
          _id: {
            semester: "$semester",
            subject: "$subject",
          },
          papers: {
            $push: {
              _id: "$_id",
              title: "$title",
              year: "$year",
              price: "$price",
            },
          },
        },
      },

      {
        $group: {
          _id: "$_id.semester",
          subjects: {
            $push: {
              subject: "$_id.subject",
              papers: "$papers",
            },
          },
        },
      },

      {
        $sort: { _id: 1 },
      },
    ]);

    res.status(200).json({
      success: true,
      course,
      data: papers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
};
