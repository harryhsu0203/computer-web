import Image from 'next/image';
import Link from 'next/link';

export type ProductCardData = {
  id: number;
  name: string;
  slug: string;
  priceInt: number;
  images?: { url: string; alt?: string | null }[];
};

export function ProductCard({ product }: { product: ProductCardData }) {
  const first = product.images?.[0]?.url;
  return (
    <Link href={`/products/${product.id}`} className="group block rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] transition card-hover">
      <div className="aspect-square bg-black/20 overflow-hidden rounded-t-xl grid place-items-center">
        {first ? (
          <Image
            src={first}
            alt={product.name}
            width={600}
            height={600}
            className="w-full h-full object-contain transition duration-300 group-hover:scale-[1.03]"
            unoptimized
          />
        ) : (
          <div className="w-full h-full grid place-items-center text-white/40">No Image</div>
        )}
      </div>
      <div className="p-3 text-white">
        <div className="line-clamp-2 text-sm/6 text-white/90">{product.name}</div>
        <div className="mt-1 font-semibold text-amber-300">NT$ {(product.priceInt / 100).toLocaleString()}</div>
      </div>
    </Link>
  );
}


