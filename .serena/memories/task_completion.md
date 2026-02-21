# Task Completion Checklist

After completing a coding task:

1. **Lint**: Run `npm run lint` to check for ESLint errors
2. **Build check**: Run `npm run build` if changes are significant (especially API routes or config changes)
3. **Dev server test**: Ensure `npm run dev` still starts without errors
4. **Node version**: Always ensure Node 20 is active (`nvm use 20`)

## Common Post-Task Issues
- If server crashes with malloc error: switch to Node 20, clear `.next` cache
- Image 404s in console are harmless (don't fix unless asked)
- Multiple lockfile warning is harmless (ignore)
