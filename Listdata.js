import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Alert, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUsers, faChevronRight } from '@fortawesome/free-solid-svg-icons';


const Listdata = () => {
    const jsonUrl = 'http://10.0.2.2:3000/perusahaan';
    const [isLoading, setLoading] = useState(true);
    const [dataUser, setDataUser] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setLoading(true);
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                setDataUser(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    };

    const deleteData = (id) => {
        fetch(`${jsonUrl}/${id}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => {
                Alert.alert('Sukses', 'Data berhasil dihapus');
                fetchData();
            })
            .catch((error) => {
                console.error(error);
                Alert.alert('Error', 'Gagal menghapus data');
            });
    };

    const openProfile = (url) => {
        if (!url) {
            Alert.alert('Error', 'URL tidak ditemukan');
            return;
        }

        // Tambahkan protokol jika tidak ada
        const validUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`;

        Linking.openURL(validUrl)
            .catch((error) => {
                console.error('Error saat membuka URL:', error);
                Alert.alert('Error', 'Terjadi kesalahan saat membuka URL');
            });
    };


    return (
        <SafeAreaView>
            {isLoading ? (
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={styles.cardtitle}>Loading...</Text>
                </View>
            ) : (
                <View>
                    <FlatList
                        style={{ marginBottom: 0 }}
                        data={dataUser}
                        onRefresh={fetchData}
                        refreshing={refresh}
                        keyExtractor={({ id }) => id.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <TouchableOpacity onPress={() => openProfile(item.profil)}>
                                    <View style={styles.card}>
                                        <View style={styles.avatar}>
                                            <FontAwesomeIcon icon={faUsers} size={30} color={item.color || 'black'} />
                                        </View>
                                        <View>
                                            <Text style={styles.cardtitle}>Nama Perusahaan:</Text>
                                            <Text style={styles.profil}>{item.nama}</Text>

                                            <Text style={styles.cardtitle}>Profil Perusahaan:</Text>
                                            <Text>{item.profil}</Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                        
                                        </View>
                                    </View>
                                </TouchableOpacity>


                                {/* <View style={styles.form}>
                                    <Button
                                        title="Hapus"
                                        onPress={() =>
                                            Alert.alert('Hapus data', 'Yakin akan menghapus data ini?', [
                                                { text: 'Tidak', onPress: () => console.log('Batal hapus') },
                                                { text: 'Ya', onPress: () => deleteData(item.id) },
                                            ])
                                        }
                                        color={'red'}
                                    />
                                </View> */}
                            </View>
                        )}
                    />
                </View>
            )}
        </SafeAreaView>
    );
};

export default Listdata;

const styles = StyleSheet.create({
    title: {
        paddingVertical: 12,
        backgroundColor: '#333',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    avatar: {
        borderRadius: 100,
        width: 80,
    },
    cardtitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    card: {
        flexDirection: 'row',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
        marginHorizontal: 20,
        marginVertical: 7,
        overflow: 'hidden', // Prevents text overflow
        flexWrap: 'wrap', // Allow text to wrap inside the box
    },
    form: {
        padding: 10,
        marginBottom: 20,
    },
});
