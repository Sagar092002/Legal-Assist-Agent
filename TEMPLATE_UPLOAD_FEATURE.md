# User Template Upload & Conversion Feature

## Overview
This feature allows users to upload their own DOCX templates and automatically convert them to Jinja2 format for use in the Legal Documentation Assistant.

## Features

### 1. **Automatic Placeholder Detection**
Detects various placeholder formats:
- Hash placeholders: `#1`, `#2`, `#123`
- Underscores: `____`, `___________`
- Dots: `....`, `..........`
- Square brackets: `[NAME]`, `[DATE]`
- Curly brackets: `{NAME}`, `{DATE}`
- Angle brackets: `<NAME>`, `<DATE>`
- Dollar signs: `${NAME}`, `${DATE}`
- Percent signs: `%NAME%`, `%DATE%`

### 2. **AI-Powered Variable Naming**
Uses Azure OpenAI GPT-4o-mini to:
- Analyze placeholder context
- Generate meaningful variable names
- Suggest appropriate field types (text, date, number, email)

### 3. **Interactive Variable Editor**
Users can:
- Review detected placeholders
- Edit variable names
- See context where each placeholder appears
- Organize by category

### 4. **Template Library Management**
- View all uploaded templates
- Delete unwanted templates
- Preview template details
- Use templates in document generation

## Architecture

### Backend Components

#### 1. Template Converter (`ai/template_converter.py`)
```python
from ai.template_converter import template_converter

# Analyze template
analysis = template_converter.analyze_template(doc_path)

# Convert to Jinja2
result = template_converter.convert_to_jinja2(
    doc_path,
    output_path,
    variable_mapping
)

# Extract metadata
metadata = template_converter.extract_template_metadata(
    output_path,
    template_name,
    category
)
```

#### 2. API Endpoints (`app.py`)

**Upload and Analyze:**
```
POST /api/template/upload-and-analyze
Content-Type: multipart/form-data

Returns: {
    success: true,
    total_placeholders: 15,
    placeholder_types: {...},
    suggested_conversions: {...},
    context: {...}
}
```

**Convert Template:**
```
POST /api/template/convert
Content-Type: application/json

Body: {
    temp_path: "/tmp/...",
    variable_mapping: {
        "#1": "party_name_1",
        "#2": "effective_date"
    },
    template_name: "My Custom NDA",
    category: "Employment"
}

Returns: {
    success: true,
    conversion: {...},
    metadata: {...}
}
```

**Save to Library:**
```
POST /api/template/save-to-library
Content-Type: application/json

Body: {
    metadata: {...},
    output_path: "data/user_templates/..."
}
```

**List User Templates:**
```
GET /api/template/user-templates

Returns: {
    success: true,
    templates: [...],
    count: 5
}
```

**Delete Template:**
```
DELETE /api/template/delete/{template_name}

Returns: {
    success: true,
    message: "Template deleted successfully"
}
```

#### 3. Template Manager (`ai/template_manager_v2.py`)
Extended to support both system and user templates:
```python
from ai.template_manager_v2 import get_template_manager

tm = get_template_manager()

# Get all templates (system + user)
all_templates = tm.get_all_templates()

# Fill template (works with both types)
doc = tm.fill_template(template_name, field_values)
```

### Frontend Components

#### 1. Template Uploader (`client/src/components/TemplateUploader.jsx`)
Three-step wizard:
- **Step 1:** Upload DOCX file
- **Step 2:** Edit variable names and metadata
- **Step 3:** Success confirmation

#### 2. Template Manager (`client/src/components/TemplateManager.jsx`)
- Grid view of all user templates
- Upload new template button
- Delete/view template actions
- Template detail modal

#### 3. Routing (`client/src/App.js`)
```javascript
<Route path="/templates" element={<TemplateManager />} />
<Route path="/templates/upload" element={<TemplateUploader />} />
```

## User Flow

### 1. Upload Template
1. Navigate to "My Templates" in navbar
2. Click "Upload New Template"
3. Select .docx file
4. System analyzes placeholders

### 2. Edit Variables
1. Review detected placeholders with context
2. Edit variable names (AI suggests smart names)
3. Set template name and category
4. Click "Convert & Save"

### 3. Use Template
1. Template appears in template library
2. Can be used like system templates
3. Supports all document generation features

