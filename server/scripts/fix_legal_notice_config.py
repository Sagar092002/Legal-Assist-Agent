"""
Fix Legal Notice templates - update config to match actual document variables
"""

import json
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
TEMPLATES_DIR = BASE_DIR / "data" / "templates"
CONFIG_FILE = TEMPLATES_DIR / "template_config.json"

with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
    config = json.load(f)

print("="*80)
print("FIXING LEGAL NOTICE CONFIGS")
print("="*80)

# The actual variables in the converted Legal Notice templates
legal_notice_fields = {
    "notice_date_day": {
        "label": "Day of notice",
        "type": "number",
        "required": True,
        "example": "15"
    },
    "notice_date_month": {
        "label": "Month of notice",
        "type": "text",
        "required": True,
        "example": "January"
    },
    "notice_date_year": {
        "label": "Year of notice",
        "type": "number",
        "required": True,
        "example": "2025"
    },
    "recipient_name": {
        "label": "Recipient's full name",
        "type": "text",
        "required": True,
        "example": "Mr. Rajesh Kumar"
    },
    "recipient_address": {
        "label": "Recipient's complete address",
        "type": "text",
        "required": True,
        "example": "123 MG Road, Mumbai 400001"
    },
    "client_name": {
        "label": "Client's company/individual name",
        "type": "text",
        "required": True,
        "example": "ABC Enterprises Pvt. Ltd."
    },
    "client_designation": {
        "label": "Client's designation/capacity",
        "type": "text",
        "required": False,
        "example": "Managing Director"
    },
    "client_full_name": {
        "label": "Client's full legal name",
        "type": "text",
        "required": True,
        "example": "M/s ABC Enterprises Pvt. Ltd."
    },
    "business_nature": {
        "label": "Nature of business",
        "type": "text",
        "required": True,
        "example": "manufacturing and supply of electronics"
    },
    "business_product": {
        "label": "Product/Service provided",
        "type": "text",
        "required": True,
        "example": "electronic components"
    },
    "principal_amount": {
        "label": "Principal outstanding amount (₹)",
        "type": "number",
        "required": True,
        "example": "250000"
    },
    "interest_rate": {
        "label": "Interest rate (% per annum)",
        "type": "number",
        "required": True,
        "example": "12"
    },
    "interest_amount": {
        "label": "Interest amount (₹)",
        "type": "number",
        "required": True,
        "example": "25000"
    },
    "total_payable": {
        "label": "Total amount payable including interest (₹)",
        "type": "number",
        "required": True,
        "example": "275000"
    },
    "notice_fee": {
        "label": "Legal notice fee (₹)",
        "type": "number",
        "required": False,
        "example": "5000"
    }
}

# Update all three Legal Notice templates
for notice_name in ["Legal Notice for Recovery of Money",
                     "Legal Notice for Non-Payment of Invoice",
                     "Legal Notice for Recovery of Friendly Loan"]:
    if notice_name in config:
        config[notice_name]["fields"] = legal_notice_fields
        print(f"✅ Updated: {notice_name}")

# Save
with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
    json.dump(config, f, indent=2, ensure_ascii=False)

print(f"\n✅ Saved to: {CONFIG_FILE}")
print(f"\nLegal Notice templates now have {len(legal_notice_fields)} fields")
