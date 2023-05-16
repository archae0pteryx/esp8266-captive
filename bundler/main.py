import os
import re
import cssmin
import jsmin
from htmlmin import minify as html_minify
import sys
from pathlib import Path

input_file = sys.argv[1]
output_file = sys.argv[2]

def get_file_content(file_path):
    """
    Reads the content of the file and returns it as a string
    """
    with open(file_path, "r") as file:
        return file.read()


def load_css(html_content, base_path):
    """
    Loads all linked CSS files in the HTML content into a single string
    """
    pattern = r'<link[^>]*?href=["\']([^"\']*\.css)["\'][^>]*?>'
    css_content = ""
    for match in re.findall(pattern, html_content):
        css_file_path = os.path.join(base_path, match)
        css_content += get_file_content(css_file_path)
    return css_content


def load_js(html_content, base_path):
    """
    Loads all linked JS files in the HTML content into a single string
    """
    pattern = r'<script[^>]*?src=["\']([^"\']*\.js)["\'][^>]*?>'
    js_content = ""
    for match in re.findall(pattern, html_content):
        js_file_path = os.path.join(base_path, match)
        js_content += get_file_content(js_file_path)
    return js_content


def load_html(html_file_path):
    """
    Loads the content of the HTML file and returns it as a string
    """
    return get_file_content(html_file_path)


def minify_html_css_js(html_content, css_content, js_content):
    """
    Minifies the HTML, CSS, and JS content and returns it as a single line string
    """
    minified_html = html_minify(html_content)
    minified_css = cssmin.cssmin(css_content)
    minified_js = jsmin.jsmin(js_content, quote_chars="'\"`")

    # Split the minified JS into lines and add a semicolon to lines that don't have one
    lines = []
    for line in minified_js.splitlines():
        if not line.endswith(';'):
            line += ';'
        lines.append(line)

    # Join the lines back into a single string
    minified_js = '\n'.join(lines)

    return f"{minified_html}<style>{minified_css}</style><script>{minified_js}</script>"



def save_combined_file(content):
    """
    Saves the combined and minified HTML, CSS, and JS content to a new file named "dist/index.html"
    """

    o = output_file if output_file else "dist/index.html"

    p = Path(output_file)

    os.makedirs(p.parts[:-1], exist_ok=True)

    with open(o, "w") as file:
        file.write(content)


def combine_and_minify(input_file):
    """
    Loads HTML, CSS, JS, combines and minifies them, and saves the output to a new file named "dist/index.html"
    """
    base_path = os.path.dirname(input_file)
    html_content = load_html(input_file)
    css_content = load_css(html_content, base_path)
    js_content = load_js(html_content, base_path)
    combined_content = minify_html_css_js(
        html_content, css_content, js_content)
    # Replace all new lines with empty string
    combined_content = combined_content.replace('\n', '')
    save_combined_file(combined_content)

