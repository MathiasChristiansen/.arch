#!/usr/bin/env node
/**
 * Hook: update-wave-status.js
 * Purpose: Updates WAVE-STATUS.md timestamp when files are edited
 * Trigger: PostToolUse on Edit|Write
 */

const fs = require('fs');
const path = require('path');

// Read hook input from stdin
let input = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => input += chunk);
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const filePath = data.tool_input?.file_path || data.tool_input?.path;
    const sessionId = data.session_id;

    // Only track edits to source files, not .arch files
    if (filePath && !filePath.includes('.arch/')) {
      updateWaveStatus(filePath, sessionId);
    }
  } catch (err) {
    // Silent fail - don't disrupt workflow
    process.exit(0);
  }
});

function updateWaveStatus(editedFile, sessionId) {
  const waveStatusPath = findWaveStatus();
  if (!waveStatusPath) return;

  try {
    const now = new Date().toISOString().replace('T', ' ').slice(0, 16);
    let content = fs.readFileSync(waveStatusPath, 'utf8');

    // Update "Last Updated" timestamp
    const shortSession = sessionId ? sessionId.slice(0, 8) : 'unknown';
    content = content.replace(
      /\*\*Last Updated\*\*: .*/,
      `**Last Updated**: ${now} by session ${shortSession}`
    );

    fs.writeFileSync(waveStatusPath, content);
  } catch (err) {
    // Silent fail
  }
}

function findWaveStatus() {
  const cwd = process.cwd();
  const archDir = path.join(cwd, '.arch', 'sprints');

  if (!fs.existsSync(archDir)) return null;

  try {
    const dirs = fs.readdirSync(archDir)
      .filter(d => d.startsWith('sprint-') && fs.statSync(path.join(archDir, d)).isDirectory())
      .sort();

    if (dirs.length === 0) return null;

    const latestSprint = dirs[dirs.length - 1];
    const waveStatus = path.join(archDir, latestSprint, 'WAVE-STATUS.md');

    return fs.existsSync(waveStatus) ? waveStatus : null;
  } catch (err) {
    return null;
  }
}
