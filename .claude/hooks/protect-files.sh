#!/bin/bash
# Hook: protect-files.sh
# Purpose: Block edits to protected files (implemented RFCs, etc.)
# Trigger: PreToolUse on Edit|Write

# Read JSON input from stdin
INPUT=$(cat)

# Extract file path
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0  # No file path, allow
fi

# Protected patterns
PROTECTED_PATTERNS=(
  ".arch/rfcs/implemented/"
  ".env"
  "credentials"
  "secrets"
)

# Check against protected patterns
for pattern in "${PROTECTED_PATTERNS[@]}"; do
  if [[ "$FILE_PATH" == *"$pattern"* ]]; then
    echo "BLOCKED: Cannot edit protected file matching '$pattern'" >&2
    echo "File: $FILE_PATH" >&2
    echo "" >&2
    echo "If this is intentional, manually edit the file or update hook configuration." >&2
    exit 2  # Exit 2 = block the action
  fi
done

# Allow the edit
exit 0
