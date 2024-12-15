import React from 'react'; 
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';

const JobFinder = () => {
    // Fungsi untuk membuka URL
    const handlePressGithub = () => {
        Linking.openURL("https://github.com/aliamaulana"); // Ganti dengan URL GitHub Anda
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Welcome to Job Finder</Text>
                <Text style={styles.subtitle}>Apply your dream job easily and quickly</Text>
            </View>

            <View style={styles.cardContainer}>
                {/* Menggunakan gambar dari link eksternal */}
                <Image
                    source={{ uri: 'https://asset.kompas.com/crops/YKF9vWqErQBMozD7MrWF7eAieAg=/0x407:5000x3740/1200x800/data/photo/2022/01/03/61d2d41ca0c15.jpg' }} 
                    style={styles.profesiImage} 
                />

                <View style={styles.card}>
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/7601/7601247.png' }}
                        style={styles.cardImage}
                    />
                    <Text style={styles.cardTitle}>About</Text>
                    <Text style={styles.cardDescription}>Job Finder adalah aplikasi inovatif yang dirancang untuk memudahkan pencarian pekerjaan dan pendaftaran kerja bagi semua orang.</Text>
                </View>

                <View style={styles.card}>
                    <Image
                        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/856/856528.png' }}
                        style={styles.cardImage}
                    />
                    <Text style={styles.cardTitle}>About</Text>
                    <Text style={styles.cardDescription}>Aplikasi ini menyediakan daftar perusahaan beserta profilnya. Selain itu terdapat fitur Map yang berfungsi untuk menunjukan lokasi sebaran perusahaan yang terdapat di Jawa Tengah. Pengguna dapat mendaftar pekerjaan melalui menu Apply Lowongan, kemudian dapat mengedit data apabila terjadi kesalahan input melalui menu Edit Data</Text>
                </View>
            </View>

            <View style={styles.footer}>
                <View style={styles.footerText}>
                    <Text style={styles.footerText}>© 2024 </Text>
                    <TouchableOpacity onPress={handlePressGithub}>
                        <Text style={styles.footerText}>Alia Maulana Resti</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
    },
    header: {
        backgroundColor: '#4CAF50',
        padding: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    subtitle: {
        fontSize: 16,
        color: '#fff',
        marginTop: 5,
    },
    cardContainer: {
        padding: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    card: {
        backgroundColor: '#fff',
        width: '45%',
        marginVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    cardImage: {
        width: 60,
        height: 60,
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    cardDescription: {
        fontSize: 14,
        textAlign: 'center',
        color: '#777',
        marginTop: 5,
    },
    profesiImage: {
        width: '100%',
        height: 200, // Sesuaikan tinggi gambar
        marginBottom: 20,
    },
    footer: {
        backgroundColor: '#4CAF50',
        padding: 10,
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        marginTop: 5,
    },
    footerText: {
        fontSize: 14,
        color: '#fff',
    },
});

export default JobFinder;
