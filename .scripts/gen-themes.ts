import { map, pipe } from 'ramda';
import * as ts from 'typescript';
import { parser } from '../src/app/helpers/ColorSchemaParser';
import Color from '../src/app/helpers/ColorSchemaParser/color-value';
import { InputPair } from '../src/app/helpers/ColorSchemaParser/map-links';

const createExportAssignment = (node: ts.Expression) => ts.createExportAssignment(
  [],
  [],
  false,
  node,
);

const createPropertyAssignment = (name: string, initializer: ts.Expression) => ts.createPropertyAssignment(
  name,
  initializer,
);

const createArrayLiteral = (elements: ts.Expression[]) => ts.createArrayLiteral(
  ts.createNodeArray(elements, true),
  true,
);

const createDefaultExportedObject = pipe(
  createArrayLiteral,
  createExportAssignment,
);

const createTheme = pipe(
  parser,
  map((v: InputPair) => createArrayLiteral([
    ts.createLiteral(v[0]),
    createArrayLiteral(v[1].map(c => c instanceof Color
      ? ts.createNew(
          ts.createIdentifier('Color'),
          [],
          // tslint:disable-next-line
          [createArrayLiteral(Array.from((c as any).data).map(ts.createLiteral))])
      : ts.createLiteral(c))),
  ])),
);

