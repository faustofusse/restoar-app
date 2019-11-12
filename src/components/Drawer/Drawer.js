import React from 'react';
import {
	View,
	Text,
	Image,
	ScrollView,
	Dimensions,
	StyleSheet,
	TouchableOpacity,
	Button
} from 'react-native';
import { DARK_PRIMARY } from '../../resources/colors';

import { onSignOut } from "../../services/storage";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class MenuDrawer extends React.Component {
	navLink(nav, text) {
		return (
			<TouchableOpacity style={{ height: 50 }} onPress={() => this.props.navigation.navigate(nav)}>
				<Text style={styles.link}>{text}</Text>
			</TouchableOpacity>
		)
	}

	render() {
		return (
			<View style={styles.container}>
				<ScrollView style={styles.scroller}>
					<View style={styles.topLinks}>
						<View style={styles.profile}>
							<View style={styles.imgView}>
								<Image style={styles.img} source={require('../../resources/assets/pinguino.jpg')} />
							</View>
							<View style={styles.profileText}>
								<Text style={styles.name}>Fausto Fusse</Text>
							</View>
						</View>
					</View>
					<View style={styles.bottomLinks}>
						{this.navLink('Mozo', 'Mesas')}
						{this.navLink('Link', 'Link')}
						{this.navLink('Configuracion', 'Configuración')}
						<Button
							buttonStyle={{ marginTop: 20 }}
							backgroundColor="#03A9F4"
							title="Salir"
							onPress={() => {
								onSignOut().then(() => this.props.navigation.navigate('SignIn'));
							}}
						/>
					</View>
				</ScrollView>
				<View style={styles.footer}>
					<Text style={styles.description}>Restoar</Text>
					<Text style={styles.version}>v1.0</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'lightgray',
	},
	scroller: {
		flex: 1,
	},
	profile: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		paddingTop: 25,
		borderBottomWidth: 1,
		borderBottomColor: '#777777',
	},
	profileText: {
		flex: 3,
		flexDirection: 'column',
		justifyContent: 'center',
	},
	name: {
		fontSize: 20,
		paddingBottom: 5,
		color: 'white',
		textAlign: 'left',
	},
	imgView: {
		flex: 1,
		paddingLeft: 20,
		paddingRight: 20,
	},
	img: {
		height: 70,
		width: 70,
		borderRadius: 50,
	},
	topLinks: {
		height: 160,
		backgroundColor: DARK_PRIMARY,
	},
	bottomLinks: {
		flex: 1,
		backgroundColor: 'white',
		paddingTop: 10,
		paddingBottom: 450,
	},
	link: {
		flex: 1,
		fontSize: 20,
		padding: 6,
		paddingLeft: 14,
		margin: 5,
		textAlign: 'left',
	},
	footer: {
		height: 50,
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: 'white',
		borderTopWidth: 1,
		borderTopColor: 'lightgray'
	},
	version: {
		flex: 1,
		textAlign: 'right',
		marginRight: 20,
		color: 'gray'
	},
	description: {
		flex: 1,
		marginLeft: 20,
		fontSize: 16,
	}
})