import * as FileSystem from 'expo-file-system';
import students1 from '../database/students1.json';
import students2 from '../database/students2.json';
import students3 from '../database/students3.json';

export interface StudentData {
  id: string;
  name: string;
  email?: string;
  batch?: string;
  department?: string;
  rollNumber?: string;
  fatherName?: string;
  motherName?: string;
  gender?: string;
  dob?: string;
  address?: string;
  category?: string;
  caste?: string;
  aadharNo?: string;
  phoneNumber?: string;
  parentPhoneNumber?: string;
}

class DatabaseService {
  private students: StudentData[] = [];

  async loadStudentData() {
    try {
      console.log('Loading student data from JSON files...');
      
      // If we already loaded students, return the cached data
      if (this.students.length > 0) {
        console.log('Returning cached student data:', this.students.length, 'students');
        return this.students;
      }

      let allStudents: StudentData[] = [];

      // Process data from imported JSON files
      console.log('Processing students1.json...');
      const processedData1 = this.processStudentDataFromJson(students1, 'students1.json');
      console.log(`Processed ${processedData1.length} students from students1.json`);
      
      console.log('Processing students2.json...');
      const processedData2 = this.processStudentDataFromJson(students2, 'students2.json');
      console.log(`Processed ${processedData2.length} students from students2.json`);
      
      console.log('Processing students3.json...');
      const processedData3 = this.processStudentDataFromJson(students3, 'students3.json');
      console.log(`Processed ${processedData3.length} students from students3.json`);

      allStudents = [...processedData1, ...processedData2, ...processedData3];

      // If we couldn't load any students from JSON, use mock data as fallback
      if (allStudents.length === 0) {
        console.warn('No students loaded from JSON files, using mock data as fallback');
        allStudents = this.getMockStudentData();
      }

      this.students = allStudents;
      console.log(`Total students loaded: ${this.students.length}`);

      return this.students;
    } catch (error) {
      console.error('Error loading student data:', error);
      return this.getMockStudentData(); // Return mock data as fallback
    }
  }

  private processStudentDataFromJson(data: any[], filename: string): StudentData[] {
    const processedData: StudentData[] = [];
    
    data.forEach((row, index) => {
      // Skip empty rows or header rows
      if (!row['Roll Number'] || row['Roll Number'] === '') {
        return;
      }
      
      // Extract batch from roll number (e.g., 197Z1A0101 -> 2019)
      const rollNumber = row['Roll Number'] || '';
      const batchYear = rollNumber.startsWith('19') ? '2019-23' : 
                        rollNumber.startsWith('20') ? '2020-24' : 
                        rollNumber.startsWith('21') ? '2021-25' : '';
      
      // Extract department from roll number (e.g., 197Z1A0101 -> CSE)
      const deptCode = rollNumber.length >= 8 ? rollNumber.substring(6, 8) : '';
      const department = deptCode === '01' ? 'CSE' : 
                         deptCode === '02' ? 'ECE' : 
                         deptCode === '03' ? 'EEE' : 
                         deptCode === '04' ? 'CIVIL' : 
                         deptCode === '05' ? 'MECH' : 
                         deptCode === '12' ? 'IT' : '';
      
      processedData.push({
        id: `student_${index}_${filename.replace('.json', '')}`,
        name: row['Name of the Student'] || row['Name of the Student (As per SSC)'] || '',
        email: row['E-mail ID of the Student'] || '',
        batch: batchYear,
        department: department,
        rollNumber: rollNumber,
        fatherName: row["Father's Name"] || row['Father Name'] || '',
        motherName: row["Mother's Name"] || '',
        gender: row['Gender'] || '',
        dob: row['DOB'] || '',
        address: row['Address'] || '',
        category: row['Category'] || '',
        caste: row['CASTE'] || '',
        aadharNo: row['Aadhar No.'] ? row['Aadhar No.'].toString() : '',
        phoneNumber: row['Student Mobile'] ? row['Student Mobile'].toString() : '',
        parentPhoneNumber: row['Parent Mobile'] ? row['Parent Mobile'].toString() : ''
      });
    });
    
    return processedData;
  }

  private getMockStudentData(): StudentData[] {
    // Mock data for testing - this will be used as fallback if JSON loading fails
    return [
      {
        id: 'student_1',
        name: 'Rahul Sharma',
        email: 'rahul.sharma@example.com',
        batch: '2019-23',
        department: 'CSE',
        rollNumber: 'NNRG19CS001'
      },
      {
        id: 'student_2',
        name: 'Priya Patel',
        email: 'priya.patel@example.com',
        batch: '2020-24',
        department: 'ECE',
        rollNumber: 'NNRG20EC045'
      },
      {
        id: 'student_3',
        name: 'Aditya Kumar',
        email: 'aditya.kumar@example.com',
        batch: '2019-23',
        department: 'CSE',
        rollNumber: 'NNRG19CS022'
      },
      {
        id: 'student_4',
        name: 'Sneha Reddy',
        email: 'sneha.reddy@example.com',
        batch: '2020-24',
        department: 'CSE',
        rollNumber: 'NNRG20CS105'
      },
      {
        id: 'student_5',
        name: 'Vikram Singh',
        email: 'vikram.singh@example.com',
        batch: '2019-23',
        department: 'CSE',
        rollNumber: 'NNRG19CS078'
      },
      {
        id: 'student_6',
        name: 'Ananya Desai',
        email: 'ananya.desai@example.com',
        batch: '2020-24',
        department: 'ECE',
        rollNumber: 'NNRG20EC032'
      },
    ];
  }

  getStudentByEmail(email: string): StudentData | undefined {
    return this.students.find(student => student.email?.toLowerCase() === email.toLowerCase());
  }

  getStudentById(id: string): StudentData | null {
    const student = this.students.find(s => s.id === id || s.rollNumber === id);
    return student || null;
  }
}

export const databaseService = new DatabaseService();
