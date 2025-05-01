const fs = require('fs');
const path = require('path');

const tsxFilesWithAxios = [];
const tsxFilesWithoutAxios = [];

function findTsxFiles(folder) {
  const files = fs.readdirSync(folder);

  for (const file of files) {
    const fullPath = path.join(folder, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      findTsxFiles(fullPath);
    } else if (file.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('axios')) {
        tsxFilesWithAxios.push(fullPath);
      } else {
        tsxFilesWithoutAxios.push(fullPath);
      }
    }
  }
}

// 👇 Set your src folder here
const targetFolder = './src';

findTsxFiles(targetFolder);

console.log('--- Files that USE axios ---');
tsxFilesWithAxios.forEach((file) => console.log(file));

console.log('\n--- Files that DO NOT use axios ---');
tsxFilesWithoutAxios.forEach((file) => console.log(file));
