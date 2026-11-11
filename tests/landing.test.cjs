const test = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { Script } = require('node:vm');
const { join } = require('node:path');

const root = join(__dirname, '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const js = readFileSync(join(root, 'src/main.js'), 'utf8');
const css = readFileSync(join(root, 'src/style.css'), 'utf8');

test('all three subscription plans are visible in markup', () => {
  assert.ok(html.includes('id="pricing"'));
  for (const plan of ['starter', 'growth', 'enterprise']) {
    assert.ok(html.includes('data-plan="' + plan + '"'));
  }
});

test('landing scripts are bundled and syntactically valid', () => {
  assert.ok(html.includes('<script type="module" src="/src/main.js"></script>'));
  assert.equal(html.includes('<td>'), false);
  assert.doesNotThrow(() => new Script(js));
});

test('plan actions retain the selected plan', () => {
  assert.equal(html.includes('ai-todu-website/#/'), false);
  assert.equal(js.includes('WEB_APP_BASE_URL'), false);
  assert.ok(html.includes('id="selectedPlan"'));
  assert.ok(js.includes('selectedPlanInput.value = planKey'));
});

test('contact form does not pretend to submit to an API', () => {
  assert.ok(js.includes('mailto:contacto@ia-innovation.pe'));
  assert.equal(js.includes('Our B2B team will contact you shortly'), false);
});

test('unpublished videos are not misrepresented', () => {
  assert.equal(html.includes('dQw4w9WgXcQ'), false);
  assert.ok(html.includes('data-i18n="videos.productPending"'));
  assert.ok(html.includes('data-i18n="videos.teamPending"'));
});

test('keyboard access is available', () => {
  assert.ok(html.includes('class="skip-link" href="#main-content"'));
  assert.ok(css.includes('.skip-link:focus'));
  assert.ok(js.includes("event.key === 'Escape'"));
  assert.ok(js.includes('focusableSelector'));
});
