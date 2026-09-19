// TalentPulse AI Enterprise Platform - Data Engine & Supabase Integration Store

import { fetchRawEmployeeDataset } from './services/supabaseService.js';

// LocalStorage Persistence Keys
const STORAGE_KEY = 'TALENTPULSE_DATA_V5';

// All 50 Employee Records from Supabase `employee_dataset_raw`
export const raw50EmployeesDataset = [
  { Employee_ID: "EMP001", Name: "Aarav Mehta", Age: 21, Location: "Coimbatore", Education: "B.Tech Computer Science", Specialization: "Software Development", Department: "Software Development", Current_Role: "Python Developer", Years_Experience: 0, Previous_Roles: "Fresher", Technical_Skills: "Python;SQL;Git", Soft_Skills: "Teamwork;Problem-solving;Adaptability", Communication_Skills: "Good", Projects_Completed: "Student Management System", Project_Responsibilities: "Python coding;Database connection", Performance_Score: 3.8, Certifications: "Not Available", Courses_Learning: "Python Programming", Achievements: "Completed a college coding project", Career_Interests: "Become a Senior Python Developer" },
  { Employee_ID: "EMP002", Name: "Diya Nair", Age: 22, Location: "Chennai", Education: "B.Tech Information Technology", Specialization: "Software Development", Department: "Software Development", Current_Role: "Java Developer", Years_Experience: 1, Previous_Roles: "Java Intern", Technical_Skills: "Java;SQL;Git;OOP", Soft_Skills: "Teamwork;Time Management;Problem-solving", Communication_Skills: "Good", Projects_Completed: "Library Management System", Project_Responsibilities: "Java development;Database design", Performance_Score: 4.1, Certifications: "Oracle Java Foundations", Courses_Learning: "Java Programming", Achievements: "Won a college coding contest", Career_Interests: "Become a Senior Java Developer" },
  { Employee_ID: "EMP003", Name: "Rohan Iyer", Age: 23, Location: "Bengaluru", Education: "B.E. Computer Science", Specialization: "Web Development", Department: "Software Development", Current_Role: "Frontend Developer", Years_Experience: 1, Previous_Roles: "Web Development Intern", Technical_Skills: "HTML;CSS;JavaScript;React;Git", Soft_Skills: "Creativity;Teamwork;Adaptability", Communication_Skills: "Excellent", Projects_Completed: "College Event Portal", Project_Responsibilities: "UI development;Responsive design", Performance_Score: 4.2, Certifications: "Not Available", Courses_Learning: "React Basics", Achievements: "Built a responsive college website", Career_Interests: "Become a Full Stack Developer" },
  { Employee_ID: "EMP004", Name: "Meera Shah", Age: 24, Location: "Pune", Education: "B.Tech Computer Science", Specialization: "Web Development", Department: "Software Development", Current_Role: "Backend Developer", Years_Experience: 2, Previous_Roles: "Junior Developer", Technical_Skills: "Python;Node.js;SQL;Git", Soft_Skills: "Problem-solving;Teamwork;Time Management", Communication_Skills: "Good", Projects_Completed: "E-commerce Backend", Project_Responsibilities: "API development;Database design", Performance_Score: 4.0, Certifications: "Not Available", Courses_Learning: "Node.js Backend Development", Achievements: "Improved API response time", Career_Interests: "Become a Backend Lead" },
  { Employee_ID: "EMP005", Name: "Kabir Rao", Age: 25, Location: "Hyderabad", Education: "B.Tech Information Technology", Specialization: "Software Engineering", Department: "Software Development", Current_Role: "Full Stack Developer", Years_Experience: 3, Previous_Roles: "Frontend Developer;Junior Developer", Technical_Skills: "JavaScript;React;Node.js;SQL;Git", Soft_Skills: "Problem-solving;Leadership;Teamwork", Communication_Skills: "Excellent", Projects_Completed: "Online Food Ordering System", Project_Responsibilities: "Frontend development;API integration;Database work", Performance_Score: 4.5, Certifications: "AWS Cloud Practitioner", Courses_Learning: "Full Stack Web Development", Achievements: "Led a small student development team", Career_Interests: "Become a Technical Lead" },
  { Employee_ID: "EMP006", Name: "Ananya Kapoor", Age: 22, Location: "Mumbai", Education: "B.Tech Computer Science", Specialization: "Quality Assurance", Department: "Quality Assurance", Current_Role: "Software Tester", Years_Experience: 1, Previous_Roles: "Testing Intern", Technical_Skills: "Manual Testing;SQL;Jira;Git", Soft_Skills: "Attention to Detail;Teamwork;Time Management", Communication_Skills: "Good", Projects_Completed: "Bug Tracking System", Project_Responsibilities: "Test case writing;Bug reporting", Performance_Score: 4.0, Certifications: "Not Available", Courses_Learning: "Software Testing Fundamentals", Achievements: "Found major bugs before project demo", Career_Interests: "Become a QA Engineer" },
  { Employee_ID: "EMP007", Name: "Vikram Das", Age: 26, Location: "Kochi", Education: "B.Tech Information Technology", Specialization: "Quality Assurance", Department: "Quality Assurance", Current_Role: "QA Engineer", Years_Experience: 4, Previous_Roles: "Software Tester;QA Intern", Technical_Skills: "Selenium;Java;SQL;Jira;Git", Soft_Skills: "Problem-solving;Attention to Detail;Leadership", Communication_Skills: "Excellent", Projects_Completed: "E-commerce Testing Suite", Project_Responsibilities: "Automation testing;Test planning", Performance_Score: 4.6, Certifications: "ISTQB Foundation", Courses_Learning: "Selenium Automation", Achievements: "Automated 100+ regression tests", Career_Interests: "Become a QA Lead" },
  { Employee_ID: "EMP008", Name: "Ishita Sen", Age: 23, Location: "Kolkata", Education: "B.Tech Computer Science", Specialization: "Data Analytics", Department: "Data Science", Current_Role: "Data Analyst", Years_Experience: 1, Previous_Roles: "Data Analyst Intern", Technical_Skills: "Python;SQL;Excel;Power BI", Soft_Skills: "Analytical Thinking;Teamwork;Curiosity", Communication_Skills: "Good", Projects_Completed: "Sales Data Dashboard", Project_Responsibilities: "Data cleaning;Dashboard creation", Performance_Score: 4.1, Certifications: "Microsoft Power BI Fundamentals", Courses_Learning: "Power BI;Data Analysis with Python", Achievements: "Created an interactive dashboard", Career_Interests: "Become a Senior Data Analyst" },
  { Employee_ID: "EMP009", Name: "Arjun Verma", Age: 27, Location: "Delhi", Education: "M.Tech Data Science", Specialization: "Data Science", Department: "Data Science", Current_Role: "Data Scientist", Years_Experience: 4, Previous_Roles: "Data Analyst;Research Intern", Technical_Skills: "Python;SQL;Pandas;Machine Learning;Power BI", Soft_Skills: "Analytical Thinking;Problem-solving;Leadership", Communication_Skills: "Excellent", Projects_Completed: "Customer Churn Prediction", Project_Responsibilities: "Data preparation;Model training;Result analysis", Performance_Score: 4.7, Certifications: "Google Data Analytics Certificate", Courses_Learning: "Applied Machine Learning", Achievements: "Improved prediction accuracy in a project", Career_Interests: "Lead Data Science Projects" },
  { Employee_ID: "EMP010", Name: "Sara Joseph", Age: 24, Location: "Bengaluru", Education: "B.Tech Artificial Intelligence", Specialization: "AI/ML", Department: "AI/ML", Current_Role: "Machine Learning Engineer", Years_Experience: 2, Previous_Roles: "ML Intern;Data Analyst", Technical_Skills: "Python;SQL;Machine Learning;Pandas;Git", Soft_Skills: "Problem-solving;Curiosity;Teamwork", Communication_Skills: "Good", Projects_Completed: "House Price Prediction", Project_Responsibilities: "Data preparation;Model training;Testing", Performance_Score: 4.3, Certifications: "Not Available", Courses_Learning: "Machine Learning Fundamentals", Achievements: "Built a working prediction model", Career_Interests: "Become an AI Engineer" },
  { Employee_ID: "EMP011", Name: "Nikhil Kumar", Age: 25, Location: "Chennai", Education: "B.Tech Artificial Intelligence", Specialization: "AI/ML", Department: "AI/ML", Current_Role: "AI Engineer", Years_Experience: 3, Previous_Roles: "Python Developer;ML Intern", Technical_Skills: "Python;Machine Learning;TensorFlow;Git;SQL", Soft_Skills: "Problem-solving;Adaptability;Teamwork", Communication_Skills: "Excellent", Projects_Completed: "Customer Support Chatbot", Project_Responsibilities: "Model training;Chatbot integration", Performance_Score: 4.5, Certifications: "Microsoft Azure AI Fundamentals", Courses_Learning: "Deep Learning Basics", Achievements: "Created a chatbot prototype", Career_Interests: "Become a Senior AI Engineer" },
  { Employee_ID: "EMP012", Name: "Tanya Roy", Age: 21, Location: "Kolkata", Education: "B.Tech Computer Science", Specialization: "AI/ML", Department: "AI/ML", Current_Role: "AI Engineer", Years_Experience: 0, Previous_Roles: "Fresher", Technical_Skills: "Python;Machine Learning;Git", Soft_Skills: "Curiosity;Teamwork;Adaptability", Communication_Skills: "Good", Projects_Completed: "College FAQ Chatbot", Project_Responsibilities: "Data preparation;Chatbot testing", Performance_Score: 3.9, Certifications: "Not Available", Courses_Learning: "Introduction to AI", Achievements: "Completed an AI mini project", Career_Interests: "Become a Machine Learning Engineer" },
  { Employee_ID: "EMP013", Name: "Aditya Singh", Age: 28, Location: "Pune", Education: "B.E. Computer Science", Specialization: "Cloud & DevOps", Department: "Cloud & DevOps", Current_Role: "DevOps Engineer", Years_Experience: 5, Previous_Roles: "System Administrator;Cloud Intern", Technical_Skills: "Linux;Git;Docker;AWS;Python", Soft_Skills: "Problem-solving;Leadership;Time Management", Communication_Skills: "Excellent", Projects_Completed: "CI/CD Deployment Pipeline", Project_Responsibilities: "Pipeline setup;Docker deployment", Performance_Score: 4.6, Certifications: "AWS Cloud Practitioner", Courses_Learning: "Docker and Kubernetes Basics", Achievements: "Automated application deployment", Career_Interests: "Become a DevOps Lead" },
  { Employee_ID: "EMP014", Name: "Priya Menon", Age: 24, Location: "Coimbatore", Education: "B.Tech Information Technology", Specialization: "Cloud & DevOps", Department: "Cloud & DevOps", Current_Role: "Cloud Engineer", Years_Experience: 2, Previous_Roles: "IT Support Engineer;Cloud Intern", Technical_Skills: "AWS;Linux;Python;Git;Docker", Soft_Skills: "Problem-solving;Adaptability;Teamwork", Communication_Skills: "Good", Projects_Completed: "Cloud File Storage System", Project_Responsibilities: "Cloud setup;Access management", Performance_Score: 4.2, Certifications: "AWS Cloud Practitioner", Courses_Learning: "AWS Cloud Fundamentals", Achievements: "Migrated a college project to AWS", Career_Interests: "Become a Cloud Architect" },
  { Employee_ID: "EMP015", Name: "Rahul Gupta", Age: 29, Location: "Hyderabad", Education: "B.Tech Computer Science", Specialization: "Cloud & DevOps", Department: "Cloud & DevOps", Current_Role: "Cloud Engineer", Years_Experience: 6, Previous_Roles: "System Administrator;DevOps Engineer", Technical_Skills: "AWS;Linux;Docker;Git;SQL", Soft_Skills: "Leadership;Problem-solving;Decision Making", Communication_Skills: "Excellent", Projects_Completed: "Cloud Application Deployment", Project_Responsibilities: "Cloud infrastructure;Deployment;Monitoring", Performance_Score: 4.7, Certifications: "AWS Solutions Architect – Associate", Courses_Learning: "Cloud Architecture", Achievements: "Reduced manual deployment work", Career_Interests: "Become a Cloud Architect" },
  { Employee_ID: "EMP016", Name: "Sneha Reddy", Age: 23, Location: "Bengaluru", Education: "B.Des User Experience", Specialization: "UI/UX Design", Department: "UI/UX", Current_Role: "UI/UX Designer", Years_Experience: 1, Previous_Roles: "Design Intern", Technical_Skills: "Figma;HTML;CSS;UI Design", Soft_Skills: "Creativity;Empathy;Teamwork", Communication_Skills: "Excellent", Projects_Completed: "Mobile Banking App Design", Project_Responsibilities: "Wireframes;User research;Prototype design", Performance_Score: 4.3, Certifications: "Google UX Design Certificate", Courses_Learning: "Figma for UI Design", Achievements: "Designed a mobile app prototype", Career_Interests: "Become a Senior UI/UX Designer" },
  { Employee_ID: "EMP017", Name: "Karan Patel", Age: 26, Location: "Ahmedabad", Education: "B.Tech Computer Science", Specialization: "Mobile Development", Department: "Software Development", Current_Role: "Mobile App Developer", Years_Experience: 3, Previous_Roles: "Android Developer Intern;Junior Developer", Technical_Skills: "Flutter;Dart;Firebase;Git", Soft_Skills: "Problem-solving;Teamwork;Adaptability", Communication_Skills: "Good", Projects_Completed: "College Attendance App", Project_Responsibilities: "Flutter development;Firebase integration", Performance_Score: 4.4, Certifications: "Not Available", Courses_Learning: "Flutter App Development", Achievements: "Published a student app prototype", Career_Interests: "Become a Mobile App Lead" },
  { Employee_ID: "EMP018", Name: "Neha Joshi", Age: 22, Location: "Jaipur", Education: "B.Tech Information Technology", Specialization: "Database Management", Department: "IT Infrastructure", Current_Role: "Database Administrator", Years_Experience: 1, Previous_Roles: "Database Intern", Technical_Skills: "SQL;MySQL;PostgreSQL;Git", Soft_Skills: "Attention to Detail;Problem-solving;Teamwork", Communication_Skills: "Good", Projects_Completed: "Student Database System", Project_Responsibilities: "Database design;SQL queries;Backup testing", Performance_Score: 4.0, Certifications: "Oracle Database Foundations", Courses_Learning: "Database Management", Achievements: "Improved database query organization", Career_Interests: "Become a Database Administrator" },
  { Employee_ID: "EMP019", Name: "Manish Kumar", Age: 30, Location: "Delhi", Education: "B.Tech Computer Science", Specialization: "Database Management", Department: "IT Infrastructure", Current_Role: "Database Administrator", Years_Experience: 7, Previous_Roles: "Database Developer;System Administrator", Technical_Skills: "SQL;MySQL;PostgreSQL;Linux;Python", Soft_Skills: "Problem-solving;Leadership;Attention to Detail", Communication_Skills: "Excellent", Projects_Completed: "Company Database Migration", Project_Responsibilities: "Database migration;Backup management;Performance checks", Performance_Score: 4.8, Certifications: "Oracle Database SQL Certified Associate", Courses_Learning: "Advanced SQL", Achievements: "Completed a database migration project", Career_Interests: "Become a Database Architect" },
  { Employee_ID: "EMP020", Name: "Pooja Das", Age: 23, Location: "Mumbai", Education: "B.Tech Computer Science", Specialization: "Cybersecurity", Department: "Cybersecurity", Current_Role: "Cybersecurity Analyst", Years_Experience: 1, Previous_Roles: "Security Intern", Technical_Skills: "Linux;Python;SQL;Network Security", Soft_Skills: "Attention to Detail;Curiosity;Problem-solving", Communication_Skills: "Good", Projects_Completed: "Network Security Monitor", Project_Responsibilities: "Log checking;Security testing;Report writing", Performance_Score: 4.1, Certifications: "CompTIA Security+", Courses_Learning: "Cybersecurity Fundamentals", Achievements: "Completed a security audit project", Career_Interests: "Become a Security Engineer" },
  { Employee_ID: "EMP021", Name: "Yash Thakur", Age: 27, Location: "Pune", Education: "B.Tech Information Technology", Specialization: "Cybersecurity", Department: "Cybersecurity", Current_Role: "Cybersecurity Analyst", Years_Experience: 4, Previous_Roles: "IT Support Engineer;Security Analyst", Technical_Skills: "Linux;Python;Network Security;SQL;Git", Soft_Skills: "Problem-solving;Analytical Thinking;Teamwork", Communication_Skills: "Excellent", Projects_Completed: "Security Log Analysis Tool", Project_Responsibilities: "Log analysis;Threat identification;Reporting", Performance_Score: 4.6, Certifications: "CompTIA Security+", Courses_Learning: "Ethical Hacking Basics", Achievements: "Identified security issues in a lab project", Career_Interests: "Become a Cybersecurity Engineer" },
  { Employee_ID: "EMP022", Name: "Aditi Rao", Age: 22, Location: "Coimbatore", Education: "B.Tech Computer Science", Specialization: "Software Engineering", Department: "Software Development", Current_Role: "Software Engineer", Years_Experience: 1, Previous_Roles: "Software Intern", Technical_Skills: "Python;Java;SQL;Git", Soft_Skills: "Teamwork;Problem-solving;Adaptability", Communication_Skills: "Good", Projects_Completed: "Online Quiz Application", Project_Responsibilities: "Backend coding;Testing", Performance_Score: 4.0, Certifications: "Not Available", Courses_Learning: "Data Structures and Algorithms", Achievements: "Completed an internship project", Career_Interests: "Become a Software Engineer" },
  { Employee_ID: "EMP023", Name: "Harish Kumar", Age: 31, Location: "Chennai", Education: "B.E. Computer Science", Specialization: "Software Engineering", Department: "Software Development", Current_Role: "Software Engineer", Years_Experience: 8, Previous_Roles: "Junior Software Engineer;Software Engineer", Technical_Skills: "Java;Python;SQL;Git;Docker", Soft_Skills: "Leadership;Problem-solving;Mentoring", Communication_Skills: "Excellent", Projects_Completed: "Banking Application", Project_Responsibilities: "Feature development;Code review;Deployment support", Performance_Score: 4.8, Certifications: "AWS Cloud Practitioner", Courses_Learning: "Software Architecture Basics", Achievements: "Mentored junior developers", Career_Interests: "Become a Technical Lead" },
  { Employee_ID: "EMP024", Name: "Lavanya Krishnan", Age: 25, Location: "Bengaluru", Education: "B.Tech Information Technology", Specialization: "Web Development", Department: "Software Development", Current_Role: "Frontend Developer", Years_Experience: 3, Previous_Roles: "UI Developer;Web Developer", Technical_Skills: "HTML;CSS;JavaScript;React;Git", Soft_Skills: "Creativity;Teamwork;Time Management", Communication_Skills: "Excellent", Projects_Completed: "E-commerce Website", Project_Responsibilities: "Frontend development;UI testing", Performance_Score: 4.4, Certifications: "Not Available", Courses_Learning: "Advanced React", Achievements: "Improved website usability", Career_Interests: "Become a Senior Frontend Developer" },
  { Employee_ID: "EMP025", Name: "Ritesh Jain", Age: 24, Location: "Hyderabad", Education: "B.Tech Computer Science", Specialization: "Web Development", Department: "Software Development", Current_Role: "Backend Developer", Years_Experience: 2, Previous_Roles: "Backend Intern;Junior Developer", Technical_Skills: "Python;Node.js;SQL;Git;REST API", Soft_Skills: "Problem-solving;Teamwork;Adaptability", Communication_Skills: "Good", Projects_Completed: "Employee Leave Portal", Project_Responsibilities: "API development;Database integration", Performance_Score: 4.2, Certifications: "Not Available", Courses_Learning: "REST API Development", Achievements: "Built reusable backend APIs", Career_Interests: "Become a Full Stack Developer" },
  { Employee_ID: "EMP026", Name: "Kavya Iyer", Age: 26, Location: "Kochi", Education: "B.Tech Computer Science", Specialization: "Software Engineering", Department: "Software Development", Current_Role: "Full Stack Developer", Years_Experience: 4, Previous_Roles: "Frontend Developer;Backend Developer", Technical_Skills: "JavaScript;React;Node.js;SQL;Git", Soft_Skills: "Leadership;Problem-solving;Teamwork", Communication_Skills: "Excellent", Projects_Completed: "Online Learning Platform", Project_Responsibilities: "Frontend;Backend APIs;Database design", Performance_Score: 4.6, Certifications: "AWS Cloud Practitioner", Courses_Learning: "Advanced Full Stack Development", Achievements: "Led feature development for a team project", Career_Interests: "Become a Technical Lead" },
  { Employee_ID: "EMP027", Name: "Dev Malhotra", Age: 23, Location: "Noida", Education: "B.Tech Information Technology", Specialization: "Quality Assurance", Department: "Quality Assurance", Current_Role: "QA Engineer", Years_Experience: 2, Previous_Roles: "Software Tester", Technical_Skills: "Selenium;Java;SQL;Jira", Soft_Skills: "Attention to Detail;Teamwork;Problem-solving", Communication_Skills: "Good", Projects_Completed: "Banking App Testing", Project_Responsibilities: "Automation testing;Bug tracking", Performance_Score: 4.2, Certifications: "ISTQB Foundation", Courses_Learning: "Test Automation with Selenium", Achievements: "Created reusable test scripts", Career_Interests: "Become a Senior QA Engineer" },
  { Employee_ID: "EMP028", Name: "Riya Sethi", Age: 21, Location: "Delhi", Education: "B.Tech Computer Science", Specialization: "Data Analytics", Department: "Data Science", Current_Role: "Data Analyst", Years_Experience: 0, Previous_Roles: "Fresher", Technical_Skills: "Python;SQL;Excel;Power BI", Soft_Skills: "Analytical Thinking;Curiosity;Teamwork", Communication_Skills: "Good", Projects_Completed: "Student Performance Dashboard", Project_Responsibilities: "Data cleaning;Chart creation", Performance_Score: 3.9, Certifications: "Not Available", Courses_Learning: "Excel for Data Analysis", Achievements: "Created a college analytics dashboard", Career_Interests: "Become a Data Scientist" },
  { Employee_ID: "EMP029", Name: "Sanjay Rao", Age: 28, Location: "Bengaluru", Education: "M.Tech Artificial Intelligence", Specialization: "AI/ML", Department: "AI/ML", Current_Role: "Machine Learning Engineer", Years_Experience: 5, Previous_Roles: "Data Scientist;ML Engineer", Technical_Skills: "Python;TensorFlow;Machine Learning;SQL;Git", Soft_Skills: "Problem-solving;Leadership;Curiosity", Communication_Skills: "Excellent", Projects_Completed: "Image Classification System", Project_Responsibilities: "Model training;Model testing;Result analysis", Performance_Score: 4.7, Certifications: "TensorFlow Developer Certificate", Courses_Learning: "Deep Learning", Achievements: "Built an image classification model", Career_Interests: "Become an AI Architect" },
  { Employee_ID: "EMP030", Name: "Nandini Paul", Age: 24, Location: "Kolkata", Education: "B.Tech Computer Science", Specialization: "IT Support", Department: "IT Support", Current_Role: "Technical Support Engineer", Years_Experience: 2, Previous_Roles: "IT Support Intern;Support Engineer", Technical_Skills: "Linux;Windows;SQL;Networking;Python", Soft_Skills: "Patience;Problem-solving;Teamwork", Communication_Skills: "Good", Projects_Completed: "IT Help Desk System", Project_Responsibilities: "Issue tracking;User support;Basic troubleshooting", Performance_Score: 4.1, Certifications: "CompTIA A+", Courses_Learning: "IT Support Fundamentals", Achievements: "Resolved common support issues quickly", Career_Interests: "Become an IT Support Lead" },
  { Employee_ID: "EMP031", Name: "Vivek Shah", Age: 32, Location: "Mumbai", Education: "B.E. Computer Science", Specialization: "IT Support", Department: "IT Support", Current_Role: "Technical Support Engineer", Years_Experience: 9, Previous_Roles: "Support Engineer;System Administrator", Technical_Skills: "Linux;Windows;Networking;SQL;Python", Soft_Skills: "Leadership;Problem-solving;Customer Service", Communication_Skills: "Excellent", Projects_Completed: "Company Help Desk Platform", Project_Responsibilities: "System support;Issue resolution;User management", Performance_Score: 4.8, Certifications: "CompTIA A+", Courses_Learning: "Linux Administration", Achievements: "Improved support response process", Career_Interests: "Become an IT Infrastructure Manager" },
  { Employee_ID: "EMP032", Name: "Anu George", Age: 25, Location: "Kochi", Education: "B.Tech Information Technology", Specialization: "IT Business Analysis", Department: "IT Business Analysis", Current_Role: "Business Analyst (IT)", Years_Experience: 3, Previous_Roles: "Business Analyst Intern;Junior Analyst", Technical_Skills: "SQL;Excel;Power BI;Jira", Soft_Skills: "Analytical Thinking;Communication;Teamwork", Communication_Skills: "Excellent", Projects_Completed: "Employee Management Portal", Project_Responsibilities: "Requirement gathering;Documentation;User testing", Performance_Score: 4.3, Certifications: "ECBA", Courses_Learning: "Business Analysis Fundamentals", Achievements: "Created clear project requirement documents", Career_Interests: "Become a Senior IT Business Analyst" },
  { Employee_ID: "EMP033", Name: "Mohit Verma", Age: 29, Location: "Gurugram", Education: "B.Tech Computer Science", Specialization: "IT Business Analysis", Department: "IT Business Analysis", Current_Role: "Business Analyst (IT)", Years_Experience: 6, Previous_Roles: "Junior Business Analyst;Business Analyst", Technical_Skills: "SQL;Excel;Power BI;Jira;Git", Soft_Skills: "Leadership;Analytical Thinking;Problem-solving", Communication_Skills: "Excellent", Projects_Completed: "E-commerce Business Dashboard", Project_Responsibilities: "Requirement analysis;Dashboard planning;Stakeholder meetings", Performance_Score: 4.7, Certifications: "ECBA", Courses_Learning: "Advanced Business Analysis", Achievements: "Improved project requirement tracking", Career_Interests: "Become an IT Product Manager" },
  { Employee_ID: "EMP034", Name: "Shruti Nair", Age: 23, Location: "Chennai", Education: "B.Tech Computer Science", Specialization: "Software Development", Department: "Software Development", Current_Role: "Python Developer", Years_Experience: 1, Previous_Roles: "Python Intern", Technical_Skills: "Python;SQL;Git;Flask", Soft_Skills: "Problem-solving;Teamwork;Adaptability", Communication_Skills: "Good", Projects_Completed: "Expense Tracker", Project_Responsibilities: "Python development;Database integration", Performance_Score: 4.1, Certifications: "Not Available", Courses_Learning: "Flask Web Development", Achievements: "Built an expense tracking application", Career_Interests: "Become a Backend Developer" },
  { Employee_ID: "EMP035", Name: "Akash Babu", Age: 27, Location: "Coimbatore", Education: "B.Tech Information Technology", Specialization: "Software Development", Department: "Software Development", Current_Role: "Java Developer", Years_Experience: 4, Previous_Roles: "Java Developer Intern;Junior Java Developer", Technical_Skills: "Java;Spring Boot;SQL;Git", Soft_Skills: "Problem-solving;Leadership;Teamwork", Communication_Skills: "Excellent", Projects_Completed: "Hospital Management System", Project_Responsibilities: "Java development;API development;Database design", Performance_Score: 4.5, Certifications: "Oracle Java Foundations", Courses_Learning: "Spring Boot", Achievements: "Developed core hospital modules", Career_Interests: "Become a Senior Java Developer" },
  { Employee_ID: "EMP036", Name: "Maya Krishnan", Age: 22, Location: "Madurai", Education: "B.Tech Computer Science", Specialization: "Web Development", Department: "Software Development", Current_Role: "Frontend Developer", Years_Experience: 1, Previous_Roles: "Web Development Intern", Technical_Skills: "HTML;CSS;JavaScript;React", Soft_Skills: "Creativity;Teamwork;Adaptability", Communication_Skills: "Good", Projects_Completed: "Portfolio Website Builder", Project_Responsibilities: "UI development;Responsive design", Performance_Score: 4.0, Certifications: "Not Available", Courses_Learning: "HTML CSS JavaScript", Achievements: "Built multiple responsive pages", Career_Interests: "Become a UI Engineer" },
  { Employee_ID: "EMP037", Name: "Arun Prakash", Age: 30, Location: "Bengaluru", Education: "B.Tech Computer Science", Specialization: "Software Engineering", Department: "Software Development", Current_Role: "Software Engineer", Years_Experience: 7, Previous_Roles: "Software Developer;Senior Software Engineer", Technical_Skills: "Java;Python;SQL;Git;Docker", Soft_Skills: "Leadership;Problem-solving;Mentoring", Communication_Skills: "Excellent", Projects_Completed: "Inventory Management System", Project_Responsibilities: "System development;Code review;Deployment", Performance_Score: 4.7, Certifications: "AWS Cloud Practitioner", Courses_Learning: "Microservices Basics", Achievements: "Led a successful system upgrade", Career_Interests: "Become an Engineering Lead" },
  { Employee_ID: "EMP038", Name: "Fathima Ali", Age: 24, Location: "Hyderabad", Education: "B.Tech Information Technology", Specialization: "Data Analytics", Department: "Data Science", Current_Role: "Data Analyst", Years_Experience: 2, Previous_Roles: "Data Analyst Intern", Technical_Skills: "Python;SQL;Excel;Power BI", Soft_Skills: "Analytical Thinking;Teamwork;Curiosity", Communication_Skills: "Good", Projects_Completed: "Customer Data Dashboard", Project_Responsibilities: "Data cleaning;Visualization;Reporting", Performance_Score: 4.2, Certifications: "Microsoft Power BI Fundamentals", Courses_Learning: "SQL for Data Analysis", Achievements: "Created monthly data reports", Career_Interests: "Become a Data Scientist" },
  { Employee_ID: "EMP039", Name: "Joel Mathew", Age: 26, Location: "Kochi", Education: "B.Tech Computer Science", Specialization: "Cloud & DevOps", Department: "Cloud & DevOps", Current_Role: "DevOps Engineer", Years_Experience: 3, Previous_Roles: "DevOps Intern;Cloud Support Engineer", Technical_Skills: "Linux;Git;Docker;AWS;Python", Soft_Skills: "Problem-solving;Teamwork;Time Management", Communication_Skills: "Excellent", Projects_Completed: "Automated Deployment Project", Project_Responsibilities: "CI/CD setup;Docker deployment", Performance_Score: 4.4, Certifications: "AWS Cloud Practitioner", Courses_Learning: "CI/CD with GitHub Actions", Achievements: "Automated a deployment workflow", Career_Interests: "Become a Cloud Engineer" },
  { Employee_ID: "EMP040", Name: "Sonal Mehta", Age: 25, Location: "Ahmedabad", Education: "B.Tech Computer Science", Specialization: "Mobile Development", Department: "Software Development", Current_Role: "Mobile App Developer", Years_Experience: 3, Previous_Roles: "Flutter Developer Intern;Junior Developer", Technical_Skills: "Flutter;Dart;Firebase;Git", Soft_Skills: "Creativity;Problem-solving;Teamwork", Communication_Skills: "Good", Projects_Completed: "Campus Navigation App", Project_Responsibilities: "Flutter UI;Firebase integration", Performance_Score: 4.3, Certifications: "Not Available", Courses_Learning: "Flutter Advanced", Achievements: "Built a working campus app", Career_Interests: "Become a Senior Mobile Developer" },
  { Employee_ID: "EMP041", Name: "Ravi Shankar", Age: 28, Location: "Chennai", Education: "B.E. Computer Science", Specialization: "Database Management", Department: "IT Infrastructure", Current_Role: "Database Administrator", Years_Experience: 5, Previous_Roles: "Database Support Engineer;Database Developer", Technical_Skills: "SQL;MySQL;PostgreSQL;Linux", Soft_Skills: "Attention to Detail;Problem-solving;Leadership", Communication_Skills: "Excellent", Projects_Completed: "Inventory Database", Project_Responsibilities: "Database design;Backup;Query optimization", Performance_Score: 4.6, Certifications: "Oracle Database Foundations", Courses_Learning: "PostgreSQL Administration", Achievements: "Improved database backup process", Career_Interests: "Become a Database Architect" },
  { Employee_ID: "EMP042", Name: "Keerthi Rao", Age: 23, Location: "Bengaluru", Education: "B.Tech Artificial Intelligence", Specialization: "AI/ML", Department: "AI/ML", Current_Role: "AI Engineer", Years_Experience: 1, Previous_Roles: "AI Intern", Technical_Skills: "Python;Machine Learning;SQL;Git", Soft_Skills: "Curiosity;Problem-solving;Teamwork", Communication_Skills: "Good", Projects_Completed: "Simple Recommendation System", Project_Responsibilities: "Data preparation;Model training", Performance_Score: 4.1, Certifications: "Not Available", Courses_Learning: "AI and Machine Learning", Achievements: "Built a recommendation prototype", Career_Interests: "Become a Machine Learning Engineer" },
  { Employee_ID: "EMP043", Name: "Varun Gupta", Age: 26, Location: "Delhi", Education: "B.Tech Information Technology", Specialization: "Cybersecurity", Department: "Cybersecurity", Current_Role: "Cybersecurity Analyst", Years_Experience: 3, Previous_Roles: "Security Intern;IT Support Engineer", Technical_Skills: "Linux;Networking;Python;SQL", Soft_Skills: "Analytical Thinking;Problem-solving;Attention to Detail", Communication_Skills: "Good", Projects_Completed: "Security Monitoring Dashboard", Project_Responsibilities: "Log monitoring;Alert analysis;Reporting", Performance_Score: 4.4, Certifications: "CompTIA Security+", Courses_Learning: "Network Security", Achievements: "Completed a security monitoring project", Career_Interests: "Become a Security Engineer" },
  { Employee_ID: "EMP044", Name: "Hema Suresh", Age: 24, Location: "Coimbatore", Education: "B.Tech Computer Science", Specialization: "UI/UX Design", Department: "UI/UX", Current_Role: "UI/UX Designer", Years_Experience: 2, Previous_Roles: "Design Intern", Technical_Skills: "Figma;HTML;CSS;Prototyping", Soft_Skills: "Creativity;Empathy;Teamwork", Communication_Skills: "Excellent", Projects_Completed: "Food Delivery App Design", Project_Responsibilities: "Wireframes;Prototype;Usability testing", Performance_Score: 4.3, Certifications: "Google UX Design Certificate", Courses_Learning: "User Research Basics", Achievements: "Designed a complete app prototype", Career_Interests: "Become a UX Lead" },
  { Employee_ID: "EMP045", Name: "Tarun Kapoor", Age: 22, Location: "Pune", Education: "B.Tech Computer Science", Specialization: "Quality Assurance", Department: "Quality Assurance", Current_Role: "Software Tester", Years_Experience: 1, Previous_Roles: "Testing Intern", Technical_Skills: "Manual Testing;SQL;Jira;Git", Soft_Skills: "Attention to Detail;Teamwork;Patience", Communication_Skills: "Good", Projects_Completed: "Student Portal Testing", Project_Responsibilities: "Test cases;Bug reporting;Regression testing", Performance_Score: 4.0, Certifications: "Not Available", Courses_Learning: "Software Testing", Achievements: "Found several usability issues", Career_Interests: "Become a QA Engineer" },
  { Employee_ID: "EMP046", Name: "Nisha Thomas", Age: 27, Location: "Kochi", Education: "B.Tech Information Technology", Specialization: "IT Support", Department: "IT Support", Current_Role: "Technical Support Engineer", Years_Experience: 4, Previous_Roles: "Support Intern;Support Engineer", Technical_Skills: "Windows;Linux;Networking;SQL", Soft_Skills: "Problem-solving;Patience;Teamwork", Communication_Skills: "Excellent", Projects_Completed: "IT Ticket Management System", Project_Responsibilities: "Ticket handling;Troubleshooting;User support", Performance_Score: 4.5, Certifications: "CompTIA A+", Courses_Learning: "Network Troubleshooting", Achievements: "Improved help desk ticket resolution", Career_Interests: "Become an IT Support Lead" },
  { Employee_ID: "EMP047", Name: "Rohan Das", Age: 29, Location: "Kolkata", Education: "B.Tech Computer Science", Specialization: "Web Development", Department: "Software Development", Current_Role: "Full Stack Developer", Years_Experience: 6, Previous_Roles: "Frontend Developer;Backend Developer", Technical_Skills: "JavaScript;React;Node.js;SQL;Git;Docker", Soft_Skills: "Leadership;Problem-solving;Teamwork", Communication_Skills: "Excellent", Projects_Completed: "E-commerce Website", Project_Responsibilities: "Frontend;Backend;Database;Deployment", Performance_Score: 4.7, Certifications: "AWS Cloud Practitioner", Courses_Learning: "Advanced JavaScript", Achievements: "Led development of a complete web module", Career_Interests: "Become a Technical Lead" },
  { Employee_ID: "EMP048", Name: "Isha Kapoor", Age: 23, Location: "Jaipur", Education: "B.Tech Computer Science", Specialization: "Software Engineering", Department: "Software Development", Current_Role: "Software Engineer", Years_Experience: 1, Previous_Roles: "Software Intern", Technical_Skills: "Python;Java;SQL;Git", Soft_Skills: "Teamwork;Adaptability;Problem-solving", Communication_Skills: "Good", Projects_Completed: "Task Management Application", Project_Responsibilities: "Feature development;Testing", Performance_Score: 4.1, Certifications: "Not Available", Courses_Learning: "Object-Oriented Programming", Achievements: "Completed a software internship successfully", Career_Interests: "Become a Senior Software Engineer" },
  { Employee_ID: "EMP049", Name: "Vimal Raj", Age: 31, Location: "Chennai", Education: "B.E. Information Technology", Specialization: "Cloud & DevOps", Department: "Cloud & DevOps", Current_Role: "DevOps Engineer", Years_Experience: 8, Previous_Roles: "System Administrator;Cloud Engineer", Technical_Skills: "AWS;Linux;Docker;Git;Python", Soft_Skills: "Leadership;Problem-solving;Mentoring", Communication_Skills: "Excellent", Projects_Completed: "Cloud Deployment Platform", Project_Responsibilities: "Infrastructure setup;CI/CD;Monitoring", Performance_Score: 4.8, Certifications: "AWS Solutions Architect – Associate", Courses_Learning: "Advanced AWS", Achievements: "Improved deployment reliability", Career_Interests: "Become a Cloud Architect" },
  { Employee_ID: "EMP050", Name: "Zara Khan", Age: 24, Location: "Bengaluru", Education: "B.Tech Information Technology", Specialization: "Web Development", Department: "Software Development", Current_Role: "Frontend Developer", Years_Experience: 2, Previous_Roles: "Web Development Intern", Technical_Skills: "HTML;CSS;JavaScript;React;Git", Soft_Skills: "Creativity;Teamwork;Problem-solving", Communication_Skills: "Good", Projects_Completed: "Online Course Website", Project_Responsibilities: "Frontend development;Responsive design", Performance_Score: 4.2, Certifications: "Not Available", Courses_Learning: "React and Web Development", Achievements: "Built a responsive course website", Career_Interests: "Become a Full Stack Developer" }
];

