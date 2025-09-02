import React, { useEffect, useState } from 'react';

const COOKIE_KEY = 'cookie_consent_accepted';

const CookieConsent: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    setVisible(!consent);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'true');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        zIndex: 1000,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          background: 'rgba(255,255,255,0.95)',
          color: '#222',
          boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
          borderRadius: 16,
          padding: '20px 32px',
          maxWidth: 420,
          width: '90%',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          pointerEvents: 'auto',
          animation: 'fadeInUp 0.6s cubic-bezier(.4,0,.2,1)',
        }}
      >
        <span style={{ fontSize: 28, marginRight: 8, color: '#0070f3' }}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="12" fill="#0070f3" />
            <path
              d="M8.5 13.5C8.5 15.1569 9.84315 16.5 11.5 16.5C13.1569 16.5 14.5 15.1569 14.5 13.5C14.5 11.8431 13.1569 10.5 11.5 10.5C9.84315 10.5 8.5 11.8431 8.5 13.5Z"
              fill="white"
            />
            <path
              d="M11.5 7.5C11.5 8.05228 11.9477 8.5 12.5 8.5C13.0523 8.5 13.5 8.05228 13.5 7.5C13.5 6.94772 13.0523 6.5 12.5 6.5C11.9477 6.5 11.5 6.94772 11.5 7.5Z"
              fill="white"
            />
          </svg>
        </span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>
            Kami menggunakan cookies
          </div>
          <div style={{ fontSize: 14, color: '#444' }}>
            Website ini menggunakan cookies untuk meningkatkan pengalaman Anda. Dengan melanjutkan,
            Anda menyetujui penggunaan cookies sesuai kebijakan privasi kami.
          </div>
        </div>
        <button
          onClick={handleAccept}
          style={{
            background: 'linear-gradient(90deg,#0070f3,#0059c9)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '10px 20px',
            fontWeight: 600,
            fontSize: 15,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: 'background 0.2s',
          }}
        >
          Saya Setuju
        </button>
        <style>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default CookieConsent;
