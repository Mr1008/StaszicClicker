<?php
//CHAT MODULE FOR STASZIC CLICKER BY ELTU (C)2013
$mode = $_GET["mode"];
switch($mode)
{
case "rec":
	$timestamp = time();
	$timeout = $timestamp - 300;
	$sql = new PDO('mysql:host=dbserver;dbname=dbname', 'dbuser', 'password');
	if (!$sql) die("Nie mogę odnaleźć miejsca bazy danych, gdyż delta wyszła ujemna :C<br/>Przepraszam... Spróbuj później<br/><br/>Jak spotkasz wyszkolone delty, to przekaż im ten: DELTOBŁĄD#" . $sql->errorCode());
	$purge = $sql -> query("DELETE FROM chat WHERE time < $timeout");
	if(!purge) "DELTOBŁĄD#".$sql->errorCode();
	$table = $sql -> query('SELECT user, tresc FROM chat ORDER BY time');
	if(!$table){ 
	echo "DELTOBŁĄD#".$sql->errorCode();
	die;
	}
	$user = array();
	$text = array();
	
	for($i = 0;$result = $table -> fetch(PDO::FETCH_ASSOC);$i++)
	{
	//$user[$i] = $result[user];
	//$text[$i] = $result[tresc];
	echo "<strong>$result[user]</strong>: $result[tresc]<br/>";
	}
	/*$user = array_reverse($user);
	$text = array_reverse($text);
	for($i=0;$i<count($text);$i++)
	{
	echo "<strong>$user[$i]</strong>: $text[$i]<br/>";
	}*/
	$sql = null;
break;
case "send":
	$timestamp = time();
	if($_POST['data'] == '') die;
	$sql = new PDO('mysql:host=dbserver;dbname=dbname', 'dbuser', 'password');
	if (!$sql) die("Nie mogę odnaleźć miejsca bazy danych, gdyż delta wyszła ujemna :C<br/>Przepraszam... Spróbuj później<br/><br/>Jak spotkasz wyszkolone delty, to przekaż im ten: DELTOBŁĄD#" . $sql->errorCode());
	$insert = $sql -> query("INSERT INTO chat(time,user,tresc) VALUES('$timestamp','$_GET[user]','$_POST[data]')");
	if(!insert) echo "DELTOBŁĄD#".$sql->errorCode();
	$sql = null;
break;
default:
	header("Refresh:5; URL=index.php");
	echo 'CHAT MODULE FOR STASZIC CLICKER BY ELTU (C)2013<br/>Czego tu szukasz spryciarzu?! ;> <br/>Wygrywasz ciasteczko :)';
break;
}
?>