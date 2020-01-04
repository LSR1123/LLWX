import defaultSettings from '@/settings'

const title = defaultSettings.title || '家政服务公司'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
