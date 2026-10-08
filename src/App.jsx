import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Activity, ArrowDownRight, ArrowRight, ArrowUpRight, Banknote, Bell, Bookmark, Boxes,
  BriefcaseBusiness, CalendarDays, CarFront, Check, ChevronDown, ChevronLeft, ChevronRight,
  Command, ContactRound, FileCheck2, FileText, FolderOpen, Fuel, Globe2, GraduationCap,
  Headset, HeartPulse, LayoutDashboard, LogOut, Mail, Menu, Megaphone, MoreHorizontal, Plus,
  Search, SearchCheck, ShieldCheck, Sparkles, Users, Wallet, X,
} from 'lucide-react';
import logo from './assets/images/nita-logo.png';
import officeImage from './assets/images/hero-background.jpg';
import storyImage from './assets/images/news.jpg';
import collaborationImage from './assets/images/hero-collaboration.jpg';
import interiorImage from './assets/images/hero-office-interior.jpg';
import WeatherCard from './components/WeatherCard.jsx';

const nav = [
  { label: 'Overview', icon: LayoutDashboard, path: '/' },
  { label: 'My workflow', icon: Activity, count: '6', path: '/workflow' },
  { label: 'Services', icon: BriefcaseBusiness, path: '/services' },
  { label: 'Calendar', icon: CalendarDays, path: '/calendar' },
  { label: 'Documents', icon: FolderOpen, path: '/documents' },
  { label: 'News & updates', icon: Globe2, path: '/news' },
];
const modules = [
  { id: 'email', title: 'eMail', group: 'COMMUNICATION', desc: 'Government Exchange inbox', icon: Mail, tint: 'mint', meta: '12 unread', path: '/workflow#email' },
  { id: 'calendar', title: 'Calendar', group: 'SCHEDULE', desc: 'Meetings and directorate agenda', icon: CalendarDays, tint: 'lavender', meta: 'Next meeting 09:00', path: '/calendar' },
  { id: 'correspondence', title: 'Correspondence', group: 'RECORDS', desc: 'Incoming and outgoing registry', icon: ArrowDownRight, tint: 'amber', meta: '4 in review', path: '/workflow#correspondence' },
  { id: 'memo-dispatch', title: 'Memo & dispatch', group: 'RECORDS', desc: 'Internal agency memoranda', icon: FileText, tint: 'blue', meta: '2 drafts', path: '/workflow#memo-dispatch' },
  { id: 'approvals', title: 'My approvals', group: 'YOUR ACTION', desc: 'Items requiring your signature', icon: FileCheck2, tint: 'mint', meta: '3 pending', path: '/workflow#approvals' },
  { id: 'shared-files', title: 'Shared files', group: 'COLLABORATION', desc: 'OneDrive and Teams storage', icon: FolderOpen, tint: 'rose', meta: 'Updated today', path: '/workflow#shared-files' },
  { id: 'circulars', title: 'Circulars', group: 'KNOWLEDGE', desc: 'Official service bulletins', icon: Megaphone, tint: 'lime', meta: '2 new circulars', path: '/workflow#circulars' },
  { id: 'staff-directory', title: 'Staff directory', group: 'PEOPLE', desc: 'Agency contacts and organisation', icon: ContactRound, tint: 'lavender', meta: 'Browse people', path: '/workflow#staff-directory' },
  { id: 'enterprise-search', title: 'Enterprise search', group: 'DISCOVERY', desc: 'Search policies and resources', icon: SearchCheck, tint: 'blue', meta: 'Search everything', path: '/workflow#enterprise-search' },
];
const quickActions = [
  { label: 'Request IT support', icon: Headset, anchor: 'it-helpdesk' }, { label: 'Apply for leave', icon: CalendarDays, anchor: 'eleave' },
  { label: 'Request a vehicle', icon: CarFront, anchor: 'vehicle-request' }, { label: 'Find a colleague', icon: ContactRound, anchor: 'staff-hub' },
];
const quickLinks = [
  { id: 'it-helpdesk', label: 'IT Helpdesk', detail: 'Technical support', icon: Headset },
  { id: 'funds-request', label: 'Funds Request', detail: 'Disbursement', icon: Banknote },
  { id: 'eleave', label: 'eLeave', detail: 'Leave management', icon: CalendarDays },
  { id: 'imprest', label: 'Imprest', detail: 'Petty cash', icon: Wallet },
  { id: 'stores-supply', label: 'Stores & Supply', detail: 'Stationery and hardware', icon: Boxes },
  { id: 'vehicle-request', label: 'Vehicle Request', detail: 'Transport pool', icon: CarFront },
  { id: 'medical-scheme', label: 'Medical Scheme', detail: 'Staff health services', icon: HeartPulse },
  { id: 'fuel-coupon', label: 'Fuel Coupon', detail: 'Logistics', icon: Fuel },
  { id: 'reimbursement', label: 'Reimbursement', detail: 'Expense claim', icon: BriefcaseBusiness },
];
const workplaceLinks = [
  { id: 'staff-hub', label: 'Staff Hub & Benefits', detail: 'Pensions, allowances and ID', icon: Users },
  { id: 'performance-appraisal', label: 'Performance Appraisal', detail: 'Annual staff scoring', icon: ShieldCheck },
  { id: 'elearning', label: 'eLearning Academy', detail: 'Civil service modules', icon: GraduationCap },
  { id: 'nita-portal', label: 'NITA Official Portal', detail: 'nita.gov.gh', icon: Globe2 },
];
const heroSlides = [
  { eyebrow: 'YOUR WORKPLACE, CONNECTED', first: 'One place to', second: 'move work forward.', body: 'Services, shared resources and the latest from across NITA.', cta: 'Explore your services', target: '/services', image: officeImage },
  { eyebrow: 'BUILT FOR YOUR WORKDAY', first: 'Better tools,', second: 'closer together.', body: 'Find the people, shared files and services you need to do your best work.', cta: 'Open shared workspace', target: '/workflow', image: collaborationImage },
  { eyebrow: 'A SPACE TO DO YOUR BEST', first: 'A calmer place', second: 'to focus and meet.', body: 'Find useful workspaces, teams and tools wherever your day takes you.', cta: 'Browse workplace tools', target: '/services', image: interiorImage },
];
const initialEvents = [
  { day: '09', month: 'OCT', time: '09:00', title: 'Platform team stand-up', type: 'Team meeting', place: 'Microsoft Teams', color: 'event-violet' },
  { day: '12', month: 'OCT', time: '09:00', title: 'Digital services review', type: 'Leadership', place: 'Boardroom · 4th floor', color: 'event-green' },
  { day: '14', month: 'OCT', time: '14:00', title: 'Cybersecurity awareness', type: 'All staff', place: 'Main auditorium', color: 'event-orange' },
];
const stories = [
  { category: 'AGENCY UPDATE', title: 'Building a more secure digital Ghana, together', summary: 'A new series of cross-agency workshops is bringing public-sector teams together to strengthen digital trust.', date: '14 Oct · 4 min read', image: true },
  { category: 'POLICY', title: 'Cloud framework consultation opens this week', summary: 'Share feedback on the proposed standards for public-sector cloud services.', date: '12 Oct · 3 min read' },
  { category: 'PEOPLE', title: 'Registration is open for the digital skills clinic', summary: 'Practical sessions for staff begin later this month.', date: '10 Oct · 2 min read' },
];
const documentRows = [
  { type: 'PDF', tone: 'pdf', title: 'Cloud Services Framework', sub: 'Policy Directorate · Updated 2h ago' },
  { type: 'DOC', tone: 'doc', title: 'Q4 Digital Services Brief', sub: 'Your documents · Updated yesterday' },
  { type: 'XLS', tone: 'xls', title: 'Agency Operations Tracker', sub: 'Operations · Updated 13 Oct' },
];
const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
function Sidebar({ active, open, setOpen, onNavigate }) {
  return <><div className={`sidebar-backdrop ${open ? 'show' : ''}`} onClick={() => setOpen(false)} />
    <aside className={`sidebar ${open ? 'mobile-open' : ''}`}>
      <div className="side-brand"><img src={logo} alt="NITA — National Information Technology Agency, Ghana" /><button className="mobile-close" onClick={() => setOpen(false)} aria-label="Close menu"><X size={18} /></button></div>
      <div className="workspace-switch"><span className="switch-emblem">N</span><span><small>WORKSPACE</small><b>National HQ</b></span><ChevronDown size={14} /></div>
      <p className="nav-caption">YOUR SPACE</p>
      <nav aria-label="Main navigation">{nav.map(({ label, icon: Icon, count, path }) => <button key={label} className={`nav-link ${active === label ? 'active' : ''}`} onClick={() => onNavigate(path)}><Icon size={17} strokeWidth={1.8} /><span>{label}</span>{count && <small>{count}</small>}</button>)}</nav>
      <div className="side-bottom"><div className="help-panel"><span className="help-icon"><Sparkles size={16} /></span><b>Need a hand?</b><p>Get help with workplace services.</p><button onClick={() => onNavigate('/services#it-helpdesk')}>Visit help centre <ArrowRight size={13} /></button></div></div>
    </aside></>;
}

