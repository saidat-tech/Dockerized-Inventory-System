const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

let inventory = [
    { id: 1, name: "Cisco Catalyst 9300", qty: 2, category: "Networking" },
    { id: 2, name: "PowerEdge R750", qty: 5, category: "Servers" }
];

app.get('/api/inventory', (req, res) => res.json(inventory));

app.post('/api/inventory', (req, res) => {
    const newItem = { id: Date.now(), ...req.body };
    inventory.push(newItem);
    res.status(201).json(newItem);
});

app.put('/api/inventory/:id', (req, res) => {
    const { id } = req.params;
    inventory = inventory.map(item =>
        item.id == id ? { ...item, ...req.body } : item
    );
    res.json({ message: "Update Successful" });
});

app.delete('/api/inventory/:id', (req, res) => {
    inventory = inventory.filter(item => item.id != req.params.id);
    res.status(204).send();
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Inventory System running at: ${PORT}`);
});
