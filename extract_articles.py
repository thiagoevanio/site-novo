
import os
from bs4 import BeautifulSoup

articles_dir = "/home/ubuntu/Fase3completa_corrigido/Fase 3 completa/artigos"
output_file = "/home/ubuntu/Fase3completa_corrigido/Fase 3 completa/article_list.txt"

with open(output_file, "w", encoding="utf-8") as outfile:
    for filename in os.listdir(articles_dir):
        if filename.endswith(".html"):
            filepath = os.path.join(articles_dir, filename)
            with open(filepath, "r", encoding="utf-8") as f:
                soup = BeautifulSoup(f, "html.parser")
                title_tag = soup.find("title")
                title = title_tag.text.strip() if title_tag else "N/A"
                
                # Try to find canonical URL first, then og:url, then fallback to filename
                canonical_link = soup.find("link", {"rel": "canonical"})
                og_url_meta = soup.find("meta", {"property": "og:url"})
                
                if canonical_link and canonical_link.get("href"):
                    url = canonical_link.get("href")
                elif og_url_meta and og_url_meta.get("content"):
                    url = og_url_meta.get("content")
                else:
                    url = f"https://calculesuasaude.com.br/artigos/{filename}" # Fallback

                outfile.write(f"{title} | {url}\n")

print(f"Lista de artigos salva em {output_file}")