## Storage Structure

```
data/
├── templates/                    # System templates
│   └── template_config.json
└── user_templates/              # User-uploaded templates
    ├── user_template_config.json
    ├── My_Custom_NDA_jinja2.docx
    └── Custom_Lease_jinja2.docx
```

### User Template Config Format
```json
{
  "My Custom NDA": {
    "name": "My Custom NDA",
    "category": "Employment",
    "filename": "My_Custom_NDA_jinja2.docx",
    "description": "User-uploaded template: My Custom NDA",
    "keywords": ["nda", "employment", "custom"],
    "fields": {
      "party_name_1": {
        "label": "Party Name 1",
        "type": "text",
        "required": true,
        "example": ""
      },
      "effective_date": {
        "label": "Effective Date",
        "type": "date",
        "required": true,
        "example": ""
      }
    },
    "is_user_template": true,
    "jinja_variable_count": 15
  }
}
```

## AI Features

### Context-Aware Variable Naming
Uses GPT-4o-mini with context to suggest variable names:

**Input:**
```
Placeholder: #1
Context: "This AGREEMENT is made between #1 (hereinafter called the Party)"
```

**AI Output:**
```
party_name_1
```

### Field Type Detection
Automatically detects field types:
- Date fields: `effective_date`, `start_date`, `contract_year`
- Numeric fields: `amount`, `price`, `rent_amount`
- Email fields: `email_address`, `contact_email`
- Text fields: Everything else

## Error Handling

### Backend
```python
try:
    conversion_result = template_converter.convert_to_jinja2(...)
except FileNotFoundError:
    return jsonify({'error': 'Template file not found'}), 404
except Exception as e:
    logger.error(f"Conversion failed: {e}")
    return jsonify({'error': str(e)}), 500
```

### Frontend
```javascript
try {
    const response = await fetch('/api/template/convert', {...});
    const data = await response.json();
    
    if (data.success) {
        toast.success('Template converted!');
    } else {
        toast.error(data.error || 'Conversion failed');
    }
} catch (error) {
    toast.error('Failed to convert template');
}
```

## Testing

### Manual Testing
1. Upload sample template with various placeholder types
2. Verify all placeholders are detected
3. Edit variable names
4. Save template
5. Use template in document generation
6. Verify output quality

### Test Templates
Create test templates with:
- Hash placeholders (#1, #2, #3)
- Underscores (_____, ________)
- Brackets ([NAME], {DATE})
- Mixed placeholders

## Dependencies

### Python
- `docx` - DOCX file manipulation
- `docxtpl` - Jinja2 template rendering
- `azure-openai` - AI-powered variable naming

### React
- `react-icons` - UI icons
- `react-toastify` - Toast notifications
- `react-router-dom` - Routing

## Performance

- Template analysis: ~2-3 seconds
- AI variable naming: ~1-2 seconds (uses GPT-4o-mini, ~500 tokens)
- Conversion: <1 second
- Total upload flow: ~3-5 seconds

## Future Enhancements

1. **Template Sharing**
   - Share templates with other users
   - Public template marketplace

2. **Version Control**
   - Track template versions
   - Rollback to previous versions

3. **Batch Upload**
   - Upload multiple templates at once
   - Bulk conversion

4. **Template Preview**
   - Preview template before upload
   - Show sample filled document

5. **Advanced Editing**
   - Rich text editor for templates
   - Visual placeholder editor

## Troubleshooting

### Issue: Placeholders not detected
**Solution:** Ensure placeholders match supported patterns (hash, underscores, brackets, etc.)

### Issue: AI variable names not working
**Solution:** Check Azure OpenAI configuration in `.env` file

### Issue: Template not appearing in list
**Solution:** Check `user_template_config.json` file and ensure template was saved correctly

### Issue: Conversion fails
**Solution:** Verify DOCX file is valid and not corrupted

## Security Considerations

1. **File Upload Validation**
   - Only .docx files allowed
   - File size limits enforced

2. **Path Sanitization**
   - Template names sanitized
   - File paths validated

3. **User Isolation**
   - User templates stored separately
   - No access to system templates directory

## API Reference

See individual endpoint documentation above for detailed request/response formats.

## License

Part of Legal Documentation Assistant - MIT License
