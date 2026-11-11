import React from 'react';
import { ProjectItem } from '../data/portfolioData';

export function ProjectMockup({ type }: { type: ProjectItem['mockupType'] }) {
  switch (type) {
    case 'taskly':
      return <TasklyMockup />;
    case 'shopease':
      return <ShopEaseMockup />;
    case 'fintrack':
      return <FinTrackMockup />;
    case 'wanderly':
      return <WanderlyMockup />;
    case 'devpulse':
      return <DevPulseMockup />;
    case 'mediflow':
      return <MediFlowMockup />;
  }
}

function TasklyMockup() {
  return (
    <div className="relative w-full h-full pt-4 px-3.5 overflow-hidden select-none" aria-hidden="true">
      {/* Desktop App Window */}
      <div className="w-[84%] h-[132px] bg-white rounded-t-lg shadow-[0_6px_18px_rgba(0,0,0,0.08)] border border-black/[0.06] p-2 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-md bg-[#2A3FE8] inline-block" />
            <span className="w-8 h-1.5 rounded bg-slate-700" />
          </div>
          <div className="flex items-center gap-1">
            <span className="w-10 h-1.5 rounded bg-slate-200" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#2A3FE8]" />
          </div>
        </div>
        {/* Body: Sidebar + Task table */}
        <div className="flex gap-2 pt-1.5 flex-1">
          <div className="w-11 border-r border-slate-100 pr-1.5 space-y-1.5">
            {[
              'bg-indigo-500',
              'bg-blue-500',
              'bg-slate-400',
              'bg-purple-500',
              'bg-rose-500',
              'bg-emerald-500',
            ].map((dot, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                <span className="h-1 flex-1 rounded bg-slate-200" />
              </div>
            ))}
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="w-8 h-1.5 rounded bg-slate-600" />
              <span className="w-6 h-1.5 rounded bg-indigo-200" />
              <span className="w-5 h-1.5 rounded bg-slate-200" />
            </div>
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="flex items-center justify-between py-0.5 border-b border-slate-50">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-[2px] border border-slate-300" />
                  <span className="w-9 h-1 rounded bg-slate-300" />
                </div>
                <span
                  className={`w-6 h-1.5 rounded-full ${
                    row % 2 === 0 ? 'bg-indigo-100' : 'bg-emerald-100'
                  }`}
                />
                <span className="w-4 h-1 rounded bg-slate-200" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Overlapping Mobile Frame on bottom-right */}
      <div className="absolute right-3 bottom-0 w-[68px] h-[106px] bg-white rounded-t-xl shadow-[0_8px_20px_rgba(0,0,0,0.14)] border-[1.5px] border-slate-200 p-1.5 flex flex-col justify-between">
        <div>
          <div className="w-5 h-0.5 rounded-full bg-slate-300 mx-auto mb-1.5" />
          <div className="flex items-center justify-between mb-1.5">
            <span className="w-6 h-1.5 rounded bg-slate-700" />
            <span className="w-2 h-2 rounded-full bg-slate-300" />
          </div>
          <div className="space-y-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="w-6 h-1 rounded bg-slate-200" />
                </div>
                <span className="w-3 h-1 rounded bg-emerald-200" />
              </div>
            ))}
          </div>
        </div>
        {/* Small blue character card + bottom nav */}
        <div className="flex items-end justify-between mt-1">
          <span className="w-4 h-1 rounded bg-slate-200" />
          <div className="w-6 h-6 rounded-full bg-[#2447E6] opacity-90" />
        </div>
        <div className="h-2.5 rounded-md bg-[#1D44E5] w-full mt-0.5" />
      </div>
    </div>
  );
}

