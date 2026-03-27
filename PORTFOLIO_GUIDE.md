# Portfolio Website - Customization Guide

This is a static portfolio website converted from Base44. All data is now hardcoded in the components - no backend required!

## Getting Started

```bash
npm install
npm run dev
```

The site will run on **http://localhost:5173**

## Customizing Your Portfolio

### 1. Personal Information & Images

**File:** `src/components/HeroSection.jsx`

Update these constants:
```javascript
const PROFILE_IMG = "your-profile-image-url";
const HERO_BG = "your-background-image-url";
```

Update the text:
- Title: "Research Student" 
- Heading: "Exploring the Frontiers of Knowledge"
- Bio paragraph
- Location and status badges

### 2. About Section & Certifications

**File:** `src/components/AboutSection.jsx`

Edit the `certifications` array:
```javascript
const certifications = [
  {
    title: "Your Certification",
    issuer: "Issuing Organization",
    year: "2024",
  },
  // Add more...
];
```

### 3. Skills

**File:** `src/components/SkillsSection.jsx`

Update the `skills` object with your own skills in each category.

### 4. Work Experience

**File:** `src/components/ExperienceSection.jsx`

Edit the `experiences` array:
```javascript
const experiences = [
  {
    type: "work", // or "research"
    title: "Job Title",
    organization: "Company Name",
    location: "Location",
    period: "Start — End",
    description: "What you did...",
    tags: ["Skill1", "Skill2"],
  },
];
```

### 5. Research Experience

**File:** `src/components/ResearchSection.jsx`

Update `RESEARCH_BG` image and the `experiences` array.

### 6. Projects

**File:** `src/components/ProjectsSection.jsx`

Edit the `projects` array:
```javascript
const projects = [
  {
    title: "Project Name",
    description: "Project description...",
    tags: ["Tech1", "Tech2"],
    github: "https://github.com/...",
    demo: "https://...",
    stars: 0,
    forks: 0,
  },
];
```

### 7. Publications

**File:** `src/components/PublicationsSection.jsx`

Update the `publications` array with your papers.

### 8. Contact Information

**File:** `src/components/ContactSection.jsx`

Edit the `socials` array:
```javascript
const socials = [
  {
    icon: Mail,
    label: "Email",
    value: "your.email@example.com",
    href: "mailto:your.email@example.com",
  },
  // Update LinkedIn and GitHub...
];
```

**Note:** The contact form currently just shows a success toast. To make it functional, you can:
- Use a service like [Formspree](https://formspree.io/)
- Use [EmailJS](https://www.emailjs.com/)
- Set up your own backend endpoint

## Using Your Own Images

### Option 1: Use External URLs
Just paste the URL directly in the component (like the current setup).

### Option 2: Use Local Images
1. Create a `public/images` folder
2. Add your images there
3. Reference them as `/images/your-image.jpg`

Example:
```javascript
const PROFILE_IMG = "/images/profile.jpg";
```

## Building for Production

```bash
npm run build
```

This creates a `dist` folder with your static site. You can deploy it to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Deploy!

### Netlify
1. Run `npm run build`
2. Drag the `dist` folder to [netlify.com/drop](https://app.netlify.com/drop)

### GitHub Pages
1. Install: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "vite build && gh-pages -d dist"`
3. Run: `npm run deploy`

## Tips

- All data is in the component files - search for arrays and constants to customize
- Images from the original Base44 site are still hosted externally - replace them with your own
- The site is fully responsive and animated with Framer Motion
- Colors and styling use Tailwind CSS - check `tailwind.config.js` to customize the theme
