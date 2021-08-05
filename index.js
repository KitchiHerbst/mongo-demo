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
    const courses = await Course
        .find({author: 'Mosh'})
        .limit(1)
        .sort({name: 1})
    console.log(courses)
}

createCourse('React', 'Mosh', ['react','frontend'], true)
createCourse('Node', 'Mosh', ['node','backend'], true)
createCourse('express', 'Mosh', ['node','backend'], true)

getCourses()