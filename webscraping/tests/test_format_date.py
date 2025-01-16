import pytest
from datetime import datetime


def format_date(date_str):
    if date_str != "":
        formatted_date = datetime.strptime(date_str, "%d/%m/%Y").strftime("%Y-%m-%d")
        return formatted_date
    return None


def test_format_date_valid_date():
    assert format_date("27/01/2025") == "2025-01-27"


def test_format_date_empty_string():
    assert format_date("") is None


def test_format_date_invalid_format():
    with pytest.raises(ValueError):
        format_date("2025-01-27")


def test_format_date_partial_date():
    with pytest.raises(ValueError):
        format_date("27/01")


def test_format_date_none_input():
    with pytest.raises(TypeError):
        format_date(None)
