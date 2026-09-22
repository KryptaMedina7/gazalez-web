"""Create a self-contained cPanel ZIP without Node modules, sources or local config."""
from pathlib import Path
import hashlib
import json
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1]
site = root / 'php-site'
output = root / 'releases'
output.mkdir(exist_ok=True)
zip_path = output / 'gazalez-php-benzahosting.zip'
manifest = {}
with ZipFile(zip_path, 'w', ZIP_DEFLATED) as archive:
    for folder, destination in [('public', 'public_html'), ('app', 'gazalez-private/app'), ('views', 'gazalez-private/views')]:
        for file in sorted((site / folder).rglob('*')):
            if not file.is_file() or file.name == 'config.local.php':
                continue
            relative = f'{destination}/{file.relative_to(site / folder).as_posix()}'
            data = file.read_bytes()
            manifest[relative] = hashlib.sha256(data).hexdigest()
            archive.writestr(relative, data)
    archive.write(site / 'README.md', 'INSTALACION.md')
    archive.writestr('SHA256.json', json.dumps(manifest, indent=2))
with ZipFile(zip_path) as archive:
    assert archive.testzip() is None
    assert 'public_html/.htaccess' in archive.namelist()
    assert 'gazalez-private/app/config.local.php' not in archive.namelist()
print(json.dumps({'zip': str(zip_path), 'files': len(manifest), 'bytes': zip_path.stat().st_size}, indent=2))
