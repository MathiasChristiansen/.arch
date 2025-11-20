Initialize sprint <sprint-number> by analyzing approved RFCs, building dependency graph, assigning waves, and generating comprehensive context files.

**Usage**: `/init-sprint <sprint-number>`

**Example**: `/init-sprint 5`

## Your Task

You are initializing Sprint <sprint-number>. Follow these steps:

### Step 1: Analyze Approved RFCs

1. **Read all approved RFCs**: List all files in `.arch/rfcs/approved/`
2. **Extract metadata** from each RFC:
   - RFC number and title
   - Effort estimate (small/medium/large → hours)
   - Dependencies (Blocks, Blocked By, Related)
   - Current Parallelization Wave (if set)
3. **Create RFC summary** with all metadata

### Step 2: Build Dependency Graph

1. **Parse dependencies**:
   - For each RFC, note which RFCs it blocks
   - For each RFC, note which RFCs block it
2. **Validate dependencies**:
   - Check for circular dependencies (error if found)
   - Verify all referenced RFCs exist
3. **Build adjacency list** of dependencies

### Step 3: Assign Waves (Topological Sort)

1. **Wave 1**: All RFCs with no dependencies (Blocked By = empty)
2. **Wave 2**: All RFCs only blocked by Wave 1 RFCs
3. **Wave N**: All RFCs only blocked by RFCs in waves < N
4. **Validate**: Ensure every RFC is assigned to exactly one wave

### Step 4: Calculate Effort Estimates

1. **Sequential effort**: Sum of all RFC efforts
2. **Parallel effort**: Sum of max effort in each wave
3. **Time savings**: Sequential - Parallel
4. **Identify critical path**: Longest sequential path through dependencies

### Step 5: Create Sprint Directory Structure

```bash
mkdir -p .arch/sprints/sprint-<sprint-number>
```

### Step 6: Generate Sprint Main File

Create `.arch/sprints/sprint-<sprint-number>.md` using template at `.arch/sprints/template.md` with:

1. **Basic info**:
   - Title: Sprint <sprint-number>
   - Status: planned
   - Duration: TBD (to be filled in when sprint starts)
   - Goal: (summarize RFC objectives)

2. **Objectives section**: Summarize what this sprint will accomplish

3. **Parallelization Plan section**:
   - List each wave with RFCs, effort, and dependencies
   - Include parallel execution instructions
   - Show total effort estimates

4. **RFCs in This Sprint section**:
   - List all RFCs with wave assignments
   - Mark as "Approved (Ready to Claim)"

5. **Sprint Context section**:
   - Database schema (from existing project)
   - Architecture overview (from existing project)
   - Key ADRs (link to existing ADRs in `.arch/decisions/`)
   - Dependencies & infrastructure
   - Testing strategy

### Step 7: Generate CONTEXT.md

Create `.arch/sprints/sprint-<sprint-number>/CONTEXT.md` using template at `.arch/sprints/CONTEXT-template.md`:

1. **Analyze project structure** to fill in:
   - Database type and schema (check migrations, docs, codebase)
   - Technology stack (check package.json, go.mod, etc.)
   - Package structure (examine directory layout)
   - API patterns (examine existing handlers/routes)

2. **Read existing ADRs** from `.arch/decisions/` and summarize key ones

3. **Document testing approach** based on existing tests

4. **Add code examples** from actual codebase for common patterns

5. **Make it comprehensive**: This is the PRIMARY context source for agents

### Step 8: Generate DEPENDENCY-GRAPH.md

Create `.arch/sprints/sprint-<sprint-number>/DEPENDENCY-GRAPH.md` using template at `.arch/sprints/DEPENDENCY-GRAPH-template.md`:

1. **Create Mermaid diagram**:
   ```mermaid
   graph TD
       RFC001[RFC-001: Title<br/>Effort: Xh]
       RFC002[RFC-002: Title<br/>Effort: Yh]
       RFC001 --> RFC002

       classDef wave1 fill:#e1f5e1,stroke:#4caf50,stroke-width:2px
       class RFC001 wave1
   ```

2. **Wave breakdown tables**: For each wave, list RFCs with metadata

3. **Dependency matrix**: Show which RFCs block which

4. **Critical path analysis**: Identify longest path and time savings

5. **Execution plan**: Show sequential vs parallel timing

### Step 9: Generate WAVE-STATUS.md

Create `.arch/sprints/sprint-<sprint-number>/WAVE-STATUS.md` using template at `.arch/sprints/WAVE-STATUS-template.md`:

1. **Initialize all waves** with status "not-started"
2. **List all RFCs** with status "pending"
3. **No agents assigned** yet
4. **Progress metrics** at 0%

### Step 10: Create/Update Symlink

```bash
# On Unix/Mac
ln -sf sprint-<sprint-number>.md .arch/sprints/current.md

# On Windows
# (Document that user should manually update current.md or copy file)
```

### Step 11: Summary Report

Provide a summary report with:

```markdown
## Sprint <sprint-number> Initialized

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

**Next Steps**:
1. Review `.arch/sprints/sprint-<sprint-number>.md` for accuracy
2. Update sprint context if needed with project-specific details
3. Start Wave 1: `/start-sprint-wave <sprint-number> 1`

**Files Created**:
- `.arch/sprints/sprint-<sprint-number>.md`
- `.arch/sprints/sprint-<sprint-number>/CONTEXT.md`
- `.arch/sprints/sprint-<sprint-number>/DEPENDENCY-GRAPH.md`
- `.arch/sprints/sprint-<sprint-number>/WAVE-STATUS.md`
```

## Important Notes

- **Be thorough with context**: The CONTEXT.md file is critical for parallel agents. Include enough detail that a new agent can understand the project without reading the entire codebase.

- **Validate dependencies**: Check for circular dependencies and error if found. They must be resolved before sprint can start.

- **Use actual project data**: Don't use placeholder data. Analyze the actual codebase to fill in database schema, tech stack, patterns, etc.

- **Link to files**: Use relative links to RFCs, ADRs, and other files so agents can quickly navigate.

- **Update sprint template context**: The context section in the main sprint file should summarize what's in CONTEXT.md with links to the detailed file.

## Error Handling

If any issues occur:
- **No approved RFCs**: Error and explain that RFCs must be approved first
- **Circular dependencies**: Error and list the cycle, suggest breaking it
- **Missing RFC references**: Error and list which RFCs are referenced but don't exist
- **No waves possible**: Error and explain the dependency structure issue

## Additional Context

Read `.arch/sprints/SPRINT-PLANNING-GUIDE.md` for detailed methodology on wave planning and dependency analysis.
