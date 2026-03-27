# Public Assets

This folder contains static assets that will be served directly.

## Adding Your CV

1. Place your CV file here as `cv.pdf`
2. The file will be accessible at `/cv.pdf` in your deployed site
3. The "Download CV" button in the Hero section will automatically download this file

## Adding Academic Documents

1. Create a `documents` folder inside `public/`
2. Place your academic papers/documents there
3. Example: `public/documents/ontology-phsrs.pdf`
4. Documents with `downloadable: true` in AcademicContributions.jsx will show a download button

## Current Structure

```
public/
├── cv.pdf                              # Your CV/Resume (add this file)
├── documents/                          # Academic documents folder
│   └── ontology-phsrs.pdf             # Ontology project document (add this file)
└── README.md                          # This file
```

## Note

- Keep file sizes under 5MB for faster downloads
- Use descriptive filenames (lowercase, hyphens instead of spaces)
- Recommended format: PDF
