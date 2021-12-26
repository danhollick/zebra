import create from 'zustand'

export const useStore = create(set => ({
  foregroundColor: 'ea7439',
  backgroundColor: 'ffffff',
  contrast: '61',
  setContrast: contrast => {
    set({ contrast })
  },
  changeForeground: evt => {
    set({ foregroundColor: evt.target.value })
  },
  changeBackground: evt => {
    set({ backgroundColor: evt.target.value })
  },
}))
