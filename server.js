const express = require("express");
const app = express();
const { Pool } = require('pg');
const secret = require("./secret.js")

const pool = new Pool({
    user: 'dbeaver',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: secret.bdPassword,
    port: 5432
});

app.get("/customers", function(req, res) {
    pool.query('SELECT * FROM customers', (error, result) => {
             console.log(error)
        res.json(result.rows);
    });
});

app.get("/suppliers", function(req, res) {
    pool.query('SELECT * FROM suppliers', (error, result) => {
        res.json(result.rows);
    });
});

app.get("/products", (req, res) => {
    const productNameQuery = req.query.name;
    let query = 'select products.product_name, supplier_name from products join suppliers on products.supplier_id = suppliers.id' 
    if(productNameQuery) query = `select products.product_name, supplier_name from products join suppliers on products.supplier_id = suppliers.id and products.product_name like '%${productNameQuery}%'`  
    pool.query(query)
    .then(result => res.json(result.rows))
    .catch(e => console.error(e));
});

app.listen(4000, function() {
    console.log("Server is listening on port 4000. Ready to accept requests!");
});