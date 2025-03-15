import { createApp } from 'vue'
import App from './App.vue'
import Axios from './plugins/axios'
import router from './router/index.js'
import renusify from 'renusify'

import {
  rApp,
  rAvatar,
  rBtn,
  rBtnConfirm,
  rCard,
  rChart,
  rChartMap,
  rCheckboxInput,
  rChip,
  rCol,
  rConfirm,
  rContainer,
  rContent,
  rCountDown,
  rCropper,
  rDateInput,
  rDivider,
  rFileInput,
  rForm,
  rFormCreator,
  rIcon,
  rImg,
  rInfiniteBox,
  rList,
  rMenu,
  rMessage,
  rMeta,
  rModal,
  rNotify,
  rNumberInput,
  rPasswordInput,
  rProgressCircle,
  rProgressLine,
  rRow,
  rSelectInput,
  rSpacer,
  rSwitchInput,
  rTableCrud,
  rTelInput,
  rTextInput,
  rTextArea,
  rMaskInput,
  rColorInput,
  rTimeAgo,
  rToolbar,
  rNestable
} from 'renusify/components'
import { title } from 'renusify/directive'

const app = createApp(App)
  .use(router)
  .use(Axios)
  .use(renusify, {
    rtl: false,
    lang: 'en',
    package: 'admin',
    components: {
      rApp,
      rAvatar,
      rBtn,
      rBtnConfirm,
      rCard,
      rChart,
      rChartMap,
      rCheckboxInput,
      rChip,
      rCol,
      rConfirm,
      rContainer,
      rContent,
      rCountDown,
      rCropper,
      rDateInput,
      rDivider,
      rFileInput,
      rForm,
      rFormCreator,
      rIcon,
      rImg,
      rInfiniteBox,
      rList,
      rMenu,
      rMessage,
      rMeta,
      rModal,
      rNotify,
      rNumberInput,
      rPasswordInput,
      rProgressCircle,
      rProgressLine,
      rRow,
      rSelectInput,
      rSpacer,
      rSwitchInput,
      rTableCrud,
      rTelInput,
      rTextInput,
      rTextArea,
      rColorInput,
      rTimeAgo,
      rMaskInput,
      rToolbar,
      rNestable
    },
    directives: { title }
  })

window.app = app.mount('#app')

