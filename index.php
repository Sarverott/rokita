<?php
	include "extra-functions.php";
	include "main-proc.php";
?>
<!DOCTYPE html>
<html>
	<head>
		<title></title>
		<link href="css/main.css" rel="stylesheet">
		<script src="js/ajax-api-functions.js"></script>
		<script src="js/header.js"></script>
		<script src="js/explorer.js"></script>
		<script src="js/file-editor.js"></script>
		<script src="js/new-item-dialog.js"></script>
		<script src="js/system.js"></script>
		<script src="js/main.js"></script>
	</head>
	<body>
		<?php include "interface-includes/loading-screen.html"; ?>
		<div class="container">
			<header>
				<center>
					<div class="inner-header">
						<h1>ROKITA</h1>
						<div class="header-buttons-container">
							<button class="header-button indoor-link" cardname="explorer">EXPLORER</button>
							<button class="header-button indoor-link" cardname="system">SYSTEM</button>
							<button class="header-button outdoor-link" location="https://drive.google.com/file/d/1yBN6vVjO3HCpFTcwn9rlhhd1JWgvSool/view?usp=sharing">DOCUMENTATION</button>
							<button class="header-button indoor-link" cardname="guide">GUIDE</button>
							<button class="header-button outdoor-link" location="http://github.com/Sarverott/rokita">REPOSITORY</button>
						</div>
					</div>
				</center>
			</header>
			<main>
				<?php include "interface-includes/explorer.html"; ?>
				<?php include "interface-includes/evaluate.html"; ?>
				<?php include "interface-includes/execute.html"; ?>
				<?php include "interface-includes/server-vars.html"; ?>
				<?php include "interface-includes/system.html"; ?>
				<?php include "interface-includes/new-item.html"; ?>
				<?php include "interface-includes/guide.html"; ?>
				<?php include "interface-includes/edit.html"; ?>
			</main>
			<footer>
				visit my <a target="_blank" href="http://github.com/Sarverott">GitHub</a>
			</footer>
		</div>
	</body>
</html>
