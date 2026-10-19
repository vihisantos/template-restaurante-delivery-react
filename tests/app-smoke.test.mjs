import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const app = await readFile(new URL('../src/App.tsx', import.meta.url), 'utf8')

test('the restaurant menu keeps its expected main categories', () => {
  for (const category of ['Entradas', 'Pratos Principais', 'Sobremesas', 'Bebidas']) {
    assert.ok(app.includes(`label: '${category}'`), `Missing menu category: ${category}`)
  }
})

test('external WhatsApp links use safe target attributes', () => {
  assert.match(app, /target="_blank" rel="noopener noreferrer"/)
})

test('theme and mobile navigation controls expose accessible state', () => {
  assert.match(app, /aria-label=\{dark \? 'Ativar tema claro' : 'Ativar tema escuro'\}/)
  assert.match(app, /aria-expanded=\{menuOpen\}/)
  assert.match(app, /aria-controls="mobile-navigation"/)
})

test('the mobile navigation has a stable accessible identifier', () => {
  assert.match(app, /id="mobile-navigation"/)
  assert.match(app, /aria-label="Navegação móvel"/)
})
