import { InputPair } from 'helpers/ColorSchemaParser/map-links';
export interface Theme {
  backgroundImage: string;

  windowBg: string;
  windowFg: string;
  windowBgOver: string;
  windowBgRipple: string;
  windowFgOver: string;
  windowSubTextFg: string;
  windowSubTextFgOver: string;
  windowBoldFg: string;
  windowBoldFgOver: string;
  windowBgActive: string;
  windowFgActive: string;
  windowActiveTextFg: string;
  windowShadowFg: string;
  windowShadowFgFallback: string;

  shadowFg: string;
  slideFadeOutBg: string;
  slideFadeOutShadowFg: string;

  imageBg: string;
  imageBgTransparent: string;


  activeButtonBg: string;
  activeButtonBgOver: string;
  activeButtonBgRipple: string;
  activeButtonFg: string;
  activeButtonFgOver: string;
  activeButtonSecondaryFg: string;

  activeButtonSecondaryFgOver: string;
  activeLineFg: string;

  activeLineFgError: string;



  lightButtonBg: string;
  lightButtonBgOver: string;
  lightButtonBgRipple: string;
  lightButtonFg: string;
  lightButtonFgOver: string;

  attentionButtonFg: string;
  attentionButtonFgOver: string;
  attentionButtonBgOver: string;
  attentionButtonBgRipple: string;

  outlineButtonBg: string;
  outlineButtonBgOver: string;
  outlineButtonOutlineFg: string;
  outlineButtonBgRipple: string;

  menuBg: string;
  menuBgOver: string;
  menuBgRipple: string;
  menuIconFg: string;
  menuIconFgOver: string;
  menuSubmenuArrowFg: string;
  menuFgDisabled: string;
  menuSeparatorFg: string;

  scrollBarBg: string;
  scrollBarBgOver: string;
  scrollBg: string;
  scrollBgOver: string;

  smallCloseIconFg: string;
  smallCloseIconFgOver: string;

  radialFg: string;
  radialBg: string;

  placeholderFg: string;
  placeholderFgActive: string;
  inputBorderFg: string;
  filterInputBorderFg: string;
  filterInputActiveBg: string;
  filterInputInactiveBg: string;
  checkboxFg: string;

  botKbBg: string;
  botKbDownBg: string;
  botKbColor: string;

  sliderBgInactive: string;
  sliderBgActive: string;

  tooltipBg: string;
  tooltipFg: string;
  tooltipBorderFg: string;


  titleShadow: string;
  titleBg: string;
  titleBgActive: string;
  titleButtonBg: string;
  titleButtonFg: string;
  titleButtonBgOver: string;
  titleButtonFgOver: string;
  titleButtonBgActive: string;
  titleButtonFgActive: string;
  titleButtonBgActiveOver: string;
  titleButtonFgActiveOver: string;
  titleButtonCloseBg: string;
  titleButtonCloseFg: string;
  titleButtonCloseBgOver: string;
  titleButtonCloseFgOver: string;
  titleButtonCloseBgActive: string;
  titleButtonCloseFgActive: string;
  titleButtonCloseBgActiveOver: string;
  titleButtonCloseFgActiveOver: string;
  titleFg: string;
  titleFgActive: string;


  trayCounterBg: string;
  trayCounterBgMute: string;
  trayCounterFg: string;
  trayCounterBgMacInvert: string;
  trayCounterFgMacInvert: string;


  layerBg: string;

  cancelIconFg: string;
  cancelIconFgOver: string;


  boxBg: string;
  boxTextFg: string;
  boxTextFgGood: string;
  boxTextFgError: string;
  boxTitleFg: string;
  boxSearchBg: string;

  boxTitleAdditionalFg: string;
  boxTitleCloseFg: string;
  boxTitleCloseFgOver: string;

  //boxSearchCancelIconFg: string;
  //boxSearchCancelIconFgOver: string;

  membersAboutLimitFg: string;

  contactsBg: string;
  contactsBgOver: string;
  contactsNameFg: string;
  contactsStatusFg: string;
  contactsStatusFgOver: string;
  contactsStatusFgOnline: string;

  photoCropFadeBg: string;
  photoCropPointFg: string;

  callArrowFg: string;
  callArrowMissedFg: string;


