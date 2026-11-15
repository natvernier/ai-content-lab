"""Upload a file to Webflow's asset store after data_assets_tool create_asset.
Usage: python3 wf_s3_upload.py <create_asset_result.json> <local file>
The MCP returns the S3 form fields in camelCase; S3 needs the original names.
Posts to the path-style S3 URL (the virtual-host URL is blocked from the workspace) and checks the file on the CDN."""
import json, os, subprocess, sys

MAP = {'xAmzAlgorithm': 'X-Amz-Algorithm', 'xAmzCredential': 'X-Amz-Credential', 'xAmzDate': 'X-Amz-Date',
       'xAmzSignature': 'X-Amz-Signature', 'successActionStatus': 'success_action_status',
       'contentType': 'Content-Type', 'cacheControl': 'Cache-Control'}
ORDER = ['key', 'acl', 'bucket', 'xAmzAlgorithm', 'xAmzCredential', 'xAmzDate', 'policy', 'xAmzSignature',
         'successActionStatus', 'contentType', 'cacheControl']

res = json.load(open(sys.argv[1]))
res = res.get('result', res)
path = sys.argv[2]
d = res['uploadDetails']
args = ['curl', '-sS', '-o', '/dev/null', '-w', '%{http_code}', '--max-time', '120', '-X', 'POST',
        'https://s3.amazonaws.com/webflow-prod-assets/']
for k in ORDER + [k for k in d if k not in ORDER]:
    if k in d:
        args += ['-F', f'{MAP.get(k, k)}={d[k]}']
args += ['-F', f'file=@{path};type={d.get("contentType", "application/octet-stream")}']
code = subprocess.run(args, capture_output=True, text=True).stdout.strip()
chk = subprocess.run(['curl', '-sS', '-o', '/dev/null', '-w', '%{http_code} %{size_download}', '--max-time', '60',
                      res['hostedUrl']], capture_output=True, text=True).stdout.split()
ok = code in ('200', '201', '204') and chk[0] == '200' and int(chk[1]) == os.path.getsize(path)
print(json.dumps({'upload': code, 'cdn': chk, 'ok': ok, 'url': res['hostedUrl']}))
sys.exit(0 if ok else 1)
