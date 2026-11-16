"""Build dist/aot-switch.js (readable) and dist/aot-switch.min.js from src/switch.js.
Usage: python3 build/build.py 1.0.0"""
import gzip, json, os, subprocess, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ver = sys.argv[1] if len(sys.argv) > 1 else '0.0.0-dev'
js = open(os.path.join(ROOT, 'src', 'switch.js'), encoding='utf-8').read().replace('__VERSION__', ver)
os.makedirs(os.path.join(ROOT, 'dist'), exist_ok=True)
out = os.path.join(ROOT, 'dist', 'aot-switch.js'); open(out, 'w', encoding='utf-8').write(js)
mini = os.path.join(ROOT, 'dist', 'aot-switch.min.js')
r = subprocess.run(['npx', '-y', 'esbuild@0.24.0', out, '--minify', '--target=es2017', '--outfile=' + mini, '--log-level=warning'], capture_output=True, text=True)
if r.returncode: print(r.stderr); sys.exit(1)
raw = open(mini, 'rb').read()
print(json.dumps({'version': ver, 'readable_kb': round(len(js) / 1000, 1), 'min_kb': round(len(raw) / 1000, 1), 'gzip_kb': round(len(gzip.compress(raw, 9)) / 1000, 1)}))
