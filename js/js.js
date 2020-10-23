function start() 
{
    $("#inicio").hide();
    
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    
    // Principais variáveis do jogo.
    var velocidade=5;
    var posicaoY = parseInt(Math.random() * 334);

    var jogo = {} 
    var podeAtirar = true
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
	
	// Game Loop
	jogo.timer = setInterval(loop,30);

	function loop() {
        moveFundo();
        moveJogador();
        moveInimigo1();
        moveInimigo2();
        moveAmigo();
	}

    // Função que movimenta o fundo do jogo
	function moveFundo() {
	    let esquerda = parseInt($("#fundoGame").css("background-position")); // parseInt - Converte uma String em um Inteiro.
	    $("#fundoGame").css("background-position", esquerda-1);
    }
    
    function moveJogador() {
	
        if (jogo.pressionou[TECLA.W]) 
        {
            let topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo - 10);
                if (topo<=0) 
                {
                    $("#jogador").css("top", topo + 10);
                }
        }
        
        if (jogo.pressionou[TECLA.S]) 
        {
            let topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo + 10);
            
            if (topo >= 434) {	
                $("#jogador").css("top",topo-10);
            }
        }
        
        if (jogo.pressionou[TECLA.P]) 
        {    
            disparo()	
        }
    }

    function moveInimigo1() 
    {
        let posicaoX = parseInt($("#inimigo1").css("left"));
        
        $("#inimigo1").css("left", posicaoX - velocidade);
        $("#inimigo1").css("top", posicaoY);
        
        if (posicaoX<=0) 
        {
            posicaoY = parseInt(Math.random() * 334);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);        
        }
    }

    function moveInimigo2() 
    {
        let posicaoX = parseInt($("#inimigo2").css("left"));
        
        $("#inimigo2").css("left", posicaoX - 3);
				
        if (posicaoX <= 0) 
        {
            $("#inimigo2").css("left",775);		
		}
    }

    function moveAmigo() 
    {
        let posicaoX = parseInt($("#amigo").css("left"));
        
        $("#amigo").css("left", posicaoX + 1);
                    
        if (posicaoX > 906) 
        {
            $("#amigo").css("left",0)
        }   
    }

    function disparo() {
	
        if (podeAtirar==true) 
        {
            podeAtirar=false;
        
            let topo = parseInt($("#jogador").css("top"))
            let posicaoX= parseInt($("#jogador").css("left"))
            let tiroX = posicaoX + 190;
            let topoTiro= topo + 37;
        
            $("#fundoGame").append("<div id='disparo'></div");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);
        
            var tempoDisparo = window.setInterval(executaDisparo, 30);
        } 
     
        function executaDisparo() {
            let posicaoX = parseInt($("#disparo").css("left"));
            
            $("#disparo").css("left", posicaoX + 15); 
            
            if (posicaoX > 900) { 
                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar=true;
                        
            }
        }
    } 
}