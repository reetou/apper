import { CustomPage } from "../../store/BuilderContext";
import React, { ReactNode } from "react";
import { View } from "react-native-web";


interface MainScreenProps {
  openedPage: CustomPage;
  embeddableChildren: ReactNode[];
  floatingChildren: ReactNode[];
  dropViewStyle: any;

}

export default function MainScreen(props: MainScreenProps) {
  const {
    openedPage,
    floatingChildren,
    embeddableChildren,
    dropViewStyle,
  } = props
  return (
    <View style={{ flex: 1, height: '100%' }}>
      {
        openedPage?.page_type === 'screen'
          ? (
            <View style={{ flex: 1, ...dropViewStyle, position: 'relative' }}>
              {embeddableChildren}
              {
                floatingChildren.length
                  ? (
                    <View
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        width: '100%',
                      }}
                    >
                      <View>
                        {floatingChildren}
                      </View>
                    </View>
                  )
                  : null
              }
            </View>
          )
          : null
      }
      {
        openedPage?.page_type === 'modal'
          ? (
            <View style={{ flex: 1, position: 'relative' }}>
              {embeddableChildren}
            </View>
          )
          : null
      }
    </View>
  )
}