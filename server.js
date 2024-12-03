const express = require('express');
const app = express();

app.use(express.json());


let clientes = [{"id": 1, "nome": "João Silva", "telefone": "48999999999"}];
let carros = [{"id": 1, "marca": "Toyota", "modelo": "Corolla", "tamanho": "SEDAN", "id_cliente": 1}];
let servicos = [{"id": 1, "descricao": "Lavagem completa", "valores": [{"tamanho": "HATCH", "valor": 50.8}]}];
let agendamentos = [{"id_carro": 1, "id_servico": 1, "data_hora": "2024-10-25T14:00:00"}];

//Verificações para clientes
function verificaNome(nome){
    if(!nome){
        return {"mensagem": "'nome' deve conter no mínimo 3 caracteres"}}
    if(nome.length<3){
        return {"mensagem": "'nome' deve conter no mínimo 3 caracteres"}}
    if(nome.length>100){
        return {"mensagem": "'nome' deve conter no máximo 100 caracteres"}}
};
function verificaTelefone(telefone){   
    if(telefone.toString().length !=11){
        return {"mensagem": "'telefone' deve conter exatamente 11 dígitos"}}
    if(isNaN(telefone)){
        return {"mensagem": "'telefone' deve conter apenas números"}}
};
function verificaCodigo(codigo){
    if(codigo.toString().length <! 0){
        return {"mensagem": "'codigo' deve ser maior que 0"}}
    if(codigo.toString() == "0" ){
        return {"mensagem": "'codigo' deve ser maior que 0"}}

};
console.log(verificaNome("1234567891123456789112345678911234567891123456789112345678911234567891123456789112345678911234567891"))
console.log(verificaTelefone("12345678901"))
console.log(verificaCodigo("1"))

//Verificações para carros
function verificaMarca(marca){
    if(!marca){
        return {"mensagem": "'marca' deve conter no mínimo 3 caracteres"}}
    if(marca.length<3){
        return {"mensagem": "'marca' deve conter no mínimo 3 caracteres"}}
    if(marca.length>50){
        return {"mensagem": "'marca' deve conter no máximo 50 caracteres"}}
};
function verificaModelo(modelo){
    if(!modelo){
        return {"mensagem": "'modelo' deve conter no mínimo 3 caracteres"}}
    if(modelo.length<3){
        return {"mensagem": "'modelo' deve conter no mínimo 3 caracteres"}}
    if(modelo.length>50){
        return {"mensagem": "'modelo' deve conter no máximo 50 caracteres"}}
};
function verificaTamanho(tamanho){
    if(tamanho =="HATCH" || tamanho =="SEDAN" || tamanho =="SUV" || tamanho =="PICAPE"){
        return;
    }else return {"mensagem": "'tamanho' deve ser HATCH, SEDAN, SUV ou PICAPE"};
};
function verificaIdCliente(id_cliente){
    const cliente = clientes.find(u => u.id === parseInt(id_cliente));
    if(cliente){
        return
    }else return {"mensagem": "'id_cliente' não corresponde a um cliente cadastrado"}
};
function verificaCodigoCarro(codigo){
    if(codigo.toString().length <! 0){
        return {"mensagem": "'codigo' deve ser maior que 0"}}
    if(codigo.toString() == "0" ){
        return {"mensagem": "'codigo' deve ser maior que 0"}}

};

 console.log(verificaMarca("12345678901234567890123456789012345678901234567890"))
 console.log(verificaModelo("112"))
 console.log(verificaTamanho("SEDAN"))
console.log(verificaIdCliente("1"))
console.log(verificaCodigoCarro(1))

//Verificações para Seviços
function verificaDescricao(descricao){
    if(!descricao){
        return {"mensagem": "'descricao' deve conter no mínimo 5 caracteres"}}
    if(descricao.length<5){
        return {"mensagem": "'descricao' deve conter no mínimo 5 caracteres"}}
    if(descricao.length>100){
        return {"mensagem": "'descricao' deve conter no máximo 100 caracteres"}}
};
function verificaValores(valores){

}







