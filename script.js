if (typeof (Storage) !== "undefined") {
    console.log("localStorage disponível!");
} else {
    console.log("localStorage não é suportado pelo navegador.");
}

let clientes = JSON.parse(localStorage.getItem('clientes')) || [];


function fluxoDeTelas(){
    const boxInfo = document.getElementById('boxInfo');
    const boxForm = document.getElementById('boxForm');

    if (boxForm.style.display !== 'none') {
        boxForm.style.display = 'none';
        boxInfo.style.display = 'block';
    } else {
        boxInfo.style.display = 'none';
        boxForm.style.display = 'block';
    }
}
function adicionarCliente() {
    const nomeCliente = document.getElementById('nomeCliente').value;
    const dataNascimento = document.getElementById('dataNascimento').value;
    const cpf = document.getElementById('cpf').value.trim();
    const tipoOrigem = document.getElementById('tipoOrigem').value;
    const score = parseFloat(document.getElementById('score').value);
    const categoria = document.getElementById('categoria').value;
    const nomeVendedor = document.getElementById('nomeVendedor').value;
    const matricula = parseInt(document.getElementById('matricula').value);
    const clientePedido= document.getElementById('clientePedido').value;
    const dataPedido = document.getElementById('dataPedido').value;
    const vendedorPedido = parseInt(document.getElementById('vendedorPedido').value);
    const valorProduto = parseFloat(document.getElementById('valorProduto').value);

    const valoresStringsEDatas = [nomeCliente, nomeVendedor, tipoOrigem, categoria, clientePedido, dataNascimento , dataPedido];

    const valoresFloatEInts = [matricula, score, valorProduto, vendedorPedido];

    if (valoresStringsEDatas.some(valor => !valor)) {
        alert("Preencha todos os campos corretamente.");
        return;
    }else if(valoresFloatEInts.some(valor => isNaN(valor) || valor <= 0)) {
        alert("Preencha todos os campos corretamente.");
        return;
    }else if(cpf.length < 11 ||  cpf.length > 14){
        alert('Digite o CPF corretamente');
        return;
    }

    const cliente = {
        nomeCliente,
        dataNascimento,
        cpf,
        tipoOrigem,
        score,
        categoria,
        nomeVendedor,
        matricula,
        clientePedido,
        dataPedido,
        vendedorPedido,
        valorProduto
    };

    clientes.push(cliente);

    localStorage.setItem('clientes', JSON.stringify(clientes));
    
    fluxoDeTelas();
    exibirDadosCadastrados();
}
function exibirDadosCadastrados() {
    const exibir = document.getElementById('exibir');

    let resultado = '';

    clientes.forEach((cliente, index) => {
        resultado += `
        <h4>Cliente ${index + 1}:</h4>
        <p>Nome: ${cliente.nomeCliente}</p>
        <p>Data de Nascimento: ${cliente.dataNascimento}</p>
        <p>CPF: ${cliente.cpf}</p>
        <p>Origem: ${cliente.tipoOrigem}</p>
        <p>Score: ${cliente.score}</p>
        <p>Categoria: ${cliente.categoria}</p>
        <p>Vendedor: ${cliente.nomeVendedor}</p>
        <p>Matrícula: ${cliente.matricula}</p>
        <p>Cliente Pedido: ${cliente.clientePedido}</p>
        <p>Data do Pedido: ${cliente.dataPedido}</p>
        <p>Matrícula do Vendedor do Pedido: ${cliente.vendedorPedido}</p>
        <p>Valor do Produto: ${cliente.valorProduto}</p>
        `;
    });

    exibir.innerHTML = resultado || "Nenhum dado cadastrado.";
}
function limparCampos() {
    document.getElementById('nomeCliente').value = '';
    document.getElementById('dataNascimento').value = '';
    document.getElementById('cpf').value = '';
    document.getElementById('tipoOrigem').value = 'loja';
    document.getElementById('score').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('nomeVendedor').value = '';
    document.getElementById('matricula').value = '';
    document.getElementById('clientePedido').value = '';
    document.getElementById('dataPedido').value = '';
    document.getElementById('vendedorPedido').value = '';
    document.getElementById('valorProduto').value = '';
}
function continuarCadastrando(){
    limparCampos();
    fluxoDeTelas();
}
function finalizar(){
    alert('Sistema Finalizado');
    limparCampos();
    localStorage.clear();
    clientes = [];
    exibirDadosCadastrados();
}
