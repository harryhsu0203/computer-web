import Link from 'next/link';

export default async function AdminDashboardPage() {
  return (
    <div className="space-y-4">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Link href="/admin/products" className="block border rounded p-4 hover:shadow-sm">
          <div className="font-semibold">商品管理</div>
          <div className="text-sm text-zinc-600">新增/編輯/上下架商品</div>
        </Link>
        <Link href="/admin/products/new" className="block border rounded p-4 hover:shadow-sm">
          <div className="font-semibold">新增商品</div>
          <div className="text-sm text-zinc-600">快速新增單一商品</div>
        </Link>
      </div>
    </div>
  );
}


