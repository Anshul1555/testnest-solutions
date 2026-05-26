import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Check, Copy, Mail, Phone, MapPin, 
  ShieldCheck, ArrowRight, Shield, Award, HelpCircle,
  ExternalLink
} from 'lucide-react';
import Home from './components/Home';
import Automation from './components/Automation';
import Manual from './components/Manual';
import Reporting from './components/Reporting';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); // home, automation, manual
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [copiedState, setCopiedState] = useState({ email: false, phone: false, linkedin: false });
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll effect on Header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Copy to clipboard tool
  const handleCopyText = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      setToastMessage(`Copied ${type === 'email' ? 'Email Address' : 'Phone Number'} successfully!`);
      setCopiedState(prev => ({ ...prev, [type]: true }));
      setTimeout(() => {
        setCopiedState(prev => ({ ...prev, [type]: false }));
      }, 2000);
      
      // Auto clear toast
      setTimeout(() => {
        setToastMessage('');
      }, 3500);
    }).catch(err => {
      setToastMessage(`Failed to copy. Please manually select: ${text}`);
      setTimeout(() => setToastMessage(''), 4000);
    });
  };

  // Safe Section Scrolling Helper
  const handleNavClick = (sectionId) => {
    setIsMobileMenuOpen(false);
    
    if (currentPage !== 'home') {
      setCurrentPage('home');
      // Wait for page state switch, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Free Audit Form Handler
  const handleAuditSubmit = (e) => {
    e.preventDefault();
    const name = e.target.auditName.value.trim();
    const email = e.target.auditEmail.value.trim();
    const website = e.target.auditWebsite.value.trim();
    const message = e.target.auditMessage.value.trim() || 'No specifics';

    if (!name || !email || !website) {
      setToastMessage('Please complete all required fields.');
      setTimeout(() => setToastMessage(''), 3000);
      return;
    }

    const subject = `TestNest QA Free Audit Request - ${website}`;
    const body = `Hi Anshul Sharma,

Please perform a comprehensive quality & speed diagnostics run on our software environment. Here are our project specifications:

- Target URL/Website: ${website}
- Business Contact: ${name} (${email})
- Target Focus Details: ${message}

Thank you, and I look forward to receiving our custom diagnostics report.

Regards,
${name}
`;

    const mailto = `mailto:anshulsharma9366@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    
    setToastMessage('Audit request compiled. Redirecting to mail client...');
    setIsAuditModalOpen(false);
    e.target.reset();
    setTimeout(() => setToastMessage(''), 4000);
  };

  return (
    <div className="bg-[#F4F7FA] min-h-screen text-slate-800 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      
      {/* ==================== 1. GLASS HEADER NAVIGATION ==================== */}
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm' 
          : 'py-5 bg-transparent'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <button 
            onClick={() => { setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center gap-2 text-xl font-extrabold text-slate-900 tracking-tight cursor-pointer hover:opacity-90"
          >
            <img src="./logo.png" className="h-8 w-8 object-contain rounded-lg shadow-sm" alt="TestNest Logo" />
            <span>TestNest</span>
          </button>
          
          {/* Desktop Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => handleNavClick('services')} className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-indigo-600 transition-colors duration-200 cursor-pointer">SERVICES</button>
            <button onClick={() => handleNavClick('process')} className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-indigo-600 transition-colors duration-200 cursor-pointer">PROCESS</button>
            <button onClick={() => handleNavClick('contact')} className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-indigo-600 transition-colors duration-200 cursor-pointer">CONTACT</button>
            
            {/* Page tabs */}
            <span className="h-4 w-[1px] bg-slate-300" />
            
            <button 
              onClick={() => { setCurrentPage('automation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                currentPage === 'automation' ? 'text-indigo-600 underline underline-offset-4 decoration-2 font-black' : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              AUTOMATION
            </button>
            
            <button 
              onClick={() => { setCurrentPage('manual'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                currentPage === 'manual' ? 'text-indigo-600 underline underline-offset-4 decoration-2 font-black' : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              MANUAL
            </button>

            <button 
              onClick={() => { setCurrentPage('reporting'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
              className={`text-xs font-bold uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
                currentPage === 'reporting' ? 'text-indigo-600 underline underline-offset-4 decoration-2 font-black' : 'text-slate-600 hover:text-indigo-600'
              }`}
            >
              REPORTING
            </button>
          </nav>
          
          {/* CTA header button */}
          <div className="hidden md:flex items-center">
            <motion.button 
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsAuditModalOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-indigo-100 hover:border-indigo-200 text-indigo-700 font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all duration-300"
            >
              Get a Free Audit
            </motion.button>
          </div>
          
          {/* Mobile menu toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5 text-slate-800" />
          </button>
        </div>
      </header>

      {/* ==================== 2. MOBILE MENU DRAWER OVERLAY ==================== */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-45"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-white z-50 p-6 flex flex-col justify-between border-l border-slate-200/50 shadow-2xl"
            >
              <div className="space-y-8 text-left">
                <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <span className="flex items-center gap-2 text-lg font-extrabold text-slate-900">
                    <img src="./logo.png" className="h-7 w-7 object-contain rounded-md" alt="TestNest Logo" />
                    TestNest
                  </span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                    <X className="w-4 h-4 text-slate-600" />
                  </button>
                </div>
                
                <nav className="flex flex-col space-y-4">
                  <button onClick={() => handleNavClick('services')} className="text-sm font-bold uppercase tracking-wider text-slate-600 hover:text-indigo-600 text-left py-2 border-b border-slate-50">Services</button>
                  <button onClick={() => handleNavClick('process')} className="text-sm font-bold uppercase tracking-wider text-slate-600 hover:text-indigo-600 text-left py-2 border-b border-slate-50">Process</button>
                  <button onClick={() => handleNavClick('contact')} className="text-sm font-bold uppercase tracking-wider text-slate-600 hover:text-indigo-600 text-left py-2 border-b border-slate-50">Contact</button>
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('automation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`text-sm font-bold uppercase tracking-wider text-left py-2 border-b border-slate-50 ${currentPage === 'automation' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
                  >
                    Automation Testing
                  </button>
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('manual'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`text-sm font-bold uppercase tracking-wider text-left py-2 border-b border-slate-50 ${currentPage === 'manual' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
                  >
                    Manual Testing
                  </button>
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); setCurrentPage('reporting'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`text-sm font-bold uppercase tracking-wider text-left py-2 border-b border-slate-50 ${currentPage === 'reporting' ? 'text-indigo-600' : 'text-slate-600 hover:text-indigo-600'}`}
                  >
                    Quality Reporting
                  </button>
                </nav>
              </div>
              
              <button 
                onClick={() => { setIsMobileMenuOpen(false); setIsAuditModalOpen(true); }}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-lg cursor-pointer"
              >
                Get a Free Audit
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ==================== 3. FLOATING ACTION TOASTS ==================== */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-bold font-sans border border-slate-800"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================== 4. CENTRAL VIEW PORT & STATE ROUTER ==================== */}
      <main>
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div 
              key="home" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Home 
                onOpenAuditModal={() => setIsAuditModalOpen(true)} 
                setActiveTab={setCurrentPage}
                onCopy={handleCopyText}
                copiedState={copiedState}
              />
            </motion.div>
          )}
          {currentPage === 'automation' && (
            <motion.div 
              key="automation" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Automation onOpenAuditModal={() => setIsAuditModalOpen(true)} />
            </motion.div>
          )}
          {currentPage === 'manual' && (
            <motion.div 
              key="manual" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Manual onOpenAuditModal={() => setIsAuditModalOpen(true)} />
            </motion.div>
          )}
          {currentPage === 'reporting' && (
            <motion.div 
              key="reporting" 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Reporting onOpenAuditModal={() => setIsAuditModalOpen(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ==================== 5. GET FREE AUDIT MODAL DIALOG ==================== */}
      <AnimatePresence>
        {isAuditModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAuditModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-45"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="fixed inset-x-6 top-10 max-h-[85vh] md:max-h-none md:top-24 mx-auto max-w-lg bg-white rounded-3xl z-50 p-6 md:p-8 flex flex-col border border-slate-200/50 shadow-2xl overflow-y-auto"
            >
              <div className="flex justify-between items-center pb-4 border-b border-slate-100 mb-6 text-left">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-800">Get a Free QA Audit</h2>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">TestNest solutions inc.</p>
                </div>
                <button onClick={() => setIsAuditModalOpen(false)} className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <X className="w-4 h-4 text-slate-600" />
                </button>
              </div>
              
              <form onSubmit={handleAuditSubmit} className="space-y-4 text-left font-sans">
                <div className="flex flex-col space-y-1">
                  <label htmlFor="auditName" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                  <input type="text" id="auditName" className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-medium focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200" placeholder="Sarah Mercer" required />
                </div>
                
                <div className="flex flex-col space-y-1">
                  <label htmlFor="auditEmail" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Work Email</label>
                  <input type="email" id="auditEmail" className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-medium focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200" placeholder="sarah@saaslabs.com" required />
                </div>
                
                <div className="flex flex-col space-y-1">
                  <label htmlFor="auditWebsite" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Application Website URL</label>
                  <input type="url" id="auditWebsite" className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-medium focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200" placeholder="https://app.saaslabs.com" required />
                </div>
                
                <div className="flex flex-col space-y-1">
                  <label htmlFor="auditMessage" className="text-xs font-bold text-slate-500 uppercase tracking-wider">Target Focus details (Optional)</label>
                  <textarea id="auditMessage" rows="3" className="px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-sm font-medium focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 resize-none" placeholder="Performance load checkpoints, Cypress E2E coverage, responsive structural alignment..."></textarea>
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-4.5 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-extrabold text-xs tracking-wider uppercase rounded-xl shadow-lg cursor-pointer hover:shadow-indigo-500/10 transition-all duration-300 mt-2"
                >
                  Submit Audit Request &rarr;
                </button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ==================== 6. FOOTER ==================== */}
      <footer className="bg-slate-900 text-slate-400 py-16 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800 mb-10 text-left">
          {/* Brand block */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-xl font-extrabold text-white tracking-tight">
              <img src="./logo.png" className="h-8 w-8 object-contain rounded-lg" alt="TestNest Logo" />
              <span>TestNest Solutions Inc.</span>
            </div>
            <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-sm">
              TestNest Solutions Inc. delivers precision IT Quality Assurance. Manual expertise meets intelligent automated DevOps checkpoints so your product ships flawlessly.
            </p>
          </div>
          
          {/* Quick Resources */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Direct Resources</h4>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><button onClick={() => handleNavClick('services')} className="hover:text-white transition-colors duration-200 cursor-pointer">SERVICES</button></li>
              <li><button onClick={() => handleNavClick('process')} className="hover:text-white transition-colors duration-200 cursor-pointer">PROCESS</button></li>
              <li><button onClick={() => { setCurrentPage('automation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors duration-200 cursor-pointer">AUTOMATION</button></li>
              <li><button onClick={() => { setCurrentPage('manual'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors duration-200 cursor-pointer">MANUAL</button></li>
              <li><button onClick={() => { setCurrentPage('reporting'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors duration-200 cursor-pointer">REPORTING</button></li>
            </ul>
          </div>
          
          {/* HQ Location Details */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">Direct Contacts</h4>
            <div className="space-y-2.5 text-sm font-medium">
              <p className="font-mono text-slate-400">
                <span className="text-slate-500 uppercase tracking-widest text-[9px] block font-sans font-bold mb-0.5">Email Directly</span>
                <a href="mailto:anshulsharma9366@gmail.com" className="hover:text-white transition-colors duration-200 select-all text-xs font-bold">anshulsharma9366@gmail.com</a>
              </p>
              <p className="font-mono text-slate-400">
                <span className="text-slate-500 uppercase tracking-widest text-[9px] block font-sans font-bold mb-0.5">Direct Call</span>
                <a href="tel:+14379822044" className="hover:text-white transition-colors duration-200 text-xs font-bold">437-982-2044</a>
              </p>
              <p className="text-slate-400 flex items-center gap-1.5 pt-1 text-xs font-bold">
                <svg className="w-3.5 h-3.5 fill-slate-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <a href="https://www.linkedin.com/in/anshul1555/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                  linkedin.com/in/anshul1555
                </a>
                <span className="text-slate-600 font-sans font-medium">· Ontario, Canada</span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer bottom */}
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-medium text-slate-600">
          <span>© 2026 TestNest Solutions Inc. All rights reserved.</span>
          <div className="flex items-center space-x-6">
            <a href="https://www.linkedin.com/in/anshul1555/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-400 flex items-center gap-1">
              LinkedIn 
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
