import React, { useState, useEffect } from "react";

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  currentCollege: string;
}

interface StudentFormProps {
  student: Student | null;
  onSubmit: (student: Omit<Student, "_id">, id?: string) => void;
}

const StudentForm = ({ student, onSubmit }: StudentFormProps) => {
  const [formState, setFormState] = useState<Omit<Student, "_id">>({
    firstName: "",
    lastName: "",
    email: "",
    age: 0,
    currentCollege: "",
  });

  useEffect(() => {
    if (student) {
      const { _id, ...rest } = student;
    } else {
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        age: 0,
        currentCollege: "",
      });
    }
  }, [student]);

  const handleChange = (field: keyof Omit<Student, "_id">, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formState, student?._id);
  };

  return (
    <div className="bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2x1 font-bold text-grey-800 mb-4">
        {student ? "Update Student" : "Add New Student"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <input type="text" placeholder="First Name" />
      </div>
    </div>
  );
};

export default StudentForm;
