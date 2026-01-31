# RFC Review Checklist

Use this checklist when reviewing RFCs as an architect.

## 1. Problem Statement

- [ ] **Clear definition**: Problem is clearly defined and understandable
- [ ] **Impact stated**: Impact of not solving is explained
- [ ] **Scope appropriate**: Not too broad, not too narrow
- [ ] **User/system affected**: Who/what is impacted by this problem

## 2. Proposed Solution

- [ ] **Addresses problem**: Solution directly addresses the stated problem
- [ ] **Technically sound**: Approach is architecturally valid
- [ ] **Alternatives considered**: Other approaches were evaluated
- [ ] **Trade-offs documented**: Pros/cons of chosen approach explained

## 3. Technical Details

### Architecture
- [ ] **Fits existing patterns**: Follows established architecture
- [ ] **No anti-patterns**: Doesn't introduce problematic patterns
- [ ] **Modularity maintained**: Keeps concerns separated
- [ ] **Dependencies appropriate**: External dependencies are justified

### API Design (if applicable)
- [ ] **RESTful conventions**: Follows REST best practices
- [ ] **Consistent naming**: Matches existing API naming
- [ ] **Error handling**: Error responses defined
- [ ] **Versioning considered**: API versioning addressed if needed

### Data Model (if applicable)
- [ ] **Schema changes valid**: Database changes are sound
- [ ] **Migrations planned**: How to migrate existing data
- [ ] **Relationships correct**: Foreign keys and indexes appropriate
- [ ] **Backward compatible**: Existing data not corrupted

### Performance
- [ ] **Scalability considered**: Solution scales appropriately
- [ ] **No N+1 queries**: Database queries are efficient
- [ ] **Caching strategy**: Appropriate caching if needed
- [ ] **Resource usage**: Memory/CPU impact considered

## 4. Security

- [ ] **Authentication**: Auth requirements defined
- [ ] **Authorization**: Permissions/roles considered
- [ ] **Input validation**: User input validated
- [ ] **No injection risks**: SQL/XSS/etc. prevented
- [ ] **Data privacy**: Sensitive data handled properly

## 5. Testing Requirements

- [ ] **Test strategy defined**: How to test this feature
- [ ] **Coverage realistic**: Target coverage is achievable
- [ ] **Unit tests planned**: Unit test approach defined
- [ ] **Integration tests planned**: Integration test approach defined
- [ ] **Edge cases identified**: Error cases and boundaries covered

## 6. Dependencies

- [ ] **Blocks identified**: What this RFC blocks is documented
- [ ] **Blocked by identified**: What blocks this RFC is documented
- [ ] **No circular deps**: No circular dependency introduced
- [ ] **Related RFCs noted**: Related but non-blocking RFCs listed
- [ ] **Wave assignment valid**: Correct parallelization wave

## 7. Effort Estimate

- [ ] **Realistic estimate**: Time estimate is achievable
- [ ] **Complexity assessed**: Small/medium/large is accurate
- [ ] **Hidden work identified**: No significant hidden work
- [ ] **Testing included**: Estimate includes testing time

## 8. Implementation Guidance

- [ ] **Clear acceptance criteria**: How to know when done
- [ ] **Implementation checklist**: Steps are defined
- [ ] **No ambiguity**: Implementer won't need to guess
- [ ] **Examples provided**: Where helpful, examples included

## Review Decision Matrix

| Criteria | Pass | Partial | Fail |
|----------|------|---------|------|
| Problem clear | ✅ | ⚠️ Request clarification | ❌ Reject |
| Solution sound | ✅ | ⚠️ Request changes | ❌ Reject |
| Dependencies valid | ✅ | ⚠️ Fix dependencies | ❌ Block until fixed |
| Estimate realistic | ✅ | ⚠️ Adjust estimate | ⚠️ Discuss with author |
| Tests adequate | ✅ | ⚠️ Add test requirements | ⚠️ Add test requirements |

## Decision Guidelines

### Approve If:
- Problem is clear and valid
- Solution is technically sound
- Dependencies are correctly identified
- Estimate is reasonable
- No major concerns

### Request Changes If:
- Minor issues can be fixed quickly
- Clarifications needed
- Dependencies need adjustment
- Tests need expansion

### Reject If:
- Problem is not valid or already solved
- Solution has fundamental flaws
- Would introduce technical debt
- Better alternatives exist
- Scope is inappropriate
