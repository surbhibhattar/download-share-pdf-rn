//Share example 2

// import React from 'react';
// import {Alert, Share, Button, ActionSheetIOS} from 'react-native';
// import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
// import pdfBase64 from './images/pdfBase64';

// const ShareExample = () => {
//   const onShare = async () => {

//     const options={
//       url:pdfBase64
//     }
//     const failCb=(error)=>{console.log('error: ',error)}
//     const successCb = (success,method)=>{console.log('success,method: ',success,method)}

//     ActionSheetIOS.showShareActionSheetWithOptions(options,failCb,successCb);
//   };
//   return (
//     <SafeAreaProvider>
//       <SafeAreaView>
//         <Button onPress={onShare} title="Share" />
//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// };

// export default ShareExample;