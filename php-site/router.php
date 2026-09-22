<?php
// Local PHP development only. Never upload this router as the production entrypoint.
declare(strict_types=1);
$path = rawurldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/');
$localConfig = is_file(__DIR__ . '/app/config.local.php') ? require __DIR__ . '/app/config.local.php' : [];
$base = rtrim($localConfig['base_path'] ?? (getenv('GAZALEZ_BASE_PATH') ?: ''), '/');
if ($base !== '' && str_starts_with($path, $base . '/')) $path = substr($path, strlen($base));
$public = realpath(__DIR__ . '/public');
if (preg_match('~(?:^|/)\.~', $path)) { http_response_code(404); exit; }
$file = realpath($public . $path);
if ($file !== false && str_starts_with($file, $public . DIRECTORY_SEPARATOR) && is_file($file) && strtolower(pathinfo($file, PATHINFO_EXTENSION)) !== 'php') {
    $types = ['js'=>'application/javascript','css'=>'text/css','svg'=>'image/svg+xml','png'=>'image/png','jpg'=>'image/jpeg','webp'=>'image/webp','woff2'=>'font/woff2','ico'=>'image/x-icon'];
    header('Content-Type: ' . ($types[pathinfo($file, PATHINFO_EXTENSION)] ?? 'application/octet-stream'));
    readfile($file); return true;
}
require __DIR__ . '/public/index.php';
