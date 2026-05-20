# Site

GitHub Pages site for opencode-vim.

To regenerate from README.md (run from repo root):

```
bun run build:site
```

This runs `site/build.ts` which converts `README.md` to `site/index.html` using `marked`.
