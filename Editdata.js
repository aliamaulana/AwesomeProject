import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, TextInput, Text, Button, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Editdata = () => {
    const lokerUrl = 'http://10.0.2.2:3001/loker';

    // State untuk input form
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [position, setPosition] = useState('');
    const [resumeLink, setResumeLink] = useState('');
    const [message, setMessage] = useState('');

    const [dataUser, setDataUser] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    // Ambil data user dari API
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        setRefresh(true); // Mulai refresh
        fetch(lokerUrl)
            .then((response) => response.json())
            .then((json) => {
                setDataUser(json);
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setLoading(false);
                setRefresh(false); // Selesai refresh
            });
    };

    // Pilih item untuk diedit
    const selectItem = (item) => {
        setSelectedUser(item);
        setName(item.name);
        setEmail(item.email);
        setPhone(item.phone);
        setPosition(item.position);
        setResumeLink(item.resumeLink);
        setMessage(item.message);
    };

    const deleteData = (id) => {
        fetch(`${lokerUrl}/${id}`, {
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

    // Update data yang sudah ada
    const submit = () => {
        const data = {
            name,
            email,
            phone,
            position,
            resumeLink,
            message,
        };

        fetch(`${lokerUrl}/${selectedUser.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                Alert.alert('Sukses', 'Data tersimpan');
                fetchData();
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                Alert.alert('Error', 'Terjadi kesalahan saat menyimpan data');
            });
    };

    return (
        <SafeAreaView>
            <View>
                {isLoading ? (
                    <Text>Loading...</Text>
                ) : (
                    <ScrollView style={styles.form}>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Nama Lengkap"
                                value={name}
                                onChangeText={(value) => setName(value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                value={email}
                                keyboardType="email-address"
                                onChangeText={(value) => setEmail(value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Nomor Telepon"
                                value={phone}
                                keyboardType="phone-pad"
                                onChangeText={(value) => setPhone(value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Posisi yang Dilamar"
                                value={position}
                                onChangeText={(value) => setPosition(value)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Tautan Resume"
                                value={resumeLink}
                                onChangeText={(value) => setResumeLink(value)}
                            />
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Pesan Tambahan"
                                value={message}
                                multiline
                                numberOfLines={4}
                                onChangeText={(value) => setMessage(value)}
                            />
                            <Button title="Update Lamaran" onPress={submit} />
                        </View>

                        <FlatList
                            style={{ marginBottom: 0 }}
                            data={dataUser}
                            onRefresh={fetchData} // Fungsi refresh
                            refreshing={refresh} // State refreshing
                            keyExtractor={({ id }) => id.toString()}
                            renderItem={({ item }) => (
                                <View>
                                    <TouchableOpacity onPress={() => selectItem(item)}>
                                        <View style={styles.card}>
                                            <View>
                                                <Text style={styles.cardtitle}>Nama Lengkap: {item.name}</Text>
                                                <Text>Email: {item.email}</Text>
                                                <Text>Nomor Telepon: {item.phone}</Text>
                                                <Text>Posisi yang Dilamar: {item.position}</Text>
                                                <Text>Tautan Resume: {item.resumeLink}</Text>
                                                <Text>Pesan Tambahan: {item.message}</Text>
                                            </View>
                                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                                <FontAwesomeIcon icon={faPenToSquare} size={20} />
                                            </View>
                                        </View>
                                    </TouchableOpacity>
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
                                </View>
                            )}
                        />
                    </ScrollView>
                )}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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
    },
    cardtitle: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    form: {
        padding: 10,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 8,
        padding: 8,
        width: '100%',
        marginVertical: 5,
    },
});

export default Editdata;
