export function Footer() {
  return (
    <footer className="mt-12 border-t border-white/10">
      <div className="container py-10 text-sm text-white/70">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="font-[var(--font-display)] text-gradient mb-2">凱銓科技商行</div>
            <p className="text-white/60">
              電腦、筆電、零組件與周邊耗材，提供專業建議與快速服務。
            </p>
          </div>
          <div>
            <div className="text-white/80 font-medium mb-2">聯絡我們</div>
            <ul className="space-y-1">
              <li>客服信箱：service@kaichuan3c.shop</li>
              <li>服務時間：週一至週五 10:00-18:00</li>
            </ul>
          </div>
          <div>
            <div className="text-white/80 font-medium mb-2">追蹤最新優惠</div>
            <p className="text-white/60">訂閱電子報，第一時間掌握新品與優惠。</p>
          </div>
        </div>
        <div className="mt-8 text-white/50">
          © {new Date().getFullYear()} 凱銓科技商行
        </div>
      </div>
    </footer>
  );
}


