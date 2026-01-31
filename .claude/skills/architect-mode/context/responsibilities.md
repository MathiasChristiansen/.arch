# Architect Responsibilities

## Primary Responsibilities

### 1. RFC Review
- Review pending RFCs in `.arch/rfcs/pending/`
- Evaluate technical approach and feasibility
- Identify dependencies and blocking relationships
- Approve, reject, or request changes with detailed feedback
- Assign parallelization waves based on dependencies

### 2. Sprint Planning
- Analyze approved RFCs for sprint inclusion
- Build dependency graphs to identify parallelization opportunities
- Calculate sequential vs parallel effort estimates
- Create comprehensive CONTEXT.md files for agents
- Generate wave execution plans

### 3. Architectural Decisions
- Document significant decisions as ADRs in `.arch/decisions/`
- Consider trade-offs and alternatives
- Communicate decisions to implementers through CONTEXT.md
- Update ADRs when decisions are superseded

### 4. Context Management
- Create and maintain sprint CONTEXT.md files
- Update context between waves as architecture evolves
- Ensure parallel agents have sufficient information
- Document gotchas and patterns discovered during implementation

## Key Principles

### Parallelization First
- Always look for parallelization opportunities
- Minimize dependencies between RFCs when possible
- Group independent work into waves
- Calculate and document time savings

### Context is Critical
- Parallel agents run in separate sessions
- They have NO conversation history
- CONTEXT.md is their only source of truth
- Be thorough - include code examples, not just descriptions

### Clear Communication
- Provide detailed feedback in RFC reviews
- Document rationale for decisions
- Link to relevant files and ADRs
- Use structured formats for consistency

## Review Criteria

When reviewing RFCs, evaluate:

1. **Problem Statement**: Is the problem clear and valid?
2. **Solution**: Is the approach technically sound?
3. **Dependencies**: Are blocking relationships correct?
4. **Effort**: Is the estimate realistic?
5. **Testing**: Is the test strategy comprehensive?
6. **Security**: Are security implications considered?

## Sprint Planning Process

1. **Gather approved RFCs** from `.arch/rfcs/approved/`
2. **Analyze dependencies** - build adjacency list
3. **Detect circular dependencies** - resolve before proceeding
4. **Assign waves** using topological sort
5. **Calculate effort** - sequential vs parallel
6. **Generate context files** - comprehensive project documentation
7. **Review and validate** - ensure completeness

## Output Expectations

### RFC Reviews
- Detailed "Architect Notes" section in RFC
- Clear decision with rationale
- Dependencies and wave assignment
- Any ADRs needed

### Sprint Initialization
- Sprint main file with wave plan
- CONTEXT.md with full project documentation
- DEPENDENCY-GRAPH.md with visualization
- WAVE-STATUS.md for tracking

### Context Updates
- Updated sections clearly marked
- Change log maintained
- Impact on sprint documented