// Helper: Transform raw Supabase `employee_dataset_raw` record to rich frontend entity
export function transformSupabaseEmployee(rawEmp) {
  if (!rawEmp) return null;

  const techSkills = rawEmp.Technical_Skills ? rawEmp.Technical_Skills.split(';').map(s => s.trim()).filter(Boolean) : [];
  const softSkills = rawEmp.Soft_Skills ? rawEmp.Soft_Skills.split(';').map(s => s.trim()).filter(Boolean) : [];
  const certs = (rawEmp.Certifications && rawEmp.Certifications !== 'Not Available') 
    ? rawEmp.Certifications.split(';').map(s => s.trim()).filter(Boolean) 
    : [];
  const courses = (rawEmp.Courses_Learning && rawEmp.Courses_Learning !== 'Not Available') 
    ? rawEmp.Courses_Learning.split(';').map(s => s.trim()).filter(Boolean) 
    : [];
  const expYears = Number(rawEmp.Years_Experience || 0);
  const perfScore = Number(rawEmp.Performance_Score || 4.0);

  // Proficiency map per tech skill
  const proficiency = {};
  const baseProf = Math.min(98, Math.max(72, Math.round((perfScore / 5.0) * 92)));
  techSkills.forEach((sk, idx) => {
    proficiency[sk] = Math.min(99, Math.max(70, baseProf + ((idx % 3) * 3 - 2)));
  });

  // Calculate readiness & match index
  const skillMatchIndex = Math.min(98, Math.max(75, Math.round((perfScore / 5.0) * 85 + expYears * 2 + 8)));
  const readinessScore = Math.min(99, Math.max(70, Math.round((perfScore / 5.0) * 94)));
  const activeLearningHours = Math.min(48, Math.max(15, Math.round((perfScore / 5.0) * 40 + 5)));

  return {
    id: rawEmp.Employee_ID || 'EMP001',
    name: rawEmp.Name || 'Enterprise Employee',
    email: rawEmp.Name ? `${rawEmp.Name.toLowerCase().replace(/[^a-z0-9]/g, '.')}@enterprise.ai` : 'user@enterprise.ai',
    role: rawEmp.Current_Role || 'Software Engineer',
    department: rawEmp.Department || 'Software Development',
    location: rawEmp.Location || 'Coimbatore',
    age: rawEmp.Age || 25,
    education: rawEmp.Education || 'B.Tech Computer Science',
    specialization: rawEmp.Specialization || 'Software Development',
    experience: expYears > 0 ? `${expYears} yrs exp (${rawEmp.Previous_Roles || 'Developer'})` : `Fresher (${rawEmp.Previous_Roles || 'Intern'})`,
    yearsExperience: expYears,
    previousRoles: rawEmp.Previous_Roles || 'None',
    skills: techSkills.length > 0 ? techSkills : ['Python', 'SQL', 'Git'],
    softSkills: softSkills.length > 0 ? softSkills : ['Problem-solving', 'Teamwork'],
    communicationSkills: rawEmp.Communication_Skills || 'Good',
    projectsCompleted: rawEmp.Projects_Completed || 'Enterprise Platform Upgrade',
    projectResponsibilities: rawEmp.Project_Responsibilities || 'System Coding & Integration',
    performanceScore: perfScore,
    certifications: certs,
    coursesLearning: courses,
    achievements: rawEmp.Achievements || 'Delivered key engineering milestone on schedule.',
    careerInterests: rawEmp.Career_Interests || 'Become a Senior Systems Architect',
    resumeText: `${rawEmp.Name} - ${rawEmp.Current_Role}. Skills: ${techSkills.join(', ')}. Experience: ${expYears} years in ${rawEmp.Department}.`,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
    grade: expYears >= 5 ? 'L6' : (expYears >= 2 ? 'L5' : 'L4'),
    
    // Dynamic Metrics
    skillMatchIndex,
    readinessScore,
    activeLearningHours,
    targetLearningHours: 50,
    mobilityMatchesCount: Math.max(4, expYears + 4),
    highFitMatchesCount: Math.max(2, Math.round((perfScore / 5.0) * 4)),
    inInterviewCount: 2,
    proficiency
  };
}

