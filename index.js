const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("connected to mongo-exercises"))
  .catch((err) => console.log(err));

const courseSchema = new mongoose.Schema({
  name: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  author: String,
  isPublished: Boolean,
  price: Number,
  // __v: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses1() {
  const courses = await Course
    .find({isPublished: true, tags: 'backend'})
    .sort({ name: 1 })
    .select({ name: 1, author: 1 });

  console.log(courses);
}


async function getCourses2(){
    const courses = await Course
        .find({isPublished: true})
        .sort({price: -1})
        .select({name: 1, author: 1, price: 1})
    console.log(courses)
}

getCourses2();
