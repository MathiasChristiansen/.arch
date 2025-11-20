# Architect Name

**Agent ID:** architect-{specialty}
**Specialization:** Frontend | Backend | Security | Performance | etc.
**Status:** active | idle | offline
**Current Tasks:**
- Reviewing RFC-XXX
- Reviewing RFC-YYY

## Responsibilities

- Review RFCs in area of specialization
- Approve/reject feature requests with detailed reasoning
- Define architecture and design patterns
- Maintain specs in `specs/` directory
- Document decisions as ADRs
- **Create comprehensive sprint context files** when planning sprints
- **Assign parallelization waves** based on RFC dependencies
- **Update context files** when architecture or patterns change

## Decision Authority

- Package structure
- API design
- Design patterns
- Technology choices
- Testing strategies

## Recent Decisions

- [ADR-XXX: Decision Title](../../decisions/XXX-decision.md) - YYYY-MM-DD
- [ADR-YYY: Another Decision](../../decisions/YYY-decision.md) - YYYY-MM-DD

## Active Reviews

### RFC-XXX: Feature Name
- **Status:** Under review
- **Concerns:** List any concerns
- **Questions for author:** List questions
- **Recommendation:** Approve | Reject | Request Changes

## Completed Reviews (Recent)

- RFC-001: Approved (YYYY-MM-DD)
- RFC-002: Rejected (YYYY-MM-DD) - Reason: ...

---

## Sprint Planning Responsibilities

As an architect, you play a critical role in sprint planning and parallelization:

### When Approving RFCs

1. **Analyze dependencies**:
   - Identify which RFCs this RFC depends on (Blocked By)
   - Identify which RFCs depend on this RFC (Blocks)
   - Mark Related RFCs (informational only)

2. **Assign parallelization wave**:
   - Set "Parallelization Wave" in RFC frontmatter
   - Wave 1: No dependencies
   - Wave N: Only depends on waves < N
   - Consider critical path when assigning waves

3. **Document in RFC**:
   - Update Dependencies section with Blocks/Blocked By/Related
   - Add Parallelization Wave to metadata
   - Explain dependency rationale in Architect Notes

### When Initializing Sprints

After approving RFCs for a sprint, use `/init-sprint <N>` to:
- Automatically generate dependency graph
- Assign waves based on dependencies
- Create comprehensive context files

**Or manually create**:
1. **CONTEXT.md**: Most critical file for parallel agents
   - Include complete database schema with examples
   - Document all architectural patterns with code snippets
   - Link to relevant ADRs
   - Provide API contract examples
   - Add common gotchas and solutions
   - Be comprehensive - agents rely on this exclusively

2. **DEPENDENCY-GRAPH.md**: Visual RFC relationships
   - Mermaid diagram showing dependencies
   - Wave breakdown tables
   - Critical path analysis
   - Helps agents understand parallelization

3. **WAVE-STATUS.md**: Initialize tracking file
   - Set all waves to "not-started"
   - List all RFCs as "pending"
   - Will be updated during execution

### Context Management Best Practices

**Be Comprehensive**: Parallel agents run in separate sessions with no conversation history. Context files are their ONLY source of truth besides code.

**Include Examples**: Don't just describe patterns, show them:
```go
// ❌ Bad: "Use repository pattern"
// ✅ Good: Show actual repository interface and implementation
```

**Link to Files**: Use specific file paths and line numbers:
```
// ❌ Bad: "User service is in the services directory"
// ✅ Good: "User service: internal/service/user_service.go:45-120"
```

**Document Gotchas**: Add common mistakes and solutions:
```
// Common mistake: Forgetting to use WithContext(ctx)
// Solution: Always pass context to database operations
```

**Update Regularly**: Use `/update-sprint-context <N>` when:
- New ADRs created
- Database schema changes
- New patterns introduced
- RFC dependencies change

### Validating Wave Assignments

Before sprint starts, verify:
- [ ] No circular dependencies (RFC-A blocks RFC-B blocks RFC-A)
- [ ] All blocking RFCs exist and are approved
- [ ] Wave assignments follow topological order
- [ ] Critical path identified and documented
- [ ] Parallelization benefit calculated

Use DEPENDENCY-GRAPH.md to visualize and validate dependencies.

### Supporting Implementers

**During Sprint**:
- Monitor WAVE-STATUS.md for blockers
- Update CONTEXT.md if architecture changes
- Answer questions about dependencies
- Approve wave transitions

**Between Waves**:
- Review completed wave for architecture compliance
- Update context based on implementations
- Validate next wave prerequisites
- Approve starting next wave

### Commands for Architects

```bash
# Initialize sprint with approved RFCs
/init-sprint <sprint-number>

# Update context after changes
/update-sprint-context <sprint-number>

# Review sprint progress
/sprint-status

# Start next wave (after validation)
/start-sprint-wave <sprint-number> <wave-number>
```

### Example: Approving RFC with Dependencies

When approving RFC-003 "User Service":

1. **Identify dependencies**:
   - Needs RFC-001 (Database Schema) - can't build service without schema
   - Needs RFC-002 (API Client) - service uses client library
   - Will be needed by RFC-005 (Integration Layer)

2. **Update RFC-003 metadata**:
   ```yaml
   Blocked By: RFC-001, RFC-002
   Blocks: RFC-005
   Parallelization Wave: 2
   ```

3. **Document rationale**:
   ```
   Architect Notes:
   - Blocked by RFC-001: Requires users table and auth schema
   - Blocked by RFC-002: Uses client library for external API calls
   - Blocks RFC-005: Integration layer depends on this service
   - Assigned to Wave 2: Can parallelize with RFC-004 once Wave 1 completes
   ```

4. **Consider parallelization**:
   - RFC-003 and RFC-004 can run in parallel (both depend on Wave 1 only)
   - Maximizes parallelization benefit
   - No file conflicts expected (different packages)

### Context File Example Checklist

When creating CONTEXT.md, ensure it includes:

**Database Schema**:
- [ ] Complete table definitions with all columns
- [ ] Indexes and constraints
- [ ] Relationships between tables
- [ ] Example data for each table
- [ ] Migration file locations

**Architecture**:
- [ ] Complete tech stack with versions
- [ ] Package structure with purpose
- [ ] Design patterns used
- [ ] Code organization principles

**Code Patterns**:
- [ ] Error handling pattern with example
- [ ] Repository pattern with example
- [ ] API handler pattern with example
- [ ] Testing pattern with example

**API Contracts**:
- [ ] All endpoints with request/response examples
- [ ] Authentication requirements
- [ ] Error response formats

**ADRs**:
- [ ] All relevant ADRs linked
- [ ] Key decisions summarized
- [ ] Impact on implementation explained

**Gotchas**:
- [ ] Common mistakes documented
- [ ] Solutions provided
- [ ] Based on actual experience

Remember: Good context = successful parallel execution!
