const Bid = require('../models/bidModel');
const Job = require('../models/jobModel');

exports.createBid = async (req, res) => {
    try {
        const { jobId } = req.body;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        const bid = new Bid(req.body);
        await bid.save();
        res.status(201).json(bid);
    } catch (err) {
        res.status(400).json({  message: err.message });
    }
};

exports.getAllBids = async (req, res) => {
    try {
        const bids = await Bid.find();
        res.json(bids);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getBidById = async (req, res) => {
    try {
        const bid = await Bid.findById(req.params.id);
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }
        res.json(bid);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getBidsByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const bids = await Bid.find({ email});
        if (!bids || bids.length === 0) {
            res.status(404).json({ message: 'No bids found for this email' });
            return;
        }
        res.json(bids);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getBidRequestsByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const bids = await Bid.find({ 'buyer_email': email });
        if (!bids || bids.length === 0) {
            res.status(404).json({ message: 'No bids found for this email' });
            return;
        }
        res.json(bids);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Find the bid by ID
        const bid = await Bid.findById(id);
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }

        // Update the status of the bid
        bid.status = status;
        await bid.save();

        // Send the updated bid as a response
        res.json(bid);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



exports.updateBid = async (req, res) => {
    try {
        const bid = await Bid.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }
        res.json(bid);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteBid = async (req, res) => {
    try {
        const bid = await Bid.findByIdAndDelete(req.params.id);
        if (!bid) {
            return res.status(404).json({ message: 'Bid not found' });
        }
        res.json({ message: 'Bid deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