function Header({ title, onMenu, onSearch, onNotice, onLogout }) {
  const [query, setQuery] = useState('');
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef(null);
  useEffect(() => {
    const closeAccountMenu = event => { if (!accountRef.current?.contains(event.target)) setAccountOpen(false); };
    const closeOnEscape = event => { if (event.key === 'Escape') setAccountOpen(false); };
    document.addEventListener('pointerdown', closeAccountMenu);
    document.addEventListener('keydown', closeOnEscape);
    return () => { document.removeEventListener('pointerdown', closeAccountMenu); document.removeEventListener('keydown', closeOnEscape); };
  }, []);
  return <header className="top-header"><button className="menu-button" onClick={onMenu} aria-label="Open navigation"><Menu size={20} /></button><div className="crumb">Workspace <ChevronRight size={14} /> <b>{title}</b></div><div className="top-right"><form className="search-field" onSubmit={e => { e.preventDefault(); onSearch(query); }}><Search size={15} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search workspace" aria-label="Search workspace" /><kbd><Command size={10} /> K</kbd></form><button className="notice-button" aria-label="Notifications" onClick={onNotice}><Bell size={18} /><i /></button><div className="account-menu-wrap" ref={accountRef}><button className="header-avatar" aria-label="Open account menu" aria-haspopup="menu" aria-expanded={accountOpen} onClick={() => setAccountOpen(open => !open)}>RG</button>{accountOpen && <div className="account-menu" role="menu"><div className="account-menu-user"><span className="account-menu-avatar">RG</span><span><b>Richmond G.</b><small>NITA staff account</small></span></div><button role="menuitem" onClick={() => { setAccountOpen(false); onLogout(); }}><LogOut size={15} /> Log out</button></div>}</div></div></header>;
}

