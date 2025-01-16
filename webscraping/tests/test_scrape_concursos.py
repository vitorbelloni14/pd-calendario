import pytest
from bs4 import BeautifulSoup
import re


def format_date(date_str):

    from datetime import datetime

    return datetime.strptime(date_str, "%d/%m/%Y").strftime("%Y-%m-%d")


def scrape_concursos(source):
    source_code_str = str(source)

    initial_tag = source_code_str.find('<div class="uf">RIO DE JANEIRO</div>') + len(
        '<div class="uf">RIO DE JANEIRO</div>'
    )
    final_tag = source_code_str.find('<div class="uf">MINAS GERAIS</div>') + len(
        '<div class="uf">MINAS GERAIS</div>'
    )

    concursos_tag = BeautifulSoup(source_code_str[initial_tag:final_tag], "html.parser")

    concursos = []

    for obj in concursos_tag.find_all(class_="ca"):
        name = obj.find("a").text.strip()
        link = obj.find("a", href=True)["href"]
        raw_date = "".join(re.findall(r"\d+/\d+/\d+", str(obj.find(class_="ce"))))
        start = format_date(raw_date)

        concursos.append(
            {"name": name, "link": link, "start": start, "color": "#C5A7F5"}
        )

    return concursos


@pytest.fixture
def mock_source():
    """Fonte de exemplo para os testes."""
    return """
    <html>
        <body>
            <div class="uf">RIO DE JANEIRO</div>
            <div class="ca">
                <a href="https://example.com/concurso1">Prefeitura de Magé</a>
                <div class="ce">27/01/2025</div>
            </div>
            <div class="ca">
                <a href="https://example.com/concurso2">AGEVAP</a>
                <div class="ce">07/02/2025</div>
            </div>
            <div class="uf">MINAS GERAIS</div>
        </body>
    </html>
    """


def test_scrape_concursos_returns_correct_data(mock_source):

    expected_output = [
        {
            "name": "Prefeitura de Magé",
            "link": "https://example.com/concurso1",
            "start": "2025-01-27",
            "color": "#C5A7F5",
        },
        {
            "name": "AGEVAP",
            "link": "https://example.com/concurso2",
            "start": "2025-02-07",
            "color": "#C5A7F5",
        },
    ]

    result = scrape_concursos(mock_source)
    assert (
        result == expected_output
    ), "Os dados extraídos não correspondem aos esperados."


def test_scrape_concursos_handles_empty_source():

    result = scrape_concursos("")
    assert (
        result == []
    ), "A função deveria retornar uma lista vazia para uma fonte vazia."


def test_scrape_concursos_missing_uf_tags():

    incomplete_source = """
    <html>
        <body>
            <div class="ca">
                <a href="https://example.com/concurso1">Prefeitura de Magé</a>
                <div class="ce">27/01/2025</div>
            </div>
        </body>
    </html>
    """
    result = scrape_concursos(incomplete_source)
    assert (
        result == []
    ), "A função deveria retornar uma lista vazia quando as tags de UF estão ausentes."
