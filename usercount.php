<?php
// ** Begin userCount.php **//

//MySQL
$sql = new PDO('mysql:host=dbserver;dbname=dbname', 'dbuser', 'password');
if (!$sql) die("Nie mogę odnaleźć miejsca bazy danych, gdyż delta wyszła ujemna :C<br/>Przepraszam... Spróbuj później<br/><br/>Jak spotkasz wyszkolone delty, to przekaż im ten: DELTOBŁĄD#" . $sql->errorCode());


$timestamp=time();

$timeout=$timestamp-30;
$result = $_GET["result"];
$user = $_GET["user"];
$rpl = $sql->query("REPLACE INTO online (time,ip,result,user) VALUES ('$timestamp','$_SERVER[REMOTE_ADDR]', '$result', '$user')");
if(!$rpl) echo "DELTOBŁĄD#". $sql->errorCode();
$purge = $sql -> query("DELETE FROM online WHERE time < $timeout");
if(!$purge) echo "DELTOBŁĄD#".$sql->errorCode();
$res = $sql->query("SELECT COUNT(*) FROM online");
$maxres = $sql->query("SELECT MAX(result) FROM online");
$maxres = $maxres->fetchColumn();
$sqluser = $sql->query("SELECT user FROM online WHERE result=$maxres");
$sqluser = $sqluser->fetchColumn();
echo "|   Aktualnie grających: ".$res->fetchColumn()."  |  Najwyższy wynik wśród aktualnie grających: ".$maxres;
if($result) echo" (Gracz: ".$sqluser.")";
if($result>=$maxres && $result) echo "  |  BRAWO! Jesteś najlepszy/a wśród aktualnie grających!";

$sql = null; //close sql
?>