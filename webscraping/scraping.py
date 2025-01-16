import requests
from bs4 import BeautifulSoup
import json
import re

URL = "https://www.pciconcursos.com.br/concursos/"

concursos = []


def scrape_concursos(source):
    source_code_str = str(source)

    initial_tag = source_code_str.find('<div class="uf">RIO DE JANEIRO</div>') + len(
        '<div class="uf">RIO DE JANEIRO</div>'
    )
    final_tag = source_code_str.find('<div class="uf">MINAS GERAIS</div>') + len(
        '<div class="uf">MINAS GERAIS</div>'
    )

    concursos_tag = BeautifulSoup(source_code_str[initial_tag:final_tag], "html.parser")

    for obj in concursos_tag.find_all(class_="ca"):
        name = obj.find("a").text.strip()
        link = obj.find("a", href=True)["href"]
        start = "".join(re.findall("\d+/\d+/\d+", str(obj.find(class_="ce"))))

        concursos.append({"name": name, "link": link, "start": start})

    return concursos


def save_to_json(data, filename="concursos.json"):
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    print(f"Dados salvos no arquivo: {filename}")


def main():
    response = requests.get(URL)
    soup = BeautifulSoup(response.text, "html.parser")

    concursos_data = scrape_concursos(soup)
    save_to_json(concursos_data)


if __name__ == "__main__":
    main()
