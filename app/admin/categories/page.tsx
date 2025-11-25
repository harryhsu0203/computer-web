'use client';

import useSWR from 'swr';
import { FormEvent, useState } from 'react';

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function AdminCategoriesPage() {
  const { data, mutate } = useSWR<{ items: { id: number; name: string; slug: string }[] }>(
    '/api/categories',
    fetcher
  );
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (!res.ok) throw new Error('建立失敗');
      setName('');
      mutate();
    } catch (err: any) {
      setError(err.message || '錯誤');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">分類管理</h2>
      <form onSubmit={onSubmit} className="flex gap-2">
        <input
          className="border rounded px-3 py-2 flex-1"
          placeholder="輸入分類名稱"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="px-3 py-2 rounded bg-zinc-900 text-white" disabled={loading}>
          {loading ? '新增中...' : '新增'}
        </button>
      </form>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="border rounded">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50">
            <tr>
              <th className="text-left px-3 py-2">ID</th>
              <th className="text-left px-3 py-2">名稱</th>
              <th className="text-left px-3 py-2">Slug</th>
            </tr>
          </thead>
          <tbody>
            {data?.items?.map((c) => (
              <tr key={c.id} className="border-t">
                <td className="px-3 py-2">{c.id}</td>
                <td className="px-3 py-2">{c.name}</td>
                <td className="px-3 py-2">{c.slug}</td>
              </tr>
            ))}
            {!data?.items?.length && (
              <tr>
                <td className="px-3 py-8 text-center text-zinc-500" colSpan={3}>
                  尚無分類
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


