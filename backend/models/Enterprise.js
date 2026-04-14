import mongoose from "mongoose";

const enterpriseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    subject: {
        type: String,
        required: true,
        trim: true
    },
    bio: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    availability: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Enterprise = mongoose.model("Enterprise", enterpriseSchema);

export default Enterprise;
