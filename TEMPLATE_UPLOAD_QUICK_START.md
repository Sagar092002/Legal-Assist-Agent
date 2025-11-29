# Quick Start: Template Upload Feature

## How to Use the Template Upload Feature

### For Users

#### 1. Access Template Manager
- Login to your account
- Click **"My Templates"** in the navigation bar
- You'll see your template library

#### 2. Upload a New Template

**Step 1: Upload**
1. Click **"Upload New Template"** button
2. Select your `.docx` file (must contain placeholders)
3. Wait for automatic analysis (~2-3 seconds)

**Step 2: Edit Variables**
1. Review detected placeholders in the table
2. Edit variable names to make them meaningful:
   - Example: Change `#1` to `party_name_1`
   - Example: Change `____` to `recipient_address`
3. Set template name (e.g., "My Custom Lease Agreement")
4. Select category (Custom, Employment, Property, etc.)
5. Click **"Convert & Save"**

**Step 3: Success!**
- Your template is now saved in the library
- You can use it like any built-in template

#### 3. Use Your Template
1. Go to Dashboard or Document Generation
2. Select your custom template from the list
3. Fill in the fields
4. Generate your document!

#### 4. Manage Templates
- **View Details:** Click the eye icon
- **Delete:** Click the trash icon
- Templates are stored permanently until deleted

---

## For Developers

### Installation

1. **Install React dependencies** (if not already installed):
```bash
cd client
npm install react-icons
```

2. **Create directories**:
```bash
mkdir -p server/data/user_templates
```

3. **Test the backend**:
```bash
cd server
python -m ai.template_converter
```

### File Structure
```
server/
├── ai/
│   ├── template_converter.py      # NEW: Conversion service
│   └── template_manager_v2.py     # UPDATED: Support user templates
├── data/
│   ├── templates/                  # System templates
│   └── user_templates/            # NEW: User templates
│       └── user_template_config.json
└── app.py                         # UPDATED: New endpoints

client/
└── src/
    ├── components/
    │   ├── TemplateUploader.jsx    # NEW: Upload wizard
    │   ├── TemplateManager.jsx     # NEW: Template library
    │   └── ModernNavbar.jsx        # UPDATED: Added link
    └── App.js                      # UPDATED: New routes
```

### API Endpoints

**Upload & Analyze:**
```bash
curl -X POST http://127.0.0.1:5000/api/template/upload-and-analyze \
  -F "file=@my_template.docx"
```

**Convert:**
```bash
curl -X POST http://127.0.0.1:5000/api/template/convert \
  -H "Content-Type: application/json" \
  -d '{
    "temp_path": "/tmp/xyz.docx",
    "variable_mapping": {"#1": "party_name"},
    "template_name": "My Template",
    "category": "Custom"
  }'
```

**List User Templates:**
```bash
curl http://127.0.0.1:5000/api/template/user-templates
```

**Delete Template:**
```bash
curl -X DELETE http://127.0.0.1:5000/api/template/delete/My%20Template
```

### Testing

#### 1. Create Test Template
Create a simple `.docx` file with placeholders:
```
AGREEMENT

This agreement is made between #1 and #2 on ____.

Amount: ____
Signature: [SIGNATURE]
```

#### 2. Upload via UI
1. Start the servers:
   ```bash
   # Terminal 1 - Backend
   cd server
   python app.py

   # Terminal 2 - Frontend  
   cd client
   npm start
   ```

2. Navigate to http://localhost:3000/templates
3. Upload your test template
4. Verify all placeholders detected

#### 3. Test Conversion
- Edit variable names
- Save template
- Check `data/user_templates/` directory
- Verify Jinja2 format in saved file

### Code Examples

#### Backend: Convert Template
```python
from ai.template_converter import template_converter

# Analyze
analysis = template_converter.analyze_template('input.docx')
print(f"Found {analysis['total_placeholders']} placeholders")

# Convert
result = template_converter.convert_to_jinja2(
    doc_path='input.docx',
    output_path='output.docx',
    variable_mapping={'#1': 'party_name', '#2': 'effective_date'}
)

print(f"Converted {result['converted_count']} placeholders")
```

#### Frontend: Upload Template
```javascript
import TemplateUploader from './components/TemplateUploader';

function App() {
  const handleTemplateSaved = (metadata) => {
    console.log('Template saved:', metadata);
    // Refresh template list
  };

  return <TemplateUploader onTemplateSaved={handleTemplateSaved} />;
}
```

### Customization

#### Add Custom Placeholder Pattern
Edit `ai/template_converter.py`:
```python
PLACEHOLDER_PATTERNS = {
    'hash': r'#\d+',
    'custom': r'{{[\w_]+}}',  # Add your pattern
}
```

#### Change AI Prompt
Edit `_generate_variable_names_ai()` in `template_converter.py` to customize how AI suggests variable names.

#### Styling
Edit component styles in:
- `TemplateUploader.jsx` (inline Tailwind classes)
- `TemplateManager.jsx` (inline Tailwind classes)

### Troubleshooting

**Problem: Upload fails**
- Check file is `.docx` format
- Verify file is not corrupted
- Check server logs for errors

**Problem: No placeholders detected**
- Ensure placeholders match patterns (hash, underscores, brackets)
- Check console logs for detection results

**Problem: AI not suggesting names**
- Verify Azure OpenAI config in `.env`
- Check AIConfig.validate() returns true
- Falls back to basic naming if AI fails

**Problem: Template not in list**
- Check `data/user_templates/user_template_config.json`
- Verify save endpoint was called successfully
- Refresh the page

### Next Steps

1. **Upload your first template** to test the feature
2. **Review the generated Jinja2 file** to ensure quality
3. **Use the template** in document generation
4. **Report any issues** or suggestions

---

## Support

For issues or questions:
1. Check the logs in `server/` directory
2. Review `TEMPLATE_UPLOAD_FEATURE.md` for detailed documentation
3. Test with sample templates provided in `data/templates/`

Happy templating! 🎉
