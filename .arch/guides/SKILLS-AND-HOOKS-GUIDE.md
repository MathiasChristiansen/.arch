# Skills & Hooks Authoring Guide

This guide helps you create project-specific skills and hooks for automation in the .arch framework.

---

## Part 1: Skills

### What Are Skills?

Skills are modular capabilities that extend Claude's functionality. Each skill packages instructions, metadata, and optional resources (scripts, templates) that Claude uses automatically when relevant or when invoked with `/skill-name`.

### When to Create a Skill

Create a skill when you have:

1. **Repetitive workflows** - Deployment, testing, code generation
2. **Project-specific conventions** - Naming patterns, file structure, coding standards
3. **Domain knowledge** - Business logic, API patterns, architecture rules
4. **Multi-step processes** - Build pipelines, review checklists, release procedures

### Skill Types

#### Reference Skills (Knowledge)

Conventions, patterns, style guides that run inline with conversation context.

```yaml
---
name: api-conventions
description: API design patterns for this codebase. Use when creating or reviewing API endpoints.
---

When writing API endpoints:
- Use RESTful naming conventions (plural nouns: /users, /orders)
- Return consistent error formats: { "error": { "code": "...", "message": "..." } }
- Include request validation on all inputs
- Use HTTP status codes correctly (201 for create, 204 for delete, etc.)
```

#### Task Skills (Actions)

Step-by-step instructions for specific actions, often user-invoked only.

```yaml
---
name: deploy
description: Deploy the application to production
disable-model-invocation: true
allowed-tools: Bash
---

Deploy $ARGUMENTS to production:

1. Run the test suite: `npm test`
2. Build the application: `npm run build`
3. Push to deployment target
4. Verify the deployment succeeded
```

#### Mode Skills (Context Switching)

Activate a role or context with responsibilities and workflows.

```yaml
---
name: architect-mode
description: Activate architect role with responsibilities and context
---

# Architect Mode Activated

You are now operating as an **Architect Agent**.

## Your Responsibilities
- Review RFCs and approve/reject with reasoning
- Assign parallelization waves based on dependencies
- Create comprehensive sprint context files
- Document architectural decisions as ADRs
```

### Skill Directory Structure

```
.claude/skills/<skill-name>/
├── SKILL.md           # Main instructions (required)
├── templates/         # Templates for Claude to fill
├── examples/          # Example outputs showing expected format
├── scripts/           # Executable utilities
└── context/           # Reference documentation
```

### SKILL.md Structure

```yaml
---
# YAML Frontmatter (all fields optional)
name: my-skill
description: What this skill does and when to use it
argument-hint: <arg1> [arg2]
disable-model-invocation: true
user-invocable: true
allowed-tools: Read, Edit, Bash
context: fork
agent: Explore
---

# Main Instructions

Your skill instructions here...

## Dynamic Context

!`cat some-file.txt 2>/dev/null`!

## Reference Supporting Files

$FILE{templates/example.md}
```

### Frontmatter Reference

| Field | Purpose | Default | Example |
|-------|---------|---------|---------|
| `name` | Display name (lowercase, hyphens) | Directory name | `my-skill` |
| `description` | When to use (Claude reads this) | First paragraph | `Generate API endpoints...` |
| `argument-hint` | Show expected args in autocomplete | None | `<endpoint-name>` |
| `disable-model-invocation` | User-only invocation | `false` | `true` |
| `user-invocable` | Show in `/` menu | `true` | `false` |
| `allowed-tools` | Restrict available tools | All tools | `Read, Grep, Glob` |
| `context` | Run in subagent | None | `fork` |
| `agent` | Subagent type when `context: fork` | `general-purpose` | `Explore` |
| `model` | Override model | Inherited | `haiku` |

### Dynamic Context Injection

Use shell commands to inject current project state:

