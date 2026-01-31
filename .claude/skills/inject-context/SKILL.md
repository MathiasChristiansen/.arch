---
name: inject-context
description: Re-inject sprint context into current session. Useful after compaction or when context is lost.
allowed-tools: Read, Glob
user-invocable: false
---

# Context Injection

Re-injecting critical sprint context into your session.

## Sprint Context

!`cat .arch/sprints/sprint-*/CONTEXT.md 2>/dev/null | head -200 || cat .arch/sprints/current.md 2>/dev/null | head -100 || echo "No sprint context found"`!

## Active Wave Status

!`cat .arch/sprints/sprint-*/WAVE-STATUS.md 2>/dev/null | head -100 || echo "No wave status found"`!

## Dependency Graph Summary

!`cat .arch/sprints/sprint-*/DEPENDENCY-GRAPH.md 2>/dev/null | head -80 || echo "No dependency graph found"`!

## Your Agent Status

!`cat .arch/agents/implementers/*.md 2>/dev/null | head -50 || echo "No agent files found"`!

## Current RFCs

### In Progress
!`ls .arch/rfcs/in-progress/ 2>/dev/null || echo "None"`!

### Approved (Available)
!`ls .arch/rfcs/approved/ 2>/dev/null || echo "None"`!

---

Context has been re-injected. Continue your work with the sprint context above.

If you are an **implementer**, remember:
1. Follow patterns from the CONTEXT.md above
2. Update WAVE-STATUS.md regularly
3. Use `/claim-rfc` and `/complete-rfc` commands

If you are an **architect**, remember:
1. Update context files when architecture changes
2. Document decisions as ADRs
3. Maintain comprehensive context for parallel agents
