"""
Fix all template configurations
Adds NDA and ensures all templates are properly configured
"""

import json
import os
from pathlib import Path
from docx import Document

# Path setup
BASE_DIR = Path(__file__).parent.parent
TEMPLATES_DIR = BASE_DIR / "data" / "templates"
CONFIG_FILE = TEMPLATES_DIR / "template_config.json"

def read_template_vars(filepath):
    """Read a DOCX template and extract Jinja2 variables"""
    try:
        doc = Document(filepath)
        text = '\n'.join([p.text for p in doc.paragraphs])
        
        # Find Jinja2 variables like {{ variable_name }}
        import re
        jinja_vars = set(re.findall(r'\{\{\s*(\w+)\s*\}\}', text))
        return list(jinja_vars)
    except Exception as e:
        print(f"Error reading {filepath}: {e}")
        return []

# Load existing config
with open(CONFIG_FILE, 'r', encoding='utf-8') as f:
    config = json.load(f)

print("Current templates in config:")
for name in config.keys():
    print(f"  - {name}")

# Check if NDA exists in employment folder
nda_path = TEMPLATES_DIR / "employment" / "nda.docx"
if nda_path.exists():
    print(f"\n✅ Found NDA template at: {nda_path}")
    
    # Read variables from NDA template
    nda_vars = read_template_vars(nda_path)
    print(f"📋 Jinja2 variables found in NDA: {nda_vars}")
    
    # Create NDA configuration
    nda_config = {
        "filename": "employment/nda.docx",
        "category": "Employment",
        "description": "Non-Disclosure Agreement (NDA) for confidential information protection",
        "keywords": ["nda", "non-disclosure", "confidentiality", "agreement"],
        "fields": {}
    }
    
    # Add fields based on found variables or use defaults
    if nda_vars:
        for var in nda_vars:
            nda_config["fields"][var] = {
                "label": var.replace('_', ' ').title(),
                "type": "text",
                "required": True,
                "example": f"[{var.replace('_', ' ').title()}]"
            }
    else:
        # Default NDA fields if template is not Jinja2
        nda_config["fields"] = {
            "disclosing_party": {
                "label": "Disclosing Party Name",
                "type": "text",
                "required": True,
                "example": "ABC Corporation Ltd."
            },
            "receiving_party": {
                "label": "Receiving Party Name",
                "type": "text",
                "required": True,
                "example": "XYZ Enterprises Pvt. Ltd."
            },
            "effective_date": {
                "label": "Effective Date",
                "type": "date",
                "required": True,
                "example": "2025-01-15"
            },
            "purpose": {
                "label": "Purpose of Disclosure",
                "type": "text",
                "required": True,
                "example": "Exploring potential business collaboration"
            },
            "jurisdiction": {
                "label": "Governing Jurisdiction",
                "type": "text",
                "required": False,
                "example": "Mumbai, India"
            },
            "term_years": {
                "label": "Confidentiality Term (years)",
                "type": "number",
                "required": False,
                "example": "2"
            }
        }
    
    # Add NDA to config
    config["NDA"] = nda_config
    print("\n✅ Added NDA configuration")
else:
    print(f"\n❌ NDA template not found at {nda_path}")

# Save updated config
with open(CONFIG_FILE, 'w', encoding='utf-8') as f:
    json.dump(config, f, indent=2, ensure_ascii=False)

print(f"\n✅ Template configuration updated!")
print(f"📄 Saved to: {CONFIG_FILE}")
print(f"\nTotal templates configured: {len(config)}")
for name in config.keys():
    print(f"  ✓ {name}")
