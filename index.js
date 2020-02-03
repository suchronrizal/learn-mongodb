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
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: new Date() },
  isPublish: Boolean
});

//save data
const Courses = mongoose.model("courses", mongooseSchema);
async function createCourses() {
  const course = new Courses({
    name: "Nur Cholifah",
    author: "choifah",
    tags: ["multimedia", "html", "css3", "javascript"],
    isPublish: true
  });
  const result = await course.save();
  console.log(result);
}

//pagination & filtering
async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;
  // /api/courses?pageNumber=3&pageSize=10
  const find = await Courses.find({ name: "Rizal" })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .select({ name: 1 });
  console.log(find);
}

//updat data
async function updateCourses(id) {
  const course = await Courses.findById(id);
  if (!course) return;

  course.isPublish = true;
  course.author = "Another author";

  const result = await course.save();
  console.log(result);
}

//update a document
async function updateDocument(id) {
  const course = await Courses.findByIdAndUpdate(
    id,
    {
      $set: {
        name: "Lutfian Hasan",
        isPublish: true
      }
    },
    { new: true }
  );
  console.log(course);
}

//remove data
async function removeData(id) {
  //const result = await Courses.deleteOne({_id:id})
  //const result = await Courses.deleteMany(id);
  const course = await Courses.findByIdAndRemove(id);
  console.log(course);
}
removeData("5e37a8ce09b0c7032cd0f0fa");
