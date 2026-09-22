'use client';

import React, { useState } from 'react';

export default function TerminalCard() {
  const [selectedCmd, setSelectedCmd] = useState<number>(0);

  const commands = [
    {
      label: 'GET /actuator/health',
      request: 'curl -X GET http://localhost:8080/actuator/health',
      response: {
        status: 'UP',
        runtime: 'Java 21',
        database: 'Oracle Database (Connected)',
        security: 'Spring Security (JWT RBAC)'
      }
    },
    {
      label: 'POST /api/v1/auth/login',
      request: 'curl -X POST http://localhost:8080/api/v1/auth/login -d "{\"email\":\"dr.vet@clyvo.com\"}"',
      response: {
        status: 'AUTHENTICATED',
        role: 'ROLE_VETERINARIO',
        crmv: '18492-SP',
        token: 'Bearer eyJhbGciOiJIUzI1Ni...'
      }
    }
  ];

  const current = commands[selectedCmd];

  return (
    <div className="rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/[0.08] bg-white dark:bg-[#0c0c11] shadow-xl">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-neutral-100 dark:bg-black border-b border-neutral-200 dark:border-white/[0.06]">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-appleRed-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-appleGreen-500/80" />
          <span className="ml-2 text-[11px] font-mono text-neutral-400">ClyvoApiApplication.java</span>
        </div>
        <span className="text-[10px] font-mono text-appleGreen-500 bg-appleGreen-500/10 px-2 py-0.5 rounded-full border border-appleGreen-500/20">
          SPRING BOOT 3 • LOCAL DEV
        </span>
      </div>

      {/* Commands Tabs */}
      <div className="flex gap-1 p-2 bg-neutral-50 dark:bg-black/50 border-b border-neutral-200 dark:border-white/[0.04]">
        {commands.map((cmd, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCmd(idx)}
            className={`px-2.5 py-1 text-[11px] font-mono rounded-md transition-all cursor-pointer ${
              selectedCmd === idx
                ? 'bg-appleRed-600 text-white font-semibold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {cmd.label}
          </button>
        ))}
      </div>

      {/* Terminal Content */}
      <div className="p-3.5 font-mono text-[11px] leading-relaxed bg-black text-neutral-300">
        <div className="text-neutral-500 mb-2 truncate">
          <span className="text-appleRed-500">clyvo-api:~$</span> {current.request}
        </div>
        <pre className="text-appleGreen-400 p-2.5 rounded-lg bg-neutral-950/80 border border-neutral-900 overflow-x-auto">
          {JSON.stringify(current.response, null, 2)}
        </pre>
      </div>
    </div>
  );
}
