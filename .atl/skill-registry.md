# Skill Registry — portfolio-v2

Generated: 2026-04-28

## Project Context

- **Stack**: Vue 3 + TypeScript + Vite + Tailwind CSS 4
- **UI Library**: shadcn-vue (new-york style)
- **Animation**: motion-v
- **Icons**: lucide-vue-next
- **Utilities**: @vueuse/core, class-variance-authority, clsx, tailwind-merge

## User Skills (Relevant to this project)

| Skill | Path | Trigger |
|-------|------|---------|
| typescript | `~/.claude/skills/typescript/SKILL.md` | When writing TypeScript - types, interfaces, generics |
| tailwind-4 | `~/.claude/skills/tailwind-4/SKILL.md` | When styling with Tailwind - cn(), theme variables |
| zod-4 | `~/.claude/skills/zod-4/SKILL.md` | When using Zod for validation |
| playwright | `~/.claude/skills/playwright/SKILL.md` | When writing E2E tests |

## Project Conventions

- **Path Alias**: `@/` → `./src/`
- **Component Structure**: `components/ui/`, `components/layout/`, `components/sections/`, `components/inspira/`
- **Composables**: `composables/`
- **Utilities**: `lib/utils.ts` with `cn()` helper
- **TypeScript**: Strict mode enabled
- **CSS**: Tailwind CSS 4 via `@tailwindcss/vite` plugin

## Compact Rules

### TypeScript

- Use const object + extracted type pattern: `const STATUS = {...} as const; type Status = (typeof STATUS)[keyof typeof STATUS];`
- Flat interfaces: no inline nested objects, use dedicated interfaces
- Prefer `interface` for objects, `type` for unions/intersections

### Tailwind CSS 4

- Never use `var()` in className — use Tailwind semantic classes
- Never use hex colors — use Tailwind color classes
- Use `cn()` for conditional styles: `cn("base", condition && "variant")`
- Dynamic values go in `style` prop, not className

### Vue 3 Patterns (Project-Specific)

- Use `<script setup lang="ts">` for all components
- Use composables for shared logic
- shadcn-vue components in `components/ui/`
