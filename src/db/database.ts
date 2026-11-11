import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

const dbDir = path.resolve(process.cwd(), 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'portfolio.db');
export const db = new Database(dbPath);

// Enable WAL mode for smooth performance
db.pragma('journal_mode = WAL');

// Initialize database tables
export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS site_profile (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      badgeRole_en TEXT NOT NULL,
      badgeRole_id TEXT NOT NULL,
      badgeDoodle_en TEXT NOT NULL,
      badgeDoodle_id TEXT NOT NULL,
      heroTagline_en TEXT NOT NULL,
      heroTagline_id TEXT NOT NULL,
      aboutBio_en TEXT NOT NULL,
      aboutBio_id TEXT NOT NULL,
      location TEXT NOT NULL,
      email TEXT NOT NULL,
      website TEXT NOT NULL,
      linkedin TEXT NOT NULL,
      github TEXT NOT NULL,
      twitter TEXT NOT NULL,
      instagram TEXT NOT NULL,
      pronouns_en TEXT NOT NULL,
      pronouns_id TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS services (
      id TEXT PRIMARY KEY,
      title_en TEXT NOT NULL,
      title_id TEXT NOT NULL,
      description_en TEXT NOT NULL,
      description_id TEXT NOT NULL,
      iconBg TEXT NOT NULL,
      iconType TEXT NOT NULL,
      highlights_en TEXT NOT NULL,
      highlights_id TEXT NOT NULL,
      deliverables_en TEXT NOT NULL,
      deliverables_id TEXT NOT NULL,
      display_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS projects (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category_en TEXT NOT NULL,
      category_id TEXT NOT NULL,
      description_en TEXT NOT NULL,
      description_id TEXT NOT NULL,
      headerBg TEXT NOT NULL,
      dotColor TEXT NOT NULL,
      categoryColor TEXT NOT NULL,
      mockupType TEXT NOT NULL,
      year TEXT NOT NULL,
      role_en TEXT NOT NULL,
      role_id TEXT NOT NULL,
      overview_en TEXT NOT NULL,
      overview_id TEXT NOT NULL,
      challenge_en TEXT NOT NULL,
      challenge_id TEXT NOT NULL,
      solution_en TEXT NOT NULL,
      solution_id TEXT NOT NULL,
      metrics_en TEXT NOT NULL,
      metrics_id TEXT NOT NULL,
      stack TEXT NOT NULL,
      liveUrl TEXT NOT NULL,
      display_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS experience (
      id TEXT PRIMARY KEY,
      period_en TEXT NOT NULL,
      period_id TEXT NOT NULL,
      role_en TEXT NOT NULL,
      role_id TEXT NOT NULL,
      organization TEXT NOT NULL,
      detail_en TEXT NOT NULL,
      detail_id TEXT NOT NULL,
      display_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS education (
      id TEXT PRIMARY KEY,
      period TEXT NOT NULL,
      role_en TEXT NOT NULL,
      role_id TEXT NOT NULL,
      organization TEXT NOT NULL,
      detail_en TEXT NOT NULL,
      detail_id TEXT NOT NULL,
      display_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS skills (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'Core',
      display_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      topic TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  // Seed default data if profile does not exist
  const existingProfile = db.prepare('SELECT id FROM site_profile WHERE id = ?').get('main');
  if (!existingProfile) {
    db.prepare(`
      INSERT INTO site_profile (
        id, name, badgeRole_en, badgeRole_id, badgeDoodle_en, badgeDoodle_id,
        heroTagline_en, heroTagline_id, aboutBio_en, aboutBio_id,
        location, email, website, linkedin, github, twitter, instagram,
        pronouns_en, pronouns_id
      ) VALUES (
        'main',
        'Shoaib Hamza',
        'Full-Stack Developer',
        'Pengembang Full-Stack',
        'Creative Craftsman',
        'Kreator Digital',
        'I build digital products that are fast, scalable and thoughtfully designed.',
        'Saya membangun produk digital yang cepat, terukur, dan dirancang dengan penuh pertimbangan.',
        'I am a full-stack developer who loves turning ideas into real-world web and mobile applications. I enjoy solving problems, writing clean code and creating smooth user experiences.',
        'Saya adalah pengembang full-stack yang senang mewujudkan ide menjadi aplikasi web dan mobile nyata. Saya menikmati memecahkan masalah, menulis kode bersih, dan menciptakan pengalaman pengguna yang mulus.',
        'Lahore, Pakistan',
        'shoaib.hamza.dev@gmail.com',
        'shoaibhamza.dev',
        'linkedin.com/in/shoaib-hamza',
        'github.com/shoaib-hamza',
        'x.com/shoaibhamzadev',
        'instagram.com/shoaibhamza.dev',
        'He/Him',
        'Dia (L)'
      )
    `).run();

    // Seed services
    const insertService = db.prepare(`
      INSERT INTO services (
        id, title_en, title_id, description_en, description_id,
        iconBg, iconType, highlights_en, highlights_id, deliverables_en, deliverables_id, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertService.run(
      'web',
      'Web Development',
      'Pengembangan Web',
      'Building responsive and performant websites using modern stacks.',
      'Membangun website responsif dan cepat menggunakan teknologi modern.',
      '#1E293B',
      'code',
      JSON.stringify([
        'Server-rendered & SPA architectures with React and Next.js',
        'Core Web Vitals optimization and accessible semantic markup',
        'Component libraries built with TypeScript and Tailwind CSS',
      ]),
      JSON.stringify([
        'Arsitektur SSR & SPA dengan React dan Next.js',
        'Optimasi Core Web Vitals dan struktur semantik aksesibel',
        'Pustaka komponen dibangun dengan TypeScript dan Tailwind CSS',
      ]),
      JSON.stringify(['SaaS Web Apps', 'Marketing Platforms', 'Design Systems']),
      JSON.stringify(['Aplikasi Web SaaS', 'Platform Pemasaran', 'Sistem Desain']),
      1
    );

    insertService.run(
      'mobile',
      'Mobile Development',
      'Pengembangan Mobile',
      'Cross-platform mobile apps with clean UI and smooth performance.',
      'Aplikasi mobile lintas platform dengan antarmuka bersih dan performa mulus.',
      '#1E293B',
      'mobile',
      JSON.stringify([
        '60fps native-feel gestures, transitions, and offline-first storage',
        'Unified iOS & Android codebases with clean modular state',
        'Push notifications, deep linking, and biometric auth flows',
      ]),
      JSON.stringify([
        'Gestur 60fps dengan nuansa native, transisi, dan penyimpanan offline-first',
        'Basis kode iOS & Android terpadu dengan state modular yang rapi',
        'Notifikasi push, deep linking, dan alur autentikasi biometrik',
      ]),
      JSON.stringify(['iOS & Android Apps', 'Offline Sync Engines', 'App Store Releases']),
      JSON.stringify(['Aplikasi iOS & Android', 'Mesin Sinkronisasi Offline', 'Rilis Toko Aplikasi']),
      2
    );

    insertService.run(
      'backend',
      'Backend Development',
      'Pengembangan Backend',
      'RESTful APIs, databases and scalable server-side applications.',
      'RESTful API, basis data, dan aplikasi sisi server yang skalabel.',
      '#1E293B',
      'backend',
      JSON.stringify([
        'Secure Node.js & Express APIs with role-based authentication',
        'Schema modeling, indexing, and caching with SQLite, MongoDB & SQL',
        'Webhook pipelines, payment checkouts, and background workers',
      ]),
      JSON.stringify([
        'API Node.js & Express aman dengan autentikasi berbasis peran',
        'Pemodelan skema, indeks, dan caching dengan SQLite, MongoDB & SQL',
        'Pipa webhook, proses checkout pembayaran, dan pekerja latar belakang',
      ]),
      JSON.stringify(['REST & Realtime APIs', 'Database Architecture', 'Cloud Deployments']),
      JSON.stringify(['API REST & Realtime', 'Arsitektur Basis Data', 'Penerapan Cloud']),
      3
    );

    insertService.run(
      'design',
      'UI/UX Design',
      'Desain UI/UX',
      'Designing intuitive and beautiful interfaces that users love.',
      'Merancang antarmuka intuitif dan estetis yang disukai pengguna.',
      '#1E293B',
      'design',
      JSON.stringify([
        'Interactive Figma prototypes from low-fi wireframes to hi-fi specs',
        'User journey mapping focused on clarity and conversion',
        'Consistent typography, color tokens, and micro-interactions',
      ]),
      JSON.stringify([
        'Prototipe interaktif Figma dari wireframe hingga spesifikasi fidelitas tinggi',
        'Pemetaan alur pengguna yang fokus pada kejelasan dan konversi',
        'Tipografi konsisten, token warna, dan mikro-interaksi responsif',
      ]),
      JSON.stringify(['Figma Prototypes', 'UI Kits & Tokens', 'Usability Audits']),
      JSON.stringify(['Prototipe Figma', 'Kit UI & Token', 'Audit Aksesibilitas']),
      4
    );

    // Seed projects
    const insertProject = db.prepare(`
      INSERT INTO projects (
        id, title, category_en, category_id, description_en, description_id,
        headerBg, dotColor, categoryColor, mockupType, year,
        role_en, role_id, overview_en, overview_id, challenge_en, challenge_id,
        solution_en, solution_id, metrics_en, metrics_id, stack, liveUrl, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertProject.run(
      'taskly',
      'Taskly',
      'Productivity',
      'Produktivitas',
      'Task management app to organize your work smartly.',
      'Aplikasi manajemen tugas untuk menata alur kerja secara cerdas.',
      '#151D28',
      '#3B82F6',
      '#60A5FA',
      'taskly',
      '2025',
      'Full-Stack Developer & UI Designer',
      'Pengembang Full-Stack & Desainer UI',
      'A cross-device workspace combining sprint boards, smart daily agendas, and instant keyboard-driven task capture for remote teams.',
      'Ruang kerja lintas perangkat yang memadukan papan sprint, agenda harian cerdas, dan pencatatan tugas cepat untuk tim remote.',
      'Teams struggled with bloated project trackers that slowed down quick daily task updates across desktop and mobile.',
      'Tim kesulitan dengan pelacak proyek yang terlalu berat sehingga memperlambat pembaruan harian di desktop dan ponsel.',
      'Engineered an optimistic-UI sync layer with React, Next.js, Node.js, and SQLite/Firebase so status updates reflect in under 50ms.',
      'Merancang lapisan sinkronisasi optimistic-UI dengan React, Next.js, Node.js, dan penyimpanan cepat sehingga pembaruan terasa di bawah 50ms.',
      JSON.stringify(['42% faster daily standup updates', '99.9% realtime sync uptime', '4.9/5 beta tester rating']),
      JSON.stringify(['42% lebih cepat update harian', '99.9% uptime sinkronisasi realtime', 'Skor 4.9/5 dari pengguna beta']),
      JSON.stringify(['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'Figma', 'SQLite']),
      'https://taskly.shoaibhamza.dev',
      1
    );

    insertProject.run(
      'shopease',
      'ShopEase',
      'E-Commerce',
      'E-Commerce',
      'Modern e-commerce platform with secure checkout.',
      'Platform e-commerce modern dengan alur pembayaran yang aman.',
      '#151D28',
      '#F59E0B',
      '#FBBF24',
      'shopease',
      '2024',
      'Full-Stack Developer',
      'Pengembang Full-Stack',
      'A high-converting multi-category retail storefront featuring instant facet filtering, curated lookbooks, and a frictionless 2-step checkout.',
      'Etalase ritel multi-kategori dengan konversi tinggi, dilengkapi filter faset kilat dan checkout 2 langkah tanpa hambatan.',
      'High cart abandonment on mobile viewports caused by slow catalog filtering and multi-page checkout forms.',
      'Tingkat pembatalan keranjang tinggi pada ponsel karena filter katalog lambat dan form checkout berbelit-belit.',
      'Built edge-cached catalog queries, persistent cart state, and optimized Express API pipelines.',
      'Membangun kueri katalog ter-cache di edge, state keranjang persisten, dan pipeline API Express yang optimal.',
      JSON.stringify(['31% lower checkout drop-off', 'Sub-300ms catalog filtering', '12,000+ monthly active shoppers']),
      JSON.stringify(['31% penurunan drop-off checkout', 'Filter katalog sub-300ms', '12.000+ pembeli aktif bulanan']),
      JSON.stringify(['Next.js', 'React', 'Node.js', 'Tailwind CSS', 'JavaScript', 'SQLite']),
      'https://shopease.shoaibhamza.dev',
      2
    );

    insertProject.run(
      'fintrack',
      'FinTrack',
      'Finance',
      'Keuangan',
      'Personal finance tracker to manage income & expenses.',
      'Pelacak keuangan pribadi untuk mengelola pemasukan dan pengeluaran.',
      '#151D28',
      '#3B82F6',
      '#60A5FA',
      'fintrack',
      '2024',
      'Lead Developer & Product Designer',
      'Lead Developer & Desainer Produk',
      'Personal cash-flow companion turning raw bank transactions into clear monthly budgets, savings goals, and visual spending breakdowns.',
      'Asisten arus kas pribadi yang mengubah transaksi bank mentah menjadi anggaran bulanan, target tabungan, dan bagan visual ringkas.',
      'Most budgeting apps overwhelm everyday users with accounting jargon instead of actionable spending clarity.',
      'Banyak aplikasi anggaran membingungkan pengguna awam dengan istilah akuntansi rumit alih-alih memberi kejelasan belanja.',
      'Designed calm visual ring charts, recurring bill alerts, and instant category rules backed by robust backend APIs.',
      'Merancang diagram cincin visual yang tenang, pengingat tagihan berulang, dan aturan kategori instan berkinerja tinggi.',
      JSON.stringify(['18 hrs/year saved on manual tracking', 'Zero-lag interactive charts', '86% 30-day user retention']),
      JSON.stringify(['Hemat 18 jam/tahun pencatatan manual', 'Grafik interaktif tanpa lag', '86% retensi pengguna 30 hari']),
      JSON.stringify(['React', 'JavaScript', 'Node.js', 'Tailwind CSS', 'UI/UX', 'SQLite']),
      'https://fintrack.shoaibhamza.dev',
      3
    );

    insertProject.run(
      'wanderly',
      'Wanderly',
      'Travel',
      'Perjalanan',
      'Explore places, plan trips and discover amazing deals.',
      'Jelajahi tempat baru, rencanakan perjalanan dan temukan penawaran terbaik.',
      '#151D28',
      '#10B981',
      '#34D399',
      'wanderly',
      '2025',
      'Full-Stack Engineer & UI/UX',
      'Full-Stack Engineer & UI/UX',
      'Collaborative itinerary builder and destination discovery platform helping travelers curate routes, stays, and seasonal flight deals.',
      'Penyusun rencana perjalanan kolaboratif yang membantu pelancong merancang rute, penginapan, dan promo tiket terbaik.',
      'Travelers juggled dozens of browser tabs, spreadsheets, and chat links just to coordinate a single group trip.',
      'Pelancong harus membuka puluhan tab browser, spreadsheet, dan pesan obrolan hanya untuk menyusun satu liburan rombongan.',
      'Combined visual destination guides, drag-and-drop day planners, and real-time budget splitting.',
      'Menggabungkan panduan destinasi visual, perencana harian tarik-lepas, dan pembagian anggaran secara langsung.',
      JSON.stringify(['3,400+ itineraries created', '1.1s First Contentful Paint', 'Featured in Indie Travel Weekly']),
      JSON.stringify(['3.400+ rencana perjalanan dibuat', '1.1s First Contentful Paint', 'Masuk ulasan Indie Travel Weekly']),
      JSON.stringify(['Next.js', 'React', 'Tailwind CSS', 'Figma', 'Node.js', 'SQLite']),
      'https://wanderly.shoaibhamza.dev',
      4
    );

    insertProject.run(
      'devpulse',
      'DevPulse',
      'Developer Tools',
      'Alat Pengembang',
      'API uptime monitor and incident status page builder.',
      'Pemantau uptime API dan pembuat halaman status insiden publik.',
      '#151D28',
      '#10B981',
      '#34D399',
      'devpulse',
      '2024',
      'Full-Stack Developer',
      'Pengembang Full-Stack',
      'Lightweight endpoint monitoring dashboard with multi-region latency checks, Slack/email alerts, and clean public status pages.',
      'Dasbor pemantau endpoint ringan dengan pengujian latensi multi-wilayah, notifikasi Slack/email, dan halaman status publik.',
      'Indie teams needed transparent uptime reporting without paying enterprise observability bills.',
      'Tim pengembang independen membutuhkan pelaporan uptime transparan tanpa tagihan observabilitas perusahaan yang mahal.',
      'Engineered scheduled Node.js health workers, time-series storage, and embeddable status badges.',
      'Merancang pekerja pemantau terjadwal Node.js, penyimpanan data time-series, dan lencana status yang dapat disematkan.',
      JSON.stringify(['50k+ daily health checks', 'Sub-10s alert dispatch', 'Open-sourced core runner']),
      JSON.stringify(['50k+ pemeriksaan harian', 'Pengiriman peringatan sub-10 detik', 'Mesin inti bersifat open-source']),
      JSON.stringify(['Node.js', 'React', 'Tailwind CSS', 'Git', 'SQLite']),
      'https://devpulse.shoaibhamza.dev',
      5
    );

    insertProject.run(
      'mediflow',
      'MediFlow',
      'HealthTech',
      'Teknologi Kesehatan',
      'Clinic appointment booking and patient queue portal.',
      'Pemesanan janji temu klinik dan portal nomor antrean pasien.',
      '#151D28',
      '#F59E0B',
      '#FBBF24',
      'mediflow',
      '2023',
      'Frontend & Mobile Developer',
      'Pengembang Frontend & Mobile',
      'Streamlined clinic scheduling system allowing patients to book slots, track live queue wait times, and access digital prescriptions.',
      'Sistem penjadwalan klinik terintegrasi yang memudahkan pasien memesan jadwal, memantau antrean langsung, dan mengakses resep digital.',
      'Crowded outpatient waiting rooms lacked live visibility into doctor availability and appointment delays.',
      'Ruang tunggu klinik penuh sesak tanpa kepastian ketersediaan dokter dan estimasi keterlambatan jadwal.',
      'Built a realtime queue board paired with an accessible mobile-first booking flow designed in Figma.',
      'Membangun papan antrean realtime yang dipadukan dengan alur pemesanan ramah seluler yang dirancang di Figma.',
      JSON.stringify(['48% shorter lobby wait time', '25+ clinics onboarded', 'WCAG AA accessible interface']),
      JSON.stringify(['48% waktu tunggu lobi lebih singkat', '25+ klinik bergabung', 'Antarmuka standar aksesibel WCAG AA']),
      JSON.stringify(['React', 'Tailwind CSS', 'UI/UX', 'Figma', 'Node.js', 'SQLite']),
      'https://mediflow.shoaibhamza.dev',
      6
    );

    // Seed experience
    const insertExp = db.prepare(`
      INSERT INTO experience (id, period_en, period_id, role_en, role_id, organization, detail_en, detail_id, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertExp.run(
      'exp-1',
      '2023 – Present',
      '2023 – Sekarang',
      'Full-Stack Developer',
      'Pengembang Full-Stack',
      'Freelance',
      'Delivering end-to-end web & mobile products for startups and international clients.',
      'Menyelesaikan produk web & mobile menyeluruh untuk startup dan klien internasional.',
      1
    );

    insertExp.run(
      'exp-2',
      '2022 – 2023',
      '2022 – 2023',
      'Junior Developer',
      'Pengembang Junior',
      'CodeWingz',
      'Built responsive React dashboards, REST APIs, and reusable UI component libraries.',
      'Membangun dasbor React responsif, REST API, dan pustaka komponen antarmuka modular.',
      2
    );

    insertExp.run(
      'exp-3',
      '2021 – Internship',
      '2021 – Magang',
      'Web Development Intern',
      'Magang Pengembang Web',
      'DevHouse',
      'Collaborated on frontend layouts, bug fixes, and performance audits across client sites.',
      'Berkolaborasi pada tata letak antarmuka, perbaikan bug, dan audit performa situs klien.',
      3
    );

    // Seed education
    const insertEdu = db.prepare(`
      INSERT INTO education (id, period, role_en, role_id, organization, detail_en, detail_id, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertEdu.run(
      'edu-1',
      '2022 – 2026',
      'BS Software Engineering',
      'Sarjana Rekayasa Perangkat Lunak',
      'UMT Lahore',
      'Focused on software architecture, data structures, databases, and human-computer interaction.',
      'Fokus pada arsitektur perangkat lunak, struktur data, basis data, dan interaksi manusia-komputer.',
      1
    );

    insertEdu.run(
      'edu-2',
      '2020 – 2022',
      'FSc Pre-Engineering',
      'Pra-Rekayasa (FSc)',
      'Punjab College',
      'Strong foundation in mathematics, physics, and analytical problem-solving.',
      'Pondasi kuat dalam matematika terapan, fisika, dan penyelesaian masalah analitis.',
      2
    );

    // Seed skills
    const insertSkill = db.prepare(`
      INSERT INTO skills (id, name, category, display_order)
      VALUES (?, ?, ?, ?)
    `);

    const defaultSkills = [
      'HTML', 'CSS', 'JavaScript', 'React', 'Next.js', 'Node.js',
      'SQLite', 'MongoDB', 'Firebase', 'Tailwind CSS', 'Git', 'Figma', 'UI/UX'
    ];

    defaultSkills.forEach((s, idx) => {
      insertSkill.run(`skill-${idx + 1}`, s, 'Core', idx + 1);
    });
  }
}
