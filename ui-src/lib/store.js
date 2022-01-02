import create from 'zustand'

export const useStore = create((set, get) => ({
  selectionMode: 'none',
  foregroundColor: '#ea7439',
  backgroundColor: '#ffffff',
  contrast: '56',
  wcag: '2.9',
  sentiment: 'Weak',
  expanded: false,
  swapColors: () => {
    set(state => ({
      foregroundColor: state.backgroundColor,
      backgroundColor: state.foregroundColor,
    }))
  },
  setContrast: ({ score, sentiment, wcag }) => {
    set({ contrast: score, sentiment, wcag })
  },
  changeForeground: evt => {
    let { value } = evt.target
    if (!value.startsWith('#')) {
      value = `#${value}`
    }
    set({ foregroundColor: value })
  },
  changeBackground: evt => {
    let { value } = evt.target
    if (!value.startsWith('#')) {
      value = `#${value}`
    }
    set({ backgroundColor: value })
  },

  changeBackgroundFromPicker: value => {
    set({ backgroundColor: value })
  },
  changeForegroundFromPicker: value => {
    set({ foregroundColor: value })
  },
  setSelectionColor: value => {
    const { selectionMode } = get()
    if (selectionMode === 'foreground') {
      set({ foregroundColor: value })
    } else if (selectionMode === 'background') {
      set({ backgroundColor: value })
    }
  },
  setSelectionMode: mode => {
    const { selectionMode } = get()

    if (selectionMode === mode) {
      set({ selectionMode: 'none' })
    } else {
      set({ selectionMode: mode })
    }
  },
  toggleExpand: () => {
    set(state => ({ expanded: !state.expanded }))
  },
}))
