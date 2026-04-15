/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Menu, X, Wand2, Feather, Command, ShieldCheck, ChevronDown, Smartphone } from 'lucide-react';
import TypingAnimation from './components/TypingAnimation';

declare const gtag: (...args: unknown[]) => void;

const DOWNLOAD_URL = 'https://apps.apple.com/app/id6759639348';
const DOWNLOAD_EVENT = 'download_click';

const trackDownload = (location: string) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', DOWNLOAD_EVENT, { event_category: 'engagement', event_label: location });
  }
};

const trackFaqClick = (question: string) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'faq_click', { event_category: 'engagement', event_label: question });
  }
};

const trackSectionView = (sectionName: string) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'section_view', { event_category: 'engagement', event_label: sectionName + '_en' });
  }
};

const trackFeatureClick = (featureTitle: string) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'feature_click', { event_category: 'engagement', event_label: featureTitle });
  }
};

const trackLinkClick = (linkName: string, destination: string) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'link_click', { event_category: 'engagement', event_label: linkName, destination: destination });
  }
};

function Logo({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx="20" fill="#0D142E" />
      <defs>
        <linearGradient id="k-stem-en" x1="30" y1="20" x2="30" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38C7BA" />
          <stop offset="1" stopColor="#8E61D9" />
        </linearGradient>
        <linearGradient id="k-arm-en" x1="75" y1="20" x2="40" y2="80" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E6EBF2" />
          <stop offset="1" stopColor="#BFCDE0" />
        </linearGradient>
      </defs>
      <rect x="25" y="20" width="16" height="60" fill="url(#k-stem-en)" />
      <path d="M75 20L41 50L75 80H55L31 50L55 20H75Z" fill="url(#k-arm-en)" />
    </svg>
  );
}

function DownloadCTA({ centered = false }: { centered?: boolean }) {
  return (
    <div className={`flex flex-col w-full ${centered ? 'items-center' : 'items-center lg:items-start'} space-y-6`}>
      <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackDownload(centered ? 'cta_section_en' : 'hero_en')} className="w-auto bg-bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-bg-secondary transition-all duration-200 transform hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none inline-flex items-center justify-center space-x-2 shadow-lg shadow-bg-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2">
        <Smartphone className="w-5 h-5" />
        <span>Download Now</span>
      </a>
    </div>
  );
}

