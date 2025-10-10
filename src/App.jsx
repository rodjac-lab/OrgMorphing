import { useState, useEffect } from 'react';
import './App.css';
import { initializeData } from './services/dataService.js';
import preferencesService from './services/preferencesService.js';
import ControlsBar from './components/controls/ControlsBar.jsx';
import HierarchicalView from './components/views/HierarchicalView.jsx';
import FunctionalView from './components/views/FunctionalView.jsx';

function App() {
  const [orgData, setOrgData] = useState(null);
  const [stats, setStats] = useState(null);

  // Load preferences from LocalStorage on mount
  const initialPrefs = preferencesService.load();
  const [showSeniority, setShowSeniority] = useState(initialPrefs.showSeniority);
  const [currentView, setCurrentView] = useState(initialPrefs.currentView);
  const [zoom, setZoom] = useState(initialPrefs.zoom);

  // Zoom handlers
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 1.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));
  const handleZoomReset = () => setZoom(1);

  // Save preferences when they change
  useEffect(() => {
    preferencesService.save({
      currentView,
      showSeniority,
      zoom
    });
  }, [currentView, showSeniority, zoom]);

  // Initialize data on app load
  useEffect(() => {
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
    console.log('💾 Preferences loaded:', initialPrefs);
  }, []);

  if (!orgData || !stats) {
    return (
      <div className="app loading">
        <div className="loading-spinner">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Modern Controls Bar */}
      <ControlsBar
        currentView={currentView}
        onViewChange={setCurrentView}
        showSeniority={showSeniority}
        onSeniorityToggle={setShowSeniority}
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomReset={handleZoomReset}
        orgData={orgData}
      />

      <main className="app-main">
        {/* Hierarchical View */}
        {currentView === 'hierarchical' && (
          <HierarchicalView
            orgData={orgData}
            showSeniority={showSeniority}
            zoom={zoom}
            onZoomChange={setZoom}
            onPersonClick={(person) => {
              console.log('Person clicked:', person);
            }}
          />
        )}

        {/* Functional View */}
        {currentView === 'functional' && (
          <FunctionalView
            orgData={orgData}
            showSeniority={showSeniority}
            zoom={zoom}
            onZoomChange={setZoom}
            onPersonClick={(person) => {
              console.log('Person clicked:', person);
            }}
          />
        )}

        {/* Stats Section - Always visible at bottom */}
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

      {/* Footer */}
      <footer className="app-footer">
        <p>Lot 6 complété ✓ - Navigation & UI Controls</p>
      </footer>
    </div>
  );
}

export default App;
