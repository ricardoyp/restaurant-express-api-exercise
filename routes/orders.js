const express = require("express")
const router = express.Router();
const orders = require('../data/orders.json');
const menu = require('../data/menu.json');

const fs = require("fs");

router.get("/", (req, res) => {
    res.send(orders);
})

router.post("/create", (req, res) => {
    const newOrders = [...orders, req.body];

    fs.writeFile("./data/orders.json", JSON.stringify(newOrders), (err) => {
        if (err) throw err;
        res.send("Order Created: " + JSON.stringify(req.body));
    });
});

router.get("/bill/:table", (req, res) => {
    let total = 0;
    let bill = "";

    const billTable = orders.find(element => {
        if(element.table === req.params.table){
            return element
        }
    })

    billTable.orders.forEach(element => {
        menu.forEach(plate => {
            if(plate.id === element){
                bill += `${plate.name}: ${plate.price}\n`
                total += plate.price;
            }
        })
    })
    bill += "-------------\n"
    total = total.toFixed(2)
    bill += `TOTAL: ${total}`
    
    res.send(bill)
    // console.log(billTable.orders)
    // console.log(menu)
})

module.exports = router;