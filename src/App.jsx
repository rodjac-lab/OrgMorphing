import { useState, useEffect } from 'react';
import './App.css';
import { initializeData } from './services/dataService.js';

function App() {
  const [orgData, setOrgData] = useState(null);
  const [stats, setStats] = useState(null);

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

  return (
    <div className="app">
      <header className="app-header">
        <h1>Outil de Visualisation Organisationnelle</h1>
        <p className="subtitle">Lot 1 complété ✓ - Data Model & Mock Data</p>
      </header>

      <main className="app-main">
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

        <section className="test-section">
          <h2>🧪 Console de test</h2>
          <p>Ouvre la console JavaScript (F12) pour tester les fonctions CRUD :</p>
          <ul>
            <li><code>window.orgData</code> - Accès aux données</li>
            <li><code>import(&apos;./services/dataService.js&apos;)</code> - Services CRUD</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
