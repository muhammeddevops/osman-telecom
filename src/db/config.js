import mongoose, { connection } from 'mongoose';

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const uri =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI
    : process.env.MONGODB_DEV_URI;

const dbConnect = async () => {
  try {
    console.log(uri);
    await mongoose.connect(uri, connectionOptions);
    console.log('Connected to MongoDB');
  } catch (error) {
    connection.close();
    console.error('Error connecting to MongoDB:', error);
  }
};

export default dbConnect;
