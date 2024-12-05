import mongoose from 'mongoose'; // ES6 import syntax for mongoose
import dotenv from 'dotenv'; // ES6 import syntax for dotenv

dotenv.config(); // Load environment variables

const connectToDatabase = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb+srv://mahasinkhan132:SETF32zlCDYukDIB@cluster87.j6mee.mongodb.net/?retryWrites=true&w=majority&appName=Cluster87';

  try {
    await mongoose.connect(uri); // No need for useNewUrlParser and useUnifiedTopology anymore
    console.log('🟢 MongoDB connection established successfully.');
  } catch (error) {
    console.error('🔴 Failed to connect to MongoDB:', error.message);
    process.exit(1); // Terminate process if connection fails
  }

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB.');
  });

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err.message}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('Mongoose disconnected from DB.');
  });

  // Optional: Graceful shutdown handling
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed on app termination');
    process.exit(0);
  });
};

// Export the function as default for use in other files
export default connectToDatabase;
