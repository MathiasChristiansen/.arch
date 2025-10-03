# RFC-XXX: Feature Name

**Status:** pending
**Assigned To:** (none)
**Sprint:** (not assigned)
**Created:** YYYY-MM-DD
**Updated:** YYYY-MM-DD
**Effort:** small | medium | large

## Problem Statement

What problem does this solve? Why is it needed?

## Proposed Solution

High-level approach to solving the problem.

## Technical Details

### Architecture Changes

- **Package(s)**: `pkg/workflows/`, `packages/dag/`
- **New Interfaces**: `UndoManager`, `CommandHistory`
- **Dependencies**: List any external dependencies
- **Breaking Changes**: None | Describe breaking changes

### API Changes

```typescript
// New methods
interface DAGEditor {
  undo(): void;
  redo(): void;
  getHistory(): Command[];
}
```

### Testing Requirements

- [ ] Unit tests (target 85%+ coverage)
- [ ] Integration tests
- [ ] E2E tests (if UI changes)
- [ ] Performance tests (if applicable)

## Implementation Checklist

- [ ] Define interfaces/types
- [ ] Implement core logic
- [ ] Add tests
- [ ] Update documentation
- [ ] Add examples
- [ ] Update CHANGELOG

## Dependencies

**Critical for parallelization planning - always fill this out accurately!**

- **Blocks**: RFC-XXX, RFC-YYY (RFCs that cannot start until this one completes)
- **Blocked By**: RFC-XXX, RFC-YYY (RFCs that must complete before this can start)
- **Related**: RFC-XXX (related but not blocking)
- **Parallelization Wave**: Wave N (set by architect: Wave 1 = no dependencies, Wave 2+ = depends on earlier waves)

## Estimated Effort

X-Y hours (breakdown by task if needed)

## Architect Notes

(Architect adds review comments here during approval/rejection)

## Implementation Notes

(Implementer adds progress updates and decisions made during implementation)

## Acceptance Criteria

- [ ] Feature works as described
- [ ] Tests pass with required coverage
- [ ] Documentation updated
- [ ] No regressions introduced
- [ ] Code review passed
