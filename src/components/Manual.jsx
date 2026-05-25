import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, BookOpen, AlertCircle, FileText, CheckCircle2, 
  Terminal, ShieldCheck, HelpCircle, ToggleLeft, ToggleRight,
  ChevronDown, MessageSquareCode, Layers, Info
} from 'lucide-react';

export default function Manual({ onOpenAuditModal }) {
  // Test case steps in clean Gherkin Syntax
  const initialSteps = [
    {
      step: 1,
      action: "Navigate to the base secure application route environment.",
      expected: "The application landing viewport/login gateway loads securely over HTTPS.",
      actualPass: true
    },
    {
      step: 2,
      action: "Input valid corporate credentials into the fields and execute submission.",
      expected: "API returns an authentication response containing a signed JSON Web Token (JWT) payload.",
      actualPass: true
    },
    {
      step: 3,
      action: "Intercept the network traffic and alter the signature payload of the returning JWT token string.",
      expected: "The corrupted local authorization token is cached in the browser's context.",
      actualPass: true
    },
    {
      step: 4,
      action: "Attempt to route access into the protected billing dashboard page.",
      expected: "System flags the altered signature instantly, invalidates the local storage token block, and redirects safely back to the route with a 401 Unauthorized log trace message.",
      actualPass: true // Users can toggle this to false to trigger the bug!
    }
  ];

  const [steps, setSteps] = useState(initialSteps);
  const [activeStepTab, setActiveStepTab] = useState(1);
  const [activeStepAccordion, setActiveStepAccordion] = useState(null);

  // Toggle step actual result status
  const handleToggleStep = (stepNumber) => {
    setSteps(prev => prev.map(s => {
      if (s.step === stepNumber) {
        return { ...s, actualPass: !s.actualPass };
      }
      return s;
    }));
  };

  // Check if any step is currently set as failed/anomaly
  const hasBugAnomaly = steps.some(s => !s.actualPass);

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#F4F7FA]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* ==================== 1. HERO SECTION ==================== */}
        <section className="text-center py-12 md:py-16 space-y-6 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/80 border border-indigo-200/50">
            <BookOpen className="w-4 h-4 text-indigo-600 animate-pulse" />
            Quality Assurance Engineering
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-800 leading-tight">
            Human Intelligence. <br />
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Analytical Precision.</span>
          </h1>
          <p className="text-base md:text-lg font-medium text-slate-600 leading-relaxed">
            Because automated scripts only check what they are told to see. We think like users and break things with purpose.
          </p>
        </section>

        {/* ==================== WHY WE TEST & GHERKIN INTRO CARDS ==================== */}
        <section className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Why We Test Card */}
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200/40 bg-white text-left space-y-4 shadow-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-200/10 rounded-full blur-2xl transform translate-x-4 -translate-y-4 group-hover:scale-125 transition-transform duration-300" />
            <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
              <span className="p-2 bg-indigo-50 rounded-xl text-indigo-600">🛡️</span>
              Why We Test
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">The Quality Imperative</p>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              We test to guarantee absolute business continuity and prevent catastrophic financial or reputational leaks before deployment. Rigorous QA establishes the release confidence your team needs to scale securely, ensuring software behaves with absolute accuracy.
            </p>
          </div>

          {/* Gherkin Card */}
          <div className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200/40 bg-white text-left space-y-4 shadow-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-200/10 rounded-full blur-2xl transform translate-x-4 -translate-y-4 group-hover:scale-125 transition-transform duration-300" />
            <h3 className="text-lg font-extrabold text-slate-800 flex items-center gap-2">
              <span className="p-2 bg-cyan-50 rounded-xl text-cyan-600">🔬</span>
              Gherkin-Style Legibility
            </h3>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Accessible Specifications</p>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              We write our test cases in highly understandable, human-readable Gherkin syntax (<strong className="text-indigo-600">Given-When-Then</strong>). This establishes a transparent blueprint so that <strong className="text-slate-800">anyone</strong> — from non-technical founders to product managers and engineers — can instantly audit the application's functionality.
            </p>
          </div>
        </section>

        {/* ==================== 2. INTERACTIVE TEST CASE VIEW ==================== */}
        <section className="py-8 space-y-8">
          <div className="text-left max-w-2xl">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Interactive Test Case Viewer</h2>
            <h3 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">Enterprise Spec: TN-AUTH-042</h3>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Metadata Card (Left 4 Columns) */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/40 shadow-sm flex flex-col space-y-6 text-left">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <span className="font-mono text-xs font-bold text-slate-400">Blueprint Specs</span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-100">Priority: High</span>
              </div>
              
              <div className="space-y-4 text-xs font-medium text-slate-600">
                <div>
                  <span className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Test Case ID</span>
                  <span className="text-sm font-extrabold text-indigo-600 font-mono">TN-AUTH-042</span>
                </div>

                <div>
                  <span className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Module Area</span>
                  <span className="text-sm font-bold text-slate-800">User Access & JWT Token Management</span>
                </div>

                <div>
                  <span className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">Execution Parameters</span>
                  <div className="flex gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-slate-50 border border-slate-200/60 rounded text-[10px] font-bold text-slate-600">Functional</span>
                    <span className="px-2 py-0.5 bg-slate-50 border border-slate-200/60 rounded text-[10px] font-bold text-slate-600">Regression</span>
                  </div>
                </div>
                
                <div>
                  <span className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-2">Pre-conditions Table</span>
                  <div className="border border-slate-100 rounded-xl overflow-hidden text-[11px] bg-slate-50/50">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 font-bold text-slate-500">
                          <th className="p-2 w-8">#</th>
                          <th className="p-2">Condition Statement</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                        <tr>
                          <td className="p-2 text-slate-400 font-mono">01</td>
                          <td className="p-2 leading-relaxed">User has an active, valid registered corporate profile in the database.</td>
                        </tr>
                        <tr>
                          <td className="p-2 text-slate-400 font-mono">02</td>
                          <td className="p-2 leading-relaxed">Browser session storage and dynamic session tokens are fully cleared.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div>
                  <span className="block text-[10px] font-bold uppercase text-slate-400 tracking-wider mb-1">QA Architect Lead</span>
                  <span className="text-sm font-bold text-slate-800">Anshul Sharma</span>
                </div>
              </div>
              
              <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50 text-xs text-indigo-700 space-y-2 font-medium">
                <p className="font-bold flex items-center gap-1.5">
                  <Info className="w-4 h-4" />
                  Interactive Simulator
                </p>
                <p className="text-[11px] leading-relaxed">
                  Toggle step actual status buttons on the right to simulate finding a bug. An automated bug report will compile instantly below!
                </p>
              </div>
            </div>

            {/* Step execution details (Right 8 Columns) */}
            <div className="lg:col-span-8 space-y-4">
              {steps.map((s) => (
                <div 
                  key={s.step}
                  className={`bg-white rounded-2xl p-5 md:p-6 border transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left ${
                    s.actualPass 
                      ? 'border-slate-200/50 shadow-sm' 
                      : 'border-red-200 bg-red-50/10 shadow-md ring-1 ring-red-100/50'
                  }`}
                >
                  <div className="flex-grow space-y-3 max-w-xl">
                    <div className="flex items-center gap-2.5">
                      <span className="h-6 w-6 rounded-lg bg-indigo-50 border border-indigo-100 font-mono text-xs font-bold text-indigo-600 flex items-center justify-center">
                        {s.step}
                      </span>
                      <h4 className="font-bold text-sm text-slate-700">Action Script Step</h4>
                    </div>
                    
                    <div className="text-xs space-y-1.5 pl-8 font-medium">
                      <p className="text-slate-600 leading-relaxed"><strong className="text-slate-700">Execution:</strong> {s.action}</p>
                      <p className="text-slate-500 leading-relaxed"><strong className="text-slate-700">Expected Result:</strong> {s.expected}</p>
                    </div>
                  </div>
                  
                  {/* Status Toggle Switch */}
                  <div className="pl-8 md:pl-0 flex flex-col items-start md:items-end justify-center space-y-2 min-w-[140px]">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Actual Result</span>
                    <button
                      onClick={() => handleToggleStep(s.step)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all duration-300 w-full cursor-pointer justify-between ${
                        s.actualPass
                          ? 'text-emerald-700 bg-emerald-50 border-emerald-200/60 hover:bg-emerald-100/50'
                          : 'text-red-700 bg-red-50 border-red-200/60 hover:bg-red-100/50'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        <span className={`h-1.5 w-1.5 rounded-full ${s.actualPass ? 'bg-emerald-500 animate-pulse' : 'bg-red-500 animate-ping'}`} />
                        {s.actualPass ? 'Passes Expected' : 'Bug Anomaly'}
                      </span>
                      {s.actualPass ? <ToggleRight className="w-5 h-5 text-emerald-600" /> : <ToggleLeft className="w-5 h-5 text-red-600" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ==================== 3. DEFECT REPORTING SIMULATOR ==================== */}
        <section className="py-8">
          <AnimatePresence mode="wait">
            {!hasBugAnomaly ? (
              <motion.div 
                key="nobug"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-indigo-50 border border-indigo-100 rounded-3xl p-8 text-center max-w-2xl mx-auto space-y-4"
              >
                <div className="inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm text-indigo-600 border border-slate-100">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800">Unified Release Approvals Satisfied</h3>
                <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-md mx-auto">
                  All interactive actions match exact expected behaviors. Toggle step 4 above to 'Bug Anomaly' to trigger our high-fidelity Defect Ticket simulator!
                </p>
              </motion.div>
            ) : (
              <motion.div 
                key="bugfound"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card rounded-3xl overflow-hidden border border-red-200/60 shadow-xl bg-white max-w-3xl mx-auto text-left"
              >
                {/* Ticket Top bar */}
                <div className="bg-red-50 px-6 py-4 flex items-center justify-between border-b border-red-100 font-sans">
                  <div className="flex items-center space-x-2">
                    <ShieldAlert className="w-5 h-5 text-red-600 animate-bounce" />
                    <span className="font-extrabold text-sm text-red-700 font-sans">Critical Production Defect Report Generated</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-red-600/70">JIRA TICKET: TN-BUG-094</span>
                </div>
                
                {/* Ticket Content */}
                <div className="p-6 md:p-8 space-y-6">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Defect Title Block</span>
                    <h4 className="text-lg font-extrabold text-slate-800 leading-snug">
                      [BUG] [CRITICAL] Checkout Session Token Expiry Causes Database Connection Pool Saturation
                    </h4>
                  </div>
                  
                  {/* Metadata Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-slate-600">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-between">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Environment Payload</span>
                      <span className="text-slate-700 leading-relaxed">OS: Linux/Chrome Enterprise Ver 124.0.0, Tier: Staging-Env-02</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-between">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Reporter</span>
                      <span className="text-slate-700">TestNest Analytics Suite</span>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 flex flex-col justify-between">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Priority & Severity</span>
                      <span className="text-red-600 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                        CRITICAL / BLOCKER
                      </span>
                    </div>
                  </div>
                  
                  {/* Reproducible steps Accordion */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Steps to Reproduce (Click steps to expand details)</span>
                    <div className="space-y-2">
                      {[
                        {
                          title: "1. User Authentication Checkpoint",
                          details: "Authenticate into the enterprise gateway staging portal using valid corporate credentials, and initialize a new active checkout session viewport."
                        },
                        {
                          title: "2. Induce Expiry Threshold",
                          details: "Force the session idle threshold to exceed 15 minutes, or manually trigger the checkout auth session token to transition to an EXPIRED state."
                        },
                        {
                          title: "3. Initiate Batch Checkout Transaction",
                          details: "Submit a high-volume batch checkout transaction payload, forcing the application to call the session validator middleware repeatedly."
                        },
                        {
                          title: "4. Observe Database Connection Leak",
                          details: "Inspect internal database pooling logs. Witness the active connection threads scaling exponentially (10, 50, 100, 150+) without closing older connections."
                        },
                        {
                          title: "5. Critical System Crash",
                          details: "The database connection pool hits 100% saturation. The server experiences a fatal JVM OutOfMemory exception and completely crashes."
                        }
                      ].map((repStep, repIdx) => {
                        const isOpen = activeStepAccordion === repIdx;
                        return (
                          <div 
                            key={repIdx}
                            className="border border-slate-200/60 rounded-xl overflow-hidden bg-slate-50/50 hover:bg-slate-50 transition-colors"
                          >
                            <button
                              type="button"
                              onClick={() => setActiveStepAccordion(isOpen ? null : repIdx)}
                              className="w-full px-4 py-3 flex items-center justify-between text-left font-bold text-xs text-slate-700 hover:text-indigo-600 transition-colors"
                            >
                              <span>{repStep.title}</span>
                              <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${isOpen ? 'rotate-180 text-indigo-500' : ''}`} />
                            </button>
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="px-4 pb-3 text-xs font-medium text-slate-500 leading-relaxed border-t border-slate-200/50 pt-2"
                                >
                                  {repStep.details}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  {/* Console Payload Logs */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block font-sans">Diagnostic Log Section (Heap Error Stack Trace)</span>
                    <div className="bg-slate-900 rounded-xl p-4 font-mono text-[11px] text-red-400 overflow-x-auto space-y-1.5 leading-relaxed text-left border border-slate-800">
                      <p className="text-slate-400 font-bold">[23:54:45.012] [SYSTEM CRITICAL] java.lang.OutOfMemoryError: Java heap space</p>
                      <p className="text-red-400/90 pl-4">at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1136)</p>
                      <p className="text-red-400/90 pl-4">at java.base/java.lang.Thread.run(Thread.java:840)</p>
                      <p className="text-slate-400 font-bold">[23:54:45.188] [DB CONNECTION ERROR] connection pool pool-checkout-auth active limit reached</p>
                      <p className="text-slate-500 pl-4">Details: Active connections: 150, Idle: 0, Max Limit: 150 (SATURATED)</p>
                      <p className="text-cyan-400 font-semibold">[23:54:45.201] [FATAL MONITOR] Database connection pool saturation triggered by checkout token expiration loop.</p>
                    </div>
                  </div>
                  
                  {/* Suggested fix */}
                  <div className="p-4 bg-indigo-50 border border-indigo-100/50 rounded-2xl space-y-2 text-xs text-indigo-800 font-medium">
                    <span className="font-bold flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                      <MessageSquareCode className="w-4 h-4" />
                      Suggested Engineering Fix
                    </span>
                    <p className="leading-relaxed">
                      Modify the auth-listener middleware to catch temporary socket dropouts. Implement verification caching checks (e.g. browserIndexedDB or memory session parameters) before enforcing full token purging exceptions.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* CTA */}
        <section className="pt-12 text-center">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="glass-card rounded-3xl p-8 border border-slate-200/50 text-center max-w-2xl mx-auto space-y-6 glow-indigo bg-white"
          >
            <h3 className="text-2xl font-extrabold text-slate-800">Ensure human logic backs your code</h3>
            <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-md mx-auto">
              Our manual QA specialists are experts in analytical precision, visual responsiveness checking, and writing rigorous test plans.
            </p>
            <div className="flex items-center justify-center pt-2">
              <button 
                onClick={onOpenAuditModal}
                className="btn btn-primary px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md cursor-pointer text-sm w-full sm:w-auto"
              >
                Request Exploratory Audit &rarr;
              </button>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
