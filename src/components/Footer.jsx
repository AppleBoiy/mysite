export default function Footer() {
  return (
    <footer className="py-10 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="font-serif text-lg font-semibold text-foreground">
          Chaipat Jainan<span className="text-accent">.</span>
        </p>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} — Built with React & Tailwind CSS
        </p>
      </div>
    </footer>
  );
}