$(document).ready(function(){     
function TicTacToe() {
      this.turn=1;
      this.X_play=[".",".",".",".",".",".",".",".", ".", "."];
      this.Y_play=[".",".",".",".",".",".",".",".", ".", "."];
      this.res=false;
      $("#op").hide();
      $("#xp").show();
    }
    
        this.socket = io();
        var self = this;
        var socket = this.socket;
 
     // ******for player Y join the socket room with X using unique token
        socket.on('connect', function() {
            var token = location.href.split('/')
            socket.emit('token', token[token.length -1]);
            socket.emit('opponent_joined', token[token.length -1]);
        });
 
        socket.on('opponent_dropped', function() {
            alert("opponent left the game :(");
        });

 // update the game with opponent's move information
        socket.on('move', function(data){
            game.X_play[data.play]="X";
            game.turn+=1; 
	    $("#xp").toggle();
            $("#op").toggle();
            game.res= seeifWins("X");
            if(game.res)
            {
               // alert("X Won!");
		$("ul").append("<li>X Won!</li>")
                game = new TicTacToe();
                clearCanvas()
                $("span").css("background-color","white");
            }
 	    else
        	{
			var spn_id = "";
			spn_id = spn_id.concat(data.play);
			document.getElementById(spn_id).innerHTML="<b>X</b>";
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
        if(game.X_play[this.id]=="X"||game.Y_play[this.id]=="Y") return;
        if(game.turn%2==0)
        {
            document.getElementById(this.id).innerHTML="<b>O</b>";
            game.Y_play[this.id]="Y";
             socket.emit('move', { play: this.id }); // send game data to opponent
            game.res= seeifWins("Y");
            if(game.res)
                {
               // alert("O Won!");
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
        else
        {
            alert("opponents's turn");
            return;  
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
        if(player=="X")
        {
           if(game.X_play[1]=="X"&&game.X_play[2]=="X"&&game.X_play[3]=="X") return true;
           else if(game.X_play[4]=="X"&&game.X_play[5]=="X"&&game.X_play[6]=="X") return true;
            else if(game.X_play[7]=="X"&&game.X_play[8]=="X"&&game.X_play[9]=="X") return true;
            else if(game.X_play[1]=="X"&&game.X_play[4]=="X"&&game.X_play[7]=="X") return true;
            else if (game.X_play[2]=="X"&&game.X_play[5]=="X"&&game.X_play[8]=="X") return true;
            else if (game.X_play[3]=="X"&&game.X_play[6]=="X"&&game.X_play[9]=="X") return true;
            else if (game.X_play[1]=="X"&&game.X_play[5]=="X"&&game.X_play[9]=="X") return true;
            else if (game.X_play[3]=="X"&&game.X_play[5]=="X"&&game.X_play[7]=="X") return true;
            else return false;
        }
        
        else
        {
           if(game.Y_play[1]=="Y"&&game.Y_play[2]=="Y"&&game.Y_play[3]=="Y") return true;
           else if (game.Y_play[4]=="Y"&&game.Y_play[5]=="Y"&&game.Y_play[6]=="Y") return true;
            else if (game.Y_play[7]=="Y"&&game.Y_play[8]=="Y"&&game.Y_play[9]=="Y") return true;
            else if (game.Y_play[1]=="Y"&&game.Y_play[4]=="Y"&&game.Y_play[7]=="Y") return true;
            else if (game.Y_play[2]=="Y"&&game.Y_play[5]=="Y"&&game.Y_play[8]=="Y") return true;
            else if (game.Y_play[3]=="Y"&&game.Y_play[6]=="Y"&&game.Y_play[9]=="Y") return true;
            else if (game.Y_play[1]=="Y"&&game.Y_play[5]=="Y"&&game.Y_play[9]=="Y") return true;
            else if (game.Y_play[3]=="Y"&&game.Y_play[5]=="Y"&&game.Y_play[7]=="Y") return true;
            else return false;
        }
    }
    
    function clearCanvas()
    {
        for(i=1;i<10;i++)
        {
            document.getElementById(i).innerHTML="";
        }
    }

});
