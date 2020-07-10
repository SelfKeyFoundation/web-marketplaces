import sanitizeHtml from 'sanitize-html';

// Allow only a super restricted set of tags and attributes for html raw data
// coming from FT Airtable
const sanitize = html => {
  if (!html) return '';

  return sanitizeHtml(html, {
    allowedTags: ['b', 'i', 'em', 'strong', 'a', 'div', 'ul', 'li', 'ol', 'p', 'hr', 'br'],
    allowedAttributes: {
      a: ['href', 'target']
    }
  });
};

export { sanitize };