function EventCenter({ notify, onNavigateCalendar, fullPage = false }) {
  const [week, setWeek] = useState(0);
  const [day, setDay] = useState(() => (new Date().getDay() + 6) % 7);
  const [showAll, setShowAll] = useState(false);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekdayOffset = (today.getDay() + 6) % 7;
  const weekStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - weekdayOffset + week * 7);
  const weekDays = Array.from({ length: 7 }, (_, i) => new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + i));
  const dates = weekDays.map(date => String(date.getDate()).padStart(2, '0'));
  const monthLabel = new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(weekStart);
  const monthShort = new Intl.DateTimeFormat('en', { month: 'short' }).format(weekStart).toUpperCase();
  const selectedDateLabel = new Intl.DateTimeFormat('en', { weekday: 'long', month: 'long', day: 'numeric' }).format(weekDays[day]).toUpperCase();
  const activeEvents = initialEvents.filter(event => (event.day === dates[day] && event.month === monthShort) || showAll);
  return <section className="panel event-center" id="calendar">
    <div className="panel-heading"><div><span className="kicker">MAKE TIME FOR WHAT MATTERS</span><h2>Event center</h2></div><button className="quiet-link" onClick={() => fullPage ? setShowAll(!showAll) : onNavigateCalendar()}>{fullPage ? (showAll ? 'Selected day' : 'Show all events') : 'Full calendar'} <ArrowUpRight size={14} /></button></div>
    <div className="calendar-control"><div><button aria-label="Previous week" onClick={() => setWeek(value => value - 1)}><ChevronLeft size={16} /></button><strong>{monthLabel}</strong><button aria-label="Next week" onClick={() => setWeek(value => value + 1)}><ChevronRight size={16} /></button></div><button className="today-button" onClick={() => setWeek(0)}>This week</button></div>
    <div className="week-strip">{dates.map((date, i) => <button key={date} className={`date-chip ${day === i ? 'selected' : ''}`} onClick={() => { setDay(i); setShowAll(false); }}><small>{days[i]}</small><b>{date}</b>{initialEvents.some(e => e.day === date && e.month === new Intl.DateTimeFormat('en', { month: 'short' }).format(weekDays[i]).toUpperCase()) && <i />}</button>)}</div>
    <div className="agenda-head"><span>{showAll ? 'UPCOMING THIS WEEK' : selectedDateLabel}</span><button onClick={() => notify('New event form is ready to connect to your calendar.')}><Plus size={13} /> Add event</button></div>
    <div className="agenda-list">{activeEvents.length ? activeEvents.map((event, i) => <article className="agenda-item" key={`${event.title}-${i}`}><time>{event.time}</time><span className={`agenda-rule ${event.color}`} /><div className="agenda-copy"><div><b>{event.title}</b><span className={`event-tag ${event.color}`}>{event.type}</span></div><small>{event.place}</small></div><button className="agenda-more" aria-label={`More options for ${event.title}`}><MoreHorizontal size={16} /></button></article>) : <div className="empty-agenda"><CalendarDays size={18} /><span>No events on this day</span></div>}</div>
  </section>;
}

