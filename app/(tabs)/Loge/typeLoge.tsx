// app/(tabs)/profile.tsx

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { FlatList, View, Text, StyleSheet, TextInput, Dimensions, StatusBar, SafeAreaView, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import api from '@/constants/api';
import { Button } from 'react-native-elements';
import Colors from '@/constants/Colors';
import Spacing from '@/constants/Spacing';
import FontSize from '@/constants/FontSize';
import Font from '@/constants/Font';

const { width, height } = Dimensions.get('screen');

const BG_ING = '';
const SPACING = 20;
const AVATAR_SIZE = 70;

export default function TypeLoge() {

  const [typeLoges, setTypeLoges] = useState([]);
  const [data, setData] = useState([]); // État pour stocker les données
  const [loading, setLoading] = useState(true); // État pour gérer le chargement


  useEffect(() => {
    const types:any = [];        
            const func = async () => {
              await api
                .get(`typeLoge`)
                .then(function (response) {
                  if (response.status === 200) {
                    const data = response.data.results;
                    data.map((item:any) => {
                      types.push(
                        {
                          id: item.id,
                          text: item.surface
                        }
                      );
                    })
                    setTypeLoges(types);
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            };
            func();
      
          return () => {};
        }, []);

  return (
    <ProtectedRoute>

      <View style={{padding: Spacing * 2}}>
        <View style={{alignItems: "center"}}>
          <Text style={{fontSize: FontSize.xLarge, color: Colors.primary, fontFamily: Font['poppins-bold'], marginVertical: Spacing * 3}}>
            Types de loge
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => router.push('/(tabs)/Loge/newTypeLoge')} style={{marginHorizontal: 20, padding: Spacing * 2, backgroundColor: Colors.primary, marginVertical: Spacing * 2, borderRadius: Spacing, shadowColor: Colors.primary, shadowOffset: {width: 0, height: Spacing}, shadowOpacity: 0.3, shadowRadius: Spacing}}>
          <Text style={{fontFamily: Font['poppins-bold'], color: Colors.onPrimary, textAlign: 'center', fontSize: FontSize.large}}>Ajouter un nouveau type de loge</Text>
      </TouchableOpacity>
      <FlatList
        data={[
          {key: 'Devin'},
          {key: 'Dan'},
          {key: 'Dominic'},
          {key: 'Jackson'},
          {key: 'James'},
          {key: 'Joel'},
          {key: 'John'},
          {key: 'Jillian'},
          {key: 'Jimmy'},
          {key: 'Julie'},
        ]}
        keyExtractor={item => item.key}
        contentContainerStyle={{padding: SPACING, paddingTop: StatusBar.currentHeight || 42}}
        renderItem={({item, index}) => {
        	return <View style={{flexDirection: 'row', padding: SPACING, marginBottom: SPACING, backgroundColor:'rgba(255,255,255,0.8)', borderRadius: 12, shadowColor: '#000', shadowOffset: {width: 0, height: 10}, shadowOpacity: .3, shadowRadius: 20}}>
        	   <Ionicons name='list' color={Colors.text} size={Spacing * 2} />
        	   <View>
        	      <Text style={{fontSize: 22, fontWeight: '700'}}>{item.key}</Text>
        	   </View>
        	</View>
        }}
      	/>
   
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ded',
      paddingTop: 22,
    },
    background: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    logoContainer: {
      alignItems: 'center',
      marginTop: 10,
    },
    logo: {
      width: 100,
      height: 100,
      borderRadius:60,
      resizeMode: 'contain',
    },
    formContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
      title: {
        fontSize: 18,
        color: '#000',
        marginStart: 20,
        marginBottom: 50,
        marginTop: 20,
      },
      card: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        padding: 20,
        marginBottom: 20,
      },
      inputContainer: {
        marginBottom: 20,
      },
      label: {
        fontSize: 16,
        color: '#333',
      },
      input: {
        height: 40,
        borderRadius:6,
        borderWidth: 1,
        borderColor: '#ddd',
        color: '#333',
        paddingLeft:10,
      },
      item: {
	 padding: 10,
	 fontSize: 18,
	 height: 44,
      },
      button: {
        marginVertical: 10,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
      },
  });