//Endpoints para clientes (/clientes)
//•	GET /clientes. Busca todos os clientes cadastrados
app.get('/clientes', (req, res) => {
    res.status(200).json(clientes);
});
//•	POST /clientes. Cadastra um novo cliente
app.post('/clientes', (req, res) =>{
    const {nome, telefone} = req.body;
    if(verificaNome(nome) || verificaTelefone(telefone)){
        return res.status(400).send(verificaNome(nome) || verificaTelefone(telefone));
    }
    let id = 0;
    clientes.forEach(cliente => {
        if (cliente.id > id){
            id= cliente.id;
        }
    })
    clientes.push({ id: id + 1, nome, telefone});
    res.status(201).json({message: 'Cliente cadastrado com sucesso'})
});
//•	GET /clientes/:codigo. Busca um cliente específico pelo código
app.get('/clientes/:id', (req, res) => {
    const id= Number.parseInt(req.params.id)
    res.status(200).json(clientes.find(cliente => cliente.id === id));
});
//•	PUT /clientes/:codigo. Atualiza as informações de um cliente
app.put('/clientes/:codigo', (req, res) =>{
    const { codigo } = req.params;
    const { nome, telefone  } = req.body;
    const cliente = clientes.find(u => u.id === parseInt(codigo));
    
    if(verificaNome(nome) || verificaTelefone(telefone) || verificaCodigo(codigo)){
        return res.status(400).send(verificaNome(nome) || verificaTelefone(telefone) || verificaCodigo(codigo));
    }    
    
    if (cliente) {
        cliente.nome = nome;
        cliente.telefone = telefone;
        res.status(201).json({message:'Cliente atualizado com sucesso!'});
    } else{
        res.status(404).json({message:  'Cliente não encontrado'});
    }
    
});

//•	DELETE /clientes/:codigo. Remove um cliente pelo ID.
app.delete('/clientes/:id', (req, res) =>{
    const { id } = req.params;
    const index = clientes.findIndex(u => u.id === Number.parseInt(id))
    if (index !== -1) {
        clientes.splice(index, 1);
        res.status(200).json({message: 'Cliente removido com sucesso!'});
    } else{
        res.status(404).json({message: 'Cliente não encontrado'});
    }
    
});

//Endpoints para carros (/carros)
//•	GET /carros. Busca todos os carros cadastrados
app.get('/carros', (req, res) => {
    res.status(200).json(carros);
});
//•	POST /carros. Cadastra um novo carro
app.post('/carros', (req, res) =>{
    const {marca, modelo, tamanho, id_cliente} = req.body;
    let id = 0;

    if(verificaMarca(marca)||verificaModelo(modelo)||verificaTamanho(tamanho)||verificaIdCliente(id_cliente)){
        return res.status(400).send(verificaMarca(marca)||verificaModelo(modelo)||verificaTamanho(tamanho)||verificaIdCliente(id_cliente));
    } 

    carros.forEach(carro => {
        if (carro.id > id){
            id= carro.id;
        }
    })
    carros.push({ id: id + 1, marca, modelo, tamanho, id_cliente});
    res.status(201).json({message: 'Carro cadastrado com sucesso'})
});
//•	GET /carros/:codigo Busca um carro específico pelo código
app.get('/carros/:codigo', (req, res) => {
    const codigo= Number.parseInt(req.params.codigo)
    res.status(200).json(carros.find(carro => carro.id === codigo));
});
//•	PUT /carros/:codigo. Atualizar as informações de um carro
app.put('/carros/:codigo', (req, res) =>{
    const { codigo } = req.params;
    const { id, marca, modelo, tamanho, id_cliente } = req.body;
    const carro = carros.find(u => u.id === parseInt(codigo));
    
    if(verificaMarca(marca)||verificaModelo(modelo)||verificaTamanho(tamanho)||verificaIdCliente(id_cliente)||verificaCodigoCarro(codigo)){
        return res.status(400).send(verificaMarca(marca)||verificaModelo(modelo)||verificaTamanho(tamanho)||verificaIdCliente(id_cliente)||verificaCodigoCarro(codigo));
    } 
    
    if (carro) {
        carro.id = id;
        carro.marca = marca;
        carro.modelo = modelo;
        carro.tamanho = tamanho;
        carro.id_cliente = id_cliente;
        res.status(201).json({message:'Carro Atualizado com sucesso'});
    } else{
        res.status(404).json({message:  'Carro não encontrado'});
    }
    
});
//•	DELETE /carros/:codigo. Remove um carro pelo ID
app.delete('/carros/:codigo', (req, res) =>{
    const { codigo } = req.params;
    const index = carros.findIndex(u => u.id === Number.parseInt(codigo))
    if (index !== -1) {
        carros.splice(index, 1);
        res.status(200).json({message: 'Carro removido com sucesso'});
    } else{
        res.status(404).json({message: 'Carro não encontrado'});
    }
    
});

