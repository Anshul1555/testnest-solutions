import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Activity, Play, ChevronRight, MousePointerClick, 
  Terminal, Cpu, Network, Smartphone, RefreshCw, 
  Phone, Mail, MapPin, Copy, Check, ExternalLink,
  Coins, ShieldCheck, ShoppingBag
} from 'lucide-react';

// --- Dynamic Counter Helper Component ---
const RollingCounter = ({ value, suffix = '', duration = 1.5 }) => {
  const [count, setCount] = useState(0);
  const target = parseFloat(value);
  
  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) return;
    
    const totalFrames = 60 * duration;
    let frame = 0;
    
    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad
      const easeProgress = progress * (2 - progress);
      const current = start + (end - start) * easeProgress;
      
      setCount(current);
      
      if (frame >= totalFrames) {
        clearInterval(counter);
        setCount(end);
      }
    }, 1000 / 60);
    
    return () => clearInterval(counter);
  }, [target, duration]);

  // Format decimal values or integers
  const displayVal = target % 1 === 0 ? Math.floor(count).toLocaleString() : count.toFixed(1);
  return <span>{displayVal}{suffix}</span>;
};

export default function Home({ onOpenAuditModal, setActiveTab, onCopy, copiedState }) {
  // Service array definitions
  const services = [
    {
      num: '01',
      icon: <MousePointerClick className="w-6 h-6 text-indigo-600" />,
      emoji: '🖱️',
      title: 'Manual Testing',
      desc: 'Exploratory, functional, regression & UAT. Human eyes catch what scripts miss, utilizing easily understandable Gherkin specs.',
      tags: ['UAT', 'Regression', 'Smoke'],
      bg: 'from-blue-50/50 to-indigo-50/30'
    },
    {
      num: '02',
      icon: <Cpu className="w-6 h-6 text-cyan-600" />,
      emoji: '🤖',
      title: 'Automation Testing',
      desc: 'Cypress, Selenium, Playwright — scalable Page Object Model (POM) & Cucumber BDD frameworks tailored for quick onboarding.',
      tags: ['Selenium', 'Cypress', 'Playwright'],
      bg: 'from-cyan-50/50 to-teal-50/30'
    },
    {
      num: '03',
      icon: <Activity className="w-6 h-6 text-amber-600" />,
      emoji: '⚡',
      title: 'Performance Testing',
      desc: 'Stress and load diagnostics using Apache JMeter so your application stays responsive under peak user traffic.',
      tags: ['JMeter', 'Load Testing', 'Stress Testing'],
      bg: 'from-amber-50/50 to-orange-50/30'
    },
    {
      num: '04',
      icon: <Network className="w-6 h-6 text-indigo-600" />,
      emoji: '🔗',
      title: 'API & Integration Testing',
      desc: 'Deep verification of REST endpoints, contract schemas & edge cases using Postman and PyCharm workspace integration.',
      tags: ['Postman', 'PyCharm', 'Integration'],
      bg: 'from-violet-50/50 to-indigo-50/30'
    },
    {
      num: '05',
      icon: <Smartphone className="w-6 h-6 text-emerald-600" />,
      emoji: '💻',
      title: 'Languages & IDEs',
      desc: 'Development-grade diagnostics in Java, Python, JavaScript, and TypeScript, compiled using IntelliJ IDEA, Eclipse, and PyCharm.',
      tags: ['Java / JS', 'Python / TS', 'IntelliJ & Eclipse'],
      bg: 'from-emerald-50/50 to-teal-50/30'
    },
    {
      num: '06',
      icon: <RefreshCw className="w-6 h-6 text-indigo-600" />,
      emoji: '🔁',
      title: 'Jenkins CI Integration',
      desc: 'Anchor automated QA checkpoints directly inside Jenkins pipelines so every commit triggers a complete verification run.',
      tags: ['Jenkins', 'CI/CD Pipelines', 'POM Execution'],
      bg: 'from-purple-50/50 to-indigo-50/30'
    }
  ];

  // Tech stack tickers array (strictly matching the user's skillset)
  const techLogos = [
    'Selenium', 'Cypress', 'Playwright', 'Cucumber BDD', 'Page Object Model', 'Postman', 'JMeter',
    'Jenkins', 'IntelliJ IDEA', 'Eclipse', 'PyCharm', 'Java', 'JavaScript', 'Python', 'TypeScript'
  ];
  const tickerLogos = [...techLogos, ...techLogos];

  // Process timelines
  const processSteps = [
    {
      num: '01',
      title: 'Discovery Call',
      desc: 'We learn your product, stack, pain points, and release cadence in a free 30-min session.'
    },
    {
      num: '02',
      title: 'QA Strategy',
      desc: 'Custom test plan tailored to your risk areas — scope, tools, types, and timeline defined clearly.'
    },
    {
      num: '03',
      title: 'Execution Sprint',
      desc: 'Manual and automation testing in parallel sprints aligned with your dev cycles.'
    },
    {
      num: '04',
      title: 'Bug Reporting',
      desc: 'Detailed reports with severity, steps to reproduce, screenshots, and fix recommendations.'
    },
    {
      num: '05',
      title: 'Sign-Off & Support',
      desc: 'Final regression pass, release confidence score, and ongoing QA partnership if needed.'
    }
  ];

  return (
    <div className="pt-24 pb-16">
      {/* ==================== 1. HERO SECTION ==================== */}
      <section className="relative px-6 py-12 md:py-20 lg:py-24 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-indigo-200/40 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-72 h-72 rounded-full bg-cyan-200/40 blur-[100px] pointer-events-none" />
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          {/* Left Block */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6 text-left">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/80 border border-indigo-200/50">
              🇨🇦 CANADA-BASED COMPANY · MANUAL & AUTOMATION TESTING
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
              We Hunt <br className="hidden md:inline" />
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">Every Bug.</span>
            </h1>
            <p className="text-lg md:text-xl font-medium text-slate-600 max-w-lg leading-relaxed">
              TestNest Solutions Inc. delivers precision QA — manual expertise meets intelligent automation — so your product ships flawlessly.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button 
                onClick={onOpenAuditModal}
                className="btn btn-primary px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-700 hover:to-cyan-600 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 text-sm cursor-pointer"
              >
                Start Free Audit &rarr;
              </button>
              <a 
                href="#services" 
                className="text-slate-700 hover:text-indigo-600 font-bold text-sm tracking-wide flex items-center gap-1 group transition-colors duration-200"
              >
                See Our Work 
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </div>
          </div>
          
          {/* Right Block: Floating 8D glass dashboard */}
          <div className="lg:col-span-5 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="glass-card w-full rounded-3xl p-6 md:p-8 flex flex-col space-y-6 relative glow-indigo"
            >
              {/* Card top branding */}
              <div className="flex justify-between items-center pb-4 border-b border-slate-200/40">
                <span className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-indigo-600">
                  <Shield className="w-4 h-4 animate-pulse" />
                  QA Core Dashboard
                </span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              
              {/* Counter Grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-8">
                {/* coverage */}
                <div className="flex flex-col space-y-1">
                  <span className="text-3xl font-extrabold text-slate-800 font-sans tracking-tight">
                    <RollingCounter value={100} suffix="%" />
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Test Coverage</span>
                </div>
                
                {/* bugs */}
                <div className="flex flex-col space-y-1">
                  <span className="text-3xl font-extrabold text-slate-800 font-sans tracking-tight text-indigo-600">
                    <RollingCounter value={10000} suffix="+" />
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Bugs Caught</span>
                </div>
                
                {/* releases */}
                <div className="flex flex-col space-y-1">
                  <span className="text-3xl font-extrabold text-slate-800 font-sans tracking-tight">
                    <RollingCounter value={5} suffix="x" />
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Faster Releases</span>
                </div>
                
                {/* bugs prod */}
                <div className="flex flex-col space-y-1">
                  <span className="text-3xl font-extrabold text-emerald-600 font-sans tracking-tight flex items-center gap-1.5">
                    0
                    <Shield className="w-5 h-5 fill-emerald-100 text-emerald-600" />
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Bugs To Prod</span>
                </div>
              </div>
              
              {/* Terminal mock logs at the bottom */}
              <div className="bg-slate-900/90 rounded-2xl p-4 font-mono text-[10px] text-slate-300 space-y-1 text-left">
                <p className="text-indigo-400">testnest$ node scan-diagnostics.js</p>
                <p className="text-emerald-400">✔ Playwright: Parallel execution started (16 threads)</p>
                <p className="text-slate-400">✔ UAT checklists cleared: 142/142 passed</p>
                <p className="text-cyan-400">✔ confidence score: 100% | release approved</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== 2. SERVICES ARSENAL ==================== */}
      <section className="py-20 px-6 bg-white border-y border-slate-200/50" id="services">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-indigo-700 bg-indigo-50 border border-indigo-100">
              Complete QA Arsenal
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              What We Offer
            </h2>
            <p className="text-slate-600 font-medium leading-relaxed">
              Precision testing across all components of your technology suite. We offer unified, sprint-aligned quality benchmarks.
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`glass-card p-8 rounded-3xl flex flex-col items-start text-left border border-slate-200/30 bg-gradient-to-br ${item.bg} hover:shadow-lg transition-all duration-300 relative overflow-hidden group`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-200/10 rounded-full blur-2xl transform translate-x-4 -translate-y-4 group-hover:scale-125 transition-transform duration-300" />
                
                <div className="flex justify-between items-center w-full mb-6">
                  <div className="p-3 bg-white rounded-xl shadow-md border border-slate-100">
                    {item.icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400">{item.num}</span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                  <span>{item.title}</span>
                </h3>
                <p className="text-sm font-medium text-slate-600 leading-relaxed mb-6 flex-grow">
                  {item.desc}
                </p>
                
                <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200/40 w-full">
                  {item.tags.map((tag, tIdx) => (
                    <span 
                      key={tIdx} 
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-500 bg-white shadow-sm border border-slate-200/40"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== INDUSTRY DOMAIN EXPERTISE ==================== */}
      <section className="py-20 px-6 bg-[#F4F7FA] border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-indigo-700 bg-indigo-50 border border-indigo-100">
              Targeted Verticals
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              Multi-Domain QA Industry Expertise
            </h2>
            <p className="text-slate-600 font-medium leading-relaxed">
              We understand that testing parameters change by industry. TestNest features deep subject-matter knowledge across critical business sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fintech & Banking */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass-card p-8 rounded-3xl flex flex-col items-start text-left border border-slate-200/30 bg-white hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-200/10 rounded-full blur-2xl transform translate-x-4 -translate-y-4 group-hover:scale-125 transition-transform duration-300" />
              
              <div className="flex justify-between items-center w-full mb-6">
                <div className="p-3 bg-emerald-50 rounded-xl shadow-md border border-emerald-100/50 text-emerald-600">
                  <Coins className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs font-bold text-slate-400">01</span>
              </div>
              
              <h3 className="text-lg font-black text-slate-800 mb-3">
                Fintech & Core Banking
              </h3>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed mb-6">
                Assuring high-frequency transactional data models, ledger balances, secure dynamic authentication token bindings, and API gateway routing under peak concurrent threads.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 w-full mt-auto">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100/50">LEDGER INTEGRITY</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200/40">JWT SEC</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200/40">REST APIs</span>
              </div>
            </motion.div>

            {/* Finance & Insurance */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass-card p-8 rounded-3xl flex flex-col items-start text-left border border-slate-200/30 bg-white hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-200/10 rounded-full blur-2xl transform translate-x-4 -translate-y-4 group-hover:scale-125 transition-transform duration-300" />
              
              <div className="flex justify-between items-center w-full mb-6">
                <div className="p-3 bg-indigo-50 rounded-xl shadow-md border border-indigo-100/50 text-indigo-600">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs font-bold text-slate-400">02</span>
              </div>
              
              <h3 className="text-lg font-black text-slate-800 mb-3">
                Finance & Insurance
              </h3>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed mb-6">
                Validating complex policy calculation matrices, automated claims routing criteria, actuarial rules parameters, and secure customer portal workflows for zero compliance risk.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 w-full mt-auto">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100/50">CLAIMS ROUTING</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200/40">COMPLIANCE</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200/40">CALC MATRICES</span>
              </div>
            </motion.div>

            {/* Retail & E-commerce */}
            <motion.div
              whileHover={{ y: -6, scale: 1.01 }}
              className="glass-card p-8 rounded-3xl flex flex-col items-start text-left border border-slate-200/30 bg-white hover:shadow-lg transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-200/10 rounded-full blur-2xl transform translate-x-4 -translate-y-4 group-hover:scale-125 transition-transform duration-300" />
              
              <div className="flex justify-between items-center w-full mb-6">
                <div className="p-3 bg-cyan-50 rounded-xl shadow-md border border-cyan-100/50 text-cyan-600">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <span className="font-mono text-xs font-bold text-slate-400">03</span>
              </div>
              
              <h3 className="text-lg font-black text-slate-800 mb-3">
                Retail & E-commerce
              </h3>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed mb-6">
                Testing critical customer checkout journeys, shopping cart state persistence, localized dynamic taxation logic, promo code combinations, and stock thresholds syncs.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 w-full mt-auto">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-cyan-700 bg-cyan-50 border border-cyan-100/50">CHECKOUT FLOW</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200/40">CART BINDINGS</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-slate-500 bg-slate-50 border border-slate-200/40">PROMO ENGINES</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== 3. TECH STACK SHOWCASE ==================== */}
      <section className="py-16 px-6 bg-slate-50 overflow-hidden border-b border-slate-200/50" id="tech">
        <div className="max-w-6xl mx-auto mb-10 text-center">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-indigo-700 bg-indigo-50 border border-indigo-100 mb-3">
            Engineered Tooling
          </span>
          <h2 className="text-xl font-extrabold text-slate-700 tracking-widest uppercase">Our Tech Stack</h2>
        </div>
        
        {/* Infinite Scrolling Ticker */}
        <div className="ticker-wrap w-full py-4 relative">
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />
          
          <div className="ticker-content flex items-center">
            {tickerLogos.map((logo, index) => (
              <div 
                key={index}
                className="px-6 py-3 rounded-2xl bg-white shadow-sm border border-slate-200/50 text-slate-700 font-bold text-sm tracking-wide font-mono inline-flex items-center gap-2 hover:border-indigo-300 hover:text-indigo-600 transition-all duration-300 cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 4. HOW IT WORKS (TIMELINE) ==================== */}
      <section className="py-20 px-6 bg-white border-b border-slate-200/50" id="process">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-indigo-700 bg-indigo-50 border border-indigo-100">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
              How It Works
            </h2>
            <p className="text-slate-600 font-bold text-sm uppercase tracking-wide">
              From first call to flawless launch
            </p>
          </div>
          
          {/* Vertical timeline */}
          <div className="space-y-6 text-left relative before:absolute before:top-2 before:bottom-2 before:left-[39px] before:w-[2px] before:bg-indigo-100">
            {processSteps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-card p-6 md:p-8 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start relative border border-slate-200/40 hover:border-indigo-200 hover:shadow-md transition-all duration-300"
              >
                {/* Timeline circle overlay */}
                <div className="md:col-span-2 flex items-center justify-start md:justify-center">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white font-extrabold text-lg flex items-center justify-center shadow-md relative z-10">
                    {step.num}
                  </div>
                </div>
                
                {/* Description details */}
                <div className="md:col-span-10 flex flex-col space-y-2">
                  <h3 className="text-xl font-bold text-slate-800">{step.title}</h3>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 5. CONTACT / ABOUT CTA SECTION ==================== */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="glass-card rounded-3xl p-8 md:p-12 border border-slate-200/60 bg-gradient-to-br from-white to-indigo-50/20 shadow-xl flex flex-col items-center text-center space-y-8 relative glow-indigo overflow-hidden"
          >
            {/* Design circle graphics */}
            <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-indigo-300/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full bg-cyan-300/10 blur-3xl pointer-events-none" />
            
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-indigo-700 bg-indigo-100 border border-indigo-200/50">
                Direct Contact Card
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight">
                Ready to ship bug-free?
              </h2>
              <p className="text-slate-600 font-medium max-w-md mx-auto">
                Free 30-minute consultation. No commitment. Just honest QA advice for your project.
              </p>
            </div>
            
            <a 
              href="mailto:anshulsharma9366@gmail.com?subject=TestNest QA Consultation Consultation Inquiry&body=Hi Anshul,%0D%0A%0D%0AI would like to schedule our 30-minute free QA discovery session to audit my application."
              className="btn btn-primary px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/20 transform hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 cursor-pointer text-sm"
            >
              Book Call &rarr;
            </a>
            
            <div className="flex flex-wrap items-stretch justify-center gap-6 w-full pt-8 border-t border-slate-200/60 text-left">
              {/* Email */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/40 flex items-start gap-3 shadow-sm group flex-grow flex-shrink-0 min-w-[280px]">
                <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Directly</span>
                  <a href="mailto:anshulsharma9366@gmail.com" className="block text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors duration-200">
                    anshulsharma9366@gmail.com
                  </a>
                </div>
                <button 
                  onClick={() => onCopy('anshulsharma9366@gmail.com', 'email')}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 rounded-lg cursor-pointer transition-all"
                  title="Copy email address"
                >
                  {copiedState.email ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              
              {/* Phone */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/40 flex items-start gap-3 shadow-sm group flex-grow flex-shrink-0 min-w-[240px]">
                <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Direct Call</span>
                  <a href="tel:+14379822044" className="block text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors duration-200">
                    437-982-2044
                  </a>
                </div>
                <button 
                  onClick={() => onCopy('4379822044', 'phone')}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 rounded-lg cursor-pointer transition-all"
                  title="Copy phone number"
                >
                  {copiedState.phone ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              
              {/* LinkedIn */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/40 flex items-start gap-3 shadow-sm group flex-grow flex-shrink-0 min-w-[340px]">
                <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <div className="flex-grow">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">LinkedIn Connect</span>
                  <a href="https://www.linkedin.com/in/anshul1555/" target="_blank" rel="noopener noreferrer" className="block text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors duration-200">
                    https://www.linkedin.com/in/anshul1555/
                  </a>
                </div>
                <button 
                  onClick={() => onCopy('https://www.linkedin.com/in/anshul1555/', 'linkedin')}
                  className="p-1.5 text-slate-400 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 rounded-lg cursor-pointer transition-all"
                  title="Copy LinkedIn Link"
                >
                  {copiedState.linkedin ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Location */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200/40 flex items-start gap-3 shadow-sm flex-grow flex-shrink-0 min-w-[240px]">
                <div className="p-2.5 bg-indigo-50 rounded-xl text-indigo-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">HQ Office</span>
                  <span className="block text-xs font-bold text-slate-700">Ontario, Canada</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
