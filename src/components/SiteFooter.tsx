interface SiteFooterProps {
  onContactClick: () => void;
}

export function SiteFooter({ onContactClick }: SiteFooterProps) {
  return (
    <footer id="studio" className="relative bg-surface border-t border-border">
      <div className="container-x max-w-[1400px] mx-auto py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95]">
              Quietly built.
              <br />
              <em className="text-gradient-gold not-italic">Loudly effective.</em>
            </h2>
            <button
              onClick={onContactClick}
              className="group mt-10 inline-flex items-center gap-4 rounded-full bg-gradient-gold text-primary-foreground px-8 py-5 hover:shadow-gold transition-shadow"
            >
              <span className="font-medium text-lg">Begin a conversation</span>
              <span className="transition-transform group-hover:translate-x-1 text-xl">→</span>
            </button>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-8 content-end">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                Contact
              </div>
              <a href="mailto:hello@forgeand.co" className="link-reveal block">
                hello@forgeand.co
              </a>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                Studio
              </div>
              <p>North Macedonia</p>
              <p className="text-muted-foreground">Remote, worldwide</p>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                Social
              </div>
              <a className="link-reveal block" href="#">LinkedIn</a>
              <a className="link-reveal block" href="https://instagram.com/forgeandco.mk" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a className="link-reveal block" href="#">Dribbble</a>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">
                Legal
              </div>
              <a className="link-reveal block" href="#">Imprint</a>
              <a className="link-reveal block" href="#">Privacy</a>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-gold animate-glow-pulse" />
            <span>Available · Q3 2026 booking</span>
          </div>
          <div>© {new Date().getFullYear()} Forge & Co. — All rights reserved</div>
        </div>
      </div>
    </footer>
  );
}
