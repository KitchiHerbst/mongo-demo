const mongoose = require('mongoose')



mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('connected to mongodb'))
    .catch((err) => console.log('cant connect', err))

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: {type: Date, default: Date.now},
    isPublished: Boolean
})

const Course = mongoose.model('Course', courseSchema)


async function createCourse(name, author, tags, isPublished, date) {
    const course = new Course({
        name: name,
        author: author,
        tags: tags,
        isPublished: isPublished,
        date: date
    })
    
    const result = await course.save()
}

async function getCourses() {
    // $eq (equal to)
    // $ne (not equal to)
    // $gt (greater than)
    // $gte (greater than or equal to)
    // $lt
    // $lte
    // $in (included in an array)
    // $nin (not included in an array)
    // .find({price: { $gte: 10 } }) finding objects with a price of 10 or higher
    // .find({price: { $in: [5,10,20] } }) finding objects with prices of 5 10 and 20


    const courses = await Course
        .find({author: 'Mosh'})
        .limit(3)
        .sort({name: 1})
        .select({name: 1, tags: 1})
    console.log(courses)
}

// createCourse('React', 'Mosh', ['react','frontend'], true)
// createCourse('Node', 'Mosh', ['node','backend'], true)
// createCourse('express', 'Mosh', ['node','backend'], true)

getCourses()