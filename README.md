# Mini Event Scheduler with AI Categorization

A full-stack event scheduling application built with React, Node.js, TypeScript, and Tailwind CSS. Features intelligent AI-powered event categorization to automatically organize your events into "Work," "Personal," or "Other" categories based on content analysis.

**🌐 Live Demo:** [https://mini-event-scheduler-app.vercel.app/](https://mini-event-scheduler-app.vercel.app/)

## ✨ Features

- 📅 **Complete Event Management**: Create, view, update, and delete events with title, date, time, and notes
- 🤖 **AI-Powered Categorization**: Automatic event categorization using intelligent keyword analysis
- 📱 **Responsive Design**: Fully responsive UI built with Tailwind CSS for desktop and mobile
- 🔄 **Archive System**: Mark events as archived for better organization
- 🎯 **Category Filtering**: Filter events by category (Work, Personal, Other)
- ⚡ **Real-time Updates**: Instant UI updates with optimistic rendering
- 🛡️ **Type Safety**: Full TypeScript implementation for both frontend and backend
- ✅ **Input Validation**: Comprehensive validation for all user inputs

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **Date-fns** for date handling
- **Axios** for API communication

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Jest** for testing
- **CORS** for cross-origin requests
- **Custom error handling** middleware

## 🏗️ Project Structure

```
mini-event-scheduler/
├── client/                             # Frontend React application
│   ├── src/
│   │   ├── app/                         # Next.js app directory (if using)
│   │   ├── components/                  # React components
│   │   │   ├── layout/                  # Layout components
│   │   │   │   ├── Banner.tsx
│   │   │   │   ├── demo-modal.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── Navbar.tsx
│   │   │   ├── ui/                      # UI components
│   │   │   │   ├── alert-dialog.tsx
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── badgeVariants.ts
│   │   │   │   ├── button.tsx
│   │   │   │   ├── button-variants.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── dropdown-menu.tsx
│   │   │   │   ├── form.tsx
│   │   │   │   ├── form-context.ts
│   │   │   │   ├── input.tsx
│   │   │   │   ├── label.tsx
│   │   │   │   ├── sonner.tsx
│   │   │   │   ├── switch.tsx
│   │   │   │   ├── table.tsx
│   │   │   │   └── textarea.tsx
│   │   │   ├── EventCard.tsx
│   │   │   ├── EventForm.tsx
│   │   │   └── EventList.tsx
│   │   └── services/                                    # API services
│   └── package.json
├── server/                                                # Backend Node.js application
│   ├── src/
│   │   └── app/
│   │       ├── constraints/                                # Application constants
│   │       │   └── eventCategories.ts
│   │       ├── data/                                       # In-memory data store
│   │       │   └── events.data.ts
│   │       ├── errors/                                     # Error handling
│   │       │   └── AppError.ts
│   │       ├── globalTypes/                                # Type definitions
│   │       │   ├── error.type.ts
│   │       │   └── response.type.ts
│   │       ├── helpers/                                    # Utility functions
│   │       │   ├── catchAsync.ts
│   │       │   └── sendResponse.ts
│   │       ├── middlewares/                                # Express middlewares
│   │       │   ├── globalErrorhandler.ts
│   │       │   └── notFound.ts
│   │       ├── modules/                                    # Feature modules
│   │       │   └── events/
│   │       │       ├── __tests__/
│   │       │       │   ├── categorize.test.ts
│   │       │       │   └── event.service.test.ts
│   │       │       ├── categorize.ts
│   │       │       ├── events.controller.ts
│   │       │       ├── events.interface.ts
│   │       │       ├── events.routes.ts
│   │       │       └── events.service.ts
│   │       └── utils/
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ 
- **npm** or **yarn**
- **Git**

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sumon-ray/mini-event-scheduler.git
   cd mini-event-scheduler
   ```

2. **Set up the Backend**
   ```bash
   cd server
   npm install
   
   # Create environment file (optional)
   echo "PORT=5000" > .env
   
   # Start the development server
   npm run dev
   ```
   The backend will run on `http://localhost:5000`

3. **Set up the Frontend** (in a new terminal)
   ```bash
   cd client
   npm install
   
   # Start the development server
   npm run dev
   ```
   The frontend will run on `http://localhost:3000`

### Running Tests

```bash
# Run backend tests
cd server
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🔌 API Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/api/events` | Retrieve all events | - |
| `POST` | `/api/events` | Create a new event | `{ title, date, time, notes? }` |
| `PUT` | `/api/events/:id` | Archive an event | `{ archived: true }` |
| `DELETE` | `/api/events/:id` | Delete an event | - |

### API Response Format

**Success Response:**
```json
{
  "success": true,
  "statusCode": 200,
  "message": "Events retrieved successfully",
  "data": [...]
}
```

**Error Response:**
```json
{
  "success": false,
  "statusCode": 400,
  "message": "Validation error",
  "errorSources": [...]
}
```

### Sample Event Object

```json
{
  "id": "uuid-string",
  "title": "Team Meeting",
  "date": "2024-01-15",
  "time": "14:30",
  "notes": "Discuss project timeline and deliverables",
  "category": "Work",
  "archived": false,
  "createdAt": "2024-01-10T10:30:00.000Z"
}
```

## 🤖 AI Categorization Logic

The application uses intelligent keyword-based categorization to automatically assign events to categories:

### Work Category
**Keywords:** `meeting`, `project`, `client`, `deadline`, `presentation`, `conference`, `workshop`, `training`

### Personal Category  
**Keywords:** `birthday`, `family`, `vacation`, `appointment`, `dinner`, `party`, `wedding`, `anniversary`

### Other Category
**Default:** Applied when no specific keywords are detected

The categorization algorithm:
1. Analyzes both event title and notes (case-insensitive)
2. Searches for predefined keywords
3. Assigns the first matching category
4. Defaults to "Other" if no matches found

## 🎨 UI Components

### Core Components
- **EventForm**: Form for creating new events with validation
- **EventList**: Displays events with sorting and filtering
- **EventCard**: Individual event display with actions
- **Layout Components**: Navbar and Footer for consistent UI

### UI Features
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Dark/Light Mode**: Automatic theme detection
- **Loading States**: Skeleton loading and loading indicators
- **Error Handling**: User-friendly error messages
- **Form Validation**: Real-time validation with clear feedback

## 🚀 Deployment

### Frontend (Vercel)
The frontend is deployed on Vercel and automatically deploys from the main branch.

### Backend (Railway/Heroku)
```bash
# Deploy to Railway
railway login
railway init
railway up

# Or deploy to Heroku
heroku create your-app-name
git push heroku main
```

## 🧪 Testing

The project includes comprehensive tests for core functionality:

- **Unit Tests**: Event service and categorization logic
- **Integration Tests**: API endpoint testing
- **Test Coverage**: Maintained above 80%

```bash
# Run all tests
npm test

# Run specific test file
npm test categorize.test.ts

# Generate coverage report
npm run test:coverage
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with proper TypeScript types
4. Add tests for new functionality
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Guidelines
- Use TypeScript for all new code
- Follow the existing project structure
- Add tests for new features
- Ensure responsive design for UI changes
- Update documentation as needed

## 📝 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start production server
- `npm test` - Run test suite
- `npm run test:watch` - Run tests in watch mode

## 🏆 Features Completed

- ✅ Full CRUD operations for events
- ✅ AI-powered event categorization
- ✅ Responsive UI with Tailwind CSS
- ✅ TypeScript implementation
- ✅ RESTful API with proper error handling
- ✅ Event archiving system
- ✅ Category-based filtering
- ✅ Input validation
- ✅ Unit testing
- ✅ Professional project structure
- ✅ Environment variable support
- ✅ Deployment ready

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Sumon Ray**
- GitHub: [@sumon-ray](https://github.com/sumon-ray)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/sumon60)

## 🙏 Acknowledgments

- Built as part of a Full-Stack Engineering Intern coding task
- Demonstrates proficiency in React, Node.js, TypeScript, and AI integration
- Special thanks to the open-source community for the amazing tools and libraries

---

⭐ **Star this repository if it helped you!**