function ModuleGrid({ items, query = '', navigate, title = 'Services & modules', kicker = 'THE TOOLS YOU USE MOST', description, onAll }) {
  const filtered = useMemo(() => items.filter(m => `${m.title} ${m.desc} ${m.group}`.toLowerCase().includes(query.toLowerCase())), [items, query]);
  return <section className="module-section"><div className="panel-heading"><div><span className="kicker">{kicker}</span><h2>{title} <span className="section-count">{String(filtered.length).padStart(2, '0')}</span></h2>{description && <p className="panel-description">{description}</p>}</div>{onAll && <button className="quiet-link" onClick={onAll}>All services <ArrowUpRight size={14} /></button>}</div>
    <div className="module-bento">{filtered.map((item, i) => { const { id, title: label, group, desc, icon: Icon, tint, meta, path } = item; return <button key={id} id={id} className={`module-card ${i === 0 ? 'module-featured' : ''}`} onClick={() => navigate(path)}><span className={`module-symbol ${tint}`}><Icon size={20} strokeWidth={1.8} /></span><span className="module-group">{group}</span><b>{label}</b><p>{desc}</p><span className="module-meta">{meta}</span><span className="module-arrow"><ArrowUpRight size={14} /></span></button>; })}</div>
    {!filtered.length && <div className="no-results">No services found for “{query}”.</div>}
  </section>;
}

function PageIntro({ eyebrow, title, description, action }) {
  return <div className="page-intro"><div><span className="kicker">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div>{action}</div>;
}

function WorkflowSummary({ navigate }) {
  return <section className="workflow-panel"><div className="workflow-title"><div><span className="kicker">YOUR WORKFLOW</span><h2>Keep things moving</h2></div><button className="quiet-link" onClick={() => navigate('/workflow')}>Open my work <ArrowUpRight size={14} /></button></div><div className="workflow-stats"><button onClick={() => navigate('/workflow#approvals')}><span className="stat-icon stat-green"><Check size={16} /></span><span><small>Needs your approval</small><b>03 <i>items</i></b></span><span className="stat-arrow"><ArrowUpRight size={14} /></span></button><button onClick={() => navigate('/workflow#memo-dispatch')}><span className="stat-icon stat-gold"><Activity size={16} /></span><span><small>Action items</small><b>04 <i>tasks</i></b></span><span className="stat-arrow"><ArrowUpRight size={14} /></span></button><button onClick={() => navigate('/workflow#correspondence')}><span className="stat-icon stat-blue"><FileText size={16} /></span><span><small>In progress</small><b>02 <i>requests</i></b></span><span className="stat-arrow"><ArrowUpRight size={14} /></span></button></div></section>;
}