```yaml
## Current Database Schema
!`cat prisma/schema.prisma 2>/dev/null || echo "No schema found"`!

## Recent Git Changes
!`git log --oneline -5 2>/dev/null`!

## Current Sprint Status
!`cat .arch/sprints/current.md 2>/dev/null | head -30`!
```

### String Substitutions

| Variable | Description | Example |
|----------|-------------|---------|
| `$ARGUMENTS` | All arguments passed | `/skill foo bar` → `foo bar` |
| `$ARGUMENTS[N]` | Specific argument (0-indexed) | `$ARGUMENTS[0]` → `foo` |
| `$N` | Shorthand for `$ARGUMENTS[N]` | `$0` → `foo`, `$1` → `bar` |
| `${CLAUDE_SESSION_ID}` | Current session ID | `abc123...` |

### Including Supporting Files

Reference files from your skill directory:

```yaml
## Template
$FILE{templates/component-template.tsx}

## Examples
See [examples/good-example.md](examples/good-example.md) for expected output.
```

### Invocation Control

| Configuration | You Can Invoke | Claude Can Invoke | Use Case |
|---------------|----------------|-------------------|----------|
| Default | Yes | Yes | General skills |
| `disable-model-invocation: true` | Yes | No | Dangerous operations (deploy, commit) |
| `user-invocable: false` | No | Yes | Background knowledge |

### Running in Subagent Context

Add `context: fork` to run in isolation (no conversation history):

```yaml
---
name: deep-research
description: Research a topic thoroughly
context: fork
agent: Explore
---

Research $ARGUMENTS thoroughly:

1. Find relevant files using Glob and Grep
2. Read and analyze the code
3. Summarize findings with specific file references
```

### Skills Best Practices

1. **Keep SKILL.md focused** - Move detailed docs to supporting files
2. **Use dynamic context** - Inject current project state with `!`command``
3. **Include examples** - Show expected output format
4. **Reference files relatively** - Use `$FILE{templates/example.md}`
5. **Test incrementally** - Start simple, add complexity
6. **Write clear descriptions** - Help Claude know when to use the skill
7. **Restrict tools appropriately** - Use `allowed-tools` for safety

---

## Part 2: Hooks

### What Are Hooks?

Hooks are shell commands that execute at specific points in Claude's lifecycle. They provide deterministic control over behavior - ensuring certain actions always happen.

### When to Create a Hook

Create a hook when you need:

1. **Automatic formatting** - Run prettier/eslint after file edits
2. **Validation** - Block edits to protected files
3. **Notifications** - Alert when tasks complete
4. **Context preservation** - Re-inject state after compaction
5. **Logging/auditing** - Track changes for compliance
6. **Enforcement** - Ensure coding standards are followed

### Hook Events

| Event | When | Use Case |
|-------|------|----------|
| `SessionStart` | Session begins/resumes | Load project context |
| `UserPromptSubmit` | Before prompt processing | Validate input |
| `PreToolUse` | Before tool runs | Block dangerous ops |
| `PostToolUse` | After tool succeeds | Format code, update status |
| `PostToolUseFailure` | After tool fails | Log errors |
| `PermissionRequest` | Permission dialog appears | Auto-approve/deny |
| `Notification` | Notification sent | Desktop alerts |
| `SubagentStart` | Subagent spawns | Track parallel work |
| `SubagentStop` | Subagent finishes | Aggregate results |
| `Stop` | Claude finishes responding | Update logs |
| `PreCompact` | Before context compaction | Save critical context |
| `SessionEnd` | Session terminates | Cleanup |

### Hook Types

#### Command Hooks (Shell)

Run a shell command:

```json
{
  "type": "command",
  "command": "npx prettier --write \"$FILE_PATH\""
}
```

#### Prompt Hooks (LLM Evaluation)

Ask Claude to evaluate a condition:

```json
{
  "type": "prompt",
  "prompt": "Check if this change follows our coding standards. Return {\"ok\": true} or {\"ok\": false, \"reason\": \"...\"}"
}
```

#### Agent Hooks (Multi-turn Verification)

