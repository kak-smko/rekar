<script setup>
import { ref } from 'vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

// check for updates every hour
const period = 60 * 60 * 1000

const swActivated = ref(false)
const loading = ref(false)

/**
 * This function will register a periodic sync check every hour, you can modify the interval as needed.
 * @param {string} swUrl
 * @param {ServiceWorkerRegistration} r
 */
function registerPeriodicSync(swUrl, r) {
  if (period <= 0) return

  setInterval(async () => {
    if ('onLine' in navigator && !navigator.onLine)
      return

    const resp = await fetch(swUrl, {
      cache: 'no-store',
      headers: {
        'cache': 'no-store',
        'cache-control': 'no-cache'
      }
    })

    if (resp?.status === 200)
      await r.update()
  }, period)
}


const { needRefresh, updateServiceWorker } = useRegisterSW({
  immediate: true,
  onRegisteredSW(swUrl, r) {
    if (period <= 0) return
    if (r?.active?.state === 'activated') {
      swActivated.value = true
      registerPeriodicSync(swUrl, r)
    } else if (r?.installing) {
      r.installing.addEventListener('statechange', (e) => {
        /** @type {ServiceWorker} */
        const sw = e.target
        swActivated.value = sw.state === 'activated'
        if (swActivated.value)
          registerPeriodicSync(swUrl, r)
      })
    }
  }
})

function close() {
  needRefresh.value = false
  loading.value = false
}

function refresh() {
  console.log('updating service worker')
  loading.value=true
  updateServiceWorker().then(() => {
    console.log('updated service worker')
  }).catch((e)=>{
    console.error('no service worker:',e)
  }).finally(()=>{
    close();
  })
}

</script>

<template>
  <r-modal
    v-model="needRefresh"
    :closebtn="false"
  >
    <div class="pa-3">
      <div class="title-1">{{ $t('new_content_please_refresh') }}</div>
      <div class="text-end mt-5">
        <r-btn class="color-info me-2" :loading="loading" @click="refresh()">
          {{ $t('ok') }}
        </r-btn>
        <r-btn @click="close()">
          {{ $t('cancel') }}
        </r-btn>
      </div>
    </div>
  </r-modal>
</template>

