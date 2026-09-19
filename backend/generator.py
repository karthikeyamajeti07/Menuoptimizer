from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.units import mm


def generate_menu_pdf(menu_name, dishes, filename="optimized_menu.pdf"):
    document = SimpleDocTemplate(
        filename,
        pagesize=A4,
        rightMargin=20 * mm,
        leftMargin=20 * mm,
        topMargin=20 * mm,
        bottomMargin=20 * mm,
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        "MenuTitle",
        parent=styles["Title"],
        alignment=TA_CENTER,
        fontSize=24,
        spaceAfter=15,
    )

    category_style = ParagraphStyle(
        "Category",
        parent=styles["Heading2"],
        fontSize=16,
        spaceBefore=15,
        spaceAfter=8,
    )

    dish_style = ParagraphStyle(
        "Dish",
        parent=styles["Heading3"],
        fontSize=12,
        spaceAfter=4,
    )

    description_style = ParagraphStyle(
        "Description",
        parent=styles["BodyText"],
        fontSize=9,
        leading=13,
        textColor=colors.grey,
        spaceAfter=5,
    )

    price_style = ParagraphStyle(
        "Price",
        parent=styles["BodyText"],
        fontSize=10,
        spaceAfter=10,
    )

    content = []
    content.append(Paragraph(menu_name, title_style))
    content.append(Spacer(1, 10))

    categories = {}
    for dish in dishes:
        category = dish.get("category", "General")
        categories.setdefault(category, []).append(dish)

    for category, category_dishes in categories.items():
        content.append(Paragraph(category.upper(), category_style))
        for dish in category_dishes:
            content.append(Paragraph(dish.get("name", "Unnamed Dish"), dish_style))
            content.append(
                Paragraph(dish.get("optimized_description", "No description available"), description_style)
            )
            content.append(
                Paragraph(f"Suggested Price: ₹{dish.get('suggested_price', 0)}", price_style)
            )

    document.build(content)
    return filename
