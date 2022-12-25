const express  = require("express");
const app = express();
const port = 3000;
const datas = require('./data.json');
const fs = require('fs');

app.use(express.json());

app.listen(port, () => {
    console.log('server sedang berjalan di port 3000')
});

app.get('/', (req, res) =>{
    const data = datas;
    res.json(data);
})

app.post('/', (req, res) => {
    const body = req.body;
    console.log(body);

    const data = datas;
    const input = {
        id: parseInt(datas[data.length - 1].id) + 1,
        name: body.name,
    
        age: body.age,
    }
    data.push(input);
    fs.writeFileSync('./data.json', JSON.stringify(data), 'utf-8', (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.json(data);
});

app.put('/:id', (req, res) => {
    const id = req.params.id;
    const input = req.body;
    const body = {
        id: id,
        name: input.name,
        age: input.age,
    }
    const data = datas;
    const index = data.findIndex((item) => item.id == id);

    if (index == -1){
        return res.json({ message: 'data tidak ditemukan'});
    }
    data[index] = body;
    fs.writeFileSync('./data.json', JSON.stringify(data), 'utf-8', (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.json(data);
});

app.delete('/:id', (req, res) => {
    const id = req.params.id;
    const data = datas;
    const index = data.findIndex((item) => item.id == id);

    if (index == -1){
        return res.json({ message: 'data tidak ditemukan'});
    }
    data.splice(index, 1);
    fs.writeFileSync('./data.json', JSON.stringify(data), 'utf-8', (err) => {
        if (err) {
            console.log(err);
        }
    });
    res.json(data);
});

