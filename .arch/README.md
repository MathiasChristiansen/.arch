# Repo Architectural Workflow System

This directory contains the architectural workflow system for the repository - a spec-driven development process where architect agents define features and implementer agents build them.

## Directory Structure

```
.arch/
├── README.md                        # This file
├── WORKFLOW-PARALLELIZATION.md      # Guide to parallelizing RFC implementation
├── rfcs/                            # Feature requests (RFCs = Requests For Comments)
│   ├── pending/                     # Awaiting architect review
│   ├── approved/                    # Ready for implementation
│   ├── in-progress/                 # Currently being implemented
│   ├── implemented/                 # Completed
│   ├── rejected/                    # Not moving forward
│   └── template.md                  # RFC template
├── sprints/                         # Sprint planning
│   ├── current.md                   # Current sprint (symlink)
│   ├── sprint-1.md                  # Past sprints
│   └── sprint-2.md                  # Current/future sprints
├── agents/                          # Agent registry
│   ├── architects/                  # Architect agents (review, approve)
│   └── implementers/                # Implementer agents (build)
└── decisions/                       # Architectural Decision Records (ADRs)
    ├── 001-driver-pattern.md        # Why we use driver pattern
    └── template.md                  # ADR template
```

## Custom Slash Commands

Helper commands are available in `.claude/commands/`:

- `/claim-rfc <number>` - Claim an approved RFC
- `/complete-rfc <number>` - Mark RFC as implemented
- `/review-rfc <number>` - Review a pending RFC (architects)
- `/sprint-status` - View current sprint progress

See individual command files for detailed usage.

## Workflow

### For Implementer Agents

1. **Check current sprint**: `cat .arch/sprints/current.md`
2. **Browse approved RFCs**: `ls .arch/rfcs/approved/`
3. **Claim an RFC**:
   ```bash
   mv .arch/rfcs/approved/XXX-feature.md .arch/rfcs/in-progress/
   # Update RFC: Status=in-progress, Assigned To=your-agent-id
   # Update your agent file with current assignment
   ```
4. **Implement** following the RFC specification
5. **Complete**:
   ```bash
   mv .arch/rfcs/in-progress/XXX-feature.md .arch/rfcs/implemented/
   # Update your agent file: Current Assignment=None
   ```

### For Architect Agents

1. **Review pending RFCs**: `ls .arch/rfcs/pending/`
2. **Make decision**:
   - **Approve**: Move to `approved/`, add review notes, assign to sprint
   - **Reject**: Move to `rejected/`, add reasoning
3. **Document decisions**: Create ADR in `.arch/decisions/`
4. **Update sprint plan**: Add approved RFCs to current sprint

### Creating New RFCs

```bash
cp .arch/rfcs/template.md .arch/rfcs/pending/XXX-feature-name.md
# Fill out all sections
# Wait for architect review
```

## File Locking

Files act as "locks" to prevent duplicate work:
- RFC in `approved/` = available to claim
- RFC in `in-progress/` = someone is working on it (see "Assigned To" field)
- RFC in `implemented/` = completed
- Agent file shows current assignment

## Sprint System

- **Duration**: 1-2 weeks per sprint
- **Goal**: Time-boxed focus on specific objectives
- **Retrospective**: After sprint ends, document what worked/didn't
- **Rollover**: Incomplete work moves to next sprint

## Parallelizing Work with Task Tools

**📖 See [WORKFLOW-PARALLELIZATION.md](WORKFLOW-PARALLELIZATION.md) for the complete guide.**

When working with multiple RFCs or conducting reviews, use Claude Code's Task tool to run agents concurrently:

### When to Parallelize

- **Multiple RFC Reviews**: Architect reviewing 3+ pending RFCs
- **Independent Implementations**: Multiple approved RFCs with no dependencies
- **Cross-cutting Analysis**: Analyzing codebase while implementing feature
- **Verification Tasks**: Running tests while reviewing documentation

### How to Use Task Tools

Launch multiple agents in a **single message** with multiple Task tool calls:

```
Use Task tool to launch:
1. architect-backend agent to review RFC-005 and RFC-007
2. implementer-frontend agent to implement RFC-003
3. implementer-testing agent to add tests for RFC-002
```

Each agent operates in its own context window and can work independently.

### Example Workflow

**Scenario**: You have 5 approved RFCs ready for implementation

Instead of sequential work:
```
❌ Implement RFC-001 → RFC-002 → RFC-003 → RFC-004 → RFC-005
```

Use parallel agents:
```
✅ Launch 3 implementer agents simultaneously:
   - Agent 1: RFC-001, RFC-004
   - Agent 2: RFC-002, RFC-005
   - Agent 3: RFC-003
```

**Important**: Only parallelize RFCs that don't have dependencies on each other (check "Blocked By" field).

## Benefits

1. **No Conflicts**: File-based coordination prevents duplicate work
2. **Clear Ownership**: Every RFC has an assigned agent
3. **Audit Trail**: Full history of decisions
4. **Scalability**: Unlimited parallel agents via Task tool
5. **Quality Control**: Architect review before implementation
6. **Progress Tracking**: Easy to see what's in progress, done, blocked

## Examples

See existing RFCs, sprints, and ADRs in their respective directories for examples.