  introBg: string;
  introTitleFg: string;
  introDescriptionFg: string;
  introErrorFg: string;

  introCoverTopBg: string;
  introCoverBottomBg: string;
  introCoverIconsFg: string;
  introCoverPlaneTrace: string;
  introCoverPlaneInner: string;
  introCoverPlaneOuter: string;
  introCoverPlaneTop: string;


  dialogsMenuIconFg: string;
  dialogsMenuIconFgOver: string;

  dialogsBg: string;
  dialogsNameFg: string;
  dialogsChatIconFg: string;
  dialogsDateFg: string;
  dialogsTextFg: string;
  dialogsTextFgService: string;
  dialogsDraftFg: string;
  dialogsVerifiedIconBg: string;
  dialogsVerifiedIconFg: string;
  dialogsSendingIconFg: string;
  dialogsSentIconFg: string;
  dialogsUnreadBg: string;
  dialogsUnreadBgMuted: string;
  dialogsUnreadFg: string;

  dialogsBgOver: string;
  dialogsNameFgOver: string;
  dialogsChatIconFgOver: string;
  dialogsDateFgOver: string;
  dialogsTextFgOver: string;
  dialogsTextFgServiceOver: string;
  dialogsDraftFgOver: string;
  dialogsVerifiedIconBgOver: string;
  dialogsVerifiedIconFgOver: string;
  dialogsSendingIconFgOver: string;
  dialogsSentIconFgOver: string;
  dialogsUnreadBgOver: string;
  dialogsUnreadBgMutedOver: string;
  dialogsUnreadFgOver: string;

  dialogsBgActive: string;
  dialogsNameFgActive: string;
  dialogsChatIconFgActive: string;
  dialogsDateFgActive: string;
  dialogsTextFgActive: string;
  dialogsTextFgServiceActive: string;
  dialogsDraftFgActive: string;
  dialogsVerifiedIconBgActive: string;
  dialogsVerifiedIconFgActive: string;
  dialogsSendingIconFgActive: string;
  dialogsSentIconFgActive: string;
  dialogsUnreadBgActive: string;
  dialogsUnreadBgMutedActive: string;
  dialogsUnreadFgActive: string;

  dialogsRippleBg: string;
  dialogsRippleBgActive: string;

  dialogsForwardBg: string;
  dialogsForwardFg: string;

  searchedBarBg: string;
  searchedBarFg: string;


  topBarBg: string;

  emojiPanBg: string;
  emojiPanCategories: string;
  emojiPanHeaderFg: string;
  emojiPanHeaderBg: string;
  emojiIconFg: string;
  emojiIconFgActive: string;
  stickerPanDeleteBg: string;
  stickerPanDeleteFg: string;
  stickerPreviewBg: string;

  historyTextInFg: string;
  historyTextInFgSelected: string;
  historyTextOutFg: string;
  historyTextOutFgSelected: string;
  historyLinkInFg: string;
  historyLinkInFgSelected: string;
  historyLinkOutFg: string;
  historyLinkOutFgSelected: string;
  historyFileNameInFg: string;
  historyFileNameInFgSelected: string;
  historyFileNameOutFg: string;
  historyFileNameOutFgSelected: string;
  historyOutIconFg: string;
  historyOutIconFgSelected: string;
  historyIconFgInverted: string;
  historySendingOutIconFg: string;
  historySendingInIconFg: string;
  historySendingInvertedIconFg: string;
  historyCallArrowInFg: string;
  historyCallArrowInFgSelected: string;
  historyCallArrowMissedInFg: string;
  historyCallArrowMissedInFgSelected: string;
  historyCallArrowOutFg: string;
  historyCallArrowOutFgSelected: string;

  historyUnreadBarBg: string;
  historyUnreadBarBorder: string;
  historyUnreadBarFg: string;

  historyForwardChooseBg: string;
  historyForwardChooseFg: string;

