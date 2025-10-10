import React, { useRef, useState } from 'react';
import { Upload } from 'lucide-react';
import styles from './ImportButton.module.css';

/**
 * ImportButton - Bouton d'import XLSX avec file picker
 *
 * @param {Object} props
 * @param {Function} props.onFileSelect - Callback appelé avec le fichier sélectionné
 * @returns {JSX.Element}
 */
function ImportButton({ onFileSelect }) {
  const fileInputRef = useRef(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      onFileSelect(file);
      // Reset input pour permettre de réimporter le même fichier
      event.target.value = '';
      setTimeout(() => setIsProcessing(false), 1000);
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <button
        className={styles.importButton}
        onClick={handleClick}
        disabled={isProcessing}
        title="Importer des données depuis un fichier Excel"
      >
        <Upload size={16} />
        <span className={styles.label}>Importer</span>
      </button>
    </>
  );
}

export default ImportButton;
