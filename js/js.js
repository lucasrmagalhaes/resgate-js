function start() 
{
    $("#inicio").hide();
    
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    
    // Principais variáveis do jogo.
    var jogo = {} 

    var TECLA = 
    {
        W: 87,
        S: 83,
        P: 80
    }
    
    jogo.pressionou = [];

    // Verifica se o usuário pressionou alguma tecla.	
    $(document).keydown(function(e)
    {
        jogo.pressionou[e.which] = true;
    });
    
    $(document).keyup(function(e)
    {
        jogo.pressionou[e.which] = false;
    });
	
	//Game Loop
	jogo.timer = setInterval(loop,30);

	function loop() {
        moveFundo();
        moveJogador();
	}

    //Função que movimenta o fundo do jogo
	
	function moveFundo() {
	    let esquerda = parseInt($("#fundoGame").css("background-position")); // parseInt - Converte uma String em um Inteiro.
	    $("#fundoGame").css("background-position", esquerda-1);
    }
    
    function moveJogador() {
	
        if (jogo.pressionou[TECLA.W]) {
            let topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo - 10);
        
        }
        
        if (jogo.pressionou[TECLA.S]) {
            let topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo + 10);	
        }
        
        if (jogo.pressionou[TECLA.P]) {
            
            //Chama função Disparo	
        }
    
        }
}

