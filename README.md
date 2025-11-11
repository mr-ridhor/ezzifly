markdown
# PROJECT SETUP GUIDE

## QUICK START
1. Install Node.js 18+ from nodejs.org
2. Open terminal/command prompt
3. Run these commands:

```bash
git https://github.com/mr-ridhor/ezzifly.git
cd <project-folder>
npm install
cp .env.example .env.local
Generate secret key:

bash
openssl rand -base64 32
Edit .env.local and add:

text
NEXTAUTH_SECRET="paste-secret-here"
NEXTAUTH_URL="http://localhost:3030"
Start project:

bash
npm run dev
Open http://localhost:3030

TROUBLESHOOTING
Port busy? Run: npx kill-port 3030

Module errors? Run: rm -rf node_modules package-lock.json && npm install

Build fails? Run: npm run type-check

DEPLOYMENT
bash
npm run build
npm run start
SUPPORT
Check terminal errors

Verify Node.js version 18+

Restart dev server after env changes

✅ Done when: App loads at localhost:3000 with no errors