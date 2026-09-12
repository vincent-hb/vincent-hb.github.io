# vincent-hb.github.io

Personal research website of Dr. Vincent Hénault-Brunet — Associate Professor,
Department of Astronomy & Physics, Saint Mary's University; Director of the
Burke-Gaffney Observatory.

Live at <https://vincent-hb.github.io>

## Structure

| Path | Purpose |
| --- | --- |
| `index.html` | About me — the landing page |
| `research.html` | Research programme, publications, recent highlights |
| `team.html`, `join.html`, `alumni.html` | The STRIDES group, openings, past members |
| `outreach.html`, `contact.html` | Observatory and media, contact details |
| `css/`, `sass/`, `fonts/`, `js/` | Template assets (Sass sources included) |
| `images/`, `videos/` | Figures, photos and clips used by the pages |
| `clusters2025/` | Standalone sub-site, served at `/clusters2025/` |
| `google7f031b37c4cd342d.html` | Google Search Console verification |
| `.nojekyll` | Tells GitHub Pages to serve files as-is, without Jekyll |

Every page carries its own copy of the sidebar and footer, so a change to the
navigation has to be repeated across all seven.

## Editing

It is a static site — no build step. Edit the page, commit, and push to `main`;
GitHub Pages redeploys within a minute or two.

Styles live in `css/style.css`, which is edited directly. The `sass/` sources
were kept in step early in the redesign (the sidebar move, the compacted
navigation) but are no longer the source of truth: the later work — the sidebar
sub-navigation, the figure floats, the highlight blocks, the team portraits, the
citation refs — exists only in the compiled CSS, so recompiling the Sass would
discard it. Those custom rules are gathered towards the end of `css/style.css`,
each behind a comment explaining what it is for. Breakpoint overrides are in
`css/style-{xlarge,large,medium,small,xsmall}.css`.

Full-resolution photo and figure originals are kept out of the repo (see
`.gitignore`); only the compressed derivatives the pages actually load are
committed.

## Credits

Built on the [Read Only](https://html5up.net/read-only) template by HTML5 UP,
used under the CCA 3.0 license (see `LICENSE.txt`).
