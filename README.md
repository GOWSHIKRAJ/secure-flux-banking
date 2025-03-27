
# SecureFlux Banking Application

## Description
SecureFlux is a React-based banking application with a focus on security through homomorphic encryption simulation. It features different portals for customers, managers, and a hacker demonstration view.

## Features
- Customer portal with transaction history and account management
- Manager portal with customer data oversight
- Hacker demonstration portal showcasing encrypted data
- Login and registration functionality
- Responsive design with Tailwind CSS

## Tech Stack
- React
- TypeScript
- Tailwind CSS
- Shadcn UI
- React Router
- React Query
- Lucide Icons

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn or bun

## Installation
1. Clone the repository:
```bash
git clone [your-repository-url]
cd secureflux-banking
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or 
bun install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

## Building for Production
To build the app for production:

```bash
npm run build
# or
yarn build
# or
bun build
```

The build artifacts will be stored in the `dist/` directory.

## Directory Structure
```
src/
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── lib/           # Utility functions
├── pages/         # Page components
├── services/      # API and service functions
├── App.tsx        # Main application component
├── main.tsx       # Application entry point
```

## Database Implementation

This application currently uses a mock database implementation for demonstration purposes. In a real-world scenario, you would connect to:

1. **Backend database** like PostgreSQL, MySQL, or MongoDB
2. **API layer** using Express, NestJS, or similar
3. **Authentication service** like Firebase Auth, Auth0, or a custom JWT implementation

To integrate with a real database:
1. Replace the mock service in `src/services/DatabaseService.ts` with actual API calls
2. Implement proper authentication and authorization
3. Set up appropriate security measures for sensitive financial data

## License
[Specify your license here]
