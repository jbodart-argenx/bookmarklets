javascript:(%2F*--%20Switch%20between%20LSAF%20Repository%20and%20Workspace%20locations%20--*%2F%20function()%7Bconst%20iframe%3Ddocument.getElementById(%22sasLSAF_iframe%22)%2CiWindow%3Diframe.contentWindow%2CiDocument%3DiWindow.document%2Cloc%3DiDocument.querySelector('%5Baria-label%3D%22Selected%2CWorkspace%22%5D')%3F%20%22work%22%3A%22repo%22%2Cfull%3D%22work%22%3D%3D%3Dloc%20%3F%20%22WORKSPACE%22%3A%22REPOSITORY%22%2Cqs%3DiDocument.getElementById(%22HLS_LSAF_%22%20%2B%20full%20%2B%20%22--navLinkInput-inner%22)%2Cfull2%3D%22work%22%3D%3D%3Dloc%20%3F%20%22REPOSITORY%22%3A%22WORKSPACE%22%2Cqs2%3DiDocument.getElementById(%22HLS_LSAF_%22%20%2B%20full2%20%2B%20%22--navLinkInput-inner%22)%2Cwrk%3DiDocument.getElementById(%22sasLSAF--sasLSAF_appContainer_lfn_4_icn%22)%2Cwrk2%3D%22true%22%3D%3D%3DiDocument.getElementById(%22sasLSAF--sasLSAF_appContainer_lfn_4%22).getAttribute(%22aria-selected%22)%2Crp%3DiDocument.getElementById(%22sasLSAF--sasLSAF_appContainer_lfn_3_icn%22)%2Crp2%3D%22true%22%3D%3D%3DiDocument.getElementById(%22sasLSAF--sasLSAF_appContainer_lfn_3%22).getAttribute(%22aria-selected%22)%2Ccurrent%3Dqs.value%3Bwrk2%20%26%26%20rp.click()%3Brp2%20%26%26%20wrk.click()%3Bqs2.value%3Dcurrent%3Bqs2.dispatchEvent(keyboardEvent%3Dnew%20KeyboardEvent(%22keydown%22%2C%7Bcode%3A%22Enter%22%2Ckey%3A%22Enter%22%2CcharCode%3A13%2CkeyCode%3A13%2Cview%3Awindow%2Cbubbles%3A!0%7D))%3B%7D())%3B