import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const guidesDir = path.join(__dirname, '../src/pages/guides');

function calculateReadingTime(content) {
  // Strip frontmatter / imports / tags to get clean word count
  const text = content
    .replace(/---[\s\S]*?---/g, '') // remove frontmatter
    .replace(/<script[\s\S]*?<\/script>/g, '') // remove script tags
    .replace(/<style[\s\S]*?<\/style>/g, '') // remove style tags
    .replace(/<\/?[a-z][a-z0-9]*[^<>]*>/gi, ' ') // remove HTML/JSX tags
    .replace(/\s+/g, ' ')
    .trim();
  
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.round(wordCount / 220)); // ~220 words per minute
}

fs.readdirSync(guidesDir).forEach(file => {
  if (file === 'index.astro' || !file.endsWith('.astro')) return;

  const filePath = path.join(guidesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  const readingTime = calculateReadingTime(content);

  // If reading time is already present, update it
  if (content.includes('min read')) {
    content = content.replace(/<span>\d+\s+min\s+read<\/span>/g, `<span>${readingTime} min read</span>`);
  } else {
    // Inject it next to the updated date
    const updatedRegex = /<span>Updated:\s*([A-Za-z0-9,\s]+)<\/span>/;
    if (updatedRegex.test(content)) {
      content = content.replace(updatedRegex, (match, p1) => {
        return `<span>Updated: ${p1.trim()}</span>\n          <span style="margin: 0 0.5rem; opacity: 0.5;">•</span>\n          <span>${readingTime} min read</span>`;
      });
    }
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated reading time for ${file}: ${readingTime} min read`);
});
