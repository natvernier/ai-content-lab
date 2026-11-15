"""One-off: take CSS and markup from the signed-off test page (v10) and scope them for the Shadow DOM."""
import re,sys
src=open(sys.argv[1],encoding='utf-8').read()
css=src[src.index('<style>')+7:src.index('</style>')]
# theme: the main site decides day/night (html.theme-night); /world mirrors it onto the host
css=re.sub(r'@media \(prefers-color-scheme: dark\)\{\s*:root:not\(\[data-theme="light"\]\)\{[^}]*\}\s*\}','',css)
css=css.replace(':root[data-theme="dark"]',':host([data-theme="dark"])').replace(':root{',':host{')
css=css.replace('html,body{height:100%}','')
css=re.sub(r'(^|\n)body\{','\\1.aot{',css)
css=css.replace('body.is-recipe','.aot.is-recipe')
# test-page-only rules
css=re.sub(r'#panel[^{]*\{[^}]*\}','',css); css=re.sub(r'#meter[^{]*\{[^}]*\}','',css)
body=src[src.index('</style>')+8:src.index('<script>\n(function(){')]
body=body.replace('<script src="data/recipes.js"></script>','')
body=re.sub(r'<div class="hud bc">.*?</div>\s*<button id="meter".*?</button>\s*</div>','',body,flags=re.S)
body=body.replace('img/pip-lamp.webp','{{PIP_LAMP}}')
body=re.sub(r'<link[^>]+fonts.googleapis[^>]+>','',body)
open('src/world.css','w',encoding='utf-8').write(css.strip()+'\n')
open('src/world.html','w',encoding='utf-8').write(body.strip()+'\n')
print('css',len(css),'html',len(body), 'leftover root:',css.count(':root'), 'body sel:',len(re.findall(r'(^|\n)body',css)), 'panel in html:', 'id="panel"' in body)
