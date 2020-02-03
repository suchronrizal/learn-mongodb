const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/myfirst_mongodb", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("connect");
  })
  .catch((err) => console.error("error connection", err));

const mongooseSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 50 },
  category: {
    type: String,
    enum: ["web", "frontend", "backend"],
    required: true
  },
  author: String,
  tags: [String],
  date: { type: Date, default: new Date() },
  isPublish: Boolean,
  price: {
    type: Number,
    required: function() {
      return this.isPublish;
    },
    min: 10,
    max: 200
  }
});

//save data
const Courses = mongoose.model("courses", mongooseSchema);
async function createCourses() {
  const course = new Courses({
    name: "mei",
    category: "web",
    author: "Suchron Rizal Muhammad",
    tags: ["multimedia", "html", "css3", "javascript"],
    isPublish: true,
    price: 50000
  });
  try {
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    console.log(ex.message);
  }
}
createCourses();
