---
name: init-sprint
description: Initialize a sprint by analyzing approved RFCs, building dependency graph, assigning waves, and generating comprehensive context files. Use when starting a new sprint.
argument-hint: <sprint-number>
allowed-tools: Bash, Read, Edit, Write, Glob
---

# Initialize Sprint $0

You are initializing Sprint $0. This will analyze approved RFCs, build a dependency graph, assign parallelization waves, and generate all context files.

## Current Project State

### Approved RFCs Available
!`ls -la .arch/rfcs/approved/ 2>/dev/null || echo "No approved RFCs found"`!

### Existing ADRs
!`ls -la .arch/decisions/ 2>/dev/null || echo "No ADRs found"`!

### Project Tech Stack Detection
!`cat package.json 2>/dev/null | head -20 || cat go.mod 2>/dev/null | head -10 || cat requirements.txt 2>/dev/null | head -10 || echo "Unable to detect tech stack - analyze codebase manually"`!

## Templates Available

The following templates are in `.arch/sprints/`:
- `template.md` - Sprint main file template
- `CONTEXT-template.md` - Comprehensive context template
- `DEPENDENCY-GRAPH-template.md` - Dependency visualization template
- `WAVE-STATUS-template.md` - Execution tracking template

**Example**: See `.arch/sprints/example-sprint/` for a complete working example.

## Your Task

### Step 1: Analyze Approved RFCs

1. Read all files in `.arch/rfcs/approved/`
2. Extract from each RFC:
   - RFC number and title
   - Effort estimate (small=2h, medium=4h, large=8h)
   - Dependencies (Blocks, Blocked By, Related)
   - Current Parallelization Wave (if set)

### Step 2: Build Dependency Graph

1. Parse dependencies for each RFC
2. **Validate no circular dependencies** (error if found)
3. Verify all referenced RFCs exist
4. Build adjacency list

### Step 3: Assign Waves (Topological Sort)

1. **Wave 1**: RFCs with `Blocked By = []` (no dependencies)
2. **Wave 2**: RFCs only blocked by Wave 1 RFCs
3. **Wave N**: RFCs only blocked by RFCs in waves < N
4. Validate every RFC is assigned to exactly one wave

### Step 4: Calculate Effort Estimates

1. **Sequential effort**: Sum of all RFC efforts
2. **Parallel effort**: Sum of max effort in each wave
3. **Time savings**: Sequential - Parallel
4. **Critical path**: Longest sequential path

### Step 5: Create Sprint Directory

```bash
mkdir -p .arch/sprints/sprint-$0
```

### Step 6: Generate Files

Create these files using the templates:

1. `.arch/sprints/sprint-$0.md` - Main sprint file
2. `.arch/sprints/sprint-$0/CONTEXT.md` - **CRITICAL**: Comprehensive context
3. `.arch/sprints/sprint-$0/DEPENDENCY-GRAPH.md` - Visual dependencies
4. `.arch/sprints/sprint-$0/WAVE-STATUS.md` - Execution tracking

### Step 7: Generate CONTEXT.md (Most Important!)

Analyze the actual project to fill in:
- Database type and schema (check migrations, models)
- Technology stack (check package.json, go.mod, etc.)
- Package structure (examine directory layout)
- API patterns (examine existing handlers/routes)
- Testing approach (examine existing tests)
- **Include actual code examples from the codebase**

**This is the PRIMARY context source for parallel agents - be comprehensive!**

### Step 8: Summary Report

```markdown
## Sprint $0 Initialized

**RFCs Included**: X total
**Waves**: Y waves
**Estimated Effort**:
- Sequential: X hours
- Parallel: Y hours
- Time Savings: Z hours (W% faster)

**Wave Breakdown**:
- Wave 1: N RFCs (list)
- Wave 2: M RFCs (list)
- ...

**Critical Path**: RFC-XXX → RFC-YYY → RFC-ZZZ (duration)

**Files Created**:
- .arch/sprints/sprint-$0.md
- .arch/sprints/sprint-$0/CONTEXT.md
- .arch/sprints/sprint-$0/DEPENDENCY-GRAPH.md
- .arch/sprints/sprint-$0/WAVE-STATUS.md

**Next Steps**:
1. Review context files for accuracy
2. Start Wave 1: /start-sprint-wave $0 1
```

## Error Handling

- **No approved RFCs**: Error - RFCs must be approved first
- **Circular dependencies**: Error and list the cycle
- **Missing RFC references**: Error and list missing RFCs
- **No waves possible**: Error and explain issue

## Important Notes

- Be thorough with CONTEXT.md - it's critical for parallel agents
- Use actual project data, not placeholders
- Link to files using relative paths
- Validate dependencies before completing
