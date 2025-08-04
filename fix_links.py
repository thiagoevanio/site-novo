
import os
from bs4 import BeautifulSoup
import random

articles_map = {}
with open("/home/ubuntu/Fase3completa_corrigido/Fase 3 completa/article_list.txt", "r", encoding="utf-8") as f:
    for line in f:
        parts = line.strip().split(" | ")
        if len(parts) == 3:
            title = parts[0].replace(" | Calcule Sua Saúde", ".html") # Keep .html for easier matching with filenames
            url = parts[2]
            articles_map[title] = url

broken_links_titles = [
    "Diferença Entre Peso Ideal e Peso Saudável",
    "Taxa Metabólica Basal: o que é e como calcular",
    "Como funciona o metabolismo e como",
    "Diferença Entre Perder Peso e Perder Gordura",
    "Proteína Vegetal vs. Animal: Qual é Melhor?",
    "HIIT: O Treino que Queima Gordura",
    "IMC Infantil e Percentis: Guia Completo",
    "Obesidade Infantil: Prevenção e",
    "Frequência Cardíaca no Treino: Guia Completo",
    "Desidratação: Sintomas e Prevenção"
]

# Map broken titles to their likely full titles in articles_map
broken_links_full_titles_map = {
    "Diferença Entre Peso Ideal e Peso Saudável": "Perda de Peso: Estratégias Científicas e Sustentáveis para Emagrecer.html", 
    "Taxa Metabólica Basal: o que é e como calcular": "Metabolismo: Estratégias Científicas para Queimar Mais Calorias.html", 
    "Como funciona o metabolismo e como": "Metabolismo: Estratégicas Científicas para Queimar Mais Calorias.html", 
    "Diferença Entre Perder Peso e Perder Gordura": "Perda de Peso: Estratégias Científicas e Sustentáveis para Emagrecer.html", 
    "Proteína Vegetal vs. Animal: Qual é Melhor?": "Macronutrientes: Guia Completo sobre Carboidratos, Proteínas e Gorduras.html", 
    "HIIT: O Treino que Queima Gordura": "Melhores Exercícios para Queimar Calorias: Guia Completo.html", 
    "IMC Infantil e Percentis: Guia Completo": "Saúde Infantil: Cuidados Essenciais para o Desenvolvimento.html", 
    "Obesidade Infantil: Prevenção e": "Obesidade: Causas, Consequências e Tratamento Completo.html", 
    "Frequência Cardíaca no Treino: Guia Completo": "Atividade Física: Benefícios Comprovados para a Saúde.html", 
    "Desidratação: Sintomas e Prevenção": "Hidratação: A Importância da Água para a Saúde e Performance.html" 
}

# Adjust titles in articles_map to match the format used in broken_links_full_titles_map
adjusted_articles_map = {}
for title, url in articles_map.items():
    # Extract the filename from the URL and use it as the key
    filename = url.split('/')[-1]
    adjusted_articles_map[filename] = url

articles_map = adjusted_articles_map

ferramentas_dir = "/home/ubuntu/Fase3completa_corrigido/Fase 3 completa/ferramentas"

for filename in os.listdir(ferramentas_dir):
    if filename.endswith(".html"):
        filepath = os.path.join(ferramentas_dir, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        soup = BeautifulSoup(content, "html.parser")
        leia_tambem_div = soup.find("div", class_="leia-tambem")

        if leia_tambem_div:
            artigos_relacionados_div = leia_tambem_div.find("div", class_="artigos-relacionados")
            if artigos_relacionados_div:
                # Clear existing links
                artigos_relacionados_div.clear()
                
                # Get a list of all available article filenames
                all_article_filenames = list(articles_map.keys())
                random.shuffle(all_article_filenames) # Shuffle to get random articles

                # Select up to 3 random articles
                selected_articles = []
                count = 0
                for article_filename in all_article_filenames:
                    if count < 3:
                        # Extract original title from the article_list.txt for display
                        original_title = "N/A"
                        for line in open("/home/ubuntu/Fase3completa_corrigido/Fase 3 completa/article_list.txt", "r", encoding="utf-8").readlines():
                            if article_filename in line:
                                original_title = line.split(" | ")[0].replace(" | Calcule Sua Saúde", "")
                                break

                        selected_articles.append((original_title, articles_map[article_filename]))
                        count += 1
                    else:
                        break

                # Add the selected articles to the HTML
                for title, url in selected_articles:
                    # Adjust URL to be relative if it's an internal link
                    relative_url = url.replace('https://calculesuasaude.com.br', '..')
                    
                    new_a_tag = soup.new_tag("a", href=relative_url)
                    new_a_tag["class"] = "artigo-link"
                    
                    title_span = soup.new_tag("span", class_="artigo-titulo")
                    title_span.string = title
                    new_a_tag.append(title_span)
                    
                    desc_span = soup.new_tag("span", class_="artigo-descricao")
                    desc_span.string = "Leia mais sobre este tópico"
                    new_a_tag.append(desc_span)
                    
                    artigos_relacionados_div.append(new_a_tag)

                with open(filepath, "w", encoding="utf-8") as f:
                    f.write(str(soup))
                print(f"Links em {filename} atualizados com 3 artigos.")
        else:
            print(f"Seção 'Leia também' não encontrada em {filename}.")

print("Correção de links concluída.")


