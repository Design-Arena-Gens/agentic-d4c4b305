"use client";
import { useEffect, useState } from 'react';

export default function KeyForm() {
  const [keys, setKeys] = useState<Record<string, string>>({});

  useEffect(() => {
    const saved = localStorage.getItem('ade_api_keys');
    if (saved) setKeys(JSON.parse(saved));
  }, []);

  function update(key: string, value: string) {
    const next = { ...keys, [key]: value };
    setKeys(next);
    localStorage.setItem('ade_api_keys', JSON.stringify(next));
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1 block font-medium">OpenAI API Key (optional)</span>
          <input type="password" className="w-full rounded-md border p-2" placeholder="sk-..." value={keys.openai ?? ''} onChange={(e) => update('openai', e.target.value)} />
        </label>
        <label className="block text-sm">
          <span className="mb-1 block font-medium">Anthropic API Key (optional)</span>
          <input type="password" className="w-full rounded-md border p-2" placeholder="sk-ant-..." value={keys.anthropic ?? ''} onChange={(e) => update('anthropic', e.target.value)} />
        </label>
      </div>
      <p className="text-xs text-gray-500">Keys are stored locally in your browser for development validation only.</p>
    </div>
  );
}
