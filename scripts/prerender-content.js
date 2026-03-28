/**
 * Prerender Content Injector
 * 
 * This script injects static content into the HTML shell for better SEO.
 * While not true SSR, it provides search engines with indexable content.
 * 
 * Run after build: node scripts/prerender-content.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Content to inject for different pages
const pageContent = {
  '/': `
    <div style="display:none" id="seo-content">
      <h1>Chaipat Jainan - CS Student & Applied LLM Engineer</h1>
      <p>Final-year Computer Science student at Chiang Mai University with research and industry experience in LLM systems, RAG pipelines, and backend engineering.</p>
      
      <h2>Experience</h2>
      <article>
        <h3>DevOps Engineer (Contract) - Chiang Mai University</h3>
        <p>Built AGS (Automated Grading System) using Flask, AWS (ECS, Aurora, S3), Docker, and GPT-3.5. Reduced grading turnaround time by 80% while serving 80+ students.</p>
      </article>
      
      <article>
        <h3>Research Assistant - JAIST×CMU Joint Research</h3>
        <p>Developed KG-augmented RAG pipeline for automated test scenario generation. Achieved 68% improvement over state-of-the-art with 100% accuracy through domain constraints.</p>
      </article>
      
      <article>
        <h3>Teaching Assistant - Chiang Mai University</h3>
        <p>Mentored 250+ students across multiple Computer Science courses over 3+ years.</p>
      </article>
      
      <h2>Skills</h2>
      <ul>
        <li>Languages: Python, JavaScript, TypeScript, SQL, Bash</li>
        <li>Backend: Flask, FastAPI, SQLAlchemy, REST APIs</li>
        <li>AI/ML: LLMs, RAG Pipelines, Prompt Engineering, Knowledge Graphs</li>
        <li>DevOps: Docker, AWS, CI/CD, GitHub Actions</li>
      </ul>
      
      <h2>Projects</h2>
      <article>
        <h3>AGS - Automated Grading System</h3>
        <p>Production LLM application using GPT-3.5 with structured prompt engineering and token-budget controls.</p>
      </article>
      
      <article>
        <h3>Ontology-Augmented Thai Public Health Service Recommendation System</h3>
        <p>Knowledge graph with 85 classes, 411 individuals, 38 SWRL rules, and 40 SPARQL queries.</p>
      </article>
      
      <h2>Publications</h2>
      <article>
        <h3>KG-Augmented RAG Pipeline for Automated Test Scenario Generation</h3>
        <p>JAIST×CMU Joint Research - 68% improvement over state-of-the-art in information extraction accuracy.</p>
      </article>
      
      <h2>Contact</h2>
      <p>Email: contact@chaipat.cc</p>
      <p>GitHub: github.com/AppleBoiy</p>
      <p>LinkedIn: linkedin.com/in/chaipat-jainan</p>
    </div>
  `,
  
  '/projects': `
    <div style="display:none" id="seo-content">
      <h1>Projects - Chaipat Jainan</h1>
      <p>Browse my portfolio of projects including web applications, AI/ML systems, and DevOps tools.</p>
      
      <article>
        <h2>AGS - Automated Grading System</h2>
        <p>Production LLM Application for Educational Assessment</p>
        <p>Built a production LLM application using GPT-3.5 with structured prompt engineering and token-budget controls, reducing turnaround time by 80% (5 days → 1 day) while managing inference cost at scale for 80+ students.</p>
        <p>Technologies: Flask, AWS (ECS, Aurora, S3), Docker, GPT-3.5, SQLAlchemy, CI/CD</p>
        <a href="/projects/ags">View Project Details</a>
      </article>
      
      <article>
        <h2>Eza Alias Configuration</h2>
        <p>Modern Terminal File Navigation Enhancement</p>
        <p>Popular Gist providing a comprehensive alias setup for eza (modern ls replacement). Used by developers worldwide with 62+ stars.</p>
        <p>Technologies: Shell, CLI, Bash, Zsh</p>
        <a href="/projects/eza-alias">View Project Details</a>
      </article>
    </div>
  `,
  
  '/contact': `
    <div style="display:none" id="seo-content">
      <h1>Contact - Chaipat Jainan</h1>
      <p>Get in touch with Chaipat Jainan for collaboration opportunities, questions, or just to connect.</p>
      
      <h2>Contact Information</h2>
      <p>Email: contact@chaipat.cc</p>
      <p>GitHub: github.com/AppleBoiy</p>
      <p>LinkedIn: linkedin.com/in/chaipat-jainan</p>
      
      <h2>Available For</h2>
      <ul>
        <li>LLM Engineering Projects</li>
        <li>Backend Development</li>
        <li>DevOps Consulting</li>
        <li>Research Collaboration</li>
      </ul>
    </div>
  `
};

function injectContent(htmlPath, content) {
  try {
    let html = fs.readFileSync(htmlPath, 'utf-8');
    
    // Inject content right after opening body tag
    html = html.replace(
      '<div id="root"></div>',
      `<div id="root"></div>${content}`
    );
    
    fs.writeFileSync(htmlPath, html, 'utf-8');
    console.log(`✓ Injected SEO content into ${htmlPath}`);
  } catch (error) {
    console.error(`✗ Failed to inject content into ${htmlPath}:`, error.message);
  }
}

function main() {
  const distPath = path.join(__dirname, '..', 'dist');
  
  if (!fs.existsSync(distPath)) {
    console.error('✗ dist/ directory not found. Run `npm run build` first.');
    process.exit(1);
  }
  
  console.log('Starting SEO content injection...\n');
  
  // Inject content for main pages
  Object.entries(pageContent).forEach(([route, content]) => {
    const htmlPath = route === '/' 
      ? path.join(distPath, 'index.html')
      : path.join(distPath, route.slice(1), 'index.html');
    
    if (fs.existsSync(htmlPath)) {
      injectContent(htmlPath, content);
    } else {
      console.log(`⚠ Skipping ${route} - file not found at ${htmlPath}`);
    }
  });
  
  console.log('\n✓ SEO content injection complete!');
  console.log('\nNote: This is a temporary solution. Consider migrating to Next.js for true SSR/SSG.');
}

main();
