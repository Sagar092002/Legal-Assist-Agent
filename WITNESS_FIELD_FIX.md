# Witness Field Auto-Fill Fix ✅

## Problem Identified
Witness names were being auto-filled with example values ("Mr. Amit Patel", "Mr. Suresh Reddy", etc.) instead of asking the user for actual witness information during document creation.

## Root Cause
Two issues were found:

1. **Backend (`template_manager_v2.py`)**: The `_prepare_context()` method was filling missing fields with example values from `template_config.json`:
   ```python
   # OLD CODE (PROBLEMATIC)
   context[field_name] = field_config.get('example', f'[{field_config.get("label", field_name)}]')
   ```

2. **Frontend (`WorkspaceAssistant.jsx`)**: The `getQuestionsForTemplate()` function for Lease Agreement was missing questions for the 4 witness fields:
   - `lessor_witness_1`
   - `lessor_witness_2`
   - `lessee_witness_1`
   - `lessee_witness_2`

## Fixes Applied

### Fix 1: Backend Template Manager
**File**: `server/ai/template_manager_v2.py`

**Change**: Modified `_prepare_context()` to use placeholders instead of examples:
```python
# NEW CODE (FIXED)
context[field_name] = f'[{field_config.get("label", field_name)}]'
```

**Impact**: Missing fields now show as `[Lessor Witness 1 name]` instead of fake example data like "Mr. Amit Patel".

### Fix 2: Frontend Question Flow
**File**: `client/src/components/WorkspaceAssistant.jsx`

**Change**: Added 4 witness questions to Lease Agreement template:
```javascript
{ field: 'lessor_witness_1', question: 'What is the name of the first witness for the landlord?' },
{ field: 'lessor_witness_2', question: 'What is the name of the second witness for the landlord?' },
{ field: 'lessee_witness_1', question: 'What is the name of the first witness for the tenant?' },
{ field: 'lessee_witness_2', question: 'What is the name of the second witness for the tenant?' }
```

**Impact**: Users will now be explicitly asked for witness names during the conversational document assembly flow.

## Testing
After these changes, the system should:
1. ✅ Ask for witness names explicitly during document creation
2. ✅ NOT auto-fill with example values
3. ✅ Show clear placeholders `[Witness Name]` if a field is left empty
4. ✅ Allow users to provide actual witness names

## Field Mapping Reference
The witness fields map as follows:

| Frontend Field Name | Backend Config Field | Template Placeholder |
|-------------------|---------------------|---------------------|
| `lessor_witness_1` | `lessor_witness_1` | `{{ lessor_witness_1 }}` |
| `lessor_witness_2` | `lessor_witness_2` | `{{ lessor_witness_2 }}` |
| `lessee_witness_1` | `lessee_witness_1` | `{{ lessee_witness_1 }}` |
| `lessee_witness_2` | `lessee_witness_2` | `{{ lessee_witness_2 }}` |

## Next Steps
1. Restart the backend server to load the updated `template_manager_v2.py`
2. Restart the frontend dev server to load the updated `WorkspaceAssistant.jsx`
3. Test by creating a new Lease Agreement and verify witness questions appear
4. Confirm generated document has actual witness names, not example values

## Related Files
- `server/ai/template_manager_v2.py` - Backend template filling logic
- `client/src/components/WorkspaceAssistant.jsx` - Frontend conversational flow
- `server/data/templates/template_config.json` - Template field definitions
- `server/ai/simple_assembler.py` - Alternative assembler (uses placeholder codes like #16, #17)
