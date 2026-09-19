import os
import re

from pypdf import PdfReader


def _parse_price(value):
    match = re.search(r"(\d+(?:\.\d+)?)", str(value).replace(",", ""))
    if not match:
        return 0.0
    return float(match.group(1))


def _parse_dish_line(line):
    cleaned = re.sub(r"\s+", " ", line).strip()
    if not cleaned:
        return None

    if "|" in cleaned:
        parts = [part.strip() for part in cleaned.split("|") if part.strip()]
    else:
        parts = [part.strip() for part in re.split(r"\s+-\s+|\s*;\s*", cleaned) if part.strip()]

    if len(parts) >= 4:
        name = parts[0]
        category = parts[1].upper()
        description = parts[2]
        price = _parse_price(parts[-1])
        return {"name": name, "category": category, "description": description, "price": price}

    if len(parts) >= 2:
        name = parts[0]
        description = parts[1]
        price = 0.0
        category = "GENERAL"
        return {"name": name, "category": category, "description": description, "price": price}

    return None


def parse_menu_text(text):
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    items = []

    for line in lines:
        if line.lower().startswith("menu") or line.lower().startswith("restaurant"):
            continue

        dish = _parse_dish_line(line)
        if dish:
            items.append(dish)

    return items


def parse_menu_file(file_path):
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Menu file not found: {file_path}")

    file_name = os.path.basename(file_path)
    restaurant_name = os.path.splitext(file_name)[0]

    if not file_name.lower().endswith(".pdf"):
        raise ValueError("Only PDF files are supported")

    reader = PdfReader(file_path)
    pages = []
    for page in reader.pages:
        page_text = page.extract_text() or ""
        pages.append(page_text)

    extracted_text = "\n".join(pages).strip()
    items = parse_menu_text(extracted_text)

    return {
        "restaurant_name": restaurant_name,
        "extracted_text": extracted_text,
        "items": items,
    }
