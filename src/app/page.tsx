"use client";
import { useState } from 'react';
import TextArea from '@/components/TextArea';
import Section from '@/components/Section';
import KeyForm from '@/components/KeyForm';

export default function Page() {
  const [requirement, setRequirement] = useState('');
  const [loading, setLoading] = useState(false);
  const [agents, setAgents] = useState<any[] | null>(null);
  const [plan, setPlan] = useState<any | null>(null);
  const [approved, setApproved] = useState(false);

  async function generate() {
    setLoading(true);
    setApproved(false);
    setAgents(null);
    setPlan(null);

    const keys = typeof window !== 'undefined' ? localStorage.getItem('ade_api_keys') : null;
    const apiKeys = keys ? JSON.parse(keys) : {};

    const [agentsRes, planRes] = await Promise.all([
      fetch('/api/agents', { method: 'POST', body: JSON.stringify({ requirement, apiKeys }), headers: { 'Content-Type': 'application/json' } }),
      fetch('/api/plan', { method: 'POST', body: JSON.stringify({ requirement, apiKeys }), headers: { 'Content-Type': 'application/json' } }),
    ]);

    const agentsJson = await agentsRes.json();
    const planJson = await planRes.json();
    setAgents(agentsJson.agents);
    setPlan(planJson.plan);
    setLoading(false);
  }

  return (
    <main>
      <Section title="1) Enter Requirement">
        <TextArea placeholder="Describe the product/feature to build..." value={requirement} onChange={(e) => setRequirement(e.target.value)} />
        <div className="mt-3 flex gap-3">
          <button className="rounded-md bg-brand-600 px-4 py-2 text-white hover:bg-brand-700 disabled:opacity-50" onClick={generate} disabled={!requirement || loading}>
            {loading ? 'Generating?' : 'Generate Plan'}
          </button>
          {plan && (
            <button className="rounded-md border border-gray-300 bg-white px-4 py-2 hover:bg-gray-50" onClick={() => setApproved(true)}>
              Approve Plan
            </button>
          )}
        </div>
      </Section>

      <Section title="2) API Keys (Optional for validation)">
        <KeyForm />
      </Section>

      {agents && (
        <Section title="3) Multi-Agent Outputs">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {agents.map((a, i) => (
              <div key={i} className="rounded-md border p-3">
                <div className="mb-1 text-sm font-semibold text-brand-700">{a.role}</div>
                <div className="text-sm text-gray-700">{a.summary}</div>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-600">
                  {a.details.map((d: string, j: number) => (
                    <li key={j}>{d}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {plan && (
        <Section title="4) Proposed Plan (Review & Approve)">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <h3 className="mb-2 font-semibold">Assumptions</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                {plan.assumptions.map((x: string, i: number) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
              <h3 className="mb-2 mt-4 font-semibold">Features</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                {plan.features.map((x: string, i: number) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Architecture</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                {plan.architecture.map((x: string, i: number) => (
                  <li key={i}>{x}</li>
                ))}
              </ul>
              <h3 className="mb-2 mt-4 font-semibold">Validation & Tests</h3>
              <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
                {plan.validation.map((x: string, i: number) => (
                  <li key={i}>{x}</li>
                ))}
                {plan.tests.map((x: string, i: number) => (
                  <li key={i} className="text-green-700">{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      )}

      {approved && (
        <Section title="5) Ready to Implement">
          <p className="text-sm text-gray-700">Plan approved. Proceed to implement features and connect real APIs when ready. All API calls are mocked to work in isolated environments.</p>
        </Section>
      )}
    </main>
  );
}
