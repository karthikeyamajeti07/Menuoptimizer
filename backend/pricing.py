def optimize_pricing(dishes):
    optimized = []

    for dish in dishes:
        original_price = float(dish.get("original_price", 0) or 0)
        margin = float(dish.get("margin", 0) or 0)

        suggested_price = original_price * 1.15
        if margin:
            suggested_price = max(original_price, suggested_price + margin)

        optimized.append({
            "name": dish.get("name", "Unnamed Dish"),
            "category": dish.get("category", "General"),
            "original_description": dish.get("original_description", ""),
            "optimized_description": dish.get("optimized_description", "") or dish.get("original_description", ""),
            "original_price": original_price,
            "suggested_price": round(suggested_price, 2),
            "margin": round(suggested_price - original_price, 2),
        })

    return optimized
