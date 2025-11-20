# Sprint N: Sprint Name

**Status:** planned | current | completed
**Duration:** YYYY-MM-DD to YYYY-MM-DD (X weeks)
**Goal:** High-level objective for this sprint

## Objectives

1. Primary objective
2. Secondary objective
3. Stretch goal (optional)

## Parallelization Plan

> **For quick-start sessions**: Review this section to understand what can be executed in parallel.
> Each wave contains RFCs with no blocking dependencies within the wave.

### Wave 1 (No Dependencies - Start Immediately)
- [RFC-XXX: Feature Name](../rfcs/approved/XXX-feature.md) - Effort: small | medium | large
- [RFC-YYY: Another Feature](../rfcs/approved/YYY-feature.md) - Effort: small | medium | large

**Parallel Execution**: Launch all Wave 1 RFCs simultaneously using `/start-sprint-wave N 1`

### Wave 2 (Depends on Wave 1)
- [RFC-AAA: Feature Name](../rfcs/approved/AAA-feature.md) - Blocked by: RFC-XXX - Effort: medium
- [RFC-BBB: Another Feature](../rfcs/approved/BBB-feature.md) - Blocked by: RFC-YYY - Effort: small

**Prerequisites**: Wave 1 must complete before starting Wave 2

### Wave 3 (Depends on Wave 2)
- [RFC-CCC: Integration](../rfcs/approved/CCC-feature.md) - Blocked by: RFC-AAA, RFC-BBB - Effort: large

**Prerequisites**: Wave 2 must complete before starting Wave 3

**Total Estimated Effort**: X hours (if fully sequential) → Y hours (with parallelization)

## RFCs in This Sprint

### Approved (Ready to Claim)
- [RFC-XXX: Feature Name](../rfcs/approved/XXX-feature.md) - Priority: High | Medium | Low - Wave: 1

### In Progress
- [RFC-YYY: Another Feature](../rfcs/in-progress/YYY-feature.md) - @implementer-001 (started YYYY-MM-DD) - Wave: 1

### Completed
- [RFC-ZZZ: Completed Feature](../rfcs/implemented/ZZZ-feature.md) - @implementer-002 (3 hours) - Wave: 1

## Active Agents

### Architects (N active)
- **@architect-frontend**: Reviewing RFCs, defining component architecture
- **@architect-backend**: Reviewing workflow RFCs

### Implementers (N active, M available)
- **@implementer-001**: Working on RFC-YYY (started YYYY-MM-DD)
- **@implementer-002**: Available
- **@implementer-003**: Available

## Blockers

- (None) | List any blocking issues

## Dependencies

- External: List external dependencies (APIs, services, etc.)
- Internal: List dependencies on other sprints/RFCs

## Sprint Context

> **Critical for parallel agents**: This section provides essential context that ALL agents need.
> When starting new sessions, read this first to avoid losing context.

### Database Schema
- **Primary Database**: PostgreSQL 15 / MongoDB 6 / etc.
- **Key Tables/Collections**:
  - `users` - User accounts and authentication
  - `projects` - Project management
  - (Add other critical tables)
- **Schema Location**: `docs/schema.md` or `migrations/` directory

### Architecture Overview
- **Technology Stack**: Go 1.21, TypeScript 5, React 18, etc.
- **Key Patterns**: Clean Architecture, Repository Pattern, etc.
- **Package Structure**: `/internal`, `/pkg`, `/cmd`
- **API Structure**: REST/GraphQL at `/api/v1`

### Key Architectural Decisions
- [ADR-001: Database choice](../decisions/001-database-choice.md)
- [ADR-002: API design](../decisions/002-api-design.md)
- (Link to relevant ADRs)

### Dependencies & Infrastructure
- **External APIs**: Stripe, SendGrid, etc.
- **Services**: Redis cache, Message queue, etc.
- **Environment**: Development, Staging, Production setup

### Testing Strategy
- **Unit Tests**: Go (testify), TS (Jest)
- **Integration Tests**: Testcontainers, etc.
- **E2E Tests**: Playwright, Cypress
- **Coverage Goal**: 80%+

**Context Files**: See [sprint-N/CONTEXT.md](sprint-N/CONTEXT.md) for detailed context

## Progress Metrics

- **RFCs Approved**: X
- **RFCs In Progress**: Y
- **RFCs Completed**: Z
- **Total RFCs**: X + Y + Z
- **Completion %**: (Z / Total) * 100
- **Current Wave**: Wave N of M
- **Wave Progress**: X/Y RFCs completed in current wave

## Retrospective

(Added after sprint completes)

### What Went Well
- Item 1
- Item 2

### What Could Be Improved
- Item 1
- Item 2

### Action Items for Next Sprint
- [ ] Action 1
- [ ] Action 2

### Velocity
- Planned: X RFCs
- Completed: Y RFCs
- Velocity: Y/X = Z% (use for next sprint planning)
