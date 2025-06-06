import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { 
  ChevronDown, 
  Github, 
  Linkedin, 
  Mail, 
  Code, 
  Palette, 
  Zap, 
  Menu, 
  X, 
  ExternalLink,
  Send,
  User,
  Briefcase,
  MessageCircle
} from 'lucide-react';

const PortfolioWebsite = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Navbar items
  const navItems = [
    { id: 'home', label: 'Home', icon: User },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: MessageCircle }
  ];

  // Project data
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Modern e-commerce solution built with React, Node.js, and MongoDB. Features include real-time inventory, payment integration, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      github: '#',
      demo: '#'
    },
    {
      id: 2,
      title: 'AI Task Manager',
      description: 'Intelligent task management app with AI-powered prioritization, natural language processing, and smart scheduling features.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      tech: ['Vue.js', 'Python', 'TensorFlow', 'PostgreSQL'],
      github: '#',
      demo: '#'
    },
    {
      id: 3,
      title: 'Real-time Chat App',
      description: 'WebSocket-based chat application with file sharing, emoji reactions, typing indicators, and group messaging capabilities.',
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=400&fit=crop',
      tech: ['React', 'Socket.io', 'Express', 'Redis'],
      github: '#',
      demo: '#'
    },
    {
      id: 4,
      title: 'Data Visualization Dashboard',
      description: 'Interactive dashboard for complex data analysis with customizable charts, real-time updates, and export functionality.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      tech: ['D3.js', 'React', 'FastAPI', 'Docker'],
      github: '#',
      demo: '#'
    },
    {
      id: 5,
      title: 'Mobile Fitness Tracker',
      description: 'Cross-platform fitness application with workout tracking, nutrition logging, progress analytics, and social features.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      tech: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
      github: '#',
      demo: '#'
    },
    {
      id: 6,
      title: 'Blockchain Voting System',
      description: 'Secure digital voting platform using blockchain technology, ensuring transparency, immutability, and voter privacy.',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop',
      tech: ['Solidity', 'Web3.js', 'React', 'Ethereum'],
      github: '#',
      demo: '#'
    }
  ];

  // Three.js setup
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create floating particles
    const particleGeometry = new THREE.SphereGeometry(0.02, 8, 8);
    const particleMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.8
    });

    const particles = [];
    for (let i = 0; i < 100; i++) {
      const particle = new THREE.Mesh(particleGeometry, particleMaterial);
      particle.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      particle.userData = {
        originalY: particle.position.y,
        speed: Math.random() * 0.02 + 0.01
      };
      particles.push(particle);
      scene.add(particle);
    }
    particlesRef.current = particles;

    // Create geometric shapes
    const shapes = [];
    
    const sphereGeometry = new THREE.SphereGeometry(2, 32, 32);
    const sphereMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x1e40af, 
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(4, 2, -5);
    shapes.push(sphere);
    scene.add(sphere);

    const torusGeometry = new THREE.TorusGeometry(1.5, 0.3, 16, 100);
    const torusMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.6
    });
    const torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.set(-4, -2, -3);
    shapes.push(torus);
    scene.add(torus);

    const octaGeometry = new THREE.OctahedronGeometry(1.2);
    const octaMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const octahedron = new THREE.Mesh(octaGeometry, octaMaterial);
    octahedron.position.set(2, -3, -4);
    shapes.push(octahedron);
    scene.add(octahedron);

    camera.position.z = 5;

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      particles.forEach((particle, index) => {
        particle.position.y = particle.userData.originalY + Math.sin(Date.now() * 0.001 + index) * 0.5;
        particle.rotation.x += particle.userData.speed;
        particle.rotation.y += particle.userData.speed;
      });

      shapes.forEach((shape, index) => {
        shape.rotation.x += 0.005 + index * 0.002;
        shape.rotation.y += 0.003 + index * 0.001;
      });

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMenuOpen(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Thank you for your message! I will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const skills = [
    { icon: Code, label: 'Frontend Development', delay: 0.2 },
    { icon: Palette, label: 'UI/UX Design', delay: 0.4 },
    { icon: Zap, label: 'Performance Optimization', delay: 0.6 }
  ];

  return (
    <div className="relative bg-black text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              JohnDev
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    activeSection === id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-blue-500/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-blue-500/20">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeSection === id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-blue-500/10'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen overflow-hidden">
        <div ref={mountRef} className="absolute inset-0 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20 z-10" />
        
        <div className="relative z-20 min-h-screen flex flex-col justify-center items-center px-6 text-center">
          <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent">
                John Developer
              </h1>
              <p className="text-xl md:text-2xl text-blue-200 font-light tracking-wide">
                Creative Frontend Developer & Designer
              </p>
            </div>

            <div className="max-w-2xl mx-auto mb-12">
              <p className="text-gray-300 text-lg leading-relaxed">
                Crafting digital experiences with cutting-edge technologies. 
                Passionate about creating beautiful, performant, and user-centric applications 
                that push the boundaries of web development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              {skills.map(({ icon: Icon, label, delay }, index) => (
                <div 
                  key={index}
                  className={`group p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover:scale-105 hover:bg-white/10 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
                  style={{ transitionDelay: `${delay}s` }}
                >
                  <Icon className="w-8 h-8 text-blue-400 mx-auto mb-3 group-hover:text-blue-300 transition-colors" />
                  <p className="text-white font-medium">{label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <button 
                onClick={() => scrollToSection('projects')}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-full hover:from-blue-500 hover:to-blue-400 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <span className="flex items-center gap-2">
                  View My Work
                  <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                </span>
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-blue-400 text-blue-400 font-semibold rounded-full hover:bg-blue-400 hover:text-black transition-all duration-300 transform hover:scale-105"
              >
                Get In Touch
              </button>
            </div>

            <div className="flex justify-center space-x-6">
              {[
                { icon: Github, href: '#', label: 'GitHub' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Mail, href: '#', label: 'Email' }
              ].map(({ icon: Icon, href, label }, index) => (
                <a
                  key={index}
                  href={href}
                  className="group p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:border-blue-400/60 hover:bg-blue-500/20 transition-all duration-300 transform hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5 text-gray-300 group-hover:text-blue-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-6 h-6 text-blue-400" />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              A showcase of my recent work, featuring innovative solutions and cutting-edge technologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.id}
                className="group bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <a 
                      href={project.github}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-lg transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>
                    <a 
                      href={project.demo}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-lg transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Have a project in mind? Let's work together to create something amazing
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Alternative contact methods */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-6">Or reach out directly:</p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <a 
                href="mailto:john@example.com"
                className="flex items-center gap-3 px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-blue-500/50 rounded-lg transition-all duration-300"
              >
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">john@example.com</span>
              </a>
              <a 
                href="https://linkedin.com/in/johndeveloper"
                className="flex items-center gap-3 px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700 hover:border-blue-500/50 rounded-lg transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">LinkedIn Profile</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            © 2025 John Developer. Built with React, Three.js & Tailwind CSS
          </p>
        </div>
      </footer>

      {/* Floating elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-1 h-1 bg-blue-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-10 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
    </div>
  );
};

export default PortfolioWebsite;