import React, { useEffect, useState } from 'react';
import { X, ArrowUpRight, Check, Copy, Download, Printer, Send, Loader2 } from 'lucide-react';
import { ProjectItem, ServiceItem } from '../data/portfolioData';
import { ProjectMockup } from './ProjectMockups';
import { Language, TRANSLATIONS } from '../i18n/translations';

function useEscapeClose(onClose: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);
}

export function CaseStudyModal({
  project,
  lang,
  onClose,
  onInquire,
}: {
  project: ProjectItem | null;
  lang: Language;
  onClose: () => void;
  onInquire: (projectName: string) => void;
}) {
  useEscapeClose(onClose);
  if (!project) return null;

  const t = TRANSLATIONS[lang].caseStudyModal;
  const isId = lang === 'id';

  const category = (isId && (project as any).category_id) || project.category || (project as any).category_en || '';
  const role = (isId && (project as any).role_id) || project.role || (project as any).role_en || '';
  const overview = (isId && (project as any).overview_id) || project.overview || (project as any).overview_en || '';
  const challenge = (isId && (project as any).challenge_id) || project.challenge || (project as any).challenge_en || '';
  const solution = (isId && (project as any).solution_id) || project.solution || (project as any).solution_en || '';

  const rawMetrics = isId
    ? (project as any).metrics_id || project.metrics || (project as any).metrics_en || []
    : project.metrics || (project as any).metrics_en || (project as any).metrics_id || [];
  const metricsList = Array.isArray(rawMetrics) ? rawMetrics : [];

  const rawStack = project.stack || [];
  const stackList = Array.isArray(rawStack) ? rawStack : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[3px] p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--bg-card-elevated)] rounded-3xl shadow-2xl border border-[var(--border-primary)] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-muted)] transition-colors cursor-pointer"
          aria-label="Close case study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Preview Banner */}
        <div
          className="w-full h-52 rounded-2xl overflow-hidden mb-6 border border-[var(--border-primary)]"
          style={{ backgroundColor: project.headerBg || '#151D28' }}
        >
          <div className="max-w-sm mx-auto h-full">
            <ProjectMockup type={project.mockupType || 'taskly'} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[var(--text-muted)] mb-2">
          <span style={{ color: project.categoryColor || 'var(--accent-primary)' }} className="font-bold">
            {category}
          </span>
          {project.year && (
            <>
              <span aria-hidden="true">·</span>
              <span>{project.year}</span>
            </>
          )}
          {role && (
            <>
              <span aria-hidden="true">·</span>
              <span>{role}</span>
            </>
          )}
        </div>

        <h3 id="case-study-title" className="font-display font-bold text-3xl text-[var(--text-primary)] mb-3">
          {project.title}
        </h3>
        {overview && <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed mb-6">{overview}</p>}

        {(challenge || solution) && (
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            {challenge && (
              <div className="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-primary)]">
                <h4 className="font-bold text-sm text-[var(--accent-primary)] mb-1.5">{t.challenge}</h4>
                <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed">{challenge}</p>
              </div>
            )}
            {solution && (
              <div className="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-primary)]">
                <h4 className="font-bold text-sm text-[var(--accent-primary)] mb-1.5">{t.solution}</h4>
                <p className="text-xs sm:text-[13px] text-[var(--text-secondary)] leading-relaxed">{solution}</p>
              </div>
            )}
          </div>
        )}

        {metricsList.length > 0 && (
          <div className="mb-6">
            <h4 className="font-bold text-sm text-[var(--text-primary)] mb-2.5">{t.outcomes}</h4>
            <div className="grid sm:grid-cols-3 gap-2.5">
              {metricsList.map((metric: string, idx: number) => (
                <div
                  key={`outcome-${idx}-${metric}`}
                  className="bg-[var(--accent-primary-subtle)] border border-[var(--accent-primary)]/20 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-[var(--accent-primary)]"
                >
                  {metric}
                </div>
              ))}
            </div>
          </div>
        )}

        {stackList.length > 0 && (
          <div className="mb-7">
            <h4 className="font-bold text-sm text-[var(--text-primary)] mb-2">{t.techStack}</h4>
            <p className="text-xs sm:text-[13px] font-medium text-[var(--text-secondary)]">
              {stackList.join(' · ')}
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[var(--border-primary)]">
          <button
            onClick={() => onInquire(project.title)}
            className="px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[#2563EB] text-white text-sm font-semibold inline-flex items-center gap-2 transition-colors cursor-pointer"
          >
            {t.buildSimilar}
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-card-muted)] border border-[var(--border-primary)] text-sm font-semibold text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            {t.back}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ServiceDetailModal({
  service,
  lang,
  onClose,
  onStartProject,
}: {
  service: ServiceItem | null;
  lang: Language;
  onClose: () => void;
  onStartProject: (topic: string) => void;
}) {
  useEscapeClose(onClose);
  if (!service) return null;

  const isId = lang === 'id';
  const title = (isId && (service as any).title_id) || service.title || (service as any).title_en || '';
  const description = (isId && (service as any).description_id) || service.description || (service as any).description_en || '';

  const rawHighlights = isId
    ? (service as any).highlights_id || service.highlights || (service as any).highlights_en || []
    : service.highlights || (service as any).highlights_en || (service as any).highlights_id || [];
  const highlightsList = Array.isArray(rawHighlights) ? rawHighlights : [];

  const rawDeliverables = isId
    ? (service as any).deliverables_id || service.deliverables || (service as any).deliverables_en || []
    : service.deliverables || (service as any).deliverables_en || (service as any).deliverables_id || [];
  const deliverablesList = Array.isArray(rawDeliverables) ? rawDeliverables : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[3px] p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-[var(--bg-card-elevated)] rounded-3xl shadow-2xl border border-[var(--border-primary)] p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-muted)] transition-colors cursor-pointer"
          aria-label="Close service details"
        >
          <X className="w-5 h-5" />
        </button>

        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 font-bold text-[var(--accent-primary)] border border-white/5"
          style={{ backgroundColor: service.iconBg || '#1E293B' }}
        >
          ✦
        </div>

        <h3 id="service-modal-title" className="font-display font-bold text-2xl text-[var(--accent-primary)] mb-2">
          {title}
        </h3>
        {description && <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">{description}</p>}

        {highlightsList.length > 0 && (
          <div className="bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-primary)] mb-5">
            <h4 className="font-bold text-xs text-[var(--text-primary)] mb-2.5">
              {isId ? 'Lingkup Layanan' : "What's Included"}
            </h4>
            <ul className="space-y-2 text-[13px] text-[var(--text-secondary)]">
              {highlightsList.map((item: string, idx: number) => (
                <li key={`highlight-${idx}-${item}`} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {deliverablesList.length > 0 && (
          <p className="text-xs text-[var(--text-muted)] mb-6">
            {isId ? 'Hasil Kerja' : 'Deliverables'}:{' '}
            <span className="font-semibold text-[var(--text-secondary)]">{deliverablesList.join(' · ')}</span>
          </p>
        )}

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-muted)] cursor-pointer"
          >
            {isId ? 'Tutup' : 'Close'}
          </button>
          <button
            onClick={() => onStartProject(title)}
            className="px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[#2563EB] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
          >
            {isId ? `Diskusikan ${title}` : `Discuss ${title}`}
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ContactModal({
  isOpen,
  initialSubject,
  profileEmail,
  lang,
  onClose,
}: {
  isOpen: boolean;
  initialSubject?: string;
  profileEmail: string;
  lang: Language;
  onClose: () => void;
}) {
  useEscapeClose(onClose);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState(initialSubject || 'Web Application');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = TRANSLATIONS[lang].contactModal;

  useEffect(() => {
    if (initialSubject) setTopic(initialSubject);
  }, [initialSubject]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, topic, message }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setSubmitted(true); // Graceful fallback
    } finally {
      setLoading(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(profileEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setMessage('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[3px] p-4"
      onClick={resetAndClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      <div
        className="relative w-full max-w-lg bg-[var(--bg-card-elevated)] rounded-3xl shadow-2xl border border-[var(--border-primary)] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-muted)] transition-colors cursor-pointer"
          aria-label="Close contact dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[var(--accent-secondary)] text-[#0B0F14] flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="font-display font-bold text-2xl text-[var(--accent-primary)]">
              {t.successTitle}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] max-w-sm mx-auto leading-relaxed">
              {t.successDesc.replace('{topic}', topic)}
            </p>
            <button
              onClick={resetAndClose}
              className="px-6 py-2.5 rounded-xl bg-[var(--accent-primary)] text-white text-sm font-semibold hover:bg-[#2563EB] cursor-pointer"
            >
              {t.doneButton}
            </button>
          </div>
        ) : (
          <>
            <h3 id="contact-modal-title" className="font-display font-bold text-2xl sm:text-3xl text-[var(--accent-primary)] mb-1.5">
              {t.title}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-5">
              {t.subtitle}
            </p>

            <div className="flex items-center justify-between bg-[var(--bg-card)] rounded-xl px-3.5 py-2.5 border border-[var(--border-primary)] mb-5">
              <span className="text-xs sm:text-[13px] font-medium text-[var(--text-primary)] truncate">
                {profileEmail}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent-primary)] hover:underline shrink-0 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? t.copied : t.copyEmail}
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">{t.nameLabel}</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t.namePlaceholder}
                    className="w-full rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">{t.emailLabel}</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.emailPlaceholder}
                    className="w-full rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">{t.topicLabel}</label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">{t.messageLabel}</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.messagePlaceholder}
                  className="w-full rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)] px-3.5 py-2.5 text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[var(--accent-primary)] hover:bg-[#2563EB] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{t.sending}</span>
                  </>
                ) : (
                  <>
                    <span>{t.sendButton}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function CVModal({
  isOpen,
  profile,
  experience,
  education,
  skills,
  lang,
  onClose,
}: {
  isOpen: boolean;
  profile: any;
  experience: any[];
  education: any[];
  skills: string[];
  lang: Language;
  onClose: () => void;
}) {
  useEscapeClose(onClose);
  if (!isOpen) return null;

  const isId = lang === 'id';
  const roleTitle = isId ? profile.badgeRole_id || profile.badgeRole_en : profile.badgeRole_en;
  const bio = isId ? profile.aboutBio_id || profile.aboutBio_en : profile.aboutBio_en;

  const handleDownloadFile = () => {
    const lines = [
      `${profile.name} — ${roleTitle}`,
      `${profile.location} | ${profile.email} | ${profile.website} | ${profile.linkedin}`,
      '',
      isId ? 'RINGKASAN' : 'SUMMARY',
      bio,
      '',
      isId ? 'PENGALAMAN' : 'EXPERIENCE',
      ...experience.map((e) => `- ${isId ? e.period_id || e.period_en : e.period_en}: ${isId ? e.role_id || e.role_en : e.role_en} (${e.organization}) — ${isId ? e.detail_id || e.detail_en : e.detail_en}`),
      '',
      isId ? 'PENDIDIKAN' : 'EDUCATION',
      ...education.map((e) => `- ${e.period}: ${isId ? e.role_id || e.role_en : e.role_en}, ${e.organization}`),
      '',
      isId ? 'KEAHLIAN' : 'SKILLS',
      skills.join(', '),
    ].join('\n');

    const blob = new Blob([lines], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profile.name.replace(/\s+/g, '_')}_CV.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-[3px] p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-modal-title"
    >
      <div
        className="relative w-full max-w-xl max-h-[88vh] overflow-y-auto bg-[var(--bg-card-elevated)] rounded-3xl shadow-2xl border border-[var(--border-primary)] p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[var(--bg-card)] border border-[var(--border-primary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-muted)] transition-colors cursor-pointer"
          aria-label="Close curriculum vitae"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="border-b border-[var(--border-primary)] pb-4 mb-5 pr-10">
          <h3 id="cv-modal-title" className="font-display font-bold text-2xl text-[var(--text-primary)]">
            {profile.name}
          </h3>
          <p className="text-sm font-semibold text-[var(--accent-primary)]">{roleTitle}</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {profile.location} · {profile.email} · {profile.website}
          </p>
        </div>

        <div className="space-y-5 text-sm">
          <div>
            <h4 className="font-bold text-xs text-[var(--accent-secondary)] uppercase tracking-wider mb-1.5">
              {isId ? 'Profil' : 'Profile'}
            </h4>
            <p className="text-[var(--text-secondary)] leading-relaxed text-[13.5px]">{bio}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-xs text-[var(--accent-secondary)] uppercase tracking-wider mb-2">
                {isId ? 'Pengalaman' : 'Experience'}
              </h4>
              <div className="space-y-2.5">
                {experience.map((item) => (
                  <div key={item.id || item.period_en}>
                    <div className="font-bold text-xs text-[var(--text-primary)]">
                      {isId ? item.period_id || item.period_en : item.period_en}
                    </div>
                    <div className="text-xs font-medium text-[var(--text-secondary)]">
                      {isId ? item.role_id || item.role_en : item.role_en} · {item.organization}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-xs text-[var(--accent-secondary)] uppercase tracking-wider mb-2">
                {isId ? 'Pendidikan' : 'Education'}
              </h4>
              <div className="space-y-2.5">
                {education.map((item) => (
                  <div key={item.id || item.period}>
                    <div className="font-bold text-xs text-[var(--text-primary)]">{item.period}</div>
                    <div className="text-xs font-medium text-[var(--text-secondary)]">
                      {isId ? item.role_id || item.role_en : item.role_en} · {item.organization}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs text-[var(--accent-secondary)] uppercase tracking-wider mb-1.5">
              {isId ? 'Keahlian Inti' : 'Core Stack'}
            </h4>
            <p className="text-xs font-semibold text-[var(--text-secondary)] leading-relaxed">
              {skills.join(' · ')}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 mt-6 pt-4 border-t border-[var(--border-primary)]">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-[var(--bg-card)] hover:bg-[var(--bg-card-muted)] border border-[var(--border-primary)] text-xs font-semibold text-[var(--text-primary)] inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            {isId ? 'Cetak / Simpan PDF' : 'Print / Save PDF'}
          </button>
          <button
            onClick={handleDownloadFile}
            className="px-5 py-2.5 rounded-xl bg-[var(--accent-primary)] hover:bg-[#2563EB] text-white text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            {isId ? 'Unduh CV' : 'Download CV'}
          </button>
        </div>
      </div>
    </div>
  );
}
