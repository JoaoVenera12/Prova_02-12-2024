const express = require('express');
const app = express();

app.use(express.json());

let users = [
    {
        id:1,
        name: "José"
    }
];

app.put('/users/:id', (req, res) =>{
    const { id } = req.params;
    const { name } = req.body;
    const user = users.find(u => u.id === parseInt(id));
    if (user) {
        user.name = name;
        console.log(user.name)
        res.status(201).json({message:'Usuário atualizado com sucesso!'});
    } else{
        res.status(404).json({message:  'Usuário não encontrado'});
    }
    
});

app.listen(3000, () => {
    console.log('Api rodando na porta 3000')
})