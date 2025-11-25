import { ProductCard, type ProductCardData } from '@/components/ProductCard';
import { toInt } from '@/lib/utils';

export default async function ProductsPage({
  searchParams
}: {
  searchParams?: { q?: string; page?: string; categoryId?: string };
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const q = searchParams?.q ?? '';
  const page = toInt(searchParams?.page, 1);
  const url = new URL('/api/products', baseUrl);
  if (q) url.searchParams.set('q', q);
  url.searchParams.set('page', String(page));

  const res = await fetch(url.toString(), { next: { revalidate: 30 } });
  const data = (await res.json()) as {
    items: ProductCardData[];
    total: number;
    page: number;
    pageSize: number;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-[var(--font-display)] text-gradient">全部商品</h1>
        <form action="/products" className="hidden sm:block">
          <input
            name="q"
            defaultValue={q}
            placeholder="搜尋商品..."
            className="w-[280px] rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </form>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {data.items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}


