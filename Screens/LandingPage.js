import React from 'react';
import { useNavigation } from '@react-navigation/native';
// import Ionicons from 'react-native-vector-icons/file-pen-line';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
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
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.level}>{item.level}</Text>
              </View>
              <FontAwesome6 name="file-pen" size={30} color="black" />
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
    backgroundColor: '#FCDFBB',
  },
  card: {
    padding: 20,
    marginBottom: 15,
    backgroundColor: '#FEF3E7',
    borderRadius: 10,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between', // text left, icon right
    alignItems: 'center',
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
