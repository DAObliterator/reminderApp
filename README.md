Medicine Reminder App - README
This repository contains the source code for a medicine reminder application built with Node.js and various libraries. 

Features
Secure user authentication: Utilizes Express session and bcryptjs to securely manage user registration, login, and password encryption.
Global state management: Leverages the useContext API for maintaining user data and medicine event information across components, providing a seamless user experience.
Scheduling and reminders: Implements node-scheduler to schedule medicine events at specific times and node-mailer to send automated email reminders to registered users, ensuring timely medication intake.
Real-time updates: Employs change streams for real-time data updates, keeping users informed of any changes to their scheduled reminders.
Responsive and stylish UI: Tailwind CSS provides a clean and responsive user interface, allowing for easy customization and adaptation to different screen sizes.
