---
name: complete-rfc
description: Mark an RFC as implemented and move it to completed status. Use when finishing RFC implementation.
argument-hint: <rfc-number>
allowed-tools: Bash, Read, Edit, Glob
---

# Complete RFC-$0

Mark RFC-$0 as implemented and move it to completed status.

## Current In-Progress RFCs

!`ls -la .arch/rfcs/in-progress/ 2>/dev/null || echo "No in-progress RFCs found"`!

## Your Task

1. **Find the RFC file** in `.arch/rfcs/in-progress/` matching RFC-$0
2. **Verify completion**:
   - All acceptance criteria are met
   - Tests are passing
   - Code follows project patterns
3. **Move RFC** to `.arch/rfcs/implemented/`
4. **Update RFC frontmatter**:
   - Status: `implemented`
   - Completed: Current timestamp (YYYY-MM-DD HH:MM)
5. **Update agent file** in `.arch/agents/implementers/`:
   - Clear current assignment
   - Add RFC-$0 to completed RFCs list
   - Calculate and record duration (from Started to Completed)
6. **Update WAVE-STATUS.md** (if active sprint):
   - Mark RFC-$0 as "completed"
   - Record completion time
   - Update progress metrics

## After Completion

Confirm:
- Which RFC was marked as implemented
- Total implementation duration
- Updated wave status
