import React from 'react';
import DeveloperCard from '../src/components/DeveloperCard';

const CardsDemo: React.FC = () => {
  const cards = [
    {
      name: 'Alice Martin',
      title: 'Software Engineer · Cloud',
      level: 'L' as const,
      tags: ['React', 'TypeScript'],
      variant: 'developer' as const,
    },
    {
      name: 'Jonas Weber',
      title: 'Engineering Manager · Mobile',
      level: 'T' as const,
      tags: ['Coaching', 'Hiring'],
      variant: 'manager' as const,
    },
    {
      name: 'Priya Nair',
      title: 'Director of Engineering',
      level: 'S' as const,
      tags: ['Strategy', 'Org Design', 'Mentoring'],
      variant: 'director' as const,
    },
  ];

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '48px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
        color: '#1f2937',
      }}
    >
      <div
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        <header>
          <p
            style={{
              fontSize: '12px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#64748b',
              marginBottom: '8px',
            }}
          >
            Demo · Lot 2
          </p>
          <h1
            style={{
              fontSize: '32px',
              fontWeight: 600,
              margin: 0,
            }}
          >
            Developer Card Variants
          </h1>
          <p
            style={{
              marginTop: '12px',
              maxWidth: '640px',
              lineHeight: 1.6,
              color: '#475569',
            }}
          >
            Preview of the reusable `DeveloperCard` component across the
            developer, manager, and director variants. Hover, focus, or click to
            inspect interactions.
          </p>
        </header>

        <section
          style={{
            display: 'grid',
            gap: '24px',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          }}
        >
          {cards.map(card => (
            <DeveloperCard
              key={card.name}
              name={card.name}
              title={card.title}
              level={card.level}
              tags={card.tags}
              variant={card.variant}
              onClick={() => {
                console.log(`Card clicked: ${card.name}`);
              }}
            />
          ))}
        </section>
      </div>
    </main>
  );
};

export default CardsDemo;
