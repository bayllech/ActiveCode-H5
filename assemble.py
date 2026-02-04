
import os

def assemble_single_page():
    base_dir = '/Users/lg/qi/code/ActiveCode-H5'
    
    with open(os.path.join(base_dir, 'index.html'), 'r', encoding='utf-8') as f:
        html_content = f.read()
    
    with open(os.path.join(base_dir, 'style.css'), 'r', encoding='utf-8') as f:
        css_content = f.read()
        
    with open(os.path.join(base_dir, 'script.js'), 'r', encoding='utf-8') as f:
        js_content = f.read()

    # Replace CSS link
    html_content = html_content.replace('<link rel="stylesheet" href="style.css">', f'<style>\n{css_content}\n</style>')
    
    # Replace JS script
    html_content = html_content.replace('<script src="script.js"></script>', f'<script>\n{js_content}\n</script>')
    
    output_path = os.path.join(base_dir, 'single_page.html')
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"Successfully assembled single_page.html at {output_path}")

if __name__ == "__main__":
    assemble_single_page()
