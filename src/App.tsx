import React, { useState, useEffect } from 'react';
import { MapPin, ExternalLink, Sprout, ClipboardList, FileText, UserPlus, DollarSign, Settings, ChevronRight, Calendar, BarChart3, AlertCircle, RefreshCw } from 'lucide-react';
import LoadingScreen from './components/LoadingScreen';
import AdminSettings from './components/AdminSettings';
import { getAllAppSettings, getAllButtonSettings } from './lib/supabase';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'home' | 'admin-settings'>('home');
  const [photos, setPhotos] = useState({
    header: 'https://i.postimg.cc/ZnWHPbw9/T4-T-Logo-Baru-2-1.jpg',
    roster: 'https://via.placeholder.com/600x300/e5f3ff/1e40af?text=Jadwal+Roster',
    payment: 'https://via.placeholder.com/600x300/f0fdf4/16a34a?text=Info+Pembayaran'
  });
  const [buttonSettings, setButtonSettings] = useState<{ [key: string]: boolean }>({});
  const [rosterEmbedKey, setRosterEmbedKey] = useState(0);
  const [rosterEmbedError, setRosterEmbedError] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await getAllAppSettings();
        setPhotos({
          header: settings.header_photo || 'https://i.postimg.cc/ZnWHPbw9/T4-T-Logo-Baru-2-1.jpg',
          roster: settings.roster_photo || 'https://via.placeholder.com/600x300/e5f3ff/1e40af?text=Jadwal+Roster',
          payment: settings.payment_photo || 'https://via.placeholder.com/600x300/f0fdf4/16a34a?text=Info+Pembayaran'
        });
        const buttons = await getAllButtonSettings();
        const buttonMap: { [key: string]: boolean } = {};
        buttons.forEach(btn => { buttonMap[btn.button_key] = btn.is_enabled; });
        setButtonSettings(buttonMap);
      } catch (error) {
        console.error('Error loading app settings:', error);
      }
    };
    loadSettings();
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (currentView === 'home') {
      const reloadButtonSettings = async () => {
        try {
          const buttons = await getAllButtonSettings();
          const buttonMap: { [key: string]: boolean } = {};
          buttons.forEach(btn => { buttonMap[btn.button_key] = btn.is_enabled; });
          setButtonSettings(buttonMap);
        } catch (error) {
          console.error('Error reloading button settings:', error);
        }
      };
      reloadButtonSettings();
    }
  }, [currentView]);

  const handlePhotoUpdate = (type: 'header' | 'roster' | 'payment', photoUrl: string) => {
    setPhotos(prev => ({ ...prev, [type]: photoUrl }));
  };

  if (currentView === 'admin-settings') {
    return (
      <AdminSettings
        onBack={() => setCurrentView('home')}
        onPhotoUpdate={handlePhotoUpdate}
      />
    );
  }

  const buttonData = [
    {
      key: "nms_app",
      title: "Aplikasi NMS",
      url: "https://nursery.trees4trees.org/",
      directRedirect: false,
      icon: Sprout,
      color: "#ef4444",
      colorLight: "#fef2f2",
      colorMid: "#fee2e2",
      description: "Nursery Management",
    },
    {
      key: "tkh_attendance",
      title: "Absensi TKH",
      url: "https://absentkhcitanduy.lovable.app/",
      directRedirect: false,
      icon: ClipboardList,
      color: "#f59e0b",
      colorLight: "#fffbeb",
      colorMid: "#fef3c7",
      description: "Tenaga Kerja Harian",
    },
    {
      key: "employee_attendance",
      title: "Absensi Karyawan",
      url: "https://sites.google.com/view/rekapabsencitanduy/beranda",
      directRedirect: true,
      icon: FileText,
      color: "#10b981",
      colorLight: "#ecfdf5",
      colorMid: "#d1fae5",
      description: "Jurnal & Roster",
    },
    {
      key: "ff_registration",
      title: "Daftar FF",
      url: "https://trees4trees-my.sharepoint.com/:x:/g/personal/rijal_ramdani_trees4trees_org/IQA3mh8I9faXToO1b0lNDZcWAfin4uheEB2uJsiv9diXqYw?rtime=i0ohY4Uh3kg",
      directRedirect: false,
      icon: UserPlus,
      color: "#3b82f6",
      colorLight: "#eff6ff",
      colorMid: "#dbeafe",
      description: "Field Facilitator",
    },
    {
      key: "payment_info",
      title: "Iuran & Rincian",
      url: "https://docs.google.com/spreadsheets/d/1VljjoL6ie4nay7o6loln9qr1GnYhJR8hVIUha8CPLbw/edit?usp=sharing",
      directRedirect: false,
      icon: DollarSign,
      color: "#ec4899",
      colorLight: "#fdf2f8",
      colorMid: "#fce7f3",
      description: "Informasi Keuangan",
    },
  ];

  const visibleButtons = buttonData.filter(btn => buttonSettings[btn.key] !== false);

  return (
    <>
      <LoadingScreen isLoading={isLoading} />

      <div className={`home-root transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>

        {/* Admin button */}
        <button
          onClick={() => setCurrentView('admin-settings')}
          className="admin-fab"
          title="Admin Settings"
        >
          <Settings className="h-5 w-5" />
        </button>

        {/* ── HERO SECTION ── */}
        <section className="hero-section">
          {/* Background blobs */}
          <div className="hero-blob hero-blob-1" />
          <div className="hero-blob hero-blob-2" />
          <div className="hero-blob hero-blob-3" />

          {/* Top status bar feel */}
          <div className="hero-topbar">
            <div className="hero-topbar-dot" />
            <span className="hero-topbar-text">Site Citanduy</span>
            <MapPin className="h-3 w-3 text-emerald-300" />
          </div>

          {/* Logo */}
          <div className="hero-logo-wrap">
            <div className="hero-logo-ring">
              <img
                src={photos.header}
                alt="Logo"
                className="hero-logo-img"
                onError={(e) => { e.currentTarget.src = 'https://i.postimg.cc/ZnWHPbw9/T4-T-Logo-Baru-2-1.jpg'; }}
              />
            </div>
            <div className="hero-logo-pulse" />
          </div>

          {/* Title */}
          <div className="hero-title-block">
            <h1 className="hero-org-name">YAYASAN BUMI HIJAU LESTARI</h1>
            <div className="hero-badge">
              <Sprout className="h-3.5 w-3.5 text-emerald-300" />
              <span>Planting Trees for Tomorrow</span>
            </div>
            <p className="hero-sub">Bersama Menanam Pohon Untuk Masa Depan Citanduy</p>
          </div>

          {/* Stats strip */}
          <div className="hero-stats">
            <div className="hero-stat-item">
              <span className="hero-stat-num">5+</span>
              <span className="hero-stat-label">Layanan</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat-item">
              <span className="hero-stat-num">T4T</span>
              <span className="hero-stat-label">Trees4Trees</span>
            </div>
            <div className="hero-stat-divider" />
            <div className="hero-stat-item">
              <span className="hero-stat-num">24/7</span>
              <span className="hero-stat-label">Online</span>
            </div>
          </div>

          {/* Wave bottom */}
          <div className="hero-wave">
            <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f0fdf4" />
            </svg>
          </div>
        </section>

        {/* ── MAIN CONTENT ── */}
        <main className="home-main">

          {/* Section header */}
          <div className="section-header">
            <div className="section-header-bar" />
            <h2 className="section-title">Menu Utama</h2>
          </div>

          {/* Menu grid */}
          <div className="menu-grid">
            {visibleButtons.map((button, index) => {
              const IconComp = button.icon;
              const handleClick = () => {
                if (button.directRedirect) {
                  window.open(button.url, '_blank');
                }
              };
              const content = (
                <div className="menu-card-inner">
                  <div className="menu-card-icon-wrap" style={{ background: button.colorMid }}>
                    <IconComp className="menu-card-icon" style={{ color: button.color }} />
                  </div>
                  <div className="menu-card-text">
                    <span className="menu-card-title">{button.title}</span>
                    <span className="menu-card-desc">{button.description}</span>
                  </div>
                  <ChevronRight className="menu-card-arrow" style={{ color: button.color }} />
                  <div className="menu-card-accent" style={{ background: button.colorMid }} />
                </div>
              );

              return button.directRedirect ? (
                <button
                  key={index}
                  onClick={handleClick}
                  className="menu-card"
                  style={{ '--card-color': button.color, '--card-light': button.colorLight } as React.CSSProperties}
                >
                  {content}
                </button>
              ) : (
                <a
                  key={index}
                  href={button.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="menu-card"
                  style={{ '--card-color': button.color, '--card-light': button.colorLight } as React.CSSProperties}
                >
                  {content}
                </a>
              );
            })}
          </div>

          {/* ── INFO CARDS ── */}
          <div className="info-section">
            {/* Roster card */}
            <div className="info-card roster-card">
              <div className="info-card-header">
                <div className="info-card-icon-wrap info-card-icon-blue">
                  <Calendar className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="info-card-title text-blue-800">Jadwal Roster</h3>
                <div className="roster-card-actions">
                  {rosterEmbedError && (
                    <button
                      className="roster-retry-btn"
                      onClick={() => { setRosterEmbedError(false); setRosterEmbedKey(k => k + 1); }}
                      title="Coba lagi"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <a
                    href="https://docs.google.com/spreadsheets/d/e/2PACX-1vROF6TC0Nmn1L_AvaseI4_51zUVA3riOLE1BoL-jFHjeiYSN4SuOikpBjsjihbv1mEJ6mocKJS4tHWX/pubhtml?gid=1845550008&single=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="roster-open-btn"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Buka</span>
                  </a>
                </div>
              </div>

              {rosterEmbedError ? (
                <div className="roster-error-state">
                  <AlertCircle className="h-8 w-8 text-blue-300 mb-3" />
                  <p className="roster-error-title">Spreadsheet tidak dapat dimuat</p>
                  <p className="roster-error-sub">Google Sheets memblokir tampilan langsung.</p>
                  <a
                    href="https://docs.google.com/spreadsheets/d/e/2PACX-1vROF6TC0Nmn1L_AvaseI4_51zUVA3riOLE1BoL-jFHjeiYSN4SuOikpBjsjihbv1mEJ6mocKJS4tHWX/pubhtml?gid=1845550008&single=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="roster-error-link"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Lihat Jadwal Roster
                  </a>
                </div>
              ) : (
                <div className="info-card-embed-wrap">
                  <iframe
                    key={rosterEmbedKey}
                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vROF6TC0Nmn1L_AvaseI4_51zUVA3riOLE1BoL-jFHjeiYSN4SuOikpBjsjihbv1mEJ6mocKJS4tHWX/pubhtml?gid=1845550008&single=true"
                    className="info-card-embed"
                    title="Jadwal Roster"
                    loading="lazy"
                    frameBorder="0"
                  />
                </div>
              )}
            </div>

            {/* Payment card */}
            <div className="info-card">
              <div className="info-card-header">
                <div className="info-card-icon-wrap info-card-icon-green">
                  <BarChart3 className="h-4 w-4 text-emerald-600" />
                </div>
                <h3 className="info-card-title text-emerald-800">Iuran & Transfer Bank</h3>
              </div>
              <div className="info-card-img-wrap">
                <img
                  src={photos.payment}
                  alt="Info Pembayaran"
                  className="info-card-img"
                  loading="lazy"
                  onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/600x300/f0fdf4/16a34a?text=Info+Pembayaran'; }}
                />
              </div>
            </div>
          </div>

          {/* Location chip */}
          <div className="location-chip">
            <MapPin className="h-4 w-4 text-emerald-500" />
            <span>Citanduy, Tasikmalaya, Jawa Barat</span>
          </div>
        </main>

        {/* Footer */}
        <footer className="home-footer">
          <div className="home-footer-inner">
            <Sprout className="h-4 w-4 text-emerald-500" />
            <span>Created M Rijal Ramdani</span>
          </div>
        </footer>
      </div>
    </>
  );
}

export default App;
