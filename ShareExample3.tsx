import { Alert, Button, Linking, Modal, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

interface CustomShareModalProps {
    visible: boolean;
    onClose: () => void;
    onShare: () => Promise<void>;
    onShareTwitter: () => Promise<void>;
    onShareLinkedIn: () => Promise<void>;
}

const CustomShareModal: React.FC<CustomShareModalProps> = ({ visible, onClose, onShare, onShareTwitter, onShareLinkedIn }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Share via</Text>
                    <TouchableOpacity style={styles.button} onPress={onShare}>
                        <Text style={styles.buttonText}>React Native Share API</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onShareTwitter}>
                        <Text style={styles.buttonText}>Share on X.com</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={onShareLinkedIn}>
                        <Text style={styles.buttonText}>Share on LinkedIn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={onClose}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const SocialSharing: React.FC = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const onShare = async (): Promise<void> => {
        try {
            const result = await Share.share({
                message: 'React Native | A framework for building native apps using React',
                title: 'React Native Share API | Article from KodaSchool',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    const shareOnTwitter = async (): Promise<void> => {
        const message = encodeURIComponent('Check out this awesome articles on React Native Expo App to x');
        const url = encodeURIComponent('https://kodaschool.com/category/react-native');
        // const twitterUrl = 'market://details?id=com.twitter.android';
        const twitterUrl = `twitter://post?message=${message}&url=${url}`;
        const webUrl = `https://twitter.com/intent/tweet?text=${message}&url=${url}`;
        try {
            const supported = await Linking.openURL(twitterUrl);
            // if (supported) {
                await Linking.openURL(twitterUrl);
            // } else {
                // await Linking.openURL(webUrl);
            // }
        } catch (error) {
            console.error('Error sharing to Twitter:', error);
        }
    }

    const shareOnLinkedIn = async (): Promise<void> => {
        const message = encodeURIComponent('Check out this awesome articles on React Native from an Expo App to Linked In');
        const url = encodeURIComponent('https://kodaschool.com/category/react-native');
        const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?message=${message}&url=${url}`;
        try {
            await Linking.openURL(linkedInUrl);
        } catch (error) {
            console.error('Error sharing to LinkedIn:', error);
        }
    }

    return (
        <View style={styles.container}>
            <Button onPress={() => setModalVisible(true)} title="Open Share Dialog" />
            <CustomShareModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onShare={onShare}
                onShareTwitter={shareOnTwitter}
                onShareLinkedIn={shareOnLinkedIn}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#2196F3',
        marginVertical: 10,
    },
    buttonClose: {
        backgroundColor: '#FF6347',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default SocialSharing;