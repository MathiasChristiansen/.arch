---
name: update-sprint-context
description: Regenerate sprint context files based on current project state. Use between waves or when architecture changes.
argument-hint: <sprint-number>
allowed-tools: Bash, Read, Edit, Glob
---

# Update Sprint $0 Context

Regenerate sprint context files for Sprint $0 based on current project state.

## When to Update

- After Wave 1 completes (often creates foundation)
- When new ADRs are created
- When database schema changes
- When architecture patterns evolve
- When implementers report missing context
- Before starting a new wave

## Current Context

### Existing CONTEXT.md Summary
!`cat .arch/sprints/sprint-$0/CONTEXT.md 2>/dev/null | head -80 || echo "No context file found"`!

### Recent Changes

#### New ADRs (check for additions)
!`ls -lt .arch/decisions/ 2>/dev/null | head -5`!

#### Recent Migrations (if applicable)
!`ls -lt migrations/ 2>/dev/null | head -5 || ls -lt db/migrations/ 2>/dev/null | head -5 || echo "No migrations directory found"`!

#### Recent Git Changes
!`git log --oneline -10 2>/dev/null || echo "Not a git repository"`!

## Your Task

### Step 1: Verify Sprint Exists

1. Check `.arch/sprints/sprint-$0.md` exists
2. Check `.arch/sprints/sprint-$0/` directory exists
3. If not found, error: use `/init-sprint $0` instead

### Step 2: Analyze Current Project State

Scan the project for updates:

#### Database Schema
- Check `migrations/` for recent changes
- Examine ORM models (e.g., `models/`, `domain/`, `entities/`)
- Compare with current CONTEXT.md

#### Architecture
- Check for new files/directories
- Review package structure changes
- Check for new configuration files

#### ADRs
- Read any ADRs created after sprint started
- Compare with CONTEXT.md ADRs section

#### API Changes
- Check for new endpoints
- Review API documentation changes

#### Dependencies
- Check `package.json`, `go.mod`, `requirements.txt`
- Look for new external service integrations
- Check `.env.example` for new variables

#### Tests
- Check for new test patterns
- Review coverage changes

### Step 3: Update CONTEXT.md

Update `.arch/sprints/sprint-$0/CONTEXT.md`:

1. **Database Schema**: Add new tables, update changed ones
2. **Architecture Overview**: Update tech stack, patterns
3. **Key ADRs**: Add new ADRs created during sprint
4. **API Contracts**: Add new endpoints
5. **Dependencies**: Add new services, variables
6. **Code Patterns**: Add new patterns introduced
7. **Common Gotchas**: Add issues discovered
8. **Last Updated**: Update timestamp

### Step 4: Check DEPENDENCY-GRAPH.md

If RFC dependencies changed:
1. Rebuild dependency graph
2. Recalculate wave assignments
3. Update mermaid diagram
4. Recalculate critical path
5. Update change log

### Step 5: Sync Sprint Main File

Update `.arch/sprints/sprint-$0.md`:
1. Sprint Context section
2. Parallelization Plan (if deps changed)
3. Progress Metrics

### Step 6: Validate Consistency

- RFCs listed match DEPENDENCY-GRAPH.md
- Wave assignments are consistent
- Links point to existing files
- No placeholder data remains

### Step 7: Generate Update Report

```markdown
## Sprint $0 Context Updated

**Last Updated**: [Timestamp]

### Changes Made

#### Database Schema
- [Added | Updated | No changes]: [Details]

#### Architecture
- [Added | Updated | No changes]: [Details]

#### ADRs
- Added: [List new ADRs]
- No changes

#### API Contracts
- New endpoints: [List]
- No changes

#### Dependencies
- New services: [List]
- New variables: [List]
- No changes

#### RFC Dependencies
- Changed: [List changes]
- Wave reassignments: [List]
- No changes

#### Code Patterns
- New patterns: [List]
- Updated examples: [List]

#### Common Gotchas
- New: [Count and list]

### Files Updated
- .arch/sprints/sprint-$0/CONTEXT.md
- .arch/sprints/sprint-$0/DEPENDENCY-GRAPH.md [if changed]
- .arch/sprints/sprint-$0.md

### Impact on Sprint

**Wave Assignments**: [Changed | Unchanged]
**Critical Path**: [Changed | Unchanged]

### Recommendations
[Any recommendations for agents or next steps]
```

## Important Notes

### Update, Don't Regenerate

- **Preserve manual additions**
- **Add to existing sections**
- **Only replace clearly outdated content**

### Be Specific

❌ "We use PostgreSQL"
✅ "PostgreSQL 15 with GORM, migrations in `migrations/`, pool size 20"

### Coordinate with Active Work

If sprint is in progress:
- Check WAVE-STATUS.md for active RFCs
- Consider impact on in-progress work
- Communicate significant changes
