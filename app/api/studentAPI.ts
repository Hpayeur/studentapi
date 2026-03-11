import axios from "axios";

const API_URL = "http://localhost:3001";

export interface Student {
  _id: string;
  fristName: string;
  lastName: string;
  email: string;
  age: number;
  currentCollege: string;
}

// Fetch all Students
async function fetchStudents(): Promise<Student[]> {
  try {
    const response = await axios.get(`${API_URL}/students`);
    return response.data;
  } catch (error) {
    console.log("Error Fetching Students:", error);
    throw new Error("Failed to fetch students");
  }
}

//Delete A Student
async function deleteStudent(id: string): Promise<void> {
  try {
    await axios.delete(`${API_URL}/students/${id}`);
  } catch (error) {
    console.log("Error deleting student:", error);
    throw new Error("Failed to delete students");
  }
}

// Submit (Add or Update a student)
async function submitStudent(
  studentData: Omit<Student, "_id">,
  id?: string,
): Promise<void> {
  try {
    if (id) {
      await axios.put(`${API_URL}/students/${id}`, studentData);
    } else {
      // Add new student
      const newId = Date.now().toString();
      await axios.post(`${API_URL}/students`, { ...studentData, _id: newId });
    }
  } catch (error) {
    console.log("Error submitting student:", error);
    throw new Error("Failed to submit student");
  }
}

export { fetchStudents, deleteStudent, submitStudent };