function QuickLinksSection({ navigate, title = 'Quick links', description = 'Common staff services and support' }) {
  return <section className="panel service-panel"><div className="panel-heading"><div><span className="kicker">FREQUENTLY USED STAFF SERVICES</span><h2>{title}</h2><p className="panel-description">{description}</p></div></div><div className="service-tile-grid">{quickLinks.map(({ id, label, detail, icon: Icon }) => <button className="service-tile" id={id} key={id} onClick={() => navigate(`/services#${id}`)}><span className="service-tile-icon"><Icon size={18} /></span><span><b>{label}</b><small>{detail}</small></span><ArrowUpRight size={14} /></button>)}</div></section>;
}

function WorkplaceLinksSection({ navigate }) {
  return <section className="panel service-panel"><div className="panel-heading"><div><span className="kicker">PEOPLE TOOLS & LEARNING</span><h2>Workplace links</h2></div></div><div className="workplace-tile-grid">{workplaceLinks.map(({ id, label, detail, icon: Icon }) => <button className="workplace-tile" id={id} key={id} onClick={() => navigate(`/services#${id}`)}><span><Icon size={17} /></span><b>{label}</b><small>{detail}</small><ArrowUpRight size={14} /></button>)}</div></section>;
}

function DocumentsSection({ navigate, notify, fullPage = false }) {
  return <section className={`panel document-panel ${fullPage ? 'document-page-panel' : ''}`} id="documents"><div className="panel-heading"><div><span className="kicker">YOUR RECENT FILES</span><h2>{fullPage ? 'Document library' : 'Recent documents'}</h2></div>{!fullPage && <button className="quiet-link" onClick={() => navigate('/documents')}>See all <ArrowUpRight size={14} /></button>}</div><div className="document-rows">{documentRows.map(doc => <button className="document-row" key={doc.title} onClick={() => fullPage ? notify(`${doc.title} is ready to open from the document library.`) : navigate('/documents')}><span className={`doc-type ${doc.tone}`}>{doc.type}</span><span className="doc-copy"><b>{doc.title}</b><small>{doc.sub}</small></span><ArrowUpRight size={14} /></button>)}</div>{fullPage && <button className="document-link" onClick={() => notify('The document library is ready to connect to your workplace storage.')}>Connect document storage <ArrowRight size={13} /></button>}</section>;
}

