const express = require('express');
const app = express();

const PORT = 3000;

// 🔥 VERY IMPORTANT - This allows Express to read JSON body
app.use(express.json());


// ===============================
// In-memory database (Temporary)
// ===============================
let cards = [
    { id: 1, suit: "hearts", value: "ace", collection: "vintage" },
    { id: 2, suit: "diamonds", value: "queen", collection: "royal" }
];


// ===============================
// GET - Get all cards
// ===============================
app.get('/api/cards', (req, res) => {
    res.status(200).json(cards);
});


// ===============================
// GET - Get card by ID
// ===============================
app.get('/api/cards/:id', (req, res) => {
    const card = cards.find(c => c.id === parseInt(req.params.id));

    if (!card) {
        return res.status(404).json({ message: "Card not found" });
    }

    res.status(200).json(card);
});


// ===============================
// POST - Add new card
// ===============================
app.post('/api/cards', (req, res) => {

    // Basic validation
    if (!req.body.suit || !req.body.value || !req.body.collection) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newCard = {
        id: Date.now(),
        suit: req.body.suit,
        value: req.body.value,
        collection: req.body.collection
    };

    cards.push(newCard);

    res.status(201).json(newCard);
});


// ===============================
// PUT - Update entire card
// ===============================
app.put('/api/cards/:id', (req, res) => {

    const card = cards.find(c => c.id === parseInt(req.params.id));

    if (!card) {
        return res.status(404).json({ message: "Card not found" });
    }

    card.suit = req.body.suit;
    card.value = req.body.value;
    card.collection = req.body.collection;

    res.status(200).json(card);
});


// ===============================
// DELETE - Delete card
// ===============================
app.delete('/api/cards/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const card = cards.find(c => c.id === id);

    if (!card) {
        return res.status(404).json({ message: "Card not found" });
    }

    cards = cards.filter(c => c.id !== id);

    res.status(200).json({ message: "Card deleted successfully" });
});


// ===============================
// Start Server
// ===============================
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
