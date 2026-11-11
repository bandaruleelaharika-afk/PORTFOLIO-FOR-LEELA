import gasDetectorImg from '../assets/project_gas_detector.jpg';
import crimeDetectionImg from '../assets/project_crime_detection.jpg';
import bistImg from '../assets/internship_bist.jpg';
import blackbuckImg from '../assets/internship_blackbuck.jpg';
import certMahindraImg from '../assets/cert_mahindra_pride.jpg';
import certIkkaImg from '../assets/cert_ikka_coromandel.jpg';
import certHtmlImg from '../assets/cert_html_pyramids.jpg';
import certPythonImg from '../assets/cert_python_springboard.jpg';
import localProfileImg from '../assets/profile.jpg';

export const defaultData = {
  settings: [
    {
      id: 'siteSettings',
      name: 'Leela Harika Bandaru',
      displayName: 'Bandaru\nLeela Harika',
      email: 'bandaruleelaharika@gmail.com',
      phone: '8309436254',
      location: 'Turangi, Kakinada, Andhra Pradesh, India',
      resumeUrl: '', // To be filled from Firebase
      profileImageUrl: localProfileImg,
      whatsappMessage: 'Hello Leela Harika, I would like to discuss a project/opportunity with you.'
    }
  ],
  home: [
    {
      id: 'homeContent',
      greeting: "HELLO, I'M",
      title: "Bandaru\nLeela Harika",
      description: "Passionate about software development, emerging technologies, problem-solving, continuous learning, and building innovative practical solutions.",
      label: "SOFTWARE DEVELOPMENT • AI • WEB TECHNOLOGIES",
      hireMeText: "Hire Me",
      getResumeText: "Get Resume"
    }
  ],
  about: [
    {
      id: 'aboutContent',
      heading: 'ABOUT ME',
      summary: "I am an MCA student passionate about software development and emerging technologies.\n\nI enjoy learning technologies, building practical projects, solving problems, and developing useful software solutions.\n\nPassionate about software development, emerging technologies, problem-solving, continuous learning, and building innovative practical solutions."
    }
  ],
  education: [
    {
      id: 'edu1',
      course: 'Intermediate (MPC)',
      college: 'Sri Chaitanya Junior College',
      location: 'Kakinada, Andhra Pradesh',
      year: '2019–2021',
      percentage: '85%',
      description: 'Completed Intermediate education with Mathematics, Physics and Chemistry.',
      order: 1
    },
    {
      id: 'edu2',
      course: 'B.Sc (MECS)',
      college: 'V.S. Lakshmi Degree College',
      location: 'Kakinada, Andhra Pradesh',
      year: '2021–2024',
      percentage: '80%',
      description: 'Completed Bachelor of Science with Mathematics, Electronics, and Computer Science.',
      order: 2
    },
    {
      id: 'edu3',
      course: 'Master of Computer Applications (MCA)',
      college: 'Aditya University',
      location: 'Surampalem, Andhra Pradesh',
      year: '2024–2026',
      percentage: '85%',
      description: 'Pursuing Master of Computer Applications with focus on Software Engineering, Web Technologies and AI/ML.',
      order: 3
    }
  ],
  skills: [
    { id: 'sk1', name: 'Java', category: 'Technical', order: 1 },
    { id: 'sk2', name: 'Python', category: 'Technical', order: 2 },
    { id: 'sk3', name: 'Data Structures', category: 'Technical', order: 3 },
    { id: 'sk4', name: 'HTML', category: 'Technical', order: 4 },
    { id: 'sk5', name: 'CSS', category: 'Technical', order: 5 },
    { id: 'sk6', name: 'MS Word', category: 'Tools & Software', order: 6 },
    { id: 'sk7', name: 'MS Excel', category: 'Tools & Software', order: 7 },
    { id: 'sk8', name: 'MS PowerPoint', category: 'Tools & Software', order: 8 },
    { id: 'sk9', name: 'Good Communication', category: 'Professional', order: 9 },
    { id: 'sk10', name: 'Quick Learner', category: 'Professional', order: 10 },
    { id: 'sk11', name: 'Team Worker', category: 'Professional', order: 11 },
  ],
  internships: [
    {
      id: 'int1',
      company: 'BIST Technologies Pvt. Ltd.',
      location: 'Vijayawada, Andhra Pradesh',
      year: '2023',
      role: 'Artificial Intelligence and Machine Learning',
      description: 'Gained proficiency in Artificial Intelligence and Machine Learning.',
      imageUrl: bistImg,
      order: 1
    },
    {
      id: 'int2',
      company: 'Blackbuck Engineers Pvt. Ltd.',
      location: 'Hyderabad, Telangana',
      year: '2025',
      role: 'Full Stack Web Development with MERN',
      description: 'Gained proficiency in Full Stack Web Development with MERN.',
      imageUrl: blackbuckImg,
      order: 2
    }
  ],
  projects: [
    {
      id: 'proj1',
      title: 'Gas and Smoke Detector',
      description: 'This project aims to create a system that senses the presence of harmful gases in the surrounding environment and provides an alert to people.',
      imageUrl: gasDetectorImg, 
      order: 1
    },
    {
      id: 'proj2',
      title: 'Crime Detection Using Multi-Layer Perceptron in Social Media Platforms',
      description: 'To identify and analyse criminal activities from social media platforms.',
      imageUrl: crimeDetectionImg,
      order: 2
    }
  ],
  certifications: [
    {
      id: 'cert1',
      title: 'Employability Skill Programme',
      organization: 'Mahindra Pride collaboration with Nandi Foundation',
      year: '2023',
      description: 'Comprehensive employability and professional skill enhancement program focusing on corporate communication, presentation, and team collaboration.',
      coverUrl: certMahindraImg,
      certificateUrl: '',
      order: 1
    },
    {
      id: 'cert2',
      title: 'Career Orientation Program',
      organization: 'Ikka Learning Foundation collaboration with Coromandel',
      year: '2024',
      description: 'Career orientation and industry readiness initiative covering professional roadmapping, corporate etiquette, and industry trends.',
      coverUrl: certIkkaImg,
      certificateUrl: '',
      order: 2
    },
    {
      id: 'cert3',
      title: 'HTML Basics',
      organization: 'Edu Pyramids',
      year: '',
      description: 'Foundational certification covering modern HTML5 markup, document structure, semantics, and accessible web standards.',
      coverUrl: certHtmlImg,
      certificateUrl: '',
      order: 3
    },
    {
      id: 'cert4',
      title: 'Python Basics',
      organization: 'Spring Board',
      year: '',
      description: 'Core certification verifying practical understanding of Python programming, control flow, functions, and data structures.',
      coverUrl: certPythonImg,
      certificateUrl: '',
      order: 4
    }
  ],
  contact: [
    {
      id: 'contactInfo',
      email: 'bandaruleelaharika@gmail.com',
      phone: '8309436254',
      location: 'Turangi, Kakinada, Andhra Pradesh, India'
    }
  ]
};