  historyPeer1NameFg: string;
  historyPeer1NameFgSelected: string;
  historyPeer1UserpicBg: string;
  historyPeer2NameFg: string;
  historyPeer2NameFgSelected: string;
  historyPeer2UserpicBg: string;
  historyPeer3NameFg: string;
  historyPeer3NameFgSelected: string;
  historyPeer3UserpicBg: string;
  historyPeer4NameFg: string;
  historyPeer4NameFgSelected: string;
  historyPeer4UserpicBg: string;
  historyPeer5NameFg: string;
  historyPeer5NameFgSelected: string;
  historyPeer5UserpicBg: string;
  historyPeer6NameFg: string;
  historyPeer6NameFgSelected: string;
  historyPeer6UserpicBg: string;
  historyPeer7NameFg: string;
  historyPeer7NameFgSelected: string;
  historyPeer7UserpicBg: string;
  historyPeer8NameFg: string;
  historyPeer8NameFgSelected: string;
  historyPeer8UserpicBg: string;
  historyPeerUserpicFg: string;


  historyScrollBarBg: string;
  historyScrollBarBgOver: string;
  historyScrollBg: string;
  historyScrollBgOver: string;

  msgInBg: string;
  msgInBgSelected: string;
  msgOutBg: string;
  msgOutBgSelected: string;
  msgSelectOverlay: string;
  msgStickerOverlay: string;
  msgInServiceFg: string;
  msgInServiceFgSelected: string;
  msgOutServiceFg: string;
  msgOutServiceFgSelected: string;
  msgInShadow: string;
  msgInShadowSelected: string;
  msgOutShadow: string;
  msgOutShadowSelected: string;
  msgInDateFg: string;
  msgInDateFgSelected: string;
  msgOutDateFg: string;
  msgOutDateFgSelected: string;
  msgServiceFg: string;
  msgServiceBg: string;
  msgServiceBgSelected: string;
  msgInReplyBarColor: string;
  msgInReplyBarSelColor: string;
  msgOutReplyBarColor: string;
  msgOutReplyBarSelColor: string;
  msgImgReplyBarColor: string;
  msgInMonoFg: string;
  msgOutMonoFg: string;
  msgInMonoFgSelected: string;
  msgOutMonoFgSelected: string;
  msgDateImgFg: string;
  msgDateImgBg: string;
  msgDateImgBgOver: string;
  msgDateImgBgSelected: string;

  msgFileThumbLinkInFg: string;
  msgFileThumbLinkInFgSelected: string;
  msgFileThumbLinkOutFg: string;
  msgFileThumbLinkOutFgSelected: string;
  msgFileInBg: string;
  msgFileInBgOver: string;
  msgFileInBgSelected: string;
  msgFileOutBg: string;
  msgFileOutBgOver: string;
  msgFileOutBgSelected: string;

  msgFile1Bg: string;
  msgFile1BgDark: string;
  msgFile1BgOver: string;
  msgFile1BgSelected: string;
  msgFile2Bg: string;
  msgFile2BgDark: string;
  msgFile2BgOver: string;
  msgFile2BgSelected: string;
  msgFile3Bg: string;
  msgFile3BgDark: string;
  msgFile3BgOver: string;
  msgFile3BgSelected: string;
  msgFile4Bg: string;
  msgFile4BgDark: string;
  msgFile4BgOver: string;
  msgFile4BgSelected: string;

  historyFileInIconFg: string;
  historyFileInIconFgSelected: string;
  historyFileInRadialFg: string;
  historyFileInRadialFgSelected: string;
  historyFileOutIconFg: string;
  historyFileOutIconFgSelected: string;
  historyFileOutRadialFg: string;
  historyFileOutRadialFgSelected: string;
  historyFileThumbIconFg: string;
  historyFileThumbIconFgSelected: string;
  historyFileThumbRadialFg: string;
  historyFileThumbRadialFgSelected: string;

  historyVideoMessageProgressFg: string;

  msgWaveformInActive: string;
  msgWaveformInActiveSelected: string;
  msgWaveformInInactive: string;
  msgWaveformInInactiveSelected: string;
  msgWaveformOutActive: string;
  msgWaveformOutActiveSelected: string;
  msgWaveformOutInactive: string;
  msgWaveformOutInactiveSelected: string;

  msgBotKbOverBgAdd: string;
  msgBotKbIconFg: string;
  msgBotKbRippleBg: string;

  mediaInFg: string;
  mediaInFgSelected: string;
  mediaOutFg: string;
  mediaOutFgSelected: string;

  youtubePlayIconBg: string;
  youtubePlayIconFg: string;
  videoPlayIconBg: string;
  videoPlayIconFg: string;
  toastBg: string;
  toastFg: string;

