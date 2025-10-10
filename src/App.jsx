import { useState, useEffect } from 'react';
import './App.css';
import { initializeData } from './services/dataService.js';
import DeveloperCard from './components/cards/DeveloperCard.jsx';
import ManagerCard from './components/cards/ManagerCard.jsx';
import DirectorCard from './components/cards/DirectorCard.jsx';
import HierarchicalView from './components/views/HierarchicalView.jsx';
import FunctionalView from './components/views/FunctionalView.jsx';
import ZoomControls from './components/common/ZoomControls.jsx';

function App() {
  const [orgData, setOrgData] = useState(null);
  const [stats, setStats] = useState(null);
  const [showSeniority, setShowSeniority] = useState(false);
  const [currentView, setCurrentView] = useState('cards'); // 'cards', 'hierarchical', or 'functional'
  const [zoom, setZoom] = useState(1); // Shared zoom state for views

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleZoomReset = () => setZoom(1);

  useEffect(() => {
    // Initialize data on app load
    const data = initializeData();
    setOrgData(data);

    // Calculate stats
    const managers = data.developers.filter(d => d.isManager);
    const regularDevs = data.developers.filter(d => !d.isManager);
    const craftCounts = {};

    data.developers.forEach(dev => {
      craftCounts[dev.craft] = (craftCounts[dev.craft] || 0) + 1;
    });

    setStats({
      totalDevelopers: data.developers.length,
      managers: managers.length,
      regularDevelopers: regularDevs.length,
      squads: data.squads.length,
      craftCounts
    });

    // Make data available in console for testing
    window.orgData = data;
    console.log('🎯 Organization data loaded and available as window.orgData');
    console.log('📊 Stats:', {
      'Total people': data.developers.length,
      'Managers': managers.length,
      'Regular developers': regularDevs.length,
      'Squads': data.squads.length,
      'Crafts': craftCounts
    });
  }, []);

  if (!orgData || !stats) {
    return <div className="app">Loading...</div>;
  }

  // Get sample developers for demo
  const sampleDevs = orgData.developers.filter(d => !d.isManager).slice(0, 8);
  const sampleManagers = orgData.developers.filter(d => d.isManager).slice(0, 3);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Outil de Visualisation Organisationnelle</h1>
        <p className="subtitle">Lot 5 complété ✓ - Morphing Animation</p>
      </header>

      <main className="app-main">
        {/* View Toggle */}
        <section className="view-toggle-section">
          <button
            className={`view-toggle-btn ${currentView === 'cards' ? 'active' : ''}`}
            onClick={() => setCurrentView('cards')}
          >
            Démo Cartes
          </button>
          <button
            className={`view-toggle-btn ${currentView === 'hierarchical' ? 'active' : ''}`}
            onClick={() => setCurrentView('hierarchical')}
          >
            Vue Hiérarchique
          </button>
          <button
            className={`view-toggle-btn ${currentView === 'functional' ? 'active' : ''}`}
            onClick={() => setCurrentView('functional')}
          >
            Vue Fonctionnelle
          </button>
        </section>

        {/* Hierarchical View */}
        {currentView === 'hierarchical' && (
          <section className="hierarchical-section">
            <div className="section-header">
              <h2>🏢 Organisation Hiérarchique</h2>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <ZoomControls
                  zoom={zoom}
                  onZoomIn={handleZoomIn}
                  onZoomOut={handleZoomOut}
                  onZoomReset={handleZoomReset}
                />
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={showSeniority}
                    onChange={(e) => setShowSeniority(e.target.checked)}
                  />
                  <span>Afficher la séniorité</span>
                </label>
              </div>
            </div>
            <HierarchicalView
              orgData={orgData}
              showSeniority={showSeniority}
              zoom={zoom}
              onZoomChange={setZoom}
              onPersonClick={(person) => {
                console.log('Person clicked:', person);
              }}
            />
          </section>
        )}

        {/* Functional View */}
        {currentView === 'functional' && (
          <section className="functional-section">
            <div className="section-header">
              <h2>🎯 Organisation Fonctionnelle (Squads)</h2>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <ZoomControls
                  zoom={zoom}
                  onZoomIn={handleZoomIn}
                  onZoomOut={handleZoomOut}
                  onZoomReset={handleZoomReset}
                />
                <label className="toggle-label">
                  <input
                    type="checkbox"
                    checked={showSeniority}
                    onChange={(e) => setShowSeniority(e.target.checked)}
                  />
                  <span>Afficher la séniorité</span>
                </label>
              </div>
            </div>
            <FunctionalView
              orgData={orgData}
              showSeniority={showSeniority}
              zoom={zoom}
              onZoomChange={setZoom}
              onPersonClick={(person) => {
                console.log('Person clicked:', person);
              }}
            />
          </section>
        )}

        {/* Card Demo Section */}
        {currentView === 'cards' && (
          <section className="demo-section">
          <div className="demo-header">
            <h2>🎨 Démonstration des Cartes</h2>
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={showSeniority}
                onChange={(e) => setShowSeniority(e.target.checked)}
              />
              <span>Afficher la séniorité</span>
            </label>
          </div>

          {/* Director Card */}
          <div className="card-group">
            <h3>Directeur</h3>
            <div className="card-showcase">
              <DirectorCard director={orgData.director} />
            </div>
          </div>

          {/* Manager Cards */}
          <div className="card-group">
            <h3>Managers (nom coloré selon métier)</h3>
            <div className="card-showcase">
              {sampleManagers.map(manager => (
                <ManagerCard
                  key={manager.id}
                  manager={manager}
                  showSeniority={showSeniority}
                />
              ))}
            </div>
          </div>

          {/* Developer Cards - Various combinations */}
          <div className="card-group">
            <h3>Développeurs (multiples rôles)</h3>
            <div className="card-showcase">
              {sampleDevs.slice(0, 6).map(dev => (
                <DeveloperCard
                  key={dev.id}
                  developer={dev}
                  showSeniority={showSeniority}
                />
              ))}
            </div>
          </div>

          {/* Developer Cards with Tags */}
          <div className="card-group">
            <h3>Développeurs avec tags (langages, compétences)</h3>
            <div className="card-showcase">
              <DeveloperCard
                developer={sampleDevs[0]}
                showSeniority={showSeniority}
                tags={['React', 'TypeScript']}
              />
              <DeveloperCard
                developer={sampleDevs[1]}
                showSeniority={showSeniority}
                tags={['Coaching', 'Hiring']}
              />
              <DeveloperCard
                developer={sampleDevs[2]}
                showSeniority={showSeniority}
                tags={['Strategy', 'Org Design', 'Mentoring']}
              />
            </div>
          </div>
        </section>
        )}

        {/* Stats Section */}
        <section className="stats-section">
          <h2>📊 Statistiques</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-value">{stats.totalDevelopers}</div>
              <div className="stat-label">Total personnes</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.managers}</div>
              <div className="stat-label">Managers</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.regularDevelopers}</div>
              <div className="stat-label">Développeurs</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">{stats.squads}</div>
              <div className="stat-label">Squads</div>
            </div>
          </div>

          <div className="craft-distribution">
            <h3>Répartition par métier</h3>
            <ul>
              {Object.entries(stats.craftCounts).map(([craft, count]) => (
                <li key={craft}>
                  <strong>{craft}:</strong> {count} personnes
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
