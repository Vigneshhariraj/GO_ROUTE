const fs = require('fs');
const path = require('path');

const axiosNeeded = [];
const axiosNotNeeded = {
  'Static UI files (No fetch/useEffect/async)': [],
  'Already using axios': [],
  'Minimal logic / static display': []
};

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  const usesAxios = content.includes('axios');
  const usesFetch = content.includes('fetch(');
  const usesUseEffect = content.includes('useEffect(');
  const usesAsync = content.includes('async function') || content.includes('async (');
  const usesDataKeywords = content.match(/fetchData|getData|loadData|retrieve|api/i);
  const manyStates = (content.match(/useState\(/g) || []).length > 3;

  if (usesAxios) {
    axiosNotNeeded['Already using axios'].push(filePath);
  } else if (usesFetch || usesUseEffect || usesAsync || usesDataKeywords || manyStates) {
    axiosNeeded.push({
      file: filePath,
      reasons: [
        usesFetch ? "uses fetch()" : "",
        usesUseEffect ? "uses useEffect()" : "",
        usesAsync ? "uses async function" : "",
        usesDataKeywords ? "has fetch/get/load keywords" : "",
        manyStates ? "many useState()" : ""
      ].filter(Boolean)
    });
  } else {
    axiosNotNeeded['Static UI files (No fetch/useEffect/async)'].push(filePath);
  }
}

function findTsxFiles(folder) {
  const files = fs.readdirSync(folder);

  for (const file of files) {
    const fullPath = path.join(folder, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      findTsxFiles(fullPath);
    } else if (file.endsWith('.tsx')) {
      analyzeFile(fullPath);
    }
  }
}


const targetFolder = './src';
findTsxFiles(targetFolder);

console.log('\n=== Files that MIGHT need axios integration ===\n');
axiosNeeded.forEach(({ file, reasons }) => {
  console.log(`${file}`);
  console.log(`    Reasons: ${reasons.join(', ')}`);
});

console.log('\n=== Files that PROBABLY DO NOT need axios ===\n');

Object.entries(axiosNotNeeded).forEach(([reasonGroup, files]) => {
  if (files.length > 0) {
    console.log(`> ${reasonGroup}:`);
    files.forEach((file) => console.log(`  - ${file}`));
    console.log('');
  }
});
