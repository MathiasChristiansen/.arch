---
name: wave-report
description: Generate a detailed progress report for the current sprint wave with metrics and recommendations.
allowed-tools: Read, Glob, Bash
---

# Wave Progress Report

Generate a comprehensive progress report for the current sprint.

## Sprint Information

### Sprint Main File
!`cat .arch/sprints/current.md 2>/dev/null | head -40 || echo "No current sprint"`!

### Wave Status
!`cat .arch/sprints/sprint-*/WAVE-STATUS.md 2>/dev/null || echo "No wave status found"`!

## RFC Details

### In-Progress RFCs
!`for f in .arch/rfcs/in-progress/*.md; do echo "=== $f ==="; head -30 "$f" 2>/dev/null; echo; done || echo "None"`!

### Recently Completed RFCs
!`for f in .arch/rfcs/implemented/*.md; do echo "=== $f ==="; head -20 "$f" 2>/dev/null; echo; done 2>/dev/null | head -60 || echo "None"`!

## Agent Status

!`for f in .arch/agents/implementers/*.md; do echo "=== $f ==="; cat "$f" 2>/dev/null | head -25; echo; done 2>/dev/null || echo "No agent files"`!

## Your Task

Generate a comprehensive wave progress report:

```markdown
# Sprint N Wave Progress Report

**Generated**: [Timestamp]
**Sprint**: N
**Current Wave**: X of Y

## Executive Summary

[1-2 sentence summary of overall progress]

## Wave Progress

| Wave | Status | RFCs | Completed | Progress |
|------|--------|------|-----------|----------|
| 1 | ✅ Complete | 2 | 2/2 | 100% |
| 2 | ⚙️ In Progress | 2 | 0/2 | 50% |
| 3 | ⏸️ Pending | 1 | 0/1 | 0% |

## RFC Status Details

| RFC | Title | Wave | Status | Agent | Time Elapsed | Est. Remaining |
|-----|-------|------|--------|-------|--------------|----------------|
| 001 | Schema | 1 | ✅ | @impl-001 | 4.5h | - |
| 002 | API | 1 | ✅ | @impl-002 | 3h | - |
| 003 | User | 2 | ⚙️ | @impl-003 | 2h | ~3h |
| 004 | Product | 2 | ⚙️ | @impl-004 | 1.5h | ~2.5h |
| 005 | Integrate | 3 | ⏸️ | - | - | ~6h |

## Time Tracking

| Metric | Estimated | Actual | Variance |
|--------|-----------|--------|----------|
| Wave 1 | 4h | 4.5h | +12% |
| Wave 2 | 5h | 3.5h (in progress) | On track |
| Wave 3 | 6h | Not started | - |
| **Total** | **15h** | **8h** (so far) | On track |

## Blockers

### Active
[List any active blockers or "None"]

### Resolved
[List resolved blockers or "None"]

## Agent Utilization

| Agent | Current RFC | Status | Hours Worked |
|-------|-------------|--------|--------------|
| @impl-001 | - | Available | 4.5h |
| @impl-002 | - | Available | 3h |
| @impl-003 | RFC-003 | Active | 2h |
| @impl-004 | RFC-004 | Active | 1.5h |

## Estimated Completion

- **Wave 2 Complete**: [Estimated time]
- **Wave 3 Complete**: [Estimated time]
- **Sprint Complete**: [Estimated time]

## Recommendations

1. [Recommendation based on current status]
2. [Any optimization suggestions]
3. [Risk mitigation if needed]

## Next Actions

1. [ ] [Immediate action needed]
2. [ ] [Next wave preparation]
3. [ ] [Any follow-ups]
```

Read the actual files to populate with real data.
