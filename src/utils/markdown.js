export const parseMarkdown = (rawMarkdown) => {
  const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
  const match = rawMarkdown.match(frontmatterRegex);
  
  if (match) {
    const frontmatterBlock = match[1];
    const content = rawMarkdown.replace(frontmatterRegex, '').trim();
    
    // Parse key-value pairs
    const meta = {};
    frontmatterBlock.split('\n').forEach(line => {
      const splitIdx = line.indexOf(':');
      if (splitIdx > 0) {
        const key = line.slice(0, splitIdx).trim();
        let value = line.slice(splitIdx + 1).trim();
        // Remove quotes if present
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        } else if (value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1);
        }
        meta[key] = value;
      }
    });
    
    return { meta, content };
  }
  
  return { meta: {}, content: rawMarkdown };
};
