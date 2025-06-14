export function Footer() {
  return (
    <footer className="py-8 bg-muted/50 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Tourista. All rights reserved.
        </p>
        <p className="text-xs mt-1">
          Crafted for your adventures in Dubai and beyond.
        </p>
      </div>
    </footer>
  );
}
