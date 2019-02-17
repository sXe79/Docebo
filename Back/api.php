<?php

require_once 'vendor/autoload.php';

use Docebo\Api;

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

$api = new Api($_GET);

echo $api->results();