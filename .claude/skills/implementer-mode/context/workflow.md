# Implementer Workflow

## Before Starting

### 1. Read Sprint Context (CRITICAL)
```
.arch/sprints/sprint-N/CONTEXT.md
```
This contains:
- Database schema with examples
- Architecture patterns with code snippets
- API conventions
- Testing patterns
- Common gotchas

**DO NOT SKIP THIS STEP** - Parallel agents have no conversation history. This is your only source of project context.

### 2. Read Architectural Decision Records (MANDATORY)
```
.arch/decisions/
```
**CRITICAL**: You MUST read ALL relevant ADRs before implementing:
- ADRs contain mandatory architectural rules
- ADRs define technology choices and constraints
- ADRs specify security and design requirements
- **Implementations that violate ADRs will be REJECTED**

Check which ADRs apply to your RFC and follow them strictly.

### 3. Review Dependencies
```
.arch/sprints/sprint-N/DEPENDENCY-GRAPH.md
```
Understand:
- What your RFC blocks
- What blocks your RFC
- Your wave assignment

### 4. Read Your RFC Thoroughly
```
.arch/rfcs/approved/XXX-rfc-name.md
```
Understand:
- Problem statement
- Proposed solution
- Technical details
- Acceptance criteria
- Implementation checklist

## Implementation Workflow

### Step 1: Claim RFC
```
/claim-rfc XXX
```
This:
- Moves RFC to in-progress
- Updates your agent file
- Records start time

### Step 2: Update Wave Status
Edit `.arch/sprints/sprint-N/WAVE-STATUS.md`:
- Mark your RFC as "in-progress"
- Add yourself as assigned agent
- Note start time

### Step 3: Implement
Follow the RFC specification:
1. Create/modify files as specified
2. Follow patterns from CONTEXT.md
3. Write tests as required
4. Commit with descriptive messages

### Step 4: Update Progress
Every 30-60 minutes, update WAVE-STATUS.md:
- Current progress percentage
- What you've completed
- Any blockers encountered

### Step 5: Test
Before marking complete:
- All tests pass
- Code follows project patterns
- Acceptance criteria met

### Step 6: Complete RFC
```
/complete-rfc XXX
```
This:
- Moves RFC to implemented
- Records completion time
- Calculates duration

### Step 7: Final Wave Status Update
Edit WAVE-STATUS.md:
- Mark RFC as "completed"
- Note completion time
- Add any lessons learned

## Common Mistakes to Avoid

### 1. Not Reading Context
❌ Start implementing immediately
✅ Read CONTEXT.md first to understand patterns

### 2. Inventing New Patterns
❌ Create new approach because it seems better
✅ Follow established patterns from CONTEXT.md

### 3. Skipping Tests
❌ Implement first, test later (or never)
✅ Write tests as you implement

### 4. Not Updating Progress
❌ Work silently for hours
✅ Update WAVE-STATUS.md regularly

### 5. Working Outside Assigned Area
❌ Modify files assigned to other agents
✅ Stay in your RFC's scope

### 6. Ignoring Blockers
❌ Struggle silently with issues
✅ Document blockers immediately in WAVE-STATUS.md

### 7. Forgetting to Claim/Complete
❌ Start working without claiming
✅ Use /claim-rfc and /complete-rfc commands

## Progress Update Format

When updating WAVE-STATUS.md:

```markdown
| RFC-XXX | [Title] | @implementer-XXX | ⚙️ in-progress | [start] | - | Xh so far | Y% complete, [current task] |
```

Example:
```markdown
| RFC-003 | User Service | @implementer-003 | ⚙️ in-progress | 2025-11-20 15:00 | - | 2h so far | 60% complete, implementing tests |
```

## Blocker Documentation

If you encounter a blocker, add to WAVE-STATUS.md:

```markdown
### Active Blockers

| Date | RFC | Blocker | Impact |
|------|-----|---------|--------|
| 2025-11-20 | RFC-003 | Missing API spec | Cannot implement endpoint |
```

## Commit Message Format

```
RFC-XXX: [Brief description]

- [Change 1]
- [Change 2]
- [Change 3]

Implements [acceptance criteria item]
```

Example:
```
RFC-003: Add user service with CRUD operations

- Add User domain model
- Implement UserRepository with PostgreSQL
- Add UserService with business logic
- Add unit tests with 85% coverage

Implements user management functionality
```
