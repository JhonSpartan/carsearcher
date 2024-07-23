import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  manufacturer: { type: String, required: true },
  model: { type: String, required: true },
  fuelType: { type: String, required: true },
  transmission: { type: String, required: true },
  yearOfProduction: { type: Number, required: true },
  carType: { type: String, required: true }, 
  carDrive: { type: String, required: true }, 
  generation: { type: Number, required: true }, 
  doorsCount: { type: Number, required: true }, 
  placesCount: { type: Number, required: true },  
  uniqueKey: { type: String, required: true, unique: true },  
}, { timestamps: true });

const Car = mongoose.models.Car || mongoose.model('Car', carSchema);


export default Car;