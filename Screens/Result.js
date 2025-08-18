import axios from 'axios';
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const examData = [
  {
    exam: 'Maths Midterm',
    results: [
      { name: 'John Doe', marks: 85 },
      { name: 'Jane Smith', marks: 92 },
      { name: 'Jane Smith', marks: 92 },

      { name: 'Jane Smith', marks: 92 },
      { name: 'Jane Smith', marks: 92 },
      { name: 'Jane Smith', marks: 92 },
      { name: 'Jane Smith', marks: 92 },

      { name: 'Alex Brown', marks: 78 },
    ],
  },
  {
    exam: 'Science Midterm',
    results: [
      { name: 'John Doe', marks: 88 },
      { name: 'Jane Smith', marks: 95 },
      { name: 'Alex Brown', marks: 82 },
    ],
  },
  {
    exam: 'English Midterm',
    results: [
      { name: 'John Doe', marks: 90 },
      { name: 'Jane Smith', marks: 94 },
      { name: 'Alex Brown', marks: 80 },
    ],
  },
];

const Result = () => {
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios(
        'https://68a169876f8c17b8f5d9c4b0.mockapi.io/get/tests/tests',
      );
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={examData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.examCard}>
            <Text style={styles.examTitle}>{item.exam}</Text>

            {/* Table Header */}
            <View style={[styles.row, styles.headerRow]}>
              <Text style={[styles.cell, styles.headerCell]}>Student Name</Text>
              <Text style={[styles.cell, styles.headerCell]}>Marks</Text>
            </View>

            {/* Table Rows */}
            {item.results.map((student, idx) => (
              <View
                key={idx}
                style={[
                  styles.row,
                  idx % 2 === 0 ? styles.evenRow : styles.oddRow,
                ]}
              >
                <Text style={styles.cell}>{student.name}</Text>
                <Text style={styles.cell}>{student.marks}</Text>
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    padding: 10,
    backgroundColor: '#FCDFBB',
    paddingTop: 70,
  },
  examCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  examTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#2c3e50',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingVertical: 8,
    paddingHorizontal: 5,
  },
  headerRow: {
    backgroundColor: '#FCDFBB',
  },
  cell: {
    flex: 1,
    fontSize: 12,
    color: '#2c3e50',
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  evenRow: {
    backgroundColor: '#FEF3E7',
  },
  oddRow: {
    backgroundColor: '#fff',
  },
});

export default Result;
