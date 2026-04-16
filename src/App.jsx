import React, { useState, useEffect } from 'react';
import { 
  Globe, Phone, MapPin, Clock, MessageCircle, 
  ArrowRight, CheckCircle, Star, GraduationCap, 
  ShieldCheck, Briefcase, Target, FileText, Landmark, 
  IdCard, PlaneTakeoff, Lock, BookOpen,
  LayoutDashboard, Image as ImageIcon, LogOut, ChevronRight, ChevronDown,
  Settings as SettingsIcon, Upload, X, Camera, Trash2, Navigation,
  Mail, Award, Compass, UserCheck, PlusCircle, ArrowLeft, Sun, Moon, Menu, Users
} from 'lucide-react';

// --- সোশ্যাল মিডিয়ার জন্য কাস্টম SVG আইকন ---
const FacebookIcon = ({ size = 18 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);
const InstagramIcon = ({ size = 18 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const LinkedinIcon = ({ size = 18 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>);
const YoutubeIcon = ({ size = 18 }) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>);

// --- ডাইনামিক কালার থিমের জন্য হেল্পার ফাংশন ---
const hexToRgb = (hex) => {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16) || 211;
  const g = parseInt(h.substring(2, 4), 16) || 47;
  const b = parseInt(h.substring(4, 6), 16) || 47;
  return `${r}, ${g}, ${b}`;
};

const darkenHex = (hex, percent) => {
  const h = hex.replace('#', '');
  let r = parseInt(h.substring(0, 2), 16) || 211;
  let g = parseInt(h.substring(2, 4), 16) || 47;
  let b = parseInt(h.substring(4, 6), 16) || 47;
  r = Math.max(0, Math.floor(r * (1 - percent / 100)));
  g = Math.max(0, Math.floor(g * (1 - percent / 100)));
  b = Math.max(0, Math.floor(b * (1 - percent / 100)));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

// --- মাল্টিলিঙ্গুয়াল ডিকশনারি ---
const translations = {
  bn: {
    nav: { home: 'হোম', aboutUs: 'আমাদের সম্পর্কে', whyJapan: 'কেন জাপান', courses: 'কোর্সসমূহ', process: 'প্রক্রিয়া', gallery: 'ফটো বুথ', blog: 'ব্লগ', map: 'অবস্থান', contact: 'যোগাযোগ' },
    btn: { contact: 'পরামর্শ বুক করুন', apply: 'কোর্স দেখুন', syllabus: 'সিলেবাস ডাউনলোড', admin: 'অ্যাডমিন প্যানেল' },
    hero: {
      badge: '২০২৪-এর ভর্তি চলছে',
      title: 'জাপানে আপনার ভবিষ্যৎ',
      titleHighlight: 'গড়ার সরাসরি পথ।',
      subtitle: 'জাপানি ভাষা শেখা থেকে শুরু করে স্টুডেন্ট ভিসা নিশ্চিত করা পর্যন্ত, JLI MIRAI DHAKA দিচ্ছে একটি প্রিমিয়াম এবং শতভাগ স্বচ্ছ গাইডলাইন।',
      stats: { native: 'নেটিভ ইন্সট্রাক্টর', ssw: 'SSW ও স্টুডেন্ট ভিসা', success: '৯৮% সাফল্যের হার' },
      floating: '৫০০+ শিক্ষার্থী বর্তমানে জাপানে'
    },
    aboutPage: {
      tag: 'আমাদের সম্পর্কে',
      title: 'JLI MIRAI সম্পর্কে জানুন',
      subtitle: 'জাপানি ভাষা শিক্ষা এবং আন্তর্জাতিক শিক্ষার্থীদের জন্য সঠিক নির্দেশনার এক বিশ্বস্ত নাম।',
      kobeTitle: 'MIRAI কোবে (মেইন ক্যাম্পাস)',
      kobeDesc: 'জাপানের কোবে (সান্নোমিয়া) শহরের প্রাণকেন্দ্রে অবস্থিত আমাদের মূল ক্যাম্পাস আন্তর্জাতিক শিক্ষার্থীদের জাপানি ভাষা, ভিসা প্রসেসিং এবং জীবনযাত্রার সার্বিক সহায়তা প্রদান করে।',
      featuresTitle: 'ক্যাম্পাসের বৈশিষ্ট্য',
      f1: { title: "কেন্দ্রীয় অবস্থান", desc: "কোবে শহরের প্রাণকেন্দ্র সান্নোমিয়ায় অবস্থিত।" },
      f2: { title: "আধুনিক ক্লাসরুম", desc: "বিশ্বমানের প্রযুক্তি সম্পন্ন লার্নিং ফ্যাসিলিটি।" },
      f3: { title: "শিক্ষার্থী সহায়তা", desc: "জাপানে দৈনন্দিন জীবনের জন্য সার্বক্ষণিক গাইডেন্স।" },
      f4: { title: "ক্যারিয়ার গাইডেন্স", desc: "পার্ট-টাইম ও ফুল-টাইম চাকরি প্রাপ্তিতে সহায়তা।" },
      f5: { title: "সাংস্কৃতিক প্রশিক্ষণ", desc: "জাপানি আদবকেতা এবং কালচারের বাস্তব শিক্ষা।" },
      f6: { title: "নিরাপদ পরিবেশ", desc: "শিক্ষার্থীদের জন্য শতভাগ নিরাপদ এবং বন্ধুত্বপূর্ণ ক্যাম্পাস।" },
      globalTitle: 'গ্লোবাল উপস্থিতি',
      globalDesc: 'জাপান (হেডকোয়ার্টার), বাংলাদেশ, ভিয়েতনাম এবং শ্রীলঙ্কায় আমাদের অফিস রয়েছে এবং আমাদের এই বিস্তৃতি চলমান।',
      dhakaTitle: 'MIRAI ঢাকা ব্রাঞ্চ',
      dhakaDesc: 'MIRAI Kobe-এর অফিসিয়াল সাব-ব্রাঞ্চ, যা বাংলাদেশী শিক্ষার্থীদের জন্য বিশ্বমানের জাপানি ভাষা প্রশিক্ষণ এবং নির্ভরযোগ্য ভিসা সহায়তা প্রদান করছে।',
      mdTitle: 'ম্যানেজিং ডিরেক্টরের বার্তা',
      mdQuote: '"আমাদের মূল ভিত্তি হলো শৃঙ্খলা, সততা এবং সাফল্য। আমরা জাপানে আন্তর্জাতিক মেধার ভবিষ্যৎ গড়তে প্রতিশ্রুতিবদ্ধ।"',
      teamTitle: 'আমাদের নিবেদিত টিম',
      countryManager: 'কান্ট্রি ম্যানেজার',
      employee: 'ল্যাঙ্গুয়েজ ইন্সট্রাক্টর',
      stats: { students: "৫০০+", success: "৯৮%", countries: "৪+" }
    },
    whyMirai: {
      tag: 'কেন আমরা সেরা',
      title: 'মিরাই অ্যাডভান্টেজ',
      p1: { title: 'মিরাই নেটওয়ার্কের অংশ', desc: 'জাপানে শিক্ষার উপর দৃষ্টি নিবদ্ধ করা অন্যতম প্রধান শাখা।' },
      p2: { title: 'জাপানি স্ট্যান্ডার্ড পদ্ধতি', desc: 'বাস্তব জাপানি শিক্ষা এবং জীবনযাত্রার সাথে সামঞ্জস্যপূর্ণ প্রশিক্ষণ।' },
      p3: { title: 'শক্তিশালী নেতৃত্বের দৃষ্টিভঙ্গি', desc: 'আমাদের ম্যানেজিং ডিরেক্টর মিরাই কোয়ালিটিতে বিশ্বাস করেন — শৃঙ্খলা, সততা এবং সাফল্য।' },
      p4: { title: 'শুধু ভিসার চেয়েও বেশি', desc: 'আমরা শিক্ষার্থীদের শুধু কাগজপত্রের জন্য নয়, জাপানে বাস্তব জীবনের জন্য প্রস্তুত করি।' },
      p5: { title: 'জাপান-প্রশিক্ষিত শিক্ষক', desc: 'আমাদের শিক্ষকরা জাপানে প্রশিক্ষণপ্রাপ্ত, যারা খাঁটি ভাষা এবং সাংস্কৃতিক শিক্ষা প্রদান করেন।' }
    },
    whyJapan: {
      tag: 'গন্তব্য',
      title: 'কেন জাপান বেছে নিবেন?',
      subtitle: 'প্রাচীন ঐতিহ্য এবং আধুনিক প্রযুক্তির এক অনন্য সংমিশ্রণ, যা আন্তর্জাতিক মেধাবীদের জন্য দিচ্ছে অতুলনীয় সুযোগ।',
      c1: { title: 'বিশ্বমানের শিক্ষা', desc: 'বিশ্বব্যাপী স্বীকৃত বিশ্ববিদ্যালয় এবং উন্নত গবেষণাগারে পড়ার সুযোগ।' },
      c2: { title: 'নিরাপদ পরিবেশ', desc: 'বিশ্বের অন্যতম নিরাপদ দেশ। শিক্ষার্থী এবং তাদের অভিভাবকদের জন্য সম্পূর্ণ চিন্তামুক্ত পরিবেশ।' },
      c3: { title: 'উন্নত ক্যারিয়ার', desc: 'আইটি, ইঞ্জিনিয়ারিং, ব্যবসা এবং স্বাস্থ্যসেবা খাতে দক্ষ আন্তর্জাতিক কর্মীদের ব্যাপক চাহিদা।' }
    },
    expertise: {
      tag: 'আমাদের বিশেষত্ব',
      title: 'আমরা সব দেশের কাজ করি না।',
      titleHighlight: 'আমরা শুধু জাপানের কাজ করি।',
      desc: 'সাধারণ কনসালটেন্সির মতো নয়, আমাদের সম্পূর্ণ ফোকাস, দক্ষতা এবং নেটওয়ার্ক শুধু জাপানের জন্য নিবেদিত।',
      f1: { title: 'গভীর বাজার জ্ঞান', desc: 'জাপানের ইমিগ্রেশন আইন এবং বিশ্ববিদ্যালয়ের প্রয়োজনীয়তা সম্পর্কে আমাদের রয়েছে সম্পূর্ণ ধারণা।' },
      f2: { title: 'নেটিভ এবং N2- N3 ইন্সট্রাক্টর', desc: 'সেরা বিশেষজ্ঞদের কাছ থেকে সরাসরি জাপানি ভাষা এবং ইন্টারভিউ শিষ্টাচার শিখুন।' },
      f3: { title: 'ভিসা প্রসেসিং', desc: 'কোনো লুকানো চার্জ নেই। আমরা স্টুডেন্ট এবং SSW ভিসার জটিল কাগজপত্র নিখুঁতভাবে পরিচালনা করি।' }
    },
    courses: {
      tag: 'ভাষার দক্ষতা',
      title: 'JLPT প্রস্তুতি কোর্স',
      subtitle: 'একেবারে নতুন থেকে নেটিভ লেভেলের সাবলীলতা অর্জনের জন্য ডিজাইন করা নিবিড় কারিকুলাম।',
      n5: { title: 'N5', level: 'প্রাথমিক', desc: 'মৌলিক শব্দভাণ্ডার এবং বর্ণমালা শিখুন। প্রাথমিক ভিসা আবেদনের জন্য অপরিহার্য।', time: '৪ মাস', hrs: '১৫0+ ঘণ্টা' },
      n4: { title: 'N4', level: 'উচ্চ প্রাথমিক', desc: 'দৈনন্দিন কথোপকথন বুঝতে পারা। পার্ট-টাইম জব এবং SSW ভিসার জন্য ন্যূনতম যোগ্যতা।', time: '৪ মাস', hrs: '২০০+ ঘণ্টা' },
      n3: { title: 'N3', level: 'মাধ্যমিক', desc: 'শীর্ষ বিশ্ববিদ্যালয়ে ভর্তি এবং জাপানে ফুল-টাইম কর্পোরেট চাকরির চূড়ান্ত গেটওয়ে।', time: '৬ মাস', hrs: '৩০০+ ঘণ্টা' }
    },
    process: {
      tag: 'স্বচ্ছ রোডম্যাপ',
      title: 'আপনার যাত্রা সহজ করা হলো',
      subtitle: 'আমরা বিদেশে পড়াশোনার জটিল ইমিগ্রেশন প্রক্রিয়াটিকে ৫টি ধাপে বিভক্ত করেছি।',
      s1: { title: 'কাউন্সেলিং', desc: 'লক্ষ্য নির্ধারণ এবং বাস্তবসম্মত সময়রেখা তৈরি।' },
      s2: { title: 'ভাষা প্রস্তুতি', desc: 'আমাদের নিবিড় কোর্সের মাধ্যমে ন্যূনতম N5/N4 অর্জন।' },
      s3: { title: 'প্রতিষ্ঠান নির্বাচন', desc: 'শীর্ষস্থানীয় বিশ্ববিদ্যালয়ের সাথে ম্যাচিং।' },
      s4: { title: 'ভিসা প্রসেসিং', desc: 'COE এবং এম্বাসির কাগজপত্রের নিখুঁত পরিচালনা।' },
      s5: { title: 'প্রি-ডিপার্চার', desc: 'শিষ্টাচার প্রশিক্ষণ এবং জাপানের জীবনযাত্রা সম্পর্কে ব্রিফিং।' }
    },
    photoBooth: {
      tag: 'সাফল্যের গল্প',
      title: 'আমাদের সফল শিক্ষার্থীরা',
      subtitle: 'জাপানে পাড়ি জমানো আমাদের শিক্ষার্থীদের কিছু স্মরণীয় মুহূর্ত।'
    },
    blog: {
      tag: 'আমাদের ব্লগ',
      title: 'সর্বশেষ খবর ও নিবন্ধ',
      readMore: 'আরও পড়ুন',
      allBlogs: 'সব ব্লগ দেখুন',
      backToBlogs: 'ব্লগ লিস্টে ফিরে যান'
    },
    global: {
      tag: 'গ্লোবাল উপস্থিতি',
      title: 'আমাদের অবস্থানসমূহ',
      dhaka: 'JLI MIRAI ঢাকা',
      kobe: 'MIRAI কোবে (হেড অফিস)'
    },
    contact: {
      title: 'শুরু করতে প্রস্তুত?',
      desc: 'আমাদের বিশেষজ্ঞদের সাথে একটি ফ্রি সেশন বুক করুন। আপনার ভাষার লক্ষ্য এবং ভিসার সময়রেখা ম্যাপ করুন।',
      formTitle: 'ফ্রি সেশন বুক করুন',
      name: 'পুরো নাম',
      phone: 'ফোন নম্বর',
      interest: 'আগ্রহের বিষয়',
      options: ['জাপানি ভাষা (JLPT)', 'জাপানে পড়াশোনা (স্টুডেন্ট ভিসা)', 'SSW এবং ওয়ার্ক ভিসা', 'উভয়ই (ভাষা + ভিসা)'],
      commit: 'কোনো বাধ্যবাধকতা নেই'
    }
  },
  en: {
    nav: { home: 'Home', aboutUs: 'About Us', whyJapan: 'Why Japan', courses: 'Courses', process: 'Process', gallery: 'Photo Booth', blog: 'Blog', map: 'Locations', contact: 'Contact' },
    btn: { contact: 'Book Consultation', apply: 'Explore Courses', syllabus: 'Download Syllabus', admin: 'Admin Panel' },
    hero: {
      badge: 'Admissions Open 2024',
      title: 'Your Gateway to a',
      titleHighlight: 'Future in Japan.',
      subtitle: 'Comprehensive language training and expert visa guidance, ensuring a seamless transition to your life and studies in Japan.',
      stats: { native: 'Native Instructors', ssw: 'SSW & Intl. Visas', success: '98% Success Rate' },
      floating: '500+ Students Currently in Japan'
    },
    aboutPage: {
      tag: 'About Us',
      title: 'Discover JLI MIRAI',
      subtitle: 'Empowering global careers through premier Japanese language education and comprehensive support.',
      kobeTitle: 'MIRAI Kobe (Main Campus)',
      kobeDesc: 'Located in the heart of Kobe (Sannomiya), our main campus focuses on empowering international students with language proficiency, visa processing, and holistic life support in Japan.',
      featuresTitle: 'Main Campus Features',
      f1: { title: "Central Location", desc: "Located in vibrant Sannomiya, Kobe." },
      f2: { title: "Modern Classrooms", desc: "State-of-the-art learning facilities." },
      f3: { title: "Student Support", desc: "Dedicated guidance for daily life in Japan." },
      f4: { title: "Career Guidance", desc: "Job placement and interview preparation." },
      f5: { title: "Cultural Training", desc: "Immersive Japanese cultural etiquette." },
      f6: { title: "Safe Environment", desc: "Secure, welcoming campus for all." },
      globalTitle: 'Global Presence',
      globalDesc: 'MIRAI is expanding rapidly with offices in Japan (HQ), Bangladesh, Vietnam, and Sri Lanka.',
      dhakaTitle: 'MIRAI Dhaka Branch',
      dhakaDesc: 'The official sub-branch of MIRAI Kobe, dedicated to providing world-class language training and reliable visa support for Bangladeshi students.',
      mdTitle: 'Message from the Managing Director',
      mdQuote: '"Our core values are discipline, honesty, and success. We are committed to shaping the future of global talents in Japan."',
      teamTitle: 'Our Dedicated Team',
      countryManager: 'Country Manager',
      employee: 'Language Instructor',
      stats: { students: "500+", success: "98%", countries: "4+" }
    },
    whyMirai: {
      tag: 'Why Choose Us',
      title: 'The MIRAI Advantage',
      p1: { title: 'Part of MIRAI Network', desc: 'One of the key branches globally focused exclusively on Japan education.' },
      p2: { title: 'Japanese Standard Approach', desc: 'Training strictly aligned with real Japanese education and lifestyle.' },
      p3: { title: 'Strong Leadership Vision', desc: 'Our Managing Director believes in MIRAI Quality — discipline, honesty, and success.' },
      p4: { title: 'Beyond Just Visa', desc: 'We prepare students for real life and survival in Japan, not just the paperwork.' },
      p5: { title: 'Japan-Trained Teachers', desc: 'Our instructors are trained in Japan, providing authentic linguistic and cultural education.' }
    },
    whyJapan: {
      tag: 'The Destination',
      title: 'Why Choose Japan?',
      subtitle: 'Discover a nation where rich cultural heritage meets advanced technology, providing exceptional prospects for global talent.',
      c1: { title: 'Academic Excellence', desc: 'Gain admission to globally recognized institutions renowned for cutting-edge research and innovation.' },
      c2: { title: 'Secure Environment', desc: 'Experience living in one of the world\'s safest countries, offering complete peace of mind.' },
      c3: { title: 'Career Opportunities', desc: 'Tap into a high-demand job market seeking international professionals in technology, engineering, and healthcare.' }
    },
    expertise: {
      tag: 'Our Advantage',
      title: "Specialized Focus.",
      titleHighlight: 'Exclusive to Japan.',
      desc: 'Unlike general agencies, our dedicated expertise and established network are exclusively focused on the Japanese education and employment sectors.',
      f1: { title: 'Deep Market Knowledge', desc: 'Our dedicated focus ensures a thorough understanding of Japanese immigration laws and university requirements.' },
      f2: { title: 'Native & N2-N3 Instructors', desc: 'Learn authentic Japanese, cultural nuances, and professional etiquette directly from certified experts.' },
      f3: { title: 'Comprehensive Visa Support', desc: 'We manage the complexities of Student and SSW visa documentation with complete transparency.' }
    },
    courses: {
      tag: 'Language Programs',
      title: 'JLPT Preparation',
      subtitle: 'Structured, comprehensive language curriculums designed to guide you from foundational basics to professional fluency.',
      n5: { title: 'N5', level: 'Beginner', desc: 'Build a strong foundation in essential vocabulary and scripts. The crucial first step for your visa application.', time: '4 Months', hrs: '150+ Hrs' },
      n4: { title: 'N4', level: 'Elementary', desc: 'Develop conversational proficiency. The standard requirement for part-time employment and SSW visas.', time: '4 Months', hrs: '200+ Hrs' },
      n3: { title: 'N3', level: 'Intermediate', desc: 'Achieve business-level comprehension. Your pathway to top university admissions and corporate careers.', time: '6 Months', hrs: '300+ Hrs' }
    },
    process: {
      tag: 'Transparent Roadmap',
      title: 'A Seamless Pathway',
      subtitle: 'We simplify the transition of studying abroad through a structured, five-step guided process.',
      s1: { title: 'Counseling', desc: 'Goal assessment and realistic academic timeline mapping.' },
      s2: { title: 'Language Prep', desc: 'Achieve essential N5/N4 proficiency through our intensive courses.' },
      s3: { title: 'School Selection', desc: 'Strategic matching with top-tier universities and institutes.' },
      s4: { title: 'Visa Processing', desc: 'Meticulous handling of your COE and Embassy documentation.' },
      s5: { title: 'Pre-Departure', desc: 'Cultural etiquette training and comprehensive life-in-Japan briefing.' }
    },
    photoBooth: {
      tag: 'Success Gallery',
      title: 'Our Successful Students',
      subtitle: 'Glimpses of our students living their dream and succeeding in Japan.'
    },
    blog: {
      tag: 'Our Blog',
      title: 'Latest News & Articles',
      readMore: 'Read More',
      allBlogs: 'View All Blogs',
      backToBlogs: 'Back to all articles'
    },
    global: {
      tag: 'Global Presence',
      title: 'Our Network',
      dhaka: 'JLI MIRAI Dhaka',
      kobe: 'MIRAI Kobe (Head Office)'
    },
    contact: {
      title: 'Start Your Journey',
      desc: 'Schedule a complimentary strategy session with our experts to outline your language goals and visa timeline.',
      formTitle: 'Request a Consultation',
      name: 'Full Name',
      phone: 'Phone Number',
      interest: 'Area of Interest',
      options: ['Language Training (JLPT)', 'Study in Japan (Student Visa)', 'Work in Japan (SSW Visa)', 'Comprehensive (Language + Visa)'],
      commit: 'No commitment required'
    }
  },
  ja: {
    nav: { home: 'ホーム', aboutUs: '私たちについて', whyJapan: '日本を選ぶ理由', courses: 'コース', process: 'プロセス', gallery: 'ギャラリー', blog: 'ブログ', map: '拠点', contact: '連絡先' },
    btn: { contact: '相談を予約する', apply: 'コースを見る', syllabus: 'シラバスをダウンロード', admin: '管理者パネル' },
    hero: {
      badge: '2024年度 募集中',
      title: '日本での未来を築く',
      titleHighlight: '直接の道。',
      subtitle: '日本語の習得から学生ビザの取得まで、JLI MIRAI DHAKAはプレミアムで包括的なサポートを提供します。',
      stats: { native: 'ネイティブ講師', ssw: 'SSW＆学生ビザ', success: '98%の成功率' },
      floating: '現在500人以上の学生が日本にいます'
    },
    aboutPage: {
      tag: '私たちについて',
      title: 'JLI MIRAIの紹介',
      subtitle: '質の高い日本語教育と包括的なサポートで、グローバルなキャリアを支援します。',
      kobeTitle: 'MIRAI 神戸 (本部)',
      kobeDesc: '神戸（三宮）の中心に位置する本校は、留学生への語学教育、ビザ手続き、日本での生活全般のサポートに注力しています。',
      featuresTitle: 'キャンパスの特徴',
      f1: { title: "中心的な立地", desc: "活気ある神戸・三宮に位置。" },
      f2: { title: "最新の教室", desc: "最先端の学習設備。" },
      f3: { title: "学生サポート", desc: "日本での日常生活を親身にサポート。" },
      f4: { title: "キャリア指導", desc: "就職斡旋や面接対策。" },
      f5: { title: "文化研修", desc: "日本のマナーや文化を深く学ぶ。" },
      f6: { title: "安全な環境", desc: "安心・安全なキャンパス。" },
      globalTitle: 'グローバルな展開',
      globalDesc: 'MIRAIは、日本（本部）、バングラデシュ、ベトナム、スリランカにオフィスを構え、急速に拡大しています。',
      dhakaTitle: 'MIRAI ダッカ校',
      dhakaDesc: 'バングラデシュの学生に世界基準の語学研修と信頼できるビザサポートを提供する、MIRAI神戸の公式分校です。',
      mdTitle: '代表からのメッセージ',
      mdQuote: '「私たちのコアバリューは、規律、誠実、そして成功です。日本で活躍するグローバル人材の未来を形作ることに尽力しています。」',
      teamTitle: '献身的なチーム',
      countryManager: 'カントリーマネージャー',
      employee: '日本語講師',
      stats: { students: "500+", success: "98%", countries: "4+" }
    },
    whyMirai: {
      tag: '私たちが選ばれる理由',
      title: 'ミライのアドバンテージ',
      p1: { title: 'ミライネットワークの一部', desc: '日本の教育に専念する世界的な主要支部の一つ。' },
      p2: { title: '日本標準のアプローチ', desc: '実際の日本の教育とライフスタイルに厳密に合わせたトレーニング。' },
      p3: { title: '強力なリーダーシップのビジョン', desc: '私たちのマネージングディレクターは、規律、誠実さ、そして成功という「ミライの品質」を信じています。' },
      p4: { title: '単なるビザ以上のもの', desc: '書類だけでなく、日本での実際の生活と生存に向けて学生を準備します。' },
      p5: { title: '日本で訓練を受けた教師', desc: '私たちのインストラクターは日本で訓練を受けており、本物の言語と文化教育を提供します。' }
    },
    whyJapan: {
      tag: '目的地',
      title: 'なぜ日本を選ぶのか？',
      subtitle: '古代の伝統と超近代的な革新のユニークな融合が、比類のない機会を提供します。',
      c1: { title: '世界クラスの教育', desc: '世界的に認められた大学や最先端の研究施設へのアクセス。' },
      c2: { title: '最も安全な環境', desc: '常に世界で最も安全な国の一つにランクされています。完全な安心感。' },
      c3: { title: '有利なキャリア', desc: 'IT、エンジニアリング、ビジネス、ヘルスケアにおける熟練した国際的な人材の膨大な需要。' }
    },
    expertise: {
      tag: '私たちの強み',
      title: '私たちは「どこでも」やりません。',
      titleHighlight: '日本専門です。',
      desc: '一般的なコンサルタントとは異なり、私たちのすべての焦点、専門知識、ネットワークは日本のみに捧げられています。',
      f1: { title: '深い市場知識', desc: '私たちの専心的な態度は、日本の移民法に関する深い習熟を保証します。' },
      f2: { title: 'ネイティブ＆N2-N3講師', desc: '本物の日本語、文化的なニュアンス、面接のエチケットを専門家から直接学びます。' },
      f3: { title: 'エンドツーエンドのビザ', desc: '隠れた費用はゼロ。学生ビザやSSWビザの複雑な書類作成を完璧に処理します。' }
    },
    courses: {
      tag: '言語の習得',
      title: 'JLPT対策コース',
      subtitle: '完全な初心者からネイティブレベルの流暢さまで導くように設計された集中的なカリキュラム。',
      n5: { title: 'N5', level: '初級', desc: '基本的な語彙とアルファベットを習得。最初のビザ申請のための重要な第一歩。', time: '4ヶ月', hrs: '150+ 時間' },
      n4: { title: 'N4', level: '初中級', desc: '日常会話を理解する。アルバイトやSSWビザの最低条件。', time: '4ヶ月', hrs: '200+ 時間' },
      n3: { title: 'N3', level: '中級', desc: '日本でのトップ大学入学やフルタイムの企業就職への究極の登竜門。', time: '6ヶ月', hrs: '300+ 時間' }
    },
    process: {
      tag: '透明なロードマップ',
      title: 'シンプルな道のり',
      subtitle: '複雑な移民プロセスを5つの完全にサポートされた段階に分けることで、留学の不安を取り除きます。',
      s1: { title: 'カウンセリング', desc: '目標の評価と現実的なタイムラインの作成。' },
      s2: { title: '言語準備', desc: '集中的なコースを通じて最低N5/N4を達成。' },
      s3: { title: '学校選び', desc: 'トップクラスの大学や機関とのマッチング。' },
      s4: { title: 'ビザ処理', desc: 'COEおよび大使館の書類の完璧な取り扱い。' },
      s5: { title: '出発前', desc: 'エチケットの訓練と日本での生活についての説明。' }
    },
    photoBooth: {
      tag: '成功事例',
      title: '成功した学生たち',
      subtitle: '日本で夢を生き、成功を収めている私たちの学生たちの様子。'
    },
    blog: {
      tag: '私たちのブログ',
      title: '最新ニュースと記事',
      readMore: '続きを読む',
      allBlogs: 'すべてのブログ',
      backToBlogs: 'ブログに戻る'
    },
    global: {
      tag: 'グローバルな存在感',
      title: '私たちの拠点',
      dhaka: 'JLI MIRAI ダッカ',
      kobe: 'MIRAI 神戸 (本社)'
    },
    contact: {
      title: '始める準備はできましたか？',
      desc: '専門家との無料戦略セッションをスケジュールしてください。言語の目標とビザのタイムラインを計画しましょう。',
      formTitle: '無料セッションを予約する',
      name: 'フルネーム',
      phone: '電話番号',
      interest: '主な関心事',
      options: ['日本語学習（JLPT）', '日本留学（学生ビザ）', 'SSWおよび就労ビザ', '両方（言語＋ビザ）'],
      commit: 'コミットメントは必要ありません'
    }
  }
};

const initialImages = {
  hero: "https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  expertise: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  kobeCampus: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  mdImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
};

const initialTeamMembers = [
  { id: 1, name: 'Name Placeholder', role: 'Country Manager', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'Instructor Name', role: 'Language Instructor', image: '' },
  { id: 3, name: 'Instructor Name', role: 'Language Instructor', image: '' },
  { id: 4, name: 'Instructor Name', role: 'Language Instructor', image: '' },
];

const initialGallery = [
  "https://images.unsplash.com/photo-1517260739337-6799d239ce83?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1551326844-4df70f78d0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

const initialSiteSettings = {
  primaryColor: '#D32F2F', 
  logoTextMain: 'MIRAI',
  logoTextSub: 'DHAKA',
  logoImage: '/image_711d40.png', 
  syllabusLinks: { n5: '', n4: '', n3: '' },
  heroLayout: 'split',
  heroTextColor: '',
  aboutTextColor: ''
};

const initialBlogs = [
  {
    id: 1,
    title: 'How to Prepare for JLPT N5 in 4 Months',
    date: 'October 12, 2024',
    image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Starting your Japanese learning journey? Here is a step-by-step guide to clearing the JLPT N5...',
    content: 'Starting your Japanese learning journey? Here is a step-by-step guide to clearing the JLPT N5.\n\n1. Master Hiragana and Katakana first.\n2. Build a core vocabulary of 800 words.\n3. Understand basic grammar patterns like particles (wa, ga, o, ni).\n4. Practice listening daily using native resources.'
  },
  {
    id: 2,
    title: 'Life in Japan: Cost of Living for Students',
    date: 'September 28, 2024',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Planning your budget for studying in Japan? We break down the average monthly expenses for international students...',
    content: 'Planning your budget for studying in Japan? We break down the average monthly expenses for international students.\n\nAccommodation: ¥30,000 - ¥50,000\nFood: ¥25,000 - ¥40,000\nUtilities: ¥10,000\nTransport: ¥5,000\n\nTotal estimated monthly cost is around ¥80,000 to ¥100,000 depending on your lifestyle and location.'
  },
  {
    id: 3,
    title: 'Top 5 Part-Time Jobs for International Students',
    date: 'August 15, 2024',
    image: 'https://images.unsplash.com/photo-1551326844-4df70f78d0e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    excerpt: 'Discover the most accessible and rewarding arubaito (part-time jobs) available for students in Japan...',
    content: 'International students in Japan are allowed to work up to 28 hours a week. Here are the top jobs:\n\n1. Convenience Store (Kombini) Staff\n2. English Teacher / Tutor\n3. Restaurant or Cafe Staff\n4. Delivery Staff\n5. Factory / Sorting Staff\n\nSpeaking basic Japanese (N4) greatly increases your chances of finding a good job!'
  }
];

// --- অ্যাডমিন প্যানেলের ইনপুট কম্পোনেন্ট (পুনরায় রেন্ডার এড়াতে আলাদা করা) ---
const AdminInput = ({ label, value, onChange, isTextArea = false }) => (
  <div className="mb-4 w-full">
    <label className="block text-sm font-bold text-gray-400 mb-2 leading-[1.5]">{label}</label>
    {isTextArea ? (
      <textarea rows="3" value={value || ''} onChange={e => onChange(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#08162c] text-white focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] transition-all resize-none leading-[1.5]" />
    ) : (
      <input type="text" value={value || ''} onChange={e => onChange(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#08162c] text-white focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] transition-all leading-[1.5]" />
    )}
  </div>
);

// --- মূল অ্যাপ্লিকেশন ---
export default function App() {
  const [isAppReady, setIsAppReady] = useState(false);
  const [theme, setTheme] = useState('light');
  const [lang, setLang] = useState('bn'); // ডিফল্ট ভাষা বাংলা
  const [view, setView] = useState('public'); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  
  // কাস্টম হ্যাশ রাউটার স্টেট
  const [currentRoute, setCurrentRoute] = useState({ path: '/', id: null });
  
  const [db, setDb] = useState(translations);
  const [images, setImages] = useState(initialImages);
  const [gallery, setGallery] = useState(initialGallery);
  const [siteSettings, setSiteSettings] = useState(initialSiteSettings);
  const [blogs, setBlogs] = useState(initialBlogs);
  const [team, setTeam] = useState(initialTeamMembers);
  
  const [adminTab, setAdminTab] = useState('content');
  const [adminLang, setAdminLang] = useState('bn');
  const [adminSection, setAdminSection] = useState('hero');
  const [newBlog, setNewBlog] = useState({ title: '', date: '', image: '', excerpt: '', content: '' });

  // নিরাপদে টেইলউইন্ড ডার্ক মোড কনফিগারেশন এবং স্ক্রিপ্ট লোড করা
  useEffect(() => {
    let isMounted = true;

    const loadTailwind = () => {
      return new Promise((resolve) => {
        if (document.getElementById('tailwind-cdn')) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.id = 'tailwind-cdn';
        script.src = 'https://cdn.tailwindcss.com';
        script.onload = resolve;
        script.onerror = resolve; 
        document.head.appendChild(script);
      });
    };

    const loadFonts = () => {
      return new Promise((resolve) => {
        if (document.getElementById('google-fonts')) {
          resolve();
          return;
        }
        const link = document.createElement('link');
        link.id = 'google-fonts';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
        link.onload = resolve;
        link.onerror = resolve;
        document.head.appendChild(link);
      });
    };

    if (!document.getElementById('tailwind-config')) {
      const configScript = document.createElement('script');
      configScript.id = 'tailwind-config';
      configScript.innerHTML = `
        window.tailwind = {
          config: {
            darkMode: 'class',
            theme: { extend: {} }
          }
        };
      `;
      document.head.appendChild(configScript);
    }

    Promise.all([loadTailwind(), loadFonts()]).then(() => {
      if (isMounted) {
        setTimeout(() => setIsAppReady(true), 150); 
      }
    });

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || '/';
      const parts = hash.split('/').filter(Boolean);
      
      if (parts.length === 0) {
        setCurrentRoute({ path: '/', id: null });
      } else if (parts[0] === 'about') {
        setCurrentRoute({ path: '/about', id: null });
      } else if (parts[0] === 'blog' && parts.length === 1) {
        setCurrentRoute({ path: '/blog', id: null });
      } else if (parts[0] === 'blog' && parts[1]) {
        setCurrentRoute({ path: '/blog/:id', id: parseInt(parts[1]) });
      } else {
        setCurrentRoute({ path: '/', id: null });
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); 

    const fallbackTimer = setTimeout(() => {
      if(isMounted && !isAppReady) setIsAppReady(true);
    }, 3000);

    return () => {
      isMounted = false;
      window.removeEventListener('hashchange', handleHashChange);
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const navigateTo = (path) => {
    window.location.hash = path;
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (currentRoute.path !== '/') {
      navigateTo('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // রিঅ্যাক্ট অবজেক্ট এরর এড়াতে নিরাপদ অনুবাদ হেল্পার
  const t = (section, key) => {
    const val = db[lang]?.[section]?.[key];
    return typeof val === 'string' ? val : '';
  };

  // --- অ্যাডমিন ফাংশনসমূহ ---
  const handleContentUpdate = (section, key, value, subKey = null) => {
    setDb(prev => {
      const langData = prev[adminLang] || {};
      const sectionData = langData[section] || {};
      if (subKey) {
        return { ...prev, [adminLang]: { ...langData, [section]: { ...sectionData, [key]: { ...(sectionData[key] || {}), [subKey]: value } } } };
      }
      return { ...prev, [adminLang]: { ...langData, [section]: { ...sectionData, [key]: value } } };
    });
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSiteSettings(prev => ({ ...prev, logoImage: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setGallery(prev => [reader.result, ...prev]);
      reader.readAsDataURL(file);
    }
  };

  const handleTeamUpdate = (id, field, value) => {
    setTeam(prev => prev.map(member => member.id === id ? { ...member, [field]: value } : member));
  };

  const handleTeamImageUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeam(prev => prev.map(member => member.id === id ? { ...member, image: reader.result } : member));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (key) => (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImages(prev => ({ ...prev, [key]: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const removeGalleryImage = (indexToRemove) => setGallery(prev => prev.filter((_, index) => index !== indexToRemove));

  const handleAddBlog = (e) => {
    e.preventDefault();
    if(!newBlog.title || !newBlog.content) return;
    const blogEntry = {
      ...newBlog,
      id: Date.now(),
      date: newBlog.date || new Date().toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' })
    };
    setBlogs([blogEntry, ...blogs]);
    setNewBlog({ title: '', date: '', image: '', excerpt: '', content: '' });
  };

  const handleDeleteBlog = (id) => setBlogs(blogs.filter(b => b.id !== id));

  // --- রিইউজেবল ইউআই কম্পোনেন্টসমূহ ---
  const renderLogo = (isFooter = false) => (
    <div className="flex items-center cursor-pointer group shrink-0" onClick={() => navigateTo('/')}>
      {siteSettings.logoImage ? (
        <img 
          src={siteSettings.logoImage} 
          alt="MIRAI Logo" 
          className={`w-auto object-contain ${isFooter ? 'h-14 sm:h-16 bg-white/10 px-3 py-1.5 rounded-xl' : 'h-10 sm:h-12 bg-white/10 px-2 py-1 rounded-lg'}`} 
        />
      ) : (
        <>
          <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mr-3 transform group-hover:rotate-12 transition-transform duration-300 shrink-0`}>
            <div className="w-3.5 h-3.5 rounded-full bg-[var(--color-primary,#D32F2F)] shadow-[0_0_10px_rgba(var(--color-primary-rgb,211,47,47),0.8)]"></div>
          </div>
          <span className={`font-bold text-2xl text-white tracking-tight whitespace-nowrap leading-[1.2]`}>
            {siteSettings.logoTextMain}<span className="text-[#2D9CDB] font-medium text-lg ml-1 leading-[1.2]">{siteSettings.logoTextSub}</span>
          </span>
        </>
      )}
    </div>
  );

  const renderNavbar = () => (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-[#0b1d3a]/90 backdrop-blur-md border-b border-gray-200 dark:border-white/10 transition-all duration-300">
      <div className="w-full px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="flex justify-between items-center h-20 w-full">
          {renderLogo()}
          
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            <button onClick={() => navigateTo('/about')} className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-[#2D9CDB] uppercase tracking-wider transition-colors whitespace-nowrap leading-[1.5]">{t('nav', 'aboutUs')}</button>
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-[#2D9CDB] uppercase tracking-wider transition-colors whitespace-nowrap leading-[1.5]">{t('nav', 'whyJapan')}</a>
            <a href="#courses" onClick={(e) => scrollToSection(e, 'courses')} className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-[#2D9CDB] uppercase tracking-wider transition-colors whitespace-nowrap leading-[1.5]">{t('nav', 'courses')}</a>
            <a href="#process" onClick={(e) => scrollToSection(e, 'process')} className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-[#2D9CDB] uppercase tracking-wider transition-colors whitespace-nowrap leading-[1.5]">{t('nav', 'process')}</a>
            <button onClick={() => navigateTo('/blog')} className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-[#2D9CDB] uppercase tracking-wider transition-colors whitespace-nowrap leading-[1.5]">{t('nav', 'blog')}</button>
            <a href="#map" onClick={(e) => scrollToSection(e, 'map')} className="text-sm font-bold text-gray-600 dark:text-gray-300 hover:text-[#2D9CDB] uppercase tracking-wider transition-colors whitespace-nowrap leading-[1.5]">{t('nav', 'map')}</a>
            
            <div className="flex items-center gap-4 border-l border-gray-200 dark:border-white/10 pl-4 ml-2">
              <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors" title="থিম পরিবর্তন করুন">
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              <div className="relative inline-block text-left">
                <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="flex items-center gap-1.5 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-sm font-bold uppercase leading-[1.5]" title="ভাষা পরিবর্তন করুন">
                  <Globe size={18} /> {lang} <ChevronDown size={14} />
                </button>
                {isLangMenuOpen && (
                  <div className="absolute right-0 mt-2 w-24 bg-white dark:bg-[#132c53] rounded-xl shadow-2xl border border-gray-100 dark:border-white/10 overflow-hidden z-50">
                    {['bn', 'en', 'ja'].map((l) => (
                      <button key={l} onClick={() => { setLang(l); setIsLangMenuOpen(false); }} className={`block w-full text-left px-4 py-3 text-sm font-bold uppercase transition-colors leading-[1.5] ${lang === l ? 'bg-[var(--color-primary)] text-white' : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5'}`}>
                        {l}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="bg-[var(--color-primary)] text-white px-5 xl:px-7 py-2 lg:py-2.5 rounded-full font-bold hover:bg-[var(--color-primary-dark)] transition-all shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)] hover:scale-105 transform duration-300 text-sm whitespace-nowrap leading-[1.5]">
              {t('btn', 'contact')}
            </a>
          </div>

          {/* মোবাইল অ্যাকশনসমূহ */}
          <div className="lg:hidden flex items-center gap-3">
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors" title="থিম পরিবর্তন করুন">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-600 dark:text-gray-300 focus:outline-none hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors">
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* মোবাইল মেন্যু ড্রপডাউন */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white dark:bg-[#0b1d3a] border-b border-gray-200 dark:border-white/10 shadow-2xl flex flex-col py-6 px-6 gap-5 max-h-[calc(100vh-80px)] overflow-y-auto transition-colors duration-300 z-50">
          <button onClick={() => navigateTo('/about')} className="text-left text-lg font-bold text-gray-600 dark:text-gray-300 hover:text-[#2D9CDB] uppercase tracking-wider leading-[1.2]">{t('nav', 'aboutUs')}</button>
          <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-lg font-bold text-gray-600 dark:text-gray-300 hover:text-[#2D9CDB] uppercase tracking-wider leading-[1.2]">{t('nav', 'whyJapan')}</a>
          <a href="#courses" onClick={(e) => scrollToSection(e, 'courses')} className="text-lg font-bold text-gray-600 dark:text-gray-300 hover:text-[#2D9CDB] uppercase tracking-wider leading-[1.2]">{t('nav', 'courses')}</a>
          <a href="#process" onClick={(e) => scrollToSection(e, 'process')} className="text-lg font-bold text-gray-600 dark:text-gray-300 hover:text-[#2D9CDB] uppercase tracking-wider leading-[1.2]">{t('nav', 'process')}</a>
          <button onClick={() => navigateTo('/blog')} className="text-left text-lg font-bold text-gray-600 dark:text-gray-300 hover:text-[#2D9CDB] uppercase tracking-wider leading-[1.2]">{t('nav', 'blog')}</button>
          <a href="#map" onClick={(e) => scrollToSection(e, 'map')} className="text-lg font-bold text-gray-600 dark:text-gray-300 hover:text-[#2D9CDB] uppercase tracking-wider leading-[1.2]">{t('nav', 'map')}</a>
          
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 dark:border-white/10">
            {['bn', 'en', 'ja'].map((l) => (
              <button key={l} onClick={() => {setLang(l); setIsMobileMenuOpen(false);}} className={`px-5 py-2.5 text-sm font-bold rounded-full transition-all uppercase flex-1 leading-[1.5] ${lang === l ? 'bg-[var(--color-primary)] text-white shadow-sm' : 'bg-gray-100 dark:bg-[#132c53] text-gray-600 dark:text-gray-300'}`}>
                {l}
              </button>
            ))}
          </div>

          <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="mt-4 bg-[var(--color-primary)] text-white text-center px-6 py-4 rounded-xl font-bold hover:bg-[var(--color-primary-dark)] transition-all shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)] text-lg leading-[1.2]">
            {t('btn', 'contact')}
          </a>
        </div>
      )}
    </nav>
  );

  const renderFooter = () => (
    <footer className="bg-[#0A1931] dark:bg-[#061124] text-gray-400 py-16 border-t-4 border-[var(--color-primary)] w-full mt-auto transition-colors duration-300">
      <div className="w-full px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 w-full">
          <div className="space-y-6 w-full">
            {renderLogo(true)}
            <p className="text-sm font-light leading-[1.5] text-gray-400">
              MIRAI KOBE-এর অফিসিয়াল সাব-ব্রাঞ্চ। বিশ্বমানের জাপানি ভাষা শিক্ষা এবং স্টুডেন্ট ভিসা সহায়তায় আমরা প্রতিশ্রুতিবদ্ধ।
            </p>
            <div className="flex items-center gap-4 flex-wrap">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[var(--color-primary)] transition-all shadow-lg hover:-translate-y-1 shrink-0"><FacebookIcon size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[var(--color-primary)] transition-all shadow-lg hover:-translate-y-1 shrink-0"><InstagramIcon size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[var(--color-primary)] transition-all shadow-lg hover:-translate-y-1 shrink-0"><LinkedinIcon size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[var(--color-primary)] transition-all shadow-lg hover:-translate-y-1 shrink-0"><YoutubeIcon size={18} /></a>
            </div>
          </div>

          <div className="w-full">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm leading-[1.2]">কুইক লিংকস</h4>
            <ul className="space-y-3 text-sm font-light leading-[1.5]">
              <li><button onClick={() => navigateTo('/about')} className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-2 w-max"><ChevronRight size={14} className="text-[#2D9CDB] shrink-0" /> {t('nav', 'aboutUs')}</button></li>
              <li><a href="#courses" onClick={(e) => scrollToSection(e, 'courses')} className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-2 w-max"><ChevronRight size={14} className="text-[#2D9CDB] shrink-0" /> {t('nav', 'courses')}</a></li>
              <li><a href="#process" onClick={(e) => scrollToSection(e, 'process')} className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-2 w-max"><ChevronRight size={14} className="text-[#2D9CDB] shrink-0" /> {t('nav', 'process')}</a></li>
              <li><button onClick={() => navigateTo('/blog')} className="hover:text-[var(--color-primary)] transition-colors flex items-center gap-2 w-max"><ChevronRight size={14} className="text-[#2D9CDB] shrink-0" /> {t('nav', 'blog')}</button></li>
            </ul>
          </div>

          <div className="w-full">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm leading-[1.2]">যোগাযোগ করুন</h4>
            <ul className="space-y-4 text-sm font-light leading-[1.5]">
              <li className="flex items-start gap-3">
                <MapPin className="text-[var(--color-primary)] flex-shrink-0 mt-1" size={18} />
                <span>কাজী নজরুল ইসলাম এভিনিউ, ঢাকা<br/>বাংলাদেশ</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-[var(--color-primary)] flex-shrink-0" size={18} />
                <span className="truncate">+880 1780-241131</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-[var(--color-primary)] flex-shrink-0" size={18} />
                <span className="truncate">info@jlimiraidhaka.com</span>
              </li>
            </ul>
          </div>

          <div className="w-full">
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm leading-[1.2]">অফিসের সময়সূচী</h4>
            <ul className="space-y-3 text-sm font-light leading-[1.5]">
              <li className="flex items-center justify-between border-b border-white/10 pb-3">
                <span>শনি - বৃহস্পতি</span>
                <span className="text-white font-medium whitespace-nowrap">সকাল ১০:০০ - বিকাল ৫:০০</span>
              </li>
              <li className="flex items-center justify-between pt-1">
                <span>শুক্রবার</span>
                <span className="text-[var(--color-primary)] font-bold whitespace-nowrap">বন্ধ</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-light w-full">
          <p className="text-center md:text-left leading-[1.5]">&copy; {new Date().getFullYear()} JLI MIRAI DHAKA. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center flex-wrap justify-center gap-4 md:gap-6">
            <a href="#" className="hover:text-white transition-colors whitespace-nowrap leading-[1.5]">প্রাইভেসি পলিসি</a>
            <a href="#" className="hover:text-white transition-colors whitespace-nowrap leading-[1.5]">শর্তাবলী</a>
            <button onClick={() => setView('admin')} className="text-[var(--color-primary)] hover:text-white font-bold transition-colors cursor-pointer ml-0 sm:ml-2 md:ml-4 whitespace-nowrap leading-[1.5]">
              {t('btn', 'admin')}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );

  const renderFloatingButtons = () => (
    <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
      <a href="https://wa.me/8801780241131" target="_blank" rel="noreferrer" className="w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(37,211,102,0.3)] hover:scale-110 transition-transform cursor-pointer border-2 border-white group relative shrink-0">
        <MessageCircle size={28} className="sm:w-8 sm:h-8" />
        <span className="absolute right-full mr-4 bg-gray-900 dark:bg-[#132c53] text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg hidden sm:block leading-[1.5]">হোয়াটসঅ্যাপ</span>
      </a>
      <a href="https://maps.app.goo.gl/LFK8K28V2k6qQqiT9" target="_blank" rel="noreferrer" className="w-14 h-14 sm:w-16 sm:h-16 bg-[#4285F4] text-white rounded-full flex items-center justify-center shadow-[0_10px_20px_rgba(66,133,244,0.3)] hover:scale-110 transition-transform cursor-pointer border-2 border-white group relative shrink-0">
        <Navigation size={24} className="sm:w-7 sm:h-7 mr-1 mt-1" /> 
        <span className="absolute right-full mr-4 bg-gray-900 dark:bg-[#132c53] text-white text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg hidden sm:block leading-[1.5]">গুগল ম্যাপে দেখুন</span>
      </a>
    </div>
  );

  // --- ভিউ রেন্ডারিং ---
  const renderHomePage = () => {
    const isFullLayout = siteSettings.heroLayout === 'full';

    return (
      <div className="w-full flex flex-col items-center flex-grow">
        {/* হিরো সেকশন */}
        {isFullLayout ? (
          <section id="home" className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 w-full min-h-[85vh] flex items-center justify-center bg-[#0A1931]" style={{ backgroundImage: `url(${images.hero})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black/60 z-0"></div>
            <div className="w-full px-4 md:px-10 lg:px-20 relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 shadow-sm border border-white/20 mb-6 w-max backdrop-blur-sm transition-colors duration-300">
                    <span className="flex h-3 w-3 relative shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-primary)]"></span>
                    </span>
                    <span className="text-sm font-bold text-white tracking-wide whitespace-nowrap leading-[1.5]">{t('hero', 'badge')}</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] tracking-tight mb-6 max-w-4xl" style={siteSettings.heroTextColor ? { color: siteSettings.heroTextColor } : { color: '#FFFFFF' }}>
                    {t('hero', 'title')} <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2D9CDB] to-blue-400">{t('hero', 'titleHighlight')}</span>
                </h1>
                <p className="text-lg md:text-xl mb-10 leading-[1.5] font-light max-w-3xl" style={siteSettings.heroTextColor ? { color: siteSettings.heroTextColor, opacity: 0.9 } : { color: '#E5E7EB' }}>
                    {t('hero', 'subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-12 w-full sm:w-auto justify-center">
                    <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-xl font-bold hover:bg-[var(--color-primary-dark)] transition-all shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)] flex items-center justify-center gap-3 text-lg hover:-translate-y-1 whitespace-nowrap w-full sm:w-auto leading-[1.2]">
                        {t('btn', 'contact')} <ArrowRight size={20} className="shrink-0" />
                    </a>
                    <a href="#courses" onClick={(e) => scrollToSection(e, 'courses')} className="bg-white/10 text-white backdrop-blur-md border border-white/20 text-center px-8 py-4 rounded-xl font-bold hover:border-[#2D9CDB] hover:bg-white/20 transition-all flex items-center justify-center hover:-translate-y-1 text-lg shadow-sm whitespace-nowrap w-full sm:w-auto leading-[1.2]">
                        {t('btn', 'apply')}
                    </a>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm font-semibold text-gray-200 bg-black/40 backdrop-blur-sm p-4 rounded-2xl inline-flex border border-white/10 w-max">
                    <div className="flex items-center gap-2 whitespace-nowrap leading-[1.5]"><CheckCircle className="text-[#2D9CDB] w-5 h-5 shrink-0" fill="currentColor" stroke="none" /> {db[lang]?.hero?.stats?.native || ''}</div>
                    <div className="flex items-center gap-2 whitespace-nowrap leading-[1.5]"><CheckCircle className="text-[#2D9CDB] w-5 h-5 shrink-0" fill="currentColor" stroke="none" /> {db[lang]?.hero?.stats?.ssw || ''}</div>
                    <div className="flex items-center gap-2 whitespace-nowrap leading-[1.5]"><Star className="text-[#F2C94C] w-5 h-5 shrink-0" fill="currentColor" stroke="none" /> {db[lang]?.hero?.stats?.success || ''}</div>
                </div>
            </div>
          </section>
        ) : (
          <section id="home" className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 w-full min-h-[85vh] flex items-center bg-[#F8F9FA] dark:bg-[#0b1d3a] transition-colors duration-300">
            <div className="w-full px-4 md:px-10 lg:px-20 relative z-10 max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 w-full">
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#132c53] shadow-sm border border-gray-200 dark:border-white/10 mb-6 w-max transition-colors duration-300">
                    <span className="flex h-3 w-3 relative shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-primary)]"></span>
                    </span>
                    <span className="text-sm font-bold text-[#0A1931] dark:text-white tracking-wide whitespace-nowrap leading-[1.5]">{t('hero', 'badge')}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0A1931] dark:text-white leading-[1.2] tracking-tight mb-6 transition-colors duration-300" style={siteSettings.heroTextColor ? { color: siteSettings.heroTextColor } : {}}>
                    {t('hero', 'title')} <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#2D9CDB] to-blue-400">{t('hero', 'titleHighlight')}</span>
                  </h1>
                  <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-[1.5] font-light transition-colors duration-300" style={siteSettings.heroTextColor ? { color: siteSettings.heroTextColor, opacity: 0.9 } : {}}>
                    {t('hero', 'subtitle')}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-10 w-full sm:w-auto">
                    <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="bg-[var(--color-primary)] text-white px-8 py-4 rounded-xl font-bold hover:bg-[var(--color-primary-dark)] transition-all shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)] flex items-center justify-center gap-3 text-lg hover:-translate-y-1 whitespace-nowrap w-full sm:w-auto leading-[1.2]">
                      {t('btn', 'contact')} <ArrowRight size={20} className="shrink-0" />
                    </a>
                    <a href="#courses" onClick={(e) => scrollToSection(e, 'courses')} className="bg-white dark:bg-[#132c53] text-[#0A1931] dark:text-white border border-gray-200 dark:border-white/10 text-center px-8 py-4 rounded-xl font-bold hover:border-[#2D9CDB] hover:text-[#2D9CDB] dark:hover:border-[#2D9CDB] transition-all flex items-center justify-center hover:-translate-y-1 text-lg shadow-sm whitespace-nowrap w-full sm:w-auto leading-[1.2]">
                      {t('btn', 'apply')}
                    </a>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-semibold text-gray-600 dark:text-gray-300 bg-white/60 dark:bg-[#132c53]/80 backdrop-blur-sm p-4 rounded-2xl inline-flex border border-gray-200 dark:border-white/10 w-max transition-colors duration-300">
                    <div className="flex items-center gap-2 whitespace-nowrap leading-[1.5]"><CheckCircle className="text-[#2D9CDB] w-5 h-5 shrink-0" fill="currentColor" stroke="none" /> {db[lang]?.hero?.stats?.native || ''}</div>
                    <div className="flex items-center gap-2 whitespace-nowrap leading-[1.5]"><CheckCircle className="text-[#2D9CDB] w-5 h-5 shrink-0" fill="currentColor" stroke="none" /> {db[lang]?.hero?.stats?.ssw || ''}</div>
                    <div className="flex items-center gap-2 whitespace-nowrap leading-[1.5]"><Star className="text-[#F2C94C] w-5 h-5 shrink-0" fill="currentColor" stroke="none" /> {db[lang]?.hero?.stats?.success || ''}</div>
                  </div>
                </div>
                <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end mt-12 lg:mt-0">
                  <div className="relative w-full max-w-lg aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl group">
                    <div className="absolute inset-0 bg-[#0A1931]/10 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                    <img src={images.hero} alt="জাপানে শিক্ষার্থী" className="w-full h-auto min-h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8 sm:right-auto bg-white/95 dark:bg-[#132c53]/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl flex items-center gap-4 z-20 border-l-4 border-l-[#2D9CDB] w-auto transition-colors duration-300">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#2D9CDB] to-[#0A1931] flex items-center justify-center text-white flex-shrink-0">
                        <GraduationCap size={24} className="sm:w-7 sm:h-7" />
                      </div>
                      <div>
                        <p className="font-bold text-[#0A1931] dark:text-white leading-[1.2] text-xs sm:text-sm whitespace-nowrap transition-colors duration-300">{t('hero', 'floating')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* মিরাই কেন সেরা */}
        <section className="py-16 lg:py-24 relative w-full bg-white dark:bg-[#0d2242] transition-colors duration-300">
          <div className="w-full px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
              <span className="text-[#2D9CDB] font-bold tracking-[0.2em] uppercase text-sm mb-4 block leading-[1.5]">{t('whyMirai', 'tag')}</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A1931] dark:text-white mb-6 leading-[1.2] transition-colors duration-300">{t('whyMirai', 'title')}</h2>
            </div>
            <div className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory hide-scrollbar md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-visible md:pb-0 w-full">
              {[{ icon: Globe, key: 'p1' }, { icon: CheckCircle, key: 'p2' }, { icon: Award, key: 'p3' }, { icon: Compass, key: 'p4' }].map((item, i) => (
                <div key={i} className="bg-[#F8F9FA] dark:bg-[#132c53] p-8 rounded-2xl border border-gray-100 dark:border-white/5 hover:border-[#2D9CDB] hover:shadow-lg transition-all duration-300 group min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center shrink-0">
                  <div className="w-12 h-12 bg-white dark:bg-white/10 rounded-full flex items-center justify-center shadow-sm mb-6 group-hover:bg-[#2D9CDB] group-hover:text-white transition-colors text-[#2D9CDB]">
                    <item.icon size={24} />
                  </div>
                  <h3 className="font-bold text-xl text-[#0A1931] dark:text-white mb-3 leading-[1.2] transition-colors duration-300">{db[lang]?.whyMirai?.[item.key]?.title || ''}</h3>
                  <p className="text-gray-500 dark:text-gray-300 text-sm leading-[1.5] transition-colors duration-300">{db[lang]?.whyMirai?.[item.key]?.desc || ''}</p>
                </div>
              ))}
              <div className="bg-[var(--color-primary)] text-white p-8 rounded-2xl shadow-xl group lg:col-span-1 md:col-span-2 relative overflow-hidden min-w-[85vw] sm:min-w-[320px] md:min-w-0 snap-center shrink-0">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full opacity-10 blur-2xl pointer-events-none"></div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shadow-sm mb-6 text-white relative z-10">
                  <UserCheck size={24} />
                </div>
                <h3 className="font-bold text-xl mb-3 relative z-10 leading-[1.2] text-white">{db[lang]?.whyMirai?.p5?.title || ''}</h3>
                <p className="text-white/90 text-sm leading-[1.5] relative z-10">{db[lang]?.whyMirai?.p5?.desc || ''}</p>
              </div>
            </div>
          </div>
        </section>

        {/* কেন জাপান */}
        <section id="about" className="py-16 lg:py-24 bg-[#F8F9FA] dark:bg-[#0b1d3a] w-full transition-colors duration-300">
          <div className="w-full px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 w-full">
              <span className="text-[var(--color-primary)] font-bold tracking-[0.2em] uppercase text-sm mb-4 block leading-[1.5]">{t('whyJapan', 'tag')}</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A1931] dark:text-white mb-6 leading-[1.2] transition-colors duration-300">{t('whyJapan', 'title')}</h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-light leading-[1.5] transition-colors duration-300">{t('whyJapan', 'subtitle')}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
              <div className="bg-white dark:bg-[#132c53] p-10 rounded-[2rem] shadow-lg hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-white/5 group w-full">
                <div className="w-16 h-16 rounded-2xl bg-[#2D9CDB]/10 flex items-center justify-center text-[#2D9CDB] mb-8 group-hover:bg-[#2D9CDB] group-hover:text-white transition-all">
                  <GraduationCap size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#0A1931] dark:text-white mb-4 leading-[1.2] transition-colors duration-300">{db[lang]?.whyJapan?.c1?.title || ''}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-[1.5] font-light transition-colors duration-300">{db[lang]?.whyJapan?.c1?.desc || ''}</p>
              </div>
              <div className="bg-white dark:bg-[#132c53] p-10 rounded-[2rem] shadow-lg hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-white/5 group w-full">
                <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] mb-8 group-hover:bg-[var(--color-primary)] group-hover:text-white transition-all">
                  <ShieldCheck size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#0A1931] dark:text-white mb-4 leading-[1.2] transition-colors duration-300">{db[lang]?.whyJapan?.c2?.title || ''}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-[1.5] font-light transition-colors duration-300">{db[lang]?.whyJapan?.c2?.desc || ''}</p>
              </div>
              <div className="bg-white dark:bg-[#132c53] p-10 rounded-[2rem] shadow-lg hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-white/5 group w-full sm:col-span-2 lg:col-span-1">
                <div className="w-16 h-16 rounded-2xl bg-[#F2C94C]/10 flex items-center justify-center text-[#F2C94C] mb-8 group-hover:bg-[#F2C94C] group-hover:text-white transition-all">
                  <Briefcase size={32} />
                </div>
                <h3 className="text-2xl font-bold text-[#0A1931] dark:text-white mb-4 leading-[1.2] transition-colors duration-300">{db[lang]?.whyJapan?.c3?.title || ''}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-[1.5] font-light transition-colors duration-300">{db[lang]?.whyJapan?.c3?.desc || ''}</p>
              </div>
            </div>
          </div>
        </section>

        {/* বিশেষত্ব */}
        <section className="py-16 lg:py-24 bg-[#0A1931] dark:bg-[#0d2242] text-white relative w-full transition-colors duration-300">
          <div className="w-full px-4 md:px-10 lg:px-20 relative z-10 max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center w-full">
              <div className="relative w-full lg:w-1/2">
                <div className="absolute inset-0 border-2 border-[#2D9CDB]/30 rounded-[2.5rem] transform -translate-x-4 sm:-translate-x-6 translate-y-4 sm:translate-y-6"></div>
                <img src={images.expertise} alt="জাপানি ক্লাসরুম" className="relative rounded-[2.5rem] shadow-2xl w-full h-auto min-h-[400px] object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"/>
                <div className="absolute top-8 -right-4 sm:-right-8 bg-[var(--color-primary)] px-6 py-4 rounded-xl shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.5)] transform rotate-3 font-bold tracking-wider hidden lg:block whitespace-nowrap">
                  100% EXCLUSIVE
                </div>
              </div>
              <div className="w-full lg:w-1/2 mt-8 lg:mt-0">
                <span className="text-[#2D9CDB] font-bold tracking-[0.2em] uppercase text-sm mb-4 block leading-[1.5]">{t('expertise', 'tag')}</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-8 leading-[1.2] text-white">{t('expertise', 'title')}<br className="hidden sm:block"/><span className="text-[#2D9CDB]">{t('expertise', 'titleHighlight')}</span></h2>
                <p className="text-gray-300 text-lg mb-10 font-light leading-[1.5]">{t('expertise', 'desc')}</p>
                <div className="space-y-6 w-full">
                  <div className="flex items-start gap-4 sm:gap-6 group">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#2D9CDB] flex-shrink-0 group-hover:bg-[#2D9CDB] group-hover:text-white transition-all"><Target size={24} /></div>
                    <div><h4 className="font-bold text-lg sm:text-xl mb-1 leading-[1.2] text-white">{db[lang]?.expertise?.f1?.title || ''}</h4><p className="text-gray-400 font-light text-sm sm:text-base leading-[1.5]">{db[lang]?.expertise?.f1?.desc || ''}</p></div>
                  </div>
                  <div className="flex items-start gap-4 sm:gap-6 group">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#2D9CDB] flex-shrink-0 group-hover:bg-[#2D9CDB] group-hover:text-white transition-all"><GraduationCap size={24} /></div>
                    <div><h4 className="font-bold text-lg sm:text-xl mb-1 leading-[1.2] text-white">{db[lang]?.expertise?.f2?.title || ''}</h4><p className="text-gray-400 font-light text-sm sm:text-base leading-[1.5]">{db[lang]?.expertise?.f2?.desc || ''}</p></div>
                  </div>
                  <div className="flex items-start gap-4 sm:gap-6 group">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 flex items-center justify-center text-[#2D9CDB] flex-shrink-0 group-hover:bg-[#2D9CDB] group-hover:text-white transition-all"><FileText size={24} /></div>
                    <div><h4 className="font-bold text-lg sm:text-xl mb-1 leading-[1.2] text-white">{db[lang]?.expertise?.f3?.title || ''}</h4><p className="text-gray-400 font-light text-sm sm:text-base leading-[1.5]">{db[lang]?.expertise?.f3?.desc || ''}</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* কোর্সসমূহ */}
        <section id="courses" className="py-16 lg:py-24 bg-white dark:bg-[#0b1d3a] w-full transition-colors duration-300">
          <div className="w-full px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 w-full">
              <span className="text-[#2D9CDB] font-bold tracking-[0.2em] uppercase text-sm mb-4 block leading-[1.5]">{t('courses', 'tag')}</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A1931] dark:text-white mb-6 leading-[1.2] transition-colors duration-300">{t('courses', 'title')}</h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 font-light leading-[1.5] transition-colors duration-300">{t('courses', 'subtitle')}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
              {['n5', 'n4'].map(lvl => (
                <div key={lvl} className="bg-[#F8F9FA] dark:bg-[#132c53] rounded-[2rem] shadow-lg overflow-hidden border border-gray-100 dark:border-white/5 hover:border-[#2D9CDB] transition-all relative group w-full flex flex-col">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gray-400 to-[#2D9CDB]"></div>
                  <div className="p-8 sm:p-10 w-full flex flex-col flex-grow">
                    <div className="flex items-end gap-3 mb-6">
                      <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A1931] dark:text-white leading-[1.2] transition-colors duration-300">{db[lang]?.courses?.[lvl]?.title || ''}</h3>
                      <span className="text-gray-500 dark:text-gray-400 font-medium pb-1.5 whitespace-nowrap transition-colors duration-300">/ {db[lang]?.courses?.[lvl]?.level || ''}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 font-light mb-8 flex-grow leading-[1.5] transition-colors duration-300">{db[lang]?.courses?.[lvl]?.desc || ''}</p>
                    <div className="bg-white dark:bg-white/5 rounded-xl p-4 mb-8 flex justify-between items-center text-[#0A1931] dark:text-white font-bold text-sm sm:text-base border border-gray-200 dark:border-transparent transition-colors duration-300">
                      <div className="flex items-center gap-2 whitespace-nowrap leading-[1.5]"><Clock className="text-[#2D9CDB] shrink-0" size={20}/> {db[lang]?.courses?.[lvl]?.time || ''}</div>
                      <div className="h-6 w-px bg-gray-200 dark:bg-white/20 transition-colors duration-300"></div>
                      <div className="flex items-center gap-2 whitespace-nowrap leading-[1.5]">{db[lang]?.courses?.[lvl]?.hrs || ''}</div>
                    </div>
                    <a href={siteSettings.syllabusLinks?.[lvl] || '#'} target="_blank" rel="noreferrer" className="w-full bg-white dark:bg-white/10 text-[#0A1931] dark:text-white px-6 py-4 rounded-xl font-bold group-hover:bg-[#0A1931] group-hover:text-white dark:group-hover:bg-[#2D9CDB] dark:group-hover:text-white border border-gray-200 dark:border-transparent transition-all whitespace-nowrap block text-center cursor-pointer mt-auto leading-[1.2]">{t('btn', 'syllabus')}</a>
                  </div>
                </div>
              ))}
              <div className="bg-white dark:bg-[#132c53] rounded-[2rem] shadow-2xl overflow-hidden border border-[var(--color-primary)] relative group lg:-translate-y-4 w-full sm:col-span-2 lg:col-span-1 mx-auto sm:max-w-md lg:max-w-none flex flex-col transition-colors duration-300">
                <div className="absolute top-0 left-0 w-full h-2 bg-[var(--color-primary)]"></div>
                <div className="absolute top-6 right-6 bg-[var(--color-primary)] text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">CAREER TIER</div>
                <div className="p-8 sm:p-10 w-full flex flex-col flex-grow">
                  <div className="flex items-end gap-3 mb-6 mt-4">
                    <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A1931] dark:text-white leading-[1.2] transition-colors duration-300">{db[lang]?.courses?.n3?.title || ''}</h3>
                    <span className="text-gray-500 dark:text-gray-300 font-medium pb-1.5 whitespace-nowrap transition-colors duration-300">/ {db[lang]?.courses?.n3?.level || ''}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 font-light mb-8 flex-grow leading-[1.5] transition-colors duration-300">{db[lang]?.courses?.n3?.desc || ''}</p>
                  <div className="bg-[var(--color-primary)]/5 dark:bg-white/10 rounded-xl p-4 mb-8 flex justify-between items-center text-[#0A1931] dark:text-white font-bold text-sm sm:text-base border border-[var(--color-primary)]/30 transition-colors duration-300">
                    <div className="flex items-center gap-2 whitespace-nowrap text-[var(--color-primary)] leading-[1.5]"><Clock size={20} className="shrink-0"/> {db[lang]?.courses?.n3?.time || ''}</div>
                    <div className="h-6 w-px bg-[var(--color-primary)]/40 transition-colors duration-300"></div>
                    <div className="flex items-center gap-2 whitespace-nowrap text-[var(--color-primary)] leading-[1.5]">{db[lang]?.courses?.n3?.hrs || ''}</div>
                  </div>
                  <a href={siteSettings.syllabusLinks?.n3 || '#'} target="_blank" rel="noreferrer" className="w-full bg-[var(--color-primary)] text-white px-6 py-4 rounded-xl font-bold hover:bg-[var(--color-primary-dark)] transition-all shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.3)] whitespace-nowrap block text-center cursor-pointer mt-auto leading-[1.2]">{t('btn', 'syllabus')}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* প্রক্রিয়া */}
        <section id="process" className="py-16 lg:py-24 bg-[#F8F9FA] dark:bg-[#0d2242] relative w-full transition-colors duration-300">
          <div className="w-full px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20 w-full">
              <span className="text-[#2D9CDB] font-bold tracking-[0.2em] uppercase text-sm mb-4 block leading-[1.5]">{t('process', 'tag')}</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A1931] dark:text-white mb-6 leading-[1.2] transition-colors duration-300">{t('process', 'title')}</h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-light leading-[1.5] transition-colors duration-300">{t('process', 'subtitle')}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 relative w-full">
              <div className="hidden lg:block absolute top-[4.5rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-gray-300 dark:from-gray-600 via-[#2D9CDB] to-[var(--color-primary)] z-0 transition-colors duration-300"></div>
              {['s1', 's2', 's3', 's4', 's5'].map((step, idx) => {
                const icons = [MessageCircle, BookOpen, Landmark, IdCard, PlaneTakeoff];
                const Icon = icons[idx];
                const isLast = idx === 4;
                return (
                  <div key={idx} className={`relative z-10 flex flex-col items-center text-center group mt-8 lg:mt-0 w-full ${idx === 4 ? 'sm:col-span-2 lg:col-span-1 sm:max-w-[50%] sm:mx-auto lg:max-w-none' : ''}`}>
                    <div className="absolute -top-10 -z-10 text-[7rem] font-bold text-gray-200/50 dark:text-white/[0.03] group-hover:text-[#2D9CDB]/10 transition-colors select-none">{idx + 1}</div>
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transform group-hover:-translate-y-2 transition-all shrink-0 border border-gray-200 dark:border-white/10 ${isLast ? 'bg-[var(--color-primary)] text-white shadow-lg' : 'bg-white dark:bg-[#132c53] text-[#0A1931] dark:text-[#2D9CDB]'}`}>
                      <Icon size={32} />
                    </div>
                    <h3 className="font-bold text-lg text-[#0A1931] dark:text-white mb-2 leading-[1.2] transition-colors duration-300">{db[lang]?.process?.[step]?.title || ''}</h3>
                    <p className="text-gray-500 dark:text-gray-400 font-light text-sm leading-[1.5] transition-colors duration-300">{db[lang]?.process?.[step]?.desc || ''}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ব্লগ প্রিভিউ */}
        <section className="py-16 lg:py-24 bg-white dark:bg-[#0b1d3a] w-full transition-colors duration-300">
          <div className="w-full px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 w-full gap-6">
              <div className="text-center md:text-left">
                <span className="text-[var(--color-primary)] font-bold tracking-[0.2em] uppercase text-sm mb-4 block leading-[1.5]">{t('blog', 'tag')}</span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A1931] dark:text-white leading-[1.2] transition-colors duration-300">{t('blog', 'title')}</h2>
              </div>
              <button onClick={() => navigateTo('/blog')} className="px-6 py-3 border border-gray-300 dark:border-white/20 text-[#0A1931] dark:text-white rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 transition-all whitespace-nowrap font-bold flex items-center leading-[1.2]">
                {t('blog', 'allBlogs')} <ArrowRight size={16} className="ml-2"/>
              </button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
              {blogs.slice(0, 3).map(blog => (
                <div key={blog.id} onClick={() => navigateTo(`/blog/${blog.id}`)} className="bg-[#F8F9FA] dark:bg-[#132c53] rounded-2xl shadow-lg border border-gray-100 dark:border-white/5 overflow-hidden hover:shadow-xl hover:border-[#2D9CDB]/50 transition-all cursor-pointer group flex flex-col h-full w-full">
                  <div className="relative overflow-hidden w-full h-48 shrink-0">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium uppercase tracking-wide leading-[1.5] transition-colors duration-300">{blog.date}</p>
                    <h3 className="font-bold text-xl text-[#0A1931] dark:text-white mb-3 line-clamp-2 leading-[1.2] transition-colors duration-300">{blog.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-4 leading-[1.5] transition-colors duration-300">{blog.excerpt}</p>
                    <div className="mt-auto">
                      <span className="text-[#2D9CDB] font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all leading-[1.5]">
                        {t('blog', 'readMore')} <ArrowRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              {blogs.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400 font-medium bg-[#F8F9FA] dark:bg-[#132c53] rounded-xl border border-gray-200 dark:border-white/5 w-full transition-colors duration-300 leading-[1.5]">
                  এখনও কোনো ব্লগ প্রকাশিত হয়নি।
                </div>
              )}
            </div>
          </div>
        </section>

        {/* গ্যালারি */}
        <section id="gallery" className="py-16 lg:py-24 bg-[#F8F9FA] dark:bg-[#0d2242] border-t border-gray-200 dark:border-white/5 w-full transition-colors duration-300">
          <div className="w-full px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 w-full">
              <span className="text-[var(--color-primary)] font-bold tracking-[0.2em] uppercase text-sm mb-4 block leading-[1.5]">{t('photoBooth', 'tag')}</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A1931] dark:text-white mb-6 leading-[1.2] transition-colors duration-300">{t('photoBooth', 'title')}</h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 font-light leading-[1.5] transition-colors duration-300">{t('photoBooth', 'subtitle')}</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
              {gallery.map((img, idx) => (
                <div key={idx} className="aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group relative w-full">
                  <div className="absolute inset-0 bg-[#0A1931]/60 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"></div>
                  <img src={img} alt="জাপানে সফল শিক্ষার্থী" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              ))}
            </div>
            {gallery.length === 0 && (
               <div className="text-center text-gray-500 dark:text-gray-400 py-10 font-medium w-full transition-colors duration-300 leading-[1.5]">এখনও কোনো সাফল্যের ছবি আপলোড করা হয়নি।</div>
            )}
          </div>
        </section>

        {/* ম্যাপ */}
        <section id="map" className="py-16 lg:py-24 bg-white dark:bg-[#0b1d3a] border-t border-gray-200 dark:border-white/5 w-full transition-colors duration-300">
          <div className="w-full px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
            <div className="text-center mb-12 lg:mb-16 w-full">
              <span className="text-[var(--color-primary)] font-bold tracking-[0.2em] uppercase text-sm mb-4 block leading-[1.5]">{t('global', 'tag')}</span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A1931] dark:text-white leading-[1.2] transition-colors duration-300">{t('global', 'title')}</h2>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 w-full">
              <div className="bg-[#F8F9FA] dark:bg-[#132c53] p-8 rounded-3xl border border-gray-100 dark:border-white/5 hover:shadow-lg transition-all duration-300 w-full">
                <h4 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3 text-[#0A1931] dark:text-white leading-[1.2] transition-colors duration-300">
                  <MapPin className="text-[var(--color-primary)] shrink-0" size={28}/> <span className="truncate">{t('global', 'dhaka')}</span>
                </h4>
                <div className="space-y-4 mb-8 text-gray-600 dark:text-gray-300 leading-[1.5] transition-colors duration-300">
                  <p className="flex items-center gap-3 font-medium"><MapPin size={20} className="text-[#2D9CDB] shrink-0" /> <span className="truncate">কাজী নজরুল ইসলাম এভিনিউ, ঢাকা</span></p>
                  <p className="flex items-center gap-3 font-medium"><Phone size={20} className="text-[#2D9CDB] shrink-0" /> <span className="truncate">+880 1780-241131</span></p>
                  <p className="flex items-center gap-3 font-medium"><Clock size={20} className="text-[#2D9CDB] shrink-0" /> <span className="truncate">সকাল ১০:০০ - বিকাল ৫:০০</span></p>
                </div>
                <div className="w-full h-64 bg-gray-200 dark:bg-[#08162c] rounded-xl overflow-hidden shadow-inner transition-colors duration-300">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9024424301397!2d90.39108011536269!3d23.75085808458925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8982ef3b4e1%3A0x140307cc27421112!2sKazi%20Nazrul%20Islam%20Ave%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd" width="100%" height="100%" style={{border:0, filter: theme === 'dark' ? 'invert(90%) hue-rotate(180deg)' : 'none'}} loading="lazy" title="Dhaka Map"></iframe>
                </div>
              </div>
              <div className="bg-[#0A1931] dark:bg-[#132c53] p-8 rounded-3xl border border-transparent dark:border-white/5 hover:shadow-2xl transition-all duration-300 w-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/10 rounded-full blur-3xl pointer-events-none"></div>
                <h4 className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-3 text-white leading-[1.2] relative z-10">
                  <Globe className="text-[#2D9CDB] shrink-0" size={28}/> <span className="truncate">{t('global', 'kobe')}</span>
                </h4>
                <div className="space-y-4 mb-8 text-gray-300 relative z-10 leading-[1.5]">
                  <p className="flex items-center gap-3 font-medium"><MapPin size={20} className="text-[var(--color-primary)] shrink-0" /> <span className="truncate">Kobe, Hyogo, Japan</span></p>
                  <p className="flex items-center gap-3 font-medium"><Phone size={20} className="text-[var(--color-primary)] shrink-0" /> <span className="truncate">+81 XX-XXXX-XXXX</span></p>
                  <p className="flex items-center gap-3 font-medium"><Globe size={20} className="text-[var(--color-primary)] shrink-0" /> <span className="truncate">Official Headquarters</span></p>
                </div>
                <div className="w-full h-64 bg-[#08162c] rounded-xl overflow-hidden relative z-10">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105073.44367069111!2d135.10515152778736!3d34.69008316135547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60008ebd109e9009%3A0xc3c5c83f9828e67!2sKobe%2C%20Hyogo%2C%20Japan!5e0!3m2!1sen!2sbd!4v1620000000000!5m2!1sen!2sbd" width="100%" height="100%" style={{border:0, filter: theme === 'dark' ? 'invert(90%) hue-rotate(180deg)' : 'none'}} loading="lazy" title="Kobe Map"></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* কন্টাক্ট ফর্ম সেকশন */}
        <section id="contact" className="py-16 lg:py-24 bg-[#F8F9FA] dark:bg-[#0d2242] w-full transition-colors duration-300">
          <div className="w-full px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
            <div className="bg-[#0A1931] dark:bg-[#132c53] rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-transparent dark:border-white/10 w-full flex flex-col lg:flex-row transition-colors duration-300">
              <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[#2D9CDB] rounded-full opacity-20 dark:opacity-10 blur-[100px] pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-[var(--color-primary)] rounded-full opacity-20 dark:opacity-10 blur-[100px] pointer-events-none"></div>

              <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/10 relative z-10">
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6 leading-[1.2] text-white">{t('contact', 'title')}</h2>
                <p className="text-gray-300 mb-10 font-light text-base sm:text-lg leading-[1.5]">{t('contact', 'desc')}</p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4"><MapPin className="text-[#2D9CDB] w-6 h-6 shrink-0"/> <span className="text-white font-light text-sm leading-[1.5]">বনানী, ঢাকা, বাংলাদেশ</span></div>
                  <div className="flex items-center gap-4"><Phone className="text-[#2D9CDB] w-6 h-6 shrink-0"/> <span className="text-white font-light text-sm leading-[1.5]">+880 1780-241131</span></div>
                </div>
              </div>

              {/* থিম পরিবর্তনের সময় কালার যেন ঠিক থাকে তাই নির্দিষ্ট স্টাইল যুক্ত ফর্ম */}
              <div className="w-full lg:w-3/5 bg-white dark:bg-[#0b1d3a]/50 p-8 lg:p-12 relative z-10 transition-colors duration-300">
                <h3 className="text-xl sm:text-2xl font-bold text-[#0A1931] dark:text-white mb-8 leading-[1.2] transition-colors duration-300">{t('contact', 'formTitle')}</h3>
                <form className="space-y-6 w-full" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid md:grid-cols-2 gap-6 w-full">
                    <div className="w-full">
                      <label className="block text-sm font-bold text-[#0A1931] dark:text-gray-300 mb-2 leading-[1.5] transition-colors duration-300">{t('contact', 'name')}</label>
                      <input type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F8F9FA] dark:bg-[#163057] text-gray-800 dark:text-white focus:bg-white dark:focus:bg-[#1a3a6c] focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] transition-all leading-[1.5]" />
                    </div>
                    <div className="w-full">
                      <label className="block text-sm font-bold text-[#0A1931] dark:text-gray-300 mb-2 leading-[1.5] transition-colors duration-300">{t('contact', 'phone')}</label>
                      <input type="tel" className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F8F9FA] dark:bg-[#163057] text-gray-800 dark:text-white focus:bg-white dark:focus:bg-[#1a3a6c] focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] transition-all leading-[1.5]" />
                    </div>
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-bold text-[#0A1931] dark:text-gray-300 mb-2 leading-[1.5] transition-colors duration-300">{t('contact', 'interest')}</label>
                    <select className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F8F9FA] dark:bg-[#163057] text-gray-800 dark:text-white focus:bg-white dark:focus:bg-[#1a3a6c] focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] transition-all appearance-none cursor-pointer overflow-hidden text-ellipsis leading-[1.5]">
                      {(db[lang]?.contact?.options || []).map((opt, i) => <option key={i} value={opt}>{opt}</option>)}
                    </select>
                  </div>
                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 flex-wrap w-full">
                    <button className="w-full sm:w-auto bg-[var(--color-primary)] text-white px-8 sm:px-10 py-4 rounded-xl font-bold hover:bg-[var(--color-primary-dark)] transition-all shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.3)] whitespace-nowrap leading-[1.2]">{t('btn', 'contact')}</button>
                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium flex items-center gap-2 whitespace-nowrap leading-[1.5] transition-colors duration-300"><Lock className="text-[#2D9CDB] w-4 h-4 shrink-0"/> {t('contact', 'commit')}</span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  const renderAboutPage = () => (
    <div className="w-full flex flex-col items-center flex-grow bg-[#F8F9FA] dark:bg-[#0b1d3a] transition-colors duration-300">
      
      {/* সম্পূর্ণ পেজ হিরো সেকশন */}
      <section className="relative w-full min-h-[70vh] lg:min-h-[85vh] flex items-center justify-center bg-[#0A1931]" style={{ backgroundImage: `url(${images.kobeCampus || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}>
        <div className="absolute inset-0 bg-[#0A1931]/70 dark:bg-[#061124]/80 z-0 transition-colors duration-300"></div>
        <div className="w-full px-4 md:px-10 lg:px-20 relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center pt-20">
          <span className="text-white bg-[var(--color-primary)] px-4 py-1.5 rounded-full font-bold tracking-[0.2em] uppercase text-sm mb-6 block leading-[1.5] shadow-[0_0_15px_rgba(211,47,47,0.4)]">
            {t('aboutPage', 'tag')}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold mb-6 leading-[1.2] tracking-tight max-w-4xl drop-shadow-lg" style={siteSettings.aboutTextColor ? { color: siteSettings.aboutTextColor } : { color: '#FFFFFF' }}>
            {t('aboutPage', 'title')}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto leading-[1.6] font-light drop-shadow-md" style={siteSettings.aboutTextColor ? { color: siteSettings.aboutTextColor, opacity: 0.9 } : { color: '#E5E7EB' }}>
            {t('aboutPage', 'subtitle')}
          </p>
          <div className="mt-12 flex justify-center">
             <button onClick={() => {
                const el = document.getElementById('about-content');
                if(el) {
                    const y = el.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({top: y, behavior: 'smooth'});
                }
             }} className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-[#0A1931] transition-all animate-bounce focus:outline-none">
               <ChevronDown size={24} />
             </button>
          </div>
        </div>
      </section>

      {/* মিরাই কোবে এবং ফিচারসমূহ গ্রিড */}
      <section id="about-content" className="w-full px-4 md:px-10 lg:px-20 max-w-7xl mx-auto mt-24 mb-24 scroll-mt-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl h-[400px]">
            <div className="absolute inset-0 bg-[#0A1931]/10 z-10"></div>
            <img src={images.kobeCampus || 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80'} alt="Kobe Campus" className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
            <div className="absolute bottom-6 left-6 bg-white/95 dark:bg-[#132c53]/95 backdrop-blur-md p-4 rounded-xl shadow-lg z-20 border-l-4 border-[#2D9CDB]">
              <p className="font-bold text-[#0A1931] dark:text-white leading-[1.2]">হেডকোয়ার্টার: সান্নোমিয়া, কোবে</p>
            </div>
          </div>
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1931] dark:text-white mb-6 leading-[1.2] transition-colors duration-300">{t('aboutPage', 'kobeTitle')}</h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-[1.5] font-light transition-colors duration-300 mb-8">
              {t('aboutPage', 'kobeDesc')}
            </p>
            
            <h3 className="text-2xl font-bold text-[#0A1931] dark:text-white mb-6 leading-[1.2] transition-colors duration-300">{t('aboutPage', 'featuresTitle')}</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { icon: MapPin, key: 'f1' },
                { icon: BookOpen, key: 'f2' },
                { icon: UserCheck, key: 'f3' },
                { icon: Briefcase, key: 'f4' },
                { icon: Globe, key: 'f5' },
                { icon: ShieldCheck, key: 'f6' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#132c53] shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-center text-[#2D9CDB] flex-shrink-0">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A1931] dark:text-white mb-1 leading-[1.2]">{db[lang]?.aboutPage?.[item.key]?.title || ''}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-[1.5]">{db[lang]?.aboutPage?.[item.key]?.desc || ''}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* এমডি বার্তা এবং ঢাকা ব্রাঞ্চ */}
      <section className="w-full bg-white dark:bg-[#0d2242] py-20 transition-colors duration-300 mb-24">
        <div className="px-4 md:px-10 lg:px-20 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <span className="text-[var(--color-primary)] font-bold tracking-[0.2em] uppercase text-sm mb-4 block leading-[1.5]">নেতৃত্ব</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0A1931] dark:text-white mb-8 leading-[1.2] transition-colors duration-300">{t('aboutPage', 'mdTitle')}</h2>
            <blockquote className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 font-light italic leading-[1.5] border-l-4 border-[#2D9CDB] pl-6 mb-8">
              {t('aboutPage', 'mdQuote')}
            </blockquote>
            <p className="font-bold text-[#0A1931] dark:text-white leading-[1.2]">ম্যানেজিং ডিরেক্টর</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-[1.5]">মিরাই নেটওয়ার্ক</p>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-full overflow-hidden border-8 border-gray-50 dark:border-[#132c53] shadow-2xl relative">
              <img src={images.mdImage || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} alt="ম্যানেজিং ডিরেক্টর" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* গ্লোবাল উপস্থিতি এবং ঢাকা ব্রাঞ্চ */}
      <section className="w-full px-4 md:px-10 lg:px-20 max-w-7xl mx-auto mb-24">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-[#132c53] p-10 rounded-[2rem] shadow-lg border border-gray-100 dark:border-white/5 transition-colors duration-300">
            <div className="w-16 h-16 rounded-2xl bg-[#2D9CDB]/10 flex items-center justify-center text-[#2D9CDB] mb-8">
              <Globe size={32} />
            </div>
            <h3 className="text-3xl font-bold text-[#0A1931] dark:text-white mb-4 leading-[1.2]">{t('aboutPage', 'globalTitle')}</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-[1.5] text-lg font-light mb-6">
              {t('aboutPage', 'globalDesc')}
            </p>
            <div className="flex flex-wrap gap-3">
              {['জাপান (হেডকোয়ার্টার)', 'বাংলাদেশ', 'ভিয়েতনাম', 'শ্রীলঙ্কা'].map(c => (
                <span key={c} className="px-4 py-2 bg-gray-100 dark:bg-[#0A1931] text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-transparent dark:border-white/5">{c}</span>
              ))}
            </div>
          </div>
          
          <div className="bg-[#0A1931] p-10 rounded-[2rem] shadow-2xl border border-[var(--color-primary)]/20 relative overflow-hidden text-white transition-colors duration-300">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-primary)]/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="w-16 h-16 rounded-2xl bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)] mb-8 relative z-10">
              <MapPin size={32} />
            </div>
            <h3 className="text-3xl font-bold mb-4 leading-[1.2] relative z-10 text-white">{t('aboutPage', 'dhakaTitle')}</h3>
            <p className="text-gray-300 leading-[1.5] text-lg font-light relative z-10">
              {t('aboutPage', 'dhakaDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* টিম সেকশন এবং স্ট্যাটস */}
      <section className="w-full px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[var(--color-primary)] font-bold tracking-[0.2em] uppercase text-sm mb-4 block leading-[1.5]">সাফল্যের নেপথ্যে যারা</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A1931] dark:text-white leading-[1.2] transition-colors duration-300">{t('aboutPage', 'teamTitle')}</h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {team.map((member, idx) => {
            const isManager = idx === 0;
            return (
              <div key={member.id} className={`bg-white dark:bg-[#132c53] rounded-2xl shadow-lg border border-gray-100 dark:border-white/5 overflow-hidden transition-colors duration-300 ${isManager ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                <div className={`aspect-[4/5] w-full ${isManager ? 'bg-gray-200 dark:bg-[#0A1931]' : 'bg-gray-100 dark:bg-[#0A1931] flex items-center justify-center'}`}>
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all" />
                  ) : (
                    <Users size={48} className="text-gray-300 dark:text-white/10" />
                  )}
                </div>
                <div className={`p-6 text-center ${isManager ? 'border-t-4 border-[var(--color-primary)]' : ''}`}>
                  <h4 className="font-bold text-xl text-[#0A1931] dark:text-white mb-1 leading-[1.2] transition-colors duration-300">{member.name}</h4>
                  <p className={`text-sm font-medium leading-[1.5] ${isManager ? 'text-[var(--color-primary)]' : 'text-gray-500 dark:text-gray-400'}`}>{member.role}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* হাইলাইট স্ট্যাটস */}
        <div className="bg-[var(--color-primary)] rounded-[2rem] p-10 lg:p-16 shadow-[0_0_30px_rgba(211,47,47,0.3)] text-white grid sm:grid-cols-3 gap-10 text-center relative overflow-hidden mb-20">
          <div className="absolute inset-0 bg-black/10 z-0"></div>
          <div className="relative z-10">
            <h3 className="text-5xl lg:text-6xl font-black mb-2 leading-[1.2]">{db[lang]?.aboutPage?.stats?.students || '৫০০+'}</h3>
            <p className="text-white/80 font-medium uppercase tracking-wider text-sm leading-[1.5]">জাপানে অবস্থানরত শিক্ষার্থী</p>
          </div>
          <div className="relative z-10 sm:border-x border-white/20">
            <h3 className="text-5xl lg:text-6xl font-black mb-2 leading-[1.2] text-[#F2C94C]">{db[lang]?.aboutPage?.stats?.success || '৯৮%'}</h3>
            <p className="text-white/80 font-medium uppercase tracking-wider text-sm leading-[1.5]">সাফল্যের হার</p>
          </div>
          <div className="relative z-10">
            <h3 className="text-5xl lg:text-6xl font-black mb-2 leading-[1.2]">{db[lang]?.aboutPage?.stats?.countries || '৪+'}</h3>
            <p className="text-white/80 font-medium uppercase tracking-wider text-sm leading-[1.5]">গ্লোবাল অফিস</p>
          </div>
        </div>
      </section>
    </div>
  );

  const renderBlogListPage = () => (
    <div className="w-full flex flex-col items-center flex-grow pt-32 pb-24 bg-[#F8F9FA] dark:bg-[#0b1d3a] transition-colors duration-300">
      <div className="w-full px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 w-full">
          <span className="text-[var(--color-primary)] font-bold tracking-[0.2em] uppercase text-sm mb-4 block leading-[1.5]">{t('blog', 'tag')}</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A1931] dark:text-white mb-6 leading-[1.2] transition-colors duration-300">আমাদের সাম্প্রতিক প্রবন্ধসমূহ</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 font-light leading-[1.5] transition-colors duration-300">জাপানে পড়ালেখা এবং জীবনযাত্রা নিয়ে বিভিন্ন টিপস ও খবর।</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
          {blogs.map(blog => (
            <div key={blog.id} onClick={() => navigateTo(`/blog/${blog.id}`)} className="bg-white dark:bg-[#132c53] rounded-2xl shadow-lg border border-gray-100 dark:border-white/5 overflow-hidden hover:shadow-xl hover:border-[#2D9CDB]/50 transition-all cursor-pointer group flex flex-col h-full w-full">
              <div className="relative overflow-hidden w-full h-48 shrink-0">
                <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium uppercase tracking-wide leading-[1.5] transition-colors duration-300">{blog.date}</p>
                <h3 className="font-bold text-xl sm:text-2xl text-[#0A1931] dark:text-white mb-4 line-clamp-2 leading-[1.2] transition-colors duration-300">{blog.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base line-clamp-3 mb-6 leading-[1.5] transition-colors duration-300">{blog.excerpt}</p>
                <div className="mt-auto">
                  <span className="text-[#2D9CDB] font-bold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all leading-[1.5]">
                    {t('blog', 'readMore')} <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          ))}
          {blogs.length === 0 && (
            <div className="col-span-full py-20 text-center text-gray-500 dark:text-gray-400 font-medium bg-white dark:bg-[#132c53] rounded-xl border border-gray-200 dark:border-white/5 w-full text-lg transition-colors duration-300">
              এখনও কোনো ব্লগ প্রকাশিত হয়নি।
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderBlogDetailsPage = () => {
    const blog = blogs.find(b => b.id === currentRoute.id);
    if (!blog) return (
      <div className="min-h-screen pt-40 flex-grow text-center text-[#0A1931] dark:text-white bg-[#F8F9FA] dark:bg-[#0b1d3a] w-full transition-colors duration-300">
        ব্লগ পাওয়া যায়নি। <button onClick={() => navigateTo('/blog')} className="text-[#2D9CDB] underline ml-2 font-bold">ফিরে যান</button>
      </div>
    );

    return (
      <div className="w-full flex flex-col items-center flex-grow pt-24 pb-24 bg-white dark:bg-[#0b1d3a] transition-colors duration-300">
        <div className="w-full px-4 md:px-10 lg:px-20 max-w-4xl mx-auto mt-12">
          <button onClick={() => navigateTo('/blog')} className="text-gray-600 dark:text-gray-400 hover:text-[#0A1931] dark:hover:text-white flex items-center gap-2 mb-8 font-bold transition-colors bg-gray-100 dark:bg-white/5 px-4 py-2 rounded-lg w-max border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/30">
            <ArrowLeft size={18} /> {t('blog', 'backToBlogs')}
          </button>
          
          <p className="text-sm text-[#2D9CDB] mb-4 font-bold uppercase tracking-widest">{blog.date}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0A1931] dark:text-white mb-10 leading-[1.2] transition-colors duration-300">{blog.title}</h1>
          
          {blog.image && (
            <div className="w-full h-64 sm:h-[400px] lg:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-2xl border border-gray-200 dark:border-white/10 transition-colors duration-300">
              <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          )}
          
          <div className="text-gray-700 dark:text-gray-300 leading-[1.5] whitespace-pre-wrap text-lg sm:text-xl font-light transition-colors duration-300">
            {blog.content}
          </div>
        </div>
      </div>
    );
  };

  const renderPublicContent = () => {
    if (currentRoute.path === '/about') return renderAboutPage();
    if (currentRoute.path === '/blog') return renderBlogListPage();
    if (currentRoute.path === '/blog/:id') return renderBlogDetailsPage();
    return renderHomePage();
  };

  return (
    <>
      {/* গ্লোবাল সিএসএস - স্টাইল ফিক্স এবং ডার্ক থিমের জন্য */}
      <style>{`
        html, body, #root {
          width: 100vw !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow-x: hidden !important;
        }
        html.dark {
            background-color: #0b1d3a !important;
        }
        :root {
          --color-primary: ${siteSettings.primaryColor};
          --color-primary-dark: ${darkenHex(siteSettings.primaryColor, 15)};
          --color-primary-rgb: ${hexToRgb(siteSettings.primaryColor)};
        }
        body {
          font-family: 'Inter', sans-serif;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* টেইলউইন্ড লোড হওয়ার আগে নেটিভ সিএসএস লোডার */}
      {!isAppReady ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw', backgroundColor: theme === 'dark' ? '#0b1d3a' : '#F8F9FA', margin: 0, position: 'fixed', top: 0, left: 0, zIndex: 9999 }}>
          <style>{`
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
            .loader-ring { width: 50px; height: 50px; border: 4px solid rgba(45, 156, 219, 0.2); border-top-color: #2D9CDB; border-radius: 50%; animation: spin 1s linear infinite; margin-bottom: 20px; }
            .loader-text { color: ${theme === 'dark' ? '#ffffff' : '#0A1931'}; font-family: sans-serif; font-size: 14px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
          `}</style>
          <div className="loader-ring"></div>
          <div className="loader-text">মিরাই লোড হচ্ছে...</div>
        </div>
      ) : view === 'public' ? (
        <div className="min-h-screen bg-[#F8F9FA] dark:bg-[#0b1d3a] text-gray-800 dark:text-white font-sans selection:bg-[#2D9CDB] selection:text-white w-full overflow-x-hidden flex flex-col transition-colors duration-300">
          {renderNavbar()}
          {renderPublicContent()}
          {renderFooter()}
          {renderFloatingButtons()}
        </div>
      ) : (
        // অ্যাডমিন ড্যাশবোর্ড
        <div className="min-h-screen bg-gray-100 dark:bg-[#08162c] text-gray-800 dark:text-white font-sans w-full overflow-x-hidden flex flex-col md:flex-row transition-colors duration-300">
          <div className="w-full md:w-64 bg-[#0A1931] border-b md:border-b-0 md:border-r border-transparent dark:border-white/10 text-white flex flex-col shadow-xl flex-shrink-0 transition-colors duration-300 z-20">
            <div className="p-4 md:p-6 border-b border-white/10 flex justify-between items-center">
              <span className="font-black text-xl tracking-tight">মিরাই <span className="text-[#2D9CDB]">সিএমএস</span></span>
              <button onClick={() => { setView('public'); navigateTo('/'); }} className="md:hidden bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors">
                <LogOut size={18} />
              </button>
            </div>
            <nav className="flex md:flex-col overflow-x-auto md:overflow-visible flex-1 p-3 md:p-4 gap-2 md:gap-0 md:space-y-2 hide-scrollbar">
              <button onClick={() => setAdminTab('content')} className={`w-max md:w-full shrink-0 flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-lg font-bold transition-all text-sm md:text-base whitespace-nowrap ${adminTab === 'content' ? 'bg-[#2D9CDB] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <LayoutDashboard size={18} className="md:w-5 md:h-5" /> টেক্সট এবং কন্টেন্ট
              </button>
              <button onClick={() => setAdminTab('team')} className={`w-max md:w-full shrink-0 flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-lg font-bold transition-all text-sm md:text-base whitespace-nowrap ${adminTab === 'team' ? 'bg-[#2D9CDB] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <Users size={18} className="md:w-5 md:h-5" /> টিম ম্যানেজার
              </button>
              <button onClick={() => setAdminTab('media')} className={`w-max md:w-full shrink-0 flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-lg font-bold transition-all text-sm md:text-base whitespace-nowrap ${adminTab === 'media' ? 'bg-[#2D9CDB] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <ImageIcon size={18} className="md:w-5 md:h-5" /> ছবিসমূহ
              </button>
              <button onClick={() => setAdminTab('gallery')} className={`w-max md:w-full shrink-0 flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-lg font-bold transition-all text-sm md:text-base whitespace-nowrap ${adminTab === 'gallery' ? 'bg-[#2D9CDB] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <Camera size={18} className="md:w-5 md:h-5" /> গ্যালারি
              </button>
              <button onClick={() => setAdminTab('blog')} className={`w-max md:w-full shrink-0 flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-lg font-bold transition-all text-sm md:text-base whitespace-nowrap ${adminTab === 'blog' ? 'bg-[#2D9CDB] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <FileText size={18} className="md:w-5 md:h-5" /> ব্লগ ম্যানেজার
              </button>
              <button onClick={() => setAdminTab('settings')} className={`w-max md:w-full shrink-0 flex items-center gap-2 md:gap-3 px-4 py-2 md:py-3 rounded-lg font-bold transition-all text-sm md:text-base whitespace-nowrap ${adminTab === 'settings' ? 'bg-[#2D9CDB] text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}>
                <SettingsIcon size={18} className="md:w-5 md:h-5" /> সেটিংস
              </button>
            </nav>
            <div className="hidden md:block p-4 border-t border-white/10">
              <button onClick={() => { setView('public'); navigateTo('/'); }} className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] text-white rounded-lg font-bold transition-colors shadow-[0_0_15px_rgba(211,47,47,0.4)]">
                 <LogOut size={18} /> লাইভ সাইট দেখুন
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto flex flex-col w-full bg-gray-100 dark:bg-[#0b1d3a] transition-colors duration-300 relative">
            <header className="bg-white dark:bg-[#132c53] border-b border-gray-200 dark:border-white/10 px-4 sm:px-8 py-4 sm:py-5 flex justify-between items-center sticky top-0 z-10 flex-shrink-0 w-full transition-colors duration-300">
              <h1 className="text-xl sm:text-2xl font-black text-[#0A1931] dark:text-white truncate transition-colors duration-300">
                {adminTab === 'content' ? 'কন্টেন্ট এডিটর' : adminTab === 'media' ? 'বেস ইমেজ ম্যানেজার' : adminTab === 'gallery' ? 'ফটো বুথ ম্যানেজার' : adminTab === 'blog' ? 'ব্লগ ম্যানেজার' : adminTab === 'team' ? 'টিম ম্যানেজার' : 'ব্র্যান্ড সেটিংস'}
              </h1>
              <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                 <button 
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} 
                  className="p-2 rounded-full text-gray-500 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                  title="থিম পরিবর্তন করুন"
                 >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                 </button>
                 <div className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold flex items-center gap-2 border border-green-200 dark:border-green-500/30 transition-colors duration-300">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0"></span> <span className="hidden sm:inline">অটো-সিঙ্ক সক্রিয়</span>
                </div>
              </div>
            </header>

            <div className="p-4 sm:p-8 max-w-5xl mx-auto w-full">
              {adminTab === 'content' && (
                <div className="space-y-6 w-full">
                  <div className="bg-white dark:bg-[#132c53] p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 w-full transition-colors duration-300">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full">
                      <span className="font-bold text-gray-600 dark:text-gray-300 shrink-0 transition-colors duration-300">এডিটিং ভাষা:</span>
                      <div className="flex bg-gray-100 dark:bg-[#0A1931] rounded-lg p-1 w-full sm:w-auto overflow-x-auto hide-scrollbar border border-transparent dark:border-white/5 transition-colors duration-300">
                        {['bn', 'en', 'ja'].map(l => (
                          <button key={l} onClick={() => setAdminLang(l)} className={`px-4 sm:px-6 py-2 rounded-md font-bold uppercase transition-all whitespace-nowrap flex-1 sm:flex-none ${adminLang === l ? 'bg-[#2D9CDB] text-white shadow' : 'text-gray-600 dark:text-gray-400 hover:text-[#0A1931] dark:hover:text-white'}`}>
                            {l === 'bn' ? 'বাংলা' : l === 'en' ? 'English' : 'Japanese'}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex overflow-x-auto bg-white dark:bg-[#132c53] p-2 rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 hide-scrollbar gap-2 w-full transition-colors duration-300">
                     {[
                       {id: 'hero', label: 'হিরো (Hero)'}, 
                       {id: 'aboutPage', label: 'আমাদের সম্পর্কে'},
                       {id: 'whyJapan', label: 'কেন জাপান'}, 
                       {id: 'expertise', label: 'বিশেষত্ব'}, 
                       {id: 'courses', label: 'কোর্সসমূহ'}, 
                       {id: 'process', label: 'প্রক্রিয়া'}, 
                       {id: 'photoBooth', label: 'ফটো বুথ'},
                       {id: 'blog', label: 'ব্লগ টেক্সট'},
                       {id: 'global', label: 'গ্লোবাল ও কন্টাক্ট'},
                       {id: 'general', label: 'জেনারেল ইউআই'}
                     ].map(sec => (
                       <button key={sec.id} onClick={() => setAdminSection(sec.id)} className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold whitespace-nowrap transition-all text-sm shrink-0 ${adminSection === sec.id ? 'bg-[#2D9CDB] text-white shadow' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-[#0A1931]'}`}>
                         {sec.label}
                       </button>
                     ))}
                  </div>

                  {adminSection === 'general' && (
                    <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden w-full transition-colors duration-300">
                      <div className="bg-[#F8F9FA] dark:bg-[#0A1931] px-6 py-4 border-b border-gray-200 dark:border-white/5 font-bold text-[#0A1931] dark:text-white transition-colors duration-300">নেভিগেশন এবং বাটন</div>
                      <div className="p-4 sm:p-6 grid md:grid-cols-2 gap-6 w-full">
                        <div className="w-full">
                          <AdminInput label="হোম লিংক" value={db[adminLang]?.nav?.home} onChange={v => handleContentUpdate('nav', 'home', v)} />
                          <AdminInput label="আমাদের সম্পর্কে লিংক" value={db[adminLang]?.nav?.aboutUs} onChange={v => handleContentUpdate('nav', 'aboutUs', v)} />
                          <AdminInput label="কেন জাপান লিংক" value={db[adminLang]?.nav?.whyJapan} onChange={v => handleContentUpdate('nav', 'whyJapan', v)} />
                          <AdminInput label="কোর্স লিংক" value={db[adminLang]?.nav?.courses} onChange={v => handleContentUpdate('nav', 'courses', v)} />
                          <AdminInput label="প্রক্রিয়া লিংক" value={db[adminLang]?.nav?.process} onChange={v => handleContentUpdate('nav', 'process', v)} />
                          <AdminInput label="গ্যালারি লিংক" value={db[adminLang]?.nav?.gallery} onChange={v => handleContentUpdate('nav', 'gallery', v)} />
                          <AdminInput label="ব্লগ লিংক" value={db[adminLang]?.nav?.blog} onChange={v => handleContentUpdate('nav', 'blog', v)} />
                          <AdminInput label="ম্যাপ লিংক" value={db[adminLang]?.nav?.map} onChange={v => handleContentUpdate('nav', 'map', v)} />
                        </div>
                        <div className="w-full">
                          <AdminInput label="যোগাযোগ বাটন" value={db[adminLang]?.btn?.contact} onChange={v => handleContentUpdate('btn', 'contact', v)} />
                          <AdminInput label="কোর্স দেখা বাটন" value={db[adminLang]?.btn?.apply} onChange={v => handleContentUpdate('btn', 'apply', v)} />
                          <AdminInput label="সিলেবাস বাটন" value={db[adminLang]?.btn?.syllabus} onChange={v => handleContentUpdate('btn', 'syllabus', v)} />
                        </div>
                      </div>
                    </div>
                  )}

                  {adminSection === 'hero' && (
                    <div className="space-y-6 w-full">
                      <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden w-full transition-colors duration-300">
                        <div className="bg-[#F8F9FA] dark:bg-[#0A1931] px-6 py-4 border-b border-gray-200 dark:border-white/5 font-bold text-[#0A1931] dark:text-white transition-colors duration-300">হিরো মেইন কন্টেন্ট</div>
                        <div className="p-4 sm:p-6 w-full">
                          <AdminInput label="ব্যাজ টেক্সট" value={db[adminLang]?.hero?.badge} onChange={v => handleContentUpdate('hero', 'badge', v)} />
                          <AdminInput label="প্রধান শিরোনাম" value={db[adminLang]?.hero?.title} onChange={v => handleContentUpdate('hero', 'title', v)} />
                          <AdminInput label="হাইলাইটেড শিরোনাম" value={db[adminLang]?.hero?.titleHighlight} onChange={v => handleContentUpdate('hero', 'titleHighlight', v)} />
                          <AdminInput label="সাবটাইটেল" value={db[adminLang]?.hero?.subtitle} onChange={v => handleContentUpdate('hero', 'subtitle', v)} isTextArea />
                          <AdminInput label="ফ্লোটিং কার্ড টেক্সট" value={db[adminLang]?.hero?.floating} onChange={v => handleContentUpdate('hero', 'floating', v)} />
                        </div>
                      </div>
                      <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden w-full transition-colors duration-300">
                        <div className="bg-[#F8F9FA] dark:bg-[#0A1931] px-6 py-4 border-b border-gray-200 dark:border-white/5 font-bold text-[#0A1931] dark:text-white transition-colors duration-300">হিরো পরিসংখ্যান (Statistics)</div>
                        <div className="p-4 sm:p-6 grid md:grid-cols-3 gap-6 w-full">
                          <AdminInput label="স্ট্যাটাস ১ (ইন্সট্রাক্টর)" value={db[adminLang]?.hero?.stats?.native} onChange={v => handleContentUpdate('hero', 'stats', v, 'native')} />
                          <AdminInput label="স্ট্যাটাস ২ (ভিসা)" value={db[adminLang]?.hero?.stats?.ssw} onChange={v => handleContentUpdate('hero', 'stats', v, 'ssw')} />
                          <AdminInput label="স্ট্যাটাস ৩ (সাফল্য)" value={db[adminLang]?.hero?.stats?.success} onChange={v => handleContentUpdate('hero', 'stats', v, 'success')} />
                        </div>
                      </div>
                    </div>
                  )}

                  {adminSection === 'aboutPage' && (
                    <div className="space-y-6 w-full">
                      <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden w-full transition-colors duration-300">
                        <div className="bg-[#F8F9FA] dark:bg-[#0A1931] px-6 py-4 border-b border-gray-200 dark:border-white/5 font-bold text-[#0A1931] dark:text-white transition-colors duration-300">আমাদের সম্পর্কে - ইন্ট্রো</div>
                        <div className="p-4 sm:p-6 w-full">
                          <AdminInput label="সেকশন ট্যাগ" value={db[adminLang]?.aboutPage?.tag} onChange={v => handleContentUpdate('aboutPage', 'tag', v)} />
                          <AdminInput label="প্রধান শিরোনাম" value={db[adminLang]?.aboutPage?.title} onChange={v => handleContentUpdate('aboutPage', 'title', v)} />
                          <AdminInput label="সাবটাইটেল" value={db[adminLang]?.aboutPage?.subtitle} onChange={v => handleContentUpdate('aboutPage', 'subtitle', v)} isTextArea />
                        </div>
                      </div>

                      <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden w-full transition-colors duration-300">
                        <div className="bg-[#F8F9FA] dark:bg-[#0A1931] px-6 py-4 border-b border-gray-200 dark:border-white/5 font-bold text-[#0A1931] dark:text-white transition-colors duration-300">কোবে ক্যাম্পাস বিস্তারিত</div>
                        <div className="p-4 sm:p-6 w-full">
                          <AdminInput label="কোবে শিরোনাম" value={db[adminLang]?.aboutPage?.kobeTitle} onChange={v => handleContentUpdate('aboutPage', 'kobeTitle', v)} />
                          <AdminInput label="কোবে ডেসক্রিপশন" value={db[adminLang]?.aboutPage?.kobeDesc} onChange={v => handleContentUpdate('aboutPage', 'kobeDesc', v)} isTextArea />
                          
                          <h4 className="font-bold text-gray-700 dark:text-gray-300 mt-6 mb-4">ফিচারসমূহ</h4>
                          <div className="grid md:grid-cols-2 gap-6">
                            {['f1', 'f2', 'f3', 'f4', 'f5', 'f6'].map((f, i) => (
                              <div key={f} className="p-4 border border-gray-200 dark:border-white/10 rounded-xl bg-[#F8F9FA] dark:bg-[#08162c]">
                                <AdminInput label={`ফিচার ${i+1} শিরোনাম`} value={db[adminLang]?.aboutPage?.[f]?.title} onChange={v => handleContentUpdate('aboutPage', f, v, 'title')} />
                                <AdminInput label={`ফিচার ${i+1} বিবরণ`} value={db[adminLang]?.aboutPage?.[f]?.desc} onChange={v => handleContentUpdate('aboutPage', f, v, 'desc')} isTextArea />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden w-full transition-colors duration-300">
                        <div className="bg-[#F8F9FA] dark:bg-[#0A1931] px-6 py-4 border-b border-gray-200 dark:border-white/5 font-bold text-[#0A1931] dark:text-white transition-colors duration-300">নেতৃত্ব ও টিম</div>
                        <div className="p-4 sm:p-6 w-full">
                          <AdminInput label="এমডি শিরোনাম" value={db[adminLang]?.aboutPage?.mdTitle} onChange={v => handleContentUpdate('aboutPage', 'mdTitle', v)} />
                          <AdminInput label="এমডি বাণী" value={db[adminLang]?.aboutPage?.mdQuote} onChange={v => handleContentUpdate('aboutPage', 'mdQuote', v)} isTextArea />
                          <AdminInput label="টিম শিরোনাম" value={db[adminLang]?.aboutPage?.teamTitle} onChange={v => handleContentUpdate('aboutPage', 'teamTitle', v)} />
                        </div>
                      </div>

                      <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden w-full transition-colors duration-300">
                        <div className="bg-[#F8F9FA] dark:bg-[#0A1931] px-6 py-4 border-b border-gray-200 dark:border-white/5 font-bold text-[#0A1931] dark:text-white transition-colors duration-300">গ্লোবাল ও পরিসংখ্যান</div>
                        <div className="p-4 sm:p-6 grid md:grid-cols-2 gap-6 w-full">
                          <div className="w-full">
                            <AdminInput label="গ্লোবাল শিরোনাম" value={db[adminLang]?.aboutPage?.globalTitle} onChange={v => handleContentUpdate('aboutPage', 'globalTitle', v)} />
                            <AdminInput label="গ্লোবাল বিবরণ" value={db[adminLang]?.aboutPage?.globalDesc} onChange={v => handleContentUpdate('aboutPage', 'globalDesc', v)} isTextArea />
                          </div>
                          <div className="w-full">
                            <AdminInput label="ঢাকা শাখা শিরোনাম" value={db[adminLang]?.aboutPage?.dhakaTitle} onChange={v => handleContentUpdate('aboutPage', 'dhakaTitle', v)} />
                            <AdminInput label="ঢাকা শাখা বিবরণ" value={db[adminLang]?.aboutPage?.dhakaDesc} onChange={v => handleContentUpdate('aboutPage', 'dhakaDesc', v)} isTextArea />
                          </div>
                          <div className="w-full md:col-span-2">
                            <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-4 border-b border-gray-200 dark:border-white/10 pb-2">পরিসংখ্যান (Stats) সেকশন</h4>
                            <div className="grid md:grid-cols-3 gap-4">
                              <AdminInput label="শিক্ষার্থী সংখ্যা" value={db[adminLang]?.aboutPage?.stats?.students} onChange={v => handleContentUpdate('aboutPage', 'stats', v, 'students')} />
                              <AdminInput label="সাফল্যের হার" value={db[adminLang]?.aboutPage?.stats?.success} onChange={v => handleContentUpdate('aboutPage', 'stats', v, 'success')} />
                              <AdminInput label="দেশ/অফিস" value={db[adminLang]?.aboutPage?.stats?.countries} onChange={v => handleContentUpdate('aboutPage', 'stats', v, 'countries')} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {adminSection === 'whyJapan' && (
                    <div className="space-y-6 w-full">
                      <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden w-full transition-colors duration-300">
                        <div className="bg-[#F8F9FA] dark:bg-[#0A1931] px-6 py-4 border-b border-gray-200 dark:border-white/5 font-bold text-[#0A1931] dark:text-white transition-colors duration-300">হেডার অংশ</div>
                        <div className="p-4 sm:p-6 w-full">
                          <AdminInput label="সেকশন ট্যাগ" value={db[adminLang]?.whyJapan?.tag} onChange={v => handleContentUpdate('whyJapan', 'tag', v)} />
                          <AdminInput label="প্রধান শিরোনাম" value={db[adminLang]?.whyJapan?.title} onChange={v => handleContentUpdate('whyJapan', 'title', v)} />
                          <AdminInput label="সাবটাইটেল" value={db[adminLang]?.whyJapan?.subtitle} onChange={v => handleContentUpdate('whyJapan', 'subtitle', v)} isTextArea />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-6 w-full">
                        {['c1', 'c2', 'c3'].map((card, i) => (
                           <div key={card} className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden w-full transition-colors duration-300">
                             <div className="bg-[#F8F9FA] dark:bg-[#0A1931] px-6 py-4 border-b border-gray-200 dark:border-white/5 font-bold text-[#0A1931] dark:text-white transition-colors duration-300">কার্ড {i + 1}</div>
                             <div className="p-4 sm:p-6 w-full">
                               <AdminInput label="শিরোনাম" value={db[adminLang]?.whyJapan?.[card]?.title} onChange={v => handleContentUpdate('whyJapan', card, v, 'title')} />
                               <AdminInput label="বিবরণ" value={db[adminLang]?.whyJapan?.[card]?.desc} onChange={v => handleContentUpdate('whyJapan', card, v, 'desc')} isTextArea />
                             </div>
                           </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {adminSection === 'expertise' && (
                    <div className="space-y-6 w-full">
                      <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden w-full transition-colors duration-300">
                        <div className="bg-[#F8F9FA] dark:bg-[#0A1931] px-6 py-4 border-b border-gray-200 dark:border-white/5 font-bold text-[#0A1931] dark:text-white transition-colors duration-300">হেডার অংশ</div>
                        <div className="p-4 sm:p-6 w-full">
                          <AdminInput label="সেকশন ট্যাগ" value={db[adminLang]?.expertise?.tag} onChange={v => handleContentUpdate('expertise', 'tag', v)} />
                          <AdminInput label="প্রধান শিরোনাম" value={db[adminLang]?.expertise?.title} onChange={v => handleContentUpdate('expertise', 'title', v)} />
                          <AdminInput label="হাইলাইটেড শিরোনাম" value={db[adminLang]?.expertise?.titleHighlight} onChange={v => handleContentUpdate('expertise', 'titleHighlight', v)} />
                          <AdminInput label="বিবরণ" value={db[adminLang]?.expertise?.desc} onChange={v => handleContentUpdate('expertise', 'desc', v)} isTextArea />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-6 w-full">
                        {['f1', 'f2', 'f3'].map((feat, i) => (
                           <div key={feat} className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden w-full transition-colors duration-300">
                             <div className="bg-[#F8F9FA] dark:bg-[#0A1931] px-6 py-4 border-b border-gray-200 dark:border-white/5 font-bold text-[#0A1931] dark:text-white transition-colors duration-300">সুবিধা {i + 1}</div>
                             <div className="p-4 sm:p-6 w-full">
                               <AdminInput label="শিরোনাম" value={db[adminLang]?.expertise?.[feat]?.title} onChange={v => handleContentUpdate('expertise', feat, v, 'title')} />
                               <AdminInput label="বিবরণ" value={db[adminLang]?.expertise?.[feat]?.desc} onChange={v => handleContentUpdate('expertise', feat, v, 'desc')} isTextArea />
                             </div>
                           </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {adminSection === 'courses' && (
                    <div className="space-y-6 w-full">
                      <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden w-full transition-colors duration-300">
                        <div className="bg-[#F8F9FA] dark:bg-[#0A1931] px-6 py-4 border-b border-gray-200 dark:border-white/5 font-bold text-[#0A1931] dark:text-white transition-colors duration-300">হেডার অংশ</div>
                        <div className="p-4 sm:p-6 w-full">
                          <AdminInput label="সেকশন ট্যাগ" value={db[adminLang]?.courses?.tag} onChange={v => handleContentUpdate('courses', 'tag', v)} />
                          <AdminInput label="প্রধান শিরোনাম" value={db[adminLang]?.courses?.title} onChange={v => handleContentUpdate('courses', 'title', v)} />
                          <AdminInput label="সাবটাইটেল" value={db[adminLang]?.courses?.subtitle} onChange={v => handleContentUpdate('courses', 'subtitle', v)} isTextArea />
                        </div>
                      </div>
                      
                      <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden w-full mb-6 transition-colors duration-300">
                        <div className="bg-[#F8F9FA] dark:bg-[#0A1931] px-6 py-4 border-b border-gray-200 dark:border-white/5 font-bold text-[#2D9CDB]">কোর্স সিলেবাস লিংকসমূহ</div>
                        <div className="p-4 sm:p-6 grid md:grid-cols-3 gap-4 w-full">
                          {['n5', 'n4', 'n3'].map((lvl) => (
                            <div key={`link-${lvl}`}>
                              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase transition-colors duration-300">{lvl} গুগল ড্রাইভ লিংক</label>
                              <input 
                                type="text" 
                                value={siteSettings.syllabusLinks?.[lvl] || ''} 
                                onChange={e => setSiteSettings(prev => ({...prev, syllabusLinks: {...prev.syllabusLinks, [lvl]: e.target.value}}))}
                                placeholder="https://drive.google.com/..."
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F8F9FA] dark:bg-[#08162c] text-gray-800 dark:text-white focus:bg-white dark:focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] transition-all"
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-3 gap-6 w-full">
                        {['n5', 'n4', 'n3'].map((lvl) => (
                           <div key={lvl} className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden w-full transition-colors duration-300">
                             <div className="bg-[#F8F9FA] dark:bg-[#0A1931] px-6 py-4 border-b border-gray-200 dark:border-white/5 font-bold text-[#0A1931] dark:text-white uppercase transition-colors duration-300">{lvl} কোর্সের বিস্তারিত</div>
                             <div className="p-4 sm:p-6 w-full">
                               <AdminInput label="শিরোনাম" value={db[adminLang]?.courses?.[lvl]?.title} onChange={v => handleContentUpdate('courses', lvl, v, 'title')} />
                               <AdminInput label="লেভেলের নাম" value={db[adminLang]?.courses?.[lvl]?.level} onChange={v => handleContentUpdate('courses', lvl, v, 'level')} />
                               <AdminInput label="সময়কাল" value={db[adminLang]?.courses?.[lvl]?.time} onChange={v => handleContentUpdate('courses', lvl, v, 'time')} />
                               <AdminInput label="মোট ঘন্টা" value={db[adminLang]?.courses?.[lvl]?.hrs} onChange={v => handleContentUpdate('courses', lvl, v, 'hrs')} />
                               <AdminInput label="বিবরণ" value={db[adminLang]?.courses?.[lvl]?.desc} onChange={v => handleContentUpdate('courses', lvl, v, 'desc')} isTextArea />
                             </div>
                           </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {adminSection === 'process' && (
                    <div className="space-y-6 w-full">
                      <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden w-full transition-colors duration-300">
                        <div className="bg-[#F8F9FA] dark:bg-[#0A1931] px-6 py-4 border-b border-gray-200 dark:border-white/5 font-bold text-[#0A1931] dark:text-white transition-colors duration-300">হেডার অংশ</div>
                        <div className="p-4 sm:p-6 w-full">
                          <AdminInput label="সেকশন ট্যাগ" value={db[adminLang]?.process?.tag} onChange={v => handleContentUpdate('process', 'tag', v)} />
                          <AdminInput label="প্রধান শিরোনাম" value={db[adminLang]?.process?.title} onChange={v => handleContentUpdate('process', 'title', v)} />
                          <AdminInput label="সাবটাইটেল" value={db[adminLang]?.process?.subtitle} onChange={v => handleContentUpdate('process', 'subtitle', v)} isTextArea />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {['s1', 's2', 's3', 's4', 's5'].map((step, i) => (
                           <div key={step} className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden w-full transition-colors duration-300">
                             <div className="bg-[#F8F9FA] dark:bg-[#0A1931] px-6 py-4 border-b border-gray-200 dark:border-white/5 font-bold text-[#0A1931] dark:text-white transition-colors duration-300">ধাপ {i+1}</div>
                             <div className="p-4 sm:p-6 w-full">
                               <AdminInput label="ধাপের শিরোনাম" value={db[adminLang]?.process?.[step]?.title} onChange={v => handleContentUpdate('process', step, v, 'title')} />
                               <AdminInput label="ধাপের বিবরণ" value={db[adminLang]?.process?.[step]?.desc} onChange={v => handleContentUpdate('process', step, v, 'desc')} isTextArea />
                             </div>
                           </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {adminSection === 'photoBooth' && (
                    <div className="space-y-6 w-full">
                      <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden w-full transition-colors duration-300">
                        <div className="bg-[#F8F9FA] dark:bg-[#0A1931] px-6 py-4 border-b border-gray-200 dark:border-white/5 font-bold text-[#0A1931] dark:text-white transition-colors duration-300">ফটো বুথ টেক্সট সেটিংস</div>
                        <div className="p-4 sm:p-6 w-full">
                          <AdminInput label="সেকশন ট্যাগ" value={db[adminLang]?.photoBooth?.tag} onChange={v => handleContentUpdate('photoBooth', 'tag', v)} />
                          <AdminInput label="প্রধান শিরোনাম" value={db[adminLang]?.photoBooth?.title} onChange={v => handleContentUpdate('photoBooth', 'title', v)} />
                          <AdminInput label="সাবটাইটেল" value={db[adminLang]?.photoBooth?.subtitle} onChange={v => handleContentUpdate('photoBooth', 'subtitle', v)} isTextArea />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {adminSection === 'blog' && (
                    <div className="space-y-6 w-full">
                      <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden w-full transition-colors duration-300">
                        <div className="bg-[#F8F9FA] dark:bg-[#0A1931] px-6 py-4 border-b border-gray-200 dark:border-white/5 font-bold text-[#0A1931] dark:text-white transition-colors duration-300">ব্লগ সেকশন টেক্সট সেটিংস</div>
                        <div className="p-4 sm:p-6 w-full">
                          <AdminInput label="সেকশন ট্যাগ" value={db[adminLang]?.blog?.tag} onChange={v => handleContentUpdate('blog', 'tag', v)} />
                          <AdminInput label="প্রধান শিরোনাম" value={db[adminLang]?.blog?.title} onChange={v => handleContentUpdate('blog', 'title', v)} />
                          <AdminInput label="রিড মোর বাটন টেক্সট" value={db[adminLang].blog?.readMore} onChange={v => handleContentUpdate('blog', 'readMore', v)} />
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-[#0A1931] p-4 rounded-xl border border-transparent dark:border-white/5 transition-colors duration-300">নতুন ব্লগ লিখতে বা সম্পাদনা করতে, দয়া করে বাম পাশের মেন্যু থেকে <strong className="text-gray-800 dark:text-white">"ব্লগ ম্যানেজার"</strong> ব্যবহার করুন।</div>
                    </div>
                  )}

                  {adminSection === 'global' && (
                    <div className="space-y-6 w-full">
                      <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden w-full transition-colors duration-300">
                        <div className="bg-[#F8F9FA] dark:bg-[#0A1931] px-6 py-4 border-b border-gray-200 dark:border-white/5 font-bold text-[#0A1931] dark:text-white transition-colors duration-300">গ্লোবাল নেটওয়ার্ক অংশ</div>
                        <div className="p-4 sm:p-6 grid md:grid-cols-2 gap-6 w-full">
                          <div className="w-full">
                            <AdminInput label="সেকশন ট্যাগ" value={db[adminLang]?.global?.tag} onChange={v => handleContentUpdate('global', 'tag', v)} />
                            <AdminInput label="প্রধান শিরোনাম" value={db[adminLang]?.global?.title} onChange={v => handleContentUpdate('global', 'title', v)} />
                          </div>
                          <div className="w-full">
                            <AdminInput label="ঢাকা শাখা শিরোনাম" value={db[adminLang]?.global?.dhaka} onChange={v => handleContentUpdate('global', 'dhaka', v)} />
                            <AdminInput label="কোবে হেডকোয়ার্টার শিরোনাম" value={db[adminLang]?.global?.kobe} onChange={v => handleContentUpdate('global', 'kobe', v)} />
                          </div>
                        </div>
                      </div>
                      <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden w-full transition-colors duration-300">
                        <div className="bg-[#F8F9FA] dark:bg-[#0A1931] px-6 py-4 border-b border-gray-200 dark:border-white/5 font-bold text-[#0A1931] dark:text-white transition-colors duration-300">কন্টাক্ট সেকশন ও ফর্ম</div>
                        <div className="p-4 sm:p-6 grid md:grid-cols-2 gap-6 w-full">
                          <div className="w-full">
                             <AdminInput label="সেকশন শিরোনাম" value={db[adminLang]?.contact?.title} onChange={v => handleContentUpdate('contact', 'title', v)} />
                             <AdminInput label="সেকশন বিবরণ" value={db[adminLang]?.contact?.desc} onChange={v => handleContentUpdate('contact', 'desc', v)} isTextArea />
                          </div>
                          <div className="w-full">
                             <AdminInput label="ফর্ম শিরোনাম" value={db[adminLang]?.contact?.formTitle} onChange={v => handleContentUpdate('contact', 'formTitle', v)} />
                             <AdminInput label="নাম ইনপুট লেবেল" value={db[adminLang]?.contact?.name} onChange={v => handleContentUpdate('contact', 'name', v)} />
                             <AdminInput label="ফোন ইনপুট লেবেল" value={db[adminLang]?.contact?.phone} onChange={v => handleContentUpdate('contact', 'phone', v)} />
                             <AdminInput label="আগ্রহের বিষয় লেবেল" value={db[adminLang]?.contact?.interest} onChange={v => handleContentUpdate('contact', 'interest', v)} />
                             <AdminInput label="কমিটমেন্ট টেক্সট (নিচে)" value={db[adminLang]?.contact?.commit} onChange={v => handleContentUpdate('contact', 'commit', v)} />
                          </div>
                          <div className="md:col-span-2 w-full">
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">ড্রপডাউন অপশন (কমা দিয়ে আলাদা করুন)</label>
                            <input 
                              type="text" 
                              value={(db[adminLang]?.contact?.options || []).join(', ')} 
                              onChange={e => handleContentUpdate('contact', 'options', e.target.value.split(', '))}
                              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F8F9FA] dark:bg-[#08162c] text-gray-800 dark:text-white focus:bg-white dark:focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* অ্যাডমিন ট্যাব: ব্লগ ম্যানেজার */}
              {adminTab === 'blog' && (
                <div className="space-y-6 w-full">
                  <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden p-6 w-full transition-colors duration-300">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-white/10 pb-4 w-full">
                       <h3 className="font-bold text-lg text-[#0A1931] dark:text-white transition-colors duration-300">নতুন ব্লগ পোস্ট লিখুন</h3>
                    </div>
                    
                    <form onSubmit={handleAddBlog} className="space-y-6 w-full">
                      <div className="grid md:grid-cols-2 gap-6 w-full">
                        <div className="w-full">
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">ব্লগের শিরোনাম</label>
                          <input 
                            type="text" 
                            required
                            value={newBlog.title}
                            onChange={e => setNewBlog({...newBlog, title: e.target.value})}
                            placeholder="ব্লগের শিরোনাম দিন..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F8F9FA] dark:bg-[#08162c] text-gray-800 dark:text-white focus:bg-white dark:focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] transition-all"
                          />
                        </div>
                        <div className="w-full">
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">কভার ইমেজের ইউআরএল</label>
                          <input 
                            type="url" 
                            value={newBlog.image}
                            onChange={e => setNewBlog({...newBlog, image: e.target.value})}
                            placeholder="https://..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F8F9FA] dark:bg-[#08162c] text-gray-800 dark:text-white focus:bg-white dark:focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] transition-all"
                          />
                        </div>
                      </div>
                      
                      <div className="w-full">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">সংক্ষিপ্ত সারাংশ (গ্রিডে দৃশ্যমান)</label>
                        <textarea 
                          rows="2" 
                          required
                          value={newBlog.excerpt}
                          onChange={e => setNewBlog({...newBlog, excerpt: e.target.value})}
                          placeholder="ব্লগের একটি সংক্ষিপ্ত সারাংশ..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F8F9FA] dark:bg-[#08162c] text-gray-800 dark:text-white focus:bg-white dark:focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] transition-all resize-none"
                        />
                      </div>

                      <div className="w-full">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">সম্পূর্ণ কন্টেন্ট</label>
                        <textarea 
                          rows="8" 
                          required
                          value={newBlog.content}
                          onChange={e => setNewBlog({...newBlog, content: e.target.value})}
                          placeholder="আপনার সম্পূর্ণ ব্লগ কন্টেন্ট এখানে লিখুন..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F8F9FA] dark:bg-[#08162c] text-gray-800 dark:text-white focus:bg-white dark:focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] transition-all resize-y"
                        />
                      </div>

                      <button type="submit" className="bg-[#2D9CDB] text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all flex items-center gap-2">
                        <PlusCircle size={20} /> ব্লগ প্রকাশ করুন
                      </button>
                    </form>
                  </div>

                  <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden p-6 w-full transition-colors duration-300">
                    <h3 className="font-bold text-lg text-[#0A1931] dark:text-white mb-6 border-b border-gray-200 dark:border-white/10 pb-4 transition-colors duration-300">প্রকাশিত ব্লগসমূহ</h3>
                    <div className="space-y-4 w-full">
                      {blogs.map((blog) => (
                        <div key={blog.id} className="flex flex-col sm:flex-row items-center justify-between p-4 border border-gray-200 dark:border-white/10 rounded-xl bg-[#F8F9FA] dark:bg-[#08162c] gap-4 transition-colors duration-300">
                          <div className="flex items-center gap-4 w-full">
                            {blog.image && <img src={blog.image} className="w-16 h-16 rounded-lg object-cover shrink-0" alt="thumbnail" />}
                            <div>
                              <h4 className="font-bold text-[#0A1931] dark:text-white transition-colors duration-300">{blog.title}</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">{blog.date}</p>
                            </div>
                          </div>
                          <button onClick={() => handleDeleteBlog(blog.id)} className="bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 p-2 rounded-lg hover:bg-red-200 dark:hover:bg-red-500 dark:hover:text-white transition-colors shrink-0">
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                      {blogs.length === 0 && <p className="text-gray-500 italic text-sm">কোনো ব্লগ প্রকাশিত হয়নি।</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* অ্যাডমিন ট্যাব: টিম ম্যানেজার */}
              {adminTab === 'team' && (
                <div className="space-y-6 w-full">
                  <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden p-6 w-full transition-colors duration-300">
                    <h3 className="font-bold text-lg text-[#0A1931] dark:text-white mb-6 border-b border-gray-200 dark:border-white/10 pb-4 transition-colors duration-300">টিম মেম্বারদের পরিচালনা করুন</h3>
                    <div className="grid md:grid-cols-2 gap-6 w-full">
                      {team.map((member) => (
                        <div key={member.id} className="p-5 border border-gray-200 dark:border-white/10 rounded-xl bg-[#F8F9FA] dark:bg-[#08162c] flex flex-col gap-4 transition-colors duration-300">
                          <div className="flex gap-5 items-start w-full">
                            <div className="w-24 h-24 shrink-0 bg-gray-200 dark:bg-[#0A1931] rounded-lg overflow-hidden flex items-center justify-center border border-gray-300 dark:border-white/20 relative group cursor-pointer transition-colors duration-300">
                              {member.image ? <img src={member.image} className="w-full h-full object-cover" alt={member.name} /> : <Users className="text-gray-400" size={32}/>}
                              <label className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer text-white text-xs font-bold gap-1">
                                <Upload size={18}/>
                                <span>আপলোড</span>
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleTeamImageUpload(member.id, e)} />
                              </label>
                            </div>
                            <div className="flex-1 space-y-4 w-full">
                              <div>
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 transition-colors duration-300">নাম</label>
                                <input type="text" value={member.name} onChange={e => handleTeamUpdate(member.id, 'name', e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#132c53] text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] text-sm transition-all" />
                              </div>
                              <div>
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 mb-1.5 transition-colors duration-300">পদবী / ভূমিকা</label>
                                <input type="text" value={member.role} onChange={e => handleTeamUpdate(member.id, 'role', e.target.value)} className="w-full px-3 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#132c53] text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] text-sm transition-all" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* অ্যাডমিন ট্যাব: মিডিয়া */}
              {adminTab === 'media' && (
                <div className="space-y-6 w-full">
                  {[
                    { key: 'hero', label: 'হিরো সেকশন ব্যাকগ্রাউন্ড', desc: 'হোম পেজের প্রধান ছবি।', previewClass: 'aspect-[4/3] object-cover' },
                    { key: 'expertise', label: 'বিশেষত্ব সেকশন ছবি', desc: '"আমাদের বিশেষত্ব" সেকশনে প্রদর্শিত ছবি।', previewClass: 'aspect-[4/3] object-cover grayscale-[40%]' },
                    { key: 'kobeCampus', label: 'আমাদের সম্পর্কে - কোবে ক্যাম্পাস', desc: 'অ্যাবাউট পেজের প্রধান হেডার ছবি।', previewClass: 'aspect-[16/9] object-cover' },
                    { key: 'mdImage', label: 'আমাদের সম্পর্কে - ম্যানেজিং ডিরেক্টর', desc: 'এমডি-এর প্রোফাইল ছবি।', previewClass: 'w-32 h-32 rounded-full object-cover mx-auto', wrapperClass: 'flex justify-center flex-col items-center' }
                  ].map((imgItem) => (
                    <div key={imgItem.key} className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden p-6 w-full transition-colors duration-300">
                      <h3 className="font-bold text-lg text-[#0A1931] dark:text-white mb-6 border-b border-gray-200 dark:border-white/10 pb-4 transition-colors duration-300">{imgItem.label}</h3>
                      <div className="flex flex-col md:flex-row gap-8 items-start w-full">
                        <div className="w-full md:w-1/2 space-y-4">
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 transition-colors duration-300">ইমেজের ইউআরএল (URL)</label>
                          <input 
                            type="text" 
                            value={images[imgItem.key] || ''}
                            onChange={(e) => setImages({...images, [imgItem.key]: e.target.value})}
                            placeholder="https://..."
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F8F9FA] dark:bg-[#08162c] text-gray-800 dark:text-white focus:bg-white dark:focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] transition-all"
                          />
                          
                          <div className="flex flex-col gap-2 pt-2">
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">অথবা আপনার ডিভাইস থেকে আপলোড করুন</span>
                            <label className="bg-gray-100 dark:bg-[#08162c] border border-gray-200 dark:border-white/20 px-4 py-3 rounded-xl cursor-pointer hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-sm font-bold text-[#0A1931] dark:text-white flex items-center gap-3 w-max">
                              <Upload size={18} className="text-[#2D9CDB]" /> ফাইল নির্বাচন করুন...
                              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload(imgItem.key)} />
                            </label>
                            <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-300">{imgItem.desc}</p>
                          </div>
                        </div>
                        <div className={`w-full md:w-1/2 ${imgItem.wrapperClass || ''}`}>
                          <p className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">প্রিভিউ</p>
                          <div className={`overflow-hidden bg-gray-100 dark:bg-[#0A1931] border border-gray-200 dark:border-white/10 transition-colors duration-300 ${imgItem.previewClass.includes('rounded-full') ? 'rounded-full w-32 h-32' : imgItem.previewClass.includes('rounded-lg') ? 'rounded-lg w-32 h-32' : 'rounded-xl aspect-[4/3] w-full'}`}>
                            <img src={images[imgItem.key] || 'https://via.placeholder.com/800x600'} alt="Preview" className={`w-full h-full ${imgItem.previewClass}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* অ্যাডমিন ট্যাব: গ্যালারি */}
              {adminTab === 'gallery' && (
                <div className="space-y-6 w-full">
                  <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden p-6 w-full transition-colors duration-300">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-200 dark:border-white/10 pb-4 w-full transition-colors duration-300">
                       <h3 className="font-bold text-lg text-[#0A1931] dark:text-white">ফটো বুথ / সাকসেস গ্যালারি</h3>
                       <span className="text-sm font-bold text-[#2D9CDB] bg-gray-100 dark:bg-[#0A1931] px-3 py-1 rounded-md border border-transparent dark:border-white/5 shrink-0 transition-colors duration-300">{gallery.length} টি ছবি</span>
                    </div>
                    
                    <div className="mb-8 w-full">
                      <div className="relative border-2 border-dashed border-[#2D9CDB] bg-[#F8F9FA] dark:bg-[#08162c] rounded-2xl p-10 text-center hover:bg-gray-100 dark:hover:bg-white/5 transition-colors cursor-pointer group w-full">
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleGalleryUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="bg-white dark:bg-[#132c53] w-16 h-16 rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform border border-transparent dark:border-white/10">
                          <Camera className="text-[#2D9CDB]" size={28} />
                        </div>
                        <p className="text-[#0A1931] dark:text-white font-bold text-lg mb-1 transition-colors duration-300">এখানে ক্লিক করুন বা ছবি টেনে আনুন</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">আপনার সাকসেস গ্যালারিতে একটি নতুন ছবি যুক্ত করুন। PNG বা JPG।</p>
                      </div>
                    </div>

                    <h4 className="font-bold text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-300">বর্তমান গ্যালারি</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                      {gallery.map((img, idx) => (
                        <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 group w-full transition-colors duration-300">
                          <img src={img} className="w-full h-full object-cover" alt="Gallery item" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button 
                              onClick={() => removeGalleryImage(idx)}
                              className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 shadow-lg transform hover:scale-110 transition-all"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      ))}
                      {gallery.length === 0 && (
                        <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400 font-medium bg-[#F8F9FA] dark:bg-[#0A1931] rounded-xl border border-dashed border-gray-300 dark:border-white/10 w-full transition-colors duration-300">
                          এখনও কোনো ছবি আপলোড করা হয়নি।
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* অ্যাডমিন ট্যাব: সেটিংস */}
              {adminTab === 'settings' && (
                <div className="space-y-6 w-full">
                  <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden p-6 w-full transition-colors duration-300">
                    <h3 className="font-bold text-lg text-[#0A1931] dark:text-white mb-6 border-b border-gray-200 dark:border-white/10 pb-4 transition-colors duration-300">ব্র্যান্ডের উপস্থিতি</h3>
                    
                    <div className="grid md:grid-cols-2 gap-8 w-full">
                      {/* কালার পিকার */}
                      <div className="w-full">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">প্রাইমারি থিম কালার</label>
                        <div className="flex items-center gap-4 w-full">
                          <input 
                            type="color" 
                            value={siteSettings.primaryColor}
                            onChange={(e) => setSiteSettings({...siteSettings, primaryColor: e.target.value})}
                            className="w-14 h-14 rounded-lg cursor-pointer border-0 p-0 shrink-0 bg-transparent"
                          />
                          <input 
                            type="text" 
                            value={siteSettings.primaryColor}
                            onChange={(e) => setSiteSettings({...siteSettings, primaryColor: e.target.value})}
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F8F9FA] dark:bg-[#08162c] text-gray-800 dark:text-white focus:bg-white dark:focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] transition-all uppercase font-mono min-w-0"
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 transition-colors duration-300">পরিবর্তনগুলো সাথে সাথেই বাটন, বর্ডার এবং অ্যাকসেন্টে যুক্ত হবে।</p>
                      </div>

                      {/* লোগো টেক্সট সেটিংস */}
                      <div className="space-y-4 w-full">
                        <div className="w-full">
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">লোগোর প্রধান টেক্সট</label>
                          <input 
                            type="text" 
                            value={siteSettings.logoTextMain}
                            onChange={(e) => setSiteSettings({...siteSettings, logoTextMain: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F8F9FA] dark:bg-[#08162c] text-gray-800 dark:text-white focus:bg-white dark:focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] transition-all"
                          />
                        </div>
                        <div className="w-full">
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">লোগোর সাব-টেক্সট (অ্যাকসেন্ট)</label>
                          <input 
                            type="text" 
                            value={siteSettings.logoTextSub}
                            onChange={(e) => setSiteSettings({...siteSettings, logoTextSub: e.target.value})}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F8F9FA] dark:bg-[#08162c] text-gray-800 dark:text-white focus:bg-white dark:focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-[#132c53] rounded-2xl shadow-sm border border-gray-200 dark:border-white/10 overflow-hidden p-6 w-full transition-colors duration-300 mt-6">
                    <h3 className="font-bold text-lg text-[#0A1931] dark:text-white mb-6 border-b border-gray-200 dark:border-white/10 pb-4 transition-colors duration-300">পেজ সেকশন ডিজাইন</h3>
                    <div className="grid md:grid-cols-2 gap-8 w-full">
                      <div className="w-full">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">হিরো লেআউট স্টাইল</label>
                        <select 
                          value={siteSettings.heroLayout}
                          onChange={(e) => setSiteSettings({...siteSettings, heroLayout: e.target.value})}
                          className="w-full px-5 py-4 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F8F9FA] dark:bg-[#163057] text-gray-800 dark:text-white focus:bg-white dark:focus:bg-[#1a3a6c] focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] transition-all appearance-none cursor-pointer"
                        >
                          <option value="split">স্প্লিট লেআউট (Split)</option>
                          <option value="full">ফুল ব্যাকগ্রাউন্ড (Full)</option>
                        </select>
                      </div>
                      <div className="w-full">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">টেক্সট কালার ওভাররাইড (হিরো)</label>
                        <div className="flex items-center gap-4 w-full">
                          <input 
                            type="color" 
                            value={siteSettings.heroTextColor || '#ffffff'}
                            onChange={(e) => setSiteSettings({...siteSettings, heroTextColor: e.target.value})}
                            className="w-14 h-14 rounded-lg cursor-pointer border-0 p-0 shrink-0 bg-transparent"
                          />
                           <input 
                            type="text" 
                            value={siteSettings.heroTextColor || ''}
                            onChange={(e) => setSiteSettings({...siteSettings, heroTextColor: e.target.value})}
                            placeholder="যেমন: #FFFFFF"
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F8F9FA] dark:bg-[#08162c] text-gray-800 dark:text-white focus:bg-white dark:focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] transition-all uppercase font-mono min-w-0"
                          />
                        </div>
                      </div>
                      <div className="w-full md:col-span-2">
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">টেক্সট কালার ওভাররাইড (অ্যাবাউট হেডার)</label>
                        <div className="flex items-center gap-4 w-full">
                          <input 
                            type="color" 
                            value={siteSettings.aboutTextColor || '#ffffff'}
                            onChange={(e) => setSiteSettings({...siteSettings, aboutTextColor: e.target.value})}
                            className="w-14 h-14 rounded-lg cursor-pointer border-0 p-0 shrink-0 bg-transparent"
                          />
                           <input 
                            type="text" 
                            value={siteSettings.aboutTextColor || ''}
                            onChange={(e) => setSiteSettings({...siteSettings, aboutTextColor: e.target.value})}
                            placeholder="যেমন: #FFFFFF"
                            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-[#F8F9FA] dark:bg-[#08162c] text-gray-800 dark:text-white focus:bg-white dark:focus:outline-none focus:ring-2 focus:ring-[#2D9CDB] transition-all uppercase font-mono min-w-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}