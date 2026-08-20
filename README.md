# Portfolio

My personal site. Plain HTML, CSS and JavaScript modules, no framework and no build step.

## Running it

ES modules don't work from `file://`, so it needs a server:

```bash
python -m http.server 8000
```

Then go to http://localhost:8000.

## Structure

```
index.html
css/     tokens.css (colours, type, spacing), base.css, components.css
js/
  data/        site.js, projects.js, skills.js   <- content lives here
  components/  one file per section
  main.js
```

Content is kept in `js/data/` and rendered from there, so adding a project means
adding an object to the `projects` array instead of writing new HTML.

## Notes to self

- Theme toggle saves to localStorage, defaults to the OS setting.
- Set `photo` in `site.js` to show a picture in the hero. Square image, 520px or bigger.
- Set any link in `site.links` to `null` to hide it.
- Diagram node `tone` values: source, engine, bronze, silver, gold, violet, green, amber, sink.

## Todo

- [ ] Check the TrafficDataWarehouse repo is public, otherwise that link 404s
- [ ] Add repo link for the genome alignment project
- [ ] Add CV pdf to assets/ and set `links.resume`
- [ ] Set `og:url` in index.html once it's deployed
