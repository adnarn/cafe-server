const express = require('express');
const signupRoute = require('./routes/signup');
const bodyParser = require('body-parser');
const createAdminAccount = require('./scripts/admin');
const cors = require('cors');
const loginRoute = require('./routes/login')
const ItemModel = require ('./models/ItemModel')
const UserModel = require ('./models/user')

 

const app = express()

const PORT = 4000

app.use(express.json());
app.use(cors());


app.use('/user', signupRoute);

app.use('/auth', loginRoute);

app.use(express.json())


app.listen( PORT, () => {
  console.log(`Hello, the server is running at port ${PORT}`)
  createAdminAccount();
})


        app.get('/', (req, res) => {
            ItemModel.find({})
            .then(items => res.json(items))
            .catch(err => res.json)
        })

app.post( '/addItem', (req, res) => {
  ItemModel.create(req.body)
  .then(items => res.json(items))
  .catch(error => res.json(error))
     
})

app.delete('/deleteItem/:id', (req, res) =>{
  const id = req.params.id;
  ItemModel.findByIdAndDelete({_id: id})
  .then(res=> res.json(res))
  .catch(err => res.json(err))
})






app.get('/getItem/:id', (req, res) => {
  const id = req.params.id;
  ItemModel.findById({_id:id})
  .then(items => res.json(items))
  .catch(err => res.json)
})


app.put('/updateItem/:id', (req, res) => {
  const id = req.params.id;
   ItemModel.findByIdAndUpdate({_id: id}, {
    name: req.body.name, 
    price: req.body.price
  })
  .then(items => res.json(items))
  .catch(err => res.json)

})
 


app.get('/search', (req, res) => {
  const query = req.query.q; // get the search query from the request

  ItemModel.find({ name: { $regex: query, $options: 'i' } }) // case-insensitive search
    .then(items => res.json(items))
    .catch(err => res.status(500).json(err));
});







