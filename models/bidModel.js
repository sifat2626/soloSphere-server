const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    comment: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    buyer_email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    job_title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }
});

const Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
