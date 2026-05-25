import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, ShieldCheck, CheckCircle2, XCircle, AlertTriangle, 
  Clock, Server, ChevronDown, RefreshCw, FileText, Download,
  ExternalLink, Eye, Info, Bug, Sparkles, Brain, ArrowRight, GitPullRequest
} from 'lucide-react';

export default function Reporting({ onOpenAuditModal }) {
  const [activeReportTab, setActiveReportTab] = useState('pipeline'); // pipeline, manual
  const [expandedFailId, setExpandedFailId] = useState('checkout-api');
  const [selectedBugStep, setSelectedBugStep] = useState(0);

  // Bug Reporting Lifecycle flowchart steps
  const bugSteps = [
    {
      title: "1. Detect & Capture",
      short: "Automated test errors trigger immediate notifications and alert telemetry systems.",
      icon: <Bug className="w-5 h-5 text-red-600" />,
      color: "border-red-150 bg-red-50 text-red-800",
      badge: "Detection Phase",
      description: "When an automated regression pipeline run fails in Jenkins or GitHub Actions, our systems immediately fire instant Slack, MS Teams, and email notifications to the QA and developer teams with precise failure logs.",
      details: "No manual polling or delayed emails. The moment an assertion drops, all telemetry capture mechanisms start instantly, compiling screenshots and environment traces."
    },
    {
      title: "2. Screenshot & Log Enrichment",
      short: "Every report automatically embeds high-resolution screenshots and execution logs for easy debugging.",
      icon: <Brain className="w-5 h-5 text-indigo-600" />,
      color: "border-indigo-150 bg-indigo-50 text-indigo-800",
      badge: "Diagnostic Enrichment",
      description: "Our framework automatically captures high-resolution browser viewport screenshots, network trace logs, full DOM tree state snapshots, and detailed system execution logs, embedding them directly into the test report.",
      details: "Reduces initial developer debugging overhead by 85%. Instead of trying to guess what went wrong, developers have complete screenshots and line-by-line runtime execution logs grouped for easy debugging."
    },
    {
      title: "3. JIRA Ticket Compilation",
      short: "A comprehensive JIRA bug ticket is auto-created with all screenshots, logs, and trace assets attached.",
      icon: <FileText className="w-5 h-5 text-cyan-600" />,
      color: "border-cyan-150 bg-cyan-50 text-cyan-800",
      badge: "JIRA Synchronization",
      description: "A highly-detailed JIRA bug story (e.g. TN-BUG-094) is auto-populated and compiled. It automatically attaches the captured screenshots, stack traces, and complete execution logs, mapping them directly to the originating Cucumber story.",
      details: "Aligns product owners, QA leads, and developers instantly with zero manual ticket copy-pasting required."
    },
    {
      title: "4. Verify & Close",
      short: "Auto-regression suites validate the codebase patch before auto-closing tickets.",
      icon: <ShieldCheck className="w-5 h-5 text-amber-600" />,
      color: "border-amber-150 bg-amber-50 text-amber-800",
      badge: "Verification Phase",
      description: "Once patched, Git pushes trigger unit and BDD verification suites. If the specific failing test and the wider regression tests pass, the JIRA issue auto-transitions to 'Verified & Closed'.",
      details: "Guarantees that once a bug is fixed, it remains locked in the test harness forever, avoiding downstream regression re-occurrences."
    }
  ];

  // Why Reports Are Necessary highlights
  const valuePropositions = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-indigo-600" />,
      title: "Executive Release Assurance",
      desc: "Releases shouldn't rely on gut feelings. Quality reports provide stakeholders with an objective Release Confidence Score based on exact coverage statistics."
    },
    {
      icon: <FileText className="w-6 h-6 text-cyan-600" />,
      title: "Bulletproof Traceability Audits",
      desc: "Establishes a transparent compliance blueprint mapping every Given-When-Then specification directly to an actual test execution block, satisfying corporate audits."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-indigo-600" />,
      title: "Release Velocity Optimization",
      desc: "Highlights system flake rates, regression bottlenecks, and execution hotspots so engineering can debug faster and ship stable builds with velocity."
    }
  ];

  // Failed automated tests details
  const failedTests = [
    {
      id: 'checkout-api',
      name: 'CheckoutAPITest.java (REST Assured)',
      error: 'java.lang.AssertionError: Expected 200 OK but received 500 Internal Server Error',
      stackTrace: `at io.restassured.internal.ResponseSpecificationImpl.validateResponseIfRequired(ResponseSpecificationImpl.groovy:696)
at io.restassured.internal.ResponseSpecificationImpl.statusCode(ResponseSpecificationImpl.groovy:135)
at com.testnest.api.CheckoutAPITest.verifyCheckoutSaturatesPool(CheckoutAPITest.java:42)
at java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1136)`,
      details: "Checkout API validator timed out due to database connection pool exhaustion. 150/150 connections saturated.",
      duration: "14.2s"
    },
    {
      id: 'login-visual',
      name: 'login-responsive.spec.js (Playwright)',
      error: 'Error: page.waitForSelector: Timeout 5000ms exceeded waiting for selector "button[type=\'submit\']"',
      stackTrace: `at LoginPage.clickSubmit (LoginPage.js:28:21)
at com.testnest.specs.LoginVisualTest.verifySubmitAction(login-responsive.spec.js:14:20)`,
      details: "Form submit button was unresponsive due to signature validation loop blockage on staging server Staging-Env-02.",
      duration: "5.8s"
    }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#F4F7FA]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* ==================== 1. HERO SECTION ==================== */}
        <section className="text-center py-12 md:py-16 space-y-6 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/80 border border-indigo-200/50">
            <BarChart3 className="w-4 h-4 text-indigo-600 animate-pulse" />
            Quality Intelligence Suite
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-800 leading-tight">
            Unified Quality <br />
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Intelligence & Reporting</span>
          </h1>
          <p className="text-base md:text-lg font-medium text-slate-600 leading-relaxed">
            Translating granular automated pipeline runs and analytical human exploratory logs into clean, executive-ready dashboards.
          </p>
        </section>

        {/* ==================== 2. WHY REPORTS ARE NECESSARY ==================== */}
        <section className="py-8 border-t border-slate-200/40">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-indigo-700 bg-indigo-50 border border-indigo-100">
              The Quality Blueprint
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              Why Comprehensive QA Reporting is Vital
            </h2>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              Software testing is more than checking boxes. It is about generating transparent quality data that fuels release confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
            {valuePropositions.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4, scale: 1.01 }}
                className="bg-white rounded-3xl p-6 border border-slate-200/50 shadow-sm relative overflow-hidden group transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-200/10 rounded-full blur-2xl transform translate-x-4 -translate-y-4 group-hover:scale-125 transition-transform duration-300" />
                <div className="p-3 bg-indigo-50 border border-indigo-100/50 rounded-2xl w-fit mb-5">
                  {item.icon}
                </div>
                <h3 className="text-base font-extrabold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-xs font-medium text-slate-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ==================== 3. REPORT SELECTOR TABS ==================== */}
        <section className="py-12 border-t border-slate-200/40">
          <div className="flex justify-center mb-10">
            <div className="bg-[#EAEFF4] p-1.5 rounded-2xl flex items-center gap-1 shadow-sm border border-slate-200/60 w-fit">
              <button
                onClick={() => setActiveReportTab('pipeline')}
                className={`px-5 py-2 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  activeReportTab === 'pipeline'
                    ? 'bg-white text-indigo-700 shadow-md border border-indigo-100/30'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <Server className="w-4 h-4" />
                Automated Pipeline Report
              </button>
              <button
                onClick={() => setActiveReportTab('manual')}
                className={`px-5 py-2 text-xs font-bold rounded-xl transition-all duration-300 cursor-pointer flex items-center gap-1.5 ${
                  activeReportTab === 'manual'
                    ? 'bg-white text-indigo-700 shadow-md border border-indigo-100/30'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                <FileText className="w-4 h-4" />
                Exploratory Sprint Log (Manual)
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {activeReportTab === 'pipeline' ? (
              <motion.div
                key="pipeline"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="max-w-5xl mx-auto space-y-8"
              >
                {/* Simulated Jenkins/Allure Header Card */}
                <div className="glass-card rounded-3xl p-6 md:p-8 bg-white border border-slate-200/50 shadow-lg text-left space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-5 border-b border-slate-100">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                        <h3 className="text-lg font-extrabold text-slate-800">Jenkins Build: #184 (Completed)</h3>
                      </div>
                      <p className="text-xs font-bold text-slate-400 font-mono">
                        SUITE RUN: com.testnest.suites.EnterpriseRegressionRunner
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span className="px-3 py-1 bg-red-50 border border-red-200 rounded-full text-[10px] font-bold text-red-600 flex items-center gap-1 uppercase">
                        <XCircle className="w-3.5 h-3.5" />
                        Build Status: Failed (8 Errors)
                      </span>
                      <button className="px-4 py-1.5 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 text-slate-700 bg-white rounded-xl shadow-sm text-[11px] font-bold flex items-center gap-1.5 cursor-pointer transition-colors duration-200">
                        <Download className="w-3.5 h-3.5" />
                        Export Allure HTML
                      </button>
                    </div>
                  </div>

                  {/* Summary Metric Counters */}
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Total Test Runs</span>
                      <span className="text-xl font-black text-slate-800 font-mono">320</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 text-emerald-600">Passed Checks</span>
                      <span className="text-xl font-black text-emerald-600 font-mono">312</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1 text-red-600">Failed Checks</span>
                      <span className="text-xl font-black text-red-600 font-mono">8</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Skipped Tests</span>
                      <span className="text-xl font-black text-slate-400 font-mono">0</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col justify-between col-span-2 md:col-span-1">
                      <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Duration</span>
                      <span className="text-xl font-black text-slate-700 font-mono flex items-center gap-1">
                        <Clock className="w-4 h-4 text-slate-400" />
                        3m 42s
                      </span>
                    </div>
                  </div>

                  {/* Execution Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-slate-500 uppercase tracking-wider">Suite Execution Success Index</span>
                      <span className="text-red-600">97.5%</span>
                    </div>
                    <div className="h-3 w-full bg-red-100/60 rounded-full overflow-hidden flex">
                      <div className="h-full bg-emerald-500" style={{ width: '97.5%' }} />
                      <div className="h-full bg-red-500 animate-pulse" style={{ width: '2.5%' }} />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-xs font-bold text-slate-500 flex flex-wrap gap-x-6 gap-y-2 items-center">
                    <span className="flex items-center gap-1.5">
                      <Server className="w-4 h-4 text-slate-400" />
                      Env: Staging-Env-02 (Linux Cluster)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <RefreshCw className="w-4 h-4 text-slate-400 animate-spin" />
                      Vite & Vitest Native Bundlers
                    </span>
                  </div>
                </div>

                {/* Failed Test Trace Accordion Panel */}
                <div className="space-y-4 text-left">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Failed Tests Diagnostics Explorer</h4>
                  
                  <div className="space-y-3">
                    {failedTests.map((t) => {
                      const isExpanded = expandedFailId === t.id;
                      return (
                        <div 
                          key={t.id}
                          className={`bg-white rounded-3xl border transition-all duration-300 shadow-sm overflow-hidden ${
                            isExpanded ? 'border-red-200 ring-1 ring-red-100/50 shadow-md' : 'border-slate-200/50'
                          }`}
                        >
                          <button
                            onClick={() => setExpandedFailId(isExpanded ? null : t.id)}
                            className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-sm text-slate-700 hover:text-red-600 transition-colors"
                          >
                            <span className="flex items-center gap-2">
                              <XCircle className="w-4 h-4 text-red-500" />
                              {t.name}
                            </span>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                                {t.duration}
                              </span>
                              <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${isExpanded ? 'rotate-180 text-red-500' : ''}`} />
                            </div>
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25 }}
                                className="px-6 pb-6 border-t border-slate-100 space-y-4 pt-4"
                              >
                                <div className="space-y-1.5">
                                  <span className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider">Failure Message</span>
                                  <p className="text-xs font-bold text-red-600 bg-red-50/50 p-3 rounded-xl border border-red-100 leading-relaxed">
                                    {t.error}
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                  <div className="space-y-1.5">
                                    <span className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider">Stack Trace Log</span>
                                    <pre className="bg-slate-900 rounded-xl p-4 font-mono text-[10px] text-red-400 overflow-x-auto leading-relaxed border border-slate-800 h-44 text-left">
                                      <code>{t.stackTrace}</code>
                                    </pre>
                                  </div>

                                  <div className="space-y-1.5">
                                    <span className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider">Failure Analysis & Recommendation</span>
                                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl space-y-3 h-44 flex flex-col justify-between text-xs text-slate-600 font-semibold">
                                      <p className="leading-relaxed">
                                        {t.details}
                                      </p>
                                      <div className="p-3 bg-red-50/50 border border-red-100/50 rounded-xl text-[11px] text-red-800 font-medium flex items-center gap-1.5">
                                        <AlertTriangle className="w-4 h-4 text-red-600" />
                                        Recommended Action: Modify DriverManager configs and adjust idle limits.
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="manual"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="max-w-5xl mx-auto space-y-8"
              >
                {/* Manual testing sprint validation card */}
                <div className="glass-card rounded-3xl p-6 md:p-8 bg-white border border-slate-200/50 shadow-lg text-left grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  
                  {/* Left stats text (8 Columns) */}
                  <div className="md:col-span-8 space-y-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-indigo-600 animate-pulse" />
                        <h3 className="text-lg font-extrabold text-slate-800">Sprint 14 Verification Summary Log</h3>
                      </div>
                      <p className="text-xs font-bold text-slate-400 font-mono">
                        MODULE VERIFIED: User Accounts, Billing Dashboards & Dynamic JWT Token Interceptor
                      </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-600">
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex flex-col justify-between">
                        <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Test Cases</span>
                        <span className="text-lg font-black text-slate-800">142 Specs</span>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex flex-col justify-between">
                        <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 text-emerald-600">Actual Passes</span>
                        <span className="text-lg font-black text-emerald-600">139 Passed</span>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex flex-col justify-between">
                        <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 text-red-600">Bug Anomalies</span>
                        <span className="text-lg font-black text-red-600">1 Failed</span>
                      </div>
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 flex flex-col justify-between">
                        <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 text-amber-600">Blocked Steps</span>
                        <span className="text-lg font-black text-amber-600">2 Blocked</span>
                      </div>
                    </div>

                    <div className="p-4 bg-indigo-50/50 border border-indigo-100/50 rounded-2xl space-y-2 text-xs text-indigo-800 font-medium">
                      <p className="font-bold flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                        <Info className="w-4 h-4 text-indigo-600" />
                        Executive Verification Verdict
                      </p>
                      <p className="leading-relaxed">
                        Sprint 14 has met the exit criteria thresholds with a 98.2% functional success index. The 1 failed anomaly (TN-BUG-094 database pool saturation) has been logged in JIRA and routed to backend engineering for intermediate pool configuration patching. Release approved with minor risk parameters.
                      </p>
                    </div>
                  </div>

                  {/* Circular Pass Rate Graph (4 Columns) */}
                  <div className="md:col-span-4 flex flex-col items-center justify-center space-y-4">
                    <div className="relative h-32 w-32 flex items-center justify-center">
                      {/* SVG Circle */}
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="42"
                          stroke="#E2E8F0"
                          strokeWidth="8"
                          fill="transparent"
                        />
                        <motion.circle
                          cx="50"
                          cy="50"
                          r="42"
                          stroke="url(#indigoGrad)"
                          strokeWidth="8"
                          strokeDasharray="263.8"
                          initial={{ strokeDashoffset: 263.8 }}
                          animate={{ strokeDashoffset: 263.8 - (263.8 * 0.982) }}
                          transition={{ duration: 1.2, ease: 'easeOut' }}
                          fill="transparent"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="indigoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4F46E5" />
                            <stop offset="100%" stopColor="#06B6D4" />
                          </linearGradient>
                        </defs>
                      </svg>
                      {/* Counter inside */}
                      <div className="absolute flex flex-col items-center justify-center font-sans">
                        <span className="text-2xl font-black text-slate-800">98.2%</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Success Rate</span>
                      </div>
                    </div>

                    <div className="text-center">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Audited & Verified Lead</span>
                      <span className="text-xs font-bold text-slate-700">Anshul Sharma, QA Lead</span>
                    </div>
                  </div>
                </div>

                {/* Structured Sprint Exploratory Log Table */}
                <div className="space-y-4 text-left">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Sprint 14 Functional Traceability Table</h4>
                  
                  <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm overflow-hidden text-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-100 font-bold text-slate-500 uppercase text-[9px] tracking-wider">
                            <th className="p-4 w-28">Spec ID</th>
                            <th className="p-4">Target Functional Capability</th>
                            <th className="p-4 w-32">Verification Type</th>
                            <th className="p-4 w-28 text-center">Status</th>
                            <th className="p-4 w-36">JIRA Reference</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium text-slate-600">
                          <tr>
                            <td className="p-4 font-mono font-bold text-indigo-600">TN-AUTH-042</td>
                            <td className="p-4">Altered dynamic JWT token signatures correctly blocked and redirected with 401.</td>
                            <td className="p-4">Exploratory / Sec</td>
                            <td className="p-4 text-center">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 inline-block">
                                Cleared
                              </span>
                            </td>
                            <td className="p-4 font-mono text-slate-400">Approved</td>
                          </tr>
                          <tr>
                            <td className="p-4 font-mono font-bold text-indigo-600">TN-AUTH-094</td>
                            <td className="p-4">Checkout session token expiry causes JVM connection pool saturation.</td>
                            <td className="p-4">Stress / Load</td>
                            <td className="p-4 text-center">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-100 inline-block">
                                Anomaly
                              </span>
                            </td>
                            <td className="p-4 font-mono font-bold text-red-600 hover:underline cursor-pointer flex items-center gap-1">
                              TN-BUG-094
                              <ExternalLink className="w-3 h-3" />
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 font-mono font-bold text-indigo-600">TN-BILL-012</td>
                            <td className="p-4">Attempt billing operations in checkout flow while offline.</td>
                            <td className="p-4">Functional UAT</td>
                            <td className="p-4 text-center">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 inline-block">
                                Blocked
                              </span>
                            </td>
                            <td className="p-4 font-mono text-slate-400 flex items-center gap-1">
                              TN-STORY-182
                              <ExternalLink className="w-3 h-3" />
                            </td>
                          </tr>
                          <tr>
                            <td className="p-4 font-mono font-bold text-indigo-600">TN-NAV-018</td>
                            <td className="p-4">Semantic keyboard accessibility check and tab order inside login layouts.</td>
                            <td className="p-4">A11y / WCAG</td>
                            <td className="p-4 text-center">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 inline-block">
                                Cleared
                              </span>
                            </td>
                            <td className="p-4 font-mono text-slate-400">Approved</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* ==================== 4. INTERACTIVE BUG REPORTING LIFECYCLE ==================== */}
        <section className="py-12 border-t border-slate-200/40 text-left">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-red-700 bg-red-50 border border-red-100">
              Traceability Loop
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              Interactive Bug Reporting Lifecycle
            </h2>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              How defects are caught, contextualized, converted to clean tickets, and verified within our IntelliJ & PyCharm test harnesses.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Step navigation panel (5 columns) */}
            <div className="lg:col-span-5 space-y-3">
              {bugSteps.map((step, idx) => {
                const isSelected = selectedBugStep === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setSelectedBugStep(idx)}
                    className={`w-full p-4 rounded-2xl border text-left transition-all duration-300 flex gap-4 cursor-pointer ${
                      isSelected 
                        ? 'bg-white border-indigo-200 shadow-md ring-1 ring-indigo-150/40' 
                        : 'bg-white/50 border-slate-200/50 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl border h-fit ${
                      isSelected ? 'bg-indigo-50 border-indigo-100 text-indigo-700' : 'bg-slate-50 border-slate-100 text-slate-500'
                    }`}>
                      {step.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className={`text-xs font-bold ${isSelected ? 'text-indigo-700' : 'text-slate-700'}`}>
                        {step.title}
                      </h4>
                      <p className="text-[11px] font-medium text-slate-400 leading-relaxed line-clamp-2">
                        {step.short}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Step Detail Card (7 columns) */}
            <div className="lg:col-span-7 h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedBugStep}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-3xl border border-slate-200/50 p-6 md:p-8 shadow-lg flex flex-col justify-between min-h-[350px] relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl transform translate-x-8 -translate-y-8 pointer-events-none" />
                  
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="px-3 py-1 bg-indigo-50 border border-indigo-150 rounded-full text-[10px] font-bold text-indigo-700 uppercase">
                        {bugSteps[selectedBugStep].badge}
                      </span>
                      <span className="text-[11px] font-bold text-slate-400 font-mono">
                        Step {selectedBugStep + 1} of {bugSteps.length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-xl font-extrabold text-slate-800 flex items-center gap-2">
                        {bugSteps[selectedBugStep].icon}
                        {bugSteps[selectedBugStep].title.split('. ')[1]}
                      </h3>
                      <p className="text-xs md:text-sm font-semibold text-slate-600 leading-relaxed">
                        {bugSteps[selectedBugStep].description}
                      </p>
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] md:text-xs text-slate-500 font-medium leading-relaxed">
                      <span className="block font-bold text-slate-700 mb-1.5 uppercase text-[9px] tracking-wider">
                        Technical Deep-Dive
                      </span>
                      {bugSteps[selectedBugStep].details}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>TestNest Automated QA Pipeline</span>
                    <button 
                      onClick={() => setSelectedBugStep((selectedBugStep + 1) % bugSteps.length)}
                      className="text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      Next Step <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ==================== 5. AI QA ACCELERATION & BUSINESS LOGIC ==================== */}
        <section className="py-12 border-t border-slate-200/40 text-left">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-indigo-700 bg-indigo-50 border border-indigo-100">
              Productivity Engines
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              AI Acceleration & Deep Business Logic Comprehension
            </h2>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              We leverage cutting-edge AI utilities and absolute business logic mappings to supercharge execution speed and guarantee quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* AI Accel Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/50 shadow-sm relative overflow-hidden group transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="p-3.5 bg-indigo-50 border border-indigo-100/50 rounded-2xl w-fit mb-6">
                <Sparkles className="w-6 h-6 text-indigo-600 animate-pulse" />
              </div>
              
              <h3 className="text-lg font-black text-slate-800 mb-3 flex items-center gap-2">
                Extensive AI Automation integration
              </h3>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed mb-6">
                We integrate AI models directly inside our framework architectures to eliminate pipeline bottlenecks, auto-author requirements, and remove visual flakiness dynamically.
              </p>

              <ul className="space-y-3.5 text-xs font-semibold text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                  <div>
                    <span className="font-extrabold text-slate-700">Predictive Flakiness Filtering:</span> AI analyzes test execution trees to quarantine flaky elements or automatically adjust dynamic poll intervals prior to pipeline triggers.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                  <div>
                    <span className="font-extrabold text-slate-700">Self-Healing Locators:</span> Drifting web element attributes (IDs, classes) are resolved dynamically in runtime by evaluating nearby layout anchors and DOM hierarchies.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                  <div>
                    <span className="font-extrabold text-slate-700">AI Spec Authoring:</span> We ingest product requirement files and dynamically output fully-formatted Gherkin feature files, cutting initial specification design hours by 70%.
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Business Logic Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200/50 shadow-sm relative overflow-hidden group transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="p-3.5 bg-cyan-50 border border-cyan-100/50 rounded-2xl w-fit mb-6">
                <GitPullRequest className="w-6 h-6 text-cyan-600" />
              </div>

              <h3 className="text-lg font-black text-slate-800 mb-3 flex items-center gap-2">
                Deep Business Logic Comprehension
              </h3>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed mb-6">
                We believe code is meaningless without business alignment. Our test harness translates technical API/UI verification points back into the plain Gherkin english of stakeholders.
              </p>

              <ul className="space-y-3.5 text-xs font-semibold text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                  <div>
                    <span className="font-extrabold text-slate-700">BDD Cucumber Blueprints:</span> Every test scenario is structured as a clear Given-When-Then action block, instantly understandable by Product Owners and QA testers alike.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                  <div>
                    <span className="font-extrabold text-slate-700">Business Rules Matching:</span> Test coverage is tracked against core revenue flows (Checkout, Billing, Identity logs) instead of just superficial line-by-line coverage counts.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="h-5 w-5 rounded-full bg-cyan-50 border border-cyan-100 text-cyan-600 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                  <div>
                    <span className="font-extrabold text-slate-700">Traceable Value Mapping:</span> Aligning technical IntelliJ/PyCharm test runners directly to active customer experience telemetry, creating 100% transparent delivery assurances.
                  </div>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-16 text-center">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="glass-card rounded-3xl p-8 border border-slate-200/50 text-center max-w-2xl mx-auto space-y-6 glow-indigo bg-white"
          >
            <h3 className="text-2xl font-extrabold text-slate-800">Establish dynamic reports today</h3>
            <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-md mx-auto">
              TestNest Solutions Inc. builds executive dashboards mapping test coverages directly to your business release confidence.
            </p>
            <div className="flex items-center justify-center pt-2">
              <button 
                onClick={onOpenAuditModal}
                className="btn btn-primary px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md cursor-pointer text-sm w-full sm:w-auto"
              >
                Request Quality Audit Report &rarr;
              </button>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