function NewsDesk({ notify, onNavigateNews, fullPage = false }) {
  const [category, setCategory] = useState('All updates');
  const [saved, setSaved] = useState(false);
  const categories = ['All updates', 'Agency', 'Policy', 'People'];
  const filteredStories = stories.filter((story, index) => category === 'All updates' || story.category.toLowerCase().includes(category.toLowerCase()) || (category === 'Agency' && index === 0));
  const lead = filteredStories[0] || stories[0];
  const secondary = filteredStories.filter(story => story !== lead);
  return <section className="news-desk" id="news"><div className="news-head"><div><span className="kicker">FROM ACROSS THE AGENCY</span><h2>News desk</h2></div><div className="news-tools"><div className="news-filter">{categories.map(item => <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div>{!fullPage && <button className="quiet-link" onClick={onNavigateNews}>All news <ArrowUpRight size={14} /></button>}</div></div>
    <article className="lead-story"><div className="lead-image" style={{ backgroundImage: `linear-gradient(0deg,rgba(7,35,25,.62),rgba(7,35,25,.02) 72%),url(${storyImage})` }}><span className="lead-image-label">THE NITA BRIEFING</span><button className={`bookmark-button ${saved ? 'saved' : ''}`} aria-label={saved ? 'Remove saved article' : 'Save article'} onClick={() => setSaved(!saved)}><Bookmark size={16} fill={saved ? 'currentColor' : 'none'} /></button><div className="lead-image-caption"><span>{lead.category}</span><h3>{lead.title}</h3></div></div><div className="lead-summary"><span className="story-date">{lead.date}</span><p>{lead.summary}</p><button onClick={() => fullPage ? notify('Opening the full agency story.') : onNavigateNews?.()}>Read the story <ArrowRight size={14} /></button></div></article>
    <div className="story-list">{(secondary.length ? secondary : stories.slice(1)).map((story, i) => <article className="story-row" key={story.title}><div className={`story-index index-${i}`}>0{i + 2}</div><div><span>{story.category} <i>·</i> {story.date}</span><h3>{story.title}</h3><p>{story.summary}</p></div><button aria-label={`Read ${story.title}`} onClick={() => fullPage ? notify(`Opening: ${story.title}`) : onNavigateNews?.()}><ArrowUpRight size={15} /></button></article>)}</div>
  </section>;
}

function App() {
  const [location, setLocation] = useState(() => ({ pathname: window.location.pathname, hash: window.location.hash }));
  const [drawer, setDrawer] = useState(false);
  const [query, setQuery] = useState('');
  const [toast, setToast] = useState('');
  const [heroIndex, setHeroIndex] = useState(0);
  const notify = (message) => { setToast(message); window.clearTimeout(notify.timer); notify.timer = window.setTimeout(() => setToast(''), 2600); };
  useEffect(() => { const timer = window.setInterval(() => setHeroIndex(index => (index + 1) % heroSlides.length), 8000); return () => window.clearInterval(timer); }, []);
  useEffect(() => { const onPopState = () => setLocation({ pathname: window.location.pathname, hash: window.location.hash }); window.addEventListener('popstate', onPopState); return () => window.removeEventListener('popstate', onPopState); }, []);
  const route = location.pathname === '' ? '/' : location.pathname;
  const currentNav = nav.find(item => item.path === route);
  const pageTitle = currentNav?.label || 'Services';
  function navigate(to, { preserveQuery = false } = {}) {
    const url = new URL(to, window.location.origin);
    const next = `${url.pathname}${url.hash}`;
    window.history.pushState({}, '', next);
    setLocation({ pathname: url.pathname, hash: url.hash });
    setDrawer(false);
    if (!preserveQuery) setQuery('');
    window.scrollTo({ top: 0, behavior: 'instant' });
    if (url.hash) window.setTimeout(() => document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }
  function handleSearch(value) {
    setQuery(value.trim());
    if (value.trim() && route !== '/services') navigate('/services', { preserveQuery: true });
  }
  const today = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date());
  const hero = heroSlides[heroIndex];
  const recentModules = modules.filter(item => ['email', 'calendar', 'approvals'].includes(item.id));
  const recordsModules = modules.filter(item => ['correspondence', 'memo-dispatch', 'shared-files'].includes(item.id));
  const peopleModules = modules.filter(item => ['circulars', 'staff-directory', 'enterprise-search'].includes(item.id));
  const isOverview = route === '/';
  const isWorkflow = route === '/workflow';
  const isServices = route === '/services';
  const isCalendar = route === '/calendar';
  const isDocuments = route === '/documents';
  const isNews = route === '/news';
  return <div className="app-frame"><Sidebar active={pageTitle} onNavigate={navigate} open={drawer} setOpen={setDrawer} /><div className="main-area"><Header title={pageTitle} onMenu={() => setDrawer(true)} onSearch={handleSearch} onNotice={() => navigate('/workflow#approvals')} onLogout={() => notify('You are signed out of this demo account.')} />
    <main className="dashboard-content">
      {isOverview && <>
        <div className="welcome-row"><div><span className="today-label">{today.toUpperCase()} <i /> NATIONAL HQ</span><h1>Good morning, Richmond <span>✳</span></h1><p>Your workday, at a glance. Here’s what’s happening across your workplace.</p></div><button className="create-button" onClick={() => navigate('/services')}><Plus size={16} /> Create request</button></div>
        <div className="top-grid"><div className="left-stack"><section className="hero-banner"><img className="hero-photo" src={hero.image} alt="" aria-hidden="true" /><span className="hero-eyebrow"><span /> {hero.eyebrow}</span><h2>{hero.first}<br /><em>{hero.second}</em></h2><p>{hero.body}</p><button onClick={() => navigate(hero.target)}>{hero.cta} <ArrowRight size={15} /></button><div className="hero-pagination">{heroSlides.map((slide, index) => <button key={slide.eyebrow} aria-label={`Show banner ${index + 1}`} aria-pressed={heroIndex === index} className={heroIndex === index ? 'current' : ''} onClick={() => setHeroIndex(index)} />)}<small>0{heroIndex + 1} / 0{heroSlides.length}</small></div></section><WorkflowSummary navigate={navigate} /></div><WeatherCard /></div>
        <section className="quick-actions"><div className="quick-title"><span className="quick-plus"><Sparkles size={15} /></span><div><b>Quick links</b><small>Common staff services and support</small></div></div>{quickActions.map(({ label, icon: Icon, anchor }) => <button key={label} onClick={() => navigate(`/services#${anchor}`)}><Icon size={16} /><span>{label}</span><ArrowUpRight size={12} /></button>)}</section>
        <ModuleGrid items={recentModules} query={query} navigate={navigate} title="Recently used" onAll={() => navigate('/services')} />
        <div className="lower-grid"><EventCenter notify={notify} onNavigateCalendar={() => navigate('/calendar')} /><aside className="right-stack"><NewsDesk notify={notify} onNavigateNews={() => navigate('/news')} /><DocumentsSection navigate={navigate} notify={notify} /></aside></div>
      </>}
      {isWorkflow && <>
        <PageIntro eyebrow="YOUR WORK, ALL IN ONE PLACE" title="My workflow" description="Pick up tasks, follow active work, and jump into your everyday tools." action={<button className="create-button" onClick={() => navigate('/services')}><Plus size={16} /> New request</button>} />
        <WorkflowSummary navigate={navigate} />
        <ModuleGrid items={recordsModules} query={query} navigate={navigate} title="Records & collaboration" kicker="YOUR WORK TOOLS" description="Move information through the agency and work with your team." />
        <ModuleGrid items={peopleModules} query={query} navigate={navigate} title="People & knowledge" kicker="PEOPLE & GUIDANCE" description="Reach the right people and the latest agency guidance." />
      </>}
      {isServices && <>
        <PageIntro eyebrow="DIRECTORY" title="Services & modules" description="Direct links to the tools and staff services that keep NITA moving." action={<span className="service-count-chip">{modules.length} modules · {quickLinks.length} staff services</span>} />
        <ModuleGrid items={modules} query={query} navigate={navigate} title="Direct module links" />
        <QuickLinksSection navigate={navigate} title="Quick links" description="Requests, support, logistics and staff services" />
        <WorkplaceLinksSection navigate={navigate} />
      </>}
      {isCalendar && <>
        <PageIntro eyebrow="MEETINGS & ORGANISATIONAL DATES" title="Calendar & events" description="Your week at a glance, with upcoming meetings and agency-wide activities." />
        <EventCenter notify={notify} fullPage onNavigateCalendar={() => {}} />
        <section className="calendar-note panel"><CalendarDays size={19} /><div><b>Stay in sync</b><p>Calendar entries are ready to connect to your organisational calendar.</p></div><button className="quiet-link" onClick={() => notify('Calendar connection settings are ready to connect.')}>Calendar settings <ArrowUpRight size={14} /></button></section>
      </>}
      {isDocuments && <>
        <PageIntro eyebrow="YOUR WORK FILES" title="Documents" description="Find recently updated documents and jump to the shared document library." />
        <DocumentsSection navigate={navigate} notify={notify} fullPage />
        <section className="document-storage-note panel"><FolderOpen size={20} /><div><b>Shared files</b><p>Browse team folders and agency resources from the shared workspace.</p></div><button className="quiet-link" onClick={() => navigate('/workflow#shared-files')}>Open shared files <ArrowUpRight size={14} /></button></section>
      </>}
      {isNews && <>
        <PageIntro eyebrow="FROM ACROSS THE AGENCY" title="News & updates" description="Policy, agency news and stories from teams across NITA." />
        <NewsDesk notify={notify} fullPage onNavigateNews={() => {}} />
      </>}
      {!isOverview && !isWorkflow && !isServices && !isCalendar && !isDocuments && !isNews && <PageIntro eyebrow="NITA SMART WORKPLACE" title="Page not found" description="Choose a section from the navigation to continue." action={<button className="create-button" onClick={() => navigate('/')}>Back to overview</button>} />}
      <footer className="footer"><span>© 2026 NITA Smart Workplace</span><span>National Information Technology Agency · Ghana</span><a href="https://nita.gov.gh/" target="_blank" rel="noreferrer">nita.gov.gh <ArrowUpRight size={11} /></a></footer>
    </main></div>{toast && <div className="toast-message" role="status"><span><Check size={15} /></span>{toast}</div>}</div>;
}

export default App;
