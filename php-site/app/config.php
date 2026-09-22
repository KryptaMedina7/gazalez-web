<?php
declare(strict_types=1);
defined('GAZALEZ_APP') || exit;
$defaults = [
    'url' => 'https://www.empresasgazalez.cl',
    'base_path' => getenv('GAZALEZ_BASE_PATH') ?: '',
    'email' => 'contacto@empresagazalez.cl',
    'indexable' => false,
];
$local = __DIR__ . '/config.local.php';
return is_file($local) ? array_replace($defaults, require $local) : $defaults;
