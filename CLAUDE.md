# Claude Code Setup

This repository uses the `.arch` framework for spec-driven development with architect and implementer agents.

## Quick Start

### For New Sessions (Sprint Resume)

1. **Check active sprint**: Read [.arch/sprints/current.md](.arch/sprints/current.md) for sprint overview
2. **Read sprint context**: See sprint's `CONTEXT.md` for database, architecture, and patterns
3. **Read relevant ADRs**: Check [.arch/decisions/](.arch/decisions/) for architectural rules - **MANDATORY**
4. **Check wave status**: Review sprint's `WAVE-STATUS.md` for current progress
5. **Continue work**: Use `/start-sprint-wave N M` to launch next wave or claim individual RFCs

### For Sprint Planning

1. **Read the workflow**: See [.arch/README.md](.arch/README.md) for complete workflow
2. **Read sprint planning guide**: See [.arch/sprints/SPRINT-PLANNING-GUIDE.md](.arch/sprints/SPRINT-PLANNING-GUIDE.md)
3. **Initialize sprint**: Use `/init-sprint N` to auto-generate wave plan and context
4. **Review example**: See [.arch/sprints/example-sprint/](.arch/sprints/example-sprint/) for complete example

### Available Skills

#### Core Workflow
| Skill | Purpose |
|-------|---------|
| `/init-sprint N` | Initialize sprint with wave plan and context |
| `/start-sprint-wave N M` | Launch parallel agents for wave M of sprint N |
| `/claim-rfc X` | Claim and start work on RFC |
| `/complete-rfc X` | Mark RFC as complete |
| `/review-rfc X` | Architect reviews pending RFC |
| `/sprint-status` | View overall sprint progress |
| `/update-sprint-context N` | Update context files |

#### Agent Modes
| Skill | Purpose |
|-------|---------|
| `/architect-mode` | Activate architect role with responsibilities |
| `/implementer-mode` | Activate implementer role with workflow |
| `/auditor-mode` | Activate live auditor for consistency monitoring |

#### Utilities
| Skill | Purpose |
|-------|---------|
| `/create-rfc <name>` | Create new RFC from description |
| `/wave-report` | Generate detailed wave progress report |
| `/create-skill <name>` | Create new project-specific skill |

## Architecture

The `.arch/` directory contains:
- **rfcs/**: Feature requests (pending → approved → in-progress → implemented)
- **agents/**: Architect, implementer, and auditor templates
- **sprints/**: Sprint planning and tracking with context files
- **decisions/**: Architectural Decision Records (ADRs) - **READ THESE!**
- **guides/**: Skills and hooks authoring guide

## ADR Compliance (CRITICAL)

**ALL agents MUST read and follow ADRs in `.arch/decisions/`**

- ADRs contain mandatory architectural rules
- Implementations violating ADRs will be rejected
- Cross-reference ADRs in reviews and implementations
- Create new ADRs for significant decisions

## Best Practices

### For Architects
- **Cross-reference ADRs** when reviewing RFCs - verify compliance
- Review RFCs and assign parallelization waves based on dependencies
- Create comprehensive sprint context files (CONTEXT.md with database, architecture, patterns)
- Update context files when architecture changes
- Document significant decisions as ADRs

### For Implementers
- **Read ADRs first** in `.arch/decisions/` - compliance is mandatory
- **Read sprint CONTEXT.md** - it contains patterns and examples
- Claim RFC with `/claim-rfc`, implement following patterns, complete with `/complete-rfc`
- Update WAVE-STATUS.md regularly with progress
- Follow established patterns - don't invent new approaches

### For Auditors (Optional)
- Run in parallel with implementers to monitor consistency
- Check ADR compliance across implementations
- Report deviations early to prevent rework
- Use `/auditor-mode` to activate

### For Sprint Coordination
- Initialize sprints with `/init-sprint N` for automatic wave planning
- Launch waves with `/start-sprint-wave N M` for parallel execution
- Optionally start auditor with `/auditor-mode` for live monitoring
- One wave at a time - complete Wave N before starting Wave N+1
- Update context between waves with `/update-sprint-context N`

## Context Files Prevent Context Loss

**Problem**: Parallel agents run in separate Claude sessions with no conversation history.

**Solution**: Comprehensive context files:

| File | Purpose | Updated By |
|------|---------|------------|
| `CONTEXT.md` | Project context (schema, patterns, ADRs) | Architects |
| `DEPENDENCY-GRAPH.md` | RFC dependencies and waves | Architects |
| `WAVE-STATUS.md` | Real-time progress | Implementers |

**Example**: [.arch/sprints/example-sprint/](.arch/sprints/example-sprint/) shows complete context files.

## Wave-Based Parallel Execution

```
Wave 1 (no dependencies - parallel):
  RFC-001, RFC-002 → Duration: max(both)

Wave 2 (depends on Wave 1 - parallel):
  RFC-003, RFC-004 → Duration: max(both)

Wave 3 (depends on Wave 2):
  RFC-005 → Duration: just RFC-005

Result: 30%+ faster than sequential
```

## Output Styles

Switch communication styles based on role:
- `/output-style architect` - Focus on decisions, dependencies, ADR compliance
- `/output-style implementer` - Focus on progress, patterns, blockers

## Hooks

Automated hooks in `.claude/settings.json`:
- **SessionStart**: Loads sprint context
- **PostToolUse**: Updates WAVE-STATUS.md timestamps
- **PreToolUse**: Protects implemented RFCs from edits
- **Compact**: Re-injects context after compaction

## Creating Project-Specific Skills

See [.arch/guides/SKILLS-AND-HOOKS-GUIDE.md](.arch/guides/SKILLS-AND-HOOKS-GUIDE.md) for:
- When and how to create skills
- Hook configuration
- Best practices

Use `/create-skill <name>` to create new skills with proper structure.

---

<!-- Add your project-specific instructions below -->
