import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import axios from 'axios';
import LottieView from 'lottie-react-native';
import CountdownTimer from '../Component/CountdownTimer';

const ExamCard = ({ item, navigate }) => {
  const [isExamLive, setIsExamLive] = useState(false);

  useEffect(() => {
    const checkExamStatus = () => {
      const live = new Date(item.examDate).getTime() <= Date.now();
      setIsExamLive(live);
    };

    checkExamStatus(); // run immediately
    const interval = setInterval(checkExamStatus, 1000); // check every sec

    return () => clearInterval(interval); // cleanup
  }, [item.examDate]);

  return (
    <TouchableOpacity
      style={[styles.card, !isExamLive && { opacity: 0.5 }]}
      disabled={!isExamLive}
      onPress={() =>
        navigate.navigate('TestPage', {
          testName: item.name,
          testId: item.id,
        })
      }
    >
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.level}>Level {item.level}</Text>
          {isExamLive ? (
            <Text style={styles.ready}>Exam is live</Text>
          ) : (
            <CountdownTimer examDate={item.examDate} />
          )}
        </View>
        <Ionicons name="school-sharp" size={30} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const Exam = () => {
  const [exam, setExam] = useState([
    {
      id: '1',
      name: 'Math Test',
      level: 'Easy',
      examDate: '2025-08-18T10:30:00Z',
    },
    {
      id: '2',
      name: 'Science Test',
      level: 'Medium',
      examDate: '2025-08-19T03:79:00Z', // fixed invalid time 03:69
    },
    {
      id: '3',
      name: 'English Test',
      level: 'Hard',
      examDate: '2025-08-25T09:00:00Z',
    },
  ]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigation();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios(
        'https://68a169876f8c17b8f5d9c4b0.mockapi.io/get/tests/tests',
      );
      // Example: replace with response.data when ready
      setExam([
        {
          id: '1',
          name: 'Math Test',
          level: 'Easy',
          examDate: '2025-08-18T10:30:00Z',
        },
        {
          id: '2',
          name: 'Science Test',
          level: 'Medium',
          examDate: '2025-08-19T03:79:00Z',
        },
        {
          id: '3',
          name: 'English Test',
          level: 'Hard',
          examDate: '2025-08-25T09:00:00Z',
        },
      ]);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setTimeout(() => setLoading(false), 1500);
    }
  };

  if (loading) {
    return (
      <View style={styles.splashContainer}>
        <LottieView
          source={require('../Gif/loading.json')}
          autoPlay
          loop
          style={{ width: 350, height: 350 }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={exam}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ExamCard item={item} navigate={navigate} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FCDFBB',
  },
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 18, fontWeight: 'bold' },
  level: { fontSize: 14, color: 'gray' },
  ready: { marginTop: 5, color: 'green', fontWeight: '600' },
});

export default Exam;
