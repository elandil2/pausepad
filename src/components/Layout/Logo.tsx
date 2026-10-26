import React from 'react'

const Logo: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
    <circle cx="16" cy="18" r="11" fill="#ff7a59" stroke="#16132b" strokeWidth="1.8" />
    <path
      d="M16 7.2c-1-1.7-2.9-2.2-4.4-1.9.8.8 1.4 1.7 1.5 2.7-1.4-.3-2.8.1-3.7 1 2 .5 4.2.3 6.6-.6 2.4.9 4.6 1.1 6.6.6-.9-.9-2.3-1.3-3.7-1 .1-1 .7-1.9 1.5-2.7-1.5-.3-3.4.2-4.4 1.9z"
      fill="#58d68d"
      stroke="#16132b"
      strokeWidth="1"
    />
    <rect x="12.8" y="14.8" width="2.4" height="6.6" rx="1.2" fill="#fff" />
    <rect x="16.8" y="14.8" width="2.4" height="6.6" rx="1.2" fill="#fff" />
  </svg>
)

export default Logo
