const express = require("express")
const router = express.Router();
const menu = require('../data/menu.json');

const fs = require('fs');

router.get('/plates', (req, res) => {
    res.send(menu);
});

router.post("/plates", (req, res) => {
    const newMenu = [...menu, req.body];

    fs.writeFile("./data/menu.json", JSON.stringify(newMenu), (err) => {
        if(err) throw err;
        res.send("Plate Created: " + JSON.stringify(req.body));
    });
});

router.put("/plates/:id", (req, res) => {
    let updatePlate;

    menu.forEach(element => {
        if(element.id === req.params.id){
            updatePlate = element;
        }
    })

    if(updatePlate){
        if(req.body.name){
        updatePlate.name = req.body.name;
        }
        if(req.body.price){
            updatePlate.price = req.body.price;
        }
        if(req.body.description){
            updatePlate.description = req.body.description;
        }
    }

    menu.forEach(element => {
        if(element.id === req.params.id){
            element = updatePlate;
        }
    })
    fs.writeFile("./data/menu.json", JSON.stringify(menu), (err) => {
        if(err) throw err;
        res.send("Plate Updated: " + JSON.stringify(updatePlate));
    });
});

router.delete("/plates/:id", (req,res) => {
    const newMenu = menu.filter(el => el.id !== req.params.id);
    console.log(newMenu)
    fs.writeFile("./data/menu.json", JSON.stringify(newMenu), (err) => {
        if (err) throw err;
        res.send('Comida borrada exitosamente: ' + JSON.stringify(newMenu));
    });
})

module.exports = router;
