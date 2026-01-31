#!/usr/bin/env node
/**
 * Hook: check-wave-complete.js
 * Purpose: Check if current wave is complete after RFC status updates
 * Trigger: PostToolUse on Edit to WAVE-STATUS.md
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

    // Only check when WAVE-STATUS.md is edited
    if (filePath && filePath.includes('WAVE-STATUS.md')) {
      checkWaveCompletion(filePath);
    }
  } catch (err) {
    process.exit(0);
  }
});

function checkWaveCompletion(waveStatusPath) {
  try {
    const content = fs.readFileSync(waveStatusPath, 'utf8');

    // Look for current wave status
    const currentWaveMatch = content.match(/Current Wave.*?Wave (\d+)/i);
    if (!currentWaveMatch) return;

    const currentWave = currentWaveMatch[1];

    // Count RFCs in current wave
    const waveSection = content.match(new RegExp(`Wave ${currentWave}[\\s\\S]*?(?=Wave \\d|## |$)`, 'i'));
    if (!waveSection) return;

    const sectionContent = waveSection[0];

    // Count completed vs total in this wave's table
    const rows = sectionContent.match(/\| RFC-\d+/g) || [];
    const completedRows = sectionContent.match(/✅ completed/g) || [];

    const total = rows.length;
    const completed = completedRows.length;

    if (total > 0 && completed === total) {
      // Wave is complete - output notification
      console.log(`Wave ${currentWave} COMPLETE: All ${total} RFCs finished.`);
      console.log(`Ready for next wave: /start-sprint-wave [sprint] ${parseInt(currentWave) + 1}`);
    }
  } catch (err) {
    // Silent fail
  }
}
