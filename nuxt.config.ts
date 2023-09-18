import { repositoryName } from './slicemachine.config.json'

interface Font {
  name: string
  sizes: string[]
}

function generateGFontURL(fonts: Font[]): string {
  if (!fonts.length) {
    return ''
  }
  const url = new URL('https://fonts.googleapis.com/css2')
  for (const font of fonts) {
    url.searchParams.append('family', `${font.name}:wght@${font.sizes.join(';')}`)
  }
  url.searchParams.append('display', 'swap')
  return url.toString()
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Rijschool Gorredijk',
      htmlAttrs: {
        lang: 'nl',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Rijschool Gorredijk' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/favicon.ico'
        },
        {
          rel: 'dns-prefetch',
          href: '//fonts.googleapis.com'
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com/',
          crossorigin: ''
        },
        {
          rel: 'dns-prefetch',
          href: '//images.prismic.io'
        },
        {
          rel: 'preconnect',
          href: 'https://images.prismic.io/',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: generateGFontURL([
            {
              name: 'Poppins',
              sizes: [
                '400',
                '500'
              ]
            }
          ])
        }
      ],
    },
  },

  css: [
    '~/assets/css/normalize.css',
    '~/assets/css/framework.css'
  ],

  modules: [
    '@nuxtjs/prismic',
    'nuxt-svgo',
  ],

  prismic: {
    endpoint: repositoryName,
    preview: '/api/preview',
    toolbar: false,
    clientConfig: {
      routes: [
        // {
        //   type: 'page',
        //   path: '/:uid',
        // },
        {
          type: 'index',
          uid: 'index',
          path: '/',
        },
      ]
    }
  },
})