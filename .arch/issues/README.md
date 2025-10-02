# Issues Tracking System

## Purpose

Issues are problems, questions, or improvements discovered during implementation work. They provide a way for agents to:
- **Raise blockers** encountered during RFC implementation
- **Report bugs** found in existing code
- **Suggest improvements** discovered while working
- **Document tech debt** that needs addressing

## Issue Lifecycle

```
Open → In Progress → Resolved
  ↓
Deferred (moved to next sprint)
```

## When to Create an Issue

Create an issue when you discover:
- ❌ **Blocker**: Something preventing you from completing your RFC
- 🐛 **Bug**: Broken functionality in existing code
- 📝 **Missing Spec**: Found something undocumented
- 🔧 **Tech Debt**: Code that needs refactoring
- 💡 **Enhancement**: Opportunity for improvement

## How to Handle Issues

### Critical/High Priority (Blockers)
1. **Raise the issue** - Create issue file
2. **Notify in sprint** - Update sprint notes
3. **Decide**: Quick fix OR defer to next sprint
4. **If quick fix**: Resolve in current sprint
5. **If defer**: Mark as deferred, becomes RFC in next sprint

### Medium/Low Priority
1. **Document the issue** - Create issue file
2. **Mark as deferred** - Will be reviewed in sprint retrospective
3. **Continue with current work** - Don't let it block you

## Issue Directory Structure

```
.arch/issues/
├── README.md              # This file
├── template.md            # Issue template
├── open/                  # Currently open issues
│   ├── ISSUE-001-*.md
│   └── ISSUE-002-*.md
├── resolved/              # Resolved in current/past sprint
│   └── ISSUE-XXX-*.md
└── deferred/              # Moved to future sprint
    └── ISSUE-XXX-*.md
```

## Creating an Issue

```bash
# 1. Copy template
cp .arch/issues/template.md .arch/issues/open/ISSUE-XXX-brief-title.md

# 2. Fill in details
# - ID: Sequential number (ISSUE-001, ISSUE-002, etc.)
# - Raised By: Your agent name
# - Sprint: Current sprint number
# - Priority: Critical/High/Medium/Low
# - Status: Open

# 3. Update sprint notes
# Add reference to issue in current sprint file
```

## Resolving an Issue

```bash
# 1. Update issue file
# - Set Status: Resolved
# - Fill in Resolution section
# - Add Resolved date

# 2. Move file
mv .arch/issues/open/ISSUE-XXX-*.md .arch/issues/resolved/

# 3. Update sprint notes
# Document resolution in sprint file
```

## Deferring an Issue

```bash
# 1. Update issue file
# - Set Status: Deferred
# - Add note on why deferred

# 2. Move file
mv .arch/issues/open/ISSUE-XXX-*.md .arch/issues/deferred/

# 3. Create RFC (optional)
# If issue needs proper solution, create RFC for next sprint
```

## Issue to RFC Conversion

Some issues should become RFCs:
- **Large fixes** that need design
- **Architectural changes** needed
- **Multiple components** affected
- **Needs discussion** with architect

Process:
1. Create issue documenting the problem
2. Mark issue as "Needs RFC"
3. Create RFC in `pending/` with reference to issue
4. Issue gets resolved when RFC is approved/implemented

## Examples

### Example 1: Blocker Issue
```markdown
# [Blocker] RBAC Service Missing Interface Method

**ID:** ISSUE-001
**Raised By:** test-specialist-agent
**Sprint:** Sprint 2
**Priority:** Critical
**Status:** Open

## Problem
RBACService doesn't implement CheckPermission method required by
interface in websocket handler.

## Impact
Cannot compile websocket integration tests. Blocking RFC-001.

## Proposed Solution
Quick fix: Add CheckPermission method to RBACService.
Should take 15 minutes.
```

### Example 2: Tech Debt Issue
```markdown
# [Tech Debt] Storage Factory Needs Refactoring

**ID:** ISSUE-002
**Raised By:** implementer-agent
**Sprint:** Sprint 2
**Priority:** Low
**Status:** Deferred

## Problem
Storage factory has duplicate validation code across multiple
driver creation methods.

## Impact
Low - works correctly, just not DRY.

## Proposed Solution
Defer to Sprint 3. Create RFC for storage validation refactor.
```

## Integration with Sprints

Issues are reviewed during:
- **Sprint execution**: Handle critical/high issues immediately
- **Sprint retrospective**: Review deferred issues
- **Sprint planning**: Convert issues to RFCs for next sprint

## Best Practices

✅ **DO**:
- Create issues early when you discover problems
- Be specific about the problem and impact
- Suggest solutions when you can
- Update issue status as you work on it
- Link to related RFCs and ADRs

❌ **DON'T**:
- Let issues block you unnecessarily (defer if not critical)
- Create issues for every tiny thing (use judgment)
- Forget to update sprint notes when raising issues
- Leave issues in "Open" status forever
