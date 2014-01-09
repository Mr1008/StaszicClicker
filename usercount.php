<?php
// ** Begin userCount.php **//

//MySQL
$sql = new PDO('mysql:host=dbserver;dbname=dbname', 'dbuser', 'password');
if (!$sql) die("Nie mogę odnaleźć miejsca bazy danych, gdyż delta wyszła ujemna :C<br/>Przepraszam... Spróbuj później<br/><br/>Jak spotkasz wyszkolone delty, to przekaż im ten: DELTOBŁĄD#" . $sql->errorCode());


$timestamp=time();

$timeout=$timestamp-30;
$result = $_GET["result"];
$rpl = $sql->query("REPLACE INTO online (time,ip,result) VALUES ('$timestamp','$_SERVER[REMOTE_ADDR]', '$result')");
if(!$rpl) echo "DELTOBŁĄD#". $sql->errorCode();
$purge = $sql -> query("DELETE FROM online WHERE time < $timeout");
if(!$purge) echo "DELTOBŁĄD#".$sql->errorCode();
$res = $sql->query("SELECT COUNT(*) FROM online");
$maxres = $sql->query("SELECT MAX(result) FROM online");
$maxres = $maxres->fetchColumn();
echo "|   Aktualnie grających: ".$res->fetchColumn()."  |  Najwyższy wynik wśród aktualnie grających: ".$maxres;
if($result>=$maxres && $result != 0) echo "  |  BRAWO! Jesteś najlepszy/a wśród aktualnie grających!";

$sql = null; //close sql
?>