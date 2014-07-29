window.opponent="NO";
	$(document).ready(function(){ 
    	   function TicTacToe() {
      	   this.turn=1;
      	   this.game_play=[".",".",".",".",".",".",".",".", ".", "."];
     	   this.res=false;
      	   $("#op").hide();
     	   $("#xp").show();
  	 }
        this.socket = io();
        var self = this;
        var socket = this.socket; 
        // ******for player O, create a randon string for token****
        socket.on('connect', function() {
		 var url = location.href.split('/');
		 var token = url[url.length -1];
		 if(token=="newgame")
		 {
           		 token = Math.random().toString(36).substr(2, 5);
           		 socket.emit('token', token);
           	 	 document.getElementById("token").innerHTML=token;
	 	 }
		else
		 {
			socket.emit('token', token);
           	 	socket.emit('opponent_joined', token);
			window.opponent= "X";
		 } 
        });

 
        socket.on('opponent_dropped', function() {
            alert("opponent left the game :(");
        });

        socket.on('opponent_joined', function() {
           window.opponent = "O";
	   alert("Game begins!");
        });

        // update the game with opponent's move information
        socket.on('move', function(data) {
	//alert("move received");
            game.game_play[data.play]=data.player;
            game.turn+=1; 
	    $("#xp").toggle();
            $("#op").toggle();
            game.res= seeifWins(data.player);
            if(game.res)
                {
                   // opponent  Won!
		    $("ul").append("<li>" + data.player+ " Won!</li>");
                    game = new TicTacToe();
                    clearCanvas()
                    $("span").css("background-color","white");
                }
		else
                {
                        var spn_id = "";
                        spn_id = spn_id.concat(data.play);
                        document.getElementById(spn_id).innerHTML="<b>" + data.player + "</b>";
                }
            if(game.turn>9)
                {
                   // alert("draw!");
		    $("ul").append("<li>Draw!</li>")
                    game = new TicTacToe();
                    $("span").css("background-color","white");
                    clearCanvas();
                }
        });
	
    var game = new TicTacToe();

    $("span").click(function(){
        if(window.opponent=="NO")
	{	
		alert("Let the opponent join");
		 return false;
	}
	else if(game.game_play[this.id]!="." ||(game.turn%2&&window.opponent=="X")||(game.turn%2==0&&window.opponent=="O") )
	{
		return false;	
	}

        if(game.turn%2)
        {
            document.getElementById(this.id).innerHTML="<b>X</b>";
            game.game_play[this.id]="X";
            socket.emit('move', { play: this.id, player: "X" }); // send game data to opponent
            game.res=  seeifWins("X");  
            if(game.res)
                {
                   // X Won!
		    $("ul").append("<li>X Won!</li>")
                    game = new TicTacToe();
                    clearCanvas()
                    $("span").css("background-color","white");
                }
            else 
            {
                game.turn++;
                $("#xp").toggle();
                $("#op").toggle();
            }
        }
        else
        {
            document.getElementById(this.id).innerHTML="<b>O</b>";
            game.game_play[this.id]="O";
             socket.emit('move', { play: this.id, player: "O" }); // send game data to opponent
            game.res= seeifWins("O");
            if(game.res)
                {
               	    // O Won!
		    $("ul").append("<li>O Won!</li>")
                    game = new TicTacToe();
                    clearCanvas()
                    $("span").css("background-color","white");
                }
            else 
            {
                game.turn++;
                $("#xp").toggle();
                $("#op").toggle();
            }
        }
    
        	if(game.turn>9)
            {
               // alert("draw!");
		$("ul").append("<li>Draw!</li>")
                game = new TicTacToe();
                $("span").css("background-color","white");
                clearCanvas();
            }
    });


	function seeifWins(player)
    {
     		if(game.game_play[1]==player&&game.game_play[2]==player&&game.game_play[3]==player) return true;
		else if(game.game_play[4]==player&&game.game_play[5]==player&&game.game_play[6]==player) return true;
		else if(game.game_play[7]==player&&game.game_play[8]==player&&game.game_play[9]==player) return true;
		else if(game.game_play[1]==player&&game.game_play[4]==player&&game.game_play[7]==player) return true;
		else if (game.game_play[2]==player&&game.game_play[5]==player&&game.game_play[8]==player) return true;
		else if (game.game_play[3]==player&&game.game_play[6]==player&&game.game_play[9]==player) return true;
		else if (game.game_play[1]==player&&game.game_play[5]==player&&game.game_play[9]==player) return true;
		else if (game.game_play[3]==player&&game.game_play[5]==player&&game.game_play[7]==player) return true;
		else return false;
       
    }

     function clearCanvas()
    {
        for(i=1;i<10;i++)
        {
            document.getElementById(i).innerHTML="";
        }
    }
});

