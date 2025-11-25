import 'dotenv/config';
import { prisma } from '@/lib/prisma';
import fs from 'node:fs';
import path from 'node:path';

async function main() {
  const products = await prisma.product.findMany({
    orderBy: { id: 'asc' },
    include: { images: { orderBy: { sortOrder: 'asc' } }, category: true }
  });
  const rows = products.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description ?? '',
    priceInt: p.priceInt,
    price: p.priceInt / 100,
    currency: p.currency,
    stock: p.stock,
    sku: p.sku ?? '',
    category: p.category?.name ?? '',
    imageUrls: p.images.map((i) => i.url)
  }));

  const arg = process.argv.find((a) => a.startsWith('--out='));
  if (arg) {
    const out = arg.replace('--out=', '');
    const outAbs = path.isAbsolute(out) ? out : path.join(process.cwd(), out);
    fs.writeFileSync(outAbs, JSON.stringify(rows, null, 2), 'utf8');
    console.log(`Exported ${rows.length} products to ${outAbs}`);
  } else {
    console.log(JSON.stringify(rows, null, 2));
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


