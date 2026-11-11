import express from 'express';
import { createServer as createViteServer } from 'vite';
import { db, initDb } from './src/db/database.ts';

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize SQLite schema & seed data
initDb();

// ================= API ROUTES =================

// 1. Get complete portfolio data bundle
app.get('/api/portfolio', (req, res) => {
  try {
    const profile = db.prepare('SELECT * FROM site_profile WHERE id = ?').get('main');
    const services = db.prepare('SELECT * FROM services ORDER BY display_order ASC').all();
    const projects = db.prepare('SELECT * FROM projects ORDER BY display_order ASC').all();
    const experience = db.prepare('SELECT * FROM experience ORDER BY display_order ASC').all();
    const education = db.prepare('SELECT * FROM education ORDER BY display_order ASC').all();
    const skills = db.prepare('SELECT * FROM skills ORDER BY display_order ASC').all();

    // Parse JSON fields and provide default fallbacks
    const formattedServices = services.map((s: any) => {
      const h_en = JSON.parse(s.highlights_en || '[]');
      const h_id = JSON.parse(s.highlights_id || '[]');
      const d_en = JSON.parse(s.deliverables_en || '[]');
      const d_id = JSON.parse(s.deliverables_id || '[]');

      return {
        ...s,
        title: s.title_en || s.title || '',
        description: s.description_en || s.description || '',
        highlights_en: h_en,
        highlights_id: h_id,
        highlights: h_en,
        deliverables_en: d_en,
        deliverables_id: d_id,
        deliverables: d_en,
      };
    });

    const formattedProjects = projects.map((p: any) => {
      const m_en = JSON.parse(p.metrics_en || '[]');
      const m_id = JSON.parse(p.metrics_id || '[]');
      const st = JSON.parse(p.stack || '[]');

      return {
        ...p,
        category: p.category_en || p.category || '',
        description: p.description_en || p.description || '',
        role: p.role_en || p.role || '',
        overview: p.overview_en || p.overview || '',
        challenge: p.challenge_en || p.challenge || '',
        solution: p.solution_en || p.solution || '',
        metrics_en: m_en,
        metrics_id: m_id,
        metrics: m_en,
        stack: st,
      };
    });

    res.json({
      profile,
      services: formattedServices,
      projects: formattedProjects,
      experience,
      education,
      skills,
    });
  } catch (err: any) {
    console.error('Error fetching portfolio:', err);
    res.status(500).json({ error: 'Failed to fetch portfolio data' });
  }
});

// 2. Submit Contact message
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, topic, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required' });
    }
    const id = `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const created_at = new Date().toISOString();

    db.prepare(`
      INSERT INTO contact_messages (id, name, email, topic, message, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(id, name, email, topic || 'General', message, created_at);

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (err: any) {
    console.error('Error saving contact message:', err);
    res.status(500).json({ error: 'Failed to save contact message' });
  }
});

// 3. Admin Routes

// Check / Login
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  // Simple administrative key/passcode
  if (password === 'admin123' || password === 'admin') {
    res.json({ success: true, token: 'auth-session-token' });
  } else {
    res.status(401).json({ error: 'Invalid password. Try admin123' });
  }
});

