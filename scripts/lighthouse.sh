#!/bin/sh
# Usage: BASE_URL=http://localhost:3417 sh scripts/lighthouse.sh [outdir]
# Runs Lighthouse (mobile, default throttling) on each page and prints category scores.
BASE_URL="${BASE_URL:-http://localhost:3417}"
OUT="${1:-lighthouse-reports}"
CHROME_PATH="${CHROME_PATH:-$(node -e "console.log(require('@playwright/test').chromium.executablePath())")}"
export CHROME_PATH
mkdir -p "$OUT"
for p in "" menu credits; do
  name="${p:-home}"
  npx --yes lighthouse@12 "$BASE_URL/$p" --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo \
    --chrome-flags="--headless=new --no-sandbox" --output=json --output=html --output-path="$OUT/$name" --quiet >/dev/null 2>&1
  node -e "
    const r=require(require('path').resolve('$OUT/$name.report.json'));const c=r.categories;
    const a=r.audits;
    console.log('$name'.padEnd(8),'perf',Math.round(c.performance.score*100),'a11y',Math.round(c.accessibility.score*100),'bp',Math.round(c['best-practices'].score*100),'seo',Math.round(c.seo.score*100),
      '| LCP',a['largest-contentful-paint'].displayValue,'CLS',a['cumulative-layout-shift'].displayValue,'TBT',a['total-blocking-time'].displayValue)"
done
