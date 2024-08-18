import mongoose from 'mongoose';

const graphDatasSchema = new mongoose.Schema({
  graphData: { type: Number, required: true },
}, { timestamps: true });

const GraphData = mongoose.models.GraphData || mongoose.model('GraphData', graphDatasSchema);

export default GraphData;