Spawn a subagent to verify with tool access:

```json
{
  "type": "agent",
  "prompt": "Verify all tests pass before allowing completion.",
  "timeout": 120
}
```

### Hook Configuration

Location: `.claude/settings.json`

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"
          }
        ]
      }
    ]
  }
}
```

### Matchers

Filter when hooks fire using regex patterns:

| Event | Matches On | Example Values |
|-------|------------|----------------|
| `PreToolUse`, `PostToolUse` | Tool name | `Bash`, `Edit\|Write`, `mcp__.*` |
| `SessionStart` | Start type | `startup`, `resume`, `compact` |
| `SessionEnd` | End reason | `clear`, `logout` |
| `Notification` | Notification type | `permission_prompt`, `idle_prompt` |

### Common Hook Patterns

#### Auto-format on Edit

```json
{
  "PostToolUse": [{
    "matcher": "Edit|Write",
    "hooks": [{
      "type": "command",
      "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write"
    }]
  }]
}
```

#### Block Protected Files

```json
{
  "PreToolUse": [{
    "matcher": "Edit|Write",
    "hooks": [{
      "type": "command",
      "command": ".claude/hooks/protect-files.sh"
    }]
  }]
}
```

#### Re-inject Context After Compaction

```json
{
  "SessionStart": [{
    "matcher": "compact",
    "hooks": [{
      "type": "command",
      "command": "cat .arch/sprints/current.md 2>/dev/null | head -50"
    }]
  }]
}
```

#### Desktop Notification When Done

```json
{
  "Notification": [{
    "matcher": "idle_prompt",
    "hooks": [{
      "type": "command",
      "command": "osascript -e 'display notification \"Claude needs your attention\" with title \"Claude Code\"'"
    }]
  }]
}
```

#### Run Tests Before Stop

```json
{
  "Stop": [{
    "hooks": [{
      "type": "agent",
      "prompt": "Run the test suite and verify all tests pass.",
      "timeout": 120
    }]
  }]
}
```

### Hook Script Template

```bash
#!/bin/bash
# .claude/hooks/my-hook.sh

# Read JSON input from stdin
INPUT=$(cat)

# Parse fields with jq
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty')
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // empty')

# Your logic here
if [[ "$FILE_PATH" == *".env"* ]]; then
  echo "Cannot edit .env files" >&2
  exit 2  # Block the action
fi

