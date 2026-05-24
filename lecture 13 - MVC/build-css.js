const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const fileList = fs.readdirSync(dir);
  for (const file of fileList) {
    const name = path.join(dir, file);
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files);
    } else {
      if (name.endsWith('.ejs') || name.endsWith('.html')) {
        files.push(name);
      }
    }
  }
  return files;
}

try {
  const viewsDir = path.join(__dirname, 'views');
  const allFiles = getFiles(viewsDir);
  
  let combinedContent = '';
  for (const file of allFiles) {
    combinedContent += fs.readFileSync(file, 'utf8') + '\n';
  }
  
  const tempFilePath = path.join(__dirname, 'temp_content.html');
  fs.writeFileSync(tempFilePath, combinedContent, 'utf8');
  console.log(`Created temporary content file with ${allFiles.length} files merged.`);
  
  console.log('Compiling Tailwind CSS...');
  execSync(`npx tailwindcss -i ./views/input.css -o ./public/output.css --content ./temp_content.html`, { stdio: 'inherit' });
  
  if (fs.existsSync(tempFilePath)) {
    fs.unlinkSync(tempFilePath);
  }
  console.log('Tailwind CSS successfully compiled! Cleaned up temp files.');
} catch (error) {
  console.error('Error during CSS compilation:', error);
}
