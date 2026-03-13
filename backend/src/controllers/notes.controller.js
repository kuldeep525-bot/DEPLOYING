import Notes from "../models/notes.model.js";
import User from "../models/user.Model.js";
import axios from "axios";

export const createNotes = async (req, res) => {
  try {
    const { title, content } = req.body;
    //validation
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content required" });
    }
    //notes create
    const CreateNote = await Notes.create({
      title,
      content,
      UserNote: req.user.userId, // userId middleware se aaya
    });

    res.status(201).json({
      success: true,
      message: "Note created successfully",
      CreateNote,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Notes not created", error });
  }
};

export const aiSummary = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = await Notes.findOne({
      _id: noteId,
      UserNote: req.user.userId,
      isDeleted: false,
    });
    if (!note) {
      return res.status(404).json({ message: "Notes Not found" });
    }

    if (!note.content) {
      return res.status(400).json({ error: "content is required" });
    }

    console.log("summary make in 2 minutes");

    await new Promise((resolve) => setTimeout(resolve, 10000));

    const aiResponse = await axios.post("http://localhost:11434/api/generate", {
      model: "gemma3:1b",
      prompt: `Summarize this note clearly and concisely:${note.content}`,
      stream: false,
    });

    note.summary = aiResponse.data.response;
    await note.save();

    return res
      .status(200)
      .json({ message: "summary created", summary: aiResponse.data.response });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server  error" });
  }
};

export const GetNOTES = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const note = await Notes.findOne({
      _id: noteId,
      UserNote: req.user.userId,
      isDeleted: false,
      isArchived: false,
    }).populate("UserNote", "name email");
    if (!note) {
      return res.status(404).json({ message: "Notes Not found" });
    }

    res.status(200).json({ message: "Notes found successfully", note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const GetAllNotes = async (req, res) => {
  try {
    const notes = await Notes.find({
      UserNote: req.user.userId,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      notes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const smartNotes = async (req, res) => {
  try {
    const {
      search,
      archived,
      favourite,
      deleted,
      startDate,
      endDate,
      sort,
      page = 1,
      limit = 10,
    } = req.query;

    // Pagination setup
    const currentPage = Math.max(Number(page), 1);
    const perPage = Math.min(Number(limit), 20);
    const skip = (currentPage - 1) * perPage;

    const filter = {};

    // Logged-in user
    filter.UserNote = req.user.userId;

    // Trash Support
    if (deleted === "true") {
      filter.isDeleted = true;
    } else {
      filter.isDeleted = false;
    }

    // Search
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    // Archived filter
    if (archived === "true") filter.isArchived = true;
    if (archived === "false") filter.isArchived = false;

    // Favourite filter
    if (favourite === "true") filter.isFavourite = true;
    if (favourite === "false") filter.isFavourite = false;

    // Date filter
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Sorting
    let sortOption = { createdAt: -1 };
    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    } else if (sort === "edited") {
      sortOption = { updatedAt: -1 };
    }

    const [notes, total] = await Promise.all([
      Notes.find(filter).sort(sortOption).skip(skip).limit(perPage).lean(),
      Notes.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      currentPage,
      totalPages: Math.ceil(total / perPage),
      totalResults: total,
      notes,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server error" });
  }
};
export const dashboard = async (req, res) => {
  try {
    const userId = req.user.userId;

    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const [
      totalNotes,
      archiveNotes,
      deleteNotes,
      favouriteNotes,
      thisMonthNotes,
      monthlyStatsRaw,
    ] = await Promise.all([
      Notes.countDocuments({
        UserNote: userId,
        isDeleted: false,
      }),

      Notes.countDocuments({
        UserNote: userId,
        isArchived: true,
        isDeleted: false,
      }),

      Notes.countDocuments({
        UserNote: userId,
        isDeleted: true,
      }),

      Notes.countDocuments({
        UserNote: userId,
        isFavourite: true,
        isDeleted: false,
      }),

      Notes.countDocuments({
        UserNote: userId,
        isDeleted: false,
        createdAt: {
          $gte: monthStart,
          $lte: monthEnd,
        },
      }),

      // Monthly Graph Aggregation (last 6 months)
      Notes.aggregate([
        {
          $match: {
            UserNote: userId,
            isDeleted: false,
          },
        },
        {
          $group: {
            _id: { $month: "$createdAt" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]),
    ]);

    // Convert month number → month name
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const monthlyStats = monthlyStatsRaw.map((item) => ({
      month: months[item._id - 1],
      count: item.count,
    }));

    return res.status(200).json({
      success: true,
      data: {
        totalNotes,
        archiveNotes,
        deleteNotes,
        favouriteNotes,
        thisMonthNotes,
        monthlyStats, // 🔥 graph data
      },
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "server error" });
  }
};

export const DeleteNotes = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Notes.findOneAndUpdate(
      {
        _id: noteId,
        UserNote: req.user.userId,
        isDeleted: false,
      },
      { $set: { isDeleted: true } },
      { new: true },
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.status(200).json({
      message: "Note moved to trash",
      note,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const hardDelete = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Notes.findOneAndDelete({
      _id: noteId,
      UserNote: req.user.userId,
      isDeleted: true, // only trash items can be hard deleted
    });

    if (!note) {
      return res.status(404).json({
        message: "Note not found in trash",
      });
    }

    return res.status(200).json({
      message: "Note permanently deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const RestoreNotes = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Notes.findOneAndUpdate(
      {
        _id: noteId,
        UserNote: req.user.userId,
        isDeleted: true,
      },
      { $set: { isDeleted: false } },
      { new: true },
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found in trash",
      });
    }

    return res.status(200).json({
      message: "Note restored successfully",
      note,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const UpdateNotes = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { title, content } = req.body;

    //NOTE EXISTS OR NOT
    const note = await Notes.findOneAndUpdate(
      {
        _id: noteId,
        UserNote: req.user.userId,
        isArchived: false,
        isDeleted: false,
      },
      { $set: { title, content } },
      { new: true },
    ).populate("UserNote", "name email");

    if (!note) {
      return res.status(400).json({ message: "Note Not Found" });
    }

    if (note.isArchived) {
      return res.status(400).json({
        message: "Archived note cannot be updated",
      });
    }

    //success response

    res.status(200).json({ message: "Note updated Successfully", data: note });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};
export const Archive = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Notes.findOneAndUpdate(
      {
        _id: noteId,
        UserNote: req.user.userId,
        isDeleted: false,
      },
      { $set: { isArchived: true } },
      { new: true },
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.status(200).json({
      message: "Note archived successfully",
      note,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const UnArchive = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Notes.findOneAndUpdate(
      {
        _id: noteId,
        UserNote: req.user.userId,
        isDeleted: false,
      },
      { $set: { isArchived: false } },
      { new: true },
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.status(200).json({
      message: "Note unarchived successfully",
      note,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const Favourite = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Notes.findOneAndUpdate(
      {
        _id: noteId,
        UserNote: req.user.userId,
        isDeleted: false,
      },
      { $set: { isFavourite: true } },
      { new: true },
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.status(200).json({
      message: "Note marked as favourite",
      note,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const UnFavourite = async (req, res) => {
  try {
    const { noteId } = req.params;

    const note = await Notes.findOneAndUpdate(
      {
        _id: noteId,
        UserNote: req.user.userId,
        isDeleted: false,
      },
      { $set: { isFavourite: false } },
      { new: true },
    );

    if (!note) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    return res.status(200).json({
      message: "Note removed from favourite",
      note,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
