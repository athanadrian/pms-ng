const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
    title: { type: String, required: true, max: [128, 'Too long, max is 128 characters'] },
    city: { type: String, required: true, lowercase: true },
    street: { type: String, required: true, min: [4, 'Too short, min is 4 characters'] },
    category: { type: String, required: true, lowercase: true },
    image: { type: String, required: true, max: [128, 'Too long, max is 128 characters'] },
    floor: { type: String },
    depNo: { type: String },
    code: { type: String, required: true, lowercase: true },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    shared: { type: Boolean },
    description: { type: String, required: true },
    dailyRate: { type: Number },
    monthlyRate: { type: Number },
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Property', propertySchema);