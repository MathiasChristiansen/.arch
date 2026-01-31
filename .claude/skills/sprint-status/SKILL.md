---
name: sprint-status
description: Show current sprint progress and RFC status overview. Use to check sprint health and progress.
allowed-tools: Bash, Read, Glob
---

# Sprint Status

Show comprehensive sprint status.

## Current Sprint

!`cat .arch/sprints/current.md 2>/dev/null | head -40 || echo "No current sprint set"`!

## Wave Status

!`cat .arch/sprints/sprint-*/WAVE-STATUS.md 2>/dev/null | head -80 || echo "No wave status found"`!

## RFCs by Status

### Pending Review
!`ls .arch/rfcs/pending/ 2>/dev/null | grep -c ".md" || echo "0"`! RFCs

### Approved & Ready
!`ls .arch/rfcs/approved/ 2>/dev/null | grep -c ".md" || echo "0"`! RFCs

### In Progress
!`ls .arch/rfcs/in-progress/ 2>/dev/null || echo "None"`!

### Implemented
!`ls .arch/rfcs/implemented/ 2>/dev/null | grep -c ".md" || echo "0"`! RFCs

## Active Agents

### Implementers
!`ls .arch/agents/implementers/*.md 2>/dev/null || echo "None"`!

### Architects
!`ls .arch/agents/architects/*.md 2>/dev/null || echo "None"`!

## Your Task

Present this information in a clean, formatted summary:

```
Sprint N (YYYY-MM-DD to YYYY-MM-DD)
Goals: [sprint goals]

RFC Status:
- Pending Review: N
- Approved & Ready: N
- In Progress: N
  - RFC-XXX: Title (assigned-to)
  - RFC-YYY: Title (assigned-to)
- Implemented This Sprint: N

Wave Progress:
- Wave 1: [status] (N/M RFCs complete)
- Wave 2: [status] (N/M RFCs complete)
- ...

Active Agents: N implementers, N architects

Blockers: [any blockers from WAVE-STATUS.md]
```

Read the RFC files to get titles and assignees for in-progress items.
