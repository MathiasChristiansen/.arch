# Sprint Planning & Parallelization Guide

This guide explains how to plan sprints with parallelization in mind, enabling multiple Claude sessions to work simultaneously on independent RFCs.

## Table of Contents
1. [Quick Start](#quick-start)
2. [Planning Methodology](#planning-methodology)
3. [Wave-Based Execution](#wave-based-execution)
4. [Context Management](#context-management)
5. [Best Practices](#best-practices)

---

## Quick Start

### Starting a New Sprint

```bash
# 1. Initialize sprint (auto-generates wave plan and context)
/init-sprint 5

# 2. Review the generated parallelization plan
# Check: .arch/sprints/sprint-5.md (Parallelization Plan section)
# Check: .arch/sprints/sprint-5/DEPENDENCY-GRAPH.md (visual dependencies)
# Check: .arch/sprints/sprint-5/CONTEXT.md (essential project context)

# 3. Start Wave 1 (launches parallel agents for all Wave 1 RFCs)
/start-sprint-wave 5 1

# 4. Monitor progress
/sprint-status

# 5. When Wave 1 completes, start Wave 2
/start-sprint-wave 5 2
```

### Resuming an Existing Sprint

```bash
# 1. Check sprint status
/sprint-status

# 2. Read sprint context (essential for understanding project state)
# Read: .arch/sprints/current.md (Sprint Context section)
# Read: .arch/sprints/sprint-N/CONTEXT.md (detailed context)
# Read: .arch/sprints/sprint-N/WAVE-STATUS.md (current wave progress)

# 3. Continue with next wave or incomplete RFCs
/start-sprint-wave N <wave-number>
```

---

## Planning Methodology

### Step 1: Gather Approved RFCs

All RFCs in `.arch/rfcs/approved/` are candidates for the sprint. Architects should have already:
- Reviewed and approved each RFC
- Assigned **Parallelization Wave** numbers based on dependencies
- Documented dependencies in RFC frontmatter

### Step 2: Build Dependency Graph

For each RFC, identify:
- **Blocks**: RFCs that cannot start until this completes
- **Blocked By**: RFCs that must complete before this starts
- **Related**: Informational relationships (don't affect parallelization)

**Example:**
```
RFC-001: Database Schema
  Blocks: RFC-003, RFC-004
  Blocked By: (none)

RFC-002: API Client Library
  Blocks: RFC-003, RFC-004
  Blocked By: (none)

RFC-003: User Service
  Blocks: RFC-005
  Blocked By: RFC-001, RFC-002

RFC-004: Product Service
  Blocks: RFC-005
  Blocked By: RFC-001, RFC-002

RFC-005: Integration Layer
  Blocks: (none)
  Blocked By: RFC-003, RFC-004
```

### Step 3: Assign Waves

Use **topological sorting** to assign waves:

**Wave 1**: RFCs with no dependencies (Blocked By: none)
- RFC-001, RFC-002

**Wave 2**: RFCs blocked only by Wave 1
- RFC-003, RFC-004

**Wave 3**: RFCs blocked only by Wave 1 and/or Wave 2
- RFC-005

**Rule**: An RFC can be in Wave N if all its blocking RFCs are in waves < N.

### Step 4: Estimate Parallelization Benefit

Calculate time savings:
- **Sequential time**: Sum of all RFC efforts
- **Parallel time**: Sum of max effort in each wave
- **Time savings**: Sequential - Parallel

**Example:**
```
Sequential:
RFC-001 (4h) + RFC-002 (3h) + RFC-003 (5h) + RFC-004 (4h) + RFC-005 (6h) = 22 hours

Parallel:
Wave 1: max(4h, 3h) = 4h
Wave 2: max(5h, 4h) = 5h
Wave 3: 6h
Total: 15 hours

Savings: 22 - 15 = 7 hours (32% faster)
```

---

## Wave-Based Execution

### Wave Execution Rules

1. **All RFCs in a wave can execute in parallel** (no dependencies within wave)
2. **Wave N must complete before Wave N+1 starts**
3. **Use Task tool to launch parallel agents** (one agent per RFC)
4. **Each agent gets full sprint context** (database, architecture, decisions)

### Launching Parallel Agents

When starting a wave, launch ALL RFCs simultaneously:

```
# Single message with multiple Task tool calls
Task 1: Implement RFC-001 (implementer-001)
Task 2: Implement RFC-002 (implementer-002)
Task 3: Implement RFC-003 (implementer-003)
```

Each agent operates independently with:
- Full sprint context from CONTEXT.md
- Dependency graph from DEPENDENCY-GRAPH.md
- RFC specification from the RFC file
- Access to all project files

### Monitoring Wave Progress

Track progress in `.arch/sprints/sprint-N/WAVE-STATUS.md`:
- Which RFCs are in progress
- Which agents are assigned
- When each RFC started
- Current status of each RFC

Update this file as RFCs complete or encounter blockers.

---

## Context Management

### Critical Context for Parallel Sessions

Every agent needs:
1. **Database schema** - Tables, relationships, constraints
2. **Architecture overview** - Tech stack, patterns, structure
3. **Key ADRs** - Architectural decisions affecting implementation
4. **API contracts** - Endpoints, request/response formats
5. **Testing strategy** - What tests are required
6. **Dependencies** - External services, libraries, APIs

### Context Files

**`.arch/sprints/sprint-N/CONTEXT.md`**
- Detailed database schema with examples
- Complete architecture description
- Links to all relevant ADRs
- Testing requirements and examples
- Code snippets for common patterns

**`.arch/sprints/sprint-N/DEPENDENCY-GRAPH.md`**
- Mermaid diagram of RFC dependencies
- Visual representation of wave structure
- Quick reference for understanding relationships

**`.arch/sprints/sprint-N/WAVE-STATUS.md`**
- Real-time tracking of wave execution
- Agent assignments and progress
- Blockers and issues

### Preventing Context Loss

**Problem**: New Claude sessions don't have conversation history.

**Solution**: Rich context files that agents read at session start.

**Best Practices**:
1. **Update context files as sprint progresses**
   - New ADRs created → Update CONTEXT.md
   - Database schema changes → Update CONTEXT.md
   - Dependencies change → Update DEPENDENCY-GRAPH.md

2. **Make context self-contained**
   - Include code examples, not just descriptions
   - Link to specific files and line numbers
   - Document "gotchas" and common mistakes

3. **Use `/update-sprint-context` regularly**
   - Regenerates context based on current state
   - Pulls in new ADRs and schema changes
   - Updates dependency graph

---

## Best Practices

### For Architects

1. **Assign waves during RFC approval**
   - Review dependencies carefully
   - Set Parallelization Wave in RFC frontmatter
   - Update sprint DEPENDENCY-GRAPH.md

2. **Create comprehensive CONTEXT.md**
   - Include schema with example data
   - Document all key architectural patterns
   - Add code snippets for common operations
   - Link to relevant ADRs

3. **Keep context updated**
   - Review CONTEXT.md at start of each wave
   - Update as new ADRs are created
   - Document any mid-sprint architecture changes

### For Implementers

1. **Always read context first**
   - Sprint CONTEXT.md before claiming RFC
   - DEPENDENCY-GRAPH.md to understand relationships
   - WAVE-STATUS.md to see what others are working on

2. **Update progress frequently**
   - Mark RFC as in-progress when starting
   - Update WAVE-STATUS.md with progress
   - Mark RFC as completed when done

3. **Communicate blockers immediately**
   - Update WAVE-STATUS.md if blocked
   - Create issue in `.arch/issues/`
   - Don't wait for wave completion to report problems

### For Sprint Coordination

1. **One wave at a time**
   - Don't start Wave N+1 until Wave N completes
   - Verify all RFCs in wave are done
   - Review any blockers before proceeding

2. **Parallelize aggressively within waves**
   - Launch all Wave RFCs simultaneously
   - Use multiple Claude sessions if needed
   - Each agent is independent

3. **Review context between waves**
   - Did Wave N create new ADRs?
   - Did Wave N change database schema?
   - Update CONTEXT.md before starting next wave

---

## Common Patterns

### Pattern 1: Foundation → Features → Integration

**Wave 1**: Database schema, API client, UI components (foundations)
**Wave 2**: User service, Product service, Order service (features)
**Wave 3**: Integration layer, E2E tests (integration)

### Pattern 2: Vertical Slices

**Wave 1**: User auth (DB + API + UI)
**Wave 2**: Product catalog (DB + API + UI)
**Wave 3**: Shopping cart (DB + API + UI)

Each wave delivers a complete vertical slice.

### Pattern 3: Shared + Independent

**Wave 1**: Shared utilities, logging, error handling
**Wave 2+**: Independent features that use Wave 1 (all can be in Wave 2)

---

## Troubleshooting

### Problem: Agents don't have enough context

**Solution**:
- Check CONTEXT.md has database schema, architecture, and ADRs
- Add code examples, not just descriptions
- Link to specific files for reference

### Problem: RFCs thought to be independent actually have dependencies

**Solution**:
- Review dependency graph
- Move dependent RFC to later wave
- Update DEPENDENCY-GRAPH.md
- Communicate to implementers

### Problem: Wave takes longer than expected

**Solution**:
- Review WAVE-STATUS.md for blockers
- Some RFCs may need to be deferred to next sprint
- Update effort estimates for future planning

---

## Example: E-Commerce Sprint

See `.arch/sprints/example-sprint/` for a complete example with:
- 8 RFCs organized into 3 waves
- CONTEXT.md with database schema and architecture
- DEPENDENCY-GRAPH.md with visual dependencies
- WAVE-STATUS.md showing execution tracking

This example demonstrates a real-world sprint with parallelization achieving 40% time savings.
