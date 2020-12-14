export { default as ImageView } from '../../components/ImageView.vue'
export { default as Logo } from '../../components/Logo.vue'
export { default as Masthead } from '../../components/Masthead.vue'

export const LazyImageView = import('../../components/ImageView.vue' /* webpackChunkName: "components/ImageView" */).then(c => c.default || c)
export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/Logo" */).then(c => c.default || c)
export const LazyMasthead = import('../../components/Masthead.vue' /* webpackChunkName: "components/Masthead" */).then(c => c.default || c)
