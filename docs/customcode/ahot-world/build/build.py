"""Build dist/aot-world.js (readable) and dist/aot-world.min.js from src/.
Usage: python3 build/build.py 0.1.0"""
import json, os, re, subprocess, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ver = sys.argv[1] if len(sys.argv) > 1 else '0.0.0-dev'
rd = lambda p: open(os.path.join(ROOT, p), encoding='utf-8').read()
css = rd('src/world.css') + '\n' + rd('src/extra.css') + '\n' + rd('src/card.css')
css = re.sub(r'/\*.*?\*/', '', css, flags=re.S)
css = re.sub(r'\s+', ' ', css).replace(' {', '{').replace('{ ', '{').replace('; ', ';').replace(' }', '}').strip()
html = re.sub(r'>\s+<', '><', rd('src/world.html').strip())
assets = json.loads(rd('build/assets.json'))
js = rd('src/world.js')
js = (js.replace('__CSS__', json.dumps(css, ensure_ascii=False))
        .replace('__HTML__', json.dumps(html, ensure_ascii=False))
        .replace('__WEBP__', json.dumps({k: {'u': v['u'], 'w': v['w'], 'h': v['h']} for k, v in assets['webp'].items()}))
        .replace('__PIP_LAMP__', json.dumps(assets['pipLamp']))
        .replace('__VERSION__', ver))
os.makedirs(os.path.join(ROOT, 'dist'), exist_ok=True)
out = os.path.join(ROOT, 'dist', 'aot-world.js')
open(out, 'w', encoding='utf-8').write(js)
mini = os.path.join(ROOT, 'dist', 'aot-world.min.js')
r = subprocess.run(['npx', '-y', 'esbuild@0.24.0', out, '--minify', '--target=es2019', '--outfile=' + mini, '--log-level=warning'],
                   capture_output=True, text=True)
if r.returncode:
    print(r.stderr); sys.exit(1)
import gzip
raw = open(mini, 'rb').read()
print(json.dumps({'version': ver, 'readable_kb': round(len(js) / 1000, 1), 'min_kb': round(len(raw) / 1000, 1),
                  'gzip_kb': round(len(gzip.compress(raw, 9)) / 1000, 1)}))
