# Repo Architectural Workflow System

This directory contains the architectural workflow system for the repository - a spec-driven development process where architect agents define features and implementer agents build them.

## Directory Structure

```
.arch/
├── README.md                   # This file
├── rfcs/                       # Feature requests (RFCs = Requests For Comments)
│   ├── pending/                # Awaiting architect review
│   ├── approved/               # Ready for implementation
│   ├── in-progress/            # Currently being implemented
│   ├── implemented/            # Completed
│   ├── rejected/               # Not moving forward
│   └── template.md             # RFC template
├── sprints/                    # Sprint planning
│   ├── current.md              # Current sprint (symlink)
│   ├── sprint-1.md             # Past sprints
│   └── sprint-2.md             # Current/future sprints
├── agents/                     # Agent registry
│   ├── architects/             # Architect agents (review, approve)
│   └── implementers/           # Implementer agents (build)
└── decisions/                  # Architectural Decision Records (ADRs)
    ├── 001-driver-pattern.md   # Why we use driver pattern
    └── template.md             # ADR template
```

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

## Benefits

1. **No Conflicts**: File-based coordination prevents duplicate work
2. **Clear Ownership**: Every RFC has an assigned agent
3. **Audit Trail**: Full history of decisions
4. **Scalability**: Unlimited parallel agents
5. **Quality Control**: Architect review before implementation
6. **Progress Tracking**: Easy to see what's in progress, done, blocked

## Examples

See existing RFCs, sprints, and ADRs in their respective directories for examples.
