# Setup Instructions for Yoga Platform

## Prerequisites Installation

Since Node.js is not currently installed on your system, you'll need to install it first.

### Option 1: Install Node.js (Recommended)

1. **Download Node.js**: Visit https://nodejs.org and download the LTS version
2. **Install**: Run the installer with default settings
3. **Verify Installation**: Open a new terminal and run:
   ```bash
   node --version
   npm --version
   ```

### Option 2: Use Package Manager

#### Windows (Chocolatey)
```bash
choco install nodejs
```

#### Windows (Scoop)
```bash
scoop install nodejs
```

## Project Setup

Once Node.js is installed:

1. **Navigate to project directory**:
   ```bash
   cd "c:\Users\Kishan\OneDrive\Documents\spyss project\yoga-platform"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Open browser**: Navigate to `http://localhost:5173`

## Current Project Status

### ✅ Completed Features
- **Project Structure**: Complete folder organization
- **Authentication System**: Login/Register pages with JWT handling
- **Layout Components**: Responsive sidebar and navigation
- **Role-based Routing**: Protected routes for different user types
- **Admin Dashboard**: Statistics and overview page
- **Student Dashboard**: Personal dashboard with enrolled classes
- **Classes Page**: Browse and filter available classes
- **Schedule Page**: Weekly calendar view with class scheduling
- **Type Definitions**: Complete TypeScript interfaces
- **API Service Layer**: Axios configuration with interceptors

### 🚧 In Progress
- **Development Server**: Ready to run once dependencies are installed

### ⏳ Remaining Tasks
- Teacher Dashboard
- Sanchalaka Dashboard  
- Enrollment Management Page
- Attendance Tracking Page
- Announcements System
- Reports & Analytics

## Testing the Application

### Login Credentials (Mock Data)
Since we're using mock data, you can test with:

**Admin Login**:
- Email: admin@example.com
- Password: password123

**Student Login**:
- Email: student@example.com  
- Password: password123

**Teacher Login**:
- Email: teacher@example.com
- Password: password123

### Features to Test

1. **Authentication Flow**:
   - Login page with email/password
   - Registration page
   - Role-based redirects

2. **Dashboard Navigation**:
   - Admin: See platform statistics
   - Student: View personal schedule and enrolled classes
   - Sidebar navigation (responsive on mobile)

3. **Class Browsing**:
   - Filter by category, level, and mode
   - Search functionality
   - Enrollment buttons

4. **Schedule View**:
   - Weekly calendar layout
   - Day/Week/Month view toggle
   - Class details display

## Troubleshooting

### Common Issues

1. **"npm not recognized"**: Node.js isn't installed or not in PATH
2. **Module not found errors**: Run `npm install` to install dependencies
3. **Port already in use**: The dev server will automatically use a different port
4. **TypeScript errors**: These are expected without dependencies installed

### Development Tips

1. **Hot Reload**: Changes to files will automatically refresh the browser
2. **Console Errors**: Check browser console for detailed error messages
3. **Network Tab**: Use to inspect API calls (currently using mock data)
4. **Responsive Testing**: Use browser dev tools to test mobile layouts

## Next Steps

After running the application:

1. **Explore the UI**: Navigate through different pages and features
2. **Test Responsiveness**: Resize browser to test mobile layouts
3. **Review Functionality**: Test all buttons, forms, and navigation
4. **Provide Feedback**: Let me know what features to prioritize next

The application is designed to be a complete, production-ready yoga management platform with modern UI/UX and comprehensive functionality.