// Update Profile
app.put('/api/admin/profile', (req, res) => {
  try {
    const p = req.body;
    db.prepare(`
      UPDATE site_profile SET
        name = ?, badgeRole_en = ?, badgeRole_id = ?, badgeDoodle_en = ?, badgeDoodle_id = ?,
        heroTagline_en = ?, heroTagline_id = ?, aboutBio_en = ?, aboutBio_id = ?,
        location = ?, email = ?, website = ?, linkedin = ?, github = ?, twitter = ?, instagram = ?,
        pronouns_en = ?, pronouns_id = ?
      WHERE id = 'main'
    `).run(
      p.name, p.badgeRole_en, p.badgeRole_id, p.badgeDoodle_en, p.badgeDoodle_id,
      p.heroTagline_en, p.heroTagline_id, p.aboutBio_en, p.aboutBio_id,
      p.location, p.email, p.website, p.linkedin, p.github, p.twitter, p.instagram,
      p.pronouns_en, p.pronouns_id
    );
    res.json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Projects CRUD
app.post('/api/admin/projects', (req, res) => {
  try {
    const p = req.body;
    const id = p.id || `proj-${Date.now()}`;
    db.prepare(`
      INSERT INTO projects (
        id, title, category_en, category_id, description_en, description_id,
        headerBg, dotColor, categoryColor, mockupType, year,
        role_en, role_id, overview_en, overview_id, challenge_en, challenge_id,
        solution_en, solution_id, metrics_en, metrics_id, stack, liveUrl, display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      id, p.title, p.category_en, p.category_id, p.description_en, p.description_id,
      p.headerBg || '#DCF2AA', p.dotColor || '#BCEF4E', p.categoryColor || '#98CE38',
      p.mockupType || 'taskly', p.year || '2025',
      p.role_en, p.role_id, p.overview_en, p.overview_id, p.challenge_en, p.challenge_id,
      p.solution_en, p.solution_id,
      JSON.stringify(Array.isArray(p.metrics_en) ? p.metrics_en : []),
      JSON.stringify(Array.isArray(p.metrics_id) ? p.metrics_id : []),
      JSON.stringify(Array.isArray(p.stack) ? p.stack : []),
      p.liveUrl || '#',
      p.display_order || 99
    );
    res.json({ success: true, id });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add project' });
  }
});

app.put('/api/admin/projects/:id', (req, res) => {
  try {
    const { id } = req.params;
    const p = req.body;
    db.prepare(`
      UPDATE projects SET
        title = ?, category_en = ?, category_id = ?, description_en = ?, description_id = ?,
        headerBg = ?, dotColor = ?, categoryColor = ?, mockupType = ?, year = ?,
        role_en = ?, role_id = ?, overview_en = ?, overview_id = ?, challenge_en = ?, challenge_id = ?,
        solution_en = ?, solution_id = ?, metrics_en = ?, metrics_id = ?, stack = ?, liveUrl = ?, display_order = ?
      WHERE id = ?
    `).run(
      p.title, p.category_en, p.category_id, p.description_en, p.description_id,
      p.headerBg, p.dotColor, p.categoryColor, p.mockupType, p.year,
      p.role_en, p.role_id, p.overview_en, p.overview_id, p.challenge_en, p.challenge_id,
      p.solution_en, p.solution_id,
      JSON.stringify(Array.isArray(p.metrics_en) ? p.metrics_en : []),
      JSON.stringify(Array.isArray(p.metrics_id) ? p.metrics_id : []),
      JSON.stringify(Array.isArray(p.stack) ? p.stack : []),
      p.liveUrl,
      p.display_order,
      id
    );
    res.json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

app.delete('/api/admin/projects/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// Experience CRUD
app.post('/api/admin/experience', (req, res) => {
  try {
    const e = req.body;
    const id = e.id || `exp-${Date.now()}`;
    db.prepare(`
      INSERT INTO experience (id, period_en, period_id, role_en, role_id, organization, detail_en, detail_id, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, e.period_en, e.period_id, e.role_en, e.role_id, e.organization, e.detail_en, e.detail_id, e.display_order || 99);
    res.json({ success: true, id });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to add experience' });
  }
});

app.put('/api/admin/experience/:id', (req, res) => {
  try {
    const e = req.body;
    db.prepare(`
      UPDATE experience SET
        period_en = ?, period_id = ?, role_en = ?, role_id = ?, organization = ?, detail_en = ?, detail_id = ?, display_order = ?
      WHERE id = ?
    `).run(e.period_en, e.period_id, e.role_en, e.role_id, e.organization, e.detail_en, e.detail_id, e.display_order, req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update experience' });
  }
});

app.delete('/api/admin/experience/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM experience WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete experience' });
  }
});

// Education CRUD
app.post('/api/admin/education', (req, res) => {
  try {
    const e = req.body;
    const id = e.id || `edu-${Date.now()}`;
    db.prepare(`
      INSERT INTO education (id, period, role_en, role_id, organization, detail_en, detail_id, display_order)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(id, e.period, e.role_en, e.role_id, e.organization, e.detail_en, e.detail_id, e.display_order || 99);
    res.json({ success: true, id });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to add education' });
  }
});

app.put('/api/admin/education/:id', (req, res) => {
  try {
    const e = req.body;
    db.prepare(`
      UPDATE education SET
        period = ?, role_en = ?, role_id = ?, organization = ?, detail_en = ?, detail_id = ?, display_order = ?
      WHERE id = ?
    `).run(e.period, e.role_en, e.role_id, e.organization, e.detail_en, e.detail_id, e.display_order, req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to update education' });
  }
});

app.delete('/api/admin/education/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM education WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete education' });
  }
});

// Skills CRUD
app.post('/api/admin/skills', (req, res) => {
  try {
    const { name, category, display_order } = req.body;
    const id = `skill-${Date.now()}`;
    db.prepare('INSERT INTO skills (id, name, category, display_order) VALUES (?, ?, ?, ?)').run(
      id, name, category || 'Core', display_order || 99
    );
    res.json({ success: true, id });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to add skill' });
  }
});

app.delete('/api/admin/skills/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM skills WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete skill' });
  }
});

// Contact Messages list & deletion
app.get('/api/admin/messages', (req, res) => {
  try {
    const messages = db.prepare('SELECT * FROM contact_messages ORDER BY created_at DESC').all();
    res.json(messages);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch contact messages' });
  }
});

app.delete('/api/admin/messages/:id', (req, res) => {
  try {
    db.prepare('DELETE FROM contact_messages WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

// Reset to Defaults endpoint
app.post('/api/admin/reset', (req, res) => {
  try {
    db.exec(`
      DROP TABLE IF EXISTS site_profile;
      DROP TABLE IF EXISTS services;
      DROP TABLE IF EXISTS projects;
      DROP TABLE IF EXISTS experience;
      DROP TABLE IF EXISTS education;
      DROP TABLE IF EXISTS skills;
      DROP TABLE IF EXISTS contact_messages;
    `);
    initDb();
    res.json({ success: true, message: 'Database reset to default template successfully' });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: 'Failed to reset database' });
  }
});

// Mount Vite middleware for SPA frontend in development
async function startServer() {
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Portfolio server running on port ${PORT}`);
  });
}

startServer();
