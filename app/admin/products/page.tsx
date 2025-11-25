import Link from 'next/link';

type ProductRow = {
  id: number;
  name: string;
  priceInt: number;
  published: boolean;
};

export default async function AdminProductsPage() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products?limit=50`, {
    cache: 'no-store'
  });
  const data = (await res.json()) as { items: ProductRow[] };
  const items = data.items ?? [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">商品列表</h2>
        <Link href="/admin/products/new" className="px-3 py-2 rounded bg-zinc-900 text-white text-sm">
          新增商品
        </Link>
      </div>
      <div className="overflow-x-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-zinc-50">
            <tr>
              <th className="text-left px-3 py-2">ID</th>
              <th className="text-left px-3 py-2">名稱</th>
              <th className="text-right px-3 py-2">價格</th>
              <th className="text-center px-3 py-2">狀態</th>
              <th className="text-right px-3 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-3 py-2">{p.id}</td>
                <td className="px-3 py-2">{p.name}</td>
                <td className="px-3 py-2 text-right">NT$ {(p.priceInt / 100).toLocaleString()}</td>
                <td className="px-3 py-2 text-center">{p.published ? '上架' : '下架'}</td>
                <td className="px-3 py-2 text-right">
                  <Link href={`/admin/products/${p.id}`} className="text-blue-600 hover:underline">
                    編輯
                  </Link>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-center text-zinc-500">
                  尚無商品
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


