# BoomHaus Website - Build System

A template-based build system for managing 28 HTML pages with separated CSS, templates, and data. Designed for easy maintenance and future CMS integration with Sanity.

## 📁 Project Structure

```
new-website-build/
├── /src/
│   ├── /templates/          # EJS page templates
│   │   ├── landing-page.ejs     (Homepage, About, Contact, etc.)
│   │   ├── product-page.ejs     (Pack detail pages)
│   │   ├── gallery-page.ejs     (Gallery pages)
│   │   └── utility-page.ejs     (404, Thank You, Privacy, etc.)
│   ├── /partials/           # Shared components (included in templates)
│   │   ├── nav.ejs              (Navigation)
│   │   ├── footer.ejs           (Footer)
│   │   └── popups.ejs           (All 4 contact form popups)
│   ├── /data/               # Content data (JSON)
│   │   ├── pages.json           (All 28 page metadata)
│   │   └── site-config.json     (Site-wide settings, Sanity fields)
│   └── build.js             # Build script (generates all 28 pages)
├── /public/                 # Generated HTML files (do not edit manually)
├── /styles/
│   └── main.css             # External CSS (all styles from 28 pages)
├── /assets/
│   └── /images/             # Symlink or copy from your existing assets
├── package.json             # Node.js dependencies
├── .gitignore               # Git configuration
└── README.md                # This file
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Build All Pages
```bash
npm run build
```

This generates all 28 HTML files in `/public/` based on:
- Templates in `/src/templates/`
- Partials in `/src/partials/`
- Data in `/src/data/pages.json`
- Styles in `/styles/main.css`

### 3. Deploy to Firebase
```bash
firebase deploy
```

## 📝 How to Use

### Adding/Editing a Page

1. **Update data** in `/src/data/pages.json`:
   ```json
   "my-page": {
     "filename": "my-page.html",
     "template": "landing-page.ejs",
     "title": "Page Title",
     "description": "Meta description",
     "slug": "/my-page"
   }
   ```

2. **Create/edit template** in `/src/templates/`:
   - Use the appropriate template type (landing, product, gallery, utility)
   - Reference page data with `<%= page.title %>`
   - Reference site config with `<%= site.name %>`

3. **Rebuild**:
   ```bash
   npm run build
   ```

4. **Deploy**:
   ```bash
   firebase deploy
   ```

### Editing Shared Components

If you change:
- **Navigation** → Edit `/src/partials/nav.ejs`
- **Footer** → Edit `/src/partials/footer.ejs`
- **Popups** → Edit `/src/partials/popups.ejs`
- **Styles** → Edit `/styles/main.css`

All 28 pages automatically update on the next `npm run build`.

## 🎨 Templates

### landing-page.ejs
For: Homepage, About, Hospitality, Residential, London Designer, Airbnb Host, Furniture Packs, Contact, Order, Superhost

**Data available:**
- `page.title` - Page title
- `page.description` - Meta description
- `page.slug` - Page URL slug
- `site.*` - Site config data

### product-page.ejs
For: The Blakethrough, The BTR, The Classic, The Lois, The Take Five

**Additional data:**
- `page.pack` - Pack name
- `page.packSlug` - Pack URL slug
- `page.heroImage` - Hero image path

### gallery-page.ejs
For: All pack gallery pages

**Data available:**
- `page.packSlug` - Which pack this gallery is for

### utility-page.ejs
For: 404, Thank You pages, Privacy Policy, Terms

**Simple structure** for basic content pages

## 💾 Data Files

### pages.json
Contains metadata for all 28 pages. Each page has:
- `filename` - Output HTML filename
- `template` - Which EJS template to use
- `title` - Page title (HTML `<title>`)
- `description` - Meta description
- `slug` - URL path
- `type` - Page type (landing, product, gallery, utility)

### site-config.json
Site-wide settings that are available in all templates:
- `site.name` - BoomHaus
- `site.domain` - https://boomhaus.design
- `site.email` - Contact email
- `site.branding` - Colors, fonts, logo
- `site.navigation` - Main nav links
- `site.footer` - Footer content
- `site.analytics` - GA4 ID
- `site.furniturePacks` - Pack data

**This structure is designed for easy migration to Sanity CMS** — each field maps to Sanity document types.

## 🌐 CSS Management

All CSS is in `/styles/main.css`. This is automatically linked in all templates:
```html
<link rel="stylesheet" href="/styles/main.css">
```

**To update styles:**
1. Edit `/styles/main.css`
2. Run `npm run build`
3. Deploy with `firebase deploy`

All 28 pages automatically use the updated CSS.

## 📦 Sanity CMS Migration (Future)

When you're ready to move content to Sanity:

1. The `pages.json` structure is already Sanity-compatible
2. The `site-config.json` maps to Sanity document fields
3. Replace the JSON file loading with Sanity API calls:

```javascript
// Current (in build.js):
const pagesData = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'pages.json')));

// Future (with Sanity):
const pagesData = await client.fetch(`*[_type == "page"]`);
```

4. No template changes needed — data format stays the same

## 🔧 Development Workflow

### Watch for Changes (Auto-rebuild)
```bash
npm run watch
```

This uses `nodemon` to automatically rebuild when you change files.

### Manual Build
```bash
npm run build
```

### Deploy to Firebase
```bash
firebase deploy
```

## 📋 Maintenance Checklist

- **Changing site name/email?** → Update `site-config.json`
- **Updating navigation?** → Update `site.navigation` in `site-config.json`
- **Adding a page?** → Add entry to `pages.json` + create template
- **Changing footer?** → Edit `/src/partials/footer.ejs`
- **Updating styles?** → Edit `/styles/main.css`

All changes rebuild across all 28 pages automatically.

## 🚨 Important Notes

- **Don't edit `/public/*.html` directly** — they're generated files
- **Always run `npm run build` after making changes** to templates or data
- **Main.css must be linked in all templates** — it's already included in the template placeholders
- **Assets folder should be symlinked or copied** from your existing assets directory

## 📞 Support

For issues or questions:
1. Check that Node.js is installed (`node --version`)
2. Verify npm packages are installed (`npm install`)
3. Run build and check for errors (`npm run build`)
4. Ensure all template files exist in `/src/templates/`
5. Verify data files are valid JSON

## 📄 License

MIT
