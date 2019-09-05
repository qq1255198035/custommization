<template>
  <div>
     <s-menu
      :collapsed="true"
      :menu="menus"
      :theme="theme"
      :mode="mode"
      @select="onSelect"
      style="padding: 16px 0px;">
    </s-menu>
  </div>
</template>

  



<script>

import SMenu from './index'


export default {
  name: 'SideMenu',
  components: { SMenu },
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  methods: {
    onSelect (obj) {
      console.log(obj)
      this.$emit('menuSelect', obj)
    }
  }
}
</script>
