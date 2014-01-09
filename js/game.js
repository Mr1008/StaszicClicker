
	var Game = {}
	Game.init = function(){
	this.debug = false;
	//Zaczynam ładować...
	var version = "0.95β";
	this.interval = 50;
	this.active = true;
	this.title2 = "Staszic Clicker " + "v." + version;
	var p_ver = document.getElementById("p_verid");
	p_ver.innerHTML = version;
	this.username = '';
	this.res_div = document.getElementById("div_res");
	this.result = 0;
	this.floatresult = 0;
	this.date = new Date();
	this.itemlist = ['n1', 'n2', 'n3', 'n4', 'n5', 'n6', 'n7', 'n8', 'n9', 'n10'];
	this.items ={
	
	n1:
		{
		name:"Sprzątaczka",
		desc:"Czo to ta delta?!",
		przel:0.5,
		cena:100,
		},
	n2:
		{
		name:"Kroczkowa",
		desc:"Szybciej, bo się spaźnisz!",
		przel:3,
		cena:500,
		},
	n3:
		{
		name:"Jaworska",
		desc:"Delta! Proszę!",
		przel:9,
		cena:1500,
		},
	n4:
		{
		name:"Kuciński",
		desc:"Sorry chłopaki, ujemna...",
		przel:27,
		cena:3000,
		},
	n5:
		{
		name:"Tryka",
		desc:"Paweł! Delta!",
		przel:81,
		cena:6000,
		},
	n6:
		{
		name:"Bonarska",
		desc:"Poczyńmy założenie...",
		przel:243,
		cena:60000,
		},
	n7:
		{
		name:"Marcowa",
		desc:"Jesteś nikim bez trójmianu.",
		przel:729,
		cena:600000,
		},
	n8:
		{
		name:"Legara",
		desc:"Delta - 8 godzin dziennie.",
		przel:2187,
		cena:10000000,
		},
	n9:
		{
		name:"Nowak",
		desc:"Po co wstajesz?! Ja już wynik mam.",
		przel:6561,
		cena:50000000,
		},
	n10:
		{
		name:"Monkos",
		desc:"Nakurwiam deltę!",
		przel:100000,
		cena:100000000,
		},
		
	
	} //Elementy sklepu
	this.itemamount = new Array(); // ilości
	this.fixItemsWidth = function()
	{
		var dl = 0;
		for(var i = 0; i<Game.itemlist.length;i++)
		{
			if(Game.items[Game.itemlist[i]].desc.length > dl) dl = Game.items[Game.itemlist[i]].desc.length;
		}
		for(var i = 0; i < Game.itemlist.length; i++)
		{
			var a = 'descnr' + (i+1).toString();
			document.getElementById(a).setAttribute('style','width:'+(dl*7).toString()+'px;');
		}
	}
	this.renderItems = function(){
	//document.getElementById('delta').innerHTML = 'Δ';
	var par = document.getElementById('wynik');
	var dpsDiv = document.createElement('div');
	dpsDiv.setAttribute('id','dps');
	par.appendChild(dpsDiv);
	
	for(var i = 0; i < this.itemlist.length; i++)
		{
		document.getElementById("shop").innerHTML += ("<div id=\"nr"+(i+1).toString() + "\" class=\"on_nauczyciel\">" + Game.items[Game.itemlist[i]].name 
		+ "<span id=\"spannr"+(i+1).toString() + "\" class=\"on_nauczyciel\">0</span>" 
		+ "<div id=\"descnr"+(i+1).toString() + "\" class=\"nauczyciel_desc\"></div>"
		+ "<div id=\"pricenr"+(i+1).toString() + "\" class=\"nauczyciel_price\"></div>"
		+ "</div>").toString();
		document.getElementById(("descnr"+(i+1).toString())).innerHTML = Game.items[Game.itemlist[i]].desc;
		
		
		}
		var rst = document.createElement('a');
		rst.innerHTML = 'Zresetuj postęp';
		rst.id = 'resetbtn';
		rst.setAttribute('onClick', 'Game.reset();');
		document.getElementById('game').appendChild(rst);
		var stopka = document.createElement('a');
		stopka.innerHTML ="Created with love by Eltu (C)2013";
		stopka.setAttribute('style','left:auto;right:3px;text-decoration:none;color:#fff;');
		stopka.setAttribute('href', 'mailto:eltu@linux.pl');
		stopka.setAttribute('id','resetbtn');
		document.getElementById('game').appendChild(stopka);
		///////CHAT/////////
		Game.makeChat();
		////////////////////
		Game.fixItemsWidth();
		document.oncontextmenu = function(){return false;}; //BEZ MENU
		document.onselectstart = function(){return false;}; //BEZ SELECT
		
		
		$(".on_nauczyciel[id^='nr']").click(function(){
		var at = $(this).attr("id");
		if($(this).attr('class')=='on_nauczyciel')
		Game.itemClicked(at);
	});
		
		
	}
	this.makeChat = function()
	{
		var chatArea = document.createElement("div");
		chatArea.setAttribute('id','chatArea');
		document.getElementById('game').appendChild(chatArea);
		chatArea.innerHTML = 'Chat';
		var chatTextArea = document.createElement("div");
		chatTextArea.setAttribute('id','chatTextArea');
		document.getElementById('chatArea').appendChild(chatTextArea);
		var chatForm = document.createElement('form');
		chatForm.setAttribute('id','chatForm');
		chatForm.setAttribute('action','javascript:Game.sendChat();');
		document.getElementById('chatArea').appendChild(chatForm);
		var chatText = document.createElement('input');
		chatText.setAttribute('type','text');
		chatText.setAttribute('id','chatText');
		chatText.setAttribute('name','string');
		chatText.setAttribute('autocomplete','off');
		document.getElementById('chatForm').appendChild(chatText);
		var chatSend = document.createElement('input');
		chatSend.setAttribute('type','button');
		chatSend.setAttribute('id','chatSubmit');
		chatSend.setAttribute('onClick','Game.sendChat();');
		chatSend.setAttribute('value','Wyślij');
		document.getElementById('chatForm').appendChild(chatSend);
		var textcont = document.createElement('div');
		textcont.setAttribute('class','content');
		document.getElementById('chatTextArea').appendChild(textcont);
		
		$('#chatTextArea').perfectScrollbar(
		{
		suppressScrollX: true,
		}
		);
		Game.updateChat();
		
	}
	
	this.updateChat = function()
	{
	$('.content').load("chat.php?mode=rec");
	$("#chatTextArea").scrollTop( $( "#chatTextArea" ).prop( "scrollHeight" ) );
	$("#chatTextArea").perfectScrollbar('update');
	setTimeout(function(){Game.updateChat();},2000);
	
	}
	
	this.sendChat = function()
	{	
		var text = $('#chatText').val();
		$.ajax({
            type: "POST",
            url: "chat.php?mode=send&user="+Game.username,
            data: {data:text},
            cache: false,
        });
		$('#chatText').val('');
		$("#chatTextArea").scrollTop( $( "#chatTextArea" ).prop( "scrollHeight" ) );
		$("#chatTextArea").perfectScrollbar('update');
	}
	
	this.getItemAmount = function(id)
	{
	return Game.itemamount[id];
	}
	
	this.getItemPrice = function(id)
	{
	var cena = Game.items[Game.itemlist[id]].cena;
	for(var i = 0; i<Game.getItemAmount(id);i++)
	{
	cena += 0.2*cena;
	}
	return Math.round(cena);
	}
	
	this.getItemPower = function(id)
	{
	var moc = Game.items[Game.itemlist[id]].przel;
	for(var i = 0; i<Game.getItemAmount(id);i++)
	{
	moc += 0.1*moc;
	}
	return Math.round(moc*100)/100; 
	}
	
	this.itemAmountUpdate = function()
	{
	for(var i = 0; i < Game.itemlist.length; i++)
	{
	var id = "spannr" + (i+1).toString();
	document.getElementById(id).innerHTML = Game.getItemAmount(i).toString();
	document.getElementById(("pricenr"+(i+1).toString())).innerHTML = "Cena: " + Game.getItemPrice(i).toString() + ' Δ';
	if(Game.result < Game.getItemPrice(i))
	{
		document.getElementById("nr"+(i+1).toString()).setAttribute("class", "nauczyciel");
		document.getElementById("spannr"+(i+1).toString()).setAttribute("class", "nauczyciel");
	}
	else
	{	
		document.getElementById("nr"+(i+1).toString()).setAttribute("class","on_nauczyciel");
		document.getElementById("spannr"+(i+1).toString()).setAttribute("class", "on_nauczyciel");
	}
	}
	}	
	
	this.update = function()
	{
	if(Game.debug) Game.floatresult++;
	
	Game.result = Math.round(Game.floatresult);
	Game.itemJob();
	Game.res_div.innerHTML = Game.result.toString()+' Δ';
	Game.itemAmountUpdate();
	
	Game.save();
	}
	
	this.itemJob = function()
	{
	var dpsTemp = 'Δ/s = ';
	var dps = 0;
	
		for(var i = 0;i < Game.itemlist.length ; i++)
		{
			if(Game.getItemAmount(i)>0)
			{
				var add;
				add = (Game.getItemPower(i)/(1000/Game.interval))*Game.getItemAmount(i);
				var tempDate = new Date();
				var elapsedTime = (tempDate.getTime() - Game.date.getTime());
				if(Game.active == false && elapsedTime > Game.interval)
				{
				Game.floatresult += add*(elapsedTime/Game.interval);
				
				}
				else
				Game.floatresult+=add;
				Game.floatresult = Math.round(Game.floatresult * 100) / 100
				dps += add*20;
			}
		}
		Game.date = new Date();
	document.getElementById('dps').innerHTML = dpsTemp + Math.round(dps * 100) / 100;
	
	}
	
	this.makeAmountArray = function()
	{
		for(var i = 0; i < this.itemlist.length ; i++)
		{
			this.itemamount[i] = 0;
		}
	}
	
	this.itemClicked = function(id)
	{
	var temp = id.split('r')[1];
	Game.floatresult -= Game.getItemPrice(temp-1);
	Game.itemamount[temp-1] = Game.getItemAmount(temp-1)+1;
	}
	
	
	this.setjQuery = function()
	{
	$(document).ready(function()
	{
	 $('#game').fadeIn(1500);
	 Game.counter();
	});
	$("#delta").click(function(){
		var left = Math.floor($('#leftgame').width()-$('#shop').width()/5)/2 + (Math.random()*(40+40)-40);
        var top = Math.floor($('#leftgame').height() )/2;
		var random = Math.floor(Math.random()*1000);

		$("#leftgame").append('<div id="button" style="left:'+left+'px; top:'+top+'px" numer="'+random+'" class="plus">+1</div>');
		setTimeout(function(){
        $('.plus[numer='+random+']').remove();
		}, 500);
		
		Game.floatresult++;});
	}
	
	this.counter = function()
	{	
	var uri = "usercount.php?result="+Game.result.toString();
	$.ajax({
	url: uri,
	})
	.done(function(data) {
	$('#counter').html(data);
	setTimeout(function(){Game.counter();}, 5000);
	});	
	}
	
	this.save = function()
	{
	localStorage.result = Game.result;
	localStorage.bought = JSON.stringify(this.itemamount);
	localStorage.username = Game.username;
	}
	
	
	this.load = function()
	{
	Game.floatresult = parseFloat(localStorage.result);
	Game.itemamount = JSON.parse(localStorage.bought);
	if(localStorage.username==null) Game.askNick();
	else Game.username = localStorage.username;
	
	}
	
	this.reset = function()
	{
	
	var a = confirm("Czy na pewno chcesz zresetować cały swój postęp poczyniony w tej zacnej gierce?");
	if(a == true){
	clearInterval(Game.petla);
	//localStorage.removeItem('result');
	//localStorage.removeItem('bought');
	localStorage.clear();
	location.reload();
	}
	}
	
	this.titleUpdate = function(){return setInterval(function(){document.title = 'Wynik: '+Game.result+' Δ - Staszic Clicker';},Game.interval);}
	
	this.askNick = function()
	{
	var nick = prompt("Podaj nick, jakiego chcesz używać w czacie i leaderboard(TODO)","Gracz");
	if(nick)
	{
		if(nick.length<=10)
		Game.username = nick;
		else
		{
		alert('Twój nick może mieć max 10 znaków');
		do
		{
		var nick = prompt("Podaj nick, jakiego chcesz używać w czacie i leaderboard(TODO)","Gracz");
		if(nick.length>10) alert('Twój nick może mieć max 10 znaków');
		}while(nick.length>10);
		Game.username = nick;
		}
		document.title = Game.title2;
	}
	else
	{
	location.reload();
	}
	
	}
	
	this.makeAmountArray();
	if(localStorage.result!=null){if(localStorage.result>0)this.load();} // ładowanie SAVE
	if(localStorage.username == null)Game.askNick();
	else Game.username = localStorage.username;
	this.setjQuery();
	this.renderItems(); //Rysowanie sklepu
	this.blurredHandle = 0;
	
	window.addEventListener('focus', function() {
	Game.active = true;
	clearInterval(Game.blurredHandle);
    document.title = Game.title2;
	},false);

	window.addEventListener('blur', function() {
	Game.active = false;
	Game.blurredHandle = Game.titleUpdate();
	},false);
	this.petla = setInterval(function(){Game.update()},Game.interval);
	}
	
	$(function(){
	$(document).ready(function(){
	console.log("|==========Staszic Clicker==========|");
	console.log("|Czego tutaj szukasz spryciarzu?! ;>|");
	console.log("|===================================|");
	console.log("Made with love by Eltu (C)2013");
	Game.init();})}); //ŁADOWANIE JQUERY