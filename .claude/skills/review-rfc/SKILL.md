---
name: review-rfc
description: Review a pending RFC as an architect. Analyze the proposal and approve, reject, or request changes.
argument-hint: <rfc-number>
allowed-tools: Read, Edit, Bash, Write, Glob
---

# Review RFC-$0

Review RFC-$0 as an architect.

## Pending RFCs

!`ls -la .arch/rfcs/pending/ 2>/dev/null || echo "No pending RFCs found"`!

## Existing ADRs (MUST CROSS-REFERENCE)

**CRITICAL**: All RFC reviews MUST cross-reference relevant ADRs to ensure architectural compliance.

!`ls -la .arch/decisions/ 2>/dev/null || echo "No ADRs found"`!

!`for f in .arch/decisions/*.md; do echo "=== $f ==="; head -15 "$f" 2>/dev/null; echo; done 2>/dev/null | head -100 || echo "No ADR contents"`!

## Review Checklist

**IMPORTANT**: Cross-reference ADRs before approving any RFC!

Use this checklist when reviewing:

### Problem Statement
- [ ] Problem is clearly defined
- [ ] Impact of not solving is explained
- [ ] Scope is appropriate

### Proposed Solution
- [ ] Solution addresses the problem
- [ ] Approach is technically sound
- [ ] Alternatives were considered

### Technical Details
- [ ] Architecture changes are appropriate
- [ ] API design follows conventions
- [ ] Data model changes are valid
- [ ] Performance implications considered

### Testing Requirements
- [ ] Test strategy is comprehensive
- [ ] Coverage requirements are realistic
- [ ] Edge cases are identified

### Dependencies
- [ ] Dependencies are correctly identified
- [ ] "Blocks" and "Blocked By" are accurate
- [ ] No circular dependencies introduced
- [ ] Wave assignment is appropriate

### Effort Estimate
- [ ] Estimate is realistic
- [ ] Complexity is properly assessed

## Your Task

1. **Find and read** the RFC from `.arch/rfcs/pending/` matching RFC-$0

2. **Analyze thoroughly** using the checklist above:
   - Problem statement clarity
   - Technical approach soundness
   - Architecture changes impact
   - Testing requirements adequacy
   - Dependencies and blockers

3. **Provide detailed feedback** in the "Architect Notes" section of the RFC

4. **Cross-reference ADRs**:
   - Check ALL relevant ADRs in `.arch/decisions/`
   - Verify RFC complies with established architectural rules
   - Note any ADRs that apply in Architect Notes
   - If RFC requires a new architectural decision, create ADR

5. **Determine dependencies**:
   - Identify what this RFC blocks
   - Identify what blocks this RFC
   - Assign Parallelization Wave number

5. **Make a decision** (ask user to confirm):
   - **Approve**: Move to `.arch/rfcs/approved/`, suggest sprint assignment
   - **Reject**: Move to `.arch/rfcs/rejected/`, document reasoning
   - **Request Changes**: Keep in pending, list required improvements

6. **If approved and architectural decision needed**:
   - Offer to create ADR in `.arch/decisions/`
   - Use ADR template: `.arch/decisions/template.md`

7. **Update agent file**:
   - Update or create architect file in `.arch/agents/architects/`
   - Record review activity

## ADR Template Reference

If creating an ADR, use this structure:
- **Context**: What issue prompted this decision?
- **Decision**: What was decided?
- **Rationale**: Why this choice?
- **Alternatives Considered**: Other options and why rejected
- **Consequences**: Positive, negative, and neutral impacts

## Decision Output Format

```markdown
## RFC-$0 Review

**Decision**: [Approve | Reject | Request Changes]

### Summary
[Brief summary of what the RFC proposes]

### Technical Assessment
[Evaluation of the approach]

### Dependencies Identified
- **Blocks**: [List RFCs this will block]
- **Blocked By**: [List RFCs that must complete first]
- **Wave Assignment**: [Wave number with rationale]

### Concerns
[Any architectural concerns]

### Architect Notes
[Detailed feedback for the RFC file]

### Required Actions
[If Request Changes: list what needs to change]
[If Approve: suggest sprint assignment]
[If Reject: explain reasoning]
```

## After Review

Summarize:
- Your decision and key reasoning
- Dependencies and wave assignment (if approved)
- Any ADRs created
- Next steps for the RFC author
