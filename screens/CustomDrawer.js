import React from 'react'
import { Text, View } from 'react-native'
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
            <View style={{height:120,backgroundColor:"#f50057",justifyContent:'center',alignItems: 'center'}}>
                <Text style={{color:"white", fontSize: 24}}>Welcome {this.props.firstName}</Text>
            </View>
            <DrawerItems {...this.props} />{/* this.props merges the navigator props with the props we care about above (e.g.username) */}
        </View>
    )
  }
}

export default connect(mapStateToProps)(CustomDrawer);
