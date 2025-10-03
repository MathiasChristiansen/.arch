---
description: Claim an approved RFC and move it to in-progress
argument-hint: <rfc-number>
allowed-tools: Bash, Read, Edit
---

Claim RFC-$1 and move it to in-progress status:

1. Find the RFC file in `.arch/rfcs/approved/` matching RFC-$1
2. Move it to `.arch/rfcs/in-progress/`
3. Read the RFC file and update its frontmatter:
   - Status: `in-progress`
   - Assigned To: `implementer-claude`
   - Started: Current timestamp (YYYY-MM-DD HH:MM)
4. Check if an implementer agent file exists for yourself in `.arch/agents/implementers/`, create one if needed
5. Update your agent file with current assignment showing RFC-$1

After completing, confirm which RFC was claimed and when implementation started.
