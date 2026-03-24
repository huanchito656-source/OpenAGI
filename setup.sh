#!/bin/bash
set -e

REPO="huanchito656-source/OpenAGI"
BRANCH="main"
BASE="https://raw.githubusercontent.com/$REPO/$BRANCH"
DIR=".openagi"

# Create .openagi directory
mkdir -p "$DIR/seeds"

# Download framework files
echo "Downloading OpenAGI..."
curl -sf "$BASE/loop.md" -o "$DIR/loop.md"
curl -sf "$BASE/seeds/manifest.md" -o "$DIR/seeds/manifest.md"
curl -sf "$BASE/seeds/universal.md" -o "$DIR/seeds/universal.md"
curl -sf "$BASE/seeds/coding.md" -o "$DIR/seeds/coding.md"
curl -sf "$BASE/seeds/research.md" -o "$DIR/seeds/research.md"

echo "OpenAGI installed to $DIR/"
echo ""

# Detect agent and show the right instruction
if [ -f "CLAUDE.md" ]; then
  AGENT="claude"
elif [ -d ".cursor" ]; then
  AGENT="cursor"
elif [ -f ".clinerules" ]; then
  AGENT="cline"
fi

INSTRUCTION='# OpenAGI — Cognitive Framework

Read and follow .openagi/loop.md. Load seeds at task start. Read understanding.md and process.md if they exist.

Think in falsifiable beliefs. When you state something as fact, ask: did I verify this or am I assuming it? At choice points — when uncertain, when stakes are high, when novel, when a seed flags a blind spot — state the belief, predict, act, compare to ground truth, revise if wrong. Between choice points, act naturally.

Persist your model in understanding.md (update when beliefs change). Accumulate reasoning lessons in process.md. Seeds in .openagi/seeds/ are mandatory starting assumptions — load them.'

# Check if the instruction is already present in a file
already_configured() {
  grep -qF ".openagi/loop.md" "$1" 2>/dev/null
}

# Configure Claude Code permissions for model files
configure_claude_permissions() {
  local SETTINGS=".claude/settings.json"
  mkdir -p .claude

  if [ -f "$SETTINGS" ]; then
    if command -v jq &>/dev/null; then
      local PERMS='["Edit(understanding.md)","Write(understanding.md)","Edit(process.md)","Write(process.md)"]'
      jq --argjson new "$PERMS" '.permissions.allow = ((.permissions.allow // []) + $new | unique)' "$SETTINGS" > "$SETTINGS.tmp" && mv "$SETTINGS.tmp" "$SETTINGS"
    else
      echo "  Note: Install jq to auto-merge permissions. Manually add model file permissions to $SETTINGS."
      return
    fi
  else
    cat > "$SETTINGS" << 'SETTINGS_EOF'
{
  "permissions": {
    "allow": [
      "Edit(understanding.md)",
      "Write(understanding.md)",
      "Edit(process.md)",
      "Write(process.md)"
    ]
  }
}
SETTINGS_EOF
  fi
  echo "  Configured auto-permissions for model files."
}

case "$AGENT" in
  claude)
    if already_configured "CLAUDE.md"; then
      echo "Claude Code already configured."
    else
      printf '\n%s\n' "$INSTRUCTION" >> CLAUDE.md
      echo "Added OpenAGI to CLAUDE.md."
    fi
    configure_claude_permissions
    ;;
  cursor)
    mkdir -p .cursor/rules
    if already_configured ".cursor/rules/openagi.md"; then
      echo "Cursor already configured."
    else
      printf '%s\n' "$INSTRUCTION" > .cursor/rules/openagi.md
      echo "Added OpenAGI to .cursor/rules/openagi.md."
    fi
    ;;
  cline)
    if already_configured ".clinerules"; then
      echo "Cline already configured."
    else
      printf '\n%s\n' "$INSTRUCTION" >> .clinerules
      echo "Added OpenAGI to .clinerules."
    fi
    ;;
  *)
    echo "No agent config detected. Add this to your agent's config (CLAUDE.md, .cursor/rules/, .clinerules, or system prompt):"
    echo ""
    echo "  $INSTRUCTION"
    ;;
esac

echo ""
echo "Done."
