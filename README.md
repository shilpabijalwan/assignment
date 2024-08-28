//run locally 
npm run dev


src/
├── components/
│   ├── NavBar.js          # Navigation bar component
│   ├── BlogList.js        # Blog list component with pagination
│   ├── EditBlog.js        # Blog editing component
│   ├── CreateBlog.js      # Blog creation component
│   └── Login.js           # Login component
├── redux/
│   ├── slices/
│   │   ├── AuthSlice.js   # Redux slice for authentication
│   │   └── BlogSlice.js
│   │   └── usersSlice.js
│   └── store.js           # Redux store configuration
├── firebase.js            # Firebase configuration file
├── App.js                 # Main application component
└── main.js               # Entry point for the React app


How It Works
User Authentication
Users can log in or register using their email and password.
After a successful login, the user is persisted in Redux and local storage, allowing the user to stay logged in even after refreshing the page.
The user's details are displayed in the Navbar 


Blog Management
Create Blog: Authenticated users can create a blog by filling out a form that includes a title, description, cover image, and content.
Edit Blog: Users can edit their blog posts by navigating to the edit page.
Delete Blog: Users can delete their blog posts, and the list of blogs will automatically update.
Pagination: The blog list is paginated, showing a limited number of blogs per page.

