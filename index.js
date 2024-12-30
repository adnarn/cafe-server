const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const createAdminAccount = require('./scripts/admin');
const ItemModel = require('./models/ItemModel');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
  origin: 'https://ashafa-record-saver123.netlify.app', // Replace with your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/user', signupRoute);
app.use('/auth', loginRoute);

app.get('/', (req, res) => {
  ItemModel.find({})
    .then(items => res.json(items))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.post('/addItem', (req, res) => {
  ItemModel.create(req.body)
    .then(item => res.json(item))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.delete('/deleteItem/:id', (req, res) => {
  const id = req.params.id;
  ItemModel.findByIdAndDelete(id)
    .then(() => res.json({ message: 'Item deleted successfully' }))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/getItem/:id', (req, res) => {
  const id = req.params.id;
  ItemModel.findById(id)
    .then(item => res.json(item))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/updateItem/:id', (req, res) => {
  const id = req.params.id;
  ItemModel.findByIdAndUpdate(id, {
    name: req.body.name,
    price: req.body.price,
  }, { new: true })
    .then(item => res.json(item))
    .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/search', (req, res) => {
  const query = req.query.q;
  ItemModel.find({ name: { $regex: query, $options: 'i' } })
    .then(items => res.json(items))
    .catch(err => res.status(500).json({ error: err.message }));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
  createAdminAccount();
});

// Export app for Vercel
module.exports = app;
