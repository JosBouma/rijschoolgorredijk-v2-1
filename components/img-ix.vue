<script lang="ts" setup>
import type * as prismic from "@prismicio/client"

const props = defineProps({
  field: {
    type: Object as PropType<prismic.ImageField<never> | undefined>,
    required: true,
    validator(prop: prismic.ImageField<never>) {
      if (!('url' in prop)) {
        return false
      }
      if (typeof prop.url !== 'string') {
        return false
      }
      if (!('dimensions' in prop)) {
        return false
      }
      if (!isFinite(prop.dimensions.height)) {
        return false
      }
      return true
    }
  },
  loading: {
    type: String as PropType<'lazy' | 'eager'>,
    default: 'lazy'
  },
  priority: {
    type: String as PropType<'high' | 'low' | 'auto'>,
    default: 'low'
  },
})

function createImgixURL(src: string, qs: URLSearchParams, width: number): string {
  qs.set('max-w', width.toString())
  return `${src}?${qs.toString()}`
}

function calcSet(src: string, qs: URLSearchParams, maxWidth: number): string[] {
  const ret: string[] = [createImgixURL(src, qs, maxWidth)]
  if (maxWidth === 0 || maxWidth > 8000) {
    throw new RangeError('Width out of range')
  }

  if (maxWidth <= 40) {
    return ret
  }

  const muliplier = maxWidth > 1500 ? 1000 : 10
  let amount = Math.floor(Math.log10(maxWidth * muliplier))
  const step = Math.floor(maxWidth / amount)
  while (amount--) {
    ret.push(createImgixURL(src, qs, maxWidth - step))
    maxWidth -= step
  }
  ret.pop()
  ret.push(createImgixURL(src, qs, 50))
  return ret
}

const srcset = computed(() => {
  const originalUrl = props.field!.url as string
  const [src, qs] = originalUrl.split('?')
  return calcSet(
    src,
    new URLSearchParams(qs),
    props.field!.dimensions?.width as number
  ).join(',')
})

const src = computed(() => {
  return props.field!.url as string
})

const width = computed(() => {
  return props.field!.dimensions?.width as number
})

const height = computed(() => {
  return props.field!.dimensions?.height as number
})

const alt = computed(() => {
  return props.field!.alt as string
})

const sizes = computed(() => {
  return `(max-width: ${props.field!.dimensions?.width}px) 100vw, ${props.field!.dimensions?.width}px`
})
</script>

<template>
  <img :src="src" :width="width" :height="height" :alt="alt" :loading="loading" :fetchpriority="priority" :sizes="sizes"
    :srcset="srcset" />
</template>