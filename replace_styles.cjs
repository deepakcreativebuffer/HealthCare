const fs = require('fs');
const path = require('path');

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  const origContent = content;

  content = content.replace(/slate-/g, 'gray-');
  content = content.replace(/text-\[\#009bf2\]/g, 'text-action-blue');
  content = content.replace(/bg-\[\#009bf2\]/g, 'bg-blue-600');
  content = content.replace(/hover:bg-\[\#0089d8\]/g, 'hover:bg-blue-700');
  content = content.replace(/border-\[\#009bf2\]/g, 'border-action-blue');
  content = content.replace(/focus:border-\[\#009bf2\]/g, 'focus:border-blue-500');
  content = content.replace(/focus:ring-\[\#009bf2\]/g, 'focus:ring-blue-500');
  content = content.replace(/ring-\[\#009bf2\]/g, 'ring-blue-500');

  content = content.replace(/font-extrabold/g, 'font-bold');
  content = content.replace(/font-black/g, 'font-bold');
  
  content = content.replace(/ tracking-tight/g, '');
  content = content.replace(/ tracking-tighter/g, '');
  content = content.replace(/ tracking-widest/g, '');
  content = content.replace(/ tracking-wider/g, '');
  content = content.replace(/ uppercase/g, '');

  content = content.replace(/bg-white text-\[(\d+)px\]/g, 'bg-gray-50/50 text-[$1px]');
  
  const inputStyleRegex = /placeholder:font-bold focus:outline-none focus:border-\S+ focus:ring-1 focus:ring-\S+ transition-all/g;
  content = content.replace(inputStyleRegex, 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 ring-offset-white');

  if (content !== origContent) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`Updated ${filepath}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      processDirectory(filepath);
    } else if (filepath.endsWith('.jsx')) {
      processFile(filepath);
    }
  }
}

const targetDir = path.join(__dirname, 'src', 'components');
processDirectory(targetDir);
