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
      padding: '1rem',
    },
  },
  shortcuts: {
    'heading-1': 'font-medium text-4xl lg:text-6xl',
    'heading-2': 'font-medium text-2xl lg:text-4xl',
    'heading-3': 'font-medium text-xl lg:text-2xl',
    'heading-4': 'font-medium text-lg lg:text-xl',
    'heading-5': 'font-medium text-sm lg:text-lg',
    button: 'inline-flex items-center justify-center gap-2 py-2 px-4 sm:py-3 sm:px-6 border border-gray-900 bg-gray-900 text-white text-sm sm:text-base text-center rounded-sm hover:bg-gray-700 hover:border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 transition-colors',
    'button-icon': 'flex items-center justify-center text-gray-900 hover:text-gray-500 transition-colors',
    link: 'inline-flex items-center justify-center gap-2 font-medium text-gray-900 hover:text-gray-500 cursor-pointer transition-colors',
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