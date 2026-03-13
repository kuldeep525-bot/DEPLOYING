import mongoose from "mongoose";

const paperSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    course: {
      type: String,
      required: true,
    },

    semester: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    questionPdf: {
      type: String,
      required: true,
    },
    answerPdf: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    questionPublicId: String,
    answerPublicId: String,
    price: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// AUTOMATIC isPaid SETTER
//yeh same chiz hum controller me bhi kar sakhte hai
paperSchema.pre("save", function () {
  this.isPaid = this.price > 0;
});

const Paper = new mongoose.model("Paper", paperSchema);
export default Paper;
