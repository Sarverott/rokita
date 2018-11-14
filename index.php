<?php
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
		<script src="js/main.js"></script>
	</head>
	<body>
		<?php include "interface-includes/loading-screen.html"; ?>
		<div class="container">
			<header>
				<h1>Xp-lor-php</h1>
				<div class="header-buttons-container">
					<button class="header-button indoor-link" cardname="explorer">EXPLORER</button>
					<button class="header-button indoor-link" cardname="system">SYSTEM</button>
					<button class="header-button outdoor-link" location="resources/doc.pdf">DOCUMENTATION</button>
					<button class="header-button indoor-link" cardname="guide">GUIDE</button>
					<button class="header-button outdoor-link" location="">REPOSITORY</button>
				</div>
			</header>
			<main>
				<?php include "interface-includes/explorer.html"; ?>
				<?php include "interface-includes/edit.html"; ?>
				<?php include "interface-includes/system.html"; ?>
				<?php include "interface-includes/guide.html"; ?>
			</main>
			<footer>
				visit my <a target="_blank" href="http://github.com/Sarverott">GitHub</a>
			</footer>
		</div>
	</body>
</html>
grzegorz.sladowski@sltzn.katowice.pl
