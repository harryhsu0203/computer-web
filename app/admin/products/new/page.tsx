'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminNewProductPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [sku, setSku] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          priceInt: Math.round(Number(price) * 100),
          stock: Number(stock),
          sku: sku || undefined,
          images: images
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean),
          categoryName: categoryName || undefined
        })
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data?.message as string) || '建立商品失敗');
      }
      router.push('/admin/products');
    } catch (err: any) {
      setError(err.message || '發生未知錯誤');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <h2 className="text-lg font-semibold mb-4">新增商品</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">名稱</label>
          <input className="w-full border rounded px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">價格（NT$）</label>
            <input className="w-full border rounded px-3 py-2" type="number" min="0" value={price} onChange={(e) => setPrice(Number(e.target.value))} required />
          </div>
          <div>
            <label className="block text-sm mb-1">庫存</label>
            <input className="w-full border rounded px-3 py-2" type="number" min="0" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">SKU</label>
            <input className="w-full border rounded px-3 py-2" value={sku} onChange={(e) => setSku(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm mb-1">分類（輸入名稱，系統自動建立）</label>
            <input className="w-full border rounded px-3 py-2" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">描述</label>
          <textarea className="w-full border rounded px-3 py-2 min-h-[120px]" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1">圖片網址（每行一個）</label>
          <textarea className="w-full border rounded px-3 py-2 min-h-[120px]" value={images} onChange={(e) => setImages(e.target.value)} placeholder="https://..." />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button type="submit" className="px-4 py-2 rounded bg-zinc-900 text-white" disabled={loading}>
          {loading ? '建立中...' : '建立商品'}
        </button>
      </form>
    </div>
  );
}


