import create from 'zustand'

export const useStore = create(set => ({
  foregroundColor: 'ea7439',
  backgroundColor: 'ffffff',
  contrast: '56',
  sentiment: 'Weak',
  expanded: false,
  swapColors: () => {
    set(state => ({
      foregroundColor: state.backgroundColor,
      backgroundColor: state.foregroundColor,
    }))
  },
  setContrast: ({ score, sentiment }) => {
    set({ contrast: score, sentiment })
  },
  changeForeground: evt => {
    let { value } = evt.target
    if (value.startsWith('#')) {
      value = value.slice(1)
    }
    set({ foregroundColor: value })
  },
  changeBackground: evt => {
    let { value } = evt.target
    if (value.startsWith('#')) {
      value = value.slice(1)
    }
    set({ backgroundColor: value })
  },
  changeBackgroundFromPicker: value => {
    set({ backgroundColor: value.slice(1) })
  },
  changeForegroundFromPicker: value => {
    set({ foregroundColor: value.slice(1) })
  },
  toggleExpand: () => {
    set(state => ({ expanded: !state.expanded }))
  },
}))