function ShopEaseMockup() {
  return (
    <div className="relative w-full h-full pt-4 px-3.5 overflow-hidden select-none" aria-hidden="true">
      <div className="w-full h-[132px] bg-white rounded-t-lg shadow-[0_6px_18px_rgba(0,0,0,0.08)] border border-black/[0.06] flex overflow-hidden">
        {/* Left warm orange & dark promo sidebar */}
        <div className="w-[24%] flex flex-col">
          <div className="bg-[#F29B62] p-1.5 flex-1 flex flex-col justify-between text-white">
            <div className="w-6 h-1.5 rounded bg-white/80" />
            <div className="space-y-1">
              <div className="w-7 h-1 rounded bg-white/60" />
              <div className="w-5 h-1 rounded bg-white/60" />
            </div>
            <div className="w-6 h-1.5 rounded bg-white/90" />
          </div>
          <div className="bg-[#182238] h-[52px] p-1.5 flex flex-col justify-between">
            <span className="w-5 h-1 rounded bg-blue-300/70" />
            <div className="w-full h-4 rounded bg-gradient-to-r from-blue-600 to-indigo-500" />
            <div className="flex gap-0.5">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span className="w-2 h-2 rounded-full bg-amber-300" />
            </div>
          </div>
        </div>

        {/* Main Storefront Grid */}
        <div className="flex-1 p-2 flex flex-col justify-between relative">
          <div className="flex items-center justify-between pb-1 border-b border-rose-50">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span className="w-7 h-1.5 rounded bg-slate-700" />
            </div>
            <div className="flex items-center gap-1">
              <span className="w-8 h-1.5 rounded bg-rose-100" />
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-1.5 pt-1">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="bg-slate-50 rounded p-1 flex flex-col items-center justify-center gap-1 border border-slate-100/80"
              >
                <div className="w-2.5 h-4 rounded-full bg-slate-800 shadow-inner" />
                <div className="w-5 h-0.5 rounded bg-slate-300" />
              </div>
            ))}
          </div>

          {/* Bottom red floating checkout badge */}
          <div className="absolute right-1.5 bottom-1.5 w-6 h-6 rounded-md bg-[#EE3342] flex items-center justify-center shadow-sm">
            <span className="w-2 h-2 rounded-full border border-white" />
          </div>
        </div>
      </div>
    </div>
  );
}

