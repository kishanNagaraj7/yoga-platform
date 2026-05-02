# Yoga Platform - Global Yoga Management System

A comprehensive, modern web application for managing yoga classes, students, teachers, and administrative operations globally.

## 🧘‍♀️ Features

### Core Functionality
- **Multi-role Authentication**: Admin, Sanchalaka (Regional Manager), Teacher, and Student roles
- **Role-based Dashboards**: Customized interfaces for each user type
- **Class Management**: Create, schedule, and manage yoga classes
- **Enrollment System**: Student enrollment with waitlist functionality
- **Attendance Tracking**: Mark and monitor student attendance
- **Announcement System**: Role-based announcements with approval workflow
- **Schedule Management**: Calendar view with timezone support
- **Reporting & Analytics**: Comprehensive reports and statistics

### Technical Features
- **Modern Tech Stack**: React 18 + TypeScript + Material-UI
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Real-time Updates**: React Query for data synchronization
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Granular permissions per user role
- **Clean Architecture**: Modular, scalable codebase

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd yoga-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:3001/api
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open Browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
yoga-platform/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/        # Generic components (Loading, Modal, etc.)
│   │   └── layout/        # Layout components (Navbar, Sidebar)
│   ├── contexts/           # React contexts (Auth, etc.)
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components by role
│   │   ├── admin/         # Admin-specific pages
│   │   ├── sanchalaka/    # Regional manager pages
│   │   ├── teacher/        # Teacher-specific pages
│   │   ├── student/        # Student-specific pages
│   │   ├── auth/          # Authentication pages
│   │   ├── classes/        # Class management
│   │   ├── schedule/      # Schedule/calendar
│   │   ├── enrollment/     # Enrollment management
│   │   ├── attendance/     # Attendance tracking
│   │   ├── announcements/  # Announcement system
│   │   └── reports/       # Reports and analytics
│   ├── services/           # API service layer
│   ├── store/             # State management
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main App component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── package.json           # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite build configuration
└── README.md            # This file
```

## 👥 User Roles & Permissions

### 👑 Admin
- **Dashboard**: Global platform statistics and overview
- **User Management**: Create and manage all user accounts
- **Geography Management**: Manage countries, regions, and branches
- **Announcement Approval**: Review and approve global announcements
- **Reports**: Access to all platform reports and analytics

### 🧑‍💼 Sanchalaka (Regional Manager)
- **Dashboard**: Regional statistics and overview
- **Teacher Management**: Manage teachers within region
- **Branch Management**: Oversee branch operations
- **Announcement Approval**: Approve regional and branch announcements
- **Reports**: Regional-specific reports and analytics

### 🧘 Teacher
- **Dashboard**: Personal teaching statistics and schedule
- **Class Management**: Create, edit, and manage classes
- **Attendance**: Mark student attendance for classes
- **Announcements**: Create class and branch announcements
- **Schedule**: View and manage teaching schedule

### 🎓 Student
- **Dashboard**: Personal enrollment and progress overview
- **Class Browsing**: View and enroll in available classes
- **Schedule**: View personal class schedule
- **Enrollment Management**: Track active enrollments and waitlist status
- **Announcements**: View relevant announcements

## 🎨 Design System

### Color Palette
- **Primary**: Green (#2e7d32) - Represents growth and harmony
- **Secondary**: Light Green (#81c784)
- **Background**: Light Gray (#f8f9fa)
- **Surface**: White (#ffffff)

### Typography
- **Primary Font**: Roboto
- **Headings**: Bold, hierarchical sizing
- **Body**: Regular weight, good readability

### Component Guidelines
- **Cards**: Rounded corners (12px), subtle shadows
- **Buttons**: Rounded corners (8px), consistent sizing
- **Forms**: Material-UI components with custom styling
- **Navigation**: Collapsible sidebar with role-based menu

## 🔧 Technology Stack

### Frontend
- **React 18**: Modern React with hooks
- **TypeScript**: Type-safe development
- **Material-UI (MUI)**: Component library
- **React Router**: Client-side routing
- **React Query**: Server state management
- **React Hook Form**: Form management
- **Axios**: HTTP client
- **React Hot Toast**: Notification system

### Build Tools
- **Vite**: Fast build tool and dev server
- **TypeScript**: Type checking and compilation
- **ESLint**: Code linting

## 📱 Responsive Design

### Mobile (< 768px)
- Collapsible sidebar (drawer)
- Stacked card layouts
- Simplified navigation
- Touch-friendly interactions

### Tablet (768px - 1024px)
- Adaptive layouts
- Optimized spacing
- Touch and mouse interactions

### Desktop (> 1024px)
- Fixed sidebar navigation
- Grid-based layouts
- Hover states and transitions
- Maximum information density

## 🔐 Authentication Flow

### Login Methods
1. **Email/Password**: Traditional authentication
2. **Phone OTP**: SMS-based authentication

### JWT Token Management
- Secure token storage (localStorage)
- Automatic token refresh
- Logout on token expiration
- Request/response interceptors

### Role-based Routing
- Protected routes with role validation
- Automatic redirects based on user role
- Sidebar menu filtering by permissions

## 📊 Data Management

### React Query Configuration
- Automatic caching and background refetching
- Optimistic updates for better UX
- Error boundary handling
- Loading state management

### API Integration
- Centralized API client configuration
- Request/response interceptors
- Error handling and retry logic
- Type-safe API responses

## 🚀 Deployment

### Build for Production
```bash
npm run build
# or
yarn build
```

### Preview Production Build
```bash
npm run preview
# or
yarn preview
```

### Environment Variables
- `VITE_API_URL`: Backend API endpoint
- Additional variables as needed for specific deployments

## 🧪 Testing

### Running Tests
```bash
npm test
# or
yarn test
```

### Type Checking
```bash
npm run type-check
# or
yarn type-check
```

### Linting
```bash
npm run lint
# or
yarn lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Style
- Follow TypeScript best practices
- Use Material-UI components
- Maintain responsive design
- Write meaningful commit messages
- Update documentation as needed

## 📝 Development Notes

### Mock Data
- Currently uses mock data for demonstration
- API integration points are clearly marked
- Easy to replace with real API calls

### State Management
- Auth state: React Context + useReducer
- Server state: React Query
- Local state: React hooks

### Error Handling
- Global error boundaries
- API error interceptors
- User-friendly error messages
- Toast notifications for feedback

## 🐛 Troubleshooting

### Common Issues

1. **Dependencies not found**: Run `npm install`
2. **TypeScript errors**: Check tsconfig.json paths
3. **Import errors**: Verify file paths and extensions
4. **Build failures**: Check for syntax errors

### Getting Help
- Check the console for detailed error messages
- Verify environment variables
- Ensure all dependencies are installed
- Check network connectivity for API calls

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Material-UI team for excellent component library
- React Query team for state management solution
- Vite team for fast build tool
- Yoga community for inspiration
