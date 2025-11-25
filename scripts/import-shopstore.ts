import 'dotenv/config';
import { prisma } from '@/lib/prisma';
import { parse as parseCsv } from 'csv-parse/sync';
import fs from 'node:fs';
import path from 'node:path';
import { slugify } from '@/lib/utils';

type Row = {
  name: string;
  description?: string;
  price?: string | number;
  priceInt?: number;
  currency?: string;
  stock?: string | number;
  sku?: string;
  category?: string;
  images?: string; // 逗號或管線分隔
  imageUrls?: string[]; // 若 JSON 已是陣列
};

function toInt(val: any, defaultValue = 0): number {
  const n = Number.parseInt(String(val ?? ''), 10);
  if (Number.isFinite(n)) return n;
  const f = Number.parseFloat(String(val ?? ''));
  return Number.isFinite(f) ? Math.round(f) : defaultValue;
}

async function importRows(rows: Row[]) {
  for (const row of rows) {
    const name = (row.name || '').trim();
    if (!name) continue;
    const priceInt =
      typeof row.priceInt === 'number'
        ? row.priceInt
        : Math.round((typeof row.price === 'number' ? row.price : Number(row.price || 0)) * 100);
    const stock = toInt(row.stock, 0);
    const sku = row.sku?.trim() || undefined;
    const description = row.description || '';
    const categoryName = row.category?.trim() || 'Default';
    const images =
      (Array.isArray(row.imageUrls) ? row.imageUrls : (row.images || '').split(/[,|]\s*/))
        .map((s) => s.trim())
        .filter(Boolean);

    const category = await prisma.category.upsert({
      where: { slug: slugify(categoryName) },
      update: {},
      create: { name: categoryName, slug: slugify(categoryName) }
    });

    const created = await prisma.product.create({
      data: {
        name,
        slug: slugify(name),
        description,
        priceInt,
        currency: row.currency || 'TWD',
        stock,
        sku,
        categoryId: category.id,
        images: { create: images.map((url, idx) => ({ url, sortOrder: idx })) }
      }
    });

    console.log('Imported:', created.id, created.name);
  }
}

async function run() {
  const arg = process.argv.find((a) => a.startsWith('--file='));
  if (!arg) {
    console.error('請以 --file= 路徑 指定 CSV/JSON 檔案');
    process.exit(1);
  }
  const file = arg.replace('--file=', '');
  const abs = path.isAbsolute(file) ? file : path.join(process.cwd(), file);
  const content = fs.readFileSync(abs, 'utf8');
  const ext = path.extname(abs).toLowerCase();
  let rows: Row[] = [];
  if (ext === '.csv') {
    rows = parseCsv(content, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    }) as Row[];
  } else if (ext === '.json') {
    const data = JSON.parse(content);
    rows = Array.isArray(data) ? (data as Row[]) : [];
  } else {
    console.error('不支援的檔案格式，請使用 .csv 或 .json');
    process.exit(1);
  }
  console.log(`準備匯入 ${rows.length} 筆...`);
  await importRows(rows);
  console.log('匯入完成');
}

run()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


