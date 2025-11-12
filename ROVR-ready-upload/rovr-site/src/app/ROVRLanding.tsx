
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, ImageIcon, Video, Settings2, Zap, Cpu, PlugZap, Mail, Shield, Gamepad2, BadgeDollarSign } from "lucide-react";

// NOTE: Front-end landing page scaffold for ROVR (retro Atari/NES look).
// Replace demo handlers with your server routes when you're ready.

const steps = [
  { icon: ImageIcon, label: "Upload content", desc: "Drop a photo or video—ROVR auto-detects subject, tone & audience intent." },
  { icon: Settings2, label: "ROVR analyzes", desc: "Pixel-perfect targeting, placements, and budgets generated in seconds." },
  { icon: PlugZap, label: "Deploy or Download", desc: "Email yourself the settings or let ROVR publish to Meta for you." },
];

const faqs = [
  {
    q: "Does ROVR run my ads for me?",
    a: "On the $29.99 plan, yes—connect your Facebook Pixel and ad account, approve the final preview, and ROVR will publish. On $19.99, you receive a ready-to-import setup via email."
  },
  {
    q: "Will this work with Reels, Stories, and carousel?",
    a: "Yep. ROVR recommends optimal placements per asset and campaign objective across Feed, Stories, Reels, and Audience Network."
  },
  {
    q: "What data does ROVR store?",
    a: "Only what’s needed to analyze your content and ship your ad. Pixels and tokens use secure storage; you can revoke access any time."
  },
  {
    q: "Can I edit before launch?",
    a: "Absolutely. You’ll get a clear preview—targeting, placements, budget, and copy—before anything is published."
  },
];

const PixelScanlines: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 z-30 opacity-[0.12] mix-blend-overlay" aria-hidden>
    <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[length:100%_2px]"></div>
  </div>
);

const CRTMask: React.FC = () => (
  <div className="pointer-events-none fixed inset-0 z-20" aria-hidden>
    <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0)_40%,rgba(0,0,0,0.35)_100%)]" />
  </div>
);

