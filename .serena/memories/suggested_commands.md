# Suggested Commands

## Development
```bash
npm run dev          # Start dev server at localhost:3000
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run optimize-images  # Optimize images (scripts/optimize-images.js)
```

## Node.js Version (CRITICAL)
```bash
nvm use 20           # MUST use Node 20 LTS, NOT Node 25
# If nvm doesn't work in shell:
export PATH="$HOME/.nvm/versions/node/v20.19.2/bin:$PATH"
```

## Cache Reset (for crashes or stale state)
```bash
rm -rf .next node_modules/.cache
npm run dev
```

## Full Reset
```bash
rm -rf node_modules .next
npm install
npm run dev
```

## Git
```bash
git status
git diff
git log --oneline -10
git add <files>
git commit -m "message"
```

## System (macOS/Darwin)
```bash
ls, find, grep    # Standard unix commands
pkill -f "next dev"  # Kill dev server
```
