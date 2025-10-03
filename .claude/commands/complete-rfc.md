---
description: Mark an RFC as implemented and move it to completed
argument-hint: <rfc-number>
allowed-tools: Bash, Read, Edit
---

Complete RFC-$1 and move it to implemented status:

1. Find the RFC file in `.arch/rfcs/in-progress/` matching RFC-$1
2. Move it to `.arch/rfcs/implemented/`
3. Read the RFC file and update its frontmatter:
   - Status: `implemented`
   - Completed: Current timestamp (YYYY-MM-DD HH:MM)
4. Find your implementer agent file in `.arch/agents/implementers/`
5. Update your agent file:
   - Clear current assignment
   - Add RFC-$1 to completed RFCs list with duration (calculate from Started to Completed timestamps)

After completing, confirm which RFC was marked as implemented and show the total implementation duration.
