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

async function createCourse(name, author, tags, isPublished) {
    const course = new Course({
        name: name,
        author: author,
        tags: tags,
        isPublished: isPublished
    })
    
    const result = await course.save()
    
    console.log(result)
    
}

createCourse('NodeJS', 'Mosh', ['node','backend'], true)