import AsyncStorage from '@react-native-async-storage/async-storage';

let lightModeColor = {
  backgroundColor: '#ffffff',
  backgroundColorHome: '#E5E5E5',
  secondaryBackground: '#F4F4F4',
  normal: '#1890FF',
  popupBackground: '#ffffff',
  border: '#E8E8E8',
  placeholder: '#8F8F8F',
  labelFocus: '#8C8C8C',
  error: '#F5222D',
  text: '#262626',
  green: '#4CD964',
  drawer: '#ffffff',
  header: '#1890FF',
  imageIcon: '#262626',
  aboutHeader:'#1890FF',
  textdiff :'#000000',
  menuCategoryChoose:'#E8E8E8',
  keyboardAppearance:'light',
};

let darkModeColor = {
  aboutHeader:'#6A6A6A',
  backgroundColor: '#6A6A6A',
  backgroundColorHome: '#6A6A6A',
  secondaryBackground: '#2A2731',
  normal: '#1890FF',
  popupBackground: '#2A2731',
  border: '#595959',
  placeholder: '#8F8F8F',
  labelFocus: '#8C8C8C',
  error: '#F5222D',
  text: '#ffffff',
  green: '#4CD964',
  drawer: '#595959',
  header: '#6A6A6A',
  imageIcon: '#ffffff',
  textdiff:'#8C8C8C',
  menuCategoryChoose:'#595959',
  keyboardAppearance:'dark'
};

let color = lightModeColor;

let checkAppMode = async () => {
  let value = await AsyncStorage.getItem('appMode');

  if (value === 'dark') {
    color = darkModeColor;
  } else {
    color = lightModeColor;
  }
};

let onChangeAppMode = async (appType) => {
  const value = await AsyncStorage.getItem('appMode');
  if (value === null) {
    await AsyncStorage.setItem('appMode', 'dark');
    color = darkModeColor;
  } else if (value === 'dark') {
    await AsyncStorage.setItem('appMode', 'light');
    color = lightModeColor;
  } else {
    await AsyncStorage.setItem('appMode', 'dark');
    color = darkModeColor;
  }
};

let getAppMode = async () => {
  const value = await AsyncStorage.getItem('appMode');
  return value;
};

export {
  color,
  lightModeColor,
  darkModeColor,
  getAppMode,
  onChangeAppMode,
  checkAppMode,
};
