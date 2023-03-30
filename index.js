//Using Express framework 
const express = require('express') 
const app = express(); 

app.use(express.json())

//Array of customers to be consumed 

const customers = [{"id":1,"name":"Benjamin"}
,{"id":2,"name":"Victor"},{"id":3,"name":"Cristhian"}];

//Build and empty URI get method as our welcome page 
app.get('/',(req,res)=>{
      res.send("Welcome Class");
    })
    
//Build the Get Method setting the uri that we're going to use
//This is going to return all the customers on our array

app.get('/api/customers',(req,res)=>{
    res.send(customers);
})

//Build the Get Method with an identifier 

app.get('/api/customers/:id',(req,res)=>{
//create constant customer that is going to use a find function 
//We are going to parse the id to this to try to match the id that we have on the array
const customer = customers.find(c => c.id === parseInt(req.params.id));

//IF the id is not found we're going to show a message 

if(!customer){
    res.status(404).send("The given ID doesn't belong to any customer");
}

//Then we're going to send the results 
res.send(customer);

})

//Build the Post Method 

app.post('/api/customers',(req,res)=>{
    //We are going to log our request
    console.log(req.body);
    //We build a const customer that is going to hold
    //The id and the name
    const customer = {
        id: customers.length + 1,
        name : req.body.name 
    }
    //We are going to push the value of this customer into customers
    customers.push(customer)
    //Finally we are going to return the same value that we insert
    return res.send(customer);
});

//Build the Put Method with an identifier 

app.put('/api/customers/:id',(req,res)=>{
    //Look up for the customer as we do in the get method
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    //IF the id is not found we're going to show a message 
    if(!customer){
        res.status(404).send("The given ID doesn't belong to any customer");
    }
    //Validate that we're inserting the correct parameters / the name should be
    //more than 3 characters long
    if(!req.body.name  || req.body.name.length <3){
        res.status(400).send("Name is required and should be at least 3 characters long");
        return;
    }
    //Update the customer 
    customer.name = req.body.name;
    //return the updated results 
    res.send(customer);
    });

//Build the delete Method with an identifier 

app.delete('/api/customers/:id',(req,res)=>{
    //Look up for the customer as we do in the get method
    const customer = customers.find(c => c.id === parseInt(req.params.id));
    //IF the id is not found we're going to show a message 
    if(!customer){
        res.status(404).send("The given ID doesn't belong to any customer");
    }
    //Delete the customer
    const index = customers.indexOf(customer);
    customers.splice(index,1);

    //return the customer that was deleted 
    res.send(customer);
    });

//Start our service
app.listen(3000, ()=> console.log('Listening on port 3000...'))