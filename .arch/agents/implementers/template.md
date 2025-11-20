# Implementer NNN

**Agent ID:** implementer-NNN
**Specialization:** Go | TypeScript | React | Testing | etc.
**Status:** active | idle | offline
**Current Assignment:** RFC-XXX (Feature Name) | None (available)
**Started:** YYYY-MM-DD HH:MM (if assigned)

## Critical: Read Context Before Starting

When starting a new RFC, especially in a sprint, **ALWAYS read these files first**:

1. **Sprint Context**: `.arch/sprints/sprint-N/CONTEXT.md` (or current sprint)
   - Database schema, architecture patterns, code examples
   - This is your PRIMARY source of context
   - Contains everything you need to implement without guessing

2. **RFC Specification**: `.arch/rfcs/approved/XXX-rfc-name.md`
   - Your complete requirements and acceptance criteria

3. **Dependency Graph**: `.arch/sprints/sprint-N/DEPENDENCY-GRAPH.md`
   - Shows how your RFC relates to others
   - Identifies what RFCs you depend on

4. **Wave Status**: `.arch/sprints/sprint-N/WAVE-STATUS.md`
   - Shows what other agents are working on
   - Helps avoid conflicts and coordinate

**Why this matters**: You're running in a new Claude session with no conversation history. These context files are your ONLY source of truth about the project architecture, patterns, and current state. Skipping them leads to:
- Incorrect implementations (wrong patterns)
- Missing dependencies (database schema)
- Inconsistent code (different error handling)
- Wasted time (implementing wrong approach)

**Best Practice**: Read CONTEXT.md → Read RFC → Claim RFC → Start implementation

## Work Log

### YYYY-MM-DD HH:MM
- **Read sprint context files** (CONTEXT.md, RFC, DEPENDENCY-GRAPH.md)
- Claimed RFC-XXX with `/claim-rfc XXX`
- Updated WAVE-STATUS.md to mark as in-progress
- Reading existing implementation
- Planning approach based on context patterns

### YYYY-MM-DD HH:MM
- Implemented core functionality following patterns from CONTEXT.md
- Added unit tests (85% coverage) using testing patterns from context
- Ready for integration testing
- Updated WAVE-STATUS.md with progress

## Completed RFCs

- **RFC-001**: Feature Name (Sprint 1) - Duration: 3 hours
- **RFC-002**: Another Feature (Sprint 1) - Duration: 5 hours

## Skills

- Primary: TypeScript, React, Testing
- Secondary: Go, Node.js
- Learning: WebAssembly, Rust

## Availability

Available for:
- Frontend implementations
- Test writing
- Bug fixes
- Documentation

---

## Implementation Workflow

Follow this workflow for every RFC implementation:

### Step 1: Preparation (Before Claiming)

1. **Read sprint context** (`.arch/sprints/sprint-N/CONTEXT.md`):
   - Database schema - understand tables, relationships, constraints
   - Architecture overview - tech stack, patterns, package structure
   - ADRs - architectural decisions affecting implementation
   - API contracts - endpoint formats, authentication
   - Code patterns - how to structure your code
   - Common gotchas - avoid known mistakes

2. **Read RFC specification** (`.arch/rfcs/approved/XXX-rfc-name.md`):
   - Problem statement - understand the "why"
   - Proposed solution - understand the "what"
   - Technical details - architecture, API changes, testing
   - Implementation checklist - your task list
   - Acceptance criteria - definition of done

3. **Read dependency graph** (`.arch/sprints/sprint-N/DEPENDENCY-GRAPH.md`):
   - Understand what RFCs your RFC depends on
   - Verify prerequisites are completed
   - Understand what RFCs depend on yours (careful with breaking changes)

4. **Check wave status** (`.arch/sprints/sprint-N/WAVE-STATUS.md`):
   - See what other agents are working on
   - Identify potential file conflicts
   - Note any active blockers

### Step 2: Claim RFC

```bash
# Mark RFC as in-progress and assign to yourself
/claim-rfc XXX
```

This will:
- Move RFC from `approved/` to `in-progress/`
- Update RFC metadata with your agent ID and start time
- Update your agent file with assignment

**Also update WAVE-STATUS.md**:
- Mark RFC-XXX as "in-progress"
- Add yourself as assigned agent
- Note start time
- This keeps sprint coordination visible

### Step 3: Implementation

1. **Follow patterns from CONTEXT.md**:
   - Use the same error handling approach
   - Use the same repository pattern
   - Use the same API handler structure
   - Use the same testing patterns
   - Don't invent new patterns unless RFC specifically requires it

2. **Implement according to RFC checklist**:
   - Work through Implementation Checklist in order
   - Check off each item as you complete it
   - Update RFC file with progress

3. **Write tests as you go**:
   - Unit tests for business logic
   - Integration tests for database operations
   - Handler tests for API endpoints
   - Follow testing patterns from CONTEXT.md
   - Aim for coverage goal from sprint context

