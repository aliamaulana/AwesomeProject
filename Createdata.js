import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, TextInput, Text, Button, StyleSheet } from 'react-native';

const Createdata = () => {
    const lokerUrl = 'http://10.0.2.2:3001/loker';

    // State untuk input form
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [position, setPosition] = useState('');
    const [resumeLink, setResumeLink] = useState('');
    const [message, setMessage] = useState('');

    // Fungsi submit untuk mengirimkan data ke API
    const submit = () => {
        const data = {
            name: name,
            email: email,
            phone: phone,
            position: position,
            resumeLink: resumeLink,
            message: message,
        };

        // Mengirim data ke API dengan method POST
        fetch(lokerUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((json) => {
            console.log(json);
            alert('Lamaran kerja berhasil dikirim');
            setName('');
            setEmail('');
            setPhone('');
            setPosition('');
            setResumeLink('');
            setMessage('');
        })
        .catch((error) => console.error(error));
    }

    return (
        <SafeAreaView>
            <View>
                <ScrollView style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nama Lengkap"
                        value={name}
                        onChangeText={(value) => setName(value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(value) => setEmail(value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Nomor Telepon"
                        keyboardType="phone-pad"
                        value={phone}
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
                        placeholder="Tautan Resume (URL)"
                        value={resumeLink}
                        onChangeText={(value) => setResumeLink(value)}
                    />
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Pesan Tambahan"
                        multiline
                        numberOfLines={4}
                        value={message}
                        onChangeText={(value) => setMessage(value)}
                    />
                    <Button title="Kirim Lamaran" style={styles.button} onPress={submit} />
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    form: {
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 8,
        padding: 8,
        width: '100%',
        marginVertical: 5,
    },
    button: {
        marginVertical: 10,
    }
});

export default Createdata;
