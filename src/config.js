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
            mobileMenu: "Menu",
            mobileMyAccount: "My account",
            dashboard: "Dashboard",
            resume: "Boost Resume",
            createResume: "Create new resume",
            pricing: "Pricing",
            profile: "Profile",
         },
         user:{
            proPlan: "Pro Plan",
            freePlan: "Free Plan",
         },
         home:{
            header:{
               title: "Land More Interviews",
               title2: "With an ATS-Optimized Resume",
               subtitle: "Our AI-powered platform analyzes job descriptions and optimizes your resume to beat applicant tracking systems.",
               seeHowItWorks: "See How It Works"
            },
            features:{
               title:"Everything you need to beat the ATS",
               subtitle:"Our platform uses cutting-edge technology to give your resume the best chance of getting seen.",
               feature:{
                  one:{
                     name: "AI-Powered Optimization",
                     description: "Our advanced AI analyzes job descriptions and builds/optimizes your resume to match perfectly",
                  },
                  two:{
                     name: "ATS Score Tracking",
                     description: "Get real-time feedback on how well your resume performs in applicant tracking systems",
                  },
                  three:{
                     name: "Keyword Analysis",
                     description: "Identify the most important keywords to include for each specific job application",
                  },
                  four:{
                     name: "Instant Downloads",
                     description: "Export your resume in multiple formats with one click",
                  },
               }
            },
            howItWorks:{
               title:"How It Works",
               title2: "From Blank Page to Interview-Ready in 4 Simple Steps",
               subtitle:"Our AI does the heavy lifting in while you focus on your job search.",
               steps:{
                  step1:{
                     title: "Setup your profile",
                     description: "Setup a profile with all your skills in our system",
                  },
                  step2:{
                     title: "Add the Job Description",
                     description: "Paste the text from the job posting you're applying for",
                  },
                  step3:{
                     title: "AI Magic Happens",
                     description: "Our system analyzes and creates an exclusive resume for the job you're applying for",
                  },
                  step4:{
                     title: "Download & Apply Confidently",
                     description: "Get an ATS-optimized resume tailored to the job",
                  },
               },
            },
            footer: {
               title: "Ready to transform your resume?",
               title2: "Start your free trial today.",
               subtitle: "Get 7 days of Pro features to see the difference for yourself. Due the beta version for testing, get more free days of Pro Plan contacting the admin.",
               tryPro: "Try Pro Free for 7 Days"
            },
            getStartedBtn:"Get Started - It's Free"
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
                  {label: "Bosnia and Herzegovina", value:"ba"}
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
         formProfile:{
            personalInformation: {
               title: "Personal Information",
               subtitle: "*This information will be saved automatically, except the name.",
               subtitle2: "*Email field is not your username for login.",
               email: "Email",
               phone: "Phone",
               linkedin: "Linkedin URL",
               website: "Website URL"
            },
            skills: {
               title: "Skills",
               subtitle: "*This information will be saved automatically.",
               addSkill: "Add a Skill",
               subtitle2: 'Use "Enter" or "Comma" key to register a new skill',
            },
            education: {
               title: "Education",
               institution: "Institution",
               degree : "Degree",
               currently: "I currently study here",
               btnAdd: "+ Add Another Education"
            },
            work: {
               title: "Work History",
               jobTitle: "Job Title",
               company : "Company",
               responsibilities : "Responsibilities",
               currently: "I currently study here",
               btnAdd: "+ Add Another job"
            },
            project: {
               title: "Projects",
               name: "Project Name",
               description : "Description",
               technologies : "Technologies",
               btnAdd: "+ Add Project"
            },
            saveChanges: "*Save all your changes with the green button below.",
            startDate: "Start Date",
            endDate: "EndDate",
            btnSave: "Save all",
            btnSaving: "Save all",
         },
         formFeedback:{
            title: "Your feedback",
            titleSubmitted: "Thank you for your feedback!",
            titleRate: "How would you rate your experience?",
            placeholder: "We'd love to hear from you!",
            titleSuggestions: "Any comments or suggestions?",
            btn: "Send feedback",
            btnLoading: "Sending feedback..."
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
            creditsLeft: "credits left",
            actionCosts: "Action Costs",
            atsReoptimization: "ATS Score analysis",
            keywordOptimization: "Keyword Extraction",
            resumeOptimization: "Resume Optimization",
            credit: "credit",
            upgrade: "Upgrade to Pro for 50 credits/month →",
            resumeCreation: "Resume Creation",
            improvements: "Improvements",
            creations: "Creations",
            drafts: "Drafts",
            noDrafts: "There are not drafts yet.",
            noCreations: "There are not improvements yet.",
            noImprovements: "There are not improvements yet.",
         },
         createResumePage:{
            title:"Complete Your Profile",
            subtitle:"Unlock personalized recommendations and full access by setting up your professional profile",
            getStartedBtn: "Get Started",
            form:{
               jobTitle: "Job Title",
               jobTitlePlaceholder: "e.g. 'Sales executive @ Amazon'",
               jobDescription: "Job Description",
               jobDescriptionPlaceholder: "Paste the full job description here",
               jobDescriptionMinimumError:"Please provide at least 10 characters",
               jobDescriptionMinimum:"Minimum 10 characters",
               steps:{
                  step1:{
                     step: "Job Info",
                     title: "Tell us about the job",
                  },
                  step2:{
                     step: "Keywords",
                     title: "Job Description Analysis",
                     title2: "Your Resume Keywords",
                     keywordsAmount: "keywords",
                     withoutKeywords: "No keywords saved with this draft",
                     subtitle:"Analyze the job description",
                     extractInfo: "Extract key skills and requirements to optimize your resume.",
                     extractBtn: "Analyze Job Description",
                     reExtractBtn: "Re-analyze Job Description",
                  },
                  step3:{
                     step: "Design",
                     title: "Choose your design",
                     preview: "Preview",
                     popular: "Popular"
                  },
                  step4:{
                     step: "Extras",
                     title: "Final touches",
                     coverLetter: "Generate matching cover letter",
                     coverLetterInfo: "We'll create a personalised cover letter using your profile and the job description.",
                     createButton: "Generate my new resume",
                     creatingButton: "Generating resume..."
                  },
                  stepBack: "Back",
                  stepFoward: "Continue",
               },
               templates:{
                  template1:"Classic",
                  template2:"Modern",
                  template3:"ATS-Optimized",
                  template4:"Executive",
                  bestScore: "Best Score"
               }
            },
            modalLoading:{
               title:"Crafting Your Resume",
               subtitle: "This usually takes 15-30 seconds",
               progress:"Progress",
               step:"Step",
               stepOf:"of",
               proTipInf:"Our AI is crafting your resume for Applicant Tracking Systems (ATS) to maximize your interview chances.",
               step1:{
                  title: "Initializing resume creation"
               },
               step2:{
                  title: "Analyzing content structure"
               },
               step3:{
                  title: "Optimizing for ATS scoring"
               },
               step4:{
                  title: "Generating your layout"
               },
               step5:{
                  title: "Final quality checks"
               },
               step6:{
                  title: "Preparing your resume"
               },
            }
         },
         proLabel:{
            proFeature: "Pro Feature:",
            upgradeToPro: "Upgrade to Pro",
            proUnlocks: "Pro unlocks:",
            buyExtraCredits: "Buy Extra Credits",
            proTip:"Pro Tip",
         },
         keywordList:{
            appears:"Appears",
            time:"time/s in this job description",
            coreRequirements: "Core Requirements",
            mustInclude: "Must Include",
            noHardSkills: "No hard skills identified",
            toolsAndTech: "Tools & Technologies",
            noTools: "No tools identified",
            softSkills: "Soft Skills",
            noSoftSkills: "No soft skills identified",
            certs: "Certifications"
         },
         creditEmptyModal:{
            outOf:"Out of Credits!",
            used: "You've used all",
            thisMonth: "free credits this month.",
            noCredits: "0 credits left",
            used: "used",
            resetIn: "Credits reset in",
            days: "days",
            poweredAIKWExtraction: "AI-powered keyword extraction",
            moreCredits: "x3 more credits",
            proUsed:"You’ve used all",
            proThisMonth: "credits this month.",
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
            mobileMenu: "Menú",
            mobileMyAccount: "Mi cuenta",
            dashboard: "Mi panel",
            resume: "Mejorar curriculum",
            createResume: "Crear curriculum",
            pricing: "Precios",
            profile: "Perfil",
         },
         user:{
            proPlan: "Plan Pro",
            freePlan: "Plan Gratuito",
         },
         home:{
            header:{
               title: "Aterriza más entrevistas",
               title2: "Con un CV optimizado para ATS",
               subtitle: "Nuestra plataforma de IA potenciada analiza descripciones de trabajo y crea/optimiza tu CV para vencer a los Sistemas de Seguimiento de Aplicantes (ATS).",
               seeHowItWorks: "Ver cómo funciona"
            },
            features:{
               title:"Todo lo que necesitas para vencer al ATS",
               subtitle:"Nuestra plataforma utiliza tecnologías innovadoras para darle a tu CV el mejor chance de ser visto por los reclutadores.",
               feature:{
                  one:{
                     name: "Optimización de IA potenciada",
                     description: "Nuestra IA avanzada analiza las descripciones de trabajo y crea/optimiza tu CV para adaptarlo perfectamente",
                  },
                  two:{
                     name: "Seguimiento de puntaje ATS",
                     description: "Obtén retroalimentación en tiempo real de qué tan bien tu CV actúa en Sistemas de Seguimiento de Aplicantes",
                  },
                  three:{
                     name: "Análisis de Palabras Clave",
                     description: "Identifica las Palabras Clave más importantes de la descripción de trabajo para incluírlas en tu aplicación",
                  },
                  four:{
                     name: "Descargas instantes",
                     description: "Exporta tu CV en múltiples formatos con un click",
                  },
               }
            },
            howItWorks:{
               title:"Cómo funciona",
               title2: "De página en blanco a estar listo para la entrevista en 4 sencillos pasos",
               subtitle:"Nuestra IA hace el trabajo pesado mientras tú te ocupas de la búsqueda de trabajo.",
               steps:{
                  step1:{
                     title: "Configura tu Perfil",
                     description: "Configura tu Perfil con todas tus habilidades, en nuestro sistema",
                  },
                  step2:{
                     title: "Agrega la descripción de trabajo",
                     description: "Pega el texto de la Descripción del Puesto para el que estás aplicando",
                  },
                  step3:{
                     title: "La magia de IA sucede",
                     description: "Job Booster analiza y crea un CV EXCLUSIVO para el puesto de trabajo para el que estás aplicando",
                  },
                  step4:{
                     title: "Descarga y aplica con confianza",
                     description: "Obtén un CV optimizado para el ATS y adaptado al puesto de trabajo para la cual aplica",
                  },
               },
            },
            footer: {
               title: "¿Ready para impulsar tu CV?",
               title2: "Start your free trial today.",
               subtitle: "Obtén 7 días de características Pro para que veas las diferencias por tí mismo. Debido a la sesión de pruebas pre venta, obtén más días grátis de Pro contactando al administrador.",
               tryPro: "Prueba 7 días grátis de Pro"
            },
            getStartedBtn:"Inicia - Es grátis"
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
                  {label: "Bosnia y Herzegovina", value:"ba"}
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
         formProfile:{
            personalInformation: {
               title: "Información Personal",
               subtitle: "*Esta información se guardará automáticamente, excepto el nombre.",
               subtitle2: "*El campo de Email no es tu usuario para iniciar sesión.",
               email: "Correo electrónico",
               phone: "Teléfono",
               linkedin: "URL de tu Linkedin",
               website: "URL de tu sitio web"
            },
            skills: {
               title: "Habilidades",
               subtitle: "*Esta información se guardará automáticamente.",
               addSkill: "Agrega una habilidad",
               subtitle2: 'Usa la tecla "Enter" o "Coma" para registrar tu habilidad.',
            },
            education: {
               title: "Educación",
               institution: "Instituto",
               degree : "Grado académico / Carrera",
               currently: "Actualmente estudio aquí",
               btnAdd: "+ Agregar otra educación"
            },
            work: {
               title: "Historial de trabajo",
               jobTitle: "Nombre del puesto",
               company : "Empresa",
               responsibilities : "Responsabilidades",
               currently: "Actualmente trabajo aquí",
               btnAdd: "+ Agregar otro trabajo"
            },
            project: {
               title: "Projectos",
               name: "Nombre del proyecto",
               description : "Descripción",
               technologies : "Tecnologías",
               btnAdd: "+ Agregar proyecto"
            },
            saveChanges: "*Guarda todos tus cambios con el botón verde de abajo.",
            startDate: "Fecha de inicio",
            endDate: "Fecha de terminación",
            btnSave: "Guardar todo",
            btnSaving: "Guardando...",
         },
         formFeedback:{
            title: "Comentarios",
            titleSubmitted: "¡Gracias por tus comentarios!",
            titleRate: "¿Cómo calificarías tu experiencia?",
            placeholder: "¡Nos encantaría escuchar tus comentarios!",
            titleSuggestions: "¿Algún comentario o sugerencias?",
            btn: "Enviar comentarios",
            btnLoading: "Enviando comentarios..."
         },
         formPatternValidation:{
            phone: "El teléfono debe ser de un formato válido (10 digits).",
            email: "El correo debe ser de un formato válido."
         },
         dashboardPage:{
            welcome: "Bienvenid@",
            subWelcome: "Qué gusto tenerte por aquí.",
            creditsLeft: "créditos disponibles",
            actionCosts: "Costo de Acciones",
            atsReoptimization: "Anáisis de puntaje de ATS",
            keywordOptimization: "Extracción de palabras clave",
            resumeOptimization: "Optimización de CV",
            resumeCreation: "Creación de CV",
            credit: "Crédito",
            upgrade: "Actualizar a Pro para tener 50 créditos/mes →",
            improvements: "Sugerencias de mejora",
            creations: "CV creados",
            drafts: "Borradores",
            noDrafts: "No hay borradores todavía.",
            noCreations: "No hay creaciones todavía.",
            noImprovements: "No hay sugerencias todavía.",
         },
         createResumePage:{
            title:"Completa tu Perfil",
            subtitle:"Desbloquea recomendaciones personalizadas y acceso completo a la creación de CVs con Inteligencia Artificial completando tu perfil profesional.",
            getStartedBtn: "Empezar",
            form:{
               jobTitle: "Título de trabajo",
               jobTitlePlaceholder: "Ejemplo. 'Ejecutivo de ventas @ Amazon'",
               jobDescription: "Descripción del puesto",
               jobDescriptionPlaceholder: "Pega aquí la descripción del trabajo",
               jobDescriptionMinimumError:"Escribe al menos 10 caracteres",
               jobDescriptionMinimum:"Mínimo 10 caracteres",
               steps:{
                  step1:{
                     step: "Info del puesto",
                     title: "Platícanos acerca del puesto de trabajo",
                  },
                  step2:{
                     step: "Palabras clave",
                     title: "Análisis de la descripción de trabajo",
                     title2: "Tus palabras clave",
                     keywordsAmount: "palabras clave",
                     withoutKeywords: "No hay palabras clave guardadas con este borrador",
                     subtitle:"Analiza la descripción de trabajo",
                     extractInfo: "Extrae las habilidades claves y requerimientos para optimizar tu CV.",
                     extractBtn: "Analizar descripción de trabajo",
                     reExtractBtn: "Re-analizar descripción de trabajo",
                  },
                  step3:{
                     step: "Dieño",
                     title: "Elige tu diseño",
                     preview: "Previsualizar",
                     popular: "Popular"
                  },
                  step4:{
                     step: "Extras",
                     title: "Toques finales",
                     coverLetter: "Generar una carta de presentación",
                     coverLetterInfo: "Crearemos una carta de presentación personalizada utilizando tu perfil y la descripción de trabajo.",
                     createButton: "Generar mi nuevo CV",
                     creatingButton: "Generando CV..."
                  },
                  stepBack: "Retroceder",
                  stepFoward: "Continuar",
               },
               templates:{
                  template1:"Clásico",
                  template2:"Moderno",
                  template3:"Optimizado para ATS",
                  template4:"Ejecutivo",
                  bestScore: "Mejor puntaje"
               }
            },
            modalLoading:{
               title:"Elaborando tu CV",
               subtitle: "Usualmente toma 15-30 segundos",
               progress:"Progreso",
               step:"Paso",
               stepOf:"de",
               proTipInf:"Nuestra IA está creando tu CV para Sistemas de Seguimiento de Aplicantes (ATS) para maximizar tus chances de entrevistas.",
               step1:{
                  title: "Inicializando la creación de CV"
               },
               step2:{
                  title: "Analizando la estructura del contenido"
               },
               step3:{
                  title: "Optimizando para el puntaje de ATS"
               },
               step4:{
                  title: "Generando el diseño de tu CV"
               },
               step5:{
                  title: "Chequeos finales de la calidad"
               },
               step6:{
                  title: "Preparando tu CV"
               },
            }
         },
         proLabel:{
            proFeature: "Características Pro:",
            upgradeToPro: "Actualízate a Pro",
            proUnlocks: "Desbloqueos de Pro:",
            buyExtraCredits: "Comprar Créditos extras",
            proTip:"Tip Pro",
         },
         keywordList:{
            appears:"Aparece",
            time:"tiempo/s en esta descripción de trabajo",
            coreRequirements: "Requirementos de Núcleo",
            mustInclude: "Debe incluír",
            noHardSkills: "Habilidades de peso no encontradas",
            toolsAndTech: "Herramientas y Tecnologías",
            noTools: "Herramientas o Tecnologías no encontradas",
            softSkills: "Habilidades suaves",
            noSoftSkills: "Habilidades suaves no encontradas",
            certs: "Certificaciones"
         },
         creditEmptyModal:{
            outOf:"¡Sin Créditos!",
            used: "Has usado todos tus",
            thisMonth: "créditos gratuitos de este mes.",
            noCredits: "0 créditos disponibles",
            used: "usado",
            resetIn: "Reseteo de créditos en",
            days: "días",
            poweredAIKWExtraction: "Extracción de palabras clave impulsada por IA",
            moreCredits: "x3+ veces más créditos",
            proUsed:"Has usado todos tus",
            proThisMonth: "créditos de este mes.",
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