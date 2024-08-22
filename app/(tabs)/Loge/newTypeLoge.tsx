// app/(tabs)/profile.tsx

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Link, router } from 'expo-router'
import { useState } from 'react';
import api from '@/constants/api';
import { Button } from 'react-native-elements';

export default function TypeLoge() {

    const [surface, setSurface] = useState("");
    const [capaciteMax, setCapaciteMax] = useState("");

    const handleClick = async () => {
        await api.post(`typeLoge/new`, {
          surface: surface,
          capacite_max: capaciteMax,
        }).then((response) => {
          if (response.status === 201) {
            alert("Type de loge enregistre avec succes")
          }
          if (response.status === 202) {
            alert(`Le type de loge avec pour surface ${surface} existe deja`)
            return
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      };

  return (
    <ProtectedRoute>
      <View style={styles.main}>
         <View>
           <Text style={styles.title}>TYPE DE LOGE</Text>
         </View>
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/*<Link href="/tab_1">Go to tab 1</Link>
            <Pressable onPress={() => router.push('/tab_2')}>
                <Text>Go to tab 2</Text>
            </Pressable>*/}
            <View style={styles.card}>
              <Button style={styles.button} title="Retour a la liste des types de loge" onPress={() => router.push('/typeLoge')} />
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Surface</Text>
                <TextInput
                    style={styles.input}
                    value={surface}
                    onChangeText={setSurface}
                    placeholder="Saisir la surface"
                    placeholderTextColor="#999"
                />
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Capacite maximale</Text>
                <TextInput
                    style={styles.input}
                    value={capaciteMax}
                    onChangeText={setCapaciteMax}
                    placeholder="Saisir la capacite maximale"
                    placeholderTextColor="#999"
                />
              </View>
              <Button style={styles.button} title="Valider" onPress={handleClick} />
              <View>
                <Link href="/loge">Loge</Link>
              </View>
            </View>
        </View>
       </View>
    </ProtectedRoute>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    main: {
      backgroundColor: '#ded'
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
      button: {
        marginVertical: 10,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
      },
  });

