import re

with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

with open('style.css', 'r', encoding='utf-8') as f:
    css_content = f.read()

with open('script.js', 'r', encoding='utf-8') as f:
    js_content = f.read()

html_content = re.sub(
    r'<link rel="stylesheet" href="style\.css">',
    f'<style>\n{css_content}\n</style>',
    html_content
)

html_content = re.sub(
    r'<script src="script\.js"></script>',
    f'<script>\n{js_content}\n</script>',
    html_content
)

with open('index_standalone.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

print('Success! Created index_standalone.html')
