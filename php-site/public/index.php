<?php
declare(strict_types=1);
define('GAZALEZ_APP', true);
// For cPanel, keep app/ and views/ outside public_html, together in gazalez-private/.
$private = getenv('GAZALEZ_PRIVATE_DIR') ?: (is_file(dirname(__DIR__) . '/gazalez-private/app/bootstrap.php') ? dirname(__DIR__) . '/gazalez-private' : dirname(__DIR__));
require $private . '/app/bootstrap.php';
