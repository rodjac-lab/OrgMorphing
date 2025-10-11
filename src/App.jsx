import { useState, useEffect, useCallback, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './App.css';
import { initializeData } from './services/dataService.js';
import { saveData } from './services/storage.js';
import preferencesService from './services/preferencesService.js';
import ControlsBar from './components/controls/ControlsBar.jsx';
import HierarchicalView from './components/views/HierarchicalView.jsx';
import FunctionalView from './components/views/FunctionalView.jsx';
import DeveloperFormModal from './components/forms/DeveloperFormModal.jsx';
import LoadingState from './components/common/LoadingState.jsx';
import ToastContainer from './components/common/ToastContainer.jsx';
import toastHelper from './utils/toastConfig.js';

function App() {
  const [orgData, setOrgData] = useState(null);
  const [stats, setStats] = useState(null);

  // Load preferences from LocalStorage on mount
  const initialPrefs = preferencesService.load();
  const [showSeniority, setShowSeniority] = useState(initialPrefs.showSeniority);
  const [currentView, setCurrentView] = useState(initialPrefs.currentView);
  const [zoom, setZoom] = useState(initialPrefs.zoom);

  // Modal state for developer form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeveloper, setEditingDeveloper] = useState(null);

  // Zoom handlers (mémoïsés pour éviter re-renders)
  const handleZoomIn = useCallback(() => setZoom(prev => Math.min(prev + 0.1, 1.5)), []);
  const handleZoomOut = useCallback(() => setZoom(prev => Math.max(prev - 0.1, 0.5)), []);
  const handleZoomReset = useCallback(() => setZoom(1), []);

  // Helper to recalculate stats (mémoïsé)
  const recalculateStats = useCallback((data) => {
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
  }, []);

  // Import handler (mémoïsé)
  const handleDataImported = useCallback((importedDevelopers) => {
    // Remplacer les développeurs par ceux importés
    const updatedData = {
      ...orgData,
      developers: [...orgData.developers.filter(d => d.isManager), ...importedDevelopers]
    };
    setOrgData(updatedData);
    recalculateStats(updatedData);
    saveData(updatedData);
    toastHelper.success(`${importedDevelopers.length} développeurs importés avec succès`);
  }, [orgData, recalculateStats]);

  // CRUD Handlers (mémoïsés)
  const handleAddDeveloper = useCallback(() => {
    setEditingDeveloper(null);
    setIsModalOpen(true);
  }, []);

  const handleEditDeveloper = useCallback((developer) => {
    // Ne permettre l'édition que des développeurs (pas des managers)
    if (!developer.isManager) {
      setEditingDeveloper(developer);
      setIsModalOpen(true);
    }
  }, []);

  const handleSaveDeveloper = useCallback((developerData) => {
    let updatedDevelopers;

    if (editingDeveloper) {
      // Mode édition - remplacer le développeur existant
      updatedDevelopers = orgData.developers.map(dev =>
        dev.id === editingDeveloper.id ? developerData : dev
      );
      toastHelper.success(`${developerData.firstName} ${developerData.lastName} modifié avec succès`);
    } else {
      // Mode création - ajouter le nouveau développeur
      updatedDevelopers = [...orgData.developers, developerData];
      toastHelper.success(`${developerData.firstName} ${developerData.lastName} ajouté avec succès`);
    }

    const updatedData = { ...orgData, developers: updatedDevelopers };
    setOrgData(updatedData);
    recalculateStats(updatedData);
    saveData(updatedData);
  }, [editingDeveloper, orgData, recalculateStats]);

  const handleDeleteDeveloper = useCallback((developerId) => {
    const developer = orgData.developers.find(dev => dev.id === developerId);
    const updatedDevelopers = orgData.developers.filter(dev => dev.id !== developerId);
    const updatedData = { ...orgData, developers: updatedDevelopers };
    setOrgData(updatedData);
    recalculateStats(updatedData);
    saveData(updatedData);
    if (developer) {
      toastHelper.success(`${developer.firstName} ${developer.lastName} supprimé`);
    }
  }, [orgData, recalculateStats]);

  // Managers filtrés (mémoïsé)
  const managers = useMemo(() =>
    orgData?.developers.filter(d => d.isManager) || []
  , [orgData]);

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
    return <LoadingState />;
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
        onDataImported={handleDataImported}
        onAddDeveloper={handleAddDeveloper}
      />

      <main className="app-main">
        {/* Les deux vues sont rendues, seul le layoutId fait le morphing */}
        {currentView === 'hierarchical' && (
          <HierarchicalView
            orgData={orgData}
            showSeniority={showSeniority}
            zoom={zoom}
            onZoomChange={setZoom}
            onPersonClick={handleEditDeveloper}
          />
        )}

        {currentView === 'functional' && (
          <FunctionalView
            orgData={orgData}
            showSeniority={showSeniority}
            zoom={zoom}
            onZoomChange={setZoom}
            onPersonClick={handleEditDeveloper}
          />
        )}

        {/* Stats Section - Always visible at bottom */}
        <motion.section
          className="stats-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        >
          <h2>📊 Statistiques</h2>
          <div className="stats-grid">
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="stat-value">{stats.totalDevelopers}</div>
              <div className="stat-label">Total personnes</div>
            </motion.div>
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="stat-value">{stats.managers}</div>
              <div className="stat-label">Managers</div>
            </motion.div>
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="stat-value">{stats.regularDevelopers}</div>
              <div className="stat-label">Développeurs</div>
            </motion.div>
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="stat-value">{stats.squads}</div>
              <div className="stat-label">Squads</div>
            </motion.div>
          </div>

          <motion.div
            className="craft-distribution"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7, ease: [0.4, 0, 0.2, 1] }}
          >
            <h3>Répartition par métier</h3>
            <ul>
              {Object.entries(stats.craftCounts).map(([craft, count], index) => (
                <motion.li
                  key={craft}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.05, ease: [0.4, 0, 0.2, 1] }}
                >
                  <strong>{craft}:</strong> {count} personnes
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>Lot 10 complété ✓ - Polish & Animations Sleek</p>
      </footer>

      {/* Developer Form Modal */}
      <DeveloperFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveDeveloper}
        onDelete={handleDeleteDeveloper}
        developer={editingDeveloper}
        managers={managers}
        squads={orgData.squads}
      />

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default App;
