import { createSystem, defineConfig, defaultSystem } from '@chakra-ui/react'

const customConfig = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          100: { value: '#e3f2fd' },
          500: { value: '#3182ce' },
          700: { value: '#2c5282' },
        },
      },
    },
  },
})
// @ts-expect-error - Chakra v3 internal type mismatch
export default createSystem(defaultSystem, customConfig)
