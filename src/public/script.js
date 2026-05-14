const form = document.getElementById('formCliente');

form.addEventListener('submit', async (e) => {

    e.preventDefault();

    const nome = document.getElementById('nome').value;

    const telefone = document.getElementById('telefone').value;

    const email = document.getElementById('email').value;

    try {

        await fetch('/clientes', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                nome,
                telefone,
                email
            })

        });

        form.reset();

        carregarClientes();

    } catch (error) {

        console.log(error);

    }

});

async function deletarCliente(id) {

    const confirmar = confirm('Deseja deletar este cliente?');

    if (!confirmar) {
        return;
    }

    try {

        await fetch(`/clientes/${id}`, {
            method: 'DELETE'
        });

        carregarClientes();

    } catch (error) {

        console.log(error);

    }

}

carregarClientes();