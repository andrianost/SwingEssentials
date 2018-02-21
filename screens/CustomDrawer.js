import React from 'react'
import { Text, View, Image, StyleSheet } from 'react-native'
import { DrawerItems } from 'react-navigation'
import {connect} from 'react-redux';

function mapStateToProps(state){
    return {
        firstName: state.userData.firstName
    };
}

class CustomDrawer extends React.Component {
  render() {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.text}>Welcome {this.props.firstName}</Text>
            </View>
            <DrawerItems {...this.props} />{/* this.props merges the navigator props with the props we care about above (e.g.username) */}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height:120,
    backgroundColor:"#231f61",
    opacity:.8,
    justifyContent:'center',
    alignItems: 'center'
  },
  text: {
    color:"white",
    fontSize: 24
  },
});

export default connect(mapStateToProps)(CustomDrawer);
