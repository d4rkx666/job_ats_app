export const config = {
   appName: process.env.REACT_APP_NAME,
   appFooterDescription: process.env.REACT_APP_FOOTER_DESCRIPTION,
   labels: {
      en: {
         welcome: "Welcome to My Resume Optimizer",
         uploadResume: "Upload Resume",
         jobDescription: "Job Description",
         optimize: "Optimize",
         menu: {
            home: "Home",
            login: "Login",
            logout: "Logout",
            dashboard: "Dashboard",
            resume: "Boost Resume",
         },
         form_login:{
            email: {
               label: "Email",
               placeholder: "Write your email here",
               required: "Email is required",
            },
            password: {
               label: "Password",
               placeholder: "Write your password here",
               required: "Password is required",
            },
            login_btn: {
               label: "Login",
               loading: "Logging in...",
            }
         },
         form_signup:{
            name: {
               label: "Name",
               placeholder: "Write your name here",
               required: "Name is required",
            },
            country: {
               label: "Country",
               placeholder: "Select a country",
               required: "Country is required",
               countries: [
                  {label: "Mexico", value: "mex"},
                  {label: "Canada", value: "cad"},
                  {label: "USA", value: "usa"},
               ]
            },
            email: {
               label: "Email",
               placeholder: "Write your email here",
               required: "Email is required",
            },
            password: {
               label: "Password",
               placeholder: "Write your password here",
               required: "Password is required",
            },
            signup_btn: {
               label: "Sign up",
               loading: "Signing up...",
            }
         },
         form_improve_resume:{
            title: "Optimize Your Resume",
            resume_file:{
               label: "Upload Your Resume (PDF)",
               placeholder: "Click to upload or drag and drop",
               required: "Resume file is required",
               invalid_type: "Only PDF files are allowed",
               invalid_size: "File size must be less than 5MB",
            },
            job_title:{
               label: "Job title",
               placeholder: "Paste the job title here",
               required: "Job title is required",
            },
            job_description:{
               label: "Job Description",
               placeholder: "Paste the job description here",
               required: "Job description is required",
            },
            upload_btn:{
               label: "Optimize Resume",
               loading: "Optimizing...",
            },
         }
      },
      es: {
         welcome: "Bienvenido a Mi Optimizador de Currículum",
         uploadResume: "Subir Currículum",
         jobDescription: "Descripción del Trabajo",
         optimize: "Optimizar",
         menu: {
            home: "Inicio",
            login: "Iniciar sesión",
            logout: "Salir",
            dashboard: "Dashboard",
            resume: "Mejorar Curriculum",
         },
         form:{
            name: {
               label: "Nombre",
               required: "El nombre es requerido",
            },
            email: {
               label: "Correo electrónico",
               required: "El correo electrónico es requerido",
            },
            password: {
               label: "Contraseña",
               required: "La contraseña es requerida",
            },
            login_btn: {
               label: "Inciar sesión",
               loading: "Iniciando sesión...",
            },
            signup_btn: {
               label: "Crear cuenta",
               loading: "Creando cuenta...",
            },
         }
      },
   },
};