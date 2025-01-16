import pytest
import json
import os
import tempfile


def save_to_json(data, filename="concursos.json"):
    with open(filename, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=4)
    print(f"Dados salvos no arquivo: {filename}")


@pytest.fixture
def temp_file():
    """Fixture para criar e remover um arquivo temporário."""
    with tempfile.NamedTemporaryFile(delete=False) as temp_file:
        yield temp_file.name
    if os.path.exists(temp_file.name):
        os.remove(temp_file.name)


def test_save_to_json_creates_file(temp_file):
    data = {"name": "Prefeitura de Magé", "start": "2025-01-27"}
    save_to_json(data, temp_file)
    assert os.path.exists(temp_file), "O arquivo não foi criado."


def test_save_to_json_writes_correct_data(temp_file):
    data = {"name": "Prefeitura de Magé", "start": "2025-01-27"}
    save_to_json(data, temp_file)
    with open(temp_file, "r", encoding="utf-8") as f:
        loaded_data = json.load(f)
    assert (
        loaded_data == data
    ), "Os dados salvos no arquivo não correspondem aos esperados."


def test_save_to_json_with_empty_data(temp_file):
    data = {}
    save_to_json(data, temp_file)
    with open(temp_file, "r", encoding="utf-8") as f:
        loaded_data = json.load(f)
    assert loaded_data == data, "O arquivo não contém o dicionário vazio esperado."


def test_save_to_json_default_filename():
    data = {"name": "Prefeitura de Magé", "start": "2025-01-27"}
    default_filename = "concursos.json"

    try:
        save_to_json(data)
        assert os.path.exists(default_filename), "O arquivo padrão não foi criado."
        with open(default_filename, "r", encoding="utf-8") as f:
            loaded_data = json.load(f)
        assert (
            loaded_data == data
        ), "Os dados no arquivo padrão não correspondem aos esperados."
    finally:
        if os.path.exists(default_filename):
            os.remove(default_filename)
