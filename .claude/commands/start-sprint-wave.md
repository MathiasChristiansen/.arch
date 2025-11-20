Launch parallel implementer agents for all RFCs in Wave <wave-number> of Sprint <sprint-number>.

**Usage**: `/start-sprint-wave <sprint-number> <wave-number>`

**Example**: `/start-sprint-wave 5 1`

## Your Task

You are launching Wave <wave-number> of Sprint <sprint-number>. This will start multiple parallel Claude agents using the Task tool, one for each RFC in the wave.

### Step 1: Validate Prerequisites

1. **Check sprint exists**:
   - Verify `.arch/sprints/sprint-<sprint-number>.md` exists
   - Verify `.arch/sprints/sprint-<sprint-number>/CONTEXT.md` exists

2. **Check wave exists**:
   - Read sprint file and confirm Wave <wave-number> is defined
   - Get list of all RFCs in this wave

3. **Validate previous waves completed** (if not Wave 1):
   - Read `.arch/sprints/sprint-<sprint-number>/WAVE-STATUS.md`
   - Verify all RFCs in previous waves are marked "completed"
   - If any are not completed, **ERROR** and list incomplete RFCs

4. **Check for blockers**:
   - Read WAVE-STATUS.md for any active blockers
   - If blockers exist, **WARN** and ask user to resolve first

### Step 2: Prepare Wave Context

1. **Read essential context files**:
   - `.arch/sprints/sprint-<sprint-number>/CONTEXT.md`
   - `.arch/sprints/sprint-<sprint-number>/DEPENDENCY-GRAPH.md`
   - `.arch/sprints/sprint-<sprint-number>.md` (Parallelization Plan section)

2. **Get RFC list for this wave**:
   - Extract all RFCs assigned to Wave <wave-number>
   - For each RFC, get: number, title, file path, effort estimate

3. **Assign agent IDs**:
   - For each RFC, assign next available implementer ID
   - Format: `implementer-001`, `implementer-002`, etc.
   - Check `.arch/agents/implementers/` for existing agents to avoid conflicts

### Step 3: Launch Parallel Agents

**CRITICAL**: Launch ALL agents in **a single message** with multiple Task tool calls.

For each RFC in the wave, create a Task tool call with:

```
Task tool parameters:
- subagent_type: "general-purpose"
- description: "Implement RFC-XXX: [Title]"
- prompt: (see template below)
```

**Prompt Template for Each Agent**:

```markdown
You are implementer agent @implementer-XXX working on Sprint <sprint-number>, Wave <wave-number>.

## Your Assignment

**RFC**: RFC-YYY: [RFC Title]
**RFC File**: `.arch/rfcs/approved/YYY-rfc-name.md`
**Sprint**: <sprint-number>
**Wave**: <wave-number>
**Estimated Effort**: [X hours]

## Critical Context - Read These First

Before starting implementation, you MUST read these files to understand project context:

1. **Sprint Context**: `.arch/sprints/sprint-<sprint-number>/CONTEXT.md`
   - Contains database schema, architecture, API patterns, and code examples
   - This is your PRIMARY source of context

2. **Your RFC**: `.arch/rfcs/approved/YYY-rfc-name.md`
   - Your complete specification and requirements

3. **Dependency Graph**: `.arch/sprints/sprint-<sprint-number>/DEPENDENCY-GRAPH.md`
   - Shows how your RFC relates to others

## Your Task

1. **Read context files** (listed above) - DO NOT SKIP THIS
2. **Read RFC specification** thoroughly
3. **Claim the RFC**: Use `/claim-rfc YYY` to mark it in-progress
4. **Update WAVE-STATUS.md**:
   - Mark RFC-YYY as "in-progress"
   - Add yourself (@implementer-XXX) as assigned agent
   - Note start time
5. **Implement the RFC** following the specification exactly:
   - Follow architecture patterns from CONTEXT.md
   - Write tests as specified in RFC
   - Follow coding standards from project
   - Commit changes as you go (descriptive commit messages)
6. **Update progress** in WAVE-STATUS.md every 30-60 minutes
7. **Complete the RFC**: Use `/complete-rfc YYY` when done
8. **Update WAVE-STATUS.md** final time:
   - Mark RFC-YYY as "completed"
   - Note completion time and duration

## Important Notes

- **Work independently**: You are running in parallel with other agents. Avoid file conflicts by working in your assigned area.
- **Use context files**: The CONTEXT.md has database schema, architecture patterns, and code examples. Use them!
- **Test your code**: All tests must pass before marking RFC complete
- **Document issues**: If you encounter blockers, document them in WAVE-STATUS.md immediately
- **Don't skip steps**: Claim RFC → Implement → Test → Complete RFC

## Coordination with Other Agents

Other agents are working on these RFCs in parallel in the same wave:
[List other RFCs in wave]

**Expected Conflicts**: [None | Minimal | Describe potential conflicts]
**Coordination Notes**: [Any special notes about coordination]

## Context Summary (Quick Reference)

**Database**: [Type and key tables from CONTEXT.md]
**Tech Stack**: [Languages and frameworks from CONTEXT.md]
**Architecture Pattern**: [Pattern from CONTEXT.md]
**API Style**: [REST/GraphQL/etc from CONTEXT.md]
**Testing**: [Testing approach from CONTEXT.md]

---

Read the context files above and begin implementation. Good luck!
```

