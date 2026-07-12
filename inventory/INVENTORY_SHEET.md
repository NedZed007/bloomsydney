# BloomSydney — Google Sheets inventory backend

Use a Google Sheet as the source of truth for catalogue rows while keeping partner florists (`FLORISTS` in `app.js`) as structured routing data. Product rows should map to the same fields the site already uses: `id`, `name`, `image`, `desc`, `price`, and optional `wasPrice` for the daily deal.

---

## Quick start (~5 minutes)

1. Open [Google Sheets](https://sheets.google.com) → **Blank spreadsheet**.
2. Rename the first tab **Inventory** (optional but clear).
3. **File → Import → Upload** → choose `inventory/google-sheets-template.csv` from this repo.
   - Import location: **Replace current sheet** (or **Insert new sheet**).
   - Separator: **Comma**.
4. Freeze row 1: **View → Freeze → 1 row**.
5. (Recommended) Add a **margin** column in column W with formula in W2, fill down:
   ```text
   =IF(AND(I2>0,J2>0),(J2-I2)/J2,"")
   ```
   Format as **Percent** (this is optional; `cost_aud` and `retail_price_aud` are enough for the app).
6. Share only with people who edit inventory. If the static site will **fetch** the sheet, you must publish or expose a read URL (see [Integration options](#integration-options-for-the-static-site)).

---

## Column dictionary

| Column | Purpose | Type | Example |
|--------|---------|------|---------|
| `product_id` | Stable slug; must match `PRODUCTS[].id` or `BOUQUET_OF_THE_DAY.id` in `app.js` | Text | `classic-rose` |
| `sku` | Internal / supplier SKU | Text | `BSY-ROS-001` |
| `product_name` | Display name (`name` in app) | Text | `Classic Rose Bouquet` |
| `category` | Merchandising group | Text | `bouquet`, `arrangement`, `deal` |
| `description` | Short card copy (`desc` in app) | Text | `Garden roses with native eucalyptus foliage` |
| `image_path` | Relative path in repo (`image` in app) | Text | `assets/bouquets/classic-rose.jpg` |
| `image_url` | Optional absolute URL if hosting images on CDN/Drive | URL | `https://…` |
| `cost_aud` | Wholesale / COGS (not shown on site) | Number | `49.00` |
| `retail_price_aud` | Customer price (`price` in app) | Number | `89.00` |
| `compare_at_price_aud` | Strikethrough “was” price (`wasPrice`; deal only) | Number | `95.00` |
| `stock_qty` | Units available (operational) | Integer | `24` |
| `availability` | Simple status for UI badges | Enum | `in_stock`, `low_stock`, `out_of_stock` |
| `active` | Include on website when `TRUE` | Boolean | `TRUE` |
| `sort_order` | Grid order (lower = first); deal often `0` | Integer | `1` |
| `florist_ids` | Which partners can fulfil: `all` or comma-separated `FLORISTS[].id` | Text | `bondi,ashfield` or `all` |
| `tags_occasion` | Comma-separated facets for filters / SEO | Text | `romance,anniversary` |
| `min_qty` | Minimum order quantity | Integer | `1` |
| `lead_time_days` | Extra days beyond same-day default | Integer | `0` |
| `seasonal` | When item is offered | Text | `all_year`, `spring`, `daily_rotating` |
| `is_bouquet_of_the_day` | Maps to `BOUQUET_OF_THE_DAY` promo block | Boolean | `TRUE` / `FALSE` |
| `last_updated` | Audit date (ISO) | Date | `2026-07-09` |
| `notes` | Internal only | Text | `Rotate daily` |

### Alignment with `app.js`

| App field | Sheet column(s) |
|-----------|-----------------|
| `id` | `product_id` |
| `name` | `product_name` |
| `image` | `image_path` (or `image_url` if you change the loader) |
| `desc` | `description` |
| `price` | `retail_price_aud` |
| `wasPrice` | `compare_at_price_aud` |

Partner florists remain in `FLORISTS` (11 entries: `parramatta`, `bankstown`, `penrith`, `campbelltown`, `ashfield`, `chatswood`, `bondi`, `manly`, `liverpool`, `hornsby`, `greenacre`). Use `florist_ids` to link stock to those `id` values.

---

## Suggested extra columns (beyond product / cost / availability / images)

You already have many of these in the template. Consider adding when you outgrow the CSV:

| Column | Why |
|--------|-----|
| `sku` | Reconcile with supplier invoices and POs |
| `category` | Navigation and reporting |
| `florist_ids` | Which partner stocks or fulfils the line |
| `retail_price_aud` vs `cost_aud` | Separate margin from customer price |
| `margin_pct` | Sheet formula on cost vs retail |
| `active` | Hide discontinued SKUs without deleting history |
| `sort_order` | Control homepage grid without re-sorting rows |
| `description` | Longer copy than a single app string if needed |
| `tags_occasion` | Occasion-based browse (wedding, sympathy, etc.) |
| `min_qty` | Corporate / bulk rules |
| `lead_time_days` | Set expectations when not same-day |
| `seasonal` | Auto-hide off-season rows (with Apps Script or manual) |
| `last_updated` | Know when row was last touched |
| `notes` | Ops reminders (allergies, stem length, market-only) |

Optional future columns: `weight_kg`, `allergen_notes`, `substitution_allowed`, `photo_credit`, `supplier_name`, `reorder_point`.

---

## Sharing settings

| Who | Access |
|-----|--------|
| Florist ops / you | **Editor** on the workbook |
| Public website (published CSV only) | No Google account needed if sheet is **published to web** (read-only export URL) |
| Automated sync (Sheets API) | **Service account** or OAuth app with read-only scope; share the sheet with the service account email |

Do not put API keys or private credentials inside the sheet. Keep secrets in environment or CI only.

---

## Integration options for the static site

### a) Manual export (simplest)

1. Edit inventory in Google Sheets.
2. **File → Download → Comma-separated values (.csv)**.
3. Save as `inventory/products-export.csv` (or similar) in the repo.
4. Run a small build step or script that generates a `products.js` snippet, **or** periodically paste values into `PRODUCTS` / `BOUQUET_OF_THE_DAY` in `app.js`.
5. Redeploy the static site.

**Pros:** No CORS, no public data, works on any host.  
**Cons:** Easy to forget updates; no real-time stock.

### b) Published sheet as CSV URL (+ optional `fetch` in `app.js`)

1. In Google Sheets: **File → Share → Publish to web**.
2. Choose the **Inventory** sheet, format **Comma-separated values (.csv)**.
3. Copy the link. The export pattern is:

   ```text
   https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/export?format=csv&gid={GID}
   ```

   - `{SPREADSHEET_ID}` is in the browser URL between `/d/` and `/edit`.
   - `{GID}` is the numeric sheet tab id (`gid=0` is often the first tab; confirm from the URL when you click the tab).

4. Example loader (add near top of `app.js` after constants, or in a separate `inventory-loader.js`):

   ```javascript
   const INVENTORY_CSV_URL =
     'https://docs.google.com/spreadsheets/d/YOUR_ID/export?format=csv&gid=0';

   async function loadProductsFromSheet() {
     const res = await fetch(INVENTORY_CSV_URL);
     if (!res.ok) throw new Error('Inventory fetch failed');
     const text = await res.text();
     const rows = parseCsv(text); // implement or use a tiny parser
     const products = rows
       .filter((r) => r.active === 'TRUE' && r.is_bouquet_of_the_day !== 'TRUE')
       .map(sheetRowToProduct);
     const deal = rows.find((r) => r.is_bouquet_of_the_day === 'TRUE');
     if (deal) Object.assign(BOUQUET_OF_THE_DAY, sheetRowToDeal(deal));
     PRODUCTS.length = 0;
     products.forEach((p) => PRODUCTS.push(p));
     renderProducts();
   }
   ```

**Caveats:**

- **Public read:** Published CSV is world-readable; do not put supplier costs in a published sheet unless that is acceptable. Use a **second tab** “Public catalogue” with only customer-facing columns, or publish a tab that omits `cost_aud` and `notes`.
- **CORS:** `fetch` from `file://` or some static hosts may fail. Test on your real origin (e.g. GitHub Pages). If blocked, use manual export or a thin proxy / Apps Script web app.
- **Caching:** Browsers and CDNs cache aggressively; append `?t=` + timestamp during dev, or set short cache headers on a proxy.
- **Production:** For private cost data + live stock, prefer **Google Sheets API** (serverless function) or **Apps Script** JSON endpoint with auth.

---

## Optional: Google Apps Script

**Validate rows on edit** (Extensions → Apps Script), simplified example:

```javascript
function onEdit(e) {
  const sheet = e.source.getSheetByName('Inventory');
  if (!sheet || e.range.getRow() === 1) return;
  const row = e.range.getRow();
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const data = sheet.getRange(row, 1, 1, headers.length).getValues()[0];
  const idx = (name) => headers.indexOf(name);
  const errors = [];
  if (!data[idx('product_id')]) errors.push('product_id required');
  if (data[idx('retail_price_aud')] < data[idx('cost_aud')]) errors.push('retail < cost');
  const avail = data[idx('availability')];
  if (!['in_stock', 'low_stock', 'out_of_stock'].includes(avail)) errors.push('bad availability');
  if (errors.length) e.range.offset(0, 0, 1, 1).setNote(errors.join('; '));
}
```

**Web app JSON** (Deploy → New deployment → Web app, execute as you, access: anyone with link *or* restrict*):

```javascript
function doGet() {
  const sheet = SpreadsheetApp.getActive().getSheetByName('Inventory');
  const [headers, ...rows] = sheet.getDataRange().getValues();
  const items = rows.map((row) =>
    Object.fromEntries(headers.map((h, i) => [h, row[i]]))
  );
  return ContentService.createTextOutput(JSON.stringify(items)).setMimeType(
    ContentService.MimeType.JSON
  );
}
```

Map `image_path` to full URLs in the client if assets stay on the same origin as the site.

---

## Optional second tab: Florists

You can mirror `FLORISTS` in a **Florists** tab (`florist_id`, `name`, `suburb`, `postcode`, `availability`, `region`, …) for ops, but routing logic in `app.js` still expects the in-code array unless you also load that tab.

---

## Files in this repo

| File | Role |
|------|------|
| `inventory/google-sheets-template.csv` | Importable header + sample rows from current `PRODUCTS` and `BOUQUET_OF_THE_DAY` |
| `inventory/INVENTORY_SHEET.md` | This guide |

After import, treat the sheet as live data and the CSV in git as a **bootstrap template** only.
