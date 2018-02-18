import Color from 'helpers/ColorSchemaParser/color-value'
import { InputPair } from 'helpers/ColorSchemaParser/map-links'

const pairs: InputPair[] = [
  ['windowBg', [new Color([40, 46, 51, 255])]],
  ['windowFg', [new Color([245, 245, 245, 255])]],
  ['windowBgOver', [new Color([49, 59, 67, 255])]],
  ['windowBgRipple', [new Color([63, 72, 80, 255])]],
  ['windowFgOver', [new Color([233, 236, 240, 255])]],
  ['windowSubTextFg', [new Color([130, 134, 138, 255])]],
  ['windowSubTextFgOver', [new Color([121, 123, 127, 255])]],
  ['windowBoldFg', [new Color([233, 232, 232, 255])]],
  ['windowBoldFgOver', [new Color([233, 233, 233, 255])]],
  ['windowBgActive', [new Color([63, 193, 176, 255])]],
  ['windowFgActive', [new Color([255, 255, 255, 255])]],
  ['windowActiveTextFg', [new Color([75, 225, 195, 255])]],
  ['windowShadowFg', [new Color([0, 0, 0, 255])]],
  ['windowShadowFgFallback', ['windowBg']],
  ['shadowFg', [new Color([0, 0, 0, 24])]],
  ['slideFadeOutBg', [new Color([0, 0, 0, 60])]],
  ['slideFadeOutShadowFg', ['windowShadowFg']],
  ['imageBg', [new Color([0, 0, 0, 255])]],
  ['imageBgTransparent', [new Color([255, 255, 255, 255])]],
  ['activeButtonBg', [new Color([45, 161, 146, 255])]],
  ['activeButtonBgOver', [new Color([50, 168, 152, 255])]],
  ['activeButtonBgRipple', [new Color([66, 184, 168, 255])]],
  ['activeButtonFg', [new Color([255, 255, 255, 255])]],
  ['activeButtonFgOver', [new Color([255, 255, 255, 255])]],
  ['activeButtonSecondaryFg', [new Color([142, 228, 217, 255])]],
  ['activeButtonSecondaryFgOver', ['activeButtonSecondaryFg']],
  ['activeLineFg', [new Color([62, 226, 204, 255])]],
  ['activeLineFgError', [new Color([245, 120, 120, 255])]],
  ['lightButtonBg', [new Color([40, 46, 51, 255])]],
  ['lightButtonBgOver', [new Color([49, 59, 67, 255])]],
  ['lightButtonBgRipple', [new Color([60, 71, 79, 255])]],
  ['lightButtonFg', [new Color([121, 232, 218, 255])]],
  ['lightButtonFgOver', ['lightButtonFg']],
  ['attentionButtonFg', [new Color([245, 116, 116, 255])]],
  ['attentionButtonFgOver', [new Color([231, 96, 96, 255])]],
  ['attentionButtonBgOver', [new Color([97, 58, 58, 100])]],
  ['attentionButtonBgRipple', [new Color([244, 195, 194, 255])]],
  ['outlineButtonBg', ['windowBg']],
  ['outlineButtonBgOver', [new Color([49, 59, 67, 255])]],
  ['outlineButtonOutlineFg', [new Color([41, 186, 167, 255])]],
  ['outlineButtonBgRipple', [new Color([60, 71, 79, 255])]],
  ['menuBg', [new Color([40, 46, 51, 255])]],
  ['menuBgOver', [new Color([255, 255, 255, 255])]],
  ['menuBgRipple', [new Color([38, 41, 45, 255])]],
  ['menuIconFg', [new Color([128, 128, 128, 255])]],
  ['menuIconFgOver', [new Color([220, 220, 220, 255])]],
  ['menuSubmenuArrowFg', [new Color([117, 117, 117, 255])]],
  ['menuFgDisabled', [new Color([115, 115, 115, 255])]],
  ['menuSeparatorFg', [new Color([66, 72, 77, 255])]],
  ['scrollBarBg', [new Color([255, 255, 255, 83])]],
  ['scrollBarBgOver', [new Color([255, 255, 255, 122])]],
  ['scrollBg', [new Color([255, 255, 255, 26])]],
  ['scrollBgOver', [new Color([255, 255, 255, 44])]],
  ['smallCloseIconFg', [new Color([109, 109, 109, 255])]],
  ['smallCloseIconFgOver', [new Color([163, 163, 163, 255])]],
  ['radialFg', ['windowFgActive']],
  ['radialBg', [new Color([0, 0, 0, 86])]],
  ['placeholderFg', [new Color([129, 137, 145, 255])]],
  ['placeholderFgActive', [new Color([93, 97, 101, 255])]],
  ['inputBorderFg', [new Color([111, 111, 111, 255])]],
  ['filterInputBorderFg', [new Color([61, 68, 75, 255])]],
  ['filterInputInactiveBg', [new Color([61, 68, 75, 255])]],
  ['checkboxFg', [new Color([108, 108, 108, 255])]],
  ['sliderBgInactive', [new Color([84, 84, 84, 255])]],
  ['sliderBgActive', ['windowBgActive']],
  ['tooltipBg', [new Color([212, 218, 221, 255])]],
  ['tooltipFg', [new Color([154, 158, 156, 255])]],
  ['tooltipBorderFg', [new Color([201, 209, 219, 255])]],
  ['titleShadow', [new Color([0, 0, 0, 3])]],
  ['titleBg', [new Color([58, 64, 71, 255])]],
  ['titleBgActive', ['titleBg']],
  ['titleButtonBg', ['titleBg']],
  ['titleButtonFg', [new Color([139, 144, 150, 255])]],
  ['titleButtonBgOver', [new Color([76, 83, 91, 255])]],
  ['titleButtonFgOver', [new Color([224, 224, 224, 255])]],
  ['titleButtonBgActive', ['titleButtonBg']],
  ['titleButtonFgActive', ['titleButtonFg']],
  ['titleButtonBgActiveOver', ['titleButtonBgOver']],
  ['titleButtonFgActiveOver', ['titleButtonFgOver']],
  ['titleButtonCloseBg', ['titleButtonBg']],
  ['titleButtonCloseFg', ['titleButtonFg']],
  ['titleButtonCloseBgOver', [new Color([232, 17, 35, 255])]],
  ['titleButtonCloseFgOver', ['windowFgActive']],
  ['titleButtonCloseBgActive', ['titleButtonCloseBg']],
  ['titleButtonCloseFgActive', ['titleButtonCloseFg']],
  ['titleButtonCloseBgActiveOver', ['titleButtonCloseBgOver']],
  ['titleButtonCloseFgActiveOver', ['titleButtonCloseFgOver']],
  ['titleFg', [new Color([102, 102, 102, 255])]],
  ['titleFgActive', [new Color([128, 128, 128, 255])]],
  ['trayCounterBg', [new Color([242, 60, 52, 255])]],
  ['trayCounterBgMute', [new Color([136, 136, 136, 255])]],
  ['trayCounterFg', [new Color([255, 255, 255, 255])]],
  ['trayCounterBgMacInvert', [new Color([255, 255, 255, 255])]],
  ['trayCounterFgMacInvert', [new Color([255, 255, 255, 1])]],
  ['layerBg', [new Color([0, 0, 0, 127])]],
  ['cancelIconFg', [new Color([102, 102, 102, 255])]],
  ['cancelIconFgOver', [new Color([220, 220, 220, 255])]],
  ['boxBg', ['windowBg']],
  ['boxTextFg', ['windowFg']],
  ['boxTextFgGood', [new Color([86, 219, 206, 255])]],
  ['boxTextFgError', [new Color([216, 77, 77, 255])]],
  ['boxTitleFg', [new Color([235, 235, 235, 255])]],
  ['boxSearchBg', [new Color([40, 46, 51, 255])]],
  ['boxTitleAdditionalFg', [new Color([128, 128, 128, 255])]],
  ['boxTitleCloseFg', ['cancelIconFg']],
  ['boxTitleCloseFgOver', ['cancelIconFgOver']],
  ['membersAboutLimitFg', [new Color([94, 96, 101, 255])]],
  ['contactsBg', [new Color([34, 37, 40, 255])]],
  ['contactsBgOver', [new Color([40, 46, 51, 255])]],
  ['contactsNameFg', ['boxTextFg']],
  ['contactsStatusFg', [new Color([128, 128, 128, 255])]],
  ['contactsStatusFgOver', [new Color([128, 128, 128, 255])]],
  ['contactsStatusFgOnline', [new Color([85, 225, 211, 255])]],
  ['photoCropFadeBg', ['layerBg']],
  ['photoCropPointFg', [new Color([255, 255, 255, 127])]],
  ['callArrowFg', [new Color([43, 199, 184, 255])]],
  ['callArrowMissedFg', [new Color([221, 91, 74, 255])]],
  ['introBg', ['windowBg']],
  ['introTitleFg', [new Color([238, 238, 238, 255])]],
  ['introDescriptionFg', [new Color([153, 153, 153, 255])]],
  ['introErrorFg', [new Color([153, 153, 153, 255])]],
  ['introCoverTopBg', [new Color([24, 129, 115, 255])]],
  ['introCoverBottomBg', [new Color([24, 129, 115, 255])]],
  ['introCoverIconsFg', [new Color([52, 164, 149, 255])]],
  ['introCoverPlaneTrace', [new Color([50, 157, 143, 255])]],
  ['introCoverPlaneInner', [new Color([206, 217, 226, 255])]],
  ['introCoverPlaneOuter', [new Color([151, 169, 181, 255])]],
  ['introCoverPlaneTop', [new Color([255, 255, 255, 255])]],
  ['dialogsMenuIconFg', ['menuIconFg']],
  ['dialogsMenuIconFgOver', ['menuIconFgOver']],
  ['dialogsBg', ['windowBg']],
  ['dialogsNameFg', [new Color([245, 245, 245, 255])]],
  ['dialogsChatIconFg', ['dialogsNameFg']],
  ['dialogsDateFg', [new Color([109, 114, 124, 255])]],
  ['dialogsTextFg', [new Color([141, 147, 158, 255])]],
  ['dialogsTextFgService', [new Color([235, 235, 235, 255])]],
  ['dialogsDraftFg', [new Color([236, 102, 87, 255])]],
  ['dialogsVerifiedIconBg', [new Color([83, 237, 222, 255])]],
  ['dialogsVerifiedIconFg', [new Color([40, 46, 51, 255])]],
  ['dialogsSendingIconFg', [new Color([114, 114, 114, 255])]],
  ['dialogsSentIconFg', [new Color([32, 238, 218, 255])]],
  ['dialogsUnreadBg', [new Color([5, 160, 145, 255])]],
  ['dialogsUnreadBgMuted', [new Color([73, 81, 89, 255])]],
  ['dialogsUnreadFg', [new Color([255, 255, 255, 255])]],
  ['dialogsBgOver', [new Color([53, 60, 67, 255])]],
  ['dialogsNameFgOver', ['windowBoldFgOver']],
  ['dialogsChatIconFgOver', ['dialogsNameFgOver']],
  ['dialogsDateFgOver', [new Color([109, 114, 124, 255])]],
  ['dialogsTextFgOver', [new Color([163, 167, 174, 255])]],
  ['dialogsTextFgServiceOver', [new Color([240, 240, 240, 255])]],
  ['dialogsDraftFgOver', ['dialogsDraftFg']],
  ['dialogsVerifiedIconBgOver', [new Color([83, 237, 222, 255])]],
  ['dialogsVerifiedIconFgOver', ['dialogsVerifiedIconFg']],
  ['dialogsSendingIconFgOver', ['dialogsSendingIconFg']],
  ['dialogsSentIconFgOver', [new Color([65, 240, 223, 255])]],
  ['dialogsUnreadBgOver', [new Color([0, 150, 135, 255])]],
  ['dialogsUnreadBgMutedOver', [new Color([85, 94, 103, 255])]],
  ['dialogsUnreadFgOver', ['dialogsUnreadFg']],
  ['dialogsBgActive', [new Color([0, 150, 135, 255])]],
  ['dialogsNameFgActive', ['windowFgActive']],
  ['dialogsChatIconFgActive', ['dialogsNameFgActive']],
  ['dialogsDateFgActive', ['windowFgActive']],
  ['dialogsTextFgActive', ['windowFgActive']],
  ['dialogsTextFgServiceActive', ['dialogsTextFgActive']],
  ['dialogsDraftFgActive', [new Color([198, 247, 243, 255])]],
  ['dialogsVerifiedIconBgActive', ['dialogsTextFgActive']],
  ['dialogsVerifiedIconFgActive', ['dialogsBgActive']],
  ['dialogsSendingIconFgActive', [new Color([255, 255, 255, 153])]],
  ['dialogsSentIconFgActive', ['dialogsTextFgActive']],
  ['dialogsUnreadBgActive', ['dialogsTextFgActive']],
  ['dialogsUnreadBgMutedActive', [new Color([203, 247, 233, 255])]],
  ['dialogsUnreadFgActive', [new Color([3, 157, 142, 255])]],
  ['dialogsRippleBg', [new Color([67, 71, 77, 255])]],
  ['dialogsRippleBgActive', [new Color([18, 167, 152, 255])]],
  ['dialogsForwardBg', ['dialogsBgActive']],
  ['dialogsForwardFg', ['dialogsNameFgActive']],
  ['searchedBarBg', [new Color([58, 64, 71, 255])]],
  ['searchedBarFg', [new Color([168, 168, 168, 255])]],
  ['topBarBg', [new Color([40, 46, 51, 255])]],
  ['emojiPanBg', ['windowBg']],
  ['emojiPanCategories', [new Color([32, 38, 43, 255])]],
  ['emojiPanHeaderFg', [new Color([144, 148, 154, 255])]],
  ['emojiPanHeaderBg', [new Color([255, 255, 255, 242])]],
  ['stickerPanDeleteBg', [new Color([0, 0, 0, 204])]],
  ['stickerPanDeleteFg', ['windowFgActive']],
  ['stickerPreviewBg', [new Color([0, 0, 0, 176])]],
  ['historyTextInFg', ['windowFg']],
  ['historyTextInFgSelected', [new Color([255, 255, 255, 255])]],
  ['historyTextOutFg', [new Color([228, 236, 242, 255])]],
  ['historyTextOutFgSelected', [new Color([255, 255, 255, 255])]],
  ['historyLinkInFg', [new Color([55, 225, 203, 255])]],
  ['historyLinkInFgSelected', [new Color([167, 255, 244, 255])]],
  ['historyLinkOutFg', [new Color([55, 225, 203, 255])]],
  ['historyLinkOutFgSelected', [new Color([167, 255, 244, 255])]],
  ['historyFileNameInFg', ['historyTextInFg']],
  ['historyFileNameInFgSelected', [new Color([255, 255, 255, 255])]],
  ['historyFileNameOutFg', ['historyTextOutFg']],
  ['historyFileNameOutFgSelected', [new Color([255, 255, 255, 255])]],
  ['historyOutIconFg', [new Color([64, 230, 197, 255])]],
  ['historyOutIconFgSelected', [new Color([255, 255, 255, 255])]],
  ['historyIconFgInverted', [new Color([64, 230, 197, 255])]],
  ['historySendingOutIconFg', [new Color([158, 250, 206, 255])]],
  ['historySendingInIconFg', [new Color([118, 131, 139, 255])]],
  ['historySendingInvertedIconFg', [new Color([255, 255, 255, 200])]],
  ['historyCallArrowInFg', [new Color([38, 194, 173, 255])]],
  ['historyCallArrowInFgSelected', [new Color([255, 255, 255, 255])]],
  ['historyCallArrowMissedInFg', ['callArrowMissedFg']],
  ['historyCallArrowMissedInFgSelected', [new Color([255, 255, 255, 255])]],
  ['historyCallArrowOutFg', [new Color([255, 255, 255, 255])]],
  ['historyCallArrowOutFgSelected', [new Color([255, 255, 255, 255])]],
  ['historyUnreadBarBg', [new Color([51, 57, 63, 255])]],
  ['historyUnreadBarBorder', ['shadowFg']],
  ['historyUnreadBarFg', [new Color([60, 211, 191, 255])]],
  ['historyForwardChooseBg', [new Color([0, 0, 0, 76])]],
  ['historyForwardChooseFg', ['windowFgActive']],
  ['historyPeer1NameFg', [new Color([236, 117, 119, 255])]],
  ['historyPeer1NameFgSelected', [new Color([255, 255, 255, 255])]],
  ['historyPeer1UserpicBg', [new Color([225, 112, 118, 255])]],
  ['historyPeer2NameFg', [new Color([134, 214, 127, 255])]],
  ['historyPeer2NameFgSelected', [new Color([255, 255, 255, 255])]],
  ['historyPeer2UserpicBg', [new Color([123, 200, 98, 255])]],
  ['historyPeer3NameFg', [new Color([228, 192, 84, 255])]],
  ['historyPeer3NameFgSelected', [new Color([255, 255, 255, 255])]],
  ['historyPeer3UserpicBg', [new Color([204, 173, 79, 255])]],
  ['historyPeer4NameFg', [new Color([104, 199, 243, 255])]],
  ['historyPeer4NameFgSelected', [new Color([255, 255, 255, 255])]],
  ['historyPeer4UserpicBg', [new Color([101, 170, 221, 255])]],
  ['historyPeer5NameFg', [new Color([179, 131, 243, 255])]],
  ['historyPeer5NameFgSelected', [new Color([255, 255, 255, 255])]],
  ['historyPeer5UserpicBg', [new Color([166, 149, 231, 255])]],
  ['historyPeer6NameFg', [new Color([225, 103, 148, 255])]],
  ['historyPeer6NameFgSelected', [new Color([255, 255, 255, 255])]],
  ['historyPeer6UserpicBg', [new Color([238, 122, 174, 255])]],
  ['historyPeer7NameFg', [new Color([87, 201, 224, 255])]],
  ['historyPeer7NameFgSelected', [new Color([255, 255, 255, 255])]],
  ['historyPeer7UserpicBg', [new Color([110, 201, 203, 255])]],
  ['historyPeer8NameFg', [new Color([239, 176, 93, 255])]],
  ['historyPeer8NameFgSelected', [new Color([255, 255, 255, 255])]],
  ['historyPeer8UserpicBg', [new Color([237, 168, 108, 255])]],
  ['historyPeerUserpicFg', ['windowFgActive']],
  ['historyScrollBarBg', [new Color([137, 137, 137, 122])]],
  ['historyScrollBarBgOver', [new Color([107, 107, 107, 188])]],
  ['historyScrollBg', [new Color([95, 95, 95, 76])]],
  ['historyScrollBgOver', [new Color([98, 98, 98, 107])]],
  ['msgInBg', [new Color([51, 57, 63, 255])]],
  ['msgInBgSelected', [new Color([0, 150, 135, 255])]],
  ['msgOutBg', [new Color([42, 47, 51, 255])]],
  ['msgOutBgSelected', [new Color([0, 150, 135, 255])]],
  ['msgSelectOverlay', [new Color([53, 212, 191, 76])]],
  ['msgStickerOverlay', [new Color([53, 212, 191, 127])]],
  ['msgInServiceFg', ['windowActiveTextFg']],
  ['msgInServiceFgSelected', [new Color([255, 255, 255, 255])]],
  ['msgOutServiceFg', [new Color([96, 229, 203, 255])]],
  ['msgOutServiceFgSelected', [new Color([255, 255, 255, 255])]],
  ['msgInShadow', [new Color([116, 142, 162, 0])]],
  ['msgInShadowSelected', [new Color([83, 142, 187, 0])]],
  ['msgOutShadow', [new Color([0, 0, 0, 0])]],
  ['msgOutShadowSelected', [new Color([55, 167, 141, 0])]],
  ['msgInDateFg', [new Color([130, 141, 148, 255])]],
  ['msgInDateFgSelected', [new Color([255, 255, 255, 255])]],
  ['msgOutDateFg', [new Color([115, 127, 135, 255])]],
  ['msgOutDateFgSelected', [new Color([255, 255, 255, 255])]],
  ['msgServiceFg', ['windowFgActive']],
  ['msgServiceBg', [new Color([54, 60, 67, 200])]],
  ['msgServiceBgSelected', [new Color([0, 150, 135, 255])]],
  ['msgInReplyBarColor', [new Color([50, 206, 185, 255])]],
  ['msgInReplyBarSelColor', [new Color([255, 255, 255, 255])]],
  ['msgOutReplyBarColor', [new Color([50, 206, 185, 255])]],
  ['msgOutReplyBarSelColor', [new Color([255, 255, 255, 255])]],
  ['msgImgReplyBarColor', ['msgServiceFg']],
  ['msgInMonoFg', [new Color([90, 171, 160, 255])]],
  ['msgOutMonoFg', [new Color([194, 242, 236, 255])]],
  ['msgInMonoFgSelected', [new Color([167, 255, 244, 255])]],
  ['msgOutMonoFgSelected', [new Color([201, 255, 248, 255])]],
  ['msgDateImgFg', ['msgServiceFg']],
  ['msgDateImgBg', [new Color([0, 0, 0, 84])]],
  ['msgDateImgBgOver', [new Color([0, 0, 0, 116])]],
  ['msgDateImgBgSelected', [new Color([28, 112, 101, 135])]],
  ['msgFileThumbLinkInFg', ['lightButtonFg']],
  ['msgFileThumbLinkInFgSelected', ['lightButtonFgOver']],
  ['msgFileThumbLinkOutFg', [new Color([96, 229, 203, 255])]],
  ['msgFileThumbLinkOutFgSelected', [new Color([255, 255, 255, 255])]],
  ['msgFileInBg', [new Color([80, 212, 195, 255])]],
  ['msgFileInBgOver', [new Color([72, 207, 189, 255])]],
  ['msgFileInBgSelected', [new Color([255, 255, 255, 255])]],
  ['msgFileOutBg', [new Color([17, 191, 171, 255])]],
  ['msgFileOutBgOver', [new Color([255, 255, 255, 255])]],
  ['msgFileOutBgSelected', [new Color([255, 255, 255, 255])]],
  ['msgFile1Bg', [new Color([63, 187, 171, 255])]],
  ['msgFile1BgDark', [new Color([38, 159, 143, 255])]],
  ['msgFile1BgOver', [new Color([82, 196, 181, 255])]],
  ['msgFile1BgSelected', [new Color([255, 255, 255, 255])]],
  ['msgFile2Bg', [new Color([142, 245, 232, 255])]],
  ['msgFile2BgDark', [new Color([126, 247, 231, 255])]],
  ['msgFile2BgOver', [new Color([141, 247, 233, 255])]],
  ['msgFile2BgSelected', [new Color([255, 255, 255, 255])]],
  ['msgFile3Bg', [new Color([228, 114, 114, 255])]],
  ['msgFile3BgDark', [new Color([205, 91, 94, 255])]],
  ['msgFile3BgOver', [new Color([195, 81, 84, 255])]],
  ['msgFile3BgSelected', [new Color([159, 106, 130, 255])]],
  ['msgFile4Bg', [new Color([239, 194, 116, 255])]],
  ['msgFile4BgDark', [new Color([230, 165, 97, 255])]],
  ['msgFile4BgOver', [new Color([220, 156, 90, 255])]],
  ['msgFile4BgSelected', [new Color([177, 157, 132, 255])]],
  ['historyFileInIconFg', [new Color([51, 57, 63, 255])]],
  ['historyFileInIconFgSelected', [new Color([0, 150, 135, 255])]],
  ['historyFileInRadialFg', [new Color([51, 57, 63, 255])]],
  ['historyFileInRadialFgSelected', ['historyFileInIconFgSelected']],
  ['historyFileOutIconFg', [new Color([51, 57, 63, 255])]],
  ['historyFileOutIconFgSelected', [new Color([0, 150, 135, 255])]],
  ['historyFileOutRadialFg', ['historyFileOutIconFg']],
  ['historyFileOutRadialFgSelected', [new Color([0, 150, 135, 255])]],
  ['historyFileThumbIconFg', [new Color([239, 239, 239, 255])]],
  ['historyFileThumbIconFgSelected', [new Color([255, 255, 255, 255])]],
  ['historyFileThumbRadialFg', ['historyFileThumbIconFg']],
  ['historyFileThumbRadialFgSelected', [new Color([255, 255, 255, 255])]],
  ['historyVideoMessageProgressFg', ['historyFileThumbIconFg']],
  ['msgWaveformInActive', ['windowBgActive']],
  ['msgWaveformInActiveSelected', [new Color([255, 255, 255, 255])]],
  ['msgWaveformInInactive', [new Color([93, 107, 118, 255])]],
  ['msgWaveformInInactiveSelected', [new Color([65, 209, 192, 255])]],
  ['msgWaveformOutActive', [new Color([17, 191, 171, 255])]],
  ['msgWaveformOutActiveSelected', [new Color([255, 255, 255, 255])]],
  ['msgWaveformOutInactive', [new Color([89, 104, 116, 255])]],
  ['msgWaveformOutInactiveSelected', [new Color([65, 209, 192, 255])]],
  ['msgBotKbOverBgAdd', [new Color([255, 255, 255, 20])]],
  ['msgBotKbIconFg', ['msgServiceFg']],
  ['msgBotKbRippleBg', [new Color([158, 157, 157, 16])]],
  ['mediaInFg', ['msgInDateFg']],
  ['mediaInFgSelected', ['msgInDateFgSelected']],
  ['mediaOutFg', ['msgOutDateFg']],
  ['mediaOutFgSelected', ['msgOutDateFgSelected']],
  ['youtubePlayIconBg', [new Color([232, 49, 49, 200])]],
  ['youtubePlayIconFg', ['windowFgActive']],
  ['videoPlayIconBg', [new Color([0, 0, 0, 127])]],
  ['videoPlayIconFg', [new Color([255, 255, 255, 255])]],
  ['toastBg', [new Color([0, 0, 0, 178])]],
  ['toastFg', ['windowFgActive']],
  ['reportSpamBg', [new Color([54, 60, 66, 255])]],
  ['reportSpamFg', [new Color([60, 66, 72, 255])]],
  ['historyToDownBg', [new Color([67, 77, 87, 255])]],
  ['historyToDownBgOver', [new Color([81, 91, 101, 255])]],
  ['historyToDownBgRipple', [new Color([99, 109, 119, 255])]],
  ['historyToDownFg', [new Color([173, 180, 186, 255])]],
  ['historyToDownFgOver', ['menuIconFgOver']],
  ['historyToDownShadow', [new Color([0, 0, 0, 64])]],
  ['historyComposeAreaBg', [new Color([40, 46, 51, 255])]],
  ['historyComposeAreaFg', ['historyTextInFg']],
  ['historyComposeAreaFgService', ['msgInDateFg']],
  ['historyComposeIconFg', ['menuIconFg']],
  ['historyComposeIconFgOver', ['menuIconFgOver']],
  ['historySendIconFg', ['windowBgActive']],
  ['historySendIconFgOver', ['windowBgActive']],
  ['historyPinnedBg', ['historyComposeAreaBg']],
  ['historyReplyBg', ['historyComposeAreaBg']],
  ['historyReplyIconFg', ['windowBgActive']],
  ['historyReplyCancelFg', ['cancelIconFg']],
  ['historyReplyCancelFgOver', ['cancelIconFgOver']],
  ['historyComposeButtonBg', ['historyComposeAreaBg']],
  ['historyComposeButtonBgOver', [new Color([49, 54, 60, 255])]],
  ['historyComposeButtonBgRipple', [new Color([39, 43, 47, 255])]],
  ['overviewCheckBg', [new Color([0, 0, 0, 64])]],
  ['overviewCheckFg', [new Color([255, 255, 255, 255])]],
  ['overviewCheckFgActive', [new Color([255, 255, 255, 255])]],
  ['overviewPhotoSelectOverlay', [new Color([64, 172, 227, 51])]],
  ['profileStatusFgOver', [new Color([156, 156, 156, 255])]],
  ['profileVerifiedCheckBg', ['windowBgActive']],
  ['profileVerifiedCheckFg', ['windowFgActive']],
  ['profileAdminStartFg', ['windowBgActive']],
  ['notificationsBoxMonitorFg', ['windowFg']],
  ['notificationsBoxScreenBg', ['dialogsBgActive']],
  ['notificationSampleUserpicFg', ['windowBgActive']],
  ['notificationSampleCloseFg', [new Color([215, 215, 215, 255])]],
  ['notificationSampleTextFg', [new Color([215, 215, 215, 255])]],
  ['notificationSampleNameFg', [new Color([147, 147, 147, 255])]],
  ['changePhoneSimcardFrom', ['notificationSampleTextFg']],
  ['changePhoneSimcardTo', ['notificationSampleNameFg']],
  ['mainMenuBg', ['windowBg']],
  ['mainMenuCoverBg', [new Color([0, 150, 135, 255])]],
  ['mainMenuCoverFg', ['windowFgActive']],
  ['mainMenuCloudFg', ['activeButtonFg']],
  ['mainMenuCloudBg', [new Color([14, 131, 127, 255])]],
  ['mediaPlayerBg', ['windowBg']],
  ['mediaPlayerActiveFg', ['windowBgActive']],
  ['mediaPlayerInactiveFg', ['sliderBgInactive']],
  ['mediaPlayerDisabledFg', [new Color([157, 209, 239, 255])]],
  ['mediaviewFileBg', ['windowBg']],
  ['mediaviewFileNameFg', ['windowFg']],
  ['mediaviewFileSizeFg', ['windowSubTextFg']],
  ['mediaviewFileRedCornerFg', [new Color([213, 89, 89, 255])]],
  ['mediaviewFileYellowCornerFg', [new Color([232, 166, 89, 255])]],
  ['mediaviewFileGreenCornerFg', [new Color([73, 169, 87, 255])]],
  ['mediaviewFileBlueCornerFg', [new Color([89, 157, 207, 255])]],
  ['mediaviewFileExtFg', ['activeButtonFg']],
  ['mediaviewMenuBg', [new Color([56, 56, 56, 255])]],
  ['mediaviewMenuBgOver', [new Color([80, 80, 80, 255])]],
  ['mediaviewMenuBgRipple', [new Color([103, 103, 103, 255])]],
  ['mediaviewMenuFg', ['windowFgActive']],
  ['mediaviewBg', [new Color([34, 34, 34, 235])]],
  ['mediaviewVideoBg', ['imageBg']],
  ['mediaviewControlBg', [new Color([0, 0, 0, 60])]],
  ['mediaviewControlFg', ['windowFgActive']],
  ['mediaviewCaptionBg', [new Color([17, 17, 17, 128])]],
  ['mediaviewCaptionFg', ['mediaviewControlFg']],
  ['mediaviewTextLinkFg', [new Color([102, 247, 228, 255])]],
  ['mediaviewSaveMsgBg', ['toastBg']],
  ['mediaviewSaveMsgFg', ['toastFg']],
  ['mediaviewPlaybackActive', [new Color([199, 199, 199, 255])]],
  ['mediaviewPlaybackInactive', [new Color([37, 37, 37, 255])]],
  ['mediaviewPlaybackActiveOver', [new Color([255, 255, 255, 255])]],
  ['mediaviewPlaybackInactiveOver', [new Color([71, 71, 71, 255])]],
  ['mediaviewPlaybackProgressFg', [new Color([255, 255, 255, 199])]],
  ['mediaviewPlaybackIconFg', ['mediaviewPlaybackActive']],
  ['mediaviewPlaybackIconFgOver', ['mediaviewPlaybackActiveOver']],
  ['mediaviewTransparentBg', [new Color([255, 255, 255, 255])]],
  ['mediaviewTransparentFg', [new Color([204, 204, 204, 255])]],
  ['notificationBg', ['windowBg']],
  ['callBg', [new Color([38, 40, 44, 242])]],
  ['callNameFg', [new Color([255, 255, 255, 255])]],
  ['callFingerprintBg', [new Color([0, 0, 0, 102])]],
  ['callStatusFg', [new Color([170, 171, 172, 255])]],
  ['callIconFg', [new Color([255, 255, 255, 255])]],
  ['callAnswerBg', [new Color([90, 209, 193, 255])]],
  ['callAnswerRipple', [new Color([66, 194, 177, 255])]],
  ['callAnswerBgOuter', [new Color([63, 235, 201, 38])]],
  ['callHangupBg', [new Color([215, 90, 90, 255])]],
  ['callHangupRipple', [new Color([192, 70, 70, 255])]],
  ['callCancelBg', [new Color([255, 255, 255, 255])]],
  ['callCancelFg', [new Color([119, 119, 119, 255])]],
  ['callCancelRipple', [new Color([241, 241, 241, 255])]],
  ['callMuteRipple', [new Color([255, 255, 255, 18])]],
  ['callBarBg', ['dialogsBgActive']],
  ['callBarMuteRipple', ['dialogsRippleBgActive']],
  ['callBarBgMuted', [new Color([143, 143, 143, 255])]],
  ['callBarUnmuteRipple', [new Color([127, 127, 127, 255])]],
  ['callBarFg', ['dialogsNameFgActive']],
  ['importantTooltipBg', ['toastBg']],
  ['importantTooltipFg', ['toastFg']],
  ['importantTooltipFgLink', [new Color([101, 252, 232, 255])]],
  ['filterInputActiveBg', [new Color([61, 68, 75, 255])]],
  ['botKbBg', [new Color([61, 68, 75, 255])]],
  ['botKbDownBg', [new Color([73, 79, 85, 255])]],
  ['emojiIconFg', [new Color([108, 114, 120, 255])]],
  ['emojiIconFgActive', [new Color([54, 205, 185, 255])]],
  ['overviewCheckBorder', [new Color([228, 234, 239, 255])]],
]

export default {
  meta: {
    backgroundImage: require('./tiled.jpg'),
    builtin: true,
    nightMode: true,
  },

  pairs,
}
