import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#8257e5',
        justifyContent: 'center',
        padding: 40,
    },

    content: {
        flex: 1,
        justifyContent: 'center'
    },

    title: {
        fontFamily: 'Archivo_700Bold',
        color: '#FFFFFF',
        fontSize: 32,
        maxWidth: 180,
        lineHeight: 37,
    },

    description: {
        marginTop: 24,
        fontFamily: 'Poppins_400Regular',
        color: '#d4c2ff',
        fontSize: 16,
        maxWidth: 240,
        lineHeight: 26,
    },

    okButton: {
        marginVertical: 40,
        backgroundColor: '#04D361',
        height: 58,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    okButtonText: {
        fontFamily: 'Archivo_700Bold',
        fontSize: 16,
        color: '#fff',
    },
});

export default styles;