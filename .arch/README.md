# .arch - Spec-Driven Development Framework

> **Start Here**: This directory contains the complete architectural workflow system for coordinating parallel agent work.

## Quick Start - What Are You Trying to Do?

| Goal | Start Here |
|------|------------|
| **Understand this framework** | Read this file, then [WORKFLOW-PARALLELIZATION.md](WORKFLOW-PARALLELIZATION.md) |
| **Implement an RFC** | Read [sprints/current.md](sprints/current.md) → then sprint's `CONTEXT.md` → then your RFC |
| **Review an RFC** | Read [rfcs/template.md](rfcs/template.md) → then pending RFC → then relevant [ADRs](decisions/) |
| **Plan a sprint** | Read [sprints/SPRINT-PLANNING-GUIDE.md](sprints/SPRINT-PLANNING-GUIDE.md) |
| **Create new RFC** | Copy [rfcs/template.md](rfcs/template.md) to `rfcs/pending/` |

---

## Directory Structure

```
.arch/
├── README.md                           # ← YOU ARE HERE
├── WORKFLOW-PARALLELIZATION.md         # Guide to wave-based parallel execution
│
├── rfcs/                               # Feature Requests (RFCs)
│   ├── template.md                     # RFC template - READ FIRST
│   ├── pending/                        # Awaiting architect review
│   ├── approved/                       # Ready for implementation
│   ├── in-progress/                    # Currently being implemented
│   ├── implemented/                    # Completed
│   └── rejected/                       # Not moving forward
│
├── sprints/                            # Sprint Planning & Execution
│   ├── current.md                      # Pointer to active sprint
│   ├── template.md                     # Sprint file template
│   ├── SPRINT-PLANNING-GUIDE.md        # How to plan sprints
│   ├── CONTEXT-template.md             # Context file template (CRITICAL)
│   ├── DEPENDENCY-GRAPH-template.md    # Dependency graph template
│   ├── WAVE-STATUS-template.md         # Execution tracking template
│   ├── example-sprint/                 # Complete working example
│   │   ├── CONTEXT.md                  # Example context (Go+PostgreSQL)
│   │   ├── DEPENDENCY-GRAPH.md         # Example dependencies
│   │   └── WAVE-STATUS.md              # Example tracking
│   └── sprint-N/                       # Actual sprint directories
│       ├── CONTEXT.md                  # Project context for agents
│       ├── DEPENDENCY-GRAPH.md         # RFC dependencies
│       └── WAVE-STATUS.md              # Real-time progress
│
├── decisions/                          # Architectural Decision Records (ADRs)
│   ├── template.md                     # ADR template
│   └── NNN-decision-name.md            # Individual decisions
│
├── agents/                             # Agent Registry
│   ├── architects/                     # Architect agents
│   │   └── template.md
│   └── implementers/                   # Implementer agents
│       └── template.md
│
├── issues/                             # Issue Tracking
│   ├── README.md
│   ├── template.md
│   ├── open/
│   ├── resolved/
│   └── deferred/
│
└── guides/                             # Guides & Documentation
    └── SKILLS-AND-HOOKS-GUIDE.md       # Creating skills and hooks
```

---

## Key Concepts

### 1. RFCs (Request For Comments)

RFCs are feature specifications that flow through these states:

```
pending → approved → in-progress → implemented
            ↓
         rejected
```

**Key fields in each RFC**:
- **Status**: Current state
- **Blocked By**: RFCs that must complete first
- **Blocks**: RFCs waiting for this one
- **Parallelization Wave**: Which wave this RFC is in

### 2. Sprints & Waves

Sprints organize work into **waves** for parallel execution:

```
Wave 1 (no dependencies):     RFC-001, RFC-002  → run in parallel
Wave 2 (depends on Wave 1):   RFC-003, RFC-004  → run in parallel after Wave 1
Wave 3 (depends on Wave 2):   RFC-005           → runs after Wave 2
```

**Time savings**: 32% typical improvement vs sequential execution.

### 3. ADRs (Architectural Decision Records)

**CRITICAL**: ADRs in `decisions/` contain **mandatory architectural rules**.

All agents MUST:
1. Read relevant ADRs before starting work
2. Follow ADR requirements strictly
3. Reference ADRs in reviews and implementations
4. Create new ADRs for significant decisions

**Violating ADRs will result in rejected implementations!**

### 4. Context Files

Each sprint has three critical files in `sprints/sprint-N/`:

| File | Purpose | Who Updates |
|------|---------|-------------|
| `CONTEXT.md` | Project context (schema, patterns, examples) | Architects |
| `DEPENDENCY-GRAPH.md` | RFC dependencies visualization | Architects |
| `WAVE-STATUS.md` | Real-time progress tracking | Implementers |

