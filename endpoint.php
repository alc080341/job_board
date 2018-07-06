<?php

	include_once("connection.php");


	if(isset($_GET['request']))
	{

	$request = htmlspecialchars($_GET['request']);
	$order = htmlspecialchars($_GET['order']);

	$sql = "SELECT * FROM jobs ORDER BY date ".$order." LIMIT ".$request;
	$result = mysqli_query($dbconn, $sql) or die(mysqli_error());
	$json_array = array();
	while($row = mysqli_fetch_assoc($result))
	{
		$json_array[] = $row;
	}


		echo json_encode($json_array);
	}

