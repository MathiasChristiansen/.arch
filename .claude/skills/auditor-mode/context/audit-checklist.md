# Auditor Checklist

## Pre-Audit Setup

- [ ] Read ALL ADRs in `.arch/decisions/`
- [ ] Read sprint CONTEXT.md thoroughly
- [ ] Understand which patterns are mandatory
- [ ] Note which RFCs are in-progress
- [ ] Identify expected file/pattern locations

## ADR Compliance Checks

For each in-progress RFC, verify:

### Architecture Decisions
- [ ] Database patterns match ADR specifications
- [ ] API design follows documented conventions
- [ ] Authentication/authorization follows ADRs
- [ ] Error handling matches prescribed pattern
- [ ] Logging follows established format

### Technology Choices
- [ ] Using specified libraries (not alternatives)
- [ ] Following framework conventions from ADRs
- [ ] Using correct database/ORM patterns
- [ ] API versioning as specified

### Security Requirements
- [ ] Input validation present
- [ ] No SQL injection vulnerabilities
- [ ] Authentication properly implemented
- [ ] Authorization checks in place
- [ ] Sensitive data handled correctly

## Pattern Consistency Checks

Compare against CONTEXT.md patterns:

### Code Structure
- [ ] File organization matches project structure
- [ ] Naming conventions followed
- [ ] Module boundaries respected
- [ ] Dependency directions correct

### Implementation Patterns
- [ ] Repository pattern used correctly
- [ ] Service layer structure matches
- [ ] Handler/controller pattern consistent
- [ ] Error handling uniform

### Testing Patterns
- [ ] Test file locations correct
- [ ] Test naming conventions followed
- [ ] Mock patterns consistent
- [ ] Coverage targets being met

## Scope Adherence Checks

For each RFC:

- [ ] Only specified features implemented
- [ ] No "while we're here" additions
- [ ] Dependencies match RFC spec
- [ ] Files touched match expected scope
- [ ] No cross-RFC conflicts

## Progress Accuracy Checks

In WAVE-STATUS.md:

- [ ] Progress percentages realistic
- [ ] Status updates recent (< 1 hour)
- [ ] Blockers documented
- [ ] Time tracking reasonable
- [ ] Agent assignments correct

## Cross-Implementation Checks

Between parallel implementations:

- [ ] No file conflicts
- [ ] No duplicate functionality
- [ ] Shared utilities consistent
- [ ] Integration points compatible
- [ ] No race conditions in shared resources

## Red Flags (Immediate Alert)

Stop and report if you observe:

1. **ADR Violation**: Architectural rule broken
2. **Security Issue**: Vulnerability introduced
3. **Conflict**: Two agents modifying same area
4. **Scope Explosion**: Far exceeding RFC boundaries
5. **Pattern Rejection**: Completely different approach than CONTEXT.md
6. **Dependency Violation**: Working on blocked RFC

## Yellow Flags (Note for Review)

Document for wave retrospective:

1. **Minor inconsistencies** in style
2. **Documentation gaps**
3. **Test coverage below target**
4. **Slight scope expansion**
5. **Pattern variations** (not violations)

## Audit Frequency

- **During active wave**: Every 30-60 minutes
- **At wave completion**: Full audit before next wave
- **On blocker reported**: Immediate check
- **On completion**: Verify before marking done
