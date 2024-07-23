import mongoose from 'mongoose';

const searchResultsSchema = new mongoose.Schema({
  cars: [
    {
      manufacturer: { type: String, required: true },
      model: { type: String, required: true }, 
      fuelType: { type: String, required: true }, 
      transmission: { type: String, required: true }, 
      yearOfProduction: { type: String, required: true } , 
      carType: { type: String }, 
      carDrive: { type: String }, 
      generation: { type: String }, 
      doorsCount: { type: String }, 
      placesCount: { type: String },  
      carLink: { type: String, required: true, unique: false },
    }
  ],
  read: {type: Boolean, required: true} 
}, { timestamps: true });

const SearchResults = mongoose.models.SearchResults || mongoose.model('SearchResults', searchResultsSchema);

export default SearchResults;