export default function App() {
  useEffect(() => {
    const trackedSections = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId && !trackedSections.has(sectionId)) {
              trackSectionView(sectionId);
              trackedSections.add(sectionId);
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = ['features', 'faq', 'download'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F7FA] text-text-primary selection:bg-brand-cyan/30 overflow-x-hidden" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "PingFang TC", "Heiti TC", "Microsoft JhengHei", system-ui, sans-serif' }}>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <FAQSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-3 left-0 right-0 z-50 px-3 sm:px-4">
      <div className="max-w-6xl mx-auto bg-white/85 backdrop-blur-xl border border-metal-gray/30 rounded-2xl shadow-[0_10px_35px_rgba(13,20,46,0.08)]">
        <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Logo className="w-8 h-8 rounded-lg shadow-sm" />
            <span className="font-bold text-xl tracking-tight">Keyly</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-text-secondary hover:text-brand-cyan transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md px-1">Features</a>
            <a href="#faq" className="text-text-secondary hover:text-brand-cyan transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md px-1">FAQ</a>
            <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackDownload('navbar_en')} className="bg-bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-bg-secondary transition-colors duration-200 flex items-center space-x-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan focus-visible:ring-offset-2">
              <Download className="w-4 h-4" />
              <span>Download Now</span>
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan rounded-md p-1" aria-label="Toggle menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-2 max-w-6xl mx-auto bg-white/95 backdrop-blur-xl border border-metal-gray/30 rounded-2xl px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <a href="#features" className="block px-3 py-2 text-text-secondary hover:bg-metal-white/50 rounded-md transition-colors duration-200" onClick={() => setIsOpen(false)}>Features</a>
          <a href="#faq" className="block px-3 py-2 text-text-secondary hover:bg-metal-white/50 rounded-md transition-colors duration-200" onClick={() => setIsOpen(false)}>FAQ</a>
          <a href={DOWNLOAD_URL} target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-brand-cyan font-medium hover:bg-metal-white/50 rounded-md transition-colors duration-200" onClick={() => { setIsOpen(false); trackDownload('navbar_mobile_en'); }}>Download Now</a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 text-center lg:text-left mb-16 lg:mb-0 z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="text-sm font-semibold tracking-[0.08em] text-text-secondary/80 mb-4">
                Built in Taiwan · tuned for iOS Zhuyin input
              </div>
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-text-primary leading-tight mb-6">
                AI Zhuyin keyboard for faster, clearer writing on iPhone<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-purple">
                  rewrite and refine text in one tap
                </span>
              </h1>
              <p className="text-lg text-text-secondary/90 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Keyly unifies speed, writing quality, and privacy so translation, rewriting, and refinement happen directly in your typing flow.
              </p>

              <div className="mt-8">
                <DownloadCTA />
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-6 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95, rotate: 4 }}
              animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 25, delay: 0.2 }}
              className="relative z-10 w-full"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-brand-cyan/30 to-brand-purple/30 rounded-full blur-3xl -z-10 opacity-50"></div>
              <React.Suspense fallback={<div className="w-full aspect-[4/3] rounded-3xl bg-metal-gray/10 animate-pulse border border-metal-gray/20"></div>}>
                <TypingAnimation locale="en" />
              </React.Suspense>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: <Wand2 className="w-6 h-6 text-brand-cyan" />,
      title: 'A text filter shaped around you',
      description: 'Whether you are drafting a sincere message, a casual post, or a formal business document, you can write freely and apply the right AI filter in one tap. Use it fully offline when privacy matters, or connect to the cloud for stronger creative range from top-tier models.'
    },
    {
      icon: <Feather className="w-6 h-6 text-brand-purple" />,
      title: 'Extremely smooth typing feel',
      description: 'To push third-party keyboard speed as far as possible, we built a Zhuyin engine that prioritizes fluidity. The touch boundaries are finely tuned, the haptic rhythm is deliberate, and the overall typing feel stays stable and satisfying.'
    },
    {
      icon: <Command className="w-6 h-6 text-accent-mint" />,
      title: 'Smart shortcuts ready mid-typing',
      description: 'This goes far beyond typo correction. Build your own AI commands for instant translation, long-form compression, or polished high-EQ replies, then call them with a quick gesture directly from the keyboard.'
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-brand-cyan" />,
      title: 'A high-standard privacy boundary',
      description: 'Conversation privacy is central to Keyly. We follow an ephemeral-processing principle so your text is destroyed after processing rather than stored long-term. We do not monitor, log, or repurpose your private data for model training.'
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Why Keyly is a better Zhuyin keyboard</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              onClick={() => trackFeatureClick(feature.title)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#F4F7FA] rounded-2xl p-6 border border-metal-gray/20 hover:shadow-lg hover:border-brand-cyan/30 transition-[box-shadow,border-color] cursor-pointer"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-text-primary">{feature.title}</h3>
              </div>
              <p className="text-text-secondary leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: 'Is Keyly still good if I mostly use it as a regular keyboard?',
      answer: 'Yes. The core of Keyly is a fast, precise Zhuyin engine built for clean correction and smooth input. Even without AI, it is meant to deliver a sharp and comfortable typing experience on iOS.'
    },
    {
      question: 'Which languages does Keyly support?',
      answer: 'Our strongest focus is Traditional Chinese Zhuyin, with full mixed Chinese-English input support. On top of that, Keyly\'s AI can help with translation and multilingual refinement in one tap. AI output should still be reviewed before formal use.'
    },
    {
      question: 'Why do I need to enable “Allow Full Access”?',
      answer: (
        <div className="space-y-3">
          <p>This is the technical requirement that allows a third-party iOS keyboard to connect to cloud AI services.</p>
          <p><strong>If you keep it off:</strong> you can still use Keyly&apos;s core Zhuyin engine without limitation. On supported devices, you can also keep basic on-device AI correction fully offline.</p>
          <p><strong>If you turn it on:</strong> we use an ephemeral-processing model. Data is handled only for the requested AI task, then removed from cache. Keyly does not monitor, record, or store your everyday private conversations.</p>
        </div>
      )
    },
    {
      question: 'Which cloud AI providers do you use, and is it safe?',
      answer: 'We build on global top-tier providers including Google, OpenAI, and Anthropic. Keyly limits data use to immediate requests only and does not allow your personal conversations to be used for model training. Automatic cache clearing further reduces retention risk.'
    },
    {
      question: 'Can I still use AI refinement without internet access?',
      answer: 'Yes, if your device supports Apple\'s native on-device AI frameworks. On supported hardware, Keyly can refine text offline, which gives you both faster response time and stronger privacy guarantees.'
    },
    {
      question: 'Will very fast typing cause lag or crashes?',
      answer: 'We built the product with a strict performance bar. Keyly is tuned by an experienced iOS engineering team and tested across multiple devices so that the typing flow stays stable, fluid, and responsive even at high speed.'
    },
    {
      question: 'How are my custom AI commands stored?',
      answer: 'Your custom prompts stay under your control. They are currently stored locally on your device using encryption, and we are planning end-to-end encrypted sync so switching devices becomes more seamless later.'
    },
    {
      question: 'What is the difference between free download users and Keyly Pro?',
      answer: (
        <div className="space-y-4">
          <p>
            <strong>Standard users (free download):</strong><br />
            Free download includes the high-speed Zhuyin engine, the full standard prompt library, and a one-time gift of 50 cloud AI requests for newly signed-in accounts.
          </p>
          <p>
            <strong>Keyly Pro subscription (NT$150/month):</strong><br />
            Built for heavy professional use. It unlocks unlimited cloud AI processing and adds the AI Prompt Manager so you can create, edit, and save custom commands that match your workflow.
          </p>
        </div>
      )
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const getFaqAnswerId = (index: number) => `faq-answer-en-${index}`;

  return (
    <section id="faq" className="py-24 bg-bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-purple/15 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none transform-gpu will-change-transform"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">FAQ <span className="text-accent-mint">Q&A</span></h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-bg-secondary rounded-2xl border border-white/10 overflow-hidden transform-gpu">
              <button className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/70 active:bg-white/5 transition-colors duration-200" onClick={() => {
                if (openIndex !== index) trackFaqClick(faq.question);
                setOpenIndex(openIndex === index ? null : index);
              }} aria-expanded={openIndex === index} aria-controls={getFaqAnswerId(index)}>
                <span className="text-lg font-medium text-metal-white pr-8">{faq.question}</span>
                <ChevronDown className={`w-5 h-5 text-brand-cyan shrink-0 transition-transform duration-300 motion-reduce:transition-none ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    id={getFaqAnswerId(index)}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-metal-gray leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="download" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-cyan/5"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl font-bold text-text-primary mb-6">Try a smarter Zhuyin keyboard for iPhone</h2>
        <p className="text-xl text-text-secondary mb-10">
          Get Keyly and speed up Traditional Chinese typing, rewriting, and translation in one keyboard.
        </p>
        <DownloadCTA centered />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#F4F7FA] border-t border-metal-gray/30 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Logo className="w-8 h-8 rounded-lg shadow-sm" />
            <span className="font-bold text-text-primary">Keyly</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3 text-sm text-text-secondary">
            <a href="/privacy/en/" onClick={() => trackLinkClick('privacy_policy_en', '/privacy/en/')} className="hover:text-brand-cyan transition-colors">Privacy Policy</a>
            <span className="text-metal-gray/50">|</span>
            <a href="/terms/en/" onClick={() => trackLinkClick('terms_of_service_en', '/terms/en/')} className="hover:text-brand-cyan transition-colors">Terms of Service</a>
            <span className="text-metal-gray/50">|</span>
            <a href="/subscriptions/en/" onClick={() => trackLinkClick('subscription_terms_en', '/subscriptions/en/')} className="hover:text-brand-cyan transition-colors">Auto-Renewal Terms</a>
            <span className="text-metal-gray/50">|</span>
            <a href="mailto:support@keylyapp.com" onClick={() => trackLinkClick('support_email_en', 'mailto:support@keylyapp.com')} className="hover:text-brand-cyan transition-colors">Support</a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-metal-gray">
          &copy; 2026 Keyly. Built by a Taiwan-based team for faster, sharper communication.
        </div>
      </div>
    </footer>
  );
}
