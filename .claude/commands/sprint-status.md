---
description: Show current sprint progress and RFC status overview
allowed-tools: Bash, Read, Glob
---

Show comprehensive sprint status:

1. Find the current sprint file in `.arch/sprints/` (either `current.md` symlink or latest `sprint-N.md`)
2. Read and display sprint information:
   - Sprint number and date range
   - Sprint goals
3. Count and list RFCs by status:
   - **Pending Review**: Count files in `.arch/rfcs/pending/`
   - **Approved**: Count files in `.arch/rfcs/approved/`
   - **In Progress**: List files in `.arch/rfcs/in-progress/` with assignees (read each to get "Assigned To" field)
   - **Implemented**: Count files in `.arch/rfcs/implemented/` that were completed in current sprint date range
4. List active agents from `.arch/agents/`:
   - Architects with current review tasks
   - Implementers with current assignments
5. Present in a clean, formatted summary

Display results in this format:
```
Sprint N (YYYY-MM-DD to YYYY-MM-DD)
Goals: [sprint goals]

RFC Status:
- Pending Review: N
- Approved & Ready: N
- In Progress: N
  • RFC-XXX: Title (assigned-to)
  • RFC-YYY: Title (assigned-to)
- Implemented This Sprint: N

Active Agents: N implementers, N architects
```
