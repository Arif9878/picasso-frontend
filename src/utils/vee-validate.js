import { extend, setInteractionMode } from 'vee-validate'
import { isURL } from './function'
setInteractionMode('eager')
extend('isURL', {
  message: 'Link is not valid.',
  validate: value => {
    return !isURL(value)
  },
})
