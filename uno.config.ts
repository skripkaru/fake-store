import {
  defineConfig,
  presetUno,
  presetWebFonts,
  presetTypography,
  presetAttributify,
  presetIcons,
} from 'unocss'

export default defineConfig({
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '6rem',
        '2xl': '6rem',
      },
    },
  },
  shortcuts: {
    'heading-1': 'font-medium text-2xl sm:text-3xl',
    'heading-2': 'font-medium text-xl sm:text-2xl',
    'heading-3': 'font-medium text-lg sm:text-xl',
    'heading-4': 'font-medium text-base sm:text-lg',
    'heading-5': 'font-medium text-sm sm:text-base',
    button: 'py-3 px-6 sm:py-4 sm:px-8 bg-gray-900 text-white text-sm sm:text-base rounded-sm hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-gray-900',
  },
  presets: [
    presetAttributify(),
    presetUno(),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'Inter',
      },
    }),
    presetIcons({
      scale: 1.25,
      cdn: 'https://esm.sh/',
    }),
  ],
})