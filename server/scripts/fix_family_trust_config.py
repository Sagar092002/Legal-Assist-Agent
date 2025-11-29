"""
Fix Family Trust Deed template - update config to match actual document variables
"""

import json
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
TEMPLATES_DIR = BASE_DIR / "data" / "templates"
CONFIG_FILE = TEMPLATES_DIR / "template_config.json"

with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
    config = json.load(f)

print("="*80)
print("FIXING FAMILY TRUST DEED CONFIG")
print("="*80)

# The actual variables in the converted Family Trust template
# Based on actual document content
family_trust_fields = {
    "trust_day": {
        "label": "Day of trust deed",
        "type": "number",
        "required": True,
        "example": "15"
    },
    "trust_month": {
        "label": "Month of trust deed",
        "type": "text",
        "required": True,
        "example": "March"
    },
    "trust_year": {
        "label": "Year of trust deed",
        "type": "number",
        "required": True,
        "example": "2025"
    },
    "trust_name": {
        "label": "Name of the trust",
        "type": "text",
        "required": True,
        "example": "Kumar Family Trust"
    },
    "trust_location": {
        "label": "Location of trust registration",
        "type": "text",
        "required": True,
        "example": "Mumbai"
    },
    "deity_name": {
        "label": "Name of the deity (if religious trust)",
        "type": "text",
        "required": False,
        "example": "Lord Ganesha"
    },
    "settlor_1_name": {
        "label": "First Settlor's full name",
        "type": "text",
        "required": True,
        "example": "Mr. Ramesh Kumar"
    },
    "settlor_2_name": {
        "label": "Second Settlor's full name",
        "type": "text",
        "required": False,
        "example": "Mrs. Sunita Kumar"
    },
    "settlor_3_name": {
        "label": "Third Settlor's full name",
        "type": "text",
        "required": False,
        "example": "Mr. Vikram Kumar"
    },
    "settlor_4_name": {
        "label": "Fourth Settlor's full name",
        "type": "text",
        "required": False,
        "example": "Mrs. Anjali Kumar"
    },
    "settlor_5_name": {
        "label": "Fifth Settlor's full name",
        "type": "text",
        "required": False,
        "example": "Mr. Rajesh Kumar"
    },
    "settlor_6_name": {
        "label": "Sixth Settlor's full name",
        "type": "text",
        "required": False,
        "example": "Mrs. Kavita Kumar"
    },
    "settlor_7_name": {
        "label": "Seventh Settlor's full name",
        "type": "text",
        "required": False,
        "example": "Mr. Suresh Kumar"
    },
    "settlor_city": {
        "label": "City where settlors reside",
        "type": "text",
        "required": True,
        "example": "Kolkata"
    },
    "brother_1_name": {
        "label": "First brother's full name",
        "type": "text",
        "required": False,
        "example": "Mr. Amit Kumar"
    },
    "brother_2_name": {
        "label": "Second brother's full name",
        "type": "text",
        "required": False,
        "example": "Mr. Vijay Kumar"
    },
    "brother_3_name": {
        "label": "Third brother's full name",
        "type": "text",
        "required": False,
        "example": "Mr. Sunil Kumar"
    },
    "trustee_1_name": {
        "label": "First Trustee's full name",
        "type": "text",
        "required": True,
        "example": "Mr. Amit Sharma"
    },
    "trustee_2_name": {
        "label": "Second Trustee's full name",
        "type": "text",
        "required": False,
        "example": "Mrs. Priya Sharma"
    },
    "trustee_3_name": {
        "label": "Third Trustee's full name",
        "type": "text",
        "required": False,
        "example": "Mr. Rahul Verma"
    },
    "initial_fund_amount": {
        "label": "Initial fund amount for the trust (₹)",
        "type": "number",
        "required": True,
        "example": "100000"
    },
    "property_address": {
        "label": "Complete property address",
        "type": "text",
        "required": True,
        "example": "123 Park Street"
    },
    "property_village": {
        "label": "Village/locality of property",
        "type": "text",
        "required": True,
        "example": "Park Street Area"
    },
    "property_district": {
        "label": "District of property",
        "type": "text",
        "required": True,
        "example": "Kolkata"
    },
    "property_state": {
        "label": "State of property",
        "type": "text",
        "required": True,
        "example": "West Bengal"
    }
}

# Update Family Trust Deed
if "Family Trust Deed" in config:
    config["Family Trust Deed"]["fields"] = family_trust_fields
    print(f"✅ Updated: Family Trust Deed")

# Save
with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
    json.dump(config, f, indent=2, ensure_ascii=False)

print(f"\n✅ Saved to: {CONFIG_FILE}")
print(f"\nFamily Trust Deed now has {len(family_trust_fields)} fields")
