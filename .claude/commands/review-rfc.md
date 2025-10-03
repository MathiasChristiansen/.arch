---
description: Review a pending RFC as an architect
argument-hint: <rfc-number>
allowed-tools: Read, Edit, Bash, Write
---

Review RFC-$1 as an architect:

1. Find and read the RFC from `.arch/rfcs/pending/` matching RFC-$1
2. Analyze the RFC thoroughly:
   - Problem statement clarity
   - Technical approach soundness
   - Architecture changes impact
   - Testing requirements adequacy
   - Dependencies and blockers
3. Provide detailed feedback in "Architect Notes" section
4. Make a decision and ask user to confirm:
   - **Approve**: Move to `.arch/rfcs/approved/`, suggest sprint assignment
   - **Reject**: Move to `.arch/rfcs/rejected/`, document reasoning
   - **Request Changes**: Keep in pending, list required improvements
5. If approved and architectural decision is needed, offer to create ADR in `.arch/decisions/`
6. Update or create your architect agent file in `.arch/agents/architects/` with review activity

After review, summarize your decision and key recommendations.
