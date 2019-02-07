// loosely based on https://github.com/sindresorhus/strip-indent
export function dedent(str) {
  // remove preceding newline and trailing newline followed by whitespace
  const trimmedStr = str.replace(/^\n/, '').replace(/\n\s*$/, '');

  // match whitespace in beginning of each line
  const matches = trimmedStr.match(/^[ \t]*(?=\S)/gm);

  // nothing to do?
  if (!matches) return trimmedStr;

  // get minimum indentation level
  const indent = Math.min(...matches.map(match => match.length));

  // no indentation that needs to be removed?
  if (!indent) return trimmedStr;

  // remove indentation
  return trimmedStr.replace(new RegExp(`^[ \\t]{${indent}}`, 'gm'), '');
}
