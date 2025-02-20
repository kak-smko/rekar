import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,mjs,jsx,vue}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ["**/node_modules/**",'**/dist/**','**/dev-dist/**', '**/dist-ssr/**', '**/coverage/**'],
  },

  js.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  skipFormatting,
   {
    name: 'app/rules',
    rules: {
      'vue/no-v-text-v-html-on-component': 'off',
      'vue/multi-word-component-names': 'off'
    }
  }
]