function FinTrackMockup() {
  return (
    <div className="relative w-full h-full pt-4 px-3.5 overflow-hidden select-none" aria-hidden="true">
      {/* Desktop Analytics Window */}
      <div className="w-[84%] h-[132px] bg-white rounded-t-lg shadow-[0_6px_18px_rgba(0,0,0,0.08)] border border-black/[0.06] p-2 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-1 border-b border-slate-100">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded bg-[#1D44E5]" />
            <span className="w-8 h-1.5 rounded bg-slate-700" />
          </div>
          <span className="w-3 h-2 rounded-full bg-[#1D44E5]" />
        </div>

        {/* Middle chart row */}
        <div className="flex items-center gap-2 py-1">
          <div className="flex-1 flex items-center justify-between bg-slate-50 rounded p-1.5">
            <div className="space-y-1">
              <div className="w-6 h-1.5 rounded bg-slate-700" />
              <div className="w-8 h-1 rounded bg-slate-300" />
            </div>
            <div className="w-7 h-7 rounded-full border-[3px] border-indigo-400 border-t-amber-300" />
          </div>
          <div className="w-12 h-10 rounded bg-slate-50 p-1 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
          </div>
        </div>

        {/* Deep blue summary card */}
        <div className="h-[38px] rounded-md bg-[#234CE8] p-1.5 flex items-center justify-between text-white">
          <div className="space-y-1">
            <div className="w-8 h-1 rounded bg-white/80" />
            <div className="w-11 h-1.5 rounded bg-white" />
          </div>
          <div className="space-y-1">
            <div className="w-6 h-1 rounded bg-white/60" />
            <div className="w-6 h-1 rounded bg-white/60" />
          </div>
        </div>
      </div>

      {/* Overlapping Mobile Frame on bottom-right */}
      <div className="absolute right-3 bottom-0 w-[76px] h-[104px] bg-white rounded-t-xl shadow-[0_8px_20px_rgba(0,0,0,0.14)] border-[1.5px] border-slate-200 p-1.5 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="w-7 h-1 rounded bg-slate-600" />
          <span className="w-2 h-2 rounded-full bg-[#234CE8]" />
        </div>
        {/* Scenic blue coastal banner */}
        <div className="h-9 rounded-md bg-gradient-to-b from-sky-200 via-blue-500 to-indigo-800 relative overflow-hidden">
          <div className="absolute bottom-1 left-2 w-5 h-2.5 rounded-t bg-amber-200/90" />
        </div>
        <div className="space-y-1">
          <div className="w-8 h-1 rounded bg-indigo-500" />
          <div className="w-10 h-1 rounded bg-slate-200" />
          <div className="w-9 h-1 rounded bg-slate-200" />
        </div>
        <div className="flex justify-between items-center pt-0.5">
          <span className="w-4 h-1.5 rounded bg-[#234CE8]" />
          <span className="w-5 h-1.5 rounded bg-indigo-400" />
        </div>
      </div>
    </div>
  );
}

function WanderlyMockup() {
  return (
    <div className="relative w-full h-full pt-4 px-3.5 overflow-hidden select-none" aria-hidden="true">
      {/* Desktop Travel Portal Window */}
      <div className="w-[88%] ml-auto h-[132px] bg-white rounded-t-lg shadow-[0_6px_18px_rgba(0,0,0,0.08)] border border-black/[0.06] p-2 flex flex-col justify-between">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#364AE8]" />
            <span className="w-8 h-1.5 rounded bg-slate-700" />
          </div>
          <span className="w-7 h-2 rounded-full bg-purple-200" />
        </div>

        {/* Dramatic Island Seascape Hero */}
        <div className="h-[58px] rounded-md bg-gradient-to-b from-sky-300 via-sky-500 to-[#0C3B87] relative overflow-hidden">
          {/* Mountain peak silhouette */}
          <svg viewBox="0 0 160 60" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <path d="M0 44 L36 32 L58 44 Z" fill="#BCA88E" />
            <path d="M48 44 L76 14 L106 44 Z" fill="#5B4B49" />
            <path d="M76 14 L92 44 L66 44 Z" fill="#8C7365" />
            <rect x="0" y="42" width="160" height="20" fill="#0E479E" />
            <ellipse cx="96" cy="48" rx="12" ry="2.2" fill="#D5B895" />
          </svg>
        </div>

        {/* Bottom destination info strip */}
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          <div className="space-y-1">
            <div className="w-7 h-1 rounded bg-slate-400" />
            <div className="w-9 h-1 rounded bg-slate-200" />
          </div>
          <div className="space-y-1">
            <div className="w-8 h-1 rounded bg-slate-500" />
            <div className="w-10 h-1 rounded bg-indigo-200" />
          </div>
          <div className="space-y-1">
            <div className="w-6 h-1 rounded bg-slate-500" />
            <div className="w-9 h-1 rounded bg-slate-200" />
          </div>
        </div>
      </div>

      {/* Overlapping Mobile Frame on bottom-left */}
      <div className="absolute left-3 bottom-0 w-[62px] h-[96px] bg-white rounded-t-xl shadow-[0_8px_20px_rgba(0,0,0,0.14)] border-[1.5px] border-slate-200 p-1.5 flex flex-col justify-between">
        <div className="w-5 h-0.5 rounded-full bg-slate-300 mx-auto" />
        <div className="space-y-1.5">
          {[
            'bg-sky-400',
            'bg-amber-500',
            'bg-indigo-400',
            'bg-emerald-400',
            'bg-purple-400',
          ].map((tone, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                <span className="w-5 h-1 rounded bg-slate-300" />
              </div>
              <span className={`w-3 h-2 rounded-[2px] ${tone}`} />
            </div>
          ))}
        </div>
        <div className="h-1.5 rounded bg-indigo-100 w-full" />
      </div>
    </div>
  );
}

function DevPulseMockup() {
  return (
    <div className="relative w-full h-full pt-4 px-3.5 overflow-hidden select-none" aria-hidden="true">
      <div className="w-full h-[132px] bg-white rounded-t-lg shadow-[0_6px_18px_rgba(0,0,0,0.08)] border border-black/[0.06] p-2.5 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="w-12 h-1.5 rounded bg-slate-800" />
          </div>
          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-[7px] font-bold text-emerald-800">
            99.98%
          </span>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((bar) => (
            <div key={bar} className="space-y-1">
              <div className="flex justify-between">
                <span className="w-10 h-1 rounded bg-slate-400" />
                <span className="w-5 h-1 rounded bg-emerald-400" />
              </div>
              <div className="flex gap-0.5">
                {Array.from({ length: 18 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-2.5 flex-1 rounded-[1px] ${
                      i === 11 && bar === 2 ? 'bg-amber-400' : 'bg-emerald-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MediFlowMockup() {
  return (
    <div className="relative w-full h-full pt-4 px-3.5 overflow-hidden select-none" aria-hidden="true">
      <div className="w-full h-[132px] bg-white rounded-t-lg shadow-[0_6px_18px_rgba(0,0,0,0.08)] border border-black/[0.06] p-2.5 flex flex-col justify-between">
        <div className="flex items-center justify-between border-b border-amber-100 pb-1.5">
          <span className="w-10 h-1.5 rounded bg-slate-700" />
          <span className="w-6 h-2 rounded-full bg-amber-300" />
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          <div className="rounded-md bg-amber-50 p-1.5 space-y-1">
            <span className="block w-6 h-1 rounded bg-amber-500" />
            <span className="block w-10 h-2 rounded bg-slate-800" />
          </div>
          <div className="rounded-md bg-slate-50 p-1.5 space-y-1">
            <span className="block w-6 h-1 rounded bg-slate-400" />
            <span className="block w-8 h-2 rounded bg-slate-700" />
          </div>
        </div>
        <div className="space-y-1">
          {[1, 2, 3].map((r) => (
            <div key={r} className="flex items-center justify-between bg-slate-50 px-1.5 py-1 rounded">
              <span className="w-12 h-1 rounded bg-slate-400" />
              <span className="w-6 h-1.5 rounded bg-amber-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
