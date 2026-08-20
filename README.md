# Portfolio

My personal site, showing projects across data engineering, machine learning and
backend development.

Plain HTML, CSS and JavaScript modules. No framework and no build step, so it
runs anywhere a static file server does.

## Running it

ES modules don't load from `file://`, so it needs a server:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Structure

```
index.html
css/     tokens.css (colours, type, spacing), base.css, components.css
js/
  data/        site.js, projects.js, skills.js   <- content lives here
  components/  one file per section
  main.js
```

The content is data, not markup. Projects, skills and personal details live in
`js/data/`, and the components render from those, so adding a project means
adding an object to the `projects` array rather than writing new HTML.

## Configuration

- `site.js` holds my details and links. Any link set to `null` is hidden.
- Set `photo` in `site.js` to show a picture in the hero. Square, 520px or bigger.
- The theme toggle saves to localStorage and defaults to the OS setting.
- Diagram node colours come from the `tone` on each flow step: source, engine,
  bronze, silver, gold, violet, green, amber, sink.
