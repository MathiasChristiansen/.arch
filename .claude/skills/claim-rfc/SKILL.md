---
name: claim-rfc
description: Claim an approved RFC and move it to in-progress status. Use when starting work on an RFC.
argument-hint: <rfc-number>
allowed-tools: Bash, Read, Edit, Glob
---

# Claim RFC-$0

Claim RFC-$0 and move it to in-progress status.

## Current Sprint Context

!`cat .arch/sprints/current.md 2>/dev/null | head -20 || echo "No current sprint set"`!

## Available Approved RFCs

!`ls -la .arch/rfcs/approved/ 2>/dev/null || echo "No approved RFCs found"`!

## Your Task

1. **Find the RFC file** in `.arch/rfcs/approved/` matching RFC-$0
2. **Move it** to `.arch/rfcs/in-progress/`
3. **Update RFC frontmatter**:
   - Status: `in-progress`
   - Assigned To: `implementer-${CLAUDE_SESSION_ID}`
   - Started: Current timestamp (YYYY-MM-DD HH:MM)
4. **Update agent file**:
   - Check if an implementer agent file exists in `.arch/agents/implementers/`
   - Create one if needed, or update with current assignment
5. **Update WAVE-STATUS.md** (if active sprint):
   - Mark RFC-$0 as "in-progress"
   - Add agent assignment

## After Completion

Confirm:
- Which RFC was claimed
- The assigned implementer ID
- When implementation started

## Important

**Before implementing, always read**:
- Sprint CONTEXT.md for patterns and architecture
- The RFC specification thoroughly
- DEPENDENCY-GRAPH.md for blocking relationships
