def rule_based_route(text):
    if "water" in text or "pipe" in text:
        return "KUKL", "water", 0.9
    if "power" in text:
        return "NEA", "electricity", 0.85
    return "Municipality", "road", 0.6
