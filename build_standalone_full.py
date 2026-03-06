import base64
import re
import mimetypes
import os

def main():
    print("Reading files...")
    with open('index.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    with open('style.css', 'r', encoding='utf-8') as f:
        css_content = f.read()

    with open('script.js', 'r', encoding='utf-8') as f:
        js_content = f.read()

    print("Inlining CSS and JS...")
    # Inline CSS
    html_content = re.sub(
        r'<link\s+rel="stylesheet"\s+href="style\.css">',
        f'<style>\n{css_content}\n</style>',
        html_content
    )

    # Inline JS
    html_content = re.sub(
        r'<script\s+src="script\.js"></script>',
        f'<script>\n{js_content}\n</script>',
        html_content
    )

    def replace_with_base64(match):
        filepath = match.group(1)
        print(f"Embedding {filepath}...")
        if os.path.exists(filepath):
            mime_type, _ = mimetypes.guess_type(filepath)
            if not mime_type:
                if filepath.endswith('.png'):
                    mime_type = 'image/png'
                elif filepath.endswith('.svg'):
                    mime_type = 'image/svg+xml'
                elif filepath.endswith('.mp4'):
                    mime_type = 'video/mp4'
                else:
                    mime_type = 'application/octet-stream'
            
            with open(filepath, 'rb') as asset_file:
                encoded_string = base64.b64encode(asset_file.read()).decode('utf-8')
                
            return f'src="data:{mime_type};base64,{encoded_string}"'
        else:
            print(f"WARNING: File {filepath} not found.")
            return match.group(0)

    print("Embedding images and videos as base64...")
    # Find all src="asset/..."
    html_content = re.sub(r'src="(asset/[^"]+)"', replace_with_base64, html_content)

    print("Writing output file...")
    with open('index_FullStandalone.html', 'w', encoding='utf-8') as f:
        f.write(html_content)

    print('Success! Created index_FullStandalone.html (Size roughly {} MB)'.format(round(len(html_content)/1024/1024, 2)))

if __name__ == '__main__':
    main()
