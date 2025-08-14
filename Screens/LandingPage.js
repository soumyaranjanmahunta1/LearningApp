import React from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const tests = [
  { id: '1', name: 'Math Test', level: 'Level I' },
  { id: '2', name: 'Science Test', level: 'Level II' },
];

const LandingPage = ({ navigation }) => {
  const navigate = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Available Tests</Text>
      <FlatList
        data={tests}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigate.navigate('TestPage', { testName: item.name })
            }
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.level}>{item.level}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  card: {
    padding: 20,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  level: { fontSize: 14, color: 'gray' },
});

export default LandingPage;
