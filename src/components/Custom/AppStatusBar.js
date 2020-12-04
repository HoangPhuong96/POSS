import {StyleSheet} from 'react-native';


 const AppStatusBar = () => {
   
    return (
        <>
            <SafeAreaView style={styles.topSafeArea} />
            <SafeAreaView style={styles.bottomSafeArea}>
                <StatusBar barStyle="light-content" />
                <MainScreen />
            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    topSafeArea: {
        flex: 0, 
        backgroundColor: '#0294e1'
    }, 
    bottomSafeArea: {
        flex: 1, 
        backgroundColor: '#0294e1'
    },
});
export default AppStatusBar;