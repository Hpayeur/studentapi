import axios from "axios";

const API_URL = "http://lcoalhost: 3000";

export interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  currentCollege: string;
}

// Fetch All students
async function fetchStudents(): Promise<Student[]> {
  try {
    const response = await axios.get(`${API_URL}/students`);
    return response.data;
  } catch (error) {
    console.log("Error fetching students: ", error);
    throw new Error("Faild to fetch students");
  }
}
// Delete a Student
async function deleteStudent(id: string): Promise<void> {
  try {
    await axios.delete(`${API_URL}/students/${id}`);
  } catch (error) {
    console.log("Error deleting student: ", error);
    throw new Error("Failed to delete student");
  }
}

// submit (add or update) a Student
async function submitStudent(
  studentData: Omit<Student, "_id">,
  id?: string,
): Promise<void> {
  try {
    if (id) {
      await axios.put(`${API_URL}/students/${id}`, studentData);
    } else {
      // Add a student
      const newId = Date.now().toString();
      await axios.post(`${API_URL}/students`, { ...studentData, _id: newId });
    }
  } catch (error) {
    console.log("Error submitting student: ", error);
    throw new Error("Failed to submit students");
  }
}
export { fetchStudents, deleteStudent, submitStudent };
