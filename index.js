const express = require ('express')
const app = express()

app.use(express.json())

const customers = [
    {id :1 , name: "Hugo"},
    {id: 2 , name: "Kim"}
]

app.get('/',(req,res)=>{
    res.send('Hola mundo');
})

app.get('/api/customers', (req,res)=> {
    res.send(customers);
})

app.get('/api/customers/:id', (req,res)=> {
    const customer = customers.find(c => c.id ===parseInt(req.params.id));
    if(!customer){
        res.status(404).send('El usuario con este ID no se encuentra')
    }
    res.send(customer)
})

app.post ('/api/customers', (req,res)=> {
    const customer = {
        id: customers.length + 1,
        name : req.body.name,
    }
    customers.push(customer);
    res.send(customer);
}
    )
	
	app.put('/api/customers/:id', (req,res)=> {
	    const customer = customers.find(c => c.id ===parseInt(req.params.id));
	    if(!customer){
	        res.status(404).send('El usuario con este ID no se encuentra')
	    }
	    if(!req.body.name || req.body.name.length<3){
	        res.status(403).send("El nombre debe tener al menos 3 caracteres")
	        return
	    }
	    
	    customer.name =req.body.name;
	    res.send(customer);
	})

	app.delete('/api/customers/:id', (req,res)=> {
	    const customer = customers.find(c => c.id ===parseInt(req.params.id));
	    if(!customer){
	        res.status(404).send('El usuario con este ID no se encuentra')
	    }
	    const index = customers.indexOf(customer);
	    customers.splice(index,1);
	    res.send(customer);
	})


app.listen(3000,
    ()=> console.log('Escuchando en el puerto 3000....'));
