import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, GitPullRequest, Layers, Play, CheckCircle2, 
  Terminal, ShieldCheck, FileCode, Check, Copy, Flame,
  FolderOpen, FileText, ChevronRight, Smartphone, Network, Globe, Send, Shield
} from 'lucide-react';


export default function Automation({ onOpenAuditModal }) {
  const [activeCodeTab, setActiveCodeTab] = useState('feature');
  const [activeMatrix, setActiveMatrix] = useState('playwright');
  const [activeDesignTab, setActiveDesignTab] = useState('feature');
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedGridTool, setSelectedGridTool] = useState(null);

  // Framework matrix definitions
  const frameworks = {
    playwright: {
      title: 'Playwright E2E Framework',
      speed: 98,
      isolation: '100% (Browser Contexts)',
      parallelism: 'Infinite (Native Workers)',
      bestFor: 'Modern Single Page Applications (SPAs) & rapid multi-tab flows.',
      desc: 'Playwright provides zero-flakiness visual and integration checks using Chromium, WebKit, and Firefox engines natively.'
    },
    cypress: {
      title: 'Cypress Testing Suite',
      speed: 88,
      isolation: 'High (Same Loop Execution)',
      parallelism: 'High (Parallel orchestration)',
      bestFor: 'Easy onboarding. Perfect for teams currently learning automated testing.',
      desc: "Cypress Automation Framework (Custom Built for Your Team): Don't know Cypress yet? No worries! We build dynamic, robust, easy-to-maintain, and highly scalable Cypress frameworks, complete with detailed onboarding so your team can master automated checks effortlessly."
    },
    selenium: {
      title: 'Selenium Grid Webdriver',
      speed: 70,
      isolation: 'Medium (WebDriver Port)',
      parallelism: 'High (Grid Distributed)',
      bestFor: 'Legacy enterprise applications & comprehensive browser matrix systems.',
      desc: 'The industry-standard classic. Selenium Grid facilitates robust cross-browser checking across traditional configurations.'
    },
    cucumber: {
      title: 'Cucumber BDD & POM',
      speed: 92,
      isolation: 'Clean (Page Object Classes)',
      parallelism: 'High (Runner configurations)',
      bestFor: 'Clear human-legible scenarios mapped to structured Page Object Model designs.',
      desc: 'Bridges Gherkin Given-When-Then BDD step descriptions with Page Object Model classes. Deconstructs locator paths and business actions cleanly, providing highly maintainable testing structures in Java, Python, and JS/TS.'
    }
  };

  // Automated Code examples with syntax tokens
  const codeBlocks = {
    feature: {
      fileName: 'login.feature',
      lang: 'Gherkin / Cucumber',
      code: `Feature: User Authentication Security Verification
  Background:
    Given the user navigates to the portal login page

  Scenario Outline: Verify login security constraints with invalid credentials
    When the user enters an invalid username "<username>"
    And the user enters an invalid password "<password>"
    And clicks on the login submit button
    Then a security validation error message containing "<expected_error>" should be displayed

    Examples:
      | username    | password      | expected_error                |
      | admin_qa    | WrongPass123! | Invalid credentials or access |
      | locked_user | Pass123!      | Account has been suspended   |`
    },
    page: {
      fileName: 'LoginPage.java',
      lang: 'Java (POM)',
      code: `public class LoginPage {
    private final WebDriver driver;
    private final WebDriverWait wait;

    // Encapsulated Private Locators
    private final By usernameField = By.id("username");
    private final By passwordField = By.id("password");
    private final By loginButton = By.cssSelector("button[type='submit']");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
    }

    public void enterUsername(String username) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(usernameField)).sendKeys(username);
    }

    public void clickLogin() {
        wait.until(ExpectedConditions.elementToBeClickable(loginButton)).click();
    }
}`
    },
    step: {
      fileName: 'LoginSteps.java',
      lang: 'Java (Steps)',
      code: `public class LoginSteps {
    private final LoginPage loginPage = new LoginPage(DriverManager.getDriver());

    @When("the user enters an invalid username {string}")
    public void enterUsername(String user) {
        loginPage.enterUsername(user);
    }

    @And("clicks on the login submit button")
    public void clickSubmit() {
        loginPage.clickLogin();
    }
}`
    }
  };

  // Directory explorer blueprint mapping POM and Cucumber BDD
  const designFiles = {
    feature: {
      path: 'features/authentication.feature',
      lang: 'Gherkin / Cucumber',
      code: `Feature: Enterprise User Authentication Lifecycle
  As a secure portal system administrator
  I want to verify user signature authentication limits
  So that only verified credential holders can access services

  Scenario: Successful login with valid credentials
    Given the user is on the portal login screen
    When they enter valid email "audit@testnest.com" and password
    And click the authentication submit action
    Then they should land on the secure dashboard viewport`
    },
    page: {
      path: 'src/pages/LoginPage.js',
      lang: 'JavaScript (Page Object Model)',
      code: `// LoginPage.js - Page Object Model (POM) Design Pattern
// Encapsulates UI element locators and page interactions

class LoginPage {
  constructor(page) {
    this.page = page;
    
    // 1. Element Locators (De-coupled selectors)
    this.emailInput = 'input[type="email"]';
    this.passwordInput = 'input[type="password"]';
    this.submitButton = 'button[type="submit"]';
  }

  // 2. Action Capabilities (Reusable Methods)
  async navigate() {
    await this.page.goto('https://app.testnest.com/login');
  }

  async enterCredentials(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
  }

  async clickSubmit() {
    await this.page.click(this.submitButton);
  }
}`
    },
    step: {
      path: 'src/steps/LoginSteps.js',
      lang: 'Cucumber Step Bindings',
      code: `// LoginSteps.js - Step Definitions (Cucumber Step Bindings)
// Binds high-level Gherkin specifications to Page Actions

const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../pages/LoginPage');
const { expect } = require('@playwright/test');

let loginPage;

Given('the user is on the portal login screen', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.navigate();
});

When('they enter valid email {string} and password', async function (email) {
  await loginPage.enterCredentials(email, process.env.QA_PASS);
});

When('click the authentication submit action', async function () {
  await loginPage.clickSubmit();
});

Then('they should land on the secure dashboard viewport', async function () {
  await expect(this.page).toHaveURL('https://app.testnest.com/dashboard');
});`
    }
  };

  const handleCopyDesignCode = () => {
    navigator.clipboard.writeText(designFiles[activeDesignTab].code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeBlocks[activeCodeTab].code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const gridTools = [
    {
      id: 'selenium',
      name: 'Selenium WebDriver',
      icon: <Globe className="w-6 h-6 text-indigo-600" />,
      focus: 'Cross-Browser Legacy & Enterprise Matrices',
      desc: 'The industry-standard classic for comprehensive distributed browser sweeps across traditional configurations.',
      layer: 'L3 POM Component & L4 ThreadLocal DriverManager',
      speed: '70%',
      integrations: 'Java, Python, Jenkins CI Nodes, grid configurations',
      ide: 'IntelliJ IDEA / Eclipse / PyCharm'
    },
    {
      id: 'cypress',
      name: 'Cypress E2E Framework',
      icon: <Terminal className="w-6 h-6 text-cyan-600" />,
      focus: 'Modern Frontend E2E & Component Cycles',
      desc: "Don't know Cypress yet? No worries! We build dynamic, robust, easy-to-maintain, and highly scalable Cypress frameworks, complete with detailed onboarding so your team can master automated checks effortlessly.",
      layer: 'L3 POM Component & Custom Wrapper Commands',
      speed: '88%',
      integrations: 'JavaScript, TypeScript, Jenkins Pipelines, custom HTML runners',
      ide: 'IntelliJ IDEA / VS Code'
    },
    {
      id: 'playwright',
      name: 'Playwright Testing Suite',
      icon: <Cpu className="w-6 h-6 text-indigo-600" />,
      focus: 'Multi-Tab Parallelized Modern E2E',
      desc: 'Playwright provides zero-flakiness visual and integration checks using Chromium, WebKit, and Firefox engines natively.',
      layer: 'L3 POM Component & L4 ThreadLocal DriverManager',
      speed: '98%',
      integrations: 'JavaScript, TypeScript, Python, Java, Jenkins pipelines, native trace visualizers',
      ide: 'IntelliJ IDEA / VS Code'
    },
    {
      id: 'appium',
      name: 'Appium Mobile E2E',
      icon: <Smartphone className="w-6 h-6 text-cyan-600" />,
      focus: 'Cross-Platform iOS & Android Mobile Tests',
      desc: 'Fires native, hybrid, and web app validation flows using a unified W3C client-server architecture.',
      layer: 'L4 DriverManager Configurations & Mobile Hooks',
      speed: '82%',
      integrations: 'Java, Javascript, Python, Jenkins build servers, cloud grids',
      ide: 'IntelliJ IDEA / Eclipse'
    },
    {
      id: 'testng',
      name: 'TestNG Suite Execution',
      icon: <Layers className="w-6 h-6 text-indigo-600" />,
      focus: 'Advanced Test Orchestration & Parallel runs',
      desc: 'A robust automation runner featuring XML suite controls, parameterized thread configurations, and custom step listeners.',
      layer: 'L5 Global Fail-Safe Hooks & execution logic',
      speed: '92%',
      integrations: 'Java, Maven profiles, Jenkins XML suite executions, ExtentReports',
      ide: 'IntelliJ IDEA / Eclipse'
    },
    {
      id: 'junit',
      name: 'JUnit Testing Framework',
      icon: <CheckCircle2 className="w-6 h-6 text-cyan-600" />,
      focus: 'Structural Unit Checking & Lifecycle Triggers',
      desc: 'Classic assertions paired with clear execution lifecycle hooks (@BeforeAll, @AfterEach) to build clean validation matrices.',
      layer: 'L5 Global Fail-Safe Hooks & suite runs',
      speed: '90%',
      integrations: 'Java, Maven dependencies, Jenkins pipelines, Allure Reporting',
      ide: 'IntelliJ IDEA / Eclipse'
    },
    {
      id: 'rest-assured',
      name: 'REST Assured API Library',
      icon: <Network className="w-6 h-6 text-indigo-600" />,
      focus: 'Fluent BDD Java API Endpoint Verification',
      desc: 'Verify complex microservice responses, validate REST schemas, test JSON/XML headers, and execute contract checks.',
      layer: 'L2 Step Definitions & API verification wrappers',
      speed: '95%',
      integrations: 'Java, Maven schemas, Postman collection comparisons, Jenkins API pipelines',
      ide: 'IntelliJ IDEA / Eclipse'
    },
    {
      id: 'postman',
      name: 'Postman Integration',
      icon: <Send className="w-6 h-6 text-cyan-600" />,
      focus: 'API Integration, Mocking & Contract checks',
      desc: 'Execute comprehensive schema checks, environment parameters, and contract suites on staging or dev environments.',
      layer: 'L2 Step Definitions & sandbox API verification',
      speed: '94%',
      integrations: 'JSON collection schemas, environment scopes, Jenkins Newman runners',
      ide: 'Postman Desktop / PyCharm'
    }
  ];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-[#F4F7FA]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* ==================== 1. HERO SECTION ==================== */}
        <section className="text-center py-12 md:py-16 space-y-6 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-100/80 border border-indigo-200/50">
            <Cpu className="w-4 h-4 text-indigo-600 animate-spin" />
            Engineering Department
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-800 leading-tight">
            Scalable & Robust <br />
            <span className="bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">Automation Engineering</span>
          </h1>
          <p className="text-base md:text-lg font-medium text-slate-600 leading-relaxed">
            Building dynamic, zero-flake regression suites that seamlessly integrate into modern enterprise CI/CD pipelines.
          </p>
        </section>

        {/* ==================== 2. FRAMEWORK ARCHITECTURE BLUEPRINT ==================== */}
        <section className="py-12 border-t border-slate-200/40 text-left">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4 mb-10">
              <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-indigo-700 bg-indigo-50 border border-indigo-100">
                BDD Framework Blueprint
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
                Decoupled 5-Layer Architecture Model
              </h2>
              <p className="text-sm font-medium text-slate-600 max-w-xl mx-auto leading-relaxed text-center">
                Our automation solutions are engineered on a robust, decoupled, and stateless architectural stack. Element locators are strictly separated from test assertions.
              </p>
            </div>

            {/* Visual 5-Layer Stack Diagram */}
            <div className="space-y-4 relative">
              {/* Connector lines running behind layers */}
              <div className="absolute left-[39px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-indigo-500 via-indigo-300 to-cyan-400 opacity-60 z-0 hidden sm:block" />

              {/* Layer 1 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/50 shadow-sm relative hover:border-indigo-300 hover:shadow-md transition-all duration-300 z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
                <span className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white font-black text-sm flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-all">
                  L1
                </span>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
                    <span>BDD Feature Files (Gherkin)</span>
                    <span className="text-[10px] bg-purple-50 text-purple-700 px-2 py-0.5 rounded font-mono font-bold">Abstract Spec</span>
                  </h3>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">
                    Highly readable, abstract business-logic scenarios mapped using Cucumber syntax. Empowers non-technical founders, engineers, and product owners to immediately audit test suite coverage.
                  </p>
                </div>
              </div>

              {/* Layer 2 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/50 shadow-sm relative hover:border-indigo-300 hover:shadow-md transition-all duration-300 z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
                <span className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white font-black text-sm flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-all">
                  L2
                </span>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
                    <span>Step Definitions Glue Code</span>
                    <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-mono font-bold">Stateless Mapping</span>
                  </h3>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">
                    Lightweight step mapping layers. They process arguments parsed from the Gherkin annotations and hand off browser commands to step definitions. Mappings remain completely stateless to prevent flake.
                  </p>
                </div>
              </div>

              {/* Layer 3 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/50 shadow-sm relative hover:border-indigo-300 hover:shadow-md transition-all duration-300 z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
                <span className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white font-black text-sm flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-all">
                  L3
                </span>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
                    <span>Page Object Model (POM) Component Layer</span>
                    <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-mono font-bold">Encapsulated locators</span>
                  </h3>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">
                    Decoupled component layers encapsulating private element locators (`By`) paired with public reusable wrapper actions. Decouples UI structure changes from test assertions, ensuring minimal maintenance overhead.
                  </p>
                </div>
              </div>

              {/* Layer 4 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/50 shadow-sm relative hover:border-indigo-300 hover:shadow-md transition-all duration-300 z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
                <span className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white font-black text-sm flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-all">
                  L4
                </span>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
                    <span>ThreadLocal DriverManager Configuration</span>
                    <span className="text-[10px] bg-teal-50 text-teal-700 px-2 py-0.5 rounded font-mono font-bold">Parallel Orchestration</span>
                  </h3>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">
                    Dynamic, cross-browser browser orchestration built for parallel processing. Utilizes Java thread isolation strategies to run hundreds of regression sweeps concurrently without cross-thread collisions.
                  </p>
                </div>
              </div>

              {/* Layer 5 */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/50 shadow-sm relative hover:border-indigo-300 hover:shadow-md transition-all duration-300 z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
                <span className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-white font-black text-sm flex items-center justify-center shadow-md flex-shrink-0 group-hover:scale-105 transition-all">
                  L5
                </span>
                <div className="space-y-1">
                  <h3 className="font-extrabold text-base text-slate-800 flex items-center gap-2">
                    <span>Fail-Safe Global Hooks</span>
                    <span className="text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded font-mono font-bold">Global Teardown</span>
                  </h3>
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">
                    Automatic driver instantiation, clean memory teardown, and context-aware failure screenshot captures. Handles system failures gracefully and posts diagnostics directly to build systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== 3. MASTERY MATRIX ==================== */}
        <section className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Framework Switcher (Left 5 Columns) */}
          <div className="lg:col-span-5 flex flex-col space-y-4 text-left">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Tech Stack Mastery Matrix</h2>
            {Object.keys(frameworks).map((key) => (
              <button
                key={key}
                onClick={() => setActiveMatrix(key)}
                className={`p-5 rounded-2xl border text-left transition-all duration-300 w-full cursor-pointer relative overflow-hidden ${
                  activeMatrix === key 
                    ? 'bg-white border-indigo-200 shadow-md ring-1 ring-indigo-100/50' 
                    : 'bg-white/60 border-slate-200/60 hover:bg-white/80'
                }`}
              >
                {activeMatrix === key && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500 to-cyan-400" />
                )}
                <div className="flex justify-between items-center mb-1">
                  <h3 className={`font-bold text-sm ${activeMatrix === key ? 'text-indigo-600' : 'text-slate-700'}`}>
                    {frameworks[key].title}
                  </h3>
                  <span className="text-[10px] font-bold text-slate-400 font-mono">Matrix v{key === 'playwright' ? '1.8' : '2.0'}</span>
                </div>
                <p className="text-xs text-slate-500 line-clamp-1 font-medium">{frameworks[key].desc}</p>
              </button>
            ))}
          </div>

          {/* Matrix Details Display (Right 7 Columns) */}
          <div className="lg:col-span-7 h-full">
            <motion.div 
              key={activeMatrix}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-card rounded-3xl p-6 md:p-8 text-left border border-slate-200/40 bg-white h-full flex flex-col justify-between space-y-6 shadow-lg"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-extrabold text-slate-800">
                  {frameworks[activeMatrix].title}
                </h3>
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  {frameworks[activeMatrix].desc}
                </p>
                
                {/* Stats indicators */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Parallelism</span>
                    <span className="text-xs font-bold text-slate-700">{frameworks[activeMatrix].parallelism}</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Session Isolation</span>
                    <span className="text-xs font-bold text-slate-700">{frameworks[activeMatrix].isolation}</span>
                  </div>
                </div>
                
                {/* Progress bar speed */}
                <div className="space-y-2 pt-4">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-500 uppercase tracking-wider">Execution Velocity Index</span>
                    <span className="text-indigo-600">{frameworks[activeMatrix].speed}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${frameworks[activeMatrix].speed}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-200/40 text-xs font-bold text-slate-500 flex flex-wrap gap-2 items-center">
                <span className="uppercase tracking-wider text-[10px]">Optimal Target:</span>
                <span className="text-indigo-600 bg-indigo-50 border border-indigo-100/50 px-2.5 py-0.5 rounded-full">{frameworks[activeMatrix].bestFor}</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ==================== 3. SIMULATED IDE INTERACTIVE ==================== */}
        <section className="py-12">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              Interactive Test Suite Example
            </h2>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              Explore how we design maintainable, object-oriented, readable code loops. Switch between active script models to see syntax parameters.
            </p>
          </div>
          
          {/* Glass IDE Wrapper */}
          <div className="glass-card rounded-3xl overflow-hidden border border-slate-200/50 shadow-xl bg-white max-w-4xl mx-auto">
            {/* Editor Top Bar */}
            <div className="bg-[#EAEFF4] px-6 py-3.5 flex items-center justify-between border-b border-slate-200/60 font-sans">
              <div className="flex items-center space-x-2">
                {/* Simulated window circles */}
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="pl-4 text-xs font-bold text-slate-500 font-mono flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-indigo-500" />
                  {codeBlocks[activeCodeTab].fileName}
                </span>
              </div>
              
              {/* Selector Tabs */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setActiveCodeTab('feature')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer transition-all duration-200 ${
                    activeCodeTab === 'feature' 
                      ? 'bg-white text-indigo-600 shadow-sm border border-indigo-100/30' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  login.feature (Gherkin)
                </button>
                <button
                  onClick={() => setActiveCodeTab('page')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer transition-all duration-200 ${
                    activeCodeTab === 'page' 
                      ? 'bg-white text-indigo-600 shadow-sm border border-indigo-100/30' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  LoginPage.java (Java POM)
                </button>
                <button
                  onClick={() => setActiveCodeTab('step')}
                  className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer transition-all duration-200 ${
                    activeCodeTab === 'step' 
                      ? 'bg-white text-indigo-600 shadow-sm border border-indigo-100/30' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  LoginSteps.java (Java Steps)
                </button>
                
                {/* Copy Btn */}
                <button
                  onClick={handleCopyCode}
                  className="p-1.5 ml-2 text-slate-400 hover:text-indigo-600 bg-white shadow-sm border border-slate-200/40 rounded-lg cursor-pointer transition-colors duration-200"
                  title="Copy code to clipboard"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
            
            {/* Editor Code Snippet */}
            <div className="p-6 md:p-8 bg-slate-50 text-left overflow-x-auto font-mono text-xs md:text-sm leading-relaxed border-b border-slate-200/40">
              <pre className="text-slate-700">
                <code>
                  {codeBlocks[activeCodeTab].code.split('\n').map((line, lIdx) => {
                    const isGherkin = activeCodeTab === 'feature';
                    
                    if (isGherkin) {
                      // Gherkin highlight tokenizer
                      const gherkinKeywords = ['Feature:', 'Background:', 'Scenario Outline:', 'Given', 'When', 'Then', 'And', 'Examples:'];
                      const regex = /("(?:[^"\\]|\\.)*"|<.*?>|\b(?:Feature|Background|Scenario Outline|Scenario|Given|When|Then|And|But|Examples):?)/g;
                      const parts = line.split(regex);
                      
                      return (
                        <div key={lIdx} className="flex">
                          <span className="w-8 select-none text-slate-300 text-right pr-4 font-mono font-medium text-[10px] md:text-xs">{lIdx + 1}</span>
                          <span className="flex-grow">
                            {parts.map((part, pIdx) => {
                              if (gherkinKeywords.includes(part) || part.endsWith(':')) {
                                return <span key={pIdx} className="text-purple-600 font-bold">{part}</span>;
                              }
                              if (part.startsWith('"') && part.endsWith('"')) {
                                return <span key={pIdx} className="text-teal-600 font-medium">{part}</span>;
                              }
                              if (part.startsWith('<') && part.endsWith('>')) {
                                return <span key={pIdx} className="text-indigo-600 font-bold">{part}</span>;
                              }
                              return <span key={pIdx}>{part}</span>;
                            })}
                          </span>
                        </div>
                      );
                    } else {
                      // Java highlight tokenizer
                      if (line.trim().startsWith('//')) {
                        return (
                          <div key={lIdx} className="flex">
                            <span className="w-8 select-none text-slate-300 text-right pr-4 font-mono font-medium text-[10px] md:text-xs">{lIdx + 1}</span>
                            <span className="text-slate-400 font-medium">{line}</span>
                          </div>
                        );
                      }
                      
                      const javaKeywords = ['public', 'class', 'private', 'final', 'new', 'void', 'return', 'int', 'String', 'WebDriver', 'WebDriverWait', 'By', 'ExpectedConditions', 'Duration'];
                      const regex = /("(?:[^"\\]|\\.)*"|@\w+|\b(?:public|class|private|final|new|void|return|int|String|WebDriver|WebDriverWait|By|ExpectedConditions|Duration)\b)/g;
                      const parts = line.split(regex);
                      
                      return (
                        <div key={lIdx} className="flex">
                          <span className="w-8 select-none text-slate-300 text-right pr-4 font-mono font-medium text-[10px] md:text-xs">{lIdx + 1}</span>
                          <span className="flex-grow">
                            {parts.map((part, pIdx) => {
                              if (javaKeywords.includes(part)) {
                                return <span key={pIdx} className="text-indigo-600 font-bold">{part}</span>;
                              }
                              if (part.startsWith('@')) {
                                return <span key={pIdx} className="text-amber-600 font-bold">{part}</span>;
                              }
                              if (part.startsWith('"') && part.endsWith('"')) {
                                return <span key={pIdx} className="text-teal-600 font-medium">{part}</span>;
                              }
                              return <span key={pIdx}>{part}</span>;
                            })}
                          </span>
                        </div>
                      );
                    }
                  })}
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* ==================== 4. AUTOMATION FRAMEWORK DESIGN (POM & CUCUMBER BDD) ==================== */}
        <section className="py-12 border-t border-slate-200/40">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-indigo-700 bg-indigo-50 border border-indigo-100">
              Architectural Blueprint
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              Framework Design: POM & Cucumber BDD
            </h2>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              We leverage the **Page Object Model (POM)** pattern to cleanly decouple element locators from step logic, using **Cucumber Gherkin BDD** so your automated test suites are fully accessible and readable by both business stakeholders and engineers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
            {/* Interactive File Tree Explorer (Left 4 Columns) */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/50 shadow-sm flex flex-col text-left space-y-6">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Project Workspace</h3>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs font-bold text-slate-600 font-mono">
                  <FolderOpen className="w-4 h-4 text-indigo-500" />
                  <span>testnest-qa-framework</span>
                </div>
              </div>

              {/* Directory Tree */}
              <div className="space-y-3 flex-grow font-mono text-xs text-slate-600">
                {/* Features Folder */}
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] uppercase tracking-wider pl-1">
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span>features /</span>
                  </div>
                  <button 
                    onClick={() => setActiveDesignTab('feature')}
                    className={`flex items-center gap-2 p-2.5 rounded-xl w-full text-left cursor-pointer transition-all duration-200 font-medium ${
                      activeDesignTab === 'feature' 
                        ? 'bg-indigo-50 border border-indigo-100/60 text-indigo-700 shadow-sm' 
                        : 'hover:bg-slate-50 border border-transparent hover:text-slate-900'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <span>authentication.feature</span>
                  </button>
                </div>

                {/* Src Folder */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[10px] uppercase tracking-wider pl-1">
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span>src /</span>
                  </div>
                  
                  {/* Pages sub-folder */}
                  <div className="pl-4 space-y-1">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 mb-1">pages (POM)</span>
                    <button 
                      onClick={() => setActiveDesignTab('page')}
                      className={`flex items-center gap-2 p-2.5 rounded-xl w-full text-left cursor-pointer transition-all duration-200 font-medium ${
                        activeDesignTab === 'page' 
                          ? 'bg-indigo-50 border border-indigo-100/60 text-indigo-700 shadow-sm' 
                          : 'hover:bg-slate-50 border border-transparent hover:text-slate-900'
                      }`}
                    >
                      <FileCode className="w-4 h-4 text-indigo-500" />
                      <span>LoginPage.js</span>
                    </button>
                  </div>

                  {/* Steps sub-folder */}
                  <div className="pl-4 space-y-1 pt-2">
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1 mb-1">steps (Cucumber)</span>
                    <button 
                      onClick={() => setActiveDesignTab('step')}
                      className={`flex items-center gap-2 p-2.5 rounded-xl w-full text-left cursor-pointer transition-all duration-200 font-medium ${
                        activeDesignTab === 'step' 
                          ? 'bg-indigo-50 border border-indigo-100/60 text-indigo-700 shadow-sm' 
                          : 'hover:bg-slate-50 border border-transparent hover:text-slate-900'
                      }`}
                    >
                      <FileCode className="w-4 h-4 text-indigo-500" />
                      <span>LoginSteps.js</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* IDE Brand indicators */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                <span>IDE Environment</span>
                <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100/40">IntelliJ · PyCharm · Eclipse</span>
              </div>
            </div>

            {/* Selected File Code Viewer (Right 8 Columns) */}
            <div className="lg:col-span-8 flex flex-col justify-between glass-card rounded-3xl overflow-hidden border border-slate-200/50 shadow-xl bg-white">
              {/* File Title Bar */}
              <div className="bg-[#EAEFF4] px-6 py-3.5 flex items-center justify-between border-b border-slate-200/60 font-sans">
                <div className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-yellow-400" />
                  <div className="h-3 w-3 rounded-full bg-emerald-400" />
                  <span className="pl-4 text-xs font-bold text-slate-500 font-mono flex items-center gap-1.5">
                    <FileCode className="w-3.5 h-3.5 text-indigo-500" />
                    {designFiles[activeDesignTab].path}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                    {designFiles[activeDesignTab].lang}
                  </span>
                  <button
                    onClick={handleCopyDesignCode}
                    className="p-1.5 text-slate-400 hover:text-indigo-600 bg-white shadow-sm border border-slate-200/40 rounded-lg cursor-pointer transition-colors duration-200"
                    title="Copy code to clipboard"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="p-6 md:p-8 bg-slate-50 text-left overflow-x-auto font-mono text-xs md:text-sm leading-relaxed border-b border-slate-200/40 flex-grow min-h-[360px]">
                <pre className="text-slate-700">
                  <code>
                    {designFiles[activeDesignTab].code.split('\n').map((line, lIdx) => {
                      const isGherkin = activeDesignTab === 'feature';
                      
                      if (isGherkin) {
                        // Gherkin highlight tokenizer
                        const gherkinKeywords = ['Feature:', 'Scenario:', 'Given', 'When', 'Then', 'And', 'As a', 'I want to', 'So that'];
                        const regex = /("(?:[^"\\]|\\.)*"|<.*?>|\b(?:Feature|Scenario|Given|When|Then|And|But|As a|I want to|So that):?)/g;
                        const parts = line.split(regex);
                        
                        return (
                          <div key={lIdx} className="flex">
                            <span className="w-8 select-none text-slate-300 text-right pr-4 font-mono font-medium text-[10px] md:text-xs">{lIdx + 1}</span>
                            <span className="flex-grow">
                              {parts.map((part, pIdx) => {
                                if (gherkinKeywords.includes(part)) {
                                  return <span key={pIdx} className="text-purple-600 font-bold">{part}</span>;
                                }
                                if (part.startsWith('"') && part.endsWith('"')) {
                                  return <span key={pIdx} className="text-teal-600 font-medium">{part}</span>;
                                }
                                return <span key={pIdx}>{part}</span>;
                              })}
                            </span>
                          </div>
                        );
                      } else {
                        // JavaScript highlight tokenizer
                        if (line.trim().startsWith('//')) {
                          return (
                            <div key={lIdx} className="flex">
                              <span className="w-8 select-none text-slate-300 text-right pr-4 font-mono font-medium text-[10px] md:text-xs">{lIdx + 1}</span>
                              <span className="text-slate-400 font-medium">{line}</span>
                            </div>
                          );
                        }
                        
                        const jsKeywords = ['import', 'require', 'const', 'let', 'class', 'constructor', 'async', 'await', 'function', 'new', 'module.exports'];
                        const regex = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|\b(?:import|require|const|let|class|constructor|async|await|function|new|module.exports)\b)/g;
                        const parts = line.split(regex);
                        
                        return (
                          <div key={lIdx} className="flex">
                            <span className="w-8 select-none text-slate-300 text-right pr-4 font-mono font-medium text-[10px] md:text-xs">{lIdx + 1}</span>
                            <span className="flex-grow">
                              {parts.map((part, pIdx) => {
                                if (jsKeywords.includes(part)) {
                                  return <span key={pIdx} className="text-indigo-600 font-bold">{part}</span>;
                                }
                                if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) {
                                  return <span key={pIdx} className="text-teal-600 font-medium">{part}</span>;
                                }
                                return <span key={pIdx}>{part}</span>;
                              })}
                            </span>
                          </div>
                        );
                      }
                    })}
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* Visual Architecture Flow Map */}
          <div className="mt-12 bg-white rounded-3xl p-6 md:p-8 border border-slate-200/50 shadow-sm max-w-5xl mx-auto text-left">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-6 flex items-center gap-2">
              <span className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">🗺️</span>
              Decoupled BDD + POM Architecture Flow
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center font-sans text-xs">
              {/* Node 1 */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-2 relative">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 block">1. Business Requirements</span>
                <span className="font-bold text-slate-800 block text-xs">Cucumber Gherkin (.feature)</span>
                <p className="text-[11px] text-slate-500 font-medium">Readable by founders, product managers, and non-technical staff.</p>
              </div>

              {/* Connector Arrow 1 */}
              <div className="hidden md:flex justify-center text-slate-300">
                <ChevronRight className="w-6 h-6 animate-pulse" />
              </div>

              {/* Node 2 */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-2 relative">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 block">2. Translation Layer</span>
                <span className="font-bold text-slate-800 block text-xs">Cucumber Step Definitions</span>
                <p className="text-[11px] text-slate-500 font-medium">Binds the business phrases to programmatic test scripts.</p>
              </div>

              {/* Connector Arrow 2 */}
              <div className="hidden md:flex justify-center text-slate-300">
                <ChevronRight className="w-6 h-6 animate-pulse" />
              </div>

              {/* Node 3 */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-2 relative">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 block">3. Interface Layer</span>
                <span className="font-bold text-slate-800 block text-xs">Page Object Model (POM)</span>
                <p className="text-[11px] text-slate-500 font-medium">Maps exact element locators and page actions, fully decoupled.</p>
              </div>

              {/* Connector Arrow 3 */}
              <div className="hidden md:flex justify-center text-slate-300">
                <ChevronRight className="w-6 h-6 animate-pulse" />
              </div>

              {/* Node 4 */}
              <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-2 relative">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 block">4. Browser Execution</span>
                <span className="font-bold text-slate-800 block text-xs">Playwright / Selenium / Cypress</span>
                <p className="text-[11px] text-slate-500 font-medium">Fires automation commands inside target browsers (IntelliJ/Eclipse/PyCharm).</p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== AUTOMATION TECH STACK GRID ==================== */}
        <section className="py-12 border-t border-slate-200/40">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-indigo-700 bg-indigo-50 border border-indigo-100">
              Engineered QA Tooling
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              Automation Tech Stack Grid
            </h2>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              Explore the core capabilities of our automated tooling suite. Click on any card below to inspect its framework target layer, integrations, and performance indicators.
            </p>
          </div>

          {/* Grid of 8 Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto text-left">
            {gridTools.map((tool) => {
              const isSelected = selectedGridTool === tool.id;
              return (
                <motion.div
                  key={tool.id}
                  onClick={() => setSelectedGridTool(isSelected ? null : tool.id)}
                  layout
                  whileHover={{ y: -4, scale: 1.01 }}
                  className={`bg-white rounded-3xl p-6 border transition-all duration-300 shadow-sm cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                    isSelected 
                      ? 'border-indigo-300 ring-1 ring-indigo-100/50 shadow-md bg-gradient-to-br from-white to-indigo-50/10' 
                      : 'border-slate-200/50 hover:border-indigo-200'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                      <div className="p-2.5 bg-slate-50 group-hover:bg-indigo-50 rounded-2xl border border-slate-100/60 transition-colors duration-300">
                        {tool.icon}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wide uppercase">
                        {tool.speed} Speed
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-base font-extrabold text-slate-800 group-hover:text-indigo-600 transition-colors duration-200">
                        {tool.name}
                      </h3>
                      <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider mt-0.5">
                        {tool.focus}
                      </p>
                    </div>

                    {/* Desc */}
                    <p className="text-xs font-medium text-slate-500 leading-relaxed">
                      {tool.desc}
                    </p>

                    {/* Animated Expandable Details Panel */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="pt-4 border-t border-slate-100 space-y-3 text-[11px] font-semibold text-slate-600"
                        >
                          <div>
                            <span className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider">Framework Target Layer</span>
                            <span className="text-slate-700 block mt-0.5">{tool.layer}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider">Active Integrations</span>
                            <span className="text-indigo-600 block mt-0.5">{tool.integrations}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] font-bold uppercase text-slate-400 tracking-wider">Recommended Workspace IDE</span>
                            <span className="text-teal-600 block mt-0.5">{tool.ide}</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Toggle visual hint */}
                  <div className="pt-4 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-100/50 mt-4">
                    <span>{isSelected ? 'Click to minimize' : 'Click to inspect'}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transform transition-transform duration-300 ${isSelected ? 'rotate-90 text-indigo-500' : 'group-hover:translate-x-0.5'}`} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* ==================== 5. CI/CD PIPELINE FLOW ==================== */}
        <section className="py-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-indigo-700 bg-indigo-50 border border-indigo-100">
              DevOps Integration
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              CI/CD Pipeline Integration Flow
            </h2>
            <p className="text-sm font-medium text-slate-600 leading-relaxed">
              We anchor QA steps directly into your active deployment streams, assuring code health from developer push to production delivery.
            </p>
          </div>
          
          {/* Horizontal Steps Pipeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-left relative max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm relative flex flex-col space-y-3 group hover:border-indigo-300 hover:shadow-md transition-all duration-300">
              <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase">Orchestrate</span>
              <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-indigo-500" />
                1. Jenkins Build
              </h3>
              <p className="text-xs text-slate-500 font-medium">Developer pushes updates. Jenkins triggers pipeline events and compiles the automated workspace.</p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm relative flex flex-col space-y-3 group hover:border-indigo-300 hover:shadow-md transition-all duration-300">
              <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase">Run Suite</span>
              <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                <Play className="w-4 h-4 text-indigo-500 animate-pulse" />
                2. Parallel Test
              </h3>
              <p className="text-xs text-slate-500 font-medium">Cypress, Playwright, and Selenium suites run in isolated parallel execution streams.</p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm relative flex flex-col space-y-3 group hover:border-indigo-300 hover:shadow-md transition-all duration-300">
              <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase">Integration</span>
              <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-indigo-500" />
                3. Postman API
              </h3>
              <p className="text-xs text-slate-500 font-medium">Postman collection runners execute integration checks, validating REST schemas and contracts.</p>
            </div>
            
            {/* Step 4 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm relative flex flex-col space-y-3 group hover:border-indigo-300 hover:shadow-md transition-all duration-300">
              <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase">Diagnose</span>
              <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-indigo-500" />
                4. IDE Workflows
              </h3>
              <p className="text-xs text-slate-500 font-medium">Diagnostic logs map back directly to local IntelliJ, PyCharm, and Eclipse workspaces for quick debugging.</p>
            </div>
            
            {/* Step 5 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/50 shadow-sm relative flex flex-col space-y-3 group hover:border-indigo-300 hover:shadow-md transition-all duration-300">
              <span className="text-[10px] font-bold tracking-widest text-indigo-600 uppercase">Report</span>
              <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-indigo-500 animate-bounce" />
                5. Jenkins Report
              </h3>
              <p className="text-xs text-slate-500 font-medium">Jenkins generates comprehensive HTML reports, notifying the team of build statuses.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="pt-16 text-center">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="glass-card rounded-3xl p-8 border border-slate-200/50 text-center max-w-2xl mx-auto space-y-6 glow-indigo bg-white"
          >
            <h3 className="text-2xl font-extrabold text-slate-800">Verify your pipeline's integrity today</h3>
            <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-md mx-auto">
              TestNest Solutions Inc. will build a modular, isolated automation workflow mapping exactly to your release parameters.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onOpenAuditModal}
                className="btn btn-primary px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-md cursor-pointer text-sm w-full sm:w-auto"
              >
                Request Pipeline Audit &rarr;
              </button>
              <a 
                href="https://www.linkedin.com/in/anshul1555/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary inline-flex items-center justify-center gap-2 px-8 py-3 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600 text-slate-700 font-bold rounded-xl shadow-sm hover:shadow-md cursor-pointer text-sm bg-white transition-all duration-300 w-full sm:w-auto"
              >
                <svg className="w-4 h-4 fill-indigo-600" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Direct LinkedIn Contact
              </a>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
