function start() 
{
    $("#inicio").hide();
    
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='amigo' class='anima3'></div>");
    
    // Principais variáveis do jogo.
    var velocidade = 5;
    var posicaoY = parseInt(Math.random() * 334);

    var jogo = {}
    var fimDeJogo = false;
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
        colisao();
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
    
    function colisao() 
    {
        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao5 = ($("#jogador").collision($("#amigo")));
        var colisao6 = ($("#inimigo2").collision($("#amigo")));
        
        // Jogador com o inimigo 1
        if (colisao1.length > 0) {
            
            let inimigo1X = parseInt($("#inimigo1").css("left"));
            let inimigo1Y = parseInt($("#inimigo1").css("top"));
            
            explosao1(inimigo1X,inimigo1Y);
        
            posicaoY = parseInt(Math.random() * 334);
            
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }

        // Jogador com o inimigo 2 
        if (colisao2.length>0) {
	
            let inimigo2X = parseInt($("#inimigo2").css("left"));
            let inimigo2Y = parseInt($("#inimigo2").css("top"));
        
            explosao2(inimigo2X, inimigo2Y);
                
            $("#inimigo2").remove();
            
            reposicionaInimigo2();
        }	
    }

    function explosao1(inimigo1X,inimigo1Y) 
    {
        $("#fundoGame").append("<div id='explosao1'></div");
        $("#explosao1").css("background-image", "url(imgs/explosao.png)");
        
        var div=$("#explosao1");
        
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({width:200, opacity:0}, "slow");
        
        // Removendo a explosão.
        var tempoExplosao = window.setInterval(removeExplosao, 1000);
        
        function removeExplosao() 
        {
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
        
        // Reposiciona Inimigo 2
        function reposicionaInimigo2() 
        {
            var tempoColisao4=window.setInterval(reposiciona4, 5000);
                
            function reposiciona4() 
            {
                window.clearInterval(tempoColisao4);
                tempoColisao4 = null;
                    
                if (fimDeJogo == false) 
                {
                    $("#fundoGame").append("<div id=inimigo2></div");
                }
                    
            }	
        }	
    }
}