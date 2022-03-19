export default () => {
  // api header驗證
  const getAuthorizationHeader = () => {
      //  填入自己 ID、KEY 開始
      let AppID = '879d59b6640d4db6bc570c2770888b6d';
      let AppKey = 'EQq1uZnzE1r73vtSFngm-klTYBc';
      //  填入自己 ID、KEY 結束
      let GMTString = new Date().toGMTString();
      let ShaObj = new jsSHA('SHA-1', 'TEXT');
      ShaObj.setHMACKey(AppKey, 'TEXT');
      ShaObj.update('x-date: ' + GMTString);
      let HMAC = ShaObj.getHMAC('B64');
      let Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';
      return { 'Authorization': Authorization, 'X-Date': GMTString }; 
    }
  return {
    getAuthorizationHeader
  }
}