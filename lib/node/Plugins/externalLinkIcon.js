import { externalLinkIconPlugin } from '@vuepress/plugin-external-link-icon'

export function getExternalLinkIconPlugin(localeOptions) {
  return externalLinkIconPlugin(
    {
      locales: Object.entries(localeOptions.locales || {}).reduce((result, [key, value]) => {
        result[key] = {
          openInNewWindow: value.openInNewWindow ?? localeOptions.openInNewWindow,
        };
        return result;
      }, {}),
    }
  )
}