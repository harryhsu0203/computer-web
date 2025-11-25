import Link from 'next/link';
import { ShieldCheck, Truck, Headphones } from 'lucide-react';

export default async function HomePage() {
  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-hero-gradient p-10 sm:p-14 text-white">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[.2em] text-white/70 mb-3">KAICHUAN 3C</p>
          <h1 className="font-[var(--font-display)] text-3xl sm:text-5xl leading-tight">
            <span className="text-gradient">效能首選．科技美學</span>
            <br />打造你的專屬電腦裝備
          </h1>
          <p className="mt-4 text-white/80">
            精選筆電、桌機與零組件，專業建議、快速出貨。支援會員登入與後台管理。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="btn-primary">立即選購</Link>
            <Link href="/login" className="btn-secondary">會員登入</Link>
          </div>
        </div>
        <div className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 rounded-full bg-amber-500/20 blur-3xl" />
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card card-hover p-5 text-white/90">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-amber-400" />
            <div className="font-medium">原廠保固</div>
          </div>
          <p className="mt-1 text-sm text-white/70">全新品保固，售後無憂。</p>
        </div>
        <div className="card card-hover p-5 text-white/90">
          <div className="flex items-center gap-3">
            <Truck className="text-amber-400" />
            <div className="font-medium">快速出貨</div>
          </div>
          <p className="mt-1 text-sm text-white/70">工作日下單，儘速配送。</p>
        </div>
        <div className="card card-hover p-5 text-white/90">
          <div className="flex items-center gap-3">
            <Headphones className="text-amber-400" />
            <div className="font-medium">專人諮詢</div>
          </div>
          <p className="mt-1 text-sm text-white/70">提供安裝、升級與選配建議。</p>
        </div>
      </section>
    </div>
  );
}


