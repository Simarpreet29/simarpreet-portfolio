import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin,  FaReact, FaNodeJs, FaAward,FaJs } from 'react-icons/fa';
import { FaExpandAlt } from 'react-icons/fa'; 
import { SiTailwindcss, SiMysql, SiExpress } from 'react-icons/si';
import { FiExternalLink, FiDownload, FiSend, FiX, FiMenu, FiMoon, FiSun } from 'react-icons/fi';


const NAV_LINKS = ['About', 'Projects', 'Certificates', 'Contact'];
const PROJECT_FILTERS = ['All', 'MERN Stack', 'AI Projects'];
const SMOOTH_EASE = [0.22, 1, 0.36, 1];
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000')).replace(/\/$/, '');

const buildApiUrl = (path) => `${API_BASE_URL}${path}`;

const DEFAULT_PROJECTS = [
  {
    title: 'DAV College Website',
    desc: 'AI-assisted responsive web platform with modern navigation.',
    tech: ['React', 'Tailwind', 'Node.js', 'AI'],
    link: 'https://davasr.netlify.app/',
    imagePath: '/Dav College.jpeg'
  },
  {
    title: 'QuickFix Web Platform',
    desc: 'A fast, service-focused web platform with a clean user journey and responsive layout.',
    tech: ['React', 'NodeJs', 'MongoDb', 'AI', 'Tailwind CSS'],
    link: 'https://github.com/Simarpreet29/quick-fix-website',
    imagePath: '/quickFixWebsie.jpeg'
  },
  {
    title: 'SmartBite-Foodorder-website',
    desc: 'Full-stack food ordering app with React frontend and Express/MongoDB backend.',
    tech: ['MERN Stack', 'React', 'Tailwind CSS', 'NodeJs', 'MongoDb'],
    link: 'https://github.com/Simarpreet29/SmartBite-Foodorder-website',
    imagePath: '/SmartBite website.jpeg'
  },
  {
    title: 'Traveloo - AI Travel Planner',
    desc: 'AI-powered travel planning app that helps users generate smart itineraries quickly.',
    tech: ['React', 'NodeJs', 'MongoDb', 'AI', 'Tailwind CSS'],
    link: 'https://github.com/Simarpreet29/traveloo',
    imagePath: '/Traveloo Website.jpeg'
  },
  {
    title: 'StaySync - Smart PG & Hostel Management System',
    desc: 'StaySync is a full-stack MERN application designed to simplify finding and managing PG/Hostel accommodations.',
    tech: ['MERN Stack', 'React', 'NodeJs', 'MongoDb', 'Tailwind CSS'],
    link: 'https://github.com/Simarpreet29/StaySync',
    imagePath: '/StaySync Website.jpeg'
  }
];

const DEFAULT_CERTIFICATES = [
  {
    title: 'Hackathon Participation',
    organization: 'Smart Internal Hackathon',
    issueDate: 'August 2024',
    imagePath: '/3rd position in hackathon.jpeg'
  },
  {
    title: 'DAV College Hackathon Participation',
    organization: 'Hackathon',
    issueDate: 'March 2025',
    imagePath: '/dav clg hackathon .jpeg'
  },
  {
    title: 'Hackathon Participation',
    organization: 'Smart Internal Hackathon',
    issueDate: 'September 2025',
    imagePath: '/Dav clg hackathon 2 position.jpeg'
  },
  {
    title: 'Certificate of Participation',
    organization: 'CT Group of Institutions',
    issueDate: 'October 2025',
    imagePath: '/CT clg hackathon certificate.jpeg'
  },
  {
    title: 'Certificate of Internship',
    organization: 'S.R Software Solutions',
    issueDate: 'Nov-2025 to dec-2025',
    imagePath: '/internship certificate.jpeg'
  }
];

const SKILLS = [
  { name: 'Javascript', icon: <FaJs className="w-10 h-10 text-cyan-400" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="w-10 h-10 text-cyan-400" /> },
  { name: 'React.js', icon: <FaReact className="w-10 h-10 text-blue-400" /> },
  { name: 'Node.js', icon: <FaNodeJs className="w-10 h-10 text-green-500" /> },
  { name: 'Express.js', icon: <SiExpress className="w-10 h-10 text-gray-300" /> },
  { name: 'MySQL', icon: <SiMysql className="w-10 h-10 text-blue-300" /> },
  { name: 'GitHub', icon: <FaGithub className="w-10 h-10 text-white" /> }
];

