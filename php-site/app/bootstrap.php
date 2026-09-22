<?php
declare(strict_types=1);
defined('GAZALEZ_APP') || exit;
$config = require __DIR__ . '/config.php';
$config['base_path'] = rtrim((string) $config['base_path'], '/');
if (!preg_match('~^(?:/[a-zA-Z0-9_-]+)*$~D', $config['base_path'])) {
    throw new RuntimeException('Invalid configured base_path');
}
if (!filter_var($config['url'], FILTER_VALIDATE_URL) || !in_array(parse_url($config['url'], PHP_URL_SCHEME), ['https', 'http'], true)) throw new RuntimeException('Invalid site URL');
if (!filter_var($config['email'], FILTER_VALIDATE_EMAIL)) throw new RuntimeException('Invalid contact email');
$routes = json_decode(file_get_contents(__DIR__ . '/routes.json'), true, 512, JSON_THROW_ON_ERROR);
$assets = json_decode(file_get_contents(__DIR__ . '/assets.json'), true, 512, JSON_THROW_ON_ERROR);
function e(string $value): string { return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
function local_url(string $value): string {
    global $config;
    return $config['base_path'] . $value;
}
function absolute_url(string $value): string {
    global $config;
    return rtrim($config['url'], '/') . local_url($value);
}
function view(string $relative): void {
    global $config;
    ob_start();
    require dirname(__DIR__) . '/views/' . $relative . '.php';
    $html = ob_get_clean();
    // Restrict rewriting to root-relative HTML URLs; never rewrite external URLs or fragment IDs.
    if ($config['base_path'] !== '') $html = preg_replace_callback('~\b(href|src|srcset|action)="(/(?!/)[^"]*)"~', fn($m) => $m[1] . '="' . e(local_url(html_entity_decode($m[2], ENT_QUOTES, 'UTF-8'))) . '"', $html);
    echo $html;
}
header('X-Content-Type-Options: nosniff');
header('Referrer-Policy: strict-origin-when-cross-origin');
header('X-Frame-Options: SAMEORIGIN');
if (!$config['indexable']) header('X-Robots-Tag: noindex, nofollow');
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if (!in_array($method, ['GET', 'HEAD'], true)) { http_response_code(405); header('Allow: GET, HEAD'); exit; }
$requestPath = parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
if (!is_string($requestPath) || preg_match('~%(?![a-fA-F0-9]{2})~', $requestPath)) { http_response_code(400); exit; }
$decoded = rawurldecode($requestPath);
if (str_contains($decoded, "\0") || str_contains($decoded, '\\') || preg_match('~(?:^|/)\.{1,2}(?:/|$)~', $decoded)) { http_response_code(400); exit; }
$base = $config['base_path'];
if ($base !== '' && $decoded !== $base && !str_starts_with($decoded, $base . '/')) { http_response_code(404); exit; }
$path = $base === '' ? $decoded : substr($decoded, strlen($base));
if ($path === '/robots.txt') {
    header('Content-Type: text/plain; charset=utf-8');
    echo "User-agent: *\n" . ($config['indexable'] ? "Allow: /\n" : "Disallow: /\n") . 'Sitemap: ' . absolute_url('/sitemap.xml') . "\n"; exit;
}
if ($path === '/sitemap.xml') {
    header('Content-Type: application/xml; charset=utf-8');
    echo '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    foreach ($routes as $route => $_) if ($route !== '/404/') echo '<url><loc>' . e(absolute_url($route)) . '</loc></url>';
    echo '</urlset>'; exit;
}
$canonicalPath = $path === '' || $path === '/' || $path === '/index.php' ? '/' : '/' . trim($path, '/') . '/';
$found = isset($routes[$canonicalPath]) && $canonicalPath !== '/404/';
if ($found && $path !== $canonicalPath) {
    $query = $_SERVER['QUERY_STRING'] ?? '';
    header('Location: ' . local_url($canonicalPath) . ($query !== '' ? '?' . $query : ''), true, 301); exit;
}
$route = $found ? $routes[$canonicalPath] : $routes['/404/'];
if (!$found) http_response_code(404);
header('Content-Type: text/html; charset=utf-8');
if ($method === 'HEAD') exit;
require dirname(__DIR__) . '/views/layout.php';