  reportSpamBg: string;
  reportSpamFg: string;

  historyToDownBg: string;
  historyToDownBgOver: string;
  historyToDownBgRipple: string;
  historyToDownFg: string;
  historyToDownFgOver: string;
  historyToDownShadow: string;

  historyComposeAreaBg: string;
  historyComposeAreaFg: string;
  historyComposeAreaFgService: string;
  historyComposeIconFg: string;
  historyComposeIconFgOver: string;
  historySendIconFg: string;
  historySendIconFgOver: string;
  historyPinnedBg: string;
  historyReplyBg: string;
  historyReplyIconFg: string;
  historyReplyCancelFg: string;
  historyReplyCancelFgOver: string;

  historyComposeButtonBg: string;
  historyComposeButtonBgOver: string;
  historyComposeButtonBgRipple: string;


  overviewCheckBg: string;
  overviewCheckBgActive: string;
  overviewCheckBorder: string;
  overviewCheckFg: string;
  overviewCheckFgActive: string;
  overviewPhotoSelectOverlay: string;


  profileStatusFgOver: string;
  profileVerifiedCheckBg: string;
  profileVerifiedCheckFg: string;
  profileAdminStartFg: string;
  profileAdminStarFgOver: string;
  profileOtherAdminStarFg: string;
  profileOtherAdminStarFgOver: string;


  notificationsBoxMonitorFg: string;
  notificationsBoxScreenBg: string;

  notificationSampleUserpicFg: string;
  notificationSampleCloseFg: string;
  notificationSampleTextFg: string;
  notificationSampleNameFg: string;

  changePhoneSimcardFrom: string;
  changePhoneSimcardTo: string;

  mainMenuBg: string;
  mainMenuCoverBg: string;
  mainMenuCoverFg: string;
  mainMenuCloudFg: string;
  mainMenuCloudBg: string;

  mediaPlayerBg: string;
  mediaPlayerActiveFg: string;
  mediaPlayerInactiveFg: string;
  mediaPlayerDisabledFg: string;




  mediaviewFileBg: string;


  mediaviewFileNameFg: string;
  mediaviewFileSizeFg: string;
  mediaviewFileRedCornerFg: string;
  mediaviewFileYellowCornerFg: string;
  mediaviewFileGreenCornerFg: string;
  mediaviewFileBlueCornerFg: string;
  mediaviewFileExtFg: string;

  mediaviewMenuBg: string;
  mediaviewMenuBgOver: string;
  mediaviewMenuBgRipple: string;
  mediaviewMenuFg: string;

  mediaviewBg: string;
  mediaviewVideoBg: string;
  mediaviewControlBg: string;
  mediaviewControlFg: string;
  mediaviewCaptionBg: string;
  mediaviewCaptionFg: string;
  mediaviewTextLinkFg: string;
  mediaviewSaveMsgBg: string;
  mediaviewSaveMsgFg: string;

  mediaviewPlaybackActive: string;
  mediaviewPlaybackInactive: string;
  mediaviewPlaybackActiveOver: string;
  mediaviewPlaybackInactiveOver: string;
  mediaviewPlaybackProgressFg: string;
  mediaviewPlaybackIconFg: string;
  mediaviewPlaybackIconFgOver: string;
  mediaviewTransparentBg: string;
  mediaviewTransparentFg: string;


  notificationBg: string;


  callBg: string;
  callNameFg: string;
  callFingerprintBg: string;
  callStatusFg: string;
  callIconFg: string;
  callAnswerBg: string;
  callAnswerRipple: string;
  callAnswerBgOuter: string;
  callHangupBg: string;
  callHangupRipple: string;
  callCancelBg: string;
  callCancelFg: string;
  callCancelRipple: string;
  callMuteRipple: string;

  callBarBg: string;
  callBarMuteRipple: string;
  callBarBgMuted: string;
  callBarUnmuteRipple: string;
  callBarFg: string;

  importantTooltipBg: string;
  importantTooltipFg: string;
  importantTooltipFgLink: string;
}

export interface Themeable {
  theme: Theme;
}

export type RawTheme = {
  meta: {
    backgroundImage?: string,
    builtin?: boolean,
    nightMode?: boolean,
  },
  pairs: InputPair[],
};

