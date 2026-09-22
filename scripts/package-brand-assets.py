"""Package existing Gazalez brand assets without modifying their artwork."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
import hashlib
import json

root = Path(__file__).resolve().parents[1]
output = root / 'releases' / 'gazalez-logos-favicon.zip'
assets = root / 'public' / 'assets'
files = {
    'logos/gazalez-logo.png': (assets / 'gazalez-logo.png').read_bytes(),
    'logos/gazalez-holding-group.svg': (assets / 'gazalez-holding-group.svg').read_bytes(),
    'favicon/favicon.png': (assets / 'gazalez-logo.png').read_bytes(),
}
readme = '''# Logos y favicon de Gazalez

- logos/gazalez-logo.png: logo principal original utilizado en el sitio.
- logos/gazalez-holding-group.svg: composicion de Gazalez Holding Group utilizada en el sitio. Incluye imagen y tipografia incrustadas; no requiere archivos externos. El simbolo incrustado es raster, no un trazado vectorial.
- favicon/favicon.png: copia exacta del logo principal, que es la imagen utilizada actualmente como favicon. No es un ICO ni una version reducida.

El archivo antiguo gazal-logo.png es identico a gazalez-logo.png y se omite para evitar duplicados y mantener el nombre Gazalez.

## Incorporacion al ZIP de PHP

Los dos logos ya forman parte de public_html/assets/ en el paquete del sitio.
Si prefieres un nombre dedicado para el favicon, copia favicon/favicon.png a public_html/assets/favicon.png y cambia el enlace de icono en gazalez-private/views/layout.php a:

<link rel="icon" type="image/png" href="<?= e(local_url('/assets/favicon.png')) ?>">

Tambien puedes mantener la configuracion actual, que apunta a /assets/gazalez-logo.png.
Este paquete complementario no reemplaza los archivos PHP ni cambia las animaciones.
SHA256.json permite comprobar que los archivos originales se conservaron intactos.
'''
output.parent.mkdir(exist_ok=True)
with ZipFile(output, 'w', ZIP_DEFLATED) as archive:
    for name, data in files.items():
        archive.writestr(name, data)
    archive.writestr('LEEME.md', readme.encode('utf-8'))
    archive.writestr('SHA256.json', json.dumps({name: hashlib.sha256(data).hexdigest() for name, data in files.items()}, indent=2))
with ZipFile(output) as archive:
    assert archive.testzip() is None
    for name, data in files.items():
        assert archive.read(name) == data
print(json.dumps({'zip': str(output), 'files': len(files), 'bytes': output.stat().st_size}, indent=2))