// Default initial state populated with all 50 employees
const defaultTransformedEmployees = raw50EmployeesDataset.map(transformSupabaseEmployee);

const defaultData = {
  isSupabaseLoaded: false,
  auth: {
    isLoggedIn: true,
    role: 'employee',
    user: {
      id: 'EMP001',
      name: 'Aarav Mehta',
      email: 'aarav.mehta@enterprise.ai',
      role: 'Python Developer',
      department: 'Software Development'
    }
  },
  n8nWebhookUrl: 'https://n8n.your-domain.com/webhook/talent-pulse-analyze',
  employees: defaultTransformedEmployees,
      name: 'Alex Mercer',
      email: 'alex.mercer@enterprise.ai',
      role: 'Principal Analyst',
      department: 'People Analytics & Strategy'
    }
  },
  n8nWebhookUrl: 'https://n8n.your-domain.com/webhook/talent-pulse-analyze',
  employees: [
    {
      id: 'EMP001',
      name: 'Alex Mercer',
      email: 'alex.mercer@enterprise.ai',
      role: 'Principal Analyst',
      department: 'People Analytics & Strategy',
      location: 'San Francisco, CA',
      skills: ['Python', 'SQL (PostgreSQL/BigQuery)', 'People Analytics', 'RAG Architecture', 'Distributed Systems'],
      proficiency: { 'Python': 96, 'SQL (PostgreSQL/BigQuery)': 94, 'People Analytics': 98, 'RAG Architecture': 90, 'Distributed Systems': 88 },
      experience: '8+ yrs data architecture & ML telemetry',
      resumeText: 'Alex Mercer - Principal Systems & Talent Analyst. Skilled in Python, SQL, LLM Orchestration, RAG, and Workforce Analytics.'
    },
    {
      id: 'EMP-8819',
      name: 'Sarah Johnson',
      email: 'sarah.j@enterprise.ai',
      role: 'Senior Product Analyst',
      department: 'Finance Engineering',
      location: 'New York (Hybrid)',
      skills: ['Python', 'Tableau Architecture', 'Workforce Forecasting', 'Financial Modeling'],
      proficiency: { 'Python': 92, 'Tableau Architecture': 95, 'Workforce Forecasting': 90, 'Financial Modeling': 94 },
      experience: '5 yrs fintech & product telemetry',
      resumeText: 'Sarah Johnson - Senior Product Analyst. Expert in Tableau, Python, Financial Modeling, and Analytics.'
    },
    {
      id: 'EMP-4402',
      name: 'Marcus Chen',
      email: 'marcus.c@enterprise.ai',
      role: 'Engineering Team Lead',
      department: 'Platform Architecture',
      location: 'San Francisco (HQ)',
      skills: ['Kubernetes', 'Golang Microservices', 'Distributed Systems', 'Engineering Leadership'],
      proficiency: { 'Kubernetes': 95, 'Golang Microservices': 92, 'Distributed Systems': 94, 'Engineering Leadership': 90 },
      experience: '10 yrs cloud infrastructure & devops',
      resumeText: 'Marcus Chen - Engineering Team Lead. Specialized in Kubernetes, Golang, Envoy, and Cloud Platforms.'
    }
  ],
  jobRoles: [
    {
      id: 'ROLE-9421',
      title: 'Senior Python & Systems Architect',
      department: 'Software Development',
      requiredSkills: ['Python', 'SQL', 'Git', 'Distributed Systems'],
      band: 'L6 (Senior Staff Track)',
      compRange: '$180k – $220k Base',
      location: 'San Francisco (Hybrid)'
    },
    {
      id: 'ROLE-402',
      title: 'Lead Java & Microservices Engineer',
      department: 'Software Development',
      requiredSkills: ['Java', 'SQL', 'Git', 'Cloud Security'],
      band: 'L6',
      compRange: '$170k – $200k Base',
      location: 'San Francisco'
    },
    {
      id: 'ROLE-508',
      title: 'Principal Data & ML Pipeline Lead',
      department: 'Data Science',
      requiredSkills: ['Python', 'SQL', 'Machine Learning', 'Power BI'],
      band: 'L6',
      compRange: '$190k – $230k Base',
      location: 'Remote'
    }
  ]
};

