import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';

import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import { Feather } from '@expo/vector-icons'

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import api from '../../services/api';

import styles from './styles';

function TeacherList() {

    const [teachers, setTeachers] = useState([]);
    const [favorites, setFavorites] = useState<number[]>([]);

    const [isFilterVisivle, setIsFilterVisible] = useState(true);

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersId = favoritedTeachers.map((favoritedTeacher: Teacher) => {
                    return favoritedTeacher.id
                });
                setFavorites(favoritedTeachersId);
            }
        });
    }

    useFocusEffect(() => {loadFavorites()}); // não funcionou, usar context api ou redux para gerenciamento de estados

    function handleToggleFiltersVisible(){
        setIsFilterVisible(!isFilterVisivle);
    }

    async function handleFiltersSubmit() {
        loadFavorites();

        const response = await api.get('classes', {
            params: {
                subject,
                week_day,
                time
            }
        });
        
        setTeachers(response.data);
        handleToggleFiltersVisible();//setou false diretamente na função setIsFilterVisible
    }

    return (
        <View style={styles.container}>
            <PageHeader 
                title='Proffys disponíveis' 
                headerRight={(
                    <BorderlessButton onPress={handleToggleFiltersVisible} >
                        <Feather name='filter' size={24} color='#fff' />
                    </BorderlessButton>
                )}
            >
                
                {/* children */}
                {isFilterVisivle && (
                    <View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                    <TextInput
                        style={styles.input}  
                        value={subject}
                        onChangeText={ (texto) => {setSubject(texto)} }
                        placeholder='Qual a matéria?'
                        placeholderTextColor='#c1bccc'
                    />

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da semana</Text>
                            <TextInput
                                style={styles.input}
                                value={week_day}
                                onChangeText={ texto => setWeekDay(texto) }
                                placeholder='Qual dia?'
                                placeholderTextColor='#c1bccc'
                            />
                        </View>

                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput
                                style={styles.input} 
                                value={time}
                                onChangeText={ texto => setTime(texto) }
                                placeholder='Qual horário?'
                                placeholderTextColor='#c1bccc'
                            />
                        </View>
                    </View>

                    <RectButton 
                        style={styles.submitButton}
                        onPress={handleFiltersSubmit}
                    >
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>
                )}
                
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {teachers.map((teacher: Teacher) => (
                    <TeacherItem 
                        key={teacher.id} 
                        teacher={teacher} 
                        favorited={favorites.includes(teacher.id)}
                        />
                ))}
                
            </ScrollView>
        </View>
    );
}

export default TeacherList;