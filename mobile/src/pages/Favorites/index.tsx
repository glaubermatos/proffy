import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';

function Favorites() {

    const [ teachersFavorites, setTeachersFavorites ] = useState<Teacher[]>([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                setTeachersFavorites(favoritedTeachers);
            }
        });
    }

    useFocusEffect(loadFavorites);

    return (
        <View style={styles.container}>
            <PageHeader title='Meus proffys favoritos' />

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {teachersFavorites.map(teacherFavorite => {
                    return <TeacherItem key={teacherFavorite.id} teacher={teacherFavorite} favorited={true} />;
                })}

            </ScrollView>
        </View>
    );
}

export default Favorites;