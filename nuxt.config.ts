import { repositoryName } from './slicemachine.config.json'

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
        // { hid: 'description', name: 'description', content: 'Rijschool Gorredijk' },
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
      ],
    },
  },

  modules: ['@nuxtjs/prismic', 'nuxt-svgo', '@nuxtjs/tailwindcss', '@nuxt/fonts', '@nuxt/image'],
  
  image: {
    provider: 'prismic'
  },

  prismic: {
    endpoint: repositoryName,
    clientConfig: {
      routes: [
        {
          type: 'index',
          uid: 'index',
          path: '/',
        },
        {
          type: 'page',
          path: '/:uid/'
        }
      ]
    }
  },
})