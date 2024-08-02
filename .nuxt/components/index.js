export { default as NuxtLogo } from '../..\\components\\NuxtLogo.vue'
export { default as VuetifyLogo } from '../..\\components\\VuetifyLogo.vue'
export { default as ModalComplete } from '../..\\components\\Modal\\Complete.vue'
export { default as ModalConfirm } from '../..\\components\\Modal\\Confirm.vue'
export { default as ModalConfirmLogout } from '../..\\components\\Modal\\ConfirmLogout.vue'
export { default as ModalError } from '../..\\components\\Modal\\Error.vue'
export { default as ModalLoading } from '../..\\components\\Modal\\Loading.vue'
export { default as LoadingLineLoading } from '../..\\components\\Loading\\LineLoading.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
