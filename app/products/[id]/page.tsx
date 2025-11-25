import Image from 'next/image';

type ProductDetail = {
  id: number;
  name: string;
  description?: string | null;
  priceInt: number;
  images: { url: string; alt?: string | null }[];
};

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/products/${params.id}`, {
    next: { revalidate: 30 }
  });
  if (!res.ok) {
    return <div>找不到商品</div>;
  }
  const product = (await res.json()) as ProductDetail;
  const first = product.images[0]?.url;
  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="card overflow-hidden aspect-square">
        {first ? (
          <Image
            src={first}
            alt={product.name}
            width={800}
            height={800}
            className="w-full h-full object-contain bg-black/20"
            unoptimized
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-white/40">No Image</div>
        )}
      </div>
      <div className="text-white">
        <h1 className="text-3xl font-[var(--font-display)]">{product.name}</h1>
        <div className="mt-3 text-2xl font-semibold text-amber-300">NT$ {(product.priceInt / 100).toLocaleString()}</div>
        {product.description && <p className="mt-5 whitespace-pre-wrap text-white/80 leading-7">{product.description}</p>}
        <div className="mt-8 flex gap-3">
          <button className="btn-primary">加入購物車</button>
          <button className="btn-secondary">加入追蹤</button>
        </div>
      </div>
    </div>
  );
}


