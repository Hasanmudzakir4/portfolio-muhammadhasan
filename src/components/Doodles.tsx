import React from 'react';

export function WavyUnderlineRed({ className = 'w-11 h-2' }: { className?: string }) {
  return (
    <svg viewBox="0 0 54 10" fill="none" className={className} aria-hidden="true">
      <path
        d="M2 6.5C5.5 2 9 2 12.5 6.5C16 11 19.5 11 23 6.5C26.5 2 30 2 33.5 6.5C37 11 40.5 11 44 6.5C47.5 2 50.5 3 52 5.5"
        stroke="#F59E0B"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FourPointStar({
  color = '#3B82F6',
  size = 20,
  outline = false,
  className = '',
}: {
  color?: string;
  size?: number;
  outline?: boolean;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M14 1.5C15.1 9.4 18.6 12.9 26.5 14C18.6 15.1 15.1 18.6 14 26.5C12.9 18.6 9.4 15.1 1.5 14C9.4 12.9 12.9 9.4 14 1.5Z"
        fill={outline ? 'none' : color}
        stroke={outline ? color : 'none'}
        strokeWidth={outline ? '1.8' : '0'}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PlusSparkle({
  color = '#10B981',
  size = 18,
  className = '',
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path
        d="M10 2.5V17.5M2.5 10H17.5"
        stroke={color}
        strokeWidth="2.3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CurvedLoopArrowLeft({ className = 'w-12 h-14' }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 68" fill="none" className={className} aria-hidden="true">
      <path
        d="M42 58C26 60 15 49 21 39C25 32 35 35 33 43C31 50 18 50 11 39C5 29 9 14 26 8"
        stroke="#64748B"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M19 5L27.5 7.5L22.5 15"
        stroke="#64748B"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SunburstYellow({ className = 'w-20 h-20' }: { className?: string }) {
  return (
    <svg viewBox="0 0 88 88" fill="none" className={className} aria-hidden="true">
      <path
        d="M44 7V31M44 57V81M7 44H31M57 44H81M17 17L34 34M54 54L71 71M71 17L54 34M34 54L17 71"
        stroke="#F59E0B"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx="44" cy="44" r="4.5" fill="#F59E0B" />
    </svg>
  );
}

export function AsteriskStar({
  color = '#10B981',
  className = 'w-12 h-12',
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 56 56" fill="none" className={className} aria-hidden="true">
      <path
        d="M28 4V52M4 28H52M11 11L45 45M45 11L11 45"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="28" cy="4" r="1.6" fill={color} />
      <circle cx="28" cy="52" r="1.6" fill={color} />
      <circle cx="4" cy="28" r="1.6" fill={color} />
      <circle cx="52" cy="28" r="1.6" fill={color} />
    </svg>
  );
}

export function GreenSmileySticker({ className = 'w-12 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 56" fill="none" className={className} aria-hidden="true">
      <circle cx="28" cy="28" r="26" fill="#10B981" />
      <path
        d="M22 19V24M33 19V24"
        stroke="#0B0F14"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M17.5 29.5C19.5 37.5 36.5 37.5 38.5 29.5"
        stroke="#0B0F14"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M15.8 29.8L19.2 28.4M36.8 28.4L40.2 29.8"
        stroke="#0B0F14"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ThreeBurstTicks({
  color = '#64748B',
  className = 'w-12 h-9',
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 58 42" fill="none" className={className} aria-hidden="true">
      <path
        d="M8 25L12 5M26 29L36 11M40 37L55 27"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CoralCurlySpring({
  color = '#F59E0B',
  className = 'w-12 h-24',
}: {
  color?: string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 54 106" fill="none" className={className} aria-hidden="true">
      <path
        d="M10 6C30 9 43 23 34 34C27 42 15 37 19 29C23 21 43 26 45 45C47 62 30 72 22 64C16 58 26 49 36 58C46 67 43 88 22 100"
        stroke={color}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BlueDoubleUnderline({ className = 'w-28 h-3' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 14" fill="none" className={className} aria-hidden="true">
      <path
        d="M3 6.5C36 3.5 82 3 117 5.5"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M18 11C48 9 78 8.8 104 10.5"
        stroke="#3B82F6"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LavenderBrushQuote({ className = '' }: { className?: string }) {
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 250 156"
        fill="none"
        className="w-[220px] sm:w-[244px] h-auto drop-shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
        aria-hidden="true"
      >
        <path
          d="M24 44C68 27 148 14 202 10C214 9 219 18 208 24C196 31 226 29 231 38C236 47 214 55 224 62C236 70 227 83 209 89C224 94 238 103 231 114C223 125 148 142 84 149C69 151 64 142 74 136C55 139 42 132 49 122C34 121 28 110 41 101C24 98 19 86 33 77C17 72 11 50 24 44Z"
          fill="#1E293B"
        />
        <path
          d="M36 32C88 18 154 9 198 6"
          stroke="#334155"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center -rotate-[6deg] font-hand font-bold text-[#E5E7EB] text-[27px] sm:text-[30px] leading-[1.02] tracking-wide">
        <span className="text-[#3B82F6]">Code.</span>
        <span className="ml-2 text-[#E5E7EB]">Create.</span>
        <span className="ml-3 text-[#F59E0B]">Elevate.</span>
      </div>
    </div>
  );
}

export function CloudSquiggle({ className = 'w-10 h-6' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 26" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 18C4 10 14 7 18 14C21 7 32 7 34 15C38 12 44 15 44 21"
        stroke="#64748B"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BlueHorizontalSpring({ className = 'w-28 h-7' }: { className?: string }) {
  return (
    <svg viewBox="0 0 132 32" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 18C12 6 26 6 28 18C29 25 21 27 19 20C17 12 35 6 49 18C55 24 48 28 45 21C42 13 62 6 77 18C83 24 76 28 73 21C70 13 94 7 110 21C116 26 124 22 128 14"
        stroke="#3B82F6"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function GreenHighlighterSwoosh({ className = 'w-56 h-3.5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 16" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 11C68 5.5 158 5 235 10.5"
        stroke="#3B82F6"
        strokeOpacity="0.75"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CoffeeMugDoodle({ className = 'w-12 h-14' }: { className?: string }) {
  return (
    <svg viewBox="0 0 58 64" fill="none" className={className} aria-hidden="true">
      {/* Steam lines */}
      <path
        d="M18 16C16 11 20 8 18 3M26 15C24 10 28 7 26 2M34 16C32 11 36 8 34 3"
        stroke="#64748B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Mug body */}
      <path
        d="M10 23H42V46C42 53 36 58 26 58C16 58 10 53 10 46V23Z"
        fill="#161F2C"
        stroke="#334155"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Rim ellipse */}
      <ellipse cx="26" cy="23" rx="16" ry="3.2" fill="#1E293B" stroke="#334155" strokeWidth="1.6" />
      {/* Handle */}
      <path
        d="M42 29H46.5C50.5 29 53 32 53 36.5C53 41 50.5 44 46.5 44H42"
        stroke="#334155"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Heart */}
      <path
        d="M26 45.5C26 45.5 19.5 41 19.5 36.8C19.5 34.6 21.3 33 23.3 33C24.6 33 25.5 33.7 26 34.6C26.5 33.7 27.4 33 28.7 33C30.7 33 32.5 34.6 32.5 36.8C32.5 41 26 45.5 26 45.5Z"
        fill="#F59E0B"
      />
    </svg>
  );
}

export function GraduationCapDoodle({ className = 'w-16 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 76 54" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 20L38 7L70 20L38 33L6 20Z"
        fill="#161F2C"
        stroke="#334155"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M19 26V38C19 43 27.5 47 38 47C48.5 47 57 43 57 38V26"
        fill="#161F2C"
        stroke="#334155"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M66 22V39M66 39L63.5 45M66 39L68.5 45"
        stroke="#64748B"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function FooterLoopArrow({ className = 'w-16 h-12' }: { className?: string }) {
  return (
    <svg viewBox="0 0 78 54" fill="none" className={className} aria-hidden="true">
      <path
        d="M6 42C20 49 38 43 39 31C40 23 30 21 28 28C26 36 42 40 55 31C63 25 68 17 72 9"
        stroke="#64748B"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M64 11L72.5 8L74 17"
        stroke="#64748B"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
