import logging
import os

from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.utils import secure_filename

from database import create_tables, get_connection
from parser import parse_menu_file

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
CORS(
    app,
    resources={r"/*": {"origins": ["http://localhost:5173", "http://127.0.0.1:5173"]}},
)

create_tables()


@app.get("/")
def home():
    return {"message": "MenuOptimizer backend is running"}


@app.get("/health")
def health():
    return jsonify({"status": "ok"})


@app.post("/upload-menu")
def upload_menu():
    logger.info("Upload request received")

    if "file" not in request.files:
        logger.warning("Upload request missing file field")
        return jsonify({"error": "No file uploaded"}), 400

    uploaded_file = request.files["file"]
    if uploaded_file.filename == "":
        logger.warning("Upload request had empty filename")
        return jsonify({"error": "File name is required"}), 400

    filename = secure_filename(uploaded_file.filename)
    file_type = uploaded_file.mimetype or "unknown"
    saved_path = os.path.join(app.config["UPLOAD_FOLDER"], filename)

    logger.info("Upload details: filename=%s, file_type=%s, saved_path=%s", filename, file_type, saved_path)

    if file_type != "application/pdf" and not filename.lower().endswith(".pdf"):
        logger.warning("Rejected non-PDF upload: %s (%s)", filename, file_type)
        return jsonify({"error": "Only PDF files are allowed"}), 400

    uploaded_file.save(saved_path)
    logger.info("File saved successfully to %s", saved_path)

    try:
        logger.info("Parsing PDF started")
        parsed_menu = parse_menu_file(saved_path)
        logger.info("Parsing PDF completed for %s", filename)
    except Exception as exc:
        logger.exception("PDF parsing failed for %s", filename)
        return jsonify({"error": f"PDF parsing failed: {str(exc)}"}), 500

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO menus (restaurant_id, menu_name) VALUES (?, ?)",
            (1, parsed_menu["restaurant_name"]),
        )
        menu_id = cursor.lastrowid

        for dish in parsed_menu.get("items", []):
            cursor.execute(
                """
                INSERT INTO dishes (
                    menu_id, name, category, original_description,
                    optimized_description, original_price, suggested_price,
                    bestseller, margin
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    menu_id,
                    dish.get("name", ""),
                    dish.get("category", "General"),
                    dish.get("description", ""),
                    dish.get("description", ""),
                    dish.get("price", 0),
                    dish.get("price", 0),
                    0,
                    0,
                ),
            )

        conn.commit()
        conn.close()
    except Exception as exc:
        logger.exception("Database save failed for %s", filename)
        return jsonify({"error": f"Database save failed: {str(exc)}"}), 500

    return jsonify({
        "restaurant_name": parsed_menu["restaurant_name"],
        "filename": filename,
        "saved_file": saved_path,
        "items": parsed_menu.get("items", []),
        "extracted_text": parsed_menu.get("extracted_text", ""),
    })


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)
