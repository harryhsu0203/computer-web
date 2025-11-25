'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

type Product = {
  id: number;
  name: string;
  description?: string | null;
  priceInt: number;
  stock: number;
  published: boolean;
};

export default function AdminEditProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const id = params.id;
    fetch(`/api/products/${id}`)
      .then((r) => r.json())
      .then((p) => setProduct(p))
      .catch(() => setError('讀取失敗'))
      .finally(() => setLoading(false));
  }, [params.id]);

  async function save() {
    if (!product) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: product.name,
          description: product.description,
          priceInt: product.priceInt,
          stock: product.stock,
          published: product.published
        })
      });
      if (!res.ok) throw new Error('儲存失敗');
      router.push('/admin/products');
    } catch (err: any) {
      setError(err.message || '錯誤');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div>讀取中...</div>;
  if (!product) return <div>找不到商品</div>;

  return (
    <div className="max-w-3xl">
      <h2 className="text-lg font-semibold mb-4">編輯商品 #{product.id}</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm mb-1">名稱</label>
          <input
            className="w-full border rounded px-3 py-2"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">價格（NT$）</label>
            <input
              className="w-full border rounded px-3 py-2"
              type="number"
              min="0"
              value={product.priceInt / 100}
              onChange={(e) =>
                setProduct({ ...product, priceInt: Math.round(Number(e.target.value) * 100) })
              }
            />
          </div>
          <div>
            <label className="block text-sm mb-1">庫存</label>
            <input
              className="w-full border rounded px-3 py-2"
              type="number"
              min="0"
              value={product.stock}
              onChange={(e) => setProduct({ ...product, stock: Number(e.target.value) })}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input
            id="published"
            type="checkbox"
            checked={product.published}
            onChange={(e) => setProduct({ ...product, published: e.target.checked })}
          />
          <label htmlFor="published" className="text-sm">
            上架
          </label>
        </div>
        <div>
          <label className="block text-sm mb-1">描述</label>
          <textarea
            className="w-full border rounded px-3 py-2 min-h-[120px]"
            value={product.description ?? ''}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded bg-zinc-900 text-white" onClick={save} disabled={saving}>
            {saving ? '儲存中...' : '儲存'}
          </button>
          <button
            className="px-4 py-2 rounded border"
            onClick={() => router.push('/admin/products')}
            disabled={saving}
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
}


