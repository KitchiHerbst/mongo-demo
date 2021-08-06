const mongoose = require("mongoose");


mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("connected to mongo-exercises"))
  .catch((err) => console.log(err));

const courseSchema = new mongoose.Schema({
  _id: {type: String, required: true},
  name: {type: String, required: true},
  tags: [String],
  date: { type: Date, default: Date.now },
  author: {type: String, required: true},
  isPublished: Boolean,
  price: Number, 
  // __v: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse(name, tags, date, author, isPublished, price){
  const course = new Course({
    name: name,
    tags: tags,
    date: date,
    author: author,
    isPublished: isPublished,
    price: price
  })

  try{
    const result = await course.save()
    console.log(result)
  }
  catch(ex){
    console.log(ex)
  }
}



async function deleteCourse(id) {
  await Course.deleteOne({_id: id})

}



async function updateCourse(id) {
  const course = await Course.findById(id)
  if (!course) return;

  course.set({isPublished: true, author:'Mosh'})

  const result = await course.save()

  console.log(result)
}

// updateCourse('5a68fdf95db93f6477053ddd')

// async function getCourses1() {
//   const courses = await Course.find({ isPublished: true, tags: "backend" })
//     .sort({ name: 1 })
//     .select({ name: 1, author: 1 });

//   console.log(courses);
// }

// async function getCourses2() {
//   const courses = await Course.find({ isPublished: true })
//     .or([{ tags: "frontend" }, { tags: "backend" }])
//     .sort({ price: -1 })
//     .select("name author price");
//   console.log(courses);
// }

// async function getCourses3() {
//   const courses = await Course.find().or([
//     { price: { $gte: 15 } },
//     { name: /.*by.*/ },
//   ]);
//   console.log(courses)
// }

// getCourses3();

createCourse()

// deleteCourse('5a68fdf95db93f6477053ddd')