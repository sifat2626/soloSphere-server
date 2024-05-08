const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    job_title: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Web Development', 'Digital Marketing', 'Graphic Design']
    },
    min_price: {
        type: Number,
        required: true
    },
    max_price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    buyer: {
        email: {
            type: String,
            required: true
        },
        name: String,
        photo: String
    }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
