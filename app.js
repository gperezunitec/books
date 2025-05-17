const express = require('express');
const app = express();
const fs = require('fs');
const port = 3000;

app.use(express.json());


function readBooks(){
const data=fs.readFileSync('books.json','utf8');
return JSON.parse(data);
}


function writeBooks(books){
fs.writeFileSync('books.json', JSON.stringify(books,null, 2));
}


app.get('/api/books', function (req, res) {
res.json(readBooks());
})

app.get('/api/books/:id', function (req, res) {

})

app.post('/api/books', function (req, res) {

})

app.put('/api/books/:id', function (req, res) {

})


app.delete('/api/books/:id', function (req, res) {

})





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})