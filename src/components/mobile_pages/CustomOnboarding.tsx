import React, { useContext } from 'react'
import { Image, View, Text, TouchableOpacity } from 'react-native-web'
import BuilderContext from "../../store/BuilderContext";
import { DEFAULT_IMAGE_URL } from "../mobile_components";

const Circle = () => (
  <View
    style={{
      width: 8,
      height: 8,
      borderRadius: 16,
      backgroundColor: '#7A787A',
    }}
  />
)

export default function CustomOnboarding() {
  const {
    openedPage,
    setOpenedPage,
  } = useContext(BuilderContext)
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View />
      <View
        style={{
          minHeight: '40%',
          marginTop: 100,
        }}
      >
        <Image
          source={{ uri: DEFAULT_IMAGE_URL }}
          style={{
            borderRadius: 16,
            width: 240,
            height: 240,
          }}
        />
        <View
          style={{
            alignItems: 'center',
            marginTop: 30,
          }}
        >
          <Text>Текст</Text>
        </View>
      </View>
      <View
        style={{
          marginVertical: 30,
          width: '100%',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            padding: 16,
          }}
        >
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: 'white',
              borderWidth: 2,
              borderColor: '#000000',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View>
              <Text>OK</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: 12,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              width: 50,
              justifyContent: 'space-between',
            }}
          >
            <Circle />
            <Circle />
            <Circle />
          </View>
        </View>
      </View>
    </View>
  )
}