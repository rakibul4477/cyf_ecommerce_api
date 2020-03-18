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

app.get("/products", function(req, res) {
    pool.query('select products.product_name, supplier_name from products join suppliers on products.supplier_id = suppliers.id', 
    (error, result) => {
        res.json(result.rows);
    });
});

app.listen(4000, function() {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});