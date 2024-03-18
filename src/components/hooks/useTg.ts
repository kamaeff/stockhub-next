interface CustomWindow extends Window {
  Telegram?: {
    WebApp?: any
  }
}

declare const window: CustomWindow

export const UseTg = () => {
  const tg = typeof window !== 'undefined' ? window.Telegram?.WebApp : null

  const onClose = (): void => {
    if (tg && tg.close) {
      tg.close()
    } else {
      console.error('Telegram WebApp close method is not available.')
    }
  }

  const onToggleButton = (): void => {
    if (tg && tg.MainButton) {
      tg.MainButton.isVisible ? tg.MainButton.hide() : tg.MainButton.show()
    } else {
      console.error('Telegram WebApp MainButton is not available.')
    }
  }

  return {
    tg,
    user: tg?.initDataUnsafe?.user,
    onClose,
    onToggleButton,
  }
}
