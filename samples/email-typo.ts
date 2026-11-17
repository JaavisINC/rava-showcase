// SAMPLE FROM RAVA (portfolio excerpt)
// What it shows: a small, self-contained helper that catches common typos in an
// email address at sign-up (for example a misspelled provider or ".con"), so a
// verification code is not sent to an address that can never receive it.
// How it was made: written by Claude (Anthropic's AI) under Jackson Davis's
// direction. Jackson specified the behaviour; he did not hand-write this code.
//
// Returns the corrected address, or null if nothing looks wrong.

const DOMAIN_FIXES: Record<string, string> = {
  'gmial.com': 'gmail.com',
  'gmai.com': 'gmail.com',
  'gamil.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'gmaill.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.cm': 'gmail.com',
  'gmail.om': 'gmail.com',
  'yahooo.com': 'yahoo.com',
  'yaho.com': 'yahoo.com',
  'yahoo.co': 'yahoo.com',
  'hotmial.com': 'hotmail.com',
  'hotmai.com': 'hotmail.com',
  'hotmail.co': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'outlook.co': 'outlook.com',
  'iclod.com': 'icloud.com',
  'icloud.co': 'icloud.com',
  'icoud.com': 'icloud.com',
};

const TLD_FIXES: Record<string, string> = {
  con: 'com',
  cmo: 'com',
  ocm: 'com',
  comm: 'com',
  vom: 'com',
  xom: 'com',
};

export function suggestEmailFix(email: string): string | null {
  const trimmed = email.trim();
  const at = trimmed.lastIndexOf('@');
  if (at < 1 || at === trimmed.length - 1) return null;
  const local = trimmed.slice(0, at);
  const domain = trimmed.slice(at + 1).toLowerCase();

  if (DOMAIN_FIXES[domain]) return `${local}@${DOMAIN_FIXES[domain]}`;

  const dot = domain.lastIndexOf('.');
  if (dot > 0) {
    const tld = domain.slice(dot + 1);
    if (TLD_FIXES[tld]) {
      const fixed = `${domain.slice(0, dot)}.${TLD_FIXES[tld]}`;
      return `${local}@${DOMAIN_FIXES[fixed] ?? fixed}`;
    }
  }
  return null;
}
