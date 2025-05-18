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

function autoIncrementalId(){
    const books=readBooks();
    let lastId=books.length>0?books[books.length-1].id:0;
    let newId=lastId+1;
    return newId;
}


app.get('/api/books', function (req, res) {
res.json(readBooks());
})

app.get('/api/books/:id', function (req, res) {
const id = parseInt(req.params.id);
const books=readBooks();
const book=books.find(cbook => cbook.id === id);

if(book){
    res.json({status:200,message:"Registro encontrado..",data:null});
}else{
    res.status(400).json({status:400,message:"Registro no encontrado",data:null});
}

})

app.post('/api/books', function (req, res) {
const book=req.body;
book.id=autoIncrementalId();
const books=readBooks();
books.push(book);
writeBooks(books);
res.json({status:200,message:"Registro encontrado",data:book});
})

app.put('/api/books/:id', function (req, res) {

const id = parseInt(req.params.id);
const book=req.body;
const books=readBooks();
let exists=false;
books.forEach((cbook)=>{
    if(cbook.id===id){
        exists=true;
        cbook.titulo=book.titulo;
        cbook.autor=book.autor;
        cbook.genero=book.genero;
        cbook.anioPublicacion=book.anioPublicacion;

    }
})

    if(exists){
        writeBooks(books);
        res.json({status:200,message:"Actualizado con Existo",data:book});
    }else{
        res.status(404).json({status:404,message:"Registro no encontrado",data:null});
    }


})


app.delete('/api/books/:id', function (req, res) {
const id = parseInt(req.params.id);
const book=readBooks();
const filterBooks=books.filter(cbook=>cbook.id!==id);

if(filterBooks.length!==books.length){
    writeBooks(filterBooks);
    res.json({status:200,message:"Registro Eliminado",data:null});
}else{
    res.json({status:200,message:"Registro no Encontrado",data:null});
}


})





app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})