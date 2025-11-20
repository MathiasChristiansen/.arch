Regenerate sprint context files based on current project state, including new ADRs, schema changes, and updated dependencies.

**Usage**: `/update-sprint-context <sprint-number>`

**Example**: `/update-sprint-context 5`

## Your Task

You are updating context files for Sprint <sprint-number> to reflect the current project state. This is important when:
- New ADRs have been created during the sprint
- Database schema has changed
- Architecture patterns have evolved
- New dependencies have been added
- RFC dependencies have changed

### Step 1: Verify Sprint Exists

1. Check `.arch/sprints/sprint-<sprint-number>.md` exists
2. Check `.arch/sprints/sprint-<sprint-number>/` directory exists
3. If not found, error and suggest using `/init-sprint` instead

### Step 2: Analyze Current Project State

Scan the project to gather updated information:

#### Database Schema
- Check `migrations/` directory for recent changes
- Look for schema documentation in `docs/`
- Examine ORM models (e.g., `models/`, `domain/`, `entities/`)
- Compare with current CONTEXT.md to identify changes

#### Architecture
- Check for new files/directories since sprint started
- Review package structure changes
- Check for new configuration files

#### ADRs
- List all files in `.arch/decisions/`
- Read any ADRs created after sprint started
- Compare with current CONTEXT.md ADRs section

#### API Changes
- Check for new endpoints in handlers/routes
- Review API documentation changes
- Check for new API patterns

#### Dependencies
- Check `package.json`, `go.mod`, `requirements.txt`, etc.
- Look for new external service integrations
- Check for new environment variables in `.env.example`

#### Tests
- Check for new test patterns or frameworks
- Review test coverage changes

### Step 3: Update CONTEXT.md

Update `.arch/sprints/sprint-<sprint-number>/CONTEXT.md`:

1. **Database Schema section**:
   - Add any new tables/collections
   - Update existing table definitions if changed
   - Add new indexes or constraints
   - Update example data if schema changed

2. **Architecture Overview section**:
   - Update tech stack if new libraries added
   - Update package structure if reorganized
   - Update patterns if new patterns introduced

3. **Key Architectural Decisions section**:
   - Add any new ADRs created during sprint
   - Update existing ADR summaries if refined
   - Remove deprecated ADRs (mark as superseded)

4. **API Contracts section**:
   - Add new endpoints created during sprint
   - Update existing endpoint documentation if changed
   - Add new error responses if introduced

5. **Dependencies & Infrastructure section**:
   - Add new external services
   - Update existing service configurations
   - Add new environment variables

6. **Code Patterns & Examples section**:
   - Add new patterns introduced during sprint
   - Update examples if patterns evolved
   - Add common solutions to issues encountered

7. **Common Gotchas section**:
   - Add new gotchas discovered during sprint
   - Add solutions to common problems
   - Update based on implementer feedback

8. **Update "Last Updated" timestamp** at top of file

### Step 4: Check DEPENDENCY-GRAPH.md

Review `.arch/sprints/sprint-<sprint-number>/DEPENDENCY-GRAPH.md`:

1. **Read all RFCs** to check if dependencies have changed
2. **Compare with current graph**:
   - Have any "Blocks" or "Blocked By" changed?
   - Have any RFCs been added/removed from sprint?
3. **If dependencies changed**:
   - Rebuild dependency graph
   - Recalculate wave assignments
   - Update mermaid diagram
   - Update wave breakdown tables
   - Recalculate critical path and time savings
4. **Update change log** with any dependency changes
5. **Update "Last Updated" timestamp**

### Step 5: Sync Sprint Main File

Update `.arch/sprints/sprint-<sprint-number>.md`:

1. **Sprint Context section**:
   - Update with key changes from CONTEXT.md
   - Ensure it summarizes current state
   - Update links if needed

2. **Parallelization Plan section** (if dependencies changed):
   - Update wave assignments
   - Update effort estimates
   - Update blocking relationships

3. **Progress Metrics section**:
   - Update based on current WAVE-STATUS.md
   - Update completion percentages
   - Update current wave

### Step 6: Review WAVE-STATUS.md

Check `.arch/sprints/sprint-<sprint-number>/WAVE-STATUS.md`:

1. **Verify accuracy** of current status
2. **Check for stale data** (agents marked in-progress but completed)
3. **Update metrics** if out of sync
4. **No structural changes needed** (this file is updated during execution)

### Step 7: Validate Consistency

Check that all context files are consistent:

1. **RFCs listed in sprint file** match RFCs in DEPENDENCY-GRAPH.md
2. **Wave assignments** are consistent across all files
3. **Context summaries** match detailed CONTEXT.md
4. **Links** all point to existing files
5. **No placeholder data** remains

### Step 8: Generate Update Report

Provide a summary of changes:

