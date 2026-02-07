export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 py-8">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <p className="text-sm text-muted-foreground">
          Deep Detection &copy; {new Date().getFullYear()} — Hệ thống nhận diện
          AI
        </p>
      </div>
    </footer>
  );
}
