# Albion Square
Albion Online companion app

## Requirements
* Docker
* VSCode with Dev Containers extesion

## Get Started
1. Clone the repo by using the Dev Containers extension: "Clone repository in Named Container Volume"
2. Place .env file at repository root
3. Once inside the project, run:

```bash
pnpm install
pnpm exec prisma migrate deploy
pnpm run --filter @as/next-app dev
```
