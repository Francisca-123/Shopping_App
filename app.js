const express = require("express");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const port = 3553
const shopping_list = [{
  name: "yoghurt",
  price: 200,
  currency: "NGN",
  Id: 1
 },
{
  name: "banana",
  price: 20,
  currency: "USD",
  Id: 2
 }]
app.get('/',(req,res)=>{
  console.log(req.query);
  res.json({message:"Welcome to our server"})
});

app.get('/items', (req,res)=>{
  res.send(shopping_list)
});

app.post("/add-item", (req, res) => {
  const item = req.body;
  shopping_list.push(item);
  console.log(shopping_list);
  console.log(item);
  res.send(item);
});
app.get('/items/:id', (req, res)=>{
  console.log(req.query);
  const {item_id} = req.query;

  const product_info = shopping_list.find((item)=>{
    return item.Id === parseInt(item_id);
  });
  if (product_info){
    return res.json(product_info)
  }else{
    res.json({message: "Item not found"});
  }
});

app.listen(port, ()=>{
  console.log(`Server running at port ${port}.....`);
});