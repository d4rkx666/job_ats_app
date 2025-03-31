export const config = {
   appName: process.env.REACT_APP_NAME,
   appFooterDescription: process.env.REACT_APP_FOOTER_DESCRIPTION,
   labels: {
      en: {
         menu: {
            home: "Home",
            login: "Login",
            signUp: "Sign Up",
            logout: "Logout",
            dashboard: "Dashboard",
            resume: "Boost Resume",
            createResume: "Create new resume",
            pricing: "Pricing",
            profile: "Profile",
         },
         home:{
            header:{
               title: "Improve Your Resume, Land Your Dream Job",
               subtitle: "Optimize your resume with AI-powered tools and stand out to employers.",
            },
            chooseUs:{
               title: "Why Choose Us?",
               cardOne: {
                  title: "AI-Powered Optimization",
                  body: "Our AI analyzes your resume and suggests improvements to make it stand out.",
               },
               cardTwo: {
                  title: "Tailored for Your Industry",
                  body: "Get industry-specific recommendations to match job requirements.",
               },
               cardThree: {
                  title: "Fast and Easy",
                  body: "Upload your resume and get results in minutes.",
               }
            },
            userRates:{
               title:"What Our Users Say",
               cardOne:{

               },
               cardTwo:{

               },
            },
            footer: {
               title: "Ready to Improve Your Resume?",
               subtitle: "Sign up now and start optimizing your resume today!",
            },
            getStartedBtn:"Get Started"
         },
         formLogin:{
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
            loginBtn: {
               label: "Login",
               loading: "Logging in...",
            },
            signUpHere: "Sign up here!",
            forgotPassword :"Forgot Password?",
         },
         formSignup:{
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
            signupBtn: {
               label: "Sign up",
               loading: "Signing up...",
            },
            loginHere:"Login Here",
         },
         formImproveResume:{
            title: "Optimize Your Resume",
            resumeFile:{
               label: "Upload Your Resume (PDF)",
               placeholder: "Click to upload or drag and drop",
               required: "Resume file is required",
               invalidType: "Only PDF files are allowed",
               invalidSize: "File size must be less than 5MB",
            },
            jobTitle:{
               label: "Job title",
               placeholder: "Paste the job title here",
               required: "Job title is required",
            },
            jobDescription:{
               label: "Job Description",
               placeholder: "Paste the job description here",
               required: "Job description is required",
            },
            uploadBtn:{
               label: "Optimize Resume",
               loading: "Optimizing...",
            },
         },
         formFeedback:{
            title: "Your feedback",
            titleSubmitted: "Thank you for your feedback!",
            titleRate: "How would you rate your experience?",
            titleSuggestions: "Any comments or suggestions?",
         },
         formPatternValidation:{
            phone: "Phone must be a valid format (10 digits).",
            email: "Email must be a valid format."
         },
         previewResume:{
            title: "AI suggestions",
            subtitle: "Here you go your new suggestions to boost your job hunting. Please read carefully and keep it up!",
         },
         dashboardPage:{
            welcome: "Welcome",
            subWelcome: "We're glad to have you here.",
            improvementsLeft: "Here are your resume improvements left",
            creationsLeft: "Here are your resume creations left",
            previousImprovements: "Previous Improvements",
            noImprovements: "There are not improvements yet.",
            outOf: "Maximum",
            drafts: "Drafts",
            noDrafts: "There are not drafts yet.",
         },
         previewImprovement:{
            title: "AI suggestions",
            subtitle: "Here you go your new suggestions to boost your job hunting. Please read carefully and keep it up!",
         },
         verifyEmailReminder:{
            title: "Please verify your email",
            subtitle: "We have sent you an email at:",
         },
         error:{
            userNotFound: "Email or password incorrect. Please try again.",
            userAlreadyInUse: "User already exists. Please use a different one.",
            userNotVerified: "Please verify your email before using this service.",
            resumeNotUploaded: "Failed to submit resume. Please try again.",
            withoutImprovements: "You don't have improvements left :(! Please upgrade your plan...",
            universalError: "Something went wrong. Please try again later!",
         },
         msg:{
            emailSendAgain: "Send again",
            emailSent: "Email has sent. Send again in: "
         }
      },
      es: {
         menu: {
            home: "Inicio",
            login: "Entrar",
            signUp: "Regístrate",
            logout: "Salir",
            dashboard: "Mi panel",
            resume: "Mejorar curriculum",
            createResume: "Crear curriculum",
            pricing: "Precios",
            profile: "Perfil",
         },
         home:{
            header:{
               title: "Optimiza tu curriculum, Aterriza el trabajo de tus sueños",
               subtitle: "Enriquece tu curriculum con herramientas impulsadas por la Inteligencia Artificial, y destácate para los empleadores.",
            },
            chooseUs:{
               title: "¿Por qué elegirnos?",
               cardOne: {
                  title: "Optimización impulsada por IA",
                  body: "Nuestra IA analiza tu curriculum y sugiere mejoras para hacerte destacar.",
               },
               cardTwo: {
                  title: "Adaptada a tu industria",
                  body: "Obtén recommendaciones específicas para la industria en la que aplicas.",
               },
               cardThree: {
                  title: "Rápido y fácil",
                  body: "Sube tu curriculum y obtén los resultados en minutos.",
               }
            },
            userRates:{
               title:"What Our Users Say",
               cardOne:{

               },
               cardTwo:{

               },
            },
            footer: {
               title: "¿Curriculum listo para ser mejorado?",
               subtitle: "¡Regístrate ahora y comienza a optimizar tu curriculum basado en tu industria!",
            },
            getStartedBtn:"Comenzar"
         },
         formLogin:{
            email: {
               label: "Correo electrónico",
               placeholder: "Escribe tu correo electrónico aquí",
               required: "El correo electrónico es obligatorio",
            },
            password: {
               label: "Contraseña",
               placeholder: "Escribe tu contraseña aquí",
               required: "La contraseña es obligatoria",
            },
            loginBtn: {
               label: "Iniciar sesión",
               loading: "Iniciando sesión...",
            },
            signUpHere: "¡Regístrate aquí!",
            forgotPassword :"Olvidé la contraseña",
         },
         formSignup:{
            name: {
               label: "Nombre",
               placeholder: "Escribe tu nombre aquí",
               required: "El nombre es requerido",
            },
            country: {
               label: "País",
               placeholder: "Selecciona tu país",
               required: "El país es requerido",
               countries: [
                  {label: "México", value: "mex"},
                  {label: "Canadá", value: "cad"},
                  {label: "USA", value: "usa"},
               ]
            },
            email: {
               label: "Correo electrónico",
               placeholder: "Escribe tu correo electrónico aquí",
               required: "El correo electrónico es obligatorio",
            },
            password: {
               label: "Contraseña",
               placeholder: "Escribe tu contraseña aquí",
               required: "La contraseña es requerida",
            },
            signupBtn: {
               label: "Regístrate",
               loading: "Registrando cuenta...",
            },
            loginHere:"Inicia sesión aquí",
         },
         formImproveResume:{
            title: "Optimiza tu curriculum",
            resumeFile:{
               label: "Sube tu curriculum (PDF)",
               placeholder: "Click para subir o arrastra y suelta tu archivo",
               required: "El archivo de curriculum es obligatorio",
               invalidType: "Sólo se permiten archivos PDF",
               invalidSize: "El tamaño del archivo debe ser menos de 5MB",
            },
            jobTitle:{
               label: "Título del puesto",
               placeholder: "Pega el título de puesto aquí",
               required: "El título del puesto es obligatorio",
            },
            jobDescription:{
               label: "Descripción del puesto",
               placeholder: "Pega la descripción del puesto aquí",
               required: "La descripción del puesto es obligatoria",
            },
            uploadBtn:{
               label: "Optimizar",
               loading: "Optimizando...",
            },
         },
         formFeedback:{
            title: "Comentarios",
            titleSubmitted: "¡Gracias por tus comentarios!",
            titleRate: "¿Cómo calificarías tu experiencia?",
            titleSuggestions: "¿Algún comentario o sugerencias?",
         },
         formPatternValidation:{
            phone: "El teléfono debe ser de un formato válido (10 digits).",
            email: "El correo debe ser de un formato válido."
         },
         dashboardPage:{
            welcome: "Bienvenid@",
            subWelcome: "Qué gusto tenerte por aquí.",
            improvementsLeft: "Aquí tienes tus mejoras disponibles",
            creationsLeft: "Aquí tienes tus creaciones disponibles",
            previousImprovements: "Mejoras previas",
            noImprovements: "No hay mejoras todavía.",
            outOf: "Máximo",
            drafts: "Borradores",
            noDrafts: "No hay borradores todavía.",
         },
         previewImprovement:{
            title: "Sugerencias de IA",
            subtitle: "Aquí tienes tus nuevas sugerencias para impulsar tu búsqueda de empleo. ¡Por favor léalo cuidadosamente y manténgalo actualizado!",
         },
         verifyEmailReminder:{
            title: "Por favor verifica tu correo electrónico",
            subtitle: "Te hemos enviado un correo a:",
         },
         error:{
            userNotFound: "Correo o contraseña incorrecta. Por favor inténtalo de nuevo.",
            userAlreadyInUse: "Usuario ya existe, por favor usa uno diferente.",
            userNotVerified: "Por favor verifica tu correo electrónico antes de usar este servicio.",
            resumeNotUploaded: "Falló al subir curriculum. Por favor inténtalo de nuevo.",
            withoutImprovements: "¡No quedan más mejoras :(! Por favor mejora tu plan...",
            universalError: "Algo salió mal. Por favor inténtalo más tarde!",
         },
         msg:{
            emailSendAgain: "Enviar de nuevo",
            emailSent: "Correo enviado. Podrás enviar el correo nuevamente en: "
         }
      },
   },
};