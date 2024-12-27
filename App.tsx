import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  View,
  Platform,
  ActionSheetIOS,
  Modal,
  Text,
  Pressable,
  TouchableOpacity,
  Linking,
} from 'react-native';

import Share from 'react-native-share';
import ReactNativeBlobUtil from 'react-native-blob-util';
import styles from './styles';
import pdfBase64 from './images/pdfBase64';

function App(): React.JSX.Element {
  const fileName = 'testFile';

  const filePath =
    Platform.OS === 'android'
      ? 'file:///storage/emulated/0/Download' + '/' + fileName + '.pdf'
      : '' + '/' + fileName + '.pdf';

  const pdfURLLink =
    'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';

  const [modalVisible, setModalVisible] = useState(false);

  const downloadPdf = async () => {
    const downloadPath =
      Platform.OS === 'ios'
        ? ReactNativeBlobUtil.fs.dirs.DocumentDir + '/' + fileName
        : ReactNativeBlobUtil.fs.dirs.DownloadDir + '/' + fileName;
    // : '/storage/emulated/0/Download' + '/' + fileName+'.pdf';

    ReactNativeBlobUtil.config({
      fileCache: true,
      appendExt: 'pdf',
      path: downloadPath,
      addAndroidDownloads: {
        title: fileName,
        description: fileName,
        mime: 'application/pdf',
        useDownloadManager: true,
        mediaScannable: true,
        notification: true,
        storeInDownloads: true,
      },
    })
      .fetch('GET', pdfURLLink)
      .then(resp => {
        console.log('The file saved to ', resp.path());
      })
      .catch(err => {
        console.log(err);
      });
  };

  const sharePdf = async () => {
    await downloadPdf();

    const shareOptions = {
      title: 'Share file',
      url: filePath,
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log('Result =>', ShareResponse);
    } catch (error) {
      console.log('sharePdfBase64 Error =>', error);
    }
  };

  const sharePdfUsingActionSheetIos = async () => {
    await downloadPdf();
    const options = {
      url: filePath,
    };
    const failCb = error => {
      console.log('error: ', error);
    };
    const successCb = (success, method) => {
      console.log('success,method: ', success, method);
    };

    ActionSheetIOS.showShareActionSheetWithOptions(options, failCb, successCb);
  };

  const customShare = async () => {
    await downloadPdf();
    setModalVisible(true);
  };

  const shareonWhatsapp = async () => {
    const whatsappUrl =
      Platform.OS === 'android'
        ? 'market://details?id=com.whatsapp'
        : 'itms-apps://apps.apple.com/gb/app/whatsapp-messenger/id310633997';

    const shareOptions = {
      title: 'Share via',
      url: filePath,
      social: Share.Social.WHATSAPP,
    };

    try {
      const {isInstalled} = await Share.isPackageInstalled('com.whatsapp');
      if (isInstalled) {
        console.log('isInstalled, ', isInstalled);
        await Share.shareSingle(shareOptions);
      } else {
        await Linking.openURL(whatsappUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const shareonWhatsappBusiness = async () => {
    const whatsappBusinessUrl = 'market://details?id=com.whatsapp.w4b';

    const shareOptions = {
      url: filePath,
      social: Share.Social.WHATSAPPBUSINESS,
    };

    try {
      const {isInstalled} = await Share.isPackageInstalled('com.whatsapp.w4b');
      if (isInstalled) {
        console.log('isInstalled, ', isInstalled);
        await Share.shareSingle(shareOptions);
      } else {
        await Linking.openURL(whatsappBusinessUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const shareonEmail = async () => {
    const gmailUrl = 'market://details?id=com.google.android.gm';

    const shareOptions = {
      title: 'Share via',
      url: filePath,
      social: Share.Social.EMAIL,
    };

    try {
      const {isInstalled} = await Share.isPackageInstalled(
        'com.google.android.gm',
      );
      if (isInstalled) {
        console.log('isInstalled, ', isInstalled);
        await Share.shareSingle(shareOptions);
      } else {
        await Linking.openURL(gmailUrl);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const shareonSMS = () => {
    const shareOptions = {
      title: 'Share via',
      url: filePath,
      social: Share.Social.SMS,
    };

    Share.shareSingle(shareOptions)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  return (
    <SafeAreaView
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}>
      {/* <View style={{marginBottom: 10}}>
        <Button onPress={downloadPdf} title="Download Pdf" />
      </View>
      <View style={{marginBottom: 10}}>
        <Button onPress={sharePdf} title="Share Pdf" />
      </View>
      <View style={{marginBottom: 10}}>
        <Button
          onPress={sharePdfUsingActionSheetIos}
          title="Share using Action Sheet example"
        />
      </View> */}
      <View>
        <Button onPress={customShare} title="Custom Share" />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={shareonWhatsapp} style={{margin: 10}}>
              <Text style={{color: 'blue'}}>Whatsapp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={shareonWhatsappBusiness}
              style={{margin: 10}}>
              <Text style={{color: 'blue'}}>Whatsapp Business</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={shareonEmail} style={{margin: 10}}>
              <Text style={{color: 'blue'}}>Email</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={shareonSMS} style={{margin: 10}}>
              <Text style={{color: 'blue'}}>SMS</Text>
            </TouchableOpacity>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default App;
