const Job = require('../models/jobModel');
const jwt = require('jsonwebtoken');

exports.createJob = async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.status(201).json(job);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getJobsByEmail = async (req, res) => {
    try {
        const tokenEmail = req.user.email
        const { email } = req.params;
        if(tokenEmail !== email){
            return res.status(400).send({message: 'token email mismatch'})
        }
        const jobs = await Job.find({ 'buyer.email': email });
        if (!jobs || jobs.length === 0) {
            res.status(404).json({ message: 'No jobs found for this email' });
            return;
        }
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        if (!job) {
            res.status(404).json({ message: 'Job not found' });
            return;
        }
        res.json(job);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) {
            res.status(404).json({ message: 'Job not found' });
            return;
        }
        res.json(job);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) {
            res.status(404).json({ message: 'Job not found' });
            return;
        }
        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
