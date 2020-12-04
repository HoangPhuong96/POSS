import {Sizes} from '@dungdang/react-native-basic';
import React, {Component} from 'react';
import {
   View,
   Text,
   FlatList,
   TouchableOpacity,
   Dimensions,
   Animated,
} from 'react-native';
import Header from '../custom/Header';

const screenWidth = Dimensions.get('window').width;
const tabWidth = screenWidth * 0.3;

const menu = [
   {id: 0, label: 'A'},
   {id: 1, label: 'B'},
   {id: 2, label: 'C'},
   {id: 3, label: 'D'},
   {id: 4, label: 'E'},
   {id: 5, label: 'F'},
   {id: 6, label: 'G'},
   {id: 7, label: 'H'},
];

const layout = [
   {id: 0, label: 'screen A'},
   {id: 1, label: 'screen B'},
   {id: 2, label: 'screen C'},
   {id: 3, label: 'screen D'},
   {id: 4, label: 'screen E'},
   {id: 5, label: 'screen F'},
   {id: 6, label: 'screen G'},
   {id: 7, label: 'screen H'},
];
export default class TabLayout extends Component {
   constructor(props) {
      super(props);
      this.state = {
         selectedTab: 0,
         translateX: new Animated.Value(0),
         xTab: 0,
      };
   }
   handleSlide = (value) => {
      Animated.spring(this.state.translateX, {
         useNativeDriver: true,
         toValue: value,
         duration: 100,
      }).start();
   };
   //đổi màu chữ khi nhấn
   selectTextTab(index) {
      return this.state.selectedTab === index
         ? {color: '#fa8b30', fontWeight: 'bold'}
         : {color: 'black'};
   }
   //render menu
   renderMenu = ({item, index}) => (
      <TouchableOpacity
         onLayout={(event) =>
            this.setState({
               xTab: event.nativeEvent.layout.x,
            })
         }
         onPress={async () => {
            //scroll tới trang theo index
            this.flatListScreenRef.scrollToIndex({
               animated: true,
               index: index,
            });
            this.handleSlide(tabWidth * this.state.selectedTab);
         }}
         key={item.id}
         style={{
            alignItems: 'center',
            width: tabWidth,
            paddingVertical: Sizes.s20,
            borderColor:
               this.state.selectedTab === index ? '#fa8b30' : '#e2e2e2',
            borderBottomWidth: this.state.selectedTab === index ? 2 : 1,
         }}>
         <Text
            style={[
               {
                  fontSize: Sizes.s35,
               },
               this.selectTextTab(index),
            ]}>
            {item.label}
         </Text>
      </TouchableOpacity>
   );
   //render screen
   renderScreens = ({item}) => (
      <View
         style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: screenWidth,
         }}>
         <Text style={{fontSize: Sizes.s50}}>{item.label}</Text>
      </View>
   );

   ////////////////////////////////////////////////
   render() {
      let {translateX} = this.state;
      return (
         <View style={{flex: 1}}>
            <Header
               title={'TabLayout'}
               onPressBackButton={() => this.props.navigation.goBack()}
            />
            {/* //////menu/////// */}
            <View>
               <FlatList
                  data={menu}
                  renderItem={this.renderMenu}
                  keyExtractor={(item, index) => index}
                  ref={(ref) => {
                     this.flatListMenuRef = ref;
                  }}
                  scrollEventThrottle={16}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{flexGrow: 1}}
               />
            </View>
            {/* //////screen/////// */}
            <FlatList
               onScroll={async (event) => {
                  await this.setState({
                     selectedTab: Math.round(
                        event.nativeEvent.contentOffset.x /
                           Dimensions.get('window').width,
                     ),
                  });
                  //scroll thanh tab menu
                  this.flatListMenuRef.scrollToIndex({
                     animated: true,
                     index: this.state.selectedTab,
                  });
               }}
               data={layout}
               renderItem={this.renderScreens}
               keyExtractor={(item, index) => index}
               ref={(ref) => {
                  this.flatListScreenRef = ref;
               }}
               pagingEnabled={true}
               scrollEventThrottle={16}
               horizontal
               showsHorizontalScrollIndicator={false}
               contentContainerStyle={{flexGrow: 1}}
            />
         </View>
      );
   }
}