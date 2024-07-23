import mongoose from 'mongoose';

const searchOptionsSchema = new mongoose.Schema({
  email: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
}, { timestamps: true });

const SearchOptions = mongoose.models.SearchOptions || mongoose.model('SearchOptions', searchOptionsSchema);


export default SearchOptions;