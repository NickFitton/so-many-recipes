Use Shadcn components wherever possible, they live in @packages/ui
Do not alter @packages/ui/src/components other than to add new shadcn components with `pnpm dlx shadcn@latest add {component}`
For shared UI structure, build it in @packages/ui & use Storybook to show the structure usage
Write feature testing with e2e tests using playwright
