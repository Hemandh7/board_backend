const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const boardsRoutes = require('./routes/boards');
const tasksRoutes = require('./routes/tasks');
const subtaskRoutes = require('./routes/subtasks');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://hemandh:hemandh@cluster0.w6tzhry.mongodb.net/boards?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();
app.use(cors());
app.use(express.json());


app.use('/boards', boardsRoutes);
app.use('/tasks', tasksRoutes);
app.use('/api/subtasks', subtaskRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
