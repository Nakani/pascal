import React from 'react';
import {
  ScrollView,
  View,
  Platform,
  Text,
  Button,
  AsyncStorage,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet
} from 'react-native-ui-kitten';
import {data} from '../../data';
import {FontAwesome} from '../../assets/icons';
import {scale, scaleModerate, scaleVertical} from '../../utils/scale';
import { Constants, LinearGradient } from 'expo';
import { NavigationActions } from 'react-navigation'
import PascalHeader from '../../utils/pascalHeader';


export class Perfil extends React.Component {

  constructor(props) {
    super(props);
    this.user = data.getUser();


    this.state = {
      dados:{},
      imageUser:'https://firebasestorage.googleapis.com/v0/b/pascal-37098.appspot.com/o/images-app%2Fimg-perfil(1).jpg?alt=media&token=1bb5f3d6-9fa6-47d6-b282-c31dda26dc95',
      imagePet:'https://www.animalepetshop.com.br/wp-content/themes/animale/assets/images/pet-cat-dog.png'
    }
  }

  componentDidMount(){
    this.dados();
  }

 dados = async () => {
    try {
      const value = await AsyncStorage.getItem('@user:dados');
      if (value !== null){
        var dados = JSON.parse(value);
        this.setState({dados: dados, imageUser: dados.picture.data.url})
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  }


  render() {
    return (
      <View style={styles.container}>
    <ScrollView style={styles.root}>
      <RkAvoidKeyboard>
        <View style={styles.containerPerfil}>
          <Image
            source={{ uri: this.state.imageUser }}
            style={styles.image}
          />
          <Image
            source={{ uri: this.state.imagePet }}
            style={styles.imagePet}
          />
        </View>
        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='header6 primary'>Seus Dados</RkText>
          </View>
          <View style={styles.row}>
            <RkTextInput label='Nome'
                         value={this.state.dados.name}
                         rkType='right clear'
                         onChangeText={(text) => this.setState({firstName: text})}/>
          </View>
          <View style={styles.row}>
            <RkTextInput label='Email'
                         value={this.state.dados.email}
                         placeholder='seu email!'
                         onChangeText={(text) => this.setState({email: text})}
                         rkType='right clear'/>
          </View>
          <View style={styles.row}>
            <RkTextInput label='Telefone'
                         value={this.state.dados.phone}
                         placeholder='seu telefone!'
                         onChangeText={(text) => this.setState({phone: text})}
                         rkType='right clear'/>
          </View>
        </View>
        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='primary header6'>Dados do seu Pet </RkText>
          </View>
          <View style={styles.row}>
            <RkTextInput label='Nome'
                         value={this.state.dados.nomePet}
                         rkType='right clear'
                         onChangeText={(text) => this.setState({firstName: text})}/>
          </View>
          <View style={styles.row}>
            <RkTextInput label='Data de nascimento'
                         value={this.state.dados.dataNascimento}
                         rkType='right clear'
                         onChangeText={(text) => this.setState({firstName: text})}/>
          </View>
          <View style={styles.row}>
            <RkTextInput label='Cor'
                         value={this.state.dados.cor}
                         rkType='right clear'
                         onChangeText={(text) => this.setState({firstName: text})}/>
          </View>
          <View style={styles.row}>
            <RkTextInput label='Peso'
                         value={this.state.dados.peso}
                         rkType='right clear'
                         onChangeText={(text) => this.setState({firstName: text})}/>
          </View>
          <View style={styles.row}>
            <RkTextInput label='Tutor'
                         value={this.state.dados.tutor}
                         rkType='right clear'
                         onChangeText={(text) => this.setState({tutor: text})}/>
          </View>
          <LinearGradient
            colors={['#FFC313', '#FFC313']}
            style={styles.buttonSave}
          >
            <Text style={{ color: '#fff', backgroundColor: 'transparent' }}>
              Salvar!
            </Text>
          </LinearGradient>
        </View>
      </RkAvoidKeyboard>
    </ScrollView>



      </View>
    )
  }
}

let styles = RkStyleSheet.create(theme => ({

  container: {
    flex: 1,
    backgroundColor: theme.colors.screen.base,
  },
  header:{
    height:(Platform.OS === 'ios') ? 70 : 50,
    paddingTop:(Platform.OS === 'ios') ? 50 : 0,
    justifyContent:'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingHorizontal: 20,
  },

  logoHeader: {
    width: 20,
    height: 10,

  },
  somHeader: {
    width: 120,
    height: 10,
  },
  searchHeader: {
    width: 20,
    height: 15,
  },

  root: {
    backgroundColor: theme.colors.screen.base
  },

  containerPerfil: {
    flexDirection: 'row',
    alignItems: 'center' ,
    marginBottom: 19,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 19,
    paddingVertical: 25
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderRadius:50,
    borderWidth: 1,
    borderColor: '#fff',
  },
  imagePet: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginLeft: 0,
    borderRadius:50,
    borderWidth: 1,
    borderColor: '#fff',
  },
  section: {
      marginVertical: 25
    },
    heading: {
      paddingBottom: 12.5
    },
    row: {
      flexDirection: 'row',
      paddingHorizontal: 17.5,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border.base,
      alignItems: 'center'
    },
    buttonSave: {
      height: 48, 
      width: 200, 
      alignItems: 'center', 
      justifyContent: 'center', 
      borderRadius: 5,
      marginBottom: 19,
      marginLeft: 50,
      marginRight: 50,
      marginTop: 19,
    },


}));