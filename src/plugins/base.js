import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  '@/components', true, /\.vue$/,
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  let componentName
  if (componentConfig.default.name !== null) {
    componentName = camelCase(componentConfig.default.name)
  } else {
    componentName = upperFirst(
      camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')),
    )
  }

  Vue.component(componentName, componentConfig.default || componentConfig)
})
