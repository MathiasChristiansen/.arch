# Workflow Parallelization Guide

This guide explains how to maximize development efficiency by parallelizing RFC implementation using Claude Code's Task tool.

## Core Concept

**Wave-based parallelization**: Group RFCs into waves where each wave contains independent tasks that can run simultaneously.

## Step-by-Step Workflow

### 1. Analyze Dependencies

When starting a sprint or planning implementation:

```bash
# List all approved RFCs
ls .arch/rfcs/approved/

# Read each RFC and note dependencies
# Pay attention to "Blocks", "Blocked By", and "Parallelization Wave" fields
```

### 2. Build Dependency Graph

Create a mental model or diagram:

```
Wave 1 (No dependencies):
├─ RFC-001: Database schema
├─ RFC-002: API client
└─ RFC-003: UI components

Wave 2 (Depends on Wave 1):
├─ RFC-004: User service → depends on RFC-001, RFC-002
└─ RFC-005: Product service → depends on RFC-001, RFC-002

Wave 3 (Depends on Wave 2):
└─ RFC-006: Integration → depends on RFC-004, RFC-005
```

### 3. Execute Waves in Parallel

**Wave 1 - Launch all independent RFCs simultaneously:**

```
Launch the following Task agents in parallel (in ONE message):
1. implementer-db agent: Implement RFC-001 (Database schema)
2. implementer-api agent: Implement RFC-002 (API client)
3. implementer-ui agent: Implement RFC-003 (UI components)
```

**Wait for Wave 1 completion, then launch Wave 2:**

```
Launch the following Task agents in parallel (in ONE message):
1. implementer-backend-1 agent: Implement RFC-004 (User service)
2. implementer-backend-2 agent: Implement RFC-005 (Product service)
```

**Wait for Wave 2 completion, then launch Wave 3:**

```
Launch single Task agent:
1. implementer-integration agent: Implement RFC-006 (Integration layer)
```

## Real-World Example

### Scenario: E-commerce Feature Sprint

**Approved RFCs:**
- RFC-010: Product database schema
- RFC-011: Shopping cart API
- RFC-012: Payment gateway interface
- RFC-013: Product catalog UI
- RFC-014: Checkout flow (needs RFC-011, RFC-012, RFC-013)
- RFC-015: Order management (needs RFC-010, RFC-011)

**Dependency Analysis:**

```
Wave 1 (4 parallel tasks):
- RFC-010: Product database schema (no deps)
- RFC-011: Shopping cart API (no deps)
- RFC-012: Payment gateway interface (no deps)
- RFC-013: Product catalog UI (no deps)

Wave 2 (2 parallel tasks):
- RFC-014: Checkout flow (blocked by RFC-011, RFC-012, RFC-013)
- RFC-015: Order management (blocked by RFC-010, RFC-011)

Total time: ~2 wave cycles vs 6 sequential cycles (3x faster!)
```

**Execution:**

```
Message 1 - Wave 1:
Use Task tool to launch 4 agents:
1. implementer-db: Implement RFC-010
2. implementer-cart: Implement RFC-011
3. implementer-payment: Implement RFC-012
4. implementer-catalog: Implement RFC-013

[Wait for all to complete]

Message 2 - Wave 2:
Use Task tool to launch 2 agents:
1. implementer-checkout: Implement RFC-014
2. implementer-orders: Implement RFC-015
```

## Best Practices

### ✅ DO

- **Always check dependencies** before parallelizing
- **Group by wave** based on dependency depth
- **Launch entire wave simultaneously** in one message with multiple Task calls
- **Wait for wave completion** before starting dependent tasks
- **Update RFC status** as agents complete work
- **Use specific agent names** (implementer-db, implementer-api) for clarity

### ❌ DON'T

- **Don't run dependent RFCs in parallel** - check "Blocked By" field
- **Don't launch sequentially** when RFCs are independent
- **Don't forget to update** Parallelization Wave field when reviewing RFCs
- **Don't batch unrelated waves** - respect dependencies

## Architect Responsibilities

When reviewing RFCs, architects must:

1. **Identify dependencies** between RFCs
2. **Assign parallelization wave** number:
   - Wave 1: No dependencies
   - Wave 2: Depends only on Wave 1
   - Wave 3+: Depends on earlier waves
3. **Update RFC metadata** with dependency information
4. **Consider wave size** - aim for balanced parallelization (3-5 RFCs per wave ideal)

## Common Patterns

### Pattern 1: Foundation → Features → Integration

```
Wave 1: Database, APIs, Libraries
Wave 2: Services using Wave 1
Wave 3: Integration and E2E features
```

### Pattern 2: Vertical Slices

```
Wave 1: User Management (DB + API + UI)
Wave 2: Product Management (DB + API + UI)
Wave 3: Order Management (DB + API + UI)
```

### Pattern 3: Infrastructure First

```
Wave 1: Infrastructure, CI/CD, Monitoring
Wave 2: Backend services
Wave 3: Frontend features
```

## Monitoring Progress

Use `/sprint-status` to see:
- Which RFCs are in progress
- Which agents are working on what
- Which wave is currently executing

## Performance Impact

**Example metrics:**

| Approach | 6 RFCs (2 deps) | Time |
|----------|----------------|------|
| Sequential | RFC-1→2→3→4→5→6 | 6x |
| Parallel Waves | Wave1(1,2,3) → Wave2(4,5,6) | 2x |
| **Speedup** | **3x faster** | |

## Summary

Parallelization is the most powerful feature of the .arch framework. Always:

1. Analyze dependencies
2. Group into waves
3. Launch waves in parallel using Task tool
4. Respect blocking relationships

This approach transforms linear development into concurrent execution, dramatically reducing implementation time.
