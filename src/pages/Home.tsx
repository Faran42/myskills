import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
  FlatList
} from 'react-native';

import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
  date?: Date;
}

export default function Home() {

  const [newSkill, setNewSkill] = useState('')
  const [mySkills, setMySkills] = useState<SkillData[]>([])
  const [grettings, setGrettings] = useState('')

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }

    setMySkills([...mySkills, data])
  }

  function handleRemoveSkill(id: string) {
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id
    ))
  }

  useEffect(() => {
    const currentHour = new Date().getHours() - 3;

    if (currentHour < 12) {
      setGrettings('Good morning')
    }
    else if (currentHour >= 12 && currentHour < 18) {
      setGrettings('Good afternoon')
    }
    else {
      setGrettings('Good night')
    }
  }, [newSkill])

  return (
    <View
      style={styles.container}
    >

      <Text style={styles.title}>
        Welcome, Faran
      </Text>

      <Text style={styles.grettings}>
        {grettings}
      </Text>


      <TextInput
        style={styles.input}
        placeholder="New Skill"
        placeholderTextColor='#555'
        onChangeText={setNewSkill}
      />

      <Button title="Add" onPress={handleAddNewSkill} />

      <Text style={[styles.title, { marginVertical: 30 }]}>
        My Skills
      </Text>

      {/* {
        mySkills.map(skill => (
          <SkillCard key={skill}  skill={skill} />
        ))
      } */}


      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center', 
    //alignItems: 'center',
    backgroundColor: '#121015',
    paddingVertical: 70,
    paddingHorizontal: 30,
  },

  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },

  input: {
    backgroundColor: '#1F1e25',
    color: '#fff',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,
    marginTop: 30,
    borderRadius: 7
  },

  grettings: {
    color: '#fff'
  }
})