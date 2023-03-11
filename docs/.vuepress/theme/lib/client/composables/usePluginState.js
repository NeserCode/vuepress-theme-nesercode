import { computed } from 'vue'

export const usePluginState = (keyName, states) => computed(() => {
  if (typeof states === "undefined") return true
  else if (states instanceof Array) {
    let tempValue = true
    for (let i = 0; i < states.length; i++) {
      Object.keys(states[i]).forEach((key) => {
        if (key === keyName && frontmatter.value.plugins)
          tempValue = frontmatter.value.plugins[i][key]
      })
    }
    return tempValue
  } else return !(states[keyName] === false)
})