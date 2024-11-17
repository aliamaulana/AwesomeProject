import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profil from './App';
import Mahasiswa from './Mahasiswa';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUserGraduate, faUser } from '@fortawesome/free-solid-svg-icons';
import { WebView } from 'react-native-webview';
import Createdata from './Createdata';
import Listdata from './Listdata';



function HomeScreen() {
    return (
        <Createdata />
    );
}

function DataMahasiswaScreen() {
    return (
        <Listdata />
    );
}
function WebScreen() {
    return (
        <WebView
            source={{ uri: 'https://github.com/aliamaulana' }}
        />
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Profil" component={HomeScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faUser} size={32} color={color} />
                        ),
                    }} />
                <Tab.Screen name="Data Mahasiswa" component={DataMahasiswaScreen} options={{
                    headerShown: true,
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faUserGraduate} size={32} color={color} />
                    ),
                }} />
                <Tab.Screen name="GitHub" component={WebScreen} options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faGithub} size={32} color={color} />
                    ),
                }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}