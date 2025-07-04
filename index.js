const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const {createAdminAccount,createUserAccount,generateCustomRefId} = require('./scripts/admin');
const userRoutes = require('./routes/updateUser');
const ItemModel = require('./models/ItemModel');
const SelectedItemModel = require('./models/selectableItemModel');
const TaskModel = require('./models/toDoModel');
const folderRoute = require('./routes/selctabelItems');
const expenseRouter = require('./routes/expense');


const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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
app.use('/api', folderRoute);
app.use('/api', userRoutes);
app.use('/api', expenseRouter);

app.get('/', (req, res) => {
  ItemModel.find({}).sort({ date: -1 })
    .then(items => res.json(items))
    .catch(err => res.status(500).json({ error: err.message }));
});

// app.post('/addItem', (req, res) => {
//   ItemModel.create(req.body)
//     .then(item => res.json(item))
//     .catch(err => res.status(500).json({ error: err.message }));
// });
// app.post('/addItem', async (req, res) => {
//   try {
//     const newItem = await ItemModel.create(req.body); // Create new item
//     res.status(201).json({ _id: newItem._id }); // Return the new item's ID
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create item' });
//   }
// });

app.post('/addItem', async (req, res) => {
  const { items, customer, comment, payment, discount } = req.body;
  const referenceId = await generateCustomRefId();


  if (!items || !customer) {
    return res.status(400).json({ error: 'Items and customer name are required' });
  }

  try {
    const newOrder = new ItemModel({
      items,
      customer,
      payment,
      discount,
      comment,
      referenceId
    });
    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order saved successfully', _id: savedOrder._id });
  console.log('Generated Reference ID:', referenceId);
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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

app.get('/search', async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.json([]);  
  }

  try {
    const items = await ItemModel.find({
      $or: [
        { referenceId: { $regex: query, $options: "i" } },
        { "items.name": { $regex: query, $options: "i" } },
        { customer: { $regex: query, $options: "i" } },
        { comment: { $regex: query, $options: "i" } },
        // { date: { $regex: query, $options: "i" } },
      ],
    });
    res.json(items);
  } catch (err) {
    console.error("Error during search:", err);
    res.status(500).json({ error: err.message });
  }
});



//selectable items


app.post('/selectable-items', (req, res) => {
  SelectedItemModel.create(req.body)
      .then(item => res.json(item))
      .catch(error => res.status(500).json({ error: error.message }));
});


app.get('/selectable-items', async (req, res) => {
  try {
    const items = await SelectedItemModel.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items' });
  }
});

app.get('/selectable-items/:id', (req, res) => {
  const id = req.params.id;
  SelectedItemModel.findById(id)
          .then(item => {
              if (!item) {
                  return res.status(404).json({ error: 'Item not found' });
              }
              res.json(item);
          })
          .catch(err => res.status(500).json({ error: err.message }));
});

app.delete('/delete-selectable-items/:id', (req, res) =>{
  const id = req.params.id;
  SelectedItemModel.findByIdAndDelete({_id: id})
  .then(res=> res.json(res))
  .catch(err => res.json(err))
})

app.put('/update-selectable-item/:id', (req, res) => {
  const id = req.params.id;
  const { itemName, price } = req.body;

  SelectedItemModel.findByIdAndUpdate(id, { itemName, price }, { new: true })
      .then(item => res.json(item))
      .catch(err => res.status(500).json({ error: err.message }));
});

//task routes
app.get('/tasks', (req, res) => {
  TaskModel.find({})
  .then(users => res.json(users))
  .catch(err => res.json)
})

app.get('/gettask/:id', (req, res) => {
const id = req.params.id;
TaskModel.findById({_id:id})
.then(users => res.json(users))
.catch(err => res.json)
})


app.put('/updateTask/:id', (req, res) => {
const id = req.params.id;
 TaskModel.findByIdAndUpdate({_id: id}, {
  name: req.body.name, 
  date: req.body.date
})
.then(users => res.json(users))
.catch(err => res.json)

})

app.delete('/deleteTask/:id', (req, res) =>{
const id = req.params.id;
TaskModel.findByIdAndDelete({_id: id})
.then(res=> res.json(res))
.catch(err => res.json(err))
})


app.post( '/task', (req, res) => {
TaskModel.create(req.body)
.then(users => res.json(users))
.catch(error => res.json(error))
   
})

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
  createAdminAccount();
  createUserAccount();
  createSuperUserAccount();
});

// Export app for Vercel
module.exports = app;
