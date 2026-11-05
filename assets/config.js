/*
 * Beats By Sir Edi website settings — the only file you need to edit.
 *
 * apkUrl:         Kenya app download (GitHub release asset "Beats-By-Sir-Edi.apk").
 * apkUrlLesotho:  Lesotho app download (asset "Beats-By-Sir-Edi-Lesotho.apk").
 * apkUrlGlobal:   Worldwide app (asset "Beats-By-Sir-Edi-Global.apk"), US dollars, Visa / Mastercard.
 * showLesotho:    true  = visitors in Lesotho get the Lesotho app by default.
 *                 false = hide the Lesotho app (use while MoPay is in test mode).
 * showGlobal:     true  = visitors outside Kenya and Lesotho get the worldwide app by default.
 *                 false = hide it (leave false until Beats-By-Sir-Edi-Global.apk is in your release).
 * playUrl:        your Google Play link once the app is live there ('' until then).
 * version:        shown under the download button.
 */
window.SITE = {
  apkUrl: 'https://github.com/siredibeatz/beatsbysiredi/releases/latest/download/Beats-By-Sir-Edi.apk',
  apkUrlLesotho: 'https://github.com/siredibeatz/beatsbysiredi/releases/latest/download/Beats-By-Sir-Edi-Lesotho.apk',
  apkUrlGlobal: 'https://github.com/siredibeatz/beatsbysiredi/releases/latest/download/Beats-By-Sir-Edi-Global.apk',
  showLesotho: true,
  showGlobal: true,
  playUrl: '',
  version: '1.2.0',
};
