# Claude Code Setup

This repository uses the `.arch` framework for spec-driven development with architect and implementer agents.

## Quick Start

1. **Read the workflow**: See [.arch/README.md](.arch/README.md) for the complete workflow
2. **Use custom commands**: Helper slash commands are available in `.claude/commands/` for managing RFCs and sprints
3. **Parallelize tasks**: When working on multiple RFCs or reviews, use the Task tool to run agents concurrently

## Architecture

The `.arch/` directory contains:
- **rfcs/**: Feature requests organized by status (pending → approved → in-progress → implemented)
- **agents/**: Architect and implementer agent templates
- **sprints/**: Sprint planning and tracking
- **decisions/**: Architectural Decision Records (ADRs)

## Best Practices

- **Architects**: Review RFCs, define architecture, create ADRs
- **Implementers**: Claim approved RFCs, implement features, update progress
- **Custom Commands**: Use `/claim-rfc`, `/complete-rfc`, `/sprint-status` for common operations

### Critical: Parallelize Tasks for Efficient Development

**Always analyze RFC dependencies and parallelize independent work using the Task tool.**

When planning implementation:

1. **Analyze the dependency graph**:
   - Read all approved RFCs
   - Check "Blocks" and "Blocked By" fields in each RFC
   - Identify independent RFCs that can run in parallel

2. **Create a wave-based parallelization plan**:
   ```
   Example Sprint Plan:

   Wave 1 (parallel - no dependencies):
   - RFC-001: Database schema
   - RFC-002: API client library
   - RFC-003: UI components

   Wave 2 (parallel - depends on Wave 1):
   - RFC-004: User service (blocked by RFC-001, RFC-002)
   - RFC-005: Product service (blocked by RFC-001, RFC-002)

   Wave 3 (depends on Wave 2):
   - RFC-006: Integration layer (blocked by RFC-004, RFC-005)
   ```

3. **Execute with Task tool in parallel**:
   - Launch ALL Wave 1 RFCs in **one message** with multiple Task tool calls
   - Each Task gets its own agent context (implementer-001, implementer-002, etc.)
   - Wait for wave completion, then launch next wave

4. **Example parallelization**:
   ```
   ❌ SLOW - Sequential execution:
   Implement RFC-001 → RFC-002 → RFC-003 (3x time)

   ✅ FAST - Parallel execution:
   Launch 3 Task agents simultaneously for RFC-001, RFC-002, RFC-003 (1x time)
   ```

**This workflow approach is the most important practice for efficient development with this framework.**

## Customization

Add project-specific guidance below:

---

<!-- Add your project-specific instructions here -->
