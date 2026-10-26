import React from 'react'

const Logo: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <circle cx="16" cy="18" r="12" fill="#ff6b5b" />
    <path
      d="M16 6.5c-1.2-2-3.4-2.6-5.2-2.2 1 .9 1.6 2 1.8 3.2-1.6-.3-3.3.1-4.4 1.2 2.4.6 4.9.4 7.8-.7 2.9 1.1 5.4 1.3 7.8.7-1.1-1.1-2.8-1.5-4.4-1.2.2-1.2.8-2.3 1.8-3.2-1.8-.4-4 .2-5.2 2.2z"
      fill="#34d399"
    />
    <rect x="12.6" y="14.5" width="2.6" height="7.5" rx="1.3" fill="#fff" />
    <rect x="16.8" y="14.5" width="2.6" height="7.5" rx="1.3" fill="#fff" />
  </svg>
)

export default Logo
