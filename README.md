# EZ Labs Contact Form

A modern, responsive single-page React application with a contact form integrated with the EZ Labs API. Built with React, featuring a beautiful UI with smooth animations and full responsiveness across all device sizes.

## 🚀 Features

- ✨ **Modern UI Design** - Beautiful gradient background with glassmorphism effects
- 📱 **Fully Responsive** - Optimized for mobile (480p), tablets (720p, 1080p), iPad Pro, and MacBook
- ✅ **Form Validation** - Real-time validation for all fields with email format checking
- 🔗 **API Integration** - Seamless integration with backend API
- 🎨 **Smooth Animations** - Elegant transitions and hover effects
- ⚡ **Error Handling** - Comprehensive error handling with user-friendly messages
- 🔒 **Input Validation** - Front-end validation prevents empty submissions

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Responsive Design](#responsive-design)
- [Form Fields](#form-fields)
- [Build for Production](#build-for-production)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

## 🛠️ Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Alok7055/EZ.Test.git
   cd EZ.Test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - The app will automatically open at [http://localhost:3000](http://localhost:3000)

## 💻 Usage

1. Fill in the contact form with your details:
   - **Name** (required)
   - **Email** (required, must be valid email format)
   - **Phone** (required)
   - **Message** (required)

2. Click **"Send Message"** to submit the form

3. You'll see a success message if the submission is successful, or an error message if something goes wrong

## 🔌 API Integration

### API Endpoint

- **Base URL**: `https://vernanbackend.ezlab.in`
- **Endpoint**: `/api/contact-us/`
- **Full URL**: `https://vernanbackend.ezlab.in/api/contact-us/`
- **Method**: POST
- **Content-Type**: application/json

### Request Format

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "message": "Your message here"
}
```

### Response Format

**Success (201 Created):**
```json
{
  "message": "Contact request submitted and email sent successfully",
  "data": {
    "id": 528,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "message": "Your message here",
    "created_at": "2025-11-06T18:14:32.882175Z",
    "updated_at": "2025-11-06T18:14:32.882191Z"
  }
}
```
<img width="1735" height="963" alt="Screenshot 2025-11-06 234630" src="https://github.com/user-attachments/assets/8e7b98de-1c0f-462c-951b-76114c0a06c2" />




### API Configuration

The API endpoint can be configured in `src/config/api.js`:

```javascript
export const API_CONFIG = {
  BASE_URL: 'https://vernanbackend.ezlab.in',
  CONTACT_ENDPOINT: '/api/contact-us/',
  TIMEOUT: 10000,
};
```

## 📱 Responsive Design

The application is fully responsive and optimized for the following breakpoints:

| Device | Resolution | Status |
|--------|-----------|--------|
| Mobile | 480p | ✅ Optimized |
| Small Tablet | 720p | ✅ Optimized |
| Tablet/Laptop | 1080p | ✅ Optimized |
| iPad Pro | 2732x2048 | ✅ Optimized |
| MacBook | 1440x823 | ✅ Optimized |
<img width="571" height="969" alt="Screenshot 2025-11-06 235031" src="https://github.com/user-attachments/assets/37aa379f-cf4b-42e2-b928-d844dcedcbb5" />



### Responsive Features

- Adaptive form layout for different screen sizes
- Optimized padding and spacing for each breakpoint
- Touch-friendly input fields on mobile devices
- Readable font sizes across all devices

## 📝 Form Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Name | Text | Yes | Non-empty |
| Email | Email | Yes | Valid email format |
| Phone | Tel | Yes | Non-empty |
| Message | Textarea | Yes | Non-empty |

## 🏗️ Build for Production

To create an optimized production build:

```bash
npm run build
```

This creates a `build` folder with optimized production files ready for deployment.

### Deploy to Production

The `build` folder can be deployed to:
- **Netlify** - Drag and drop the build folder
- **Vercel** - Connect your GitHub repository
- **GitHub Pages** - Use `gh-pages` package
- **Any static hosting service**

## 📁 Project Structure

```
EZ.Test/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── ContactForm.js  # Main form component
│   │   └── ContactForm.css  # Form styles
│   ├── config/
│   │   └── api.js          # API configuration
│   ├── App.js              # Main app component
│   ├── App.css             # App styles
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🛠️ Technologies Used

- **React** 18.2.0 - UI library
- **Axios** 1.6.0 - HTTP client for API requests
- **CSS3** - Styling with modern features (gradients, animations, glassmorphism)
- **Create React App** - Build tooling and development server

## 🎨 Design Features

- **Gradient Background** - Beautiful purple gradient with animated effects
- **Glassmorphism** - Frosted glass effect on the form card
- **Smooth Animations** - Fade-in, slide-up, and hover effects
- **Modern Typography** - Inter font family for clean, readable text
- **Color Scheme** - Purple gradient theme with white form card

## ⚠️ Troubleshooting

### API 404 Errors

If you encounter 404 errors:

1. Verify the endpoint in `src/config/api.js`
2. Check browser console (F12) for detailed error messages
3. Test the endpoint in Postman first
4. See `API_TROUBLESHOOTING.md` for detailed steps

### Common Issues

- **Port already in use**: Change the port in `package.json` or kill the process using port 3000
- **Module not found**: Run `npm install` again
- **CORS errors**: Check if the API allows requests from your domain

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Alok Upadhyay**

- GitHub: [@Alok7055](https://github.com/Alok7055)
- Email: aloku598@gmail.com

## 🙏 Acknowledgments

- EZ Labs for providing the API endpoint
- React team for the amazing framework
- All contributors and testers

---

⭐ If you find this project helpful, please consider giving it a star!