// Load or Initialize Store
function getStore() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try { 
      const parsed = JSON.parse(saved);
      if (parsed.employees && parsed.employees.length > 0) return parsed;
    } catch (e) { 
      console.error('Failed to parse store', e); 
    }
  }
  return defaultData;
}

export function saveStore(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export const store = getStore();

/**
 * Load initial data directly from Supabase `employee_dataset_raw`
 */
export async function loadSupabaseData() {
  try {
    const rawDataset = await fetchRawEmployeeDataset();
    if (rawDataset && rawDataset.length > 0) {
      const transformedList = rawDataset.map(transformSupabaseEmployee).filter(Boolean);
      store.employees = transformedList;
      store.isSupabaseLoaded = true;

      if (!store.auth?.user?.id || !store.employees.some(e => e.id === store.auth.user.id)) {
        const firstEmp = store.employees[0];
        store.auth.user = {
          id: firstEmp.id,
          name: firstEmp.name,
          email: firstEmp.email,
          role: firstEmp.role,
          department: firstEmp.department
        };
      }

      saveStore(store);
      console.log(`Successfully loaded ${transformedList.length} live employees from Supabase project yhskpilxfkzzmmamvcaa!`);
      return transformedList;
    } else {
      console.warn('Supabase query returned 0 rows (possibly RLS protected). Falling back to 50 local database records.');
      if (!store.employees || store.employees.length === 0) {
        store.employees = defaultTransformedEmployees;
        saveStore(store);
      }
    }
  } catch (err) {
    console.error('Error loading Supabase dataset:', err);
    if (!store.employees || store.employees.length === 0) {
      store.employees = defaultTransformedEmployees;
      saveStore(store);
    }
  }
  return store.employees;
}

// Auth Helpers
export function loginUser(role, name, email) {
  store.auth.isLoggedIn = true;
  store.auth.role = role;
  
  if (role === 'employee') {
    const matchedEmp = store.employees.find(e => e.email.toLowerCase() === (email || '').toLowerCase() || e.name === name) || store.employees[0];
    store.auth.user = {
      id: matchedEmp?.id || 'EMP001',
      name: matchedEmp?.name || name || 'Aarav Mehta',
      email: matchedEmp?.email || email || 'aarav.mehta@enterprise.ai',
      role: matchedEmp?.role || 'Python Developer',
      department: matchedEmp?.department || 'Software Development'
    };
  } else {
    store.auth.user = {
      id: 'HR-101',
      name: name || 'HR Administrator',
      email: email || 'hr@enterprise.ai',
      role: 'HR Director',
      department: 'Human Resources'
    };
  }

  saveStore(store);
}

export function logoutUser() {
  store.auth.isLoggedIn = false;
  store.auth.user = null;
  saveStore(store);
}

// Get active logged-in employee detailed object
export function getActiveEmployee() {
  if (!store.employees || store.employees.length === 0) {
    return defaultTransformedEmployees[0];
  }
  const currentId = store.auth?.user?.id;
  return store.employees.find(e => e.id === currentId) || store.employees[0];
}

// HR Actions: Add Job Role
export function addJobRole(title, department, requiredSkills, band, compRange, location) {
  const newRole = {
    id: 'ROLE-' + Math.floor(1000 + Math.random() * 9000),
    title,
    department,
    requiredSkills: typeof requiredSkills === 'string' ? requiredSkills.split(',').map(s => s.trim()) : requiredSkills,
    band: band || 'L6',
    compRange: compRange || '$180k - $220k',
    location: location || 'Hybrid'
  };
  store.jobRoles.push(newRole);
  saveStore(store);
  return newRole;
}

// HR Actions: Add Employee
export function addEmployee(name, email, role, department, location, skills) {
  const newEmp = {
    id: 'EMP-' + Math.floor(1000 + Math.random() * 9000),
    name,
    email,
    role,
    department,
    location: location || 'Remote',
    skills: typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : skills,
    proficiency: {},
    experience: 'New Enterprise Employee',
    resumeText: `${name} - ${role}. Skills: ${skills}`
  };
  
  newEmp.skills.forEach(sk => {
    newEmp.proficiency[sk] = Math.floor(75 + Math.random() * 20);
  });

  store.employees.push(newEmp);
  saveStore(store);
  return newEmp;
}

// AI Matching & Skill Gap Analysis Engine
export function analyzeEmployeeGap(employeeId, roleId) {
  const emp = store.employees.find(e => e.id === employeeId) || store.employees[0];
  const role = store.jobRoles.find(r => r.id === roleId) || store.jobRoles[0];

  if (!emp || !role) return null;

  const results = analyzeAndAssignEmployees(role.id, [emp.id]);
  return results[0] || null;
}

// Multi-Employee AI Analysis Engine
export function analyzeAndAssignEmployees(roleId, employeeIds = []) {
  const role = store.jobRoles.find(r => r.id === roleId) || store.jobRoles[0];
  if (!role) return [];

  const targetEmployees = employeeIds.length > 0 
    ? store.employees.filter(e => employeeIds.includes(e.id))
    : store.employees;

  const results = targetEmployees.map(emp => {
    const empSkills = emp.skills || [];
    const reqSkills = role.requiredSkills || [];

    const matchedSkills = [];
    const missingSkills = [];

    reqSkills.forEach(req => {
      const hasSkill = empSkills.some(es => es.toLowerCase().includes(req.toLowerCase()) || req.toLowerCase().includes(es.toLowerCase()));
      if (hasSkill) {
        matchedSkills.push(req);
      } else {
        missingSkills.push(req);
      }
    });

    const matchPercentage = Math.round((matchedSkills.length / Math.max(reqSkills.length, 1)) * 100);

    if (!emp.assignedSkills) emp.assignedSkills = [];
    if (!emp.assignedDevelopmentPlans) emp.assignedDevelopmentPlans = [];
    if (!emp.receivedFeedback) emp.receivedFeedback = [];

    missingSkills.forEach(sk => {
      if (!emp.assignedSkills.includes(sk)) {
        emp.assignedSkills.push(sk);
      }
    });

    const devPlan = missingSkills.map(sk => ({
      id: 'PLAN-' + Math.floor(1000 + Math.random() * 9000),
      targetRole: role.title,
      skill: sk,
      courseName: `Accelerated ${sk} Enterprise Certification`,
      provider: 'Enterprise AI Academy & DeepLearning.AI',
      assignedBy: 'HR Intelligence OS',
      assignedDate: new Date().toLocaleDateString(),
      status: 'Assigned'
    }));

    devPlan.forEach(plan => {
      if (!emp.assignedDevelopmentPlans.some(dp => dp.skill === plan.skill && dp.targetRole === plan.targetRole)) {
        emp.assignedDevelopmentPlans.push(plan);
      }
    });

    const feedbackMsg = {
      id: 'FB-' + Math.floor(1000 + Math.random() * 9000),
      roleTitle: role.title,
      author: 'HR Intelligence OS',
      date: new Date().toLocaleDateString(),
      matchPercentage,
      matchedSkills,
      missingSkills,
      message: `Evaluation for ${role.title}: You have a ${matchPercentage}% skills match. Target missing skill(s) [${missingSkills.join(', ') || 'None'}] have been assigned to your employee learning plan.`
    };

    emp.receivedFeedback.unshift(feedbackMsg);

    return {
      employee: emp,
      jobRole: role,
      matchPercentage,
      matchedSkills,
      missingSkills,
      assignedDevPlans: devPlan,
      feedback: feedbackMsg,
      n8nPayload: {
        event: 'HR_EMPLOYEE_AI_GAP_ANALYSIS',
        timestamp: new Date().toISOString(),
        employeeId: emp.id,
        employeeName: emp.name,
        employeeEmail: emp.email,
        targetRoleId: role.id,
        targetRoleTitle: role.title,
        matchPercentage,
        matchedSkills,
        assignedMissingSkills: missingSkills,
        feedbackSent: feedbackMsg.message
      }
    };
  });

  saveStore(store);
  return results;
}

// Resume Parsing Pipeline Simulator
export function processResumePipeline(fileName, fileText) {
  const rawSkills = ['Python', 'SQL', 'Git', 'Data Pipelines', 'Cloud Security', 'Kubernetes'];
  const normalizedSkills = rawSkills.map(s => s.trim());
  const currentEmp = getActiveEmployee() || store.employees[0];

  if (currentEmp) {
    currentEmp.skills = Array.from(new Set([...(currentEmp.skills || []), ...normalizedSkills]));
    normalizedSkills.forEach(s => {
      if (!currentEmp.proficiency[s]) {
        currentEmp.proficiency[s] = Math.floor(80 + Math.random() * 15);
      }
    });
    currentEmp.resumeText = fileText || `Parsed resume from file: ${fileName}`;
    saveStore(store);
  }

  return {
    fileName,
    parsedText: fileText || `Successfully extracted text from ${fileName}. Experience: Software development and data engineering.`,
    extractedSkills: normalizedSkills,
    updatedEmployee: currentEmp
  };
}

// n8n Webhook Trigger
export async function triggerN8nWebhook(payload) {
  const webhookUrl = store.n8nWebhookUrl;
  console.log('Sending payload to n8n Webhook:', webhookUrl, payload);
  
  if (!webhookUrl || webhookUrl.includes('your-domain')) {
    return {
      status: 'simulated',
      message: 'n8n Webhook Endpoint configured for testing. (Payload ready to post once live n8n URL is set in Settings)',
      payload
    };
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return { status: 'success', statusCode: res.status, payload };
  } catch (err) {
    console.warn('n8n Webhook call failed (falling back to client simulation)', err);
    return { status: 'simulated', error: err.message, payload };
  }
}

// Dynamic Profile Export Getters for Active Logged-in Employee
export function getActiveUserProfile() {
  const active = getActiveEmployee();
  if (!active) {
    return {
      id: 'EMP001',
      name: 'Aarav Mehta',
      email: 'aarav.mehta@enterprise.ai',
      role: 'Python Developer',
      department: 'Software Development',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      grade: 'L4',
      location: 'Coimbatore',
      skillMatchIndex: 94,
      readinessScore: 88,
      percentile: 'Top 10%',
      activeLearningHours: 38.5,
      targetLearningHours: 50,
      mobilityMatchesCount: 6,
      highFitMatchesCount: 3,
      inInterviewCount: 2,
      skills: ['Python', 'SQL', 'Git']
    };
  }
  return {
    ...active,
    percentile: active.performanceScore >= 4.5 ? 'Top 5%' : (active.performanceScore >= 4.0 ? 'Top 10%' : 'Top 25%')
  };
}
// Export compatibility objects for sub-views
export const activeUser = {
  id: 'EMP001',
  name: 'Alex Mercer',
  email: 'alex.mercer@enterprise.ai',
  role: 'Principal Analyst',
  department: 'People Analytics & Strategy',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
  grade: 'L6',
  location: 'San Francisco, CA'
};

export const activeUser = getActiveUserProfile();
export const userProfile = activeUser;

export const profileDetails = {
  phone: '+1 (555) 234-5678',
  bio: 'Developer driving software optimization, data pipelines, and intelligent systems.'
};

export const skillsList = [
  'Python', 'SQL', 'Git', 'Data Structures', 'OOP'
];

export const candidateMarketplace = store.employees;
export const employeeList = store.employees;
export const openRoles = store.jobRoles;
export const jobRequisitions = store.jobRoles;

export const targetOpportunity = store.jobRoles[0] || {
  id: 'ROLE-9421',
  title: 'Staff AI Solutions Architect',
  department: 'Enterprise AI Platforms'
};

export const feedbackList = [
  { id: 1, author: 'Elena Rostova (VP Product)', rating: 5, comment: 'Exceptional architectural foresight during the Q3 analytics infrastructure upgrade.' },
  { id: 2, author: 'Marcus Chen (Staff Engineer)', rating: 5, comment: 'Outstanding cross-functional mentor and AI pipeline innovator.' }
];

export const learningCatalog = [
  { id: 'COURSE-101', title: 'Advanced RAG & Vector Systems', provider: 'DeepLearning.AI', estHours: '16 hrs', status: 'In Progress', progress: 65 },
  { id: 'COURSE-102', title: 'Kubernetes Cluster Architecture for Enterprise AI', provider: 'Cloud Native Foundation', estHours: '20 hrs', status: 'Recommended', progress: 0 }
];

export const opportunities = store.jobRoles;

export const performanceGoals = [
  { id: 1, title: 'Deploy Talent AI Matcher Engine', category: 'Strategic Innovation', targetQuarter: 'Q4', status: 'On Track' },
  { id: 2, title: 'Achieve 95% Skill Gap Analysis Accuracy', category: 'Quality & Telemetry', targetQuarter: 'Q4', status: 'On Track' }
];

/**
 * HR Analytics calculation engine directly computing metrics from Supabase employee_dataset_raw
 */
export function getHrAnalyticsMetrics(deptFilter = 'all', locFilter = 'all') {
  let emps = store.employees && store.employees.length > 0 ? store.employees : defaultTransformedEmployees;

  if (deptFilter && deptFilter !== 'all') {
    emps = emps.filter(e => (e.department || '').toLowerCase().includes(deptFilter.toLowerCase()));
  }
  if (locFilter && locFilter !== 'all') {
    emps = emps.filter(e => (e.location || '').toLowerCase().includes(locFilter.toLowerCase()));
  }

  const total = emps.length;
  const active = emps.length; // All dataset records are active
  const newJoiners = emps.filter(e => e.yearsExperience === 0).length;
  const experienced = emps.filter(e => e.yearsExperience >= 3).length;
  const seniorLeads = emps.filter(e => e.yearsExperience >= 5).length;

  const departments = Array.from(new Set(store.employees.map(e => e.department).filter(Boolean)));
  const locations = Array.from(new Set(store.employees.map(e => e.location).filter(Boolean)));

  // Department distribution
  const deptDist = {};
  emps.forEach(e => {
    const d = e.department || 'Other';
    deptDist[d] = (deptDist[d] || 0) + 1;
  });

  // Experience bands
  const expBands = {
    '0-1 Yr (Fresher)': emps.filter(e => e.yearsExperience <= 1).length,
    '2-4 Yrs (Mid-Level)': emps.filter(e => e.yearsExperience >= 2 && e.yearsExperience <= 4).length,
    '5-7 Yrs (Senior)': emps.filter(e => e.yearsExperience >= 5 && e.yearsExperience <= 7).length,
    '8+ Yrs (Lead/Staff)': emps.filter(e => e.yearsExperience >= 8).length
  };

  // Performance rating average & distribution
  const totalPerf = emps.reduce((acc, e) => acc + (e.performanceScore || 4.0), 0);
  const avgPerf = total > 0 ? (totalPerf / total).toFixed(2) : '4.34';

  const perfBands = {
    outstanding: emps.filter(e => e.performanceScore >= 4.7).length,
    exceeds: emps.filter(e => e.performanceScore >= 4.3 && e.performanceScore < 4.7).length,
    meets: emps.filter(e => e.performanceScore >= 4.0 && e.performanceScore < 4.3).length,
    developing: emps.filter(e => e.performanceScore < 4.0).length
  };

  // Skill coverage map & gap analysis
  const skillCountMap = {};
  emps.forEach(e => {
    (e.skills || []).forEach(sk => {
      skillCountMap[sk] = (skillCountMap[sk] || 0) + 1;
    });
  });

  const topSkillCoverages = Object.keys(skillCountMap)
    .map(sk => ({ skill: sk, count: skillCountMap[sk], pct: Math.round((skillCountMap[sk] / Math.max(total, 1)) * 100) }))
    .sort((a, b) => b.count - a.count);

  const criticalGaps = [
    { skill: 'SQL & Database Architecture', coverage: Math.round(((skillCountMap['SQL'] || 36) / Math.max(total, 1)) * 100), status: 'Adequate' },
    { skill: 'Git Version Control', coverage: Math.round(((skillCountMap['Git'] || 32) / Math.max(total, 1)) * 100), status: 'Healthy' },
    { skill: 'Python & Analytics Systems', coverage: Math.round(((skillCountMap['Python'] || 24) / Math.max(total, 1)) * 100), status: 'Moderate' },
    { skill: 'Cloud & DevOps (Docker / AWS)', coverage: Math.round((((skillCountMap['Docker'] || 0) + (skillCountMap['AWS'] || 0)) / Math.max(total * 2, 1)) * 100), status: 'Critical Shortage' },
    { skill: 'AI / Machine Learning (TensorFlow)', coverage: Math.round((((skillCountMap['Machine Learning'] || 0) + (skillCountMap['TensorFlow'] || 0)) / Math.max(total * 2, 1)) * 100), status: 'High Demand Gap' }
  ];

  // Learning & Development stats
  const activeLearners = emps.filter(e => e.coursesLearning && e.coursesLearning.length > 0).length;
  const verifiedCertsCount = emps.filter(e => e.certifications && e.certifications.length > 0).length;

  const certMap = {};
  emps.forEach(e => {
    (e.certifications || []).forEach(c => {
      certMap[c] = (certMap[c] || 0) + 1;
    });
  });

  // Action Center Items
  const hrActions = [
    { type: 'warning', title: 'Critical Cloud Skill Shortage', detail: `Only ${emps.filter(e => (e.skills || []).includes('AWS') || (e.skills || []).includes('Docker')).length} personnel have verified Docker/AWS skills. Hiring or upskilling recommended.` },
    { type: 'info', title: 'Certifications Underway', detail: `${total - verifiedCertsCount} employees actively learning with pending certifications.` },
    { type: 'success', title: 'Internal Mobility Candidates', detail: `${perfBands.outstanding} high performers (Score >= 4.7) eligible for promotion or lateral shift.` },
    { type: 'primary', title: 'Fresher Mentorship Program', detail: `${newJoiners} new joiners requiring assigned technical leads.` }
  ];

  // Open Requisitions derived from database
  const requisitions = [
    {
      id: 'REQ-101',
      title: 'Senior Python & Systems Architect',
      department: 'Software Development',
      hiringManager: emps.find(e => e.role.includes('Engineer') && e.yearsExperience >= 7)?.name || 'Arun Prakash',
      openDate: '2026-08-15',
      requiredSkills: ['Python', 'SQL', 'Git', 'Docker'],
      candidatesCount: 14,
      currentStage: 'Technical Interview',
      priority: 'High',
      status: 'Open',
      topCandidate: emps.find(e => e.role === 'Python Developer' && e.performanceScore >= 4.0)?.name || 'Aarav Mehta',
      matchScore: '94%'
    },
    {
      id: 'REQ-102',
      title: 'Cloud & DevOps Infrastructure Lead',
      department: 'Cloud & DevOps',
      hiringManager: emps.find(e => e.role === 'Cloud Engineer' && e.yearsExperience >= 6)?.name || 'Rahul Gupta',
      openDate: '2026-08-20',
      requiredSkills: ['AWS', 'Linux', 'Docker', 'Python'],
      candidatesCount: 9,
      currentStage: 'Final Round',
      priority: 'Urgent',
      status: 'Open',
      topCandidate: emps.find(e => e.department === 'Cloud & DevOps' && e.performanceScore >= 4.5)?.name || 'Aditya Singh',
      matchScore: '96%'
    },
    {
      id: 'REQ-103',
      title: 'AI & Machine Learning Specialist',
      department: 'AI/ML',
      hiringManager: emps.find(e => e.department === 'AI/ML' && e.yearsExperience >= 5)?.name || 'Sanjay Rao',
      openDate: '2026-09-01',
      requiredSkills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL'],
      candidatesCount: 18,
      currentStage: 'Screening',
      priority: 'High',
      status: 'Open',
      topCandidate: emps.find(e => e.department === 'AI/ML' && e.performanceScore >= 4.5)?.name || 'Nikhil Kumar',
      matchScore: '95%'
    },
    {
      id: 'REQ-104',
      title: 'QA Test Automation Lead',
      department: 'Quality Assurance',
      hiringManager: emps.find(e => e.department === 'Quality Assurance' && e.yearsExperience >= 4)?.name || 'Vikram Das',
      openDate: '2026-09-05',
      requiredSkills: ['Selenium', 'Java', 'SQL', 'Jira'],
      candidatesCount: 7,
      currentStage: 'Offer Released',
      priority: 'Medium',
      status: 'Open',
      topCandidate: emps.find(e => e.department === 'Quality Assurance' && e.yearsExperience >= 2)?.name || 'Dev Malhotra',
      matchScore: '91%'
    }
  ];

  return {
    totalEmployees: total,
    activeEmployees: active,
    newJoiners,
    experienced,
    seniorLeads,
    departments,
    locations,
    deptDist,
    expBands,
    avgPerf,
    perfBands,
    skillCountMap,
    topSkillCoverages,
    criticalGaps,
    activeLearners,
    verifiedCertsCount,
    certMap,
    hrActions,
    requisitions,
    filteredEmployees: emps
  };
}

