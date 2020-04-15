import React, { useLayoutEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, StyleSheet, View, Text, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import api from '~/services/api';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});

export default function ConfirmDeliver({ navigation, route }) {
    const { data } = route.params;

    console.tron.log(data);

    let camera;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Icon name="chevron-left" size={30} color="#fff" />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    async function ConfirmDelivery(camUri) {
        try {
            const apiData = new FormData();
            apiData.append('file', {
                uri: camUri,
                name: 'teste.png',
                type: 'image/jpg',
            });

            const response = await api.post('files', apiData);
            const { id } = response.data;
            const deliverResponse = await api.post('courier/end', {
                signature_id: id,
                package_id: data.id,
                courier_id: data.courier.id,
            });

            Alert.alert('Sucesso', 'entrega registrada com sucesso!');
            console.tron.log(response);
        } catch (err) {
            Alert.alert('Erro', err.response.data.error);
            console.tron.log('erro', err.response);
        }
    }

    async function takePicture() {
        if (camera) {
            const options = { quality: 0.5, base64: true };
            const camData = await camera.takePictureAsync(options);
            console.tron.log(camData.uri);
            ConfirmDelivery(camData.uri);
        }
    }

    return (
        <View style={styles.container}>
            <RNCamera
                ref={ref => {
                    camera = ref;
                }}
                style={styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.on}
                androidCameraPermissionOptions={{
                    title: 'Permission to use camera',
                    message: 'We need your permission to use your camera',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                    title: 'Permission to use audio recording',
                    message: 'We need your permission to use your audio',
                    buttonPositive: 'Ok',
                    buttonNegative: 'Cancel',
                }}
                onGoogleVisionBarcodesDetected={({ barcodes }) => {
                    console.tron.log(barcodes);
                }}
            />
            <View
                style={{
                    flex: 0,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <TouchableOpacity
                    onPress={() => takePicture()}
                    style={styles.capture}
                >
                    <Text style={{ fontSize: 14 }}> SNAP </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
