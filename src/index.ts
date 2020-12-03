import {EDIT_WIDTH} from 'config'

const iconPrettifier = `<rect x="2" y="3" width="20" height="16" rx="2" fill="#050038"></rect><rect x="4" y="5" width="16" height="12" fill="white"></rect><rect x="3" y="14" width="2" height="18" rx="1" transform="rotate(-90 3 14)" fill="#050038"></rect><rect x="11" y="1" width="2" height="13" rx="1" fill="#050038"></rect><path d="M17.3384 17.9476C17.1519 17.4252 16.5758 17.1544 16.0546 17.3441V17.3441C15.5379 17.5322 15.27 18.1022 15.4549 18.62L16.7822 22.3383C16.9687 22.8606 17.5448 23.1314 18.066 22.9417V22.9417C18.5827 22.7537 18.8506 22.1837 18.6658 21.6658L17.3384 17.9476Z" fill="#050038"></path><path d="M6.6616 17.9482C6.8481 17.4258 7.42415 17.155 7.94539 17.3447V17.3447C8.46209 17.5328 8.73001 18.1027 8.54514 18.6206L7.21777 22.3388C7.03128 22.8612 6.45522 23.132 5.93399 22.9423V22.9423C5.41728 22.7542 5.14936 22.1843 5.33423 21.6664L6.6616 17.9482Z" fill="#050038"></path>`

miro.onReady(async () => {
  miro.initialize({
    extensionPoints: {
      bottomBar: async () => {
        const permissions = await miro.currentUser.getCurrentBoardPermissions()
        const canEdit = permissions.findIndex((p) => p === 'EDIT_CONTENT') !== -1
        const authorized = await miro.isAuthorized()
        if (authorized && canEdit) {
          return {
            title: 'Prettifier',
            svgIcon: iconPrettifier,
            onClick: () => {
              miro.board.ui.openBottomPanel('bottom-panel.html', {width: EDIT_WIDTH})
              miro.board.ui.openLeftSidebar('sidebar.html');
            },
          }
        }
      },
    },
  })

  const params = await miro.board.__getParamsFromURL()
  if (params.runPrototyping) {
    miro.showNotification('Enter prototyping mode...')
    miro.addListener('ALL_WIDGETS_LOADED', async () => {
      miro.__setRuntimeState({enterPrototypingMode: true})
      miro.board.ui.openBottomPanel('bottom-panel.html')
    })
  }
})
