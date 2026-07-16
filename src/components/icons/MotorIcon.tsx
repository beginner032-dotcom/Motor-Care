import React from 'react';

export function MotorIcon({ className = "w-6 h-6", fill = "currentColor", stroke = "currentColor", strokeWidth, ...props }: any) {
  // If fill is 'none', we must use stroke to show the outline of the motorcycle.
  // If fill is 'currentColor', we don't need a stroke.
  const actualStroke = fill === 'none' ? stroke : 'none';
  const actualStrokeWidth = fill === 'none' ? (strokeWidth || 1.5) : 0;
  
  return (
    <svg viewBox="0 0 24 24" fill={fill} stroke={actualStroke} strokeWidth={actualStrokeWidth} className={className} {...props}>
      <path d="M19,13c-1.77,0-3.26,1.2-3.73,2.83L13.12,14c-1.29-0.54-2.5-1.44-3.46-2.58L8.4,10H10V8H5v2h1.61l1.52,1.76 C6.73,13.25,5.65,15,4,15c-2.21,0-4,1.79-4,4s1.79,4,4,4c1.88,0,3.46-1.3,3.9-3.05l5.06-2.16c1.19,1.15,2.68,1.96,4.34,2.21H19 c2.21,0,4-1.79,4-4S21.21,13,19,13z M4,21c-1.1,0-2-0.9-2-2s0.9-2,2-2s2,0.9,2,2S5.1,21,4,21z M19,19c-1.1,0-2-0.9-2-2s0.9-2,2-2 s2,0.9,2,2S20.1,19,19,19z" />
    </svg>
  );
}
