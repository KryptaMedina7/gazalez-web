<?php defined('GAZALEZ_APP') || exit; ?>
<!doctype html>
<html lang="es-CL">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#edf3eb">
  <title><?= e($route['title']) ?></title>
  <meta name="description" content="<?= e($route['description']) ?>">
  <meta name="robots" content="<?= $config['indexable'] && $found ? 'index,follow' : 'noindex,nofollow' ?>">
  <?php if ($found): ?><link rel="canonical" href="<?= e(absolute_url($canonicalPath)) ?>"><?php endif; ?>
  <meta property="og:type" content="website">
  <meta property="og:locale" content="es_CL">
  <meta property="og:site_name" content="GAZALEZ">
  <meta property="og:title" content="<?= e($route['title']) ?>">
  <meta property="og:description" content="<?= e($route['description']) ?>">
  <meta property="og:url" content="<?= e(absolute_url($found ? $canonicalPath : '/404/')) ?>">
  <meta property="og:image" content="<?= e(absolute_url('/assets/materia-social.jpg')) ?>">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="<?= e(local_url('/assets/gazalez-logo.png')) ?>">
  <link rel="stylesheet" href="<?= e(local_url($assets['css'])) ?>">
  <script>history.scrollRestoration='manual';try{if(sessionStorage.getItem('gazalez-arrival')===location.pathname){document.documentElement.classList.add('page-arrival')}sessionStorage.removeItem('gazalez-arrival')}catch(e){}</script>
  <noscript><style>.brand-intro,.page-curtain,.process-playback,.process-replay,.header .menu-trigger{display:none!important}</style></noscript>
</head>
<body>
  <?php view('partials/intro'); ?>
  <div class="page-curtain" aria-hidden="true" data-phase="idle"><span class="page-curtain-panel"></span><span class="page-curtain-panel"></span><span class="page-curtain-panel"></span></div>
  <div id="content-effects" hidden></div>
  <a href="#contenido" class="skip-link">Saltar al contenido</a>
  <?php view('headers/' . $route['view']); ?>
  <noscript><nav class="php-fallback" aria-label="Navegación sin JavaScript"><?php foreach ($routes as $url => $item): if ($url === '/404/') continue; ?><a href="<?= e(local_url($url)) ?>"><?= e(str_replace(' | GAZALEZ', '', $item['title'])) ?></a><?php endforeach; ?></nav></noscript>
  <main id="contenido"><?php view('pages/' . $route['view']); ?></main>
  <?php view('partials/footer'); view('partials/social'); ?>
  <noscript><p class="php-fallback">Para realizar una consulta escribe a <a href="mailto:<?= e($config['email']) ?>"><?= e($config['email']) ?></a>.</p></noscript>
  <script type="application/json" id="gazalez-config"><?= json_encode(['basePath'=>$config['base_path'],'path'=>$found ? $canonicalPath : '/404/','email'=>$config['email']], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_UNICODE) ?></script>
  <script type="application/ld+json"><?= json_encode(['@context'=>'https://schema.org','@type'=>'Organization','name'=>'GAZALEZ','legalName'=>'Gazalez e Hija SpA','url'=>absolute_url('/'),'logo'=>absolute_url('/assets/gazalez-logo.png'),'taxID'=>'76.585.794-5','address'=>['@type'=>'PostalAddress','addressLocality'=>'Coronel','addressRegion'=>'Biobío','addressCountry'=>'CL']], JSON_HEX_TAG | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?></script>
  <script type="module" src="<?= e(local_url($assets['js'])) ?>"></script>
</body>
</html>
