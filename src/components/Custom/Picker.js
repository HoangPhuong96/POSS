import {Sizes} from '@dungdang/react-native-basic';
import {
  arrayIsEmpty,
  stringIsEmpty,
} from '@dungdang/react-native-basic/src/Functions';
import React, {Component} from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  SafeAreaView,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import images from '../../res/images/index';

export default class Picker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowModal: false,
      selectedItem: null,
    };
  }
  componentDidMount() {
    if (this.props.value != null) {
      this.setState({selectedItem: this.props.value}, () => {});
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setState({
        selectedItem: this.props.value,
      });
    }
  }
  render() {
    const {isShowModal, selectedItem} = this.state;
    const {
      data, // array truyền vào [{id,123, label: '', value: ''}]
      title, //title của modal
      style, //style của touch picker
      modalStyle, //style của modal
      placeholder,
      onChangeItem,
      noDataMessage, // thông báo khi data = null
      value, //giá trị picker (state)
      position, //vị trí của modal (flex-start, flex-end, center)
      height, //chiều cao của moda (theo % màn hình)
    } = this.props;
    //render item for flatList/////////////
    const renderItem = ({item, index}) => {
      return (
        <TouchableOpacity
          style={styles.item}
          onPress={() => {
            this.setState({selectedItem: item, isShowModal: false});
            onChangeItem(item);
          }}>
          <Text
            style={[
              {fontSize: Sizes.s30},
              selectedItem === item
                ? {fontWeight: 'bold', color: '#0294e1'}
                : null,
            ]}>
            {item.label}
          </Text>
          {selectedItem === item ? (
            <Icon
              solid
              color={'#0294e1'}
              size={Sizes.s30}
              name={'check-circle'}
            />
          ) : null}
        </TouchableOpacity>
      );
    };
    ///////////////////////////////////////////////////////////////
    return (
      <View>
        <TouchableOpacity
          style={[styles.pickerStyle, style]} //truyền style để tùy biến
          onPress={() => {
            arrayIsEmpty(data)
              ? Alert.alert('Thông báo', noDataMessage) //báo lỗi khi data truyền vào = null hoặc []
              : this.setState({isShowModal: !isShowModal});
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: Sizes.s15,
            }}>
            {/* ///thay thế place holder bằng item đã chọn//////////// */}
            {selectedItem === null || stringIsEmpty(value) ? (
              <Text style={{color: '#9f9f9f'}}>{placeholder}</Text>
            ) : (
              <Text style={{color: '#335272'}}>{selectedItem.label}</Text>
            )}
            <Image
              source={images.ic_down_login}
              style={[
                {
                  resizeMode: 'contain',
                  height: Sizes.h48,
                  width: Sizes.h48,
                },
                this.props.iconStyle,
              ]}
            />
          </View>
        </TouchableOpacity>
        {/* ///////////////////////////////// */}

        {/* ///////////////////////////////////// */}
        <Modal visible={isShowModal} transparent={true} animationType="fade">
          <TouchableWithoutFeedback
            onPress={() => this.setState({isShowModal: !isShowModal})}>
            <View
              style={{
                flex: 1,
                justifyContent: position,
                backgroundColor: '#00000036',
              }}>
              <TouchableWithoutFeedback>
                {/*//truyền modalStyle tùy biến cho modal */}
                <View style={[styles.modal, modalStyle, {height: height}]}>
                  {/* //title = null sẽ không hiển thị trên modal */}
                  {!stringIsEmpty(title) ? (
                    <Text style={styles.title}>{title}</Text>
                  ) : null}
                  <FlatList
                    style={{flex: 1}}
                    data={data}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => item.id}
                    renderItem={(item, index) => renderItem(item, index)}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}
Picker.defaultProps = {
  onChangeItem: () => {},
  noDataMessage: 'Không có dữ liệu',
  position: 'flex-end',
  height: '40%',
};
const styles = StyleSheet.create({
  title: {
    fontSize: Sizes.s40,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: Sizes.s15,
    borderColor: '#EFEFEF',
    borderBottomWidth: Sizes.s2,
  },
  item: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Sizes.s30,
    marginHorizontal: Sizes.s30,
    borderColor: '#EFEFEF',
    borderBottomWidth: Sizes.s2 * 0.7,
  },
  pickerStyle: {
    borderColor: '#D7DDE3',
    borderWidth: 1,
    height: Sizes.s90,
    marginTop: Sizes.s10,
    marginBottom: Sizes.s10,
    borderRadius: Sizes.s7,
    justifyContent: 'center',
    paddingHorizontal: Sizes.s10,
  },
  modal: {
    borderTopRightRadius: Sizes.s40,
    borderTopLeftRadius: Sizes.s40,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
