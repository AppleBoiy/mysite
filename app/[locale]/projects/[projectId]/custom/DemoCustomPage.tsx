'use client';

import { motion } from 'framer-motion';
import { Code2, Image as ImageIcon, Table as TableIcon, Calculator, Terminal, Sparkles, RotateCcw, Play, Copy, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { CustomProjectPageProps } from '../custom-pages';
import CustomPageLayout from './CustomPageLayout';
import { useState, useEffect } from 'react';

/**
 * Demo Custom Page - Showcasing Maximum Flexibility
 * 
 * This page demonstrates all the creative possibilities with custom pages:
 * - Standard layout (navbar, breadcrumbs, header, buttons) maintained
 * - Custom content area with full creative freedom
 * - Images positioned anywhere
 * - Math equations (LaTeX-style)
 * - Tables with custom styling
 * - Code blocks with syntax highlighting
 * - Terminal outputs
 * - Custom layouts and animations
 * - Mixed content types
 */
export default function DemoCustomPage({ locale, projectId }: CustomProjectPageProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Auto-collapse after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExpanded(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Define table of contents sections
  const tocSections = [
    { id: 'features', title: 'What You Can Do', level: 1 },
    { id: 'split-layout', title: 'Images in the Middle', level: 1 },
    { id: 'math-equations', title: 'Math Equations', level: 1 },
    { id: 'tables', title: 'Custom Tables', level: 1 },
    { id: 'code-terminal', title: 'Code & Terminal', level: 1 },
    { id: 'interactive-demo', title: 'Try It Yourself', level: 1 },
    { id: 'gallery', title: 'Responsive Gallery', level: 1 },
    { id: 'mixed-content', title: 'Mix Everything Together', level: 1 },

  ];

  return (
    <>
      {/* Floating Demo Badge - Bottom Right */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.div
          animate={{ 
            width: isExpanded ? "auto" : "48px",
            height: isExpanded ? "auto" : "48px"
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl shadow-2xl border-2 border-amber-400/50 overflow-hidden cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-4 pr-6"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0 backdrop-blur-sm">
                  <Sparkles className="text-white" size={20} />
                </div>
                <div className="min-w-[200px]">
                  <div className="font-bold text-white flex items-center gap-2 mb-1">
                    Demo Page
                    <span className="px-2 py-0.5 text-[10px] font-medium bg-white/20 text-white rounded-full border border-white/30">
                      Showcase
                    </span>
                  </div>
                  <p className="text-xs text-white/90 mb-3 leading-relaxed">
                    This page demonstrates custom page capabilities
                  </p>
                  <div className="flex gap-2">
                    <Link
                      href={`/${locale}/projects`}
                      className="px-3 py-1.5 text-xs font-medium bg-white/20 text-white border border-white/30 rounded-lg hover:bg-white/30 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      All Projects
                    </Link>
                    <a
                      href="https://github.com/AppleBoiy/mysite"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-medium bg-white text-amber-600 rounded-lg hover:bg-white/90 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Source
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-12 h-12 flex items-center justify-center"
            >
              <Sparkles className="text-white" size={24} />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
      
      <CustomPageLayout locale={locale} projectId={projectId} tocSections={tocSections}>
        {/* Custom content starts here - everything below is fully customizable */}
        
        {/* Feature Grid */}
        <section id="features" className="py-12 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-4xl font-bold text-center mb-12">
            What You Can Do
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: ImageIcon, title: 'Images Anywhere', color: 'text-blue-500' },
              { icon: Calculator, title: 'Math Equations', color: 'text-purple-500' },
              { icon: TableIcon, title: 'Custom Tables', color: 'text-green-500' },
              { icon: Code2, title: 'Code Blocks', color: 'text-orange-500' },
              { icon: Terminal, title: 'Terminal Output', color: 'text-cyan-500' },
              { icon: Sparkles, title: 'Animations', color: 'text-pink-500' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border hover:border-accent/50 transition-colors"
              >
                <feature.icon className={`${feature.color} mb-4`} size={32} />
                <h3 className="text-xl font-semibold">{feature.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Split Layout with Image */}
      <section id="split-layout" className="py-20 bg-muted/30 -mx-6 px-6 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-4xl font-bold mb-6">
                Images in the Middle
              </h2>
              <p className="text-muted-foreground mb-4">
                Place images anywhere in your layout. Create split-screen designs,
                floating images, or full-bleed backgrounds.
              </p>
              <p className="text-muted-foreground">
                Use Next.js Image component for automatic optimization, lazy loading,
                and responsive sizing. Perfect for showcasing screenshots, diagrams,
                or product photos.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative aspect-video rounded-xl overflow-hidden border border-border shadow-2xl"
            >
              <Image
                src="/demo/screenshot-desktop.svg"
                alt="Desktop screenshot"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Math Equations Section */}
      <section id="math-equations" className="py-20 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl font-bold mb-8 text-center">
              Math Equations
            </h2>
            
            <div className="bg-card border border-border rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">Quadratic Formula</h3>
              <div className="bg-muted/50 rounded-xl p-6 font-mono text-center text-lg">
                x = (-b ± √(b² - 4ac)) / 2a
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold mb-4">Euler's Identity</h3>
              <div className="bg-muted/50 rounded-xl p-6 font-mono text-center text-lg">
                e^(iπ) + 1 = 0
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Often cited as the most beautiful equation in mathematics, connecting
                five fundamental constants.
              </p>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <h3 className="text-xl font-semibold mb-4">Machine Learning Loss Function</h3>
              <div className="bg-muted/50 rounded-xl p-6 font-mono text-center text-lg">
                L(θ) = (1/n) Σ(y_i - ŷ_i)²
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Mean Squared Error (MSE) loss function commonly used in regression tasks.
              </p>
            </div>

            <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-xl">
              <p className="text-sm text-muted-foreground">
                <strong className="text-accent">Pro Tip:</strong> For advanced math rendering,
                integrate libraries like KaTeX or MathJax for LaTeX-style equations with proper formatting.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tables Section */}
      <section id="tables" className="py-20 bg-muted/30 -mx-6 px-6 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-4xl font-bold mb-8 text-center">
              Custom Tables
            </h2>

            {/* Performance Comparison Table */}
            <div className="bg-card border border-border rounded-2xl p-8 mb-8 overflow-x-auto">
              <h3 className="text-xl font-semibold mb-6">Performance Comparison</h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Framework</th>
                    <th className="text-right py-3 px-4 font-semibold">Build Time</th>
                    <th className="text-right py-3 px-4 font-semibold">Bundle Size</th>
                    <th className="text-right py-3 px-4 font-semibold">Lighthouse Score</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Next.js 15', build: '2.3s', size: '95 kB', score: 98 },
                    { name: 'Vite + React', build: '1.8s', size: '142 kB', score: 95 },
                    { name: 'Create React App', build: '8.5s', size: '256 kB', score: 87 },
                    { name: 'Gatsby', build: '12.1s', size: '178 kB', score: 92 },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-medium">{row.name}</td>
                      <td className="py-3 px-4 text-right text-muted-foreground">{row.build}</td>
                      <td className="py-3 px-4 text-right text-muted-foreground">{row.size}</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`font-semibold ${
                          row.score >= 95 ? 'text-green-500' : 
                          row.score >= 90 ? 'text-yellow-500' : 
                          'text-orange-500'
                        }`}>
                          {row.score}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Feature Matrix Table */}
            <div className="bg-card border border-border rounded-2xl p-8 overflow-x-auto">
              <h3 className="text-xl font-semibold mb-6">Feature Matrix</h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Feature</th>
                    <th className="text-center py-3 px-4 font-semibold">Free</th>
                    <th className="text-center py-3 px-4 font-semibold">Pro</th>
                    <th className="text-center py-3 px-4 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: 'Custom Pages', free: true, pro: true, enterprise: true },
                    { feature: 'Advanced Analytics', free: false, pro: true, enterprise: true },
                    { feature: 'Team Collaboration', free: false, pro: false, enterprise: true },
                    { feature: 'Priority Support', free: false, pro: true, enterprise: true },
                    { feature: 'Custom Domain', free: false, pro: true, enterprise: true },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="py-3 px-4 font-medium">{row.feature}</td>
                      <td className="py-3 px-4 text-center">
                        {row.free ? <span className="text-green-500">✓</span> : <span className="text-muted-foreground">—</span>}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {row.pro ? <span className="text-green-500">✓</span> : <span className="text-muted-foreground">—</span>}
                      </td>
                      <td className="py-3 px-4 text-center">
                        {row.enterprise ? <span className="text-green-500">✓</span> : <span className="text-muted-foreground">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Code and Terminal Section */}
      <section id="code-terminal" className="py-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-4xl font-bold mb-12 text-center">
            Code & Terminal
          </h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Code Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-2xl overflow-hidden"
            >
              <div className="bg-muted/50 px-6 py-3 border-b border-border flex items-center justify-between">
                <span className="text-sm font-medium">example.tsx</span>
                <Code2 size={16} className="text-muted-foreground" />
              </div>
              <pre className="p-6 overflow-x-auto text-sm">
                <code className="text-muted-foreground">{`export function CustomPage() {
  const [count, setCount] = useState(0);
  
  return (
    <div className="p-6">
      <h1>Counter: {count}</h1>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-4 py-2 bg-accent"
      >
        Increment
      </button>
    </div>
  );
}`}</code>
              </pre>
            </motion.div>

            {/* Terminal Output */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-card border border-border rounded-2xl overflow-hidden"
            >
              <div className="bg-muted/50 px-6 py-3 border-b border-border flex items-center justify-between">
                <span className="text-sm font-medium">Terminal</span>
                <Terminal size={16} className="text-muted-foreground" />
              </div>
              <pre className="p-6 overflow-x-auto text-sm font-mono">
                <code className="text-green-500">{`$ npm run build

> Building...
✓ Compiled successfully
✓ Linting and checking types
✓ Collecting page data
✓ Generating static pages (15/15)

Route (app)              Size
┌ ○ /                    5.2 kB
├ ○ /projects            4.1 kB
└ ○ /projects/demo       3.8 kB

✓ Build completed in 12.3s`}</code>
              </pre>
            </motion.div>
          </div>
        </div>
      </section>

       {/* Interactive Demo Section */}
        <section id="interactive-demo" className="py-12 scroll-mt-24">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-6">Try It Yourself</h2>
          <p className="text-muted-foreground mb-8">
            Explore the key features interactively. Edit the code and see the results in real-time.
          </p>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Interactive i18n Demo */}
            <InteractiveI18nDemo />
            
            {/* Interactive Type Safety Demo */}
            <InteractiveTypeSafetyDemo />
          </div>
        </section>

      {/* Image Gallery */}
      <section id="gallery" className="py-20 bg-muted/30 -mx-6 px-6 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-4xl font-bold mb-12 text-center">
            Responsive Gallery
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { src: '/demo/screenshot-desktop.svg', alt: 'Desktop', label: 'Desktop View' },
              { src: '/demo/screenshot-mobile.svg', alt: 'Mobile', label: 'Mobile View' },
              { src: '/demo/screenshot-tablet.svg', alt: 'Tablet', label: 'Tablet View' },
              { src: '/demo/screenshot-feature.svg', alt: 'Feature', label: 'Feature Card' },
              { src: '/demo/screenshot-desktop.svg', alt: 'Dashboard', label: 'Dashboard' },
              { src: '/demo/screenshot-mobile.svg', alt: 'Profile', label: 'Profile Page' },
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-video rounded-xl overflow-hidden border border-border hover:border-accent/50 transition-all hover:shadow-xl"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 text-white font-medium">
                    {img.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mixed Content Layout */}
      <section id="mixed-content" className="py-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="font-serif text-4xl font-bold mb-12 text-center">
            Mix Everything Together
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Text Column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-card border border-border rounded-2xl p-8">
                <h3 className="text-2xl font-semibold mb-4">Flexible Layouts</h3>
                <p className="text-muted-foreground mb-4">
                  Custom pages give you complete control over your content structure.
                  Combine text, images, code, tables, and more in any arrangement.
                </p>
                <p className="text-muted-foreground">
                  Use CSS Grid, Flexbox, or any layout system you prefer. Add animations
                  with Framer Motion, create interactive demos, or embed videos.
                </p>
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden border border-border">
                <Image
                  src="/demo/screenshot-feature.svg"
                  alt="Feature showcase"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h4 className="font-semibold mb-3">Quick Stats</h4>
                <div className="space-y-3">
                  <div>
                    <div className="text-2xl font-bold text-accent">98</div>
                    <div className="text-sm text-muted-foreground">Performance Score</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">2.3s</div>
                    <div className="text-sm text-muted-foreground">Build Time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-500">95kB</div>
                    <div className="text-sm text-muted-foreground">Bundle Size</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20 rounded-2xl p-6">
                <h4 className="font-semibold mb-2">Pro Tip</h4>
                <p className="text-sm text-muted-foreground">
                  Start with a simple layout and iterate. Custom pages are perfect
                  for showcasing your best work with unique storytelling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-accent/5 via-background to-primary/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-12 rounded-2xl bg-card border border-border"
          >
            <h2 className="font-serif text-3xl font-bold mb-4">
              Ready to Create Your Own?
            </h2>
            <p className="text-muted-foreground mb-8">
              Check out the README for step-by-step instructions on creating custom pages
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href={`/${locale}/projects`}
                className="px-8 py-4 bg-accent text-accent-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                View All Projects
              </Link>
              <a
                href="https://github.com/AppleBoiy/mysite"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-card border border-border rounded-full font-medium hover:border-accent/50 transition-colors"
              >
                View Source Code
              </a>
            </div>
          </motion.div>
        </div>
      </section>
      </CustomPageLayout>
    </>
  );
}


// Interactive i18n Demo Component
function InteractiveI18nDemo() {
  const [locale, setLocale] = useState<'en' | 'ja' | 'th'>('en');
  const [copied, setCopied] = useState(false);

  const translations = {
    en: { greeting: 'Hello, World!', description: 'Welcome to my portfolio' },
    ja: { greeting: 'こんにちは、世界！', description: 'ポートフォリオへようこそ' },
    th: { greeting: 'สวัสดีชาวโลก!', description: 'ยินดีต้อนรับสู่พอร์ตโฟลิโอของฉัน' },
  };

  const code = `// i18n with automatic fallback
const t = useTranslation('${locale}');

// If translation missing, falls back to 'en'
t('greeting') // "${translations[locale].greeting}"
t('description') // "${translations[locale].description}"`;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="bg-muted/50 px-6 py-3 border-b border-border flex items-center justify-between">
        <span className="text-sm font-medium">i18n System Demo</span>
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
          title="Copy code"
        >
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        </button>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">Select Language:</label>
          <div className="flex gap-2">
            {(['en', 'ja', 'th'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLocale(lang)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  locale === lang
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted hover:bg-muted/80'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 mb-4">
          <div className="text-2xl font-bold mb-2">{translations[locale].greeting}</div>
          <div className="text-muted-foreground">{translations[locale].description}</div>
        </div>

        <div className="bg-black/90 rounded-lg p-4 font-mono text-sm overflow-x-auto">
          <pre className="text-green-400">{code}</pre>
        </div>
      </div>
    </div>
  );
}

// Interactive Type Safety Demo Component
function InteractiveTypeSafetyDemo() {
  const [code, setCode] = useState(`interface Project {
  id: string;
  type: 'github' | 'gist';
  tags: string[];
}

const project: Project = {
  id: 'mysite',
  type: 'github',
  tags: ['Next.js', 'React']
};`);
  
  const [output, setOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = () => {
    setIsRunning(true);
    setOutput([]);
    
    const lines = [
      '> Checking TypeScript types...',
      '✓ Type checking passed',
      '✓ No type errors found',
      '> Compiling...',
      '✓ Compilation successful',
      '',
      'Project data:',
      `  id: "mysite"`,
      `  type: "github"`,
      `  tags: ["Next.js", "React"]`,
      '',
      '✓ All checks passed!'
    ];

    lines.forEach((line, i) => {
      setTimeout(() => {
        setOutput(prev => [...prev, line]);
        if (i === lines.length - 1) {
          setIsRunning(false);
        }
      }, i * 200);
    });
  };

  const reset = () => {
    setOutput([]);
    setCode(`interface Project {
  id: string;
  type: 'github' | 'gist';
  tags: string[];
}

const project: Project = {
  id: 'mysite',
  type: 'github',
  tags: ['Next.js', 'React']
};`);
  };

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="bg-muted/50 px-6 py-3 border-b border-border flex items-center justify-between">
        <span className="text-sm font-medium">TypeScript Type Safety</span>
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            title="Reset"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="px-4 py-2 bg-accent text-accent-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
          >
            <Play size={14} />
            Run
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <label className="text-sm font-medium mb-2 block">Edit Code:</label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-48 bg-black/90 text-green-400 font-mono text-sm p-4 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-accent"
            spellCheck={false}
          />
        </div>

        <div className="bg-black/90 rounded-lg p-4 font-mono text-sm min-h-[200px]">
          {output.length === 0 ? (
            <div className="text-muted-foreground">Click "Run" to execute the code...</div>
          ) : (
            <div className="space-y-1">
              {output.map((line, i) => (
                <div
                  key={i}
                  className={`${
                    line.startsWith('✓') ? 'text-green-400' :
                    line.startsWith('>') ? 'text-blue-400' :
                    line.includes(':') && !line.startsWith(' ') ? 'text-yellow-400' :
                    'text-gray-300'
                  }`}
                >
                  {line || '\u00A0'}
                </div>
              ))}
              {isRunning && (
                <div className="text-blue-400 animate-pulse">Running...</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
