/* ============================================================
   CASES — single source of truth for case metadata
   ------------------------------------------------------------
   This is the ONE place to edit a case's number, title, category
   and summary. Both the homepage work index AND each case page's
   hero read from here, so a change shows up in both.

   To add a project:
     1. Add an entry below (keep the array in display order).
     2. `id`   — must match the case page's caseId (see its logic).
        `href` — the case page file name (spaces URL-encoded).
     3. Duplicate "Case Template.dc.html", set its caseId to the
        new id, and fill in the body content.
   ============================================================ */
const CASES = [
  {
    id: 'global-payments',
    num: '01',
    href: 'global-payments.dc.html',
    cat: 'Fintech · GCash',
    title: 'GCash Global',
    accent: '#4F63E3',
    thumb: '../images/ab-gp-thumb.webp',
    summary: 'Redesigned the GCash Global Payments experience, driving overseas usage from 5% to 80%+'
  },
  {
    id: 'hybrid-credit-debit-card',
    num: '02',
    href: 'hybrid-credit-debit-card.dc.html',
    cat: 'Fintech · GCash',
    title: 'Hybrid Credit-Debit Card',
    accent: '#F2643C',
    thumb: '../images/ab-card-thumb.webp',
    summary: 'The first of its kind in the Philippines. One card. Two payment methods. No bank account needed'
  },
  {
    id: 'podd',
    num: '03',
    href: 'podd.dc.html',
    cat: 'Innovation Lab · Team project',
    title: 'PODD',
    accent: '#C98A2E',
    thumb: '../images/ab-podd-thumb.webp',
    summary: 'A network of private, bookable focus pods for remote workers — 2nd place at the Innovation Lab final pitch'
  }
];

function getCase(id) {
  for (var i = 0; i < CASES.length; i++) if (CASES[i].id === id) return CASES[i];
  return null;
}

export { CASES, getCase };