# Exit codes:
# 0 = allow action (stdout added to context for SessionStart/UserPromptSubmit)
# 2 = block action (stderr becomes feedback to Claude)
# Other = allow action (stderr logged but not shown to Claude)
exit 0
```

### Hook Input (stdin)

Hooks receive JSON on stdin with event-specific data:

```json
{
  "session_id": "abc123",
  "cwd": "/path/to/project",
  "hook_event_name": "PreToolUse",
  "tool_name": "Bash",
  "tool_input": {
    "command": "npm test"
  }
}
```

### Hook Output

| Exit Code | Behavior |
|-----------|----------|
| `0` | Action proceeds. Stdout added to context for `SessionStart`/`UserPromptSubmit` |
| `2` | Action blocked. Stderr sent to Claude as feedback |
| Other | Action proceeds. Stderr logged (visible in verbose mode) |

### JSON Output (Advanced)

Exit 0 with JSON for structured control:

```json
{
  "hookSpecificOutput": {
    "hookEventName": "PreToolUse",
    "permissionDecision": "deny",
    "permissionDecisionReason": "Use rg instead of grep for better performance"
  }
}
```

### Hooks Best Practices

1. **Keep hooks fast** - Long-running hooks slow down Claude
2. **Use exit codes correctly** - 0=allow, 2=block
3. **Write to stderr for feedback** - Claude sees blocked reasons
4. **Test scripts standalone** - Debug before integrating
5. **Use matchers wisely** - Don't run hooks on every tool call
6. **Handle errors gracefully** - Don't crash on missing files
7. **Log for debugging** - Write to a log file, not stdout

---

## Part 3: Framework-Specific Skills

### Skills for the .arch Framework

The .arch framework includes these built-in skills:

| Skill | Purpose | Invocation |
|-------|---------|------------|
| `/claim-rfc` | Claim an RFC for implementation | User |
| `/complete-rfc` | Mark RFC as implemented | User |
| `/init-sprint` | Initialize sprint with wave planning | User (Architect) |
| `/start-sprint-wave` | Launch parallel agents for a wave | User (Coordinator) |
| `/review-rfc` | Review pending RFC | User (Architect) |
| `/sprint-status` | Show sprint progress | Both |
| `/update-sprint-context` | Update context files | User (Architect) |
| `/architect-mode` | Activate architect role | Both |
| `/implementer-mode` | Activate implementer role | Both |
| `/create-skill` | Create a new skill | User |

### Creating Project-Specific Skills

When working on a project, create skills for:

1. **Code Generation**
   - Component templates
   - API endpoint scaffolding
   - Test file generation

2. **Quality Checks**
   - Code review checklists
   - Security audit patterns
   - Performance review guidelines

3. **Domain Knowledge**
   - Business rules
   - Data model explanations
   - Integration patterns

4. **Maintenance**
   - Cleanup procedures
   - Migration guides
   - Deprecation workflows

### Example: Creating a Component Generator Skill

```bash
mkdir -p .claude/skills/generate-component
```

`.claude/skills/generate-component/SKILL.md`:

```yaml
---
name: Generate Component
description: Generate a React component with tests following project patterns
argument-hint: <ComponentName>
allowed-tools: Read, Write, Glob
---

Generate a React component named $0.

## Project Component Pattern

!`cat src/components/Button/Button.tsx 2>/dev/null | head -30`!

## Test Pattern

!`cat src/components/Button/Button.test.tsx 2>/dev/null | head -20`!

## Your Task

1. Create `src/components/$0/$0.tsx` following the pattern above
2. Create `src/components/$0/$0.test.tsx` with basic tests
3. Create `src/components/$0/index.ts` for exports
4. Verify files match project conventions
```

---

## Part 4: Debugging

### Skills Troubleshooting

**Skill not triggering:**
- Check description includes keywords users would say
- Verify skill appears in `What skills are available?`
- Try invoking directly with `/skill-name`

**Skill triggers too often:**
- Make description more specific
- Add `disable-model-invocation: true`

**Claude doesn't see all skills:**
- Check skill character budget (default 15,000)
- Set `SLASH_COMMAND_TOOL_CHAR_BUDGET` env var to increase

### Hooks Troubleshooting

**Hook not firing:**
- Run `/hooks` to verify configuration
- Check matcher pattern matches tool name exactly
- Verify triggering the correct event type

**Hook error in output:**
- Test script manually: `echo '{"tool_name":"Bash"}' | ./hook.sh`
- Check script is executable: `chmod +x ./hook.sh`
- Use absolute paths or `$CLAUDE_PROJECT_DIR`

**JSON validation failed:**
- Check shell profile for unconditional echo statements
- Wrap echo in `if [[ $- == *i* ]]; then ... fi`

**Toggle verbose mode** with `Ctrl+O` to see hook output in transcript.

---

## Quick Reference

### Create a Skill

```bash
mkdir -p .claude/skills/my-skill
cat > .claude/skills/my-skill/SKILL.md << 'EOF'
---
name: my-skill
description: What it does and when to use it
---

Instructions here...
EOF
```

### Create a Hook

Add to `.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUse": [{
      "matcher": "Edit",
      "hooks": [{
        "type": "command",
        "command": "echo 'File edited'"
      }]
    }]
  }
}
```

### Test a Hook Script

```bash
echo '{"tool_name":"Edit","tool_input":{"file_path":"test.js"}}' | ./my-hook.sh
echo "Exit code: $?"
```
