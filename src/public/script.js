// =======================
// CLIENTES
// =======================

const formCliente = document.getElementById('formCliente');

formCliente.addEventListener('submit', async (e) => {

    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;

    await fetch('/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, telefone, email })
    });

    formCliente.reset();
    carregarVeiculos();

});

// =======================
// VEÍCULOS
// =======================

const formVeiculo = document.getElementById('formVeiculo');

formVeiculo.addEventListener('submit', async (e) => {

    e.preventDefault();

    const cliente_id = document.getElementById('cliente_id').value;
    const modelo = document.getElementById('modelo').value;
    const marca = document.getElementById('marca').value;
    const placa = document.getElementById('placa').value;
    const ano = document.getElementById('ano').value;

    await fetch('/veiculos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            cliente_id,
            modelo,
            marca,
            placa,
            ano
        })
    });

    formVeiculo.reset();
    carregarVeiculos();

});

// =======================
// LISTAR VEÍCULOS (JOIN)
// =======================

async function carregarVeiculos() {

    const res = await fetch('/veiculos');
    const dados = await res.json();

    const tabela = document.getElementById('listaVeiculos');

    tabela.innerHTML = '';

    dados.forEach(v => {

        tabela.innerHTML += `
            <tr>
                <td>${v.id}</td>
                <td>${v.cliente}</td>
                <td>${v.modelo}</td>
                <td>${v.marca}</td>
                <td>${v.placa}</td>
                <td>${v.ano}</td>
                <td>
                    <button onclick="deletarVeiculo(${v.id})" class="btn-deletar">
                        Excluir
                    </button>
                </td>
            </tr>
        `;

    });

}

// =======================
// DELETE VEÍCULO
// =======================

async function deletarVeiculo(id) {

    const confirmar = confirm('Deseja deletar este veículo?');

    if (!confirmar) return;

    await fetch(`/veiculos/${id}`, {
        method: 'DELETE'
    });

    carregarVeiculos();

}

// INIT
carregarVeiculos();