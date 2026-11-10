# Changes to docs/api-specification.md (DWTSPI-520)

## 1. Remove this whole section

Delete from `## Recent and Upcoming Changes` down to, but not including, `## API Change Log`. That is the heading, the "Reporting hazardous and POPs concentrations as a threshold" subsection, its known issue and the link to the specification.

## 2. Add under `## API Change Log`

Add this line as the first line under the heading:

```md
Changes that have not reached production yet are on the [upcoming API changes](upcoming-changes.md) page.
```

## 3. mkdocs.yml

Add the page to `nav`, at the end of the API section (the same level as the API specification), so it appears in the left-hand navigation:

```yaml
- Upcoming API changes: upcoming-changes.md
```

If the CSS goes in its own file, also list it:

```yaml
extra_css:
  - assets/stylesheets/extra.css
  - assets/stylesheets/govuk-tags.css
```

## 4. New files

- `docs/upcoming-changes.md` (from `upcoming-changes.md`)
- CSS from `css-additions.css`

## 5. Check before merging

- Run `mkdocs serve` and check the new page, the left-hand navigation entry and the link from the API specification page.
- Check the tags show the words "Non-breaking" and "Breaking", not just colour.
- Check no horizontal scroll at 320px wide.
- Check there are no broken links (`mkdocs build --strict`).
- Check the "Page last updated" date is filled in.
- Copy the final wording of the "Known issue" fix date once confirmed.