```markdown
## Sprint <sprint-number> Context Updated

**Last Updated**: [Timestamp]

### Changes Made

#### Database Schema
- [Added | Updated | No changes]: [Details]

#### Architecture
- [Added | Updated | No changes]: [Details]

#### ADRs
- Added: [List new ADRs]
- Updated: [List updated ADRs]
- No changes

#### API Contracts
- New endpoints: [List]
- Updated endpoints: [List]
- No changes

#### Dependencies
- New external services: [List]
- New libraries: [List]
- New environment variables: [List]
- No changes

#### RFC Dependencies
- Dependency changes: [List]
- Wave reassignments: [List]
- No changes

#### Code Patterns
- New patterns: [List]
- Updated examples: [List]

#### Common Gotchas
- New gotchas added: [Count]
- Based on issues: [List issues that prompted additions]

### Files Updated
- `.arch/sprints/sprint-<sprint-number>/CONTEXT.md`
- `.arch/sprints/sprint-<sprint-number>/DEPENDENCY-GRAPH.md` [if dependencies changed]
- `.arch/sprints/sprint-<sprint-number>.md`

### Impact on Sprint

**Wave Assignments**: [Changed | Unchanged]
**Critical Path**: [Changed | Unchanged] - [Old: Xh | New: Yh]
**Estimated Completion**: [Changed | Unchanged]

### Recommendations

[Any recommendations based on changes, such as:]
- Consider updating implementer agents with new patterns
- Review active RFCs for compatibility with schema changes
- Update integration tests for new endpoints
- etc.
```

## When to Update Context

Update sprint context when:

### During Sprint Execution
- **After Wave 1 completes**: Often creates foundation that affects later waves
- **Mid-sprint if significant changes**: New ADRs, schema changes, pattern changes
- **When agents report missing context**: If implementers ask for info not in CONTEXT.md

### Between Waves
- **Before starting new wave**: Ensure latest context is available
- **If previous wave created new patterns**: Capture them for next wave

### After Sprint Completes
- **Sprint retrospective**: Update based on lessons learned
- **For next sprint reference**: Ensure documentation is accurate

## Important Notes

### Thoroughness is Key
Context files are the primary source of truth for parallel agents. Be comprehensive:
- Include code examples, not just descriptions
- Link to specific files and line numbers
- Document edge cases and gotchas
- Explain "why" not just "what"

### Preserve What Works
Don't remove context that's still valid:
- Keep existing examples if still relevant
- Maintain historical ADRs (mark as superseded, don't delete)
- Preserve gotchas even if resolved (helps future agents avoid same issues)

### Be Specific
Avoid vague descriptions:
- ❌ "We use PostgreSQL for the database"
- ✅ "PostgreSQL 15 with GORM ORM, migrations in `migrations/`, connection pool size 20"

### Update, Don't Regenerate
This command should **update** existing context, not replace it entirely:
- Preserve manual additions/refinements
- Add to existing sections
- Only replace sections that are clearly outdated

### Coordinate with Active Work
If sprint is in progress:
- Check WAVE-STATUS.md for active RFCs
- Consider impact of context changes on in-progress work
- Communicate significant changes to active agents

## Error Handling

**Sprint not found**:
```
ERROR: Sprint <sprint-number> not found.

Available sprints:
- Sprint 1
- Sprint 2

Use /init-sprint <sprint-number> to create a new sprint.
```

**Sprint not initialized properly**:
```
ERROR: Sprint <sprint-number> exists but is missing context files.

Missing:
- CONTEXT.md
- DEPENDENCY-GRAPH.md

Use /init-sprint <sprint-number> to reinitialize the sprint.
```

**Circular dependencies detected** (if dependencies changed):
```
ERROR: Circular dependency detected after dependency updates:
RFC-001 → RFC-002 → RFC-003 → RFC-001

This must be resolved before continuing. Options:
1. Remove one dependency to break the cycle
2. Split an RFC into smaller independent RFCs
3. Restructure the implementation order
```

## Example Scenarios

### Scenario 1: Wave 1 Added New Database Tables

After Wave 1 completes, RFCs added new tables. Update context:
1. Read migration files created in Wave 1
2. Add new tables to CONTEXT.md Database Schema section
3. Add example data for new tables
4. Update ERD diagram with new relationships
5. No dependency changes, so DEPENDENCY-GRAPH.md unchanged

### Scenario 2: New ADR Created Mid-Sprint

Architect created ADR-005 for caching strategy:
1. Read ADR-005
2. Add to CONTEXT.md Key Architectural Decisions section
3. Add caching examples to Code Patterns section
4. Update sprint main file context summary
5. DEPENDENCY-GRAPH.md unchanged

### Scenario 3: RFC Dependencies Changed

RFC-003 originally blocked by RFC-001, but after review can be independent:
1. Update RFC-003 metadata (remove RFC-001 from "Blocked By")
2. Rebuild dependency graph
3. Recalculate waves (RFC-003 moves from Wave 2 to Wave 1)
4. Update DEPENDENCY-GRAPH.md with new wave assignments
5. Update sprint main file Parallelization Plan
6. Update WAVE-STATUS.md if wave is not started yet

## Additional Context

- See `.arch/sprints/SPRINT-PLANNING-GUIDE.md` for context management best practices
- Review `.arch/README.md` for overall workflow
- Check current sprint's CONTEXT.md to understand what context includes
