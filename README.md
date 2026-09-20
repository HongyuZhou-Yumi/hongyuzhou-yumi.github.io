# Hongyu Zhou — Academic Homepage

A minimal, GitHub Pages-ready academic homepage with:
- short biography / research interests / email
- publications grouped by year
- left-side autoplaying demo video + right-side paper metadata
- responsive mobile layout
- no npm, no Jekyll, no build step

## 1. Edit your personal information

Open `site-data.js`.

The first block contains:
- name
- role / affiliations
- email
- research interests
- two bio paragraphs

The email is intentionally left as `your.email@example.com`.

## 2. Add your profile photo

Add:

`assets/profile.jpg`

If it is missing, the page shows the HZ initials placeholder.

## 3. Add paper demo videos

Put MP4s inside `assets/videos/` using the exact filenames listed in
`assets/videos/README.txt`.

The browser will silently autoplay + loop them. If an MP4 is absent,
the matching SVG poster remains visible.

## 4. Edit publications

All paper metadata is in `site-data.js`.
You can reorder entries or edit titles/authors/venues/links there.

## 5. Preview locally

The simplest method is to open `index.html`.

For a proper local web server:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## 6. Publish with GitHub Pages

Create a repository named:

`YOUR-GITHUB-USERNAME.github.io`

Upload every file/folder from this package to the repository root,
then enable GitHub Pages for the main branch if it is not enabled automatically.

No build configuration is required.

## Metadata notes

Paper metadata was checked against public sources including ACM/DOI pages,
DBLP, arXiv, UCL Discovery, ASP-DAC program pages, institutional publication
pages, and author/project pages in September 2026.

Items still worth manually checking before final publication:
- your preferred current email
- exact wording of the RCA / Imperial master's degree
- exact wording of Tokyo / Oxford visits
- official repository/URL for the PhD thesis
- final DOI/details for Armonii if/when assigned