**Why they matter**: Parallel agents run in separate sessions with NO conversation history. Context files are their ONLY source of project knowledge.

---

## Workflow for Implementers

### Before You Start

1. **Read sprint context**: `sprints/sprint-N/CONTEXT.md`
2. **Read ALL relevant ADRs**: `decisions/*.md` - MANDATORY!
3. **Check dependencies**: `sprints/sprint-N/DEPENDENCY-GRAPH.md`
4. **Read your RFC thoroughly**: `rfcs/approved/XXX-name.md`

### Implementation Steps

1. **Claim RFC**: Use `/claim-rfc XXX`
2. **Update WAVE-STATUS.md**: Mark as in-progress
3. **Implement**: Follow RFC spec and CONTEXT.md patterns
4. **Update progress**: Every 30-60 minutes in WAVE-STATUS.md
5. **Test**: Ensure all tests pass
6. **Complete**: Use `/complete-rfc XXX`

### Common Mistakes to Avoid

- ❌ Starting without reading CONTEXT.md
- ❌ Ignoring ADRs
- ❌ Inventing new patterns
- ❌ Not updating progress
- ❌ Working outside your RFC's scope

---

## Workflow for Architects

### RFC Review

1. **Read pending RFC**: `rfcs/pending/XXX-name.md`
2. **Cross-reference ADRs**: Check `decisions/` for relevant rules
3. **Evaluate**: Problem, solution, dependencies, effort
4. **Decide**: Approve, reject, or request changes
5. **Use**: `/review-rfc XXX`

### Sprint Planning

1. **Gather approved RFCs**: `rfcs/approved/`
2. **Analyze dependencies**: Build dependency graph
3. **Assign waves**: Using topological sort
4. **Generate context**: Comprehensive CONTEXT.md
5. **Use**: `/init-sprint N`

### Creating ADRs

When making significant architectural decisions:

1. Copy `decisions/template.md` to `decisions/NNN-decision-name.md`
2. Document: Context, Decision, Rationale, Consequences
3. Reference in CONTEXT.md for future agents

---

## Available Commands

| Command | Purpose | Who Uses |
|---------|---------|----------|
| `/claim-rfc <N>` | Claim an RFC | Implementers |
| `/complete-rfc <N>` | Mark RFC done | Implementers |
| `/review-rfc <N>` | Review pending RFC | Architects |
| `/init-sprint <N>` | Initialize sprint | Architects |
| `/start-sprint-wave <S> <W>` | Launch wave | Coordinators |
| `/sprint-status` | View progress | Anyone |
| `/update-sprint-context <N>` | Update context | Architects |

---

## File Locking

The file system acts as a coordination mechanism:

| Location | Meaning |
|----------|---------|
| `rfcs/approved/` | Available to claim |
| `rfcs/in-progress/` | Someone working (check "Assigned To") |
| `rfcs/implemented/` | Completed |

---

## Templates & Examples

### For RFCs
- **Template**: [rfcs/template.md](rfcs/template.md)

### For Sprints
- **Sprint template**: [sprints/template.md](sprints/template.md)
- **Context template**: [sprints/CONTEXT-template.md](sprints/CONTEXT-template.md)
- **Complete example**: [sprints/example-sprint/](sprints/example-sprint/)

### For ADRs
- **Template**: [decisions/template.md](decisions/template.md)

---

## Best Practices

### For All Agents

1. **Always read ADRs** - They contain mandatory rules
2. **Follow established patterns** - Don't invent new approaches
3. **Update progress regularly** - Keep WAVE-STATUS.md current
4. **Document blockers immediately** - Don't struggle silently

### For Architects

1. **Make CONTEXT.md comprehensive** - Include code examples
2. **Document all decisions as ADRs** - Future agents need this
3. **Calculate parallel time savings** - Show the value
4. **Update context between waves** - Architecture evolves

### For Implementers

1. **Read context BEFORE claiming** - Understand patterns first
2. **Check ADRs** - Violations will be rejected
3. **Stay in your RFC's scope** - Don't touch other agents' work
4. **Test thoroughly** - All tests must pass

---

## Need More Help?

- **Parallelization details**: [WORKFLOW-PARALLELIZATION.md](WORKFLOW-PARALLELIZATION.md)
- **Sprint planning**: [sprints/SPRINT-PLANNING-GUIDE.md](sprints/SPRINT-PLANNING-GUIDE.md)
- **Skills & Hooks**: [guides/SKILLS-AND-HOOKS-GUIDE.md](guides/SKILLS-AND-HOOKS-GUIDE.md)
- **Example sprint**: [sprints/example-sprint/](sprints/example-sprint/)