4. **Commit regularly with descriptive messages**:
   ```bash
   git add .
   git commit -m "feat(users): implement user creation endpoint

   - Add CreateUser handler with validation
   - Add user repository method
   - Add unit tests for user service
   - Related to RFC-XXX"
   ```

5. **Update progress every 30-60 minutes**:
   - Update WAVE-STATUS.md with current progress
   - Note any issues or blockers
   - Update percentage complete estimate

### Step 4: Testing & Validation

Before marking RFC complete:

1. **Run all tests**:
   ```bash
   # Backend
   go test ./...

   # Frontend
   npm test
   ```

2. **Check test coverage**:
   - Verify you meet coverage goal from sprint context
   - Add tests for any gaps

3. **Manual testing**:
   - Test happy paths
   - Test error cases
   - Test integration with existing code

4. **Verify acceptance criteria**:
   - Go through each acceptance criteria in RFC
   - Ensure all are met
   - Document any deviations (if approved)

5. **Code quality**:
   - Follow patterns from CONTEXT.md
   - No placeholder code or TODOs
   - Code is readable and maintainable
   - Comments for complex logic

### Step 5: Complete RFC

```bash
# Mark RFC as implemented
/complete-rfc XXX
```

This will:
- Move RFC from `in-progress/` to `implemented/`
- Calculate and record duration
- Update your agent file with completion

**Also update WAVE-STATUS.md**:
- Mark RFC-XXX as "completed"
- Note completion time and actual duration
- Add any lessons learned
- This helps track wave progress

### Step 6: Coordination (If Needed)

If your RFC is part of a wave with other RFCs:

1. **Check if wave is complete**:
   - Review WAVE-STATUS.md
   - Are all RFCs in wave completed?

2. **If wave complete**:
   - Notify in work log
   - Ready for next wave to start

3. **If you're blocked**:
   - Update WAVE-STATUS.md immediately
   - Document blocker clearly
   - Create issue in `.arch/issues/` if needed
   - Don't wait to report problems

## Common Mistakes to Avoid

### ❌ Not Reading Context Files
**Problem**: Implementing without understanding project patterns
**Solution**: Always read CONTEXT.md first - it saves time!

### ❌ Skipping Tests
**Problem**: Marking RFC complete without adequate tests
**Solution**: Write tests as you implement, aim for coverage goal

### ❌ Not Following Patterns
**Problem**: Inventing new patterns instead of using established ones
**Solution**: Copy patterns from CONTEXT.md examples

### ❌ Not Updating Progress
**Problem**: Working for hours without updating status
**Solution**: Update WAVE-STATUS.md every 30-60 minutes

### ❌ Not Reading RFC Thoroughly
**Problem**: Missing requirements or acceptance criteria
**Solution**: Read RFC completely before starting implementation

### ❌ Working on Wrong Branch
**Problem**: Committing to wrong branch or not creating branch
**Solution**: Create feature branch: `git checkout -b rfc-XXX-feature-name`

### ❌ Not Handling Errors
**Problem**: Only implementing happy path
**Solution**: Handle errors according to patterns in CONTEXT.md

### ❌ Not Validating Prerequisites
**Problem**: Starting RFC before dependencies complete
**Solution**: Check DEPENDENCY-GRAPH.md and WAVE-STATUS.md first

## Tips for Parallel Execution

When working in parallel with other agents:

1. **Avoid file conflicts**:
   - Work in your assigned package/directory
   - Coordinate if you need to modify shared files
   - Check WAVE-STATUS.md for other agents' areas

2. **Don't block others**:
   - Commit and push regularly
   - Don't wait to push until RFC is complete
   - Others might depend on your partial work

3. **Communicate blockers early**:
   - Update WAVE-STATUS.md immediately if blocked
   - Don't struggle in silence
   - Create issues for blockers

4. **Integration coordination**:
   - If multiple RFCs integrate, coordinate merge order
   - Run integration tests after merges
   - Update CONTEXT.md if you create new patterns

## Quick Reference

**Essential Files**:
- Sprint context: `.arch/sprints/sprint-N/CONTEXT.md`
- RFC spec: `.arch/rfcs/approved/XXX-rfc.md`
- Dependency graph: `.arch/sprints/sprint-N/DEPENDENCY-GRAPH.md`
- Wave status: `.arch/sprints/sprint-N/WAVE-STATUS.md`

**Commands**:
```bash
/claim-rfc XXX        # Start work on RFC
/complete-rfc XXX     # Finish RFC
/sprint-status        # Check sprint progress
```

**Update Locations**:
- Your agent file: `.arch/agents/implementers/implementer-NNN.md`
- Wave status: `.arch/sprints/sprint-N/WAVE-STATUS.md`
- RFC file: `.arch/rfcs/in-progress/XXX-rfc.md`

**Remember**: Context files are your guide. Trust them, use them, and keep them updated!
