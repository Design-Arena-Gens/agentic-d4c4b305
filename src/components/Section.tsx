import { ReactNode } from 'react';

export default function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-8 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-lg font-semibold text-gray-800">{title}</h2>
      {children}
    </section>
  );
}
