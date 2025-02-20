import { createApp } from 'vue'
import App from './App.vue'
import Axios from './plugins/axios'

import router from './router/index.js'
import renusify from 'renusify'

import {
  rApp,
  rContent,
  rMeta,
  rContainer,
  rRow,
  rCol,
  rSpacer,
  rDivider,
  rFileInput,
  rBtn,
  rIcon,
  rCard,
  rModal,
  rTextInput,
  rTelInput,
  rSwitchInput,
  rTableCrud,
  rMessage,
  rTimeAgo,
  rImg,
  rTextArea,
  rAddressInput,
  rCheckInput,
  rPasswordInput,
  rUniqueInput,
  rSelectInput,
  rBreadcrumbs,
  rNumberInput,
  rRatingInput,
  rTextEditorPreview,
  rAvatar,
  rToolbar,
  rCountDown,
  rSwiper,
  rInfinitePage,
  rInfiniteBox,
  rTimeline,
  rMenu,
  rCheckboxInput,
  rBtnConfirm,
  rMaskInput
} from 'renusify/components'
import { title } from 'renusify/directive'

const app = createApp(App)
  .use(router)
  .use(Axios)
  .use(renusify, {
    rtl: false,
    lang: 'en',
    package: 'index',
    components: {
      rApp,
      rContent,
      rMeta,
      rContainer,
      rRow,
      rCol,
      rSpacer,
      rDivider,
      rFileInput,
      rBtn,
      rIcon,
      rCard,
      rModal,
      rTextInput,
      rTelInput,
      rSwitchInput,
      rTableCrud,
      rMessage,
      rTimeAgo,
      rImg,
      rTextArea,
      rAddressInput,
      rCheckInput,
      rPasswordInput,
      rUniqueInput,
      rSelectInput,
      rBreadcrumbs,
      rNumberInput,
      rRatingInput,
      rTextEditorPreview,
      rAvatar,
      rToolbar,
      rCountDown,
      rSwiper,
      rInfinitePage,
      rInfiniteBox,
      rTimeline,
      rMenu,
      rCheckboxInput,
      rBtnConfirm,
      rMaskInput
    },
    directives: { title }
  })

window.app = app.mount('#app')

