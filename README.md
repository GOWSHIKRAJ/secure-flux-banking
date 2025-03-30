
# SecureFlux Banking Application

## Description
SecureFlux is a premium banking platform featuring homomorphic encryption for unparalleled security. The application includes separate portals for customers, managers, and a hacker demonstration view, all with a high-end user interface.

## Features
- Premium Customer Portal with account management and transaction history
- Executive Manager Dashboard with customer oversight and analytics
- Hacker Demonstration Portal showcasing encrypted data security
- Comprehensive transaction management system
- Account monitoring and financial analytics
- SQL database integration for secure data storage
- Responsive design with premium UI components

## Tech Stack
- React with TypeScript
- Tailwind CSS with custom premium UI components
- SQL Database (via Supabase)
- Shadcn UI Component Library
- React Router for navigation
- React Query for data fetching
- Lucide Icons for premium iconography

## Prerequisites
- Node.js (v16 or higher)
- npm, yarn, or bun package manager
- Supabase account for SQL database integration

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

3. Set up Supabase:
   - Create a Supabase account at [https://supabase.com](https://supabase.com)
   - Create a new project
   - Set up the following tables:
     - `customers` (id, name, email, accountNumber, password_hash, balance, lastLogin, created_at)
     - `transactions` (id, customer_id, amount, description, type, date, created_at)
     - `managers` (id, name, email, password_hash, role, lastLogin, created_at)
   - Get your Supabase URL and anon key from the project settings

4. Configure environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

6. Open your browser and navigate to:
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

## Supabase SQL Database Schema

### Customers Table
```sql
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  account_number TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  balance DECIMAL(15,2) NOT NULL DEFAULT 0,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Transactions Table
```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES customers(id) NOT NULL,
  amount DECIMAL(15,2) NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('deposit', 'withdrawal', 'transfer')) NOT NULL,
  date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Managers Table
```sql
CREATE TABLE managers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT CHECK (role IN ('admin', 'analyst', 'auditor')) NOT NULL,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

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

## License
[Specify your license here]

