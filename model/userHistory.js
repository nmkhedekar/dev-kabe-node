const mongoose = require('mongoose');

const UserHistory = mongoose.Schema(
    {
        searchString: {
            type: String,
            required: true,
            default: ""
        },
        data: {
            type: Array,
            required: true,
            default: {}
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('userhistory', UserHistory);
