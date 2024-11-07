/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      },
      fontSize: {
        base: '14px'
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
          DEFAULT: '#091a2b',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          foreground: 'hsl(var(--secondary-foreground))'
        },
        main: '#6b21a8',
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
        }
      },
      backgroundColor: {
        main: '#6b21a8'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'scale-up-center': {
          from: {
            ' -webkit-transform': 'scale(1);',
            transform: 'scale(1);'
          },
          to: {
            '-webkit-transform': 'scale(1.3);',
            transform: 'scale(1.3);'
          }
        },
        'scale-down-center': {
          from: {
            '-webkit-transform': 'scale(1.3);',
            transform: 'scale(1.3);'
          },
          to: {
            '-webkit-transform': 'scale(1);',
            transform: 'scale(1);'
          }
        },
        'rotate-center': {
          from: {
            ' -webkit-transform': 'rotate(0);',
            transform: 'rotate(0);'
          },
          to: {
            '-webkit-transform': 'rotate(360deg);',
            transform: 'rotate(360deg);'
          }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'scale-up-center': 'scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;',
        'scale-down-center': 'scale-down-center 0.4s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'rotate-center': 'rotate-center 0.4s ease-in-out both'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
