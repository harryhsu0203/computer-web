# 凱銓科技商行｜電腦購物網站（前台 + 後台 + 會員 + 匯入）

此專案提供一個可自行維運的電商雛形：

- 前台：商品列表、商品詳情、（購物車雛形位於詳情頁）
- 後台：登入、商品列表、快速新增商品（可自動建立分類）
- 會員：NextAuth（Credentials）
- 資料庫：Prisma + SQLite（可換成 MySQL / PostgreSQL）
- 匯入：提供 CSV/JSON 匯入腳本，便於從現有系統搬資料

> 注意：此為第一版可運作雛形，之後可逐步擴充（訂單、優惠券、運費金流、圖片上傳、權限與工作流程等）。

## 快速開始

1) 安裝環境

```bash
node -v    # 建議 Node 18+
npm i
```

2) 設定環境變數

建立 `.env.local`（放在專案根目錄），範例內容：

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=請改成強隨機字串
NEXT_PUBLIC_APP_URL=http://localhost:3000
DATABASE_URL="file:./dev.db"
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=Admin123!
```

> 產生強密鑰：`openssl rand -hex 32`

3) 產生 Prisma Client 並初始化資料庫

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
```

4) 開發啟動

```bash
npm run dev
# 瀏覽 http://localhost:3000
```

登入後台：使用 `ADMIN_EMAIL` / `ADMIN_PASSWORD`（預設 admin@example.com / Admin123!）。

## 目錄結構

- `app/`：Next.js App Router 頁面與 API 路由
- `app/api/*`：REST API（商品、分類、登入）
- `components/`：共用 UI 元件
- `lib/`：Prisma Client、驗證與工具函式
- `prisma/schema.prisma`：資料庫模型
- `prisma/seed.ts`：建立管理員與預設分類
- `scripts/import-shopstore.ts`：資料匯入腳本（CSV/JSON）

## 從現有系統匯入商品（CSV/JSON）

1) 從現有系統匯出商品清單為 CSV 或 JSON（欄位建議）：

- `name`：商品名稱（必填）
- `description`：商品描述（選填）
- `price`：價格（數字，單位：元）或 `priceInt`（整數，單位：分）
- `stock`：庫存（選填）
- `sku`：SKU（選填）
- `category`：分類名稱（若不存在會自動建立）
- `images`：圖片網址，逗號或 `|` 分隔；或 `imageUrls`：字串陣列

2) 執行匯入：

```bash
# CSV
npm run import:shopstore -- --file=/絕對路徑/products.csv

# JSON
npm run import:shopstore -- --file=/絕對路徑/products.json
```

匯入腳本會：

- 自動建立/對應分類
- 以商品名稱產生 slug
- 建立商品與圖片（圖片為外部 URL，無需上傳）

## 換資料庫（MySQL / PostgreSQL）

本專案已切換為 PostgreSQL（適合 Render 正式部署）。若本機要用 Postgres，可用 Docker 或本機安裝。

1) 設定 `.env.local` 的 `DATABASE_URL`：  
   `postgresql://USER:PASSWORD@HOST:PORT/DBNAME?schema=public`
2) 初始化資料庫：

```bash
npx prisma generate
npx prisma migrate dev --name init
```

## Render 部署（推薦）

此專案已附 `render.yaml`，可一鍵建立 Postgres 與 Web Service。

1) 推到 GitHub（或 GitLab/Bitbucket）
2) 登入 Render，建立 Blueprint → 指向此 repo  
3) Render 會依 `render.yaml` 建立：
   - Database：`kaichuan3c-db`（Postgres）
   - Web Service：`kaichuan3c-web`
4) 調整環境變數（Web Service → Environment）：
   - `NEXTAUTH_URL`：改為 Render 產生的網址（例如 `https://xxx.onrender.com`）
   - `NEXT_PUBLIC_APP_URL`：同上
   - `NEXTAUTH_SECRET`：保持或重新生成（可用 `openssl rand -hex 32`）
   - `DATABASE_URL`：會自動連到上方 Postgres
5) 重新部署（Redeploy）
6) 遷移資料表（preDeploy 已自動執行 `prisma migrate deploy`）。若需管理員帳號，可在 Web → Shell 執行一次：

```bash
npm run db:seed
```

### 在 Render 匯入舊站商品
1) 準備 CSV 或 JSON（可參考 `templates/products-template.csv`）  
2) 將檔案放到容器內（Web → Shell 內用 `curl -o` 或用 Git 方式佈署檔案）  
3) 執行匯入：
```bash
# CSV
npm run import:shopstore -- --file=/path/products.csv
# JSON
npm run import:shopstore -- --file=/path/products.json
```
4) 前台 `/products` 與後台 `/admin/products` 檢查資料

### 匯出（備份/搬遷）
```bash
# 匯出為 JSON（預設輸出到 stdout）
npm run export:products
# 指定輸出檔案
npm run export:products -- --out=./export/products.json
```

## 後續擴充建議

- 訂單/結帳流程（物流、金流、發票）
- 圖片上傳（S3 / Cloudflare R2），後台圖片管理器
- 權限與角色更細緻化（店員/主管）
- 商品規格/變體（SKU、庫存、售價分層）
- SEO、站內搜尋強化（全文索引）
- 匯出報表、折扣/優惠券、行銷活動

---

若你把現有網站的資料匯出給我（CSV/JSON），我可以協助調整欄位對應並直接幫你匯入到此系統。也可以針對 UI/流程做你們團隊習慣的調整。您可先依上方步驟在本機跑起來確認畫面與流程。 


