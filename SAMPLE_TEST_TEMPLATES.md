# Sample Templates for Testing Template Upload Feature

## How to Create Test Templates

Create simple .docx files with the following content to test placeholder detection:

---

## Test Template 1: Hash Placeholders

**Filename**: `test_hash_template.docx`

```
SIMPLE AGREEMENT

This Agreement is made on #1 between #2 and #3.

The first party (#2) agrees to pay #4 to the second party (#3).

Duration: #5 months
Start Date: #6
Location: #7

Signatures:
Party 1: #8
Party 2: #9

Witness 1: #10
Witness 2: #11
```

**Expected Variables:**
- #1 → `effective_date`
- #2 → `party_name_1`
- #3 → `party_name_2`
- #4 → `amount`
- #5 → `duration_months`
- #6 → `start_date`
- #7 → `location`
- #8 → `party_1_signature`
- #9 → `party_2_signature`
- #10 → `witness_1_name`
- #11 → `witness_2_name`

---

## Test Template 2: Underscore Placeholders

**Filename**: `test_underscore_template.docx`

```
NOTICE

Date: ____

To: ____
Address: ____

Dear ____,

This is to inform you that the amount of ____ is due on ____.

Please contact us at ____ for any queries.

Regards,
____
Position: ____
Company: ____
```

**Expected Variables:**
- ____ → `notice_date`
- ____ → `recipient_name`
- ____ → `recipient_address`
- ____ → `salutation_name`
- ____ → `amount_due`
- ____ → `due_date`
- ____ → `contact_number`
- ____ → `sender_name`
- ____ → `sender_position`
- ____ → `company_name`

---

## Test Template 3: Bracket Placeholders

**Filename**: `test_bracket_template.docx`

```
EMPLOYMENT OFFER

Date: [DATE]

Dear [CANDIDATE_NAME],

We are pleased to offer you the position of [JOB_TITLE] at [COMPANY_NAME].

Salary: [SALARY]
Start Date: [START_DATE]
Location: [OFFICE_LOCATION]

Benefits:
- Health Insurance: [HEALTH_PLAN]
- Leave Days: [LEAVE_DAYS]

Please sign below to accept this offer.

Signature: [SIGNATURE]
Date: [SIGNATURE_DATE]

HR Manager: [HR_NAME]
Email: [HR_EMAIL]
```

**Expected Variables:**
- [DATE] → `offer_date`
- [CANDIDATE_NAME] → `candidate_name`
- [JOB_TITLE] → `job_title`
- [COMPANY_NAME] → `company_name`
- [SALARY] → `salary`
- [START_DATE] → `start_date`
- [OFFICE_LOCATION] → `office_location`
- [HEALTH_PLAN] → `health_plan`
- [LEAVE_DAYS] → `leave_days`
- [SIGNATURE] → `signature`
- [SIGNATURE_DATE] → `signature_date`
- [HR_NAME] → `hr_name`
- [HR_EMAIL] → `hr_email`

---

## Test Template 4: Mixed Placeholders

**Filename**: `test_mixed_template.docx`

```
RENTAL AGREEMENT

Agreement Date: #1
Between:
Landlord: [LANDLORD_NAME]
Address: ____

And:
Tenant: [TENANT_NAME]  
Address: ____

Property Details:
Location: #2
Monthly Rent: [RENT_AMOUNT]
Security Deposit: #3
Lease Period: ____ months

Start Date: #4
End Date: ____

Utilities Included: [UTILITIES]

Signatures:
Landlord: ____
Tenant: ____

Witness: [WITNESS_NAME]
Date: #5
```

**Expected Variables (Mixed Types):**
- #1 → `agreement_date`
- [LANDLORD_NAME] → `landlord_name`
- ____ → `landlord_address`
- [TENANT_NAME] → `tenant_name`
- ____ → `tenant_address`
- #2 → `property_location`
- [RENT_AMOUNT] → `rent_amount`
- #3 → `security_deposit`
- ____ → `lease_period_months`
- #4 → `start_date`
- ____ → `end_date`
- [UTILITIES] → `utilities`
- ____ → `landlord_signature`
- ____ → `tenant_signature`
- [WITNESS_NAME] → `witness_name`
- #5 → `witness_date`

---

## How to Test

### Step 1: Create Template in Word
1. Open Microsoft Word
2. Copy one of the templates above
3. Paste into Word
4. Save as `.docx` file

### Step 2: Upload to System
1. Login to Legal Documentation Assistant
2. Click "My Templates" in navbar
3. Click "Upload New Template"
4. Select your test `.docx` file

### Step 3: Verify Detection
Check that:
- All placeholders are detected
- Correct placeholder type is identified
- AI suggests meaningful variable names
- Context is shown correctly

### Step 4: Edit and Save
1. Edit variable names if needed
2. Set template name and category
3. Click "Convert & Save"
4. Verify template appears in library

### Step 5: Use Template
1. Go to document generation
2. Select your custom template
3. Fill in fields
4. Generate document
5. Verify all placeholders are replaced

---

## Expected AI Suggestions

The AI should suggest variable names like:

**Hash Placeholders (#1, #2):**
- Near "date" → `effective_date`, `agreement_date`
- Near "name" → `party_name_1`, `party_name_2`
- Near "amount" → `amount`, `rent_amount`
- Near "duration" → `duration_months`, `lease_period`

**Bracket Placeholders ([NAME]):**
- Keeps the content: `[LANDLORD_NAME]` → `landlord_name`
- Converts to snake_case: `[JOB_TITLE]` → `job_title`

**Underscore Placeholders (____):**
- Uses context: Near "Address:" → `address`
- Sequential if unclear: `field_1`, `field_2`, etc.

---

## Troubleshooting

**No placeholders detected?**
- Make sure you're using one of these formats: #, ____, [NAME]
- Minimum 4 characters for underscores (____) 
- Brackets must have text inside: [NAME] not []

**AI not suggesting good names?**
- Check Azure OpenAI is configured
- Look at the context shown in the table
- Manually edit the names - that's fine!

**Template not working?**
- Check the saved Jinja2 file in `data/user_templates/`
- Verify variable names in `user_template_config.json`
- Try filling the template with test data

---

## Advanced Testing

### Test Edge Cases

1. **Many placeholders**: Template with 50+ placeholders
2. **Nested tables**: Placeholders inside Word tables
3. **Special characters**: Names with spaces, hyphens
4. **Duplicate placeholders**: Same placeholder used multiple times
5. **Mixed formatting**: Bold, italic placeholders

### Performance Testing

1. Upload large template (100+ placeholders)
2. Time the analysis (should be <5 seconds)
3. Check token usage in logs
4. Verify AI suggestions quality

### Error Testing

1. Upload wrong file type (.pdf, .txt)
2. Upload corrupted .docx file
3. Cancel upload mid-process
4. Delete template while in use

---

## Sample Data for Testing

Use these values when testing filled documents:

```json
{
  "party_name_1": "John Smith",
  "party_name_2": "ABC Corporation",
  "effective_date": "2024-01-15",
  "amount": "50000",
  "location": "Mumbai, India",
  "rent_amount": "25000",
  "duration_months": "11",
  "landlord_name": "Rahul Sharma",
  "tenant_name": "Tech Solutions Pvt Ltd",
  "witness_name": "Priya Patel"
}
```

---

Happy Testing! 🧪
