import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  const openCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(status === 'granted')
    if (status !== 'granted') Alert.alert('No access for camera');
  }

  const retakeImage = () => {
    setImage(null);
    openCamera();
  }

  const takePicture = async () => {
    if (!camera) return
    const imageData = await camera.takePictureAsync();
    setImage(imageData);
  }

  const CapturedImagePreview = ({ image, retakeImage }) => {
    return (
      <View
        style={{
          backgroundColor: 'transparent',
          flex: 1,
          width: '100%',
          height: '100%'
        }}
      >
        <ImageBackground
          source={{ uri: image && image.uri }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View>
            <TouchableOpacity
              onPress={retakeImage}
              style={{
                width: 130,
                height: 40,
                backgroundColor: '#9b59b6',
                alignItems: 'center',
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                  lineHeight: 40
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      {hasCameraPermission ? (
        <View
          style={{
            flex: 1,
            width: '100%'
          }}
        >
          {image ?
            <CapturedImagePreview image={image} retakeImage={retakeImage} />
            :
            <Camera
              style={{ flex: 1 }}
              ref={camera => {
                setCamera(camera)
              }}
            >
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  backgroundColor: 'transparent',
                  flexDirection: 'row'
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    flexDirection: 'row',
                    flex: 1,
                    width: '100%',
                    padding: 20,
                    justifyContent: 'space-between'
                  }}
                >
                  <View
                    style={{
                      alignSelf: 'center',
                      flex: 1,
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      onPress={takePicture}
                      style={{
                        width: 70,
                        height: 70,
                        bottom: 30,
                        borderRadius: 50,
                        backgroundColor: '#fff'
                      }}
                    />
                  </View>
                </View>
              </View>
            </Camera>
          }
        </View>
      ) :
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={openCamera}
            style={{
              width: 170,
              borderRadius: 4,
              backgroundColor: '#3498db',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              height: 40
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            >
              Take picture
            </Text>
          </TouchableOpacity>
        </View>
      }

      <StatusBar style="auto" />
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
