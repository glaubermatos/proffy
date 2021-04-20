import React, { useState } from 'react';
import { View, Image, Text, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unFavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';

export interface Teacher {
    id: number;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
    subject: string;
    cost: number;
}

interface TeacherItemProps {
    teacher: Teacher;
    favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => { // da para fazer desestruturação do objeto se quiser
    
    const [ isFavorited, setIsFavorited ] = useState(favorited);

    function handleLinkToWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=55${teacher.whatsapp}`);
        handleNewConnection();
    }

    function handleNewConnection() {
        api.post('connections', {
            user_id: teacher.id,
        });
    }

    async function handleToggleFavorited() {
        let favoritesArray = [];
        const favorites = await AsyncStorage.getItem('favorites');
        
        if (favorites) {
            favoritesArray = JSON.parse(favorites);
        }
        
        if (isFavorited) {
            // remover da lista de favoritos
            const favoriteIndex = favoritesArray.findIndex((teacherItem: Teacher) => {
                return teacherItem.id === teacher.id;
            });
            favoritesArray.splice(favoriteIndex, 1);

            setIsFavorited(false);

        } else {
            //adicionar na lista de favoritos
            favoritesArray.push(teacher);

            setIsFavorited(true);
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
    }
    
    return(
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image 
                    source={{ 
                        uri: teacher.avatar
                    }} 
                    style={styles.avatar} 
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>{ teacher.name }</Text>
                    <Text style={styles.subject}>{ teacher.subject }</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                { teacher.bio }
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'   '}
                    <Text style={styles.priceValue}>R$ { teacher.cost }</Text>
                </Text>
                <View style={styles.buttonsContainer}>
                    <RectButton 
                        style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
                        onPress={handleToggleFavorited}    
                    >
                        
                        {isFavorited 
                            ? <Image source={unFavoriteIcon}/> 
                            : <Image source={heartOutlineIcon}/>}
                        
                    </RectButton>

                    <RectButton onPress={handleLinkToWhatsapp} style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contato</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    )
}

export default TeacherItem;