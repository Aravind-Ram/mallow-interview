src/
│
├── components/ # Reusable components
│ ├── Button/ # Button component
│ │ ├── Button.js # Component code
│ │ └── Button.css # Styles (optional)
│ ├── Modal/ # Modal component
│ │ ├── Modal.js # Component code
│ │ ├── Modal.css # Styles (optional)
│ │ └── index.js # Barrel file for easy imports
│ └── ... # Other reusable components
│
├── features/ # Feature-specific slices and logic
│ ├── user/ # User feature
│ │ ├── UserListPage.js # User list view page
│ │ ├── UserCardPage.js # User card view page
│ │ ├── CreateEditModal.js # Modal for create/edit user
│ │ ├── userSlice.js # Redux slice for user state
│ │ └── userAPI.js # API calls for user data
│ └── auth/ # Authentication feature
│ ├── LoginPage.js # Login page
│ ├── authSlice.js # Redux slice for auth state
│ └── authAPI.js # API calls for authentication
│
├── pages/ # Page-level components (route targets)
│ ├── LoginPage.js # Entry point for Login feature
│ ├── UserListPage.js # Entry point for User List View
│ ├── UserCardPage.js # Entry point for User Card View
│ └── ... # Other pages
│
├── redux/ # Redux store setup
│ ├── store.js # Redux store configuration
│ ├── rootReducer.js # Combines all reducers
│ └── middleware.js # Custom middleware (optional)
│
├── selectors/ # Centralized selectors for Redux state
│ ├── userSelectors.js # Selectors for user state
│ ├── authSelectors.js # Selectors for auth state
│ └── ...
│
├── styles/ # Global styles
│ ├── index.css # Global CSS
│ ├── variables.css # CSS variables for consistent theming
│ └── ...
│
├── utils/ # Utility functions and helpers
│ ├── api.js # Axios or fetch configuration
│ ├── validations.js # Input validation logic
│ └── ...
│
├── App.js # Main app component
├── index.js # Entry point for React app
└── routes.js # Centralized routes definition
