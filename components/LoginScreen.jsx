import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { Colors } from '@/constants/Colors'
import { useWarmUpBrowser } from './../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
    useWarmUpBrowser();

    const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);
  return (
    <View>
        <View style={{
            display:'flex',
            alignItems:'center',
            marginTop:100
        }}>
        <Image source ={require('./../assets/images/login.png')}
        style={{
            width:220,
            height:450,
            borderRadius:20,
            borderWidth:6,
            borderColor:'#000'
            }}
        />
        </View>
        <View style={{backgroundColor:'#fff',padding:20}} >
            <Text style={{
                fontSize:12,
                fontFamily:'outfit-bold',
            }}>
                Your Ultimate 
                <Text style={{
                    color:Colors.PRIMARY, 
                }}>
                    Community Buisness Directory 
                </Text><Text>App</Text>
            </Text>
            <TouchableOpacity
            onPress={onPress}
            style={{
                padding:18,
                borderRadius:99,
                backgroundColor:Colors.PRIMARY,
                marginTop:20

            }}>
                <Text style={{
                    textAlign:'center',
                    color:'#fff',
                    fontFamily:'outfit',
                }}>Lets Roll</Text>
            </TouchableOpacity>
        </View>
      
    </View>
  )
}