### Step 4: Update Wave Status

After launching all agents:

1. **Update WAVE-STATUS.md**:
   - Set Wave <wave-number> status to "in-progress"
   - Set started time to current time
   - Calculate expected completion time (now + max effort in wave)
   - List all RFCs with status "in-progress" and assigned agents

2. **Update sprint main file** if needed:
   - Update "Current Wave" in Progress Metrics
   - Update Active Agents section

### Step 5: Monitor Agents

Inform the user:

```markdown
## Wave <wave-number> Launched

**RFCs Started**: [List of RFC numbers and titles]
**Agents Launched**: [List of agent IDs]
**Expected Completion**: [Timestamp based on max effort]

**Monitoring**:
- Agents will work independently in parallel
- Check `.arch/sprints/sprint-<sprint-number>/WAVE-STATUS.md` for real-time progress
- Use `/sprint-status` to see overall sprint progress

**Next Steps**:
1. Monitor agent progress in WAVE-STATUS.md
2. Wait for all Wave <wave-number> RFCs to complete
3. When complete, start next wave: `/start-sprint-wave <sprint-number> <wave+1>`

**Active Sessions**:
[List of agent sessions with their RFC assignments]
```

### Step 6: Agent Coordination Notes

Provide any special coordination notes:

- **File conflicts**: If agents might touch same files, note this
- **Integration points**: If RFCs need to coordinate, explain how
- **Testing**: Explain if integration tests should wait for all RFCs
- **Merge strategy**: Explain if agents should merge individually or wait for wave completion

## Important Guidelines

### Context is Critical

Each agent prompt MUST include:
1. Link to CONTEXT.md (most important)
2. Link to RFC file
3. Link to DEPENDENCY-GRAPH.md
4. Quick reference summary of key context

**Why**: Parallel agents run in separate Claude sessions. They don't have conversation history. Rich context in the prompt is essential.

### Launch in Single Message

**DO THIS** ✅:
```
Send one message with:
- Task tool call 1: RFC-001
- Task tool call 2: RFC-002
- Task tool call 3: RFC-003
```

**DON'T DO THIS** ❌:
```
Send message 1: Task tool call for RFC-001
Send message 2: Task tool call for RFC-002
Send message 3: Task tool call for RFC-003
```

Multiple task calls in one message = true parallelization.

### Wave Dependencies

- **Wave 1**: Can always start (no dependencies)
- **Wave N > 1**: Must validate Wave N-1 is complete first

### Agent Assignment

Assign unique implementer IDs to avoid confusion:
- `implementer-001` for first RFC
- `implementer-002` for second RFC
- etc.

Check existing agents in `.arch/agents/implementers/` to get next available number.

## Error Handling

**Previous wave not complete**:
```
ERROR: Cannot start Wave <N> - Wave <N-1> is not complete.

Incomplete RFCs:
- RFC-XXX: [Title] - Status: in-progress
- RFC-YYY: [Title] - Status: blocked

Please complete Wave <N-1> before starting Wave <N>.
```

**Wave doesn't exist**:
```
ERROR: Wave <N> does not exist in Sprint <sprint-number>.

Available waves: 1, 2, 3
```

**Sprint not initialized**:
```
ERROR: Sprint <sprint-number> not found.

Please initialize the sprint first: /init-sprint <sprint-number>
```

**Active blockers**:
```
WARNING: Active blockers exist in WAVE-STATUS.md:
- [List blockers]

Recommend resolving these before starting new wave.
Continue anyway? (Y/N)
```

## Example

For Sprint 5, Wave 1 with RFC-001 and RFC-002:

1. Validate Sprint 5 exists and Wave 1 is defined
2. Read CONTEXT.md, DEPENDENCY-GRAPH.md
3. Launch two agents in one message:
   - Agent 1: implementer-001 → RFC-001
   - Agent 2: implementer-002 → RFC-002
4. Update WAVE-STATUS.md with both RFCs as "in-progress"
5. Inform user that Wave 1 is running

## Additional Context

- Read `.arch/sprints/SPRINT-PLANNING-GUIDE.md` for wave execution best practices
- Check `.arch/README.md` for overall workflow
- Review `WORKFLOW-PARALLELIZATION.md` for parallelization patterns
