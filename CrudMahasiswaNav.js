import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profil from './App';
import Mahasiswa from './Mahasiswa';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUserGraduate, faUser, faPlusCircle, faUserPen } from '@fortawesome/free-solid-svg-icons';
import { WebView } from 'react-native-webview';
import Createdata from './Createdata';
import Listdata from './Listdata';
import Editdata from './Editdata'



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
function EditScreen() {
    return (
        <Editdata />
    );
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Tambah Data" component={HomeScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faPlusCircle} size={32} color={color} />
                        ),
                    }} />
                <Tab.Screen name="Data Mahasiswa" component={DataMahasiswaScreen} options={{
                    headerShown: true,
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faUserGraduate} size={32} color={color} />
                    ),
                }} />
                <Tab.Screen name="Edit" component={EditScreen} options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <FontAwesomeIcon icon={faUserPen} size={32} color={color} />
                    ),
                }} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}