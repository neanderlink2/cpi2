const produtos = [
    {
        id: 1,
        nome: "Central",
        descricao: "Esse é o núcleo de toda a casa inteligente. Para utilizar os outros produtos, você precisará da central, que conectará os produtos, como uma ponte.",
        pathImagem: "src/imgs/arduino.jpg",
        preco: 34.99,
        categoria: "Gerência"
    },
    {
        id: 2,
        nome: "Fechaduras Biométricas",
        descricao: "Tenha mais segurança nos cômodos de sua residência, coloque uma verificação biométrica para liberar o acesso.",
        pathImagem: "src/imgs/biometria.jpg",
        preco: 19.99,
        categoria: "Segurança"
    },
    {
        id: 3,
        nome: "Realidade Aumentada",
        descricao: "Incremente suas experiências de filmes, jogos e músicas com a realidade aumentada.",
        pathImagem: "src/imgs/gam.jpg",
        preco: 19.99,
        categoria: "Lazer"
    }
];

let isPesquisando = false;

$(document).ready(function () {
    $(".dropdown-trigger").dropdown({
        autoTrigger: false,
        hover: true,
        coverTrigger: false
    });
    $(document).ready(function () {
        $('.sidenav').sidenav({
            draggable: true
        });
    });

    $(".sidenav a").on('click', function () {
        $("#sidenav-geral").sidenav();
    });
    $(".cards-centrais, .cards-produtos").on("mouseenter", function () {
        $(this).removeClass("blue-grey darken-4");
        $(this).addClass("grey darken-4");
    });

    $(".cards-centrais, .cards-produtos").on("mouseleave", function () {
        $(this).removeClass("grey darken-4");
        $(this).addClass("blue-grey darken-4");
    });

    $("#modal-produto-detalhes").modal();

    preencherProdutos();
    $("#pesquisa").hide();
    $("#botao-voltar").hide();
});

function mostrarPesquisa() {
    $("#mostrar-pesquisa").hide();
    $("#navegacao").hide('fast');
    $("#pesquisa").show('slow');
    $("#botao-voltar").show();
}

function esconderPesquisa() {
    $("#pesquisa").hide('fast');
    $("#botao-voltar").hide();
    $("#navegacao").show('slow');
    $("#mostrar-pesquisa").show('slow');
    $("#corpo div").show('slow');    
    $("#corpo .conteudo").show('slow');    
    $("#search").val("");
    preencherProdutos();
}

function pesquisar(textoPesquisa) {
    $("#corpo .conteudo").hide('slow');
    mostrarPesquisa();
    preencherProdutos(textoPesquisa);
}

function abrirModalProduto(id) {
    let prod = {};

    for (let produto of produtos) {
        if (produto.id == id) {
            prod = produto;
            break;
        }
    }

    $("#modal-produto-detalhes #nome").text(prod.nome);
    $("#modal-produto-detalhes #descricao").text(prod.descricao);
    $("#modal-produto-detalhes #imagem").attr('src', prod.pathImagem);
    $("#modal-produto-detalhes #valor").text(`R$ ${prod.preco}`);
    $("#modal-produto-detalhes").modal('open');
}

function preencherProdutos(pesquisa = null) {
    $("#section-produtos").html("");
    for (let prod of produtos) {
        if (!pesquisa || pesquisa === "") {
            $("#section-produtos").append(`
                <div class="col s12 m6 xl3">
                    <div class="card medium blue-grey darken-4 white-text">
                        <div class="card-image">
                            <img src="${prod.pathImagem}" style="max-height: 200px;">
                        </div>
                        <div class="card-content">
                            <span class="card-title">${prod.nome}</span>
                        </div>
                        <div class="card-action" style="text-align: right;">
                            <button onclick="abrirModalProduto(this.getAttribute('data-id'));" data-id="${prod.id}" class="btn waves-effect waves-light blue-grey modal-trigger">Ver mais</button>
                        </div>
                    </div>
                </div>
            `);
        } else {
            if (prod.nome.toLocaleLowerCase().includes(pesquisa.toLocaleLowerCase())
                || prod.categoria.toLocaleLowerCase().includes(pesquisa.toLocaleLowerCase())) {
                $("#section-produtos").append(`
                    <div class="col s12 m6 xl3">
                        <div class="card medium blue-grey darken-4 white-text">
                            <div class="card-image">
                                <img src="${prod.pathImagem}" style="max-height: 200px;">
                            </div>
                            <div class="card-content">
                                <span class="card-title">${prod.nome}</span>
                            </div>
                            <div class="card-action" style="text-align: right;">
                                <button onclick="abrirModalProduto(this.getAttribute('data-id'));" data-id="${prod.id}" class="btn waves-effect waves-light blue-grey modal-trigger">Ver mais</button>
                            </div>
                        </div>
                    </div>
                `);
            }
        }
    }
    if ($("#section-produtos").html() == "") {
        $("#section-produtos").append("<span>Nenhum produto foi encontrado.</span>");
    }
}
