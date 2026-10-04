import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import ts from 'typescript';

const source = await readFile('src/lib/navigation.ts', 'utf8');
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
const { activeNavigationGroup } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);

test('cross-listed destinations have one primary group; nutrition children retain theirs', () => {
  for (const [route, group] of [
    ['/innovacion/', 'Innovación'], ['/innovacion/hidrobac/', 'Innovación'],
    ['/soluciones/bioprocesos/', 'Innovación'], ['/soluciones/', 'Soluciones'],
    ['/soluciones/nucleos-proteicos/', 'Soluciones'], ['/soluciones/formulacion-tecnica', 'Soluciones'],
    ['/empresa/', 'Empresa'], ['/preguntas-frecuentes/?tema=calidad', 'Empresa'],
    ['/contacto/', undefined], ['/', undefined], ['/innovacion-futura/', undefined],
  ]) assert.equal(activeNavigationGroup(route), group, route);
});

test('section welcomes belong only to the three approved destinations', async () => {
  const source = await readFile('src/lib/section-intros.ts', 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } });
  const { getSectionIntro } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);
  assert.equal(getSectionIntro('/soluciones/nutricion-animal').film, 'avicola');
  assert.equal(getSectionIntro('/soluciones/nucleos-proteicos/').film, 'nucleos');
  assert.equal(getSectionIntro('/innovacion/').film, 'innovacion');
  for (const path of ['/', '/innovacion/hidrobac/', '/soluciones/', '/soluciones/bioprocesos/'])
    assert.equal(getSectionIntro(path), undefined, path);
});
