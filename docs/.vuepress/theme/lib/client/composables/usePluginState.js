import { computed, nextTick } from 'vue'

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

export const enableUpandDown = (state, document) => {
  const stateStyle = state ? 'block' : 'none'

  const plugin = document.querySelector(".up-and-down")
  if (plugin) plugin.style.display = stateStyle
  else return
}

export const initUpandDown = (document) => {
  nextTick(() => {
    enableUpandDown(false, document)

    document.addEventListener('scrollend', () => {
      enableUpandDown(true, document)
      document.removeEventListener('scrollend', () => { })
    })
  })
}