const getThemeClasses = (isDarkMode) => ({
  page: isDarkMode ? 'bg-[#0a0f1c] text-white' : 'bg-[#f4f7fb] text-slate-900',
  glowOne: isDarkMode ? 'bg-blue-600' : 'bg-sky-400',
  glowTwo: isDarkMode ? 'bg-cyan-500' : 'bg-teal-300',
  navbar: isDarkMode ? 'bg-[#0a0f1c]/80 border-white/10' : 'bg-white/85 border-slate-200 shadow-sm',
  navLink: isDarkMode ? 'text-gray-300 hover:text-blue-400' : 'text-slate-600 hover:text-sky-600',
  mobileMenu: isDarkMode ? 'bg-[#0a0f1c] border-white/10' : 'bg-white border-slate-200',
  heroPanel: isDarkMode ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/20' : 'bg-gradient-to-br from-white to-slate-100 border-slate-200',
  surface: isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200',
  card: isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200',
  textMuted: isDarkMode ? 'text-gray-400' : 'text-slate-600',
  textSoft: isDarkMode ? 'text-gray-300' : 'text-slate-700',
  divider: isDarkMode ? 'bg-white/20' : 'bg-slate-200',
  input: isDarkMode ? 'bg-[#0a0f1c]/50 border-white/10 text-white focus:border-blue-500' : 'bg-white border-slate-300 text-slate-900 focus:border-sky-500',
  footer: isDarkMode ? 'border-white/10 text-gray-500' : 'border-slate-200 text-slate-500',
  modalShell: isDarkMode ? 'bg-gradient-to-br from-white/10 to-white/5 border-white/20' : 'bg-white/95 border-slate-200 shadow-2xl',
  toggle: isDarkMode ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-slate-100 border-slate-200 text-slate-900 hover:bg-slate-200'
});

const normalizeText = (value) => (value || '').toString().toLowerCase();

const doesProjectMatchFilter = (project, activeFilter) => {
  if (activeFilter === 'All') return true;

  const techList = Array.isArray(project.tech) ? project.tech.map(normalizeText) : [];
  const title = normalizeText(project.title);
  const desc = normalizeText(project.desc);
  const textBlob = `${title} ${desc} ${techList.join(' ')}`;

  if (activeFilter === 'MERN Stack') {
    const hasMernKeyword = techList.some((tech) => tech.includes('mern'));
    const hasMernStack = ['react', 'node', 'express', 'mongo'].every((keyword) => textBlob.includes(keyword));
    return hasMernKeyword || hasMernStack;
  }

  if (activeFilter === 'AI Projects') {
    if (title.includes('smartbite')) return false;
    return ['ai', 'agentic', 'machine learning', 'ml'].some((keyword) => textBlob.includes(keyword));
  }

  return true;
};


