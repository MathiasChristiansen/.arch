---
name: create-rfc
description: Create a new RFC from a feature description. Generates a properly structured RFC in pending status.
argument-hint: <feature-name>
allowed-tools: Read, Write, Glob
---

# Create RFC: $ARGUMENTS

Create a new RFC for the feature described.

## RFC Template

!`cat .arch/rfcs/template.md 2>/dev/null || echo "Template not found"`!

## Existing RFCs (for numbering)

!`ls .arch/rfcs/*/*.md 2>/dev/null | sort | tail -10 || echo "No existing RFCs"`!

## Your Task

### Step 1: Determine RFC Number

Find the highest existing RFC number and increment by 1.

### Step 2: Create RFC File

Create `.arch/rfcs/pending/XXX-feature-name.md` using the template with:

1. **Metadata**:
   - RFC Number: RFC-XXX
   - Status: pending
   - Created: Current date
   - Effort: Estimate based on description

2. **Problem Statement**:
   - What problem does this solve?
   - Who is affected?
   - What happens if we don't solve it?

3. **Proposed Solution**:
   - High-level approach
   - Key components
   - How it addresses the problem

4. **Technical Details**:
   - Architecture changes (if any)
   - API changes (if any)
   - Data model changes (if any)

5. **Implementation Checklist**:
   - Break down into steps
   - Include testing requirements

6. **Dependencies**:
   - What this might block
   - What might block this
   - Related RFCs

7. **Acceptance Criteria**:
   - How to verify it's done
   - Specific requirements

### Step 3: Summary

After creating, provide:
- RFC number and title
- File path
- Next steps (review with `/review-rfc XXX`)

## Clarifying Questions

If the feature description is unclear, ask about:
- Specific functionality needed
- User impact
- Technical constraints
- Integration requirements
- Testing expectations
