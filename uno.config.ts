import {
  defineConfig,
  presetUno,
  presetWebFonts,
  presetTypography,
  presetAttributify,
  presetIcons,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'heading-1': 'font-semibold tracking-tight text-gray-900 text-3xl sm:text-4xl',
    'heading-2': 'font-semibold tracking-tight text-gray-900 text-2xl sm:text-3xl',
    'heading-3': 'font-semibold tracking-tight text-gray-900 text-xl sm:text-2xl',
    'heading-4': 'font-semibold tracking-tight text-gray-900 text-lg sm:text-xl',
    'heading-5': 'font-semibold tracking-tight text-gray-900 text-md sm:text-lg',
    link: 'font-medium text-gray-600 hover:text-gray-500 cursor-pointer',
    button: 'px-4 py-2 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500',
    input: 'block w-full rounded border-0 px-4 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600'
  },
  presets: [
    presetAttributify(),
    presetUno(),
    presetTypography(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
    presetIcons({
      scale: 1.25,
      cdn: 'https://esm.sh/',
    }),
  ],
})