const App = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]); 
  const [isDarkMode, setIsDarkMode] = useState(true);

  const [selectedCert, setSelectedCert] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => doesProjectMatchFilter(project, activeFilter));
  }, [projects, activeFilter]);

  const theme = useMemo(() => getThemeClasses(isDarkMode), [isDarkMode]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('portfolio-theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('portfolio-theme', isDarkMode ? 'dark' : 'light');
    document.documentElement.dataset.theme = isDarkMode ? 'dark' : 'light';
  }, [isDarkMode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projRes = await fetch(buildApiUrl('/api/projects'));
        if (!projRes.ok) {
          throw new Error('Projects API failed');
        }
        const projectsData = await projRes.json();
        setProjects(Array.isArray(projectsData) && projectsData.length ? projectsData : DEFAULT_PROJECTS);

        const certRes = await fetch(buildApiUrl('/api/certificates'));
        if (!certRes.ok) {
          throw new Error('Certificates API failed');
        }
        const certificatesData = await certRes.json();
        setCertificates(Array.isArray(certificatesData) && certificatesData.length ? certificatesData : DEFAULT_CERTIFICATES);
      } catch (error) {
        console.error('Data fetch error, using fallback defaults:', error);
        setProjects(DEFAULT_PROJECTS);
        setCertificates(DEFAULT_CERTIFICATES);
      }
    };
    fetchData();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.72, ease: SMOOTH_EASE }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: SMOOTH_EASE }
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(buildApiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("🎉 Message sent successfully!");
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) { alert("⚠️ Server connection error."); }
  };

  return (
    <div className={`min-h-screen font-sans relative overflow-x-hidden transition-colors duration-500 ${theme.page}`}>
      
      {/* Background Glow */}
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -14, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className={`fixed top-[-10%] left-[-10%] w-96 h-96 rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none ${theme.glowOne}`}
      />
      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 16, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        className={`fixed bottom-[-10%] right-[-10%] w-96 h-96 rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none ${theme.glowTwo}`}
      />

      {/* Navbar */}
      <motion.nav 
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: SMOOTH_EASE }} 
        className={`fixed top-0 w-full z-50 backdrop-blur-md border-b transition-colors duration-500 ${theme.navbar}`}
      >
        <div className="flex justify-between items-center py-4 px-6 md:px-12 w-full">
          <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            Portfolio.
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-sm">
            {NAV_LINKS.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className={`${theme.navLink} transition`}>{link}</a>
            ))}
            <button
              onClick={() => setIsDarkMode((current) => !current)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border transition ${theme.toggle}`}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
              {isDarkMode ? 'Light' : 'Dark'}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className={`${theme.navLink} transition focus:outline-none`}
            >
              {isMobileMenuOpen ? <FiX className="w-7 h-7" /> : <FiMenu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.35, ease: SMOOTH_EASE }}
              className={`md:hidden border-t ${theme.mobileMenu}`}
            >
              <div className="flex flex-col py-4 px-6 gap-4 font-medium text-sm">
                {NAV_LINKS.map(link => (
                  <a 
                    key={link} 
                    href={`#${link.toLowerCase()}`} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`${theme.navLink} transition py-2`}
                  >
                    {link}
                  </a>
                ))}
                <button
                  onClick={() => setIsDarkMode((current) => !current)}
                  className={`mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full border transition ${theme.toggle}`}
                >
                  {isDarkMode ? <FiSun className="w-4 h-4" /> : <FiMoon className="w-4 h-4" />}
                  {isDarkMode ? 'Light mode' : 'Dark mode'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-12 relative z-10 space-y-40">
        
        {/* HERO SECTION */}
        <motion.section id="hero" initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col md:flex-row items-center gap-12 min-h-[70vh]">
          <motion.div variants={staggerContainer} className="flex-1 space-y-6">
            <motion.h2 variants={staggerItem} className="text-blue-400 font-medium tracking-wider uppercase">ASPIRING MERN-STACK DEVELOPER</motion.h2>
            <motion.h1 variants={staggerItem} className="text-5xl md:text-7xl font-bold leading-tight">
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Digital</span> Experiences
            </motion.h1>
            <motion.p variants={staggerItem} className={`${theme.textMuted} text-lg max-w-lg`}>
              "Passionate Full-Stack Developer dedicated to building seamless user interfaces and roboust backend systems. Let's build something amazing together."
            </motion.p>
            <motion.div variants={staggerItem} className="flex gap-4 pt-4">
              <a href="#contact" className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 transition font-medium inline-block">Hire Me</a>
              <a href="/My_CV.pdf" download="My_CV.pdf" className={`px-8 py-3 rounded-full transition font-medium flex items-center gap-2 ${theme.surface} hover:bg-white/10`}>
                Download CV <FiDownload />
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div variants={staggerItem} whileHover={{ y: -6, scale: 1.015 }} transition={{ duration: 0.35, ease: SMOOTH_EASE }} className={`flex-1 w-full max-w-md aspect-[4/5] rounded-3xl backdrop-blur-lg p-6 flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-500 ${theme.heroPanel}`}>
            <div className={`w-48 h-48 rounded-full absolute top-10 blur-3xl ${isDarkMode ? 'bg-blue-500/20' : 'bg-sky-300/30'}`} />
            <div className="text-center z-10">
              <img
                src="/profile%20.jpeg"
                alt="Simarpreet profile"
                className={`w-40 h-40 mx-auto rounded-full mb-6 border-4 object-cover ${isDarkMode ? 'border-[#0a0f1c]' : 'border-white'}`}
              />
              <h3 className="text-2xl font-bold">Simarpreet</h3>
              <p className={isDarkMode ? 'text-blue-300' : 'text-sky-600'}>Full Stack Developer</p>
              <div className="flex justify-center gap-6 mt-6">
                <a href="https://github.com/Simarpreet29"><FaGithub className={`${theme.textMuted} w-6 h-6 hover:text-white`} /></a>
                <a href="https://www.linkedin.com/in/simar-preet-dev"><FaLinkedin className={`${theme.textMuted} w-6 h-6 hover:text-white`} /></a>
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* ABOUT SECTION */}
        <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeInUp} className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">About Me</h2>
            <div className={`h-px flex-1 ${theme.divider}`} />
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`space-y-6 text-lg leading-relaxed ${theme.textSoft}`}>
              <p>Hi! I'm a passionate Full-Stack Developer currently pursuing my BCA. I have a strong drive for solving real-world problems through code, specializing in building dynamic applications using the MERN stack.</p>
              <p>On the frontend, I enjoy crafting fast, interactive, and beautifully responsive user interfaces using React.js and Tailwind CSS. On the backend, my strength lies in engineering robust architectures with Node.js, Express, and MongoDB. I have hands-on experience in designing secure RESTful APIs and managing source code with Git.</p>
              <p>From structuring efficient databases to designing highly interactive and modern user interfaces, I thrive on the entire development lifecycle. I also enjoy exploring AI integrations to make web applications smarter, faster, and more user-centric.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {SKILLS.map((skill, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45, delay: idx * 0.05, ease: SMOOTH_EASE }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className={`p-4 rounded-2xl flex flex-col items-center gap-3 transition-colors duration-300 ${theme.surface}`}
                  >
                  {skill.icon}
                  <span className="font-medium text-sm">{skill.name}</span>
                  </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* PROJECTS SECTION */}
        <motion.section id="projects" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <div className={`h-px flex-1 ${theme.divider}`} />
          </div>
          <div className="flex flex-wrap gap-3 mb-8">
            {PROJECT_FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <motion.button
                  key={filter}
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-transparent shadow-[0_0_18px_rgba(56,189,248,0.35)]'
                      : `${theme.surface} ${theme.textSoft} hover:border-cyan-400/40`
                  }`}
                >
                  {filter}
                </motion.button>
              );
            })}
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id || `${project.title}-${index}`}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -16, scale: 0.97 }}
                  transition={{ duration: 0.34, delay: index * 0.04, ease: SMOOTH_EASE }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className={`group rounded-2xl p-6 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all flex flex-col ${theme.card}`}
                >
                <div className={`relative h-40 rounded-xl mb-6 border overflow-hidden ${isDarkMode ? 'bg-gradient-to-br from-blue-900/50 to-gray-800/50 border-white/5' : 'bg-gradient-to-br from-sky-50 to-slate-100 border-slate-200'}`}>
                  {project.imagePath ? (
                    <img
                      src={project.imagePath}
                      alt={`${project.title} preview`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-500 text-sm">Project Preview</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c]/40 to-transparent pointer-events-none" />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-blue-100' : 'text-slate-900'}`}>{project.title}</h3>
                <p className={`${theme.textMuted} text-sm mb-4 flex-1`}>{project.desc}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(project.tech || []).map((tech, i) => (
                    <span
                      key={i}
                      className={`text-xs px-3 py-1 rounded-full border ${
                        isDarkMode
                          ? 'bg-blue-500/10 text-blue-300 border-blue-500/30'
                          : 'bg-sky-100 text-sky-800 border-sky-200'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a href={project.link} className={`inline-flex items-center gap-2 text-sm ${isDarkMode ? 'text-white/70 hover:text-blue-400' : 'text-slate-600 hover:text-sky-600'}`}>
                  View Source <FiExternalLink className="w-4 h-4" />
                </a>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-8 text-center ${theme.textMuted}`}
            >
              No projects found for {activeFilter}. More coming soon.
            </motion.p>
          )}
        </motion.section>

        {/* CERTIFICATES SECTION - UPDATED FOR STRIAGHT IMAGES */}
        <motion.section id="certificates" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeInUp} className="scroll-mt-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl font-bold">Hackathons & Certifications</h2>
            <div className={`h-px flex-1 ${theme.divider}`} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.04, ease: SMOOTH_EASE }}
                whileHover={{ y: -8, scale: 1.01 }} 
                onClick={() => {
                    setSelectedCert(cert);
                    setIsModalOpen(true);
                }}
                className={`group relative rounded-3xl p-5 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all flex flex-col cursor-pointer ${theme.card}`}
              >
                {/* --- UPDATE YAHAN HUA HAI --- */}
                {/* 1. 'h-48' hatakar 'aspect-[4/3]' (ya 3/4 khadi photos ke liye) lagaya hai */}
                <div className={`relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-5 border flex items-center justify-center ${isDarkMode ? 'border-white/5 bg-gray-900' : 'border-slate-200 bg-slate-50'}`}>
                  {/* 2. 'object-cover' ki jagah 'object-contain' use kiya hai taaki photo sidhi dikhe aur kate nahi */}
                  <img 
                    src={cert.imagePath} 
                    alt={cert.title} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" 
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <FaExpandAlt className="w-8 h-8 text-white translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" />
                  </div>
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-cyan-500 p-2 rounded-xl shadow-lg translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500">
                    <FaAward className="w-5 h-5 text-white" />
                  </div>
                </div>
                {/* --- UPDATE KHATAM --- */}

                <h3 className={`text-xl font-bold mb-1 transition-all ${isDarkMode ? 'text-blue-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-300' : 'text-slate-900 group-hover:text-sky-700'}`}>
                  {cert.title}
                </h3>
                <p className={`${isDarkMode ? 'text-cyan-400' : 'text-sky-600'} font-medium text-sm mb-4`}>{cert.organization}</p>
                <div className="mt-auto flex items-center">
                  <span className={`text-xs font-medium px-4 py-1.5 rounded-full border ${isDarkMode ? 'bg-[#0a0f1c] border-white/10 text-gray-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>{cert.issueDate}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CONTACT SECTION */}
        <motion.section id="contact" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="scroll-mt-32 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Work Together</h2>
          <p className={`${theme.textMuted} mb-10`}>Have a project in mind or just want to say hi? Drop me a message below.</p>
          <form onSubmit={handleContactSubmit} className={`p-8 rounded-3xl text-left shadow-xl ${theme.surface}`}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.textMuted}`}>Your Name</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className={`w-full rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 ${theme.input}`} placeholder="John Doe" />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme.textMuted}`}>Email</label>
                <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={`w-full rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 ${theme.input}`} placeholder="john@example.com" />
              </div>
            </div>
            <div className="mb-8">
              <label className={`block text-sm font-medium mb-2 ${theme.textMuted}`}>Message</label>
              <textarea required rows="4" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className={`w-full rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 resize-none ${theme.input}`} placeholder="How can I help you?"></textarea>
            </div>
            <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg flex justify-center items-center gap-2">
              Send Message <FiSend />
            </button>
          </form>
        </motion.section>

      </main>
      
      {/* Footer */}
      <footer className={`border-t py-8 text-center text-sm mt-20 ${theme.footer}`}>
        <p>© {new Date().getFullYear()} Simarpreet. All rights reserved.</p>
      </footer>

      {/* CERTIFICATE POPUP (MODAL) COMPONENT */}
      <AnimatePresence>
        {isModalOpen && selectedCert && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
            className={`fixed inset-0 z-[100] backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer ${isDarkMode ? 'bg-black/90' : 'bg-slate-950/70'}`}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              exit={{ opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }}
              onClick={(e) => e.stopPropagation()}
              className={`relative p-2 rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden ${theme.modalShell}`}
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className={`absolute top-4 right-4 z-10 p-2 rounded-full transition ${isDarkMode ? 'bg-black/50 text-white/70 hover:text-white hover:bg-black/80' : 'bg-white/80 text-slate-700 hover:text-slate-900 hover:bg-white'}`}
              >
                <FiX className="w-6 h-6" />
              </button>

              <img 
                src={selectedCert.imagePath} 
                alt={selectedCert.title} 
                className={`w-full h-auto max-h-[90vh] rounded-2xl object-contain shadow-inner border ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;