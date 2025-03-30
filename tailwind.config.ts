import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        banking: {
          light: '#F8FAFC',
          DEFAULT: '#0F172A',
          dark: '#020617',
          accent: '#3B82F6',
          danger: '#EF4444',
          success: '#10B981',
          muted: '#94A3B8',
          premium: '#1E40AF',
          gold: '#F59E0B',
          platinum: '#6366F1',
          luxury: '#1F2937',
          highlight: '#60A5FA'
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      boxShadow: {
        'premium': '0 10px 50px -5px rgba(0, 0, 0, 0.1), 0 5px 20px -5px rgba(0, 0, 0, 0.1)',
        'premium-hover': '0 20px 60px -10px rgba(0, 0, 0, 0.1), 0 15px 25px -5px rgba(0, 0, 0, 0.06)',
        'card-premium': '0 25px 50px -12px rgba(0, 0, 0, 0.1), 0 15px 25px -7px rgba(0, 0, 0, 0.05)',
        'luxury': '0 20px 60px -15px rgba(0, 0, 0, 0.2), 0 10px 30px -10px rgba(0, 0, 0, 0.1)',
        'platinum': '0 35px 60px -15px rgba(0, 0, 0, 0.25), 0 18px 36px -18px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, #1E3A8A, #3B82F6)',
        'gold-gradient': 'linear-gradient(135deg, #92400E, #F59E0B)',
        'platinum-gradient': 'linear-gradient(135deg, #4F46E5, #A78BFA)',
        'luxury-gradient': 'linear-gradient(135deg, #1F2937, #374151)',
        'dark-gradient': 'linear-gradient(to bottom, rgba(3, 7, 18, 0.8), rgba(15, 23, 42, 0.9))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        'slide-left': {
          '0%': { transform: 'translateX(10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'slide-right': {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'pulse-light': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'fade-out': 'fade-out 0.4s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'slide-down': 'slide-down 0.4s ease-out',
        'slide-left': 'slide-left 0.4s ease-out',
        'slide-right': 'slide-right 0.4s ease-out',
        'pulse-light': 'pulse-light 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite linear'
      },
      backdropBlur: {
        xs: '2px'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