const RetroGrid: React.FC = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-black" />
    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,0.09)_25px,transparent_26px),linear-gradient(0deg,transparent_24px,rgba(255,255,255,0.09)_25px,transparent_26px)] bg-[size:26px_26px]" />
    <motion.div
      className="absolute -left-1/2 top-1/2 h-[120vmax] w-[120vmax] -translate-y-1/2 rotate-12 bg-gradient-to-tr from-fuchsia-500/20 via-cyan-400/10 to-indigo-400/10 blur-3xl"
      animate={{ rotate: [12, 18, 12], scale: [1, 1.08, 1] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const TierRow = ({ text }: { text: string }) => (
  <div className="flex items-start gap-3">
    <Check className="mt-1 h-5 w-5" aria-hidden />
    <p className="text-sm leading-relaxed">{text}</p>
  </div>
);

const PricingCard: React.FC<{
  name: string;
  price: string;
  cta: string;
  highlight?: boolean;
  features: string[];
  onClick: () => void;
  badge?: string;
}> = ({ name, price, cta, highlight, features, onClick, badge }) => (
  <Card className={`relative overflow-hidden rounded-2xl border-2 ${highlight ? "border-fuchsia-500/60 shadow-[0_0_30px_rgba(240,46,170,0.35)]" : "border-white/15"} bg-black/50 backdrop-blur-sm`}>
    {badge && (
      <div className="absolute right-3 top-3 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] tracking-wide">
        {badge}
      </div>
    )}
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-xl">
        <Gamepad2 className="h-5 w-5" /> {name}
      </CardTitle>
      <div className="mt-2 flex items-end gap-2">
        <span className="text-4xl font-black">{price}</span>
        <span className="pb-1 text-xs uppercase tracking-widest text-white/60">/ month</span>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        {features.map((f, i) => (
          <TierRow key={i} text={f} />
        ))}
      </div>
      <Button onClick={onClick} className="mt-4 w-full rounded-xl">
        {cta}
      </Button>
    </CardContent>
  </Card>
);

const Modal: React.FC<{ open: boolean; onClose: () => void; title: string; children: React.ReactNode }>
= ({ open, onClose, title, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border border-white/20 bg-neutral-950 p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-mono text-lg uppercase tracking-widest">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="rounded-md border border-white/20 px-2 py-1 text-xs hover:bg-white/10">ESC</button>
        </div>
        {children}
      </div>
    </div>
  );
};

const EmailPlanForm = () => (
  <div className="space-y-4">
    <p className="text-sm text-white/80">Enter your email; we’ll send your ad targeting, placements, budget ranges, and import-ready instructions.</p>
    <div className="flex items-center gap-2">
      <Input placeholder="you@brand.com" className="bg-black/70" />
      <Button className="rounded-xl">Send</Button>
    </div>
    <p className="text-xs text-white/50">By continuing you agree to our Terms & Privacy.</p>
  </div>
);

const PixelPlanForm = () => (
  <div className="space-y-4">
    <p className="text-sm text-white/80">Connect your Facebook Pixel and grant ad account permissions. ROVR will auto-create and deliver your ad for approval.</p>
    <div className="grid gap-3 sm:grid-cols-2">
      <Button className="flex items-center justify-center gap-2 rounded-xl">
        <PlugZap className="h-4 w-4" /> Connect Pixel
      </Button>
      <Button className="flex items-center justify-center gap-2 rounded-xl" variant="outline">
        <Shield className="h-4 w-4" /> Grant Ad Access
      </Button>
    </div>
    <Card className="border-white/15 bg-black/50">
      <CardContent className="space-y-2 p-4 text-xs text-white/70">
        <p><strong>Note:</strong> This is a demo UI. Wire these buttons to your server-side OAuth + Meta Marketing API flow.</p>
        <p>Before publishing, you’ll get a final preview of targeting, placements, and spend. Nothing goes live without your approval.</p>
      </CardContent>
    </Card>
  </div>
);

export default function ROVRLanding() {
  const [emailOpen, setEmailOpen] = useState(false);
  const [pixelOpen, setPixelOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Retro font import */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=JetBrains+Mono:wght@400;600;800&display=swap" rel="stylesheet" />

      <style>{`
        :root { --accent: #ff206e; }
        .titlefont { font-family: 'Press Start 2P', system-ui, monospace; }
        .uifont { font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace; }
      `}</style>

      <RetroGrid />
      <CRTMask />
      <PixelScanlines />

      {/* Top Nav */}
      <header className="relative z-40 mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg border-2 border-white/25 bg-black/60 shadow-[0_0_20px_rgba(255,32,110,0.4)_inset]">
            <Cpu className="h-6 w-6" />
          </div>
          <div>
            <div className="titlefont text-sm leading-none tracking-widest">ROVR</div>
            <div className="uifont text-xs uppercase tracking-[0.2em] text-white/60">Analyze. Target. Launch.</div>
          </div>
        </div>
        <nav className="hidden items-center gap-6 text-sm sm:flex">
          <a href="#features" className="hover:text-fuchsia-300">Features</a>
          <a href="#how" className="hover:text-fuchsia-300">How it works</a>
          <a href="#pricing" className="hover:text-fuchsia-300">Pricing</a>
          <a href="#faq" className="hover:text-fuchsia-300">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button>Sign In</Button>
          <Button>
            <Zap className="mr-1 h-4 w-4" /> Get Started
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-6xl px-4 pb-16 pt-6 sm:pb-24 sm:pt-10">
        <div className="grid items-center gap-10 sm:grid-cols-2">
          <div>
            <h1 className="titlefont text-3xl leading-relaxed sm:text-4xl">Analyze. Target. Launch. <span className="text-fuchsia-400">Auto‑GG</span>.</h1>
            <p className="uifont mt-4 max-w-prose text-sm text-white/80">ROVR reads your pictures & videos like a speedrunner—then one‑buttons the perfect Meta Ads setup. No dashboards, no guesswork. Just connect your Pixel, press play, and ship.</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button onClick={() => setPixelOpen(true)}>
                <PlugZap className="mr-2 h-4 w-4" /> Connect Pixel
              </Button>
              <Button onClick={() => setEmailOpen(true)} variant="outline">
                <Mail className="mr-2 h-4 w-4" /> Email me a setup
              </Button>
            </div>
            <div className="uifont mt-4 text-xs text-white/60">Works with image, video, and UGC. Instant targeting + placements + budgets.</div>
          </div>

          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl border-2 border-white/20 bg-neutral-950 p-4 shadow-[0_0_30px_rgba(99,102,241,0.25)]">
              <div className="mb-3 flex items-center justify-between">
                <div className="uifont text-xs uppercase tracking-widest text-white/60">Demo Upload</div>
                <div className="flex items-center gap-2 text-white/50">
                  <ImageIcon className="h-4 w-4" /> <Video className="h-4 w-4" />
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-white/10 bg-black/60 p-3">
                  <div className="uifont text-[10px] uppercase tracking-widest text-white/60">Detected</div>
                  <ul className="mt-2 space-y-1 text-xs">
                    <li>• Niche: Streetwear</li>
                    <li>• Mood: High‑energy</li>
                    <li>• CTA: Shop drop</li>
                    <li>• Style: UGC vertical</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/60 p-3">
                  <div className="uifont text-[10px] uppercase tracking-widest text-white/60">Targeting</div>
                  <ul className="mt-2 space-y-1 text-xs">
                    <li>• Lookalike: 2% purchasers</li>
                    <li>• Interests: Sneakerheads, Hypebeast</li>
                    <li>• Age: 18–34</li>
                    <li>• Geo: US/CA/UK</li>
                  </ul>
                </div>
                <div className="rounded-lg border border-white/10 bg-black/60 p-3">
                  <div className="uifont text-[10px] uppercase tracking-widest text-white/60">Placements</div>
                  <ul className="mt-2 space-y-1 text-xs">
                    <li>• Reels, Stories</li>
                    <li>• IG Feed</li>
                    <li>• Advantage+ placements</li>
                    <li>• Budget: $25–$50/day</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 mx-auto max-w-6xl px-4 py-14">
        <div className="mb-10 flex items-center gap-3">
          <BadgeDollarSign className="h-6 w-6" />
          <h2 className="titlefont text-2xl">Built like a classic, plays like a cheat code.</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {[0,1,2,3,4,5].map((i) => (
            <Card key={i} className="border-white/15 bg-black/50">
              <CardContent className="space-y-2 p-5">
                {i === 0 && <ImageIcon className="h-6 w-6" />}
                {i === 1 && <Video className="h-6 w-6" />}
                {i === 2 && <Settings2 className="h-6 w-6" />}
                {i === 3 && <Zap className="h-6 w-6" />}
                {i === 4 && <Shield className="h-6 w-6" />}
                {i === 5 && <Gamepad2 className="h-6 w-6" />}
                <h3 className="uifont text-sm font-bold">
                  {["Vision model reads your asset",
                    "Understands format & context",
                    "One-click settings & audience",
                    "Fast, predictable campaign setup",
                    "Privacy-first controls",
                    "8‑bit easy UI (yes, really)"][i]}
                </h3>
                <p className="uifont text-xs text-white/70">
                  {["Detects product type, tone, objects, and brand cues for precise audience mapping.",
                    "Optimizes for Reels, Stories, Feed, and aspect ratios without the guesswork.",
                    "Generates targeting, placements, budgets, and draft ad copy ready to run.",
                    "From upload to publish in under a minute on modern connections.",
                    "Granular data retention windows and revocable permissions built in.",
                    "Designed to feel like Atari/NES—simple, crisp, satisfying."][i]}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 mx-auto max-w-6xl px-4 py-14">
        <h2 className="titlefont mb-8 text-2xl">How it works</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {steps.map(({ icon: Icon, label, desc }, idx) => (
            <Card key={label} className="border-white/15 bg-black/50">
              <CardContent className="p-6">
                <div className="mb-3 flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <div className="uifont text-xs uppercase tracking-widest text-white/60">Step {idx + 1}</div>
                </div>
                <h3 className="uifont text-sm font-bold">{label}</h3>
                <p className="uifont mt-2 text-xs text-white/70">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 mx-auto max-w-6xl px-4 py-14">
        <h2 className="titlefont mb-8 text-2xl">Choose your power‑up</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          <PricingCard
            name="Player One — Download"
            price="$19.99"
            cta="Email me my setup"
            features={[
              "Upload photo or video for analysis",
              "Receive targeting, placements, budget",
              "Import-ready instructions for Meta",
              "Keep full control—DIY launch"
            ]}
            onClick={() => setEmailOpen(true)}
            badge="Most Affordable"
          />
          <PricingCard
            name="Player Two — Autopilot"
            price="$29.99"
            cta="Connect Pixel & Launch"
            features={[
              "Full analysis + ready-to-run ad",
              "Connect Pixel & grant ad access",
              "One-click publish after preview",
              "Hands-off optimization"
            ]}
            onClick={() => setPixelOpen(true)}
            highlight
            badge="Most Popular"
          />
        </div>
        <p className="uifont mt-4 text-xs text-white/60">Prices in USD per month. Cancel anytime. Taxes may apply.</p>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 mx-auto max-w-6xl px-4 py-14">
        <h2 className="titlefont mb-8 text-2xl">FAQ</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {faqs.map((f) => (
            <Card key={f.q} className="border-white/15 bg-black/50">
              <CardContent className="p-5">
                <h3 className="uifont text-sm font-bold">{f.q}</h3>
                <p className="uifont mt-2 text-xs text-white/70">{f.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 mx-auto max-w-6xl px-4 pb-20 pt-10">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <div className="titlefont text-sm">ROVR</div>
            <p className="uifont mt-2 text-xs text-white/60">© {new Date().getFullYear()} ROVR. ROVR is not affiliated with Nintendo® or Atari®. Meta®, Facebook®, and Instagram® are trademarks of their respective owners.</p>
          </div>
          <div className="uifont text-xs text-white/60 sm:text-right">
            <a className="hover:text-fuchsia-300" href="#">Terms</a>
            <span className="mx-2">·</span>
            <a className="hover:text-fuchsia-300" href="#">Privacy</a>
            <span className="mx-2">·</span>
            <a className="hover:text-fuchsia-300" href="#">Security</a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal open={emailOpen} onClose={() => setEmailOpen(false)} title="Email plan — $19.99">
        <EmailPlanForm />
      </Modal>
      <Modal open={pixelOpen} onClose={() => setPixelOpen(false)} title="Autopilot plan — $29.99">
        <PixelPlanForm />
      </Modal>
    </div>
  );
}