const example = `
windowBg: #282e33; // white: fallback for background
windowFg: #f5f5f5; // black: fallback for text
windowBgOver: #313b43; // light gray: fallback for background with mouse over
windowBgRipple: #3f4850; // darker gray: fallback for ripple effect
windowFgOver: #e9ecf0; // black: fallback for text with mouse over
windowSubTextFg: #82868a; // gray: fallback for additional text
windowSubTextFgOver: #797b7f; // darker gray: fallback for additional text with mouse over
windowBoldFg: #e9e8e8; // dark gray: fallback for bold text
windowBoldFgOver: #e9e9e9; // dark gray: fallback for bold text with mouse over
windowBgActive: #3fc1b0; // bright blue: fallback for blue filled active areas
windowFgActive: #ffffff; // white: fallback for text on active areas
windowActiveTextFg: #4be1c3; // online blue: fallback for active text like online status
windowShadowFg: #000000; // black: fallback for shadow
windowShadowFgFallback: windowBg; // gray: fallback for shadow without opacity
shadowFg: #00000018; // most shadows (including opacity)
slideFadeOutBg: #0000003c; // slide animation (chat to profile) fade out filling
slideFadeOutShadowFg: windowShadowFg; // slide animation (chat to profile) fade out right section shadow
imageBg: #000000; // image background fallback (when photo size is less than minimum allowed)
imageBgTransparent: #ffffff; // image background when displaying an image with opacity where no opacity is needed
activeButtonBg: #2da192; // default active button background
activeButtonBgOver: #32a898; // default active button background with mouse over
activeButtonBgRipple: #42b8a8; // default active button ripple effect
activeButtonFg: #ffffff; // default active button text
activeButtonFgOver: #ffffff; // default active button text with mouse over
activeButtonSecondaryFg: #8ee4d9; // default active button additional text (selected messages counter in forward / delete buttons)
activeButtonSecondaryFgOver: activeButtonSecondaryFg; // default active button additional text with mouse over
activeLineFg: #3ee2cc; // default active line (like code input field bottom border when you log in and field is focused)
activeLineFgError: #f57878; // default active line for error state (like code input field bottom border when you log in and you've entered incorrect code)
lightButtonBg: #282e33; // default light button background (like buttons in boxes)
lightButtonBgOver: #313b43; // default light button background with mouse over
lightButtonBgRipple: #3c474f; // default light button ripple effect
lightButtonFg: #79e8da; // default light button text
lightButtonFgOver: lightButtonFg; // default light button text with mouse over
attentionButtonFg: #f57474; // default attention button text (like confirm button on log out)
attentionButtonFgOver: #e76060; // default attention button text with mouse over
attentionButtonBgOver: #613a3a64; // default attention button background with mouse over
attentionButtonBgRipple: #f4c3c2; // default attention button ripple effect
outlineButtonBg: windowBg; // default left outlined button background (like shared media links in profiles)
outlineButtonBgOver: #313b43; // default left outlined button background with mouse over
outlineButtonOutlineFg: #29baa7; // default left outlined button left outline border
outlineButtonBgRipple: #3c474f; // default left outlined button ripple effect
menuBg: #282e33; // default popup menu background
menuBgOver: #ffffff; // default popup menu item background with mouse over
menuBgRipple: #26292d; // default popup menu item ripple effect
menuIconFg: #808080; // default popup menu item icon (like main menu)
menuIconFgOver: #dcdcdc; // default popup menu item icon with mouse over
menuSubmenuArrowFg: #757575; // default popup menu submenu arrow icon (like in message field context menu in case of RTL system language)
menuFgDisabled: #737373; // default popup menu item disabled text (like unavailable items in message field context menu)
menuSeparatorFg: #42484d; // default popup menu separator (like in message field context menu)
scrollBarBg: #ffffff53; // default scroll bar current rectangle, the bar itself (like in chats list)
scrollBarBgOver: #ffffff7a; // default scroll bar current rectangle with mouse over it
scrollBg: #ffffff1a; // default scroll bar background
scrollBgOver: #ffffff2c; // default scroll bar background with mouse over the scroll bar
smallCloseIconFg: #6d6d6d; // small X icon (like in Show all sessions box to the right for sessions termination)
smallCloseIconFgOver: #a3a3a3; // small X icon with mouse over
radialFg: windowFgActive; // default radial loader line (like in Media Viewer when loading a photo)
radialBg: #00000056; // default radial loader background (like in Media Viewer when loading a photo)
placeholderFg: #818991; // default input field placeholder when field is not focused (like in phone input field when you log in)
placeholderFgActive: #5d6165; // default input field placeholder when field is focused
inputBorderFg: #6f6f6f; // default input field bottom border (like in code input field when you log in and field is not focused)
filterInputBorderFg: #3d444b; // default rounded input field border (like in chats list search field when field is focused)
filterInputInactiveBg: #3d444b; // default rounded input field background (like in chats list search field when field is inactive)
checkboxFg: #6c6c6c; // default unchecked checkbox rounded rectangle (and also emoji category icons)
sliderBgInactive: #545454; // default slider not active bar (like in Settings when you choose interface scale or custom notifications count)
sliderBgActive: windowBgActive; // default slider active bar (like in Settings when you choose interface scale or custom notifications count)
tooltipBg: #d4dadd; // tooltip background (like when you put mouse over the message timestamp and wait)
tooltipFg: #9a9e9c; // tooltip text
tooltipBorderFg: #c9d1db; // tooltip border
titleShadow: #00000003; // one pixel line shadow at the bottom of custom window title
titleBg: #3a4047; // custom window title background when window is inactive
titleBgActive: titleBg; // custom window title background when window is active
titleButtonBg: titleBg; // custom window title minimize/maximize/restore button background when window is inactive (Windows only)
titleButtonFg: #8b9096; // custom window title minimize/maximize/restore button icon when window is inactive (Windows only)
titleButtonBgOver: #4c535b; // custom window title minimize/maximize/restore button background with mouse over when window is inactive (Windows only)
titleButtonFgOver: #e0e0e0; // custom window title minimize/maximize/restore button icon with mouse over when window is inactive (Windows only)
titleButtonBgActive: titleButtonBg; // custom window title minimize/maximize/restore button background when window is active (Windows only)
titleButtonFgActive: titleButtonFg; // custom window title minimize/maximize/restore button icon when window is active (Windows only)
titleButtonBgActiveOver: titleButtonBgOver; // custom window title minimize/maximize/restore button background with mouse over when window is active (Windows only)
titleButtonFgActiveOver: titleButtonFgOver; // custom window title minimize/maximize/restore button icon with mouse over when window is active (Windows only)
titleButtonCloseBg: titleButtonBg; // custom window title close button background when window is inactive (Windows only)
titleButtonCloseFg: titleButtonFg; // custom window title close button icon when window is inactive (Windows only)
titleButtonCloseBgOver: #e81123; // custom window title close button background with mouse over when window is inactive (Windows only)
titleButtonCloseFgOver: windowFgActive; // custom window title close button icon with mouse over when window is inactive (Windows only)
titleButtonCloseBgActive: titleButtonCloseBg; // custom window title close button background when window is active (Windows only)
titleButtonCloseFgActive: titleButtonCloseFg; // custom window title close button icon when window is active (Windows only)
titleButtonCloseBgActiveOver: titleButtonCloseBgOver; // custom window title close button background with mouse over when window is active (Windows only)
titleButtonCloseFgActiveOver: titleButtonCloseFgOver; // custom window title close button icon with mouse over when window is active (Windows only)
titleFg: #666666; // custom window title text when window is inactive (macOS only)
titleFgActive: #808080; // custom window title text when window is active (macOS only)
trayCounterBg: #f23c34; // tray icon counter background
trayCounterBgMute: #888888; // tray icon counter background if all unread messages are muted
trayCounterFg: #ffffff; // tray icon counter text
trayCounterBgMacInvert: #ffffff; // tray icon counter background when tray icon is pressed or when dark theme of macOS is used (macOS only)
trayCounterFgMacInvert: #ffffff01; // tray icon counter text when tray icon is pressed or when dark theme of macOS is used (macOS only)
layerBg: #0000007f; // box and main menu background layer fade
cancelIconFg: #666666; // default for settings close icon and box search cancel icon
cancelIconFgOver: #dcdcdc; // default for settings close icon and box search cancel icon with mouse over
boxBg: windowBg; // box background
boxTextFg: windowFg; // box text
boxTextFgGood: #56dbce; // accepted box text (like when choosing username that is not occupied)
boxTextFgError: #d84d4d; // rejecting box text (like when choosing username that is occupied)
boxTitleFg: #ebebeb; // box title text
boxSearchBg: #282e33; // box search field background (like in contacts box)
boxTitleAdditionalFg: #808080; // box title additional text (like in create group box when you see chosen members count)
boxTitleCloseFg: cancelIconFg; // settings close icon and box search cancel icon (like in contacts box)
boxTitleCloseFgOver: cancelIconFgOver; // settings close icon and box search cancel icon (like in contacts box) with mouse over
membersAboutLimitFg: #5e6065; // text in channel members box about the limit (max 200 last members are shown)
contactsBg: #222528; // contacts (and some other) box row background
contactsBgOver: #282e33; // contacts (and some other) box row background with mouse over
contactsNameFg: boxTextFg; // contacts (and some other) box row name text
contactsStatusFg: #808080; // contacts (and some other) box row additional text (like last seen stamp)
contactsStatusFgOver: #808080; // contacts (and some other) box row additional text (like last seen stamp) with mouse over
contactsStatusFgOnline: #55e1d3; // contacts (and some other) box row active additional text (like online status)
photoCropFadeBg: layerBg; // avatar crop box fade background (when choosing a new photo in Settings or for a group)
photoCropPointFg: #ffffff7f; // avatar crop box corner rectangles (when choosing a new photo in Settings or for a group)
callArrowFg: #2bc7b8; // received phone call arrow (in calls list box)
callArrowMissedFg: #dd5b4a; // missed phone call arrow (in calls list box)
introBg: windowBg; // login background
introTitleFg: #eeeeee; // login title text
introDescriptionFg: #999999; // login description text
introErrorFg: #999999; // login error text (like when providing a wrong log in code)
introCoverTopBg: #188173; // intro gradient top (from)
introCoverBottomBg: #188173; // intro gradient bottom (to)
introCoverIconsFg: #34a495; // intro cloud graphics
introCoverPlaneTrace: #329d8f; // intro plane traces
introCoverPlaneInner: #ced9e2; // intro plane part
introCoverPlaneOuter: #97a9b5; // intro plane part
introCoverPlaneTop: #ffffff; // intro plane part
dialogsMenuIconFg: menuIconFg; // main menu and lock telegram icon
dialogsMenuIconFgOver: menuIconFgOver; // main menu and lock telegram icon with mouse over
dialogsBg: windowBg; // chat list background
dialogsNameFg: #f5f5f5; // chat list name text
dialogsChatIconFg: dialogsNameFg; // chat list group or channel icon
dialogsDateFg: #6d727c; // chat list date text
dialogsTextFg: #8d939e; // chat list message text
dialogsTextFgService: #ebebeb; // chat list group sender name text (or media message type text)
dialogsDraftFg: #ec6657; // chat list draft label
dialogsVerifiedIconBg: #53edde; // chat list verified icon background
dialogsVerifiedIconFg: #282e33; // chat list verified icon check
dialogsSendingIconFg: #727272; // chat list sending message icon (clock)
dialogsSentIconFg: #20eeda; // chat list sent message tick / double tick icon
dialogsUnreadBg: #05a091; // chat list unread badge background for not muted chat
dialogsUnreadBgMuted: #495159; // chat list unread badge background for muted chat
dialogsUnreadFg: #ffffff; // chat list unread badge text
dialogsBgOver: #353c43; // chat list background with mouse over
dialogsNameFgOver: windowBoldFgOver; // chat list name text with mouse over
dialogsChatIconFgOver: dialogsNameFgOver; // chat list group or channel icon with mouse over
dialogsDateFgOver: #6d727c; // chat list date text with mouse over
dialogsTextFgOver: #a3a7ae; // chat list message text with mouse over
dialogsTextFgServiceOver: #f0f0f0; // chat list group sender name text with mouse over
dialogsDraftFgOver: dialogsDraftFg; // chat list draft label with mouse over
dialogsVerifiedIconBgOver: #53edde; // chat list verified icon background with mouse over
dialogsVerifiedIconFgOver: dialogsVerifiedIconFg; // chat list verified icon check with mouse over
dialogsSendingIconFgOver: dialogsSendingIconFg; // chat list sending message icon (clock) with mouse over
dialogsSentIconFgOver: #41f0df; // chat list sent message tick / double tick icon with mouse over
dialogsUnreadBgOver: #009687; // chat list unread badge background for not muted chat with mouse over
dialogsUnreadBgMutedOver: #555e67; // chat list unread badge background for muted chat with mouse over
dialogsUnreadFgOver: dialogsUnreadFg; // chat list unread badge text with mouse over
dialogsBgActive: #009687; // chat list background for current (active) chat
dialogsNameFgActive: windowFgActive; // chat list name text for current (active) chat
dialogsChatIconFgActive: dialogsNameFgActive; // chat list group or channel icon for current (active) chat
dialogsDateFgActive: windowFgActive; // chat list date text for current (active) chat
dialogsTextFgActive: windowFgActive; // chat list message text for current (active) chat
dialogsTextFgServiceActive: dialogsTextFgActive; // chat list group sender name text for current (active) chat
dialogsDraftFgActive: #c6f7f3; // chat list draft label for current (active) chat
dialogsVerifiedIconBgActive: dialogsTextFgActive; // chat list verified icon background for current (active) chat
dialogsVerifiedIconFgActive: dialogsBgActive; // chat list verified icon check for current (active) chat
dialogsSendingIconFgActive: #ffffff99; // chat list sending message icon (clock) for current (active) chat
dialogsSentIconFgActive: dialogsTextFgActive; // chat list sent message tick / double tick icon for current (active) chat
dialogsUnreadBgActive: dialogsTextFgActive; // chat list unread badge background for not muted chat for current (active) chat
dialogsUnreadBgMutedActive: #cbf7e9; // chat list unread badge background for muted chat for current (active) chat
dialogsUnreadFgActive: #039d8e; // chat list unread badge text for current (active) chat
dialogsRippleBg: #43474d; //
dialogsRippleBgActive: #12a798; //
dialogsForwardBg: dialogsBgActive; // forwarding panel background (when forwarding messages in the smallest window size)
dialogsForwardFg: dialogsNameFgActive; // forwarding panel text (when forwarding messages in the smallest window size)
searchedBarBg: #3a4047; // search results bar background (in chats list, contacts box..)
searchedBarFg: #a8a8a8; // search results bar text (in chats list, contacts box..)
topBarBg: #282e33; // top bar background (in chat view, media overview..)
emojiPanBg: windowBg; // emoji panel background
emojiPanCategories: #20262b; // emoji panel categories background
emojiPanHeaderFg: #90949a; // emoji panel section header text
emojiPanHeaderBg: #fffffff2; // emoji panel section header background
stickerPanDeleteBg: #000000cc; // delete X button background for custom sent stickers in stickers panel (legacy)
stickerPanDeleteFg: windowFgActive; // delete X button icon for custom sent stickers in stickers panel (legacy)
stickerPreviewBg: #000000b0; // sticker and GIF preview background (when you press and hold on a sticker)
historyTextInFg: windowFg; // inbox message text
historyTextInFgSelected: #ffffff; // inbox message selected text or text in a selected message
historyTextOutFg: #e4ecf2; // outbox message text
historyTextOutFgSelected: #ffffff; // outbox message selected text or text in a selected message
historyLinkInFg: #37e1cb; // inbox message link
historyLinkInFgSelected: #a7fff4; // inbox message link in a selected text or message
historyLinkOutFg: #37e1cb; // outbox message link
historyLinkOutFgSelected: #a7fff4; // outbox message link in a selected text or message
historyFileNameInFg: historyTextInFg; // inbox media filename text
historyFileNameInFgSelected: #ffffff; // inbox media filename text in a selected message
historyFileNameOutFg: historyTextOutFg; // outbox media filename text
historyFileNameOutFgSelected: #ffffff; // outbox media filename text in a selected message
historyOutIconFg: #40e6c5; // outbox message tick / double tick icon
historyOutIconFgSelected: #ffffff; // outbox message tick / double tick icon in a selected message
historyIconFgInverted: #40e6c5; // media message tick / double tick icon (like in sent photo)
historySendingOutIconFg: #9eface; // outbox sending message icon (clock)
historySendingInIconFg: #76838b; // inbox sending message icon (clock) (like in sent messages to yourself or in sent messages to a channel)
historySendingInvertedIconFg: #ffffffc8; // media sending message icon (clock) (like in sent photo)
historyCallArrowInFg: #26c2ad; // received phone call arrow
historyCallArrowInFgSelected: #ffffff; // received phone call arrow in a selected message
historyCallArrowMissedInFg: callArrowMissedFg; // missed phone call arrow
historyCallArrowMissedInFgSelected: #ffffff; // missed phone call arrow in a selected message
historyCallArrowOutFg: #ffffff; // outgoing phone call arrow
historyCallArrowOutFgSelected: #ffffff; // outgoing phone call arrow
historyUnreadBarBg: #33393f; // new unread messages bar background
historyUnreadBarBorder: shadowFg; // new unread messages bar shadow
historyUnreadBarFg: #3cd3bf; // new unread messages bar text
historyForwardChooseBg: #0000004c; // forwarding messages in a large window size "choose recipient" background
historyForwardChooseFg: windowFgActive; // forwarding messages in a large window size "choose recipient" text
historyPeer1NameFg: #ec7577; // red group member name
historyPeer1NameFgSelected: #ffffff; // red group member name in a selected message
historyPeer1UserpicBg: #e17076; // red userpic background
historyPeer2NameFg: #86d67f; // green group member name
historyPeer2NameFgSelected: #ffffff; // green group member name in a selected message
historyPeer2UserpicBg: #7bc862; // green userpic background
historyPeer3NameFg: #e4c054; // yellow group member name
historyPeer3NameFgSelected: #ffffff; // yellow group member name in a selected message
historyPeer3UserpicBg: #ccad4f; // yellow userpic background
historyPeer4NameFg: #68c7f3; // blue group member name
historyPeer4NameFgSelected: #ffffff; // blue group member name in a selected message
historyPeer4UserpicBg: #65aadd; // blue userpic background
historyPeer5NameFg: #b383f3; // purple group member name
historyPeer5NameFgSelected: #ffffff; // purple group member name in a selected message
historyPeer5UserpicBg: #a695e7; // purple userpic background
historyPeer6NameFg: #e16794; // pink group member name
historyPeer6NameFgSelected: #ffffff; // pink group member name in a selected message
historyPeer6UserpicBg: #ee7aae; // pink userpic background
historyPeer7NameFg: #57c9e0; // sea group member name
historyPeer7NameFgSelected: #ffffff; // sea group member name in a selected message
historyPeer7UserpicBg: #6ec9cb; // sea userpic background
historyPeer8NameFg: #efb05d; // orange group member name
historyPeer8NameFgSelected: #ffffff; // orange group member name in a selected message
historyPeer8UserpicBg: #eda86c; // orange userpic background
historyPeerUserpicFg: windowFgActive; // default userpic initials
historyScrollBarBg: #8989897a; // scroll bar current rectangle, the bar itself in the chat view (adjusted)
historyScrollBarBgOver: #6b6b6bbc; // scroll bar current rectangle with mouse over it in the chat view (adjusted)
historyScrollBg: #5f5f5f4c; // scroll bar background (adjusted)
historyScrollBgOver: #6262626b; // scroll bar background with mouse over the scroll bar (adjusted)
msgInBg: #33393f; // inbox message background
msgInBgSelected: #009687; // inbox selected message background (and background of selected text in those messages)
msgOutBg: #2a2f33; // outbox message background
msgOutBgSelected: #009687; // outbox selected message background (and background of selected text in those messages)
msgSelectOverlay: #35d4bf4c; // overlay which is filling the media parts of selected messages (like in selected photo message)
msgStickerOverlay: #35d4bf7f; // overlay which is filling the selected sticker message
msgInServiceFg: windowActiveTextFg; // inbox message information text (like information about a forwarded message original sender)
msgInServiceFgSelected: #ffffff; // inbox selected message information text (like information about a forwarded message original sender)
msgOutServiceFg: #60e5cb; // outbox message information text (like information about a forwarded message original sender)
msgOutServiceFgSelected: #ffffff; // outbox message information text (like information about a forwarded message original sender)
msgInShadow: #748ea200; // inbox message shadow (below the bubble)
msgInShadowSelected: #538ebb00; // inbox selected message shadow (below the bubble)
msgOutShadow: #00000000; // outbox message shadow (below the bubble)
msgOutShadowSelected: #37a78d00; // outbox selected message shadow (below the bubble)
msgInDateFg: #828d94; // inbox message time text
msgInDateFgSelected: #ffffff; // inbox selected message time text
msgOutDateFg: #737f87; // outbox message time text
msgOutDateFgSelected: #ffffff; // outbox selected message time text
msgServiceFg: windowFgActive; // service message text (like date dividers or service message about the group title being changed)
msgServiceBg: #363c43c8; // service message background (like in a service message about group title being changed) (adjusted)
msgServiceBgSelected: #009687; // service message selected text background (like in a service message about group title being changed) (adjusted)
msgInReplyBarColor: #32ceb9; // inbox message reply outline
msgInReplyBarSelColor: #ffffff; // inbox selected message reply outline
msgOutReplyBarColor: #32ceb9; // outbox message reply outline
msgOutReplyBarSelColor: #ffffff; // outbox selected message reply outline
msgImgReplyBarColor: msgServiceFg; // sticker message reply outline
msgInMonoFg: #5aaba0; // inbox message monospace text (like a message sent with test text)
msgOutMonoFg: #c2f2ec; // outbox message monospace text
msgInMonoFgSelected: #a7fff4; // inbox message monospace text in a selected text or message
msgOutMonoFgSelected: #c9fff8; // outbox message monospace text in a selected text or message
msgDateImgFg: msgServiceFg; // media message time text (like time text in a sent photo)
msgDateImgBg: #00000054; // media message time bubble background (like time bubble in a sent photo) or file with thumbnail download icon circle background
msgDateImgBgOver: #00000074; // media message download icon circle background with mouse over (like file with thumbnail download icon)
msgDateImgBgSelected: #1c706587; // selected media message time bubble background
msgFileThumbLinkInFg: lightButtonFg; // inbox media file message with thumbnail download / open with button text
msgFileThumbLinkInFgSelected: lightButtonFgOver; // inbox selected media file message with thumbnail download / open with button text
msgFileThumbLinkOutFg: #60e5cb; // outbox media file message with thumbnail download / open with button text
msgFileThumbLinkOutFgSelected: #ffffff; // outbox selected media file message with thumbnail download / open with button text
msgFileInBg: #50d4c3; // inbox audio file download circle background
msgFileInBgOver: #48cfbd; // inbox audio file download circle background with mouse over
msgFileInBgSelected: #ffffff; // inbox selected audio file download circle background
msgFileOutBg: #11bfab; // outbox audio file download circle background
msgFileOutBgOver: #ffffff; // outbox audio file download circle background with mouse over
msgFileOutBgSelected: #ffffff; // outbox selected audio file download circle background
msgFile1Bg: #3fbbab; // blue shared links / files without image square thumbnail
msgFile1BgDark: #269f8f; // blue shared files without image download circle background
msgFile1BgOver: #52c4b5; // blue shared files without image download circle background with mouse over
msgFile1BgSelected: #ffffff; // blue shared files without image download circle background if file is selected
msgFile2Bg: #8ef5e8; // green shared links / shared files without image square thumbnail
msgFile2BgDark: #7ef7e7; // green shared files without image download circle background
msgFile2BgOver: #8df7e9; // green shared files without image download circle background with mouse over
msgFile2BgSelected: #ffffff; // green shared files without image download circle background if file is selected
msgFile3Bg: #e47272; // red shared links / shared files without image square thumbnail
msgFile3BgDark: #cd5b5e; // red shared files without image download circle background
msgFile3BgOver: #c35154; // red shared files without image download circle background with mouse over
msgFile3BgSelected: #9f6a82; // red shared files without image download circle background if file is selected
msgFile4Bg: #efc274; // yellow shared links / shared files without image square thumbnail
msgFile4BgDark: #e6a561; // yellow shared files without image download circle background
msgFile4BgOver: #dc9c5a; // yellow shared files without image download circle background with mouse over
msgFile4BgSelected: #b19d84; // yellow shared files without image download circle background if file is selected
historyFileInIconFg: #33393f; // inbox file without thumbnail (like audio file) download arrow icon
historyFileInIconFgSelected: #009687; // inbox selected file without thumbnail (like audio file) download arrow icon
historyFileInRadialFg: #33393f; // inbox file without thumbnail (like audio file) radial download animation line
historyFileInRadialFgSelected: historyFileInIconFgSelected; // inbox selected file without thumbnail (like audio file) radial download animation line
historyFileOutIconFg: #33393f; // outbox file without thumbnail (like audio file) download arrow icon
historyFileOutIconFgSelected: #009687; // outbox selected file without thumbnail (like audio file) download arrow icon
historyFileOutRadialFg: historyFileOutIconFg; // outbox file without thumbnail (like audio file) radial download animation line
historyFileOutRadialFgSelected: #009687; // outbox selected file without thumbnail (like audio file) radial download animation line
historyFileThumbIconFg: #efefef; // file with thumbnail (or photo / video) download arrow icon
historyFileThumbIconFgSelected: #ffffff; // selected file with thumbnail (or photo / video) download arrow icon
historyFileThumbRadialFg: historyFileThumbIconFg; // file with thumbnail (or photo / video) radial download animation line
historyFileThumbRadialFgSelected: #ffffff; // selected file with thumbnail (or photo / video) radial download animation line
historyVideoMessageProgressFg: historyFileThumbIconFg; // radial playback progress in round video messages
msgWaveformInActive: windowBgActive; // inbox voice message active waveform lines (like played part of currently playing voice message)
msgWaveformInActiveSelected: #ffffff; // inbox selected voice message active waveform lines (like played part of currently playing voice message)
msgWaveformInInactive: #5d6b76; // inbox voice message inactive waveform lines (like upcoming part of currently playing voice message)
msgWaveformInInactiveSelected: #41d1c0; // inbox selected voice message inactive waveform lines (like upcoming part of currently playing voice message)
msgWaveformOutActive: #11bfab; // outbox voice message active waveform lines (like played part of currently playing voice message)
msgWaveformOutActiveSelected: #ffffff; // outbox selected voice message active waveform lines (like played part of currently playing voice message)
msgWaveformOutInactive: #596874; // outbox voice message inactive waveform lines (like upcoming part of currently playing voice message)
msgWaveformOutInactiveSelected: #41d1c0; // outbox selected voice message inactive waveform lines (like upcoming part of currently playing voice message)
msgBotKbOverBgAdd: #ffffff14; // this is painted over a bot inline keyboard button (which has msgServiceBg background) when mouse is over that button
msgBotKbIconFg: msgServiceFg; // bot inline keyboard button icon in the top-right corner (like in @vote bot when a poll is ready to be shared)
msgBotKbRippleBg: #9e9d9d10; // bot inline keyboard button ripple effect
mediaInFg: msgInDateFg; // inbox media message status text (like in file that is being downloaded)
mediaInFgSelected: msgInDateFgSelected; // inbox selected media message status text (like in file that is being downloaded)
mediaOutFg: msgOutDateFg; // outbox media message status text (like in file that is being downloaded)
mediaOutFgSelected: msgOutDateFgSelected; // outbox selected media message status text (like in file that is being downloaded)
youtubePlayIconBg: #e83131c8; // youtube play icon background (when a link to a youtube video with a webpage preview is sent)
youtubePlayIconFg: windowFgActive; // youtube play icon arrow (when a link to a youtube video with a webpage preview is sent)
videoPlayIconBg: #0000007f; // other video play icon background (like when a link to a vimeo video with a webpage preview is sent)
videoPlayIconFg: #ffffff; // other video play icon arrow (like when a link to a vimeo video with a webpage preview is sent)
toastBg: #000000b2; // toast notification background (like when you click on your t.me link when editing your username)
toastFg: windowFgActive; // toast notification text (like when you click on your t.me link when editing your username)
reportSpamBg: #363c42; // report spam panel background (like a non contact user writes your for the first time)
reportSpamFg: #3c4248; // report spam panel text (when you send a report from that panel)
historyToDownBg: #434d57; // arrow button background (to scroll to the end of the viewed chat)
historyToDownBgOver: #515b65; // arrow button background with mouse over
historyToDownBgRipple: #636d77; // arrow button ripple effect
historyToDownFg: #adb4ba; // arrow button icon
historyToDownFgOver: menuIconFgOver; // arrow button icon with mouse over
historyToDownShadow: #00000040; // arrow button shadow
historyComposeAreaBg: #282e33; // history compose area background (message write area / reply information / forwarding information)
historyComposeAreaFg: historyTextInFg; // history compose area text
historyComposeAreaFgService: msgInDateFg; // history compose area text when replying to a media message
historyComposeIconFg: menuIconFg; // history compose area icon (like emoji, attach, bot command..)
historyComposeIconFgOver: menuIconFgOver; // history compose area icon with mouse over
historySendIconFg: windowBgActive; // send message icon
historySendIconFgOver: windowBgActive; // send message icon with mouse over
historyPinnedBg: historyComposeAreaBg; // pinned message area background
historyReplyBg: historyComposeAreaBg; // reply / forward / edit message area background
historyReplyIconFg: windowBgActive; // reply / forward / edit message left icon
historyReplyCancelFg: cancelIconFg; // reply / forward / edit message cancel button
historyReplyCancelFgOver: cancelIconFgOver; // reply / forward / edit message cancel button with mouse over
historyComposeButtonBg: historyComposeAreaBg; // unblock / join channel / mute channel button background
historyComposeButtonBgOver: #31363c; // unblock / join channel / mute channel button background with mouse over
historyComposeButtonBgRipple: #272b2f; // unblock / join channel / mute channel button ripple effect
overviewCheckBg: #00000040; // shared files / links checkbox background for not selected rows when some rows are selected
overviewCheckFg: #ffffff; // shared files / links checkbox icon for not selected rows when some rows are selected
overviewCheckFgActive: #ffffff; // shared files / links checkbox icon for selected rows
overviewPhotoSelectOverlay: #40ace333; // shared photos / videos / links fill for selected rows
profileStatusFgOver: #9c9c9c; // group members list in group profile user last seen text with mouse over
profileVerifiedCheckBg: windowBgActive; // profile verified check icon background
profileVerifiedCheckFg: windowFgActive; // profile verified check icon tick
profileAdminStartFg: windowBgActive; // group members list admin star icon
notificationsBoxMonitorFg: windowFg; // custom notifications settings box monitor color
notificationsBoxScreenBg: dialogsBgActive; // #6389a8; // custom notifications settings box monitor screen background
notificationSampleUserpicFg: windowBgActive; // custom notifications settings box small sample userpic placeholder
notificationSampleCloseFg: #d7d7d7; // custom notifications settings box small sample close button placeholder
notificationSampleTextFg: #d7d7d7; // custom notifications settings box small sample text placeholder
notificationSampleNameFg: #939393; // custom notifications settings box small sample name placeholder
changePhoneSimcardFrom: notificationSampleTextFg; // change phone number box left simcard icon
changePhoneSimcardTo: notificationSampleNameFg; // change phone number box right simcard and plane icons
mainMenuBg: windowBg; // main menu background
mainMenuCoverBg: #009687; // main menu top cover background
mainMenuCoverFg: windowFgActive; // main menu top cover text
mainMenuCloudFg: activeButtonFg; //
mainMenuCloudBg: #0e837f; //
mediaPlayerBg: windowBg; // audio file player background
mediaPlayerActiveFg: windowBgActive; // audio file player playback progress already played part
mediaPlayerInactiveFg: sliderBgInactive; // audio file player playback progress upcoming (not played yet) part with mouse over
mediaPlayerDisabledFg: #9dd1ef; // audio file player loading progress (when you're playing an audio file and switch to the previous one which is not loaded yet)
mediaviewFileBg: windowBg; // file rectangle background (when you view a png file in Media Viewer and go to a previous, not loaded yet, file)
mediaviewFileNameFg: windowFg; // file name in file rectangle
mediaviewFileSizeFg: windowSubTextFg; // file size text in file rectangle
mediaviewFileRedCornerFg: #d55959; // red file thumbnail placeholder corner in file rectangle (for a file without thumbnail, like .pdf)
mediaviewFileYellowCornerFg: #e8a659; // yellow file thumbnail placeholder corner in file rectangle (for a file without thumbnail, like .zip)
mediaviewFileGreenCornerFg: #49a957; // green file thumbnail placeholder corner in file rectangle (for a file without thumbnail, like .exe)
mediaviewFileBlueCornerFg: #599dcf; // blue file thumbnail placeholder corner in file rectangle (for a file without thumbnail, like .dmg)
mediaviewFileExtFg: activeButtonFg; // file extension text in file thumbnail placeholder in file rectangle
mediaviewMenuBg: #383838; // context menu in Media Viewer background
mediaviewMenuBgOver: #505050; // context menu item background with mouse over
mediaviewMenuBgRipple: #676767; // context menu item ripple effect
mediaviewMenuFg: windowFgActive; // context menu item text
mediaviewBg: #222222eb; // Media Viewer background
mediaviewVideoBg: imageBg; // Media Viewer background when viewing a video in full screen
mediaviewControlBg: #0000003c; // controls background (like next photo / previous photo)
mediaviewControlFg: windowFgActive; // controls icon (like next photo / previous photo)
mediaviewCaptionBg: #11111180; // caption text background (when viewing photo with caption)
mediaviewCaptionFg: mediaviewControlFg; // caption text
mediaviewTextLinkFg: #66f7e4; // caption text link
mediaviewSaveMsgBg: toastBg; // save to file toast message background in Media Viewer
mediaviewSaveMsgFg: toastFg; // save to file toast message text
mediaviewPlaybackActive: #c7c7c7; // video playback progress already played part
mediaviewPlaybackInactive: #252525; // video playback progress upcoming (not played yet) part
mediaviewPlaybackActiveOver: #ffffff; // video playback progress already played part with mouse over
mediaviewPlaybackInactiveOver: #474747; // video playback progress upcoming (not played yet) part with mouse over
mediaviewPlaybackProgressFg: #ffffffc7; // video playback progress text
mediaviewPlaybackIconFg: mediaviewPlaybackActive; // video playback controls icon
mediaviewPlaybackIconFgOver: mediaviewPlaybackActiveOver; // video playback controls icon with mouse over
mediaviewTransparentBg: #ffffff; // transparent filling part (when viewing a transparent .png file in Media Viewer)
mediaviewTransparentFg: #cccccc; // another transparent filling part
notificationBg: windowBg; // custom notification window background
callBg: #26282cf2; // phone call popup background
callNameFg: #ffffff; // phone call popup name text
callFingerprintBg: #00000066; // phone call popup emoji fingerprint background
callStatusFg: #aaabac; // phone call popup status text
callIconFg: #ffffff; // phone call popup answer, hangup and mute mic icon
callAnswerBg: #5ad1c1; // phone call popup answer button background
callAnswerRipple: #42c2b1; // phone call popup answer button ripple effect
callAnswerBgOuter: #3febc926; // phone call popup answer button outer ripple effect
callHangupBg: #d75a5a; // phone call popup hangup button background
callHangupRipple: #c04646; // phone call popup hangup button ripple effect
callCancelBg: #ffffff; // phone call popup line busy cancel button background
callCancelFg: #777777; // phone call popup line busy cancel button icon
callCancelRipple: #f1f1f1; // phone call popup line busy cancel button ripple effect
callMuteRipple: #ffffff12; // phone call popup mute mic ripple effect
callBarBg: dialogsBgActive; // active phone call bar background
callBarMuteRipple: dialogsRippleBgActive; // active phone call bar mute and hangup button ripple effect
callBarBgMuted: #8f8f8f; // phone call bar with muted mic background
callBarUnmuteRipple: #7f7f7f; // phone call bar with muted mic mute and hangup button ripple effect
callBarFg: dialogsNameFgActive; // phone call bar text and icons
importantTooltipBg: toastBg; //
importantTooltipFg: toastFg; //
importantTooltipFgLink: #65fce8; //
filterInputActiveBg: #3d444b;
botKbBg: #3d444b;
botKbDownBg: #494f55;
emojiIconFg: #6c7278;
emojiIconFgActive: #36cdb9;
overviewCheckBorder: #e4eaef;
`;

const printer = ts.createPrinter();
const sourceFile = ts.createSourceFile('theme.ts', `
import Color from 'helpers/ColorSchemaParser/color-value';

`, ts.ScriptTarget.Latest);
const ast = Object.assign({}, sourceFile, {
  statements: [
    ...sourceFile.statements,
    // TODO: load file from stdin
    createDefaultExportedObject(createTheme(example)),
  ],
});

const file = printer.printFile(ast);
console.log(file);
