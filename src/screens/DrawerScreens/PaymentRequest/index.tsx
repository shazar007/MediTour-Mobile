import React, {useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {RF} from '@theme';
import {AppButton} from '@components';
import {WebView} from 'react-native-webview';
import {handShakePutt} from '@services';

const PaymentRequest = () => {
  const [loading, setLoading] = useState(false);
  const [webviewContent, setWebviewContent] = useState(null);

  const Key1 = CryptoJS.enc.Utf8.parse('PaJDz6rVdcCDfj9v');
  const Key2 = CryptoJS.enc.Utf8.parse('0337336148572195');
  const ChannelId = '1001';
  const MerchantId = '25317';
  const StoreId = '034757';
  const ReturnURL = 'https://meditour.global/';
  const MerchantHash = 'OUU362MB1urdJj0FlIU2dhXFykjd0e7wBKAKlpN4VyE=';
  const MerchantUsername = 'ylypys';
  const MerchantPassword = 'pU+QZUHHlz5vFzk4yqF7CA==';
  const TransactionTypeId = '3';
  const Currency = 'PKR';
  const IsBIN = '0';
  const Price = '2300';

  const generateRequestHash = obj => {
    const sortedKeys = Object.keys(obj).sort();
    const sortedString = sortedKeys.map(key => `${key}=${obj[key]}`).join('&');

    const encrypted = CryptoJS.AES.encrypt(sortedString, Key1, {
      iv: Key2,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  };

  const fetchToken = async () => {
    try {
      const res = await handShakePutt();
      return res.data.response.AuthToken;
    } catch (err) {}
  };

  const postApiData = async authToken => {
    const transactionReferenceNumber = Math.floor(
      Math.random() * 1000000000,
    ).toString();
    const transactionAmount = Price;

    const initialData = {
      AuthToken: authToken,
      ChannelId: ChannelId,
      Currency: Currency,
      IsBIN: IsBIN,
      MerchantHash: MerchantHash,
      MerchantId: MerchantId,
      MerchantPassword: MerchantPassword,
      MerchantUsername: MerchantUsername,
      ReturnURL: ReturnURL,
      StoreId: StoreId,
      TransactionAmount: transactionAmount,
      TransactionReferenceNumber: transactionReferenceNumber,
      TransactionTypeId: TransactionTypeId,
    };

    const requestHash = generateRequestHash(initialData);
    const finalData = {
      ...initialData,
      RequestHash: requestHash,
    };

    const apiURL = 'https://sandbox.bankalfalah.com/SSO/SSO/SSO';
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Form To Submit</title>
          <script
            src="https://code.jquery.com/jquery-1.12.4.min.js"
            integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
            crossorigin="anonymous"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js"></script>
      </head>
      <body>
      <h3>Page Redirection Request</h3>   
      <form action="${apiURL}" id="PageRedirectionForm" method="post">                                                                                                                                                                 
        <input id="AuthToken" name="AuthToken" type="hidden" value="${finalData.AuthToken}">                                                                                                                                
        <input id="RequestHash" name="RequestHash" type="hidden" value="${finalData.RequestHash}">                                                                                                                            
        <input id="ChannelId" name="ChannelId" type="hidden" value="${finalData.ChannelId}">                                                                                                                            
        <input id="Currency" name="Currency" type="hidden" value="PKR">                                                                                                                               
        <input id="IsBIN" name="IsBIN" type="hidden" value="0">                                                                                     
        <input id="ReturnURL" name="ReturnURL" type="hidden" value="${finalData.ReturnURL}">                                                                            
        <input id="MerchantId" name="MerchantId" type="hidden" value="${finalData.MerchantId}">                                                                                                                           
        <input id="StoreId" name="StoreId" type="hidden" value="${finalData.StoreId}">                                                                                                                     
        <input id="MerchantHash" name="MerchantHash" type="hidden" value="${finalData.MerchantHash}">                                  
        <input id="MerchantUsername" name="MerchantUsername" type="hidden" value="${finalData.MerchantUsername}">                                                                                                            
        <input id="MerchantPassword" name="MerchantPassword" type="hidden" value="${finalData.MerchantPassword}">                                                                                          
        <input id="TransactionTypeId" name="TransactionTypeId" type="hidden" value="3">                                                                                                                                                                                  
        <input id="TransactionReferenceNumber" name="TransactionReferenceNumber" type="hidden" value="${finalData.TransactionReferenceNumber}">                                  
        <input id="TransactionAmount" name="TransactionAmount" type="hidden" value="${finalData.TransactionAmount}">                                                             
        <button type="submit" id="submitBtn">Processing Please Wait</button>                 
      </form>                                                                                                                                                                                 
      <script type="text/javascript"> 
        document.getElementById("PageRedirectionForm").submit();
      </script>
      </body>
      </html>`;

    setWebviewContent(htmlContent);
    setLoading(false);
  };

  const handlePress = async () => {
    setLoading(true);
    const authToken = await fetchToken();
    if (authToken) {
      await postApiData(authToken);
    } else {
      setLoading(false);
    }
  };

  if (webviewContent) {
    return (
      <WebView
        originWhitelist={['*']}
        source={{html: webviewContent}}
        style={{flex: 1}}
      />
    );
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <AppButton title="click" m_Top={RF(500)} onPress={handlePress} />
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

export default PaymentRequest;
