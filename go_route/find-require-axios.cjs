const fs = require('fs');
const path = require('path');

const tsxFilesWithRequireAxios = [];

function findTsxFiles(folder) {
  const files = fs.readdirSync(folder);

  for (const file of files) {
    const fullPath = path.join(folder, file);
    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      findTsxFiles(fullPath);
    } else if (file.endsWith('.tsx')) {
      const content = fs.readFileSync(fullPath, 'utf8');

      // Only check for require('axios') or require("axios")
      const hasRequireAxios = content.includes(`require('axios')`) || content.includes(`require("axios")`);

      if (hasRequireAxios) {
        tsxFilesWithRequireAxios.push(fullPath);
      }
    }
  }
}

// 👇 Set your src folder here
const targetFolder = './src';

findTsxFiles(targetFolder);

if (tsxFilesWithRequireAxios.length === 0) {
  console.log('No TSX files require axios.');
} else {
  console.log('--- Files that REQUIRE axios ---');
  tsxFilesWithRequireAxios.forEach((file) => console.log(file));
}
