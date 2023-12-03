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

export const enableUpandDown = (state) => {
  const stateStyle = state ? 'block' : 'none'

  if (!window && !document) return

  const plugin = document.querySelector(".up-and-down")
  if (plugin) plugin.style.display = stateStyle
  else return
}

export const initUpandDown = () => {
  if (!window && !document) return

  nextTick(() => {
    enableUpandDown(false)

    document.addEventListener('scrollend', () => {
      enableUpandDown(true)
      document.removeEventListener('scrollend', () => { })
    })
  })
}