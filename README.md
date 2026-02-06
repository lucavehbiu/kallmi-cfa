# Kallmi Estate

Premium Albanian olive oil estate website built with Next.js 15 and React 19.

## Tech Stack

- **Framework**: Next.js 15.1.6
- **React**: 19.0.0
- **Styling**: Tailwind CSS 3.4.17
- **Language**: TypeScript 5.7.3
- **Email**: Mailjet API

## Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Other Commands

```bash
# Run linting
npm run lint

# Optimize images
npm run optimize-images
```

## Project Structure

```
src/
├── components/     # React components
├── pages/          # Next.js pages
├── styles/         # Global styles
└── utils/          # Utility functions
public/
├── images/         # Static images
└── fonts/          # Custom fonts
```

## Environment Variables

Create a `.env.local` file with:

```
# Mailjet API (for contact forms)
MJ_APIKEY_PUBLIC=your_public_key
MJ_APIKEY_PRIVATE=your_private_key
```

## Playwright MCP (Browser Automation)

This project has Playwright MCP configured for browser testing and automation. Claude can use it to:

- Navigate to pages and take screenshots
- Fill forms and click buttons
- Debug visual issues

The Playwright MCP server runs automatically when Claude Code is started.

## Development Notes

- Images use Next.js Image component with optimization
- Remote images are configured in `next.config.mjs` under `remotePatterns`
- The site uses standalone output mode for deployment
