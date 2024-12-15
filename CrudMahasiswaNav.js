import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUsers, faPlusCircle, faUserPen, faMapMarked, faHome } from '@fortawesome/free-solid-svg-icons';
import { WebView } from 'react-native-webview';
import Createdata from './Createdata';
import Listdata from './Listdata';
import Editdata from './Editdata';
import JobFinder from './JobFinder'; // Pastikan import ini benar

function JobFinderScreen() {
    return <JobFinder />;
}
function DataPerusahaanScreen() {
    return <Listdata />;
}


function WebScreen() {
    return (
        <WebView
            source={{ uri: 'https://leaflet-map-pgpbl-6-green.vercel.app/' }}
        />
    );
}

function CreatScreen() {
    return <Createdata />;
}

function EditScreen() {
    return <Editdata />;
}

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Home"
                    component={JobFinderScreen}
                    options={{
                        headerShown: true,
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faHome} size={32} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Data Perusahaan"
                    component={DataPerusahaanScreen}
                    options={{
                        headerShown: true,
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faUsers} size={32} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Map"
                    component={WebScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faMapMarked} size={32} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Apply Lowongan"
                    component={CreatScreen}
                    options={{
                        headerShown: true,
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faPlusCircle} size={32} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Edit Data Loker"
                    component={EditScreen}
                    options={{
                        headerShown: true,
                        tabBarIcon: ({ color }) => (
                            <FontAwesomeIcon icon={faUserPen} size={32} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
