"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let pacotes = document.querySelector(".pacotes");
let nome = document.querySelector("#nome");
let descricao = document.querySelector("#descricao");
let data = document.querySelector("#data");
let botao_cadastro = document.querySelector(".botao_cadastrar");
// Listar 
const Gerar_pacote = () => {
    pacotes.innerHTML = '';
    for (let index = 0; index < guardarinf.length; index++) {
        pacotes.innerHTML += `<div class='pacoteX'> <h2> ${guardarinf[index].nome}  </h2> <p>  ${guardarinf[index].descricao}  </p> <div class='data_viagem'>  ${guardarinf[index].data}  </div> <div class='botoes'> <button type='reset' onclick='Excluir(  ${index}  )' class='excluir'>Excluir</button><button type='submit' onclick='Editar1( " ${guardarinf[index].nome} " , "${guardarinf[index].descricao}", "${guardarinf[index].data}", "${guardarinf[index].status}", "${guardarinf[index].id}")' class='editar'><a href="#top">Editar</a></button></div> </div> <br><br>`;
    }
    console.log(guardarinf.length);
};
// Guardar a API
class Informacoes {
    constructor(_nome, _descricao, _data, _status, _id) {
        this.nome = _nome;
        this.descricao = _descricao;
        this.data = _data;
        this.status = _status;
        this.id = _id;
    }
}
let guardarinf = [];
fetch('https://62361b7feb166c26eb2f488a.mockapi.io/pacotes', {
    method: 'GET',
    headers: { 'Content-Type': "aplication/json" }
})
    .then(response => response.json())
    .then(api => {
    for (let index = 0; index < api.length; index++) {
        let infs = new Informacoes(api[index].nome, api[index].descricao, api[index].data, api[index].status, api[index].id);
        guardarinf.push(infs);
    }
    console.log(guardarinf);
    Gerar_pacote();
});
// Cadastrar
const Cadastrar = () => {
    let input_nome = nome.value;
    let input_descricao = descricao.value;
    let input_data = new Date(data.value);
    let cadastro = new Informacoes(input_nome, input_descricao, input_data, false, guardarinf.length + 1);
    guardarinf.push(cadastro);
    Gerar_pacote();
};
// Excluir
const Excluir = (pegar_index) => {
    // preciso do index do vetor, 1
    guardarinf.splice(pegar_index, 1);
    Gerar_pacote();
};
// Editar
let id;
const Editar1 = (editar_nome, editar_descricao, editar_data, editar_status, editar_id) => {
    // Jogar as informações no input
    nome.value = editar_nome;
    descricao.value = editar_descricao;
    data.value = editar_data;
    id = parseInt(editar_id);
    botao_cadastro.innerHTML = `<button type='submit' onclick='Editar2("")' class='editar'>Editar</button>`;
    console.log(editar_descricao);
};
const Editar2 = () => {
    let editado = new Informacoes(nome.value, descricao.value, new Date(data.value), false, id);
    guardarinf.splice(id - 1, 1, editado);
    Gerar_pacote();
    botao_cadastro.innerHTML = '<button type="submit" onclick="Cadastrar()" id="botao_cadastro">Cadastrar</button>';
};
// verificar qual status está selecionado, input.checked
