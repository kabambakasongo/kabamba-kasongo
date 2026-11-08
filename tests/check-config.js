const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const index = read('index.html');
const htmlFiles = ['index.html', 'cv-fr.html', 'cv-en.html'];

const contactEmail = index.match(/data-contact-email="([^"]+)"/);
assert.ok(contactEmail, 'index.html must define data-contact-email');

const emails = new Set(
  htmlFiles.flatMap(
    (file) =>
      read(file)
        .replace(/\splaceholder="[^"]*"/g, '')
        .match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || []
  )
);
assert.deepEqual([...emails], [contactEmail[1]], 'Contact email addresses must stay consistent');

const githubUser = index.match(/data-github-user="([^"]+)"/);
assert.ok(githubUser, 'index.html must define data-github-user');

const githubReferences = htmlFiles.flatMap((file) =>
  [...read(file).matchAll(/https?:\/\/github\.com\/([A-Za-z0-9-]+)/g)].map((match) => match[1])
);
assert.ok(githubReferences.length > 0, 'Expected at least one GitHub profile link');
assert.ok(
  githubReferences.every((username) => username === githubUser[1]),
  'GitHub profile links must match data-github-user'
);

const canonical = index.match(/<link rel="canonical" href="([^"]+)"/);
assert.ok(canonical, 'index.html must define a canonical URL');
const canonicalUrl = new URL(canonical[1]);

const siteFiles = ['index.html', '404.html', 'robots.txt', 'sitemap.xml'];
const siteUrls = siteFiles.flatMap((file) =>
  [...read(file).matchAll(/https?:\/\/[^"'\s<]*/g)].map((match) => ({
    value: match[0],
    hostname: new URL(match[0]).hostname,
  }))
);
const isGitHubPages = canonicalUrl.hostname.endsWith('.github.io');
const sameSiteUrls = siteUrls.filter(
  (url) =>
    url.hostname === canonicalUrl.hostname ||
    (isGitHubPages && url.hostname.endsWith('.github.io'))
);
assert.ok(sameSiteUrls.length > 0, 'Expected URLs for the canonical site');
assert.ok(
  sameSiteUrls.every((url) => url.value.startsWith(canonical[1])),
  'Site URLs must use the canonical site base'
);

console.log('Public contact, GitHub profile, and site URLs are consistent.');
