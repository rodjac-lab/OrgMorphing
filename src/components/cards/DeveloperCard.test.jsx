/**
 * Tests pour DeveloperCard
 * 
 * Tests du composant le plus utilisé de l'application
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeveloperCard from './DeveloperCard';

describe('DeveloperCard', () => {
  const mockDeveloper = {
    id: 'dev-1',
    firstName: 'Jean',
    lastName: 'Dupont',
    craft: 'Cloud',
    seniority: 3,
    isLeadDev: false,
    isTechLead: true,
    isScrumMaster: false,
    isManager: false,
  };

  describe('Affichage de base', () => {
    it('affiche le nom complet du développeur', () => {
      render(<DeveloperCard developer={mockDeveloper} />);
      expect(screen.getByText('Jean Dupont')).toBeInTheDocument();
    });

    it('affiche le métier', () => {
      render(<DeveloperCard developer={mockDeveloper} />);
      expect(screen.getByText('Cloud')).toBeInTheDocument();
    });

    it('affiche les initiales dans l\'avatar', () => {
      render(<DeveloperCard developer={mockDeveloper} />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('affiche le titre "Manager Cloud" pour un manager', () => {
      const manager = { ...mockDeveloper, isManager: true };
      render(<DeveloperCard developer={manager} />);
      expect(screen.getByText('Manager Cloud')).toBeInTheDocument();
    });
  });

  describe('Badges de rôles', () => {
    it('affiche le badge Tech Lead quand isTechLead est true', () => {
      render(<DeveloperCard developer={mockDeveloper} />);
      const badge = screen.getByText('T');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveAttribute('title', 'Tech Lead');
    });

    it('affiche le badge Lead Dev quand isLeadDev est true', () => {
      const dev = { ...mockDeveloper, isLeadDev: true, isTechLead: false };
      render(<DeveloperCard developer={dev} />);
      const badge = screen.getByText('L');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveAttribute('title', 'Lead Dev');
    });

    it('affiche le badge Scrum Master quand isScrumMaster est true', () => {
      const dev = { ...mockDeveloper, isScrumMaster: true, isTechLead: false };
      render(<DeveloperCard developer={dev} />);
      const badge = screen.getByText('S');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveAttribute('title', 'Scrum Master');
    });

    it('affiche plusieurs badges simultanément', () => {
      const dev = {
        ...mockDeveloper,
        isLeadDev: true,
        isTechLead: true,
        isScrumMaster: true,
      };
      render(<DeveloperCard developer={dev} />);
      expect(screen.getByText('L')).toBeInTheDocument();
      expect(screen.getByText('T')).toBeInTheDocument();
      expect(screen.getByText('S')).toBeInTheDocument();
    });

    it('n\'affiche pas de badges si aucun rôle', () => {
      const dev = {
        ...mockDeveloper,
        isLeadDev: false,
        isTechLead: false,
        isScrumMaster: false,
      };
      render(<DeveloperCard developer={dev} />);
      expect(screen.queryByText('L')).not.toBeInTheDocument();
      expect(screen.queryByText('T')).not.toBeInTheDocument();
      expect(screen.queryByText('S')).not.toBeInTheDocument();
    });
  });

  describe('Badge de séniorité', () => {
    it('affiche la séniorité quand showSeniority est true', () => {
      render(<DeveloperCard developer={mockDeveloper} showSeniority={true} />);
      expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('n\'affiche pas la séniorité quand showSeniority est false', () => {
      render(<DeveloperCard developer={mockDeveloper} showSeniority={false} />);
      // Le "3" ne devrait pas être présent comme badge
      const badges = screen.queryByText('3');
      expect(badges).not.toBeInTheDocument();
    });
  });

  describe('Tags', () => {
    it('affiche les tags fournis', () => {
      const tags = ['React', 'TypeScript', 'AWS'];
      render(<DeveloperCard developer={mockDeveloper} tags={tags} />);
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('AWS')).toBeInTheDocument();
    });

    it('n\'affiche pas de section tags si le tableau est vide', () => {
      const { container } = render(
        <DeveloperCard developer={mockDeveloper} tags={[]} />
      );
      const tagContainers = container.querySelectorAll('[style*="flexWrap"]');
      // Vérifier qu'il n'y a pas de container de tags vide
      expect(tagContainers.length).toBe(0);
    });
  });

  describe('Interactivité', () => {
    it('appelle onClick quand la carte est cliquée', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<DeveloperCard developer={mockDeveloper} onClick={handleClick} />);
      
      const card = screen.getByRole('button');
      await user.click(card);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('appelle onClick quand Enter est pressé', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<DeveloperCard developer={mockDeveloper} onClick={handleClick} />);
      
      const card = screen.getByRole('button');
      card.focus();
      await user.keyboard('{Enter}');
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('appelle onClick quand Space est pressé', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<DeveloperCard developer={mockDeveloper} onClick={handleClick} />);
      
      const card = screen.getByRole('button');
      card.focus();
      await user.keyboard(' ');
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('a le role "button" quand onClick est fourni', () => {
      render(<DeveloperCard developer={mockDeveloper} onClick={() => {}} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('a le role "group" quand onClick n\'est pas fourni', () => {
      render(<DeveloperCard developer={mockDeveloper} />);
      expect(screen.getByRole('group')).toBeInTheDocument();
    });

    it('est focusable quand interactive', () => {
      render(<DeveloperCard developer={mockDeveloper} onClick={() => {}} />);
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('tabIndex', '0');
    });
  });

  describe('Accessibilité', () => {
    it('a un aria-label descriptif quand interactive', () => {
      render(<DeveloperCard developer={mockDeveloper} onClick={() => {}} />);
      const card = screen.getByRole('button');
      expect(card).toHaveAttribute('aria-label', 'Jean Dupont, Cloud');
    });

    it('les badges ont des aria-label appropriés', () => {
      render(<DeveloperCard developer={mockDeveloper} />);
      const badge = screen.getByText('T');
      expect(badge).toHaveAttribute('aria-label', 'Tech Lead badge');
    });

    it('le badge de séniorité a un aria-label', () => {
      render(<DeveloperCard developer={mockDeveloper} showSeniority={true} />);
      const badge = screen.getByText('3');
      expect(badge).toHaveAttribute('aria-label', 'Seniority level 3');
    });
  });

  describe('Avatar', () => {
    it('affiche une image si avatarUrl est fourni', () => {
      const avatarUrl = 'https://example.com/avatar.jpg';
      render(<DeveloperCard developer={mockDeveloper} avatarUrl={avatarUrl} />);
      
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', avatarUrl);
      expect(img).toHaveAttribute('alt', 'Jean Dupont avatar');
    });

    it('affiche les initiales si avatarUrl n\'est pas fourni', () => {
      render(<DeveloperCard developer={mockDeveloper} />);
      expect(screen.getByText('JD')).toBeInTheDocument();
    });
  });

  describe('Cas limites', () => {
    it('gère les noms vides ou undefined', () => {
      const dev = {
        ...mockDeveloper,
        firstName: '',
        lastName: '',
      };
      render(<DeveloperCard developer={dev} />);
      // Ne devrait pas crasher
      expect(screen.getByText('Cloud')).toBeInTheDocument();
    });

    it('gère les crafts avec caractères spéciaux', () => {
      const dev = {
        ...mockDeveloper,
        craft: 'Test auto',
      };
      render(<DeveloperCard developer={dev} />);
      expect(screen.getByText('Test auto')).toBeInTheDocument();
    });
  });
});
