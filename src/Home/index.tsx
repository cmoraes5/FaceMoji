import { useEffect, useState } from 'react';
import { ImageSourcePropType, Text, View, TextInput } from 'react-native';
import { Camera, CameraType, FaceDetectionResult } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

import neutralImg from '../assets/neutral.png';
import smilingImg from '../assets/smiling.png';
import winkingLeftImg from '../assets/winking_left.png';
import winkingRightImg from '../assets/winking_right.png';

import { styles } from './styles';

export function Home() {
  const [faceDetected, setFaceDetected] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [emoji, setEmoji] = useState<ImageSourcePropType>(neutralImg);
  const [expression, setExpression] = useState('normal');

  const faceValues = useSharedValue({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })

  function handleFacesDetected({ faces }: FaceDetectionResult) {
    const face = faces[0] as any;

    // console.log(faces)

    if (face) {
      const { size, origin } = face.bounds

      faceValues.value = {
        width: size.width,
        height: size.height,
        x: origin.x,
        y: origin.y
      }

      setFaceDetected(true);

      if (face.smilingProbability > 0.5) {
        setEmoji(smilingImg);
        setExpression('sorrindo');
      }
      else if (face.leftEyeOpenProbability > 0.5 && face.rightEyeOpenProbability < 0.5) {
        setEmoji(winkingLeftImg)
        setExpression('piscando o olho esquerdo')
      }
      else if (face.leftEyeOpenProbability < 0.5 && face.rightEyeOpenProbability > 0.5) {
        setEmoji(winkingRightImg)
        setExpression('piscando o olho direito')
      }
      else {
        setEmoji(neutralImg);
        setExpression('normal')
      }
    }
    else {
      setFaceDetected(false);
    }
  }

  const animatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    zIndex: 1,
    width: faceValues.value.width,
    height: faceValues.value.height,
    transform: [
      { translateX: faceValues.value.x },
      { translateY: faceValues.value.y }
    ]
  }))

  useEffect(() => {
    requestPermission();
  }, [])

  if (!permission?.granted) {
    return;
  }

  return (
    <View style={styles.container}>

      {
        faceDetected &&
        <Animated.Image
          style={animatedStyle}
          source={emoji}
        />
      }

      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={CameraType.front}
          onFacesDetected={handleFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
            runClassifications: FaceDetector.FaceDetectorClassifications.all,
            minDetectionInterval: 100,
            tracking: true,
          }}
        />
      </View>

      <View style={styles.textContainer}>
          <Text style={styles.text}>
            Eu estou {expression}
          </Text>
      </View>
    </View>
  );
}