//Endpoints para serviços (/servicos)
//•	GET /servicos Busca todos os serviços cadastrados.
app.get('/servicos', (req, res) => {
    res.status(200).json(servicos);
});
//•	POST /servicos Cadastra um novo serviço
app.post('/servicos', (req, res) =>{
    const {descricao, valores, tamanho} = req.body;
    let id = 0;
    servicos.forEach(servico => {
        if (servico.id > id){
            id= servico.id;
        }
    })
    servicos.push({ id: id + 1, descricao, valores: valores});
    res.status(201).json({message: 'Serviço cadastrado com sucesso'})
});
//•	GET /servicos/:codigo Busca um serviço específico pelo código
app.get('/servicos/:codigo', (req, res) => {
    const codigo= Number.parseInt(req.params.codigo)
    res.status(200).json(servicos.find(servico => servico.id === codigo));
});
//•	PUT /servicos:codigo. Atualizar as informações de um serviço
app.put('/servicos/:codigo', (req, res) =>{
    const { codigo } = req.params;
    const { id, descricao, valores } = req.body;
    const servico = servicos.find(u => u.id === parseInt(codigo));
    if (servico) {
        servico.id = id;
        servico.descricao = descricao;
        servico.valores = valores;
        res.status(201).json({message:'Serviço atualizado com sucesso'});
    } else{
        res.status(404).json({message:  'Serviço não encontrado'});
    }
    
});
//•	DELETE /servicos/:codigo. Remove um serviço pelo ID
app.delete('/servicos/:codigo', (req, res) =>{
    const { codigo } = req.params;
    const index = servicos.findIndex(u => u.id === Number.parseInt(codigo))
    if (index !== -1) {
        servicos.splice(index, 1);
        res.status(200).json({message: 'servicos removido com sucesso'});
    } else{
        res.status(404).json({message: 'servicos não encontrado'});
    }
    
});

//Endpoints para agendamentos (/agendamentos)
//•	GET /agendamentos. Busca todos os agendamentos cadastrados
app.get('/agendamentos', (req, res) => {
    res.status(200).json(agendamentos);
});
//•	POST /agendamentos. Cadastra um novo agendamento
app.post('/agendamentos', (req, res) =>{
    const {id_carro, id_servico, data_hora} = req.body;
    let id = 0;
    //Adiciona Id no agendamento
    // agendamentos.forEach(agendamento => {
    //     if (agendamento.id > id){
    //         id= agendamento.id;
    //     }
    // })
    //agendamentos.push({ id: id + 1, id_carro, id_servico, data_hora});

    agendamentos.push({id_carro, id_servico, data_hora});
    res.status(201).json({message: 'Agendamento cadastrado com sucesso'})
});


app.post('/users', (req, res) =>{
    const {name} = req.body;
    let id = 0;
    users.forEach(user => {
        if (user.id > id){
            id= user.id;
        }
    })
    users.push({ id: id + 1, name});
    res.status(201).json({message: 'Usuario criado com sucesso!'})
});

app.get('/users/:id', (req, res) => {
    const id= Number.parseInt(req.params.id)
    res.status(200).json(users.find(user => user.id === id));
});

app.put('/users/:id', (req, res) =>{
    const { id } = req.params;
    const { name } = req.body;
    const user = users.find(u => u.id === parseInt(id));
    if (user) {
        user.name = name;
        res.status(201).json({message:'Usuário atualizado com sucesso!'});
    } else{
        res.status(404).json({message:  'Usuário não encontrado'});
    }
    
});


app.delete('/users/:id', (req, res) =>{
    const { id } = req.params;
    const index = users.findIndex(u => u.id === Number.parseInt(id))
    if (index !== -1) {
        users.splice(index, 1);
        res.status(200).json({message:'Usuário removido com sucesso!'});
    } else{
        res.status(404).json({message:  'Usuário não encontrado'});
    }
    
});




app.listen(3000, () => {
    console.log('Api rodando na porta 3000')
})

module.exports = app;