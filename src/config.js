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
         welcomePro:{
            welcome: "Welcome Aboard!",
            text: "Thank you for your purchase. Your plan has been successfully activated.",
            redirecting: "Redirecting to your dashboard...",
         },
         pricingPage: {
            title:"Simple Prices For Bigger Dreams",
            subtitle:"Whether you are an active or casual job hunter, we have created the best plan designed to take care of your wallet.",
            faqLabel: "Frequently Asked Questions",
            currentPlan: "Current Plan",
            includes: "This includes:",
            freeTierPlan:{
               plan: "Free Plan",
               description: "Take advantage of all the basic tools that will make you stand out to job recruiters.",
               price: "USD 0",
               priceRecurrent: "per month",
               cta: "Get Started for free!",
               items:{
                  kwExtraction: "Keywords Extraction",
                  AI: "Powerful AI assistant",
                  downloads: "PDF-Only Resume Downloads Format",
                  breakdown: "Breakdown Analysis",
                  editor: "Unlock Resume Editor+",
                  credits: "Credits Reset / month",
                  templates: "Basic Resume Templates",
               }
            },
            proTierPlan:{
               plan: "Pro Plan",
               description: "Unlock your career potential with the ultimate tool designed to enhance and boost your resume and stand out to recruiters.",
               price: "USD 12.99",
               priceRecurrent: "per month",
               cta: "Get 7 Free Trial Days!",
               ctaLoading:"We're almost there...",
               items:{
                  kwExtraction: "Pro+ Keywords Extraction",
                  AI: "SUPER AI assistant",
                  downloads: "PDF+WORD Resume Downloads Formats",
                  breakdown: "Advanced Breakdown Analysis",
                  editor: "Unlock Resume Editor+",
                  credits: "+50 Credits Reset / month",
                  templates: "Premium Resume Templates",
               }
            },
            faq: [
               {
                  question: 'How does Job Booster work?',
                  answer: 'Our speciality is to analyse Job Descriptions. Our advanced Artifitial Intelligence looks for the important keywords and adds/suggests them for your resume to pass automated screening systems.'
               },
               {
                  question: 'How do Credits work in Job Booster?',
                  answer: "Credits are used to perform each action, i.e., creating or optimizing your Resume, which will cost credits. To view the Action Cost table, visit your Dashboard."
               },
               {
                  question: "Can I change my plan later?",
                  answer: "Yes, you can upgrade or downgrade your plan at any time."
               },
               {
                  question: "Is there a contract or long-term commitment?",
                  answer: "No, all plans are month-to-month with no long-term contract."
               },
               {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit/debit cards."
               },
               {
                  question: "Do you store my payment data?",
                  answer: "We NEVER store or interact with your payment data. Everything happens through Stripe Payments."
               },
               {
                  question: 'Do you store my resume data?',
                  answer: 'We store your profile data securely and never share it with third parties. You can delete your account and all data at any time.'
               }
            ]
         },
         user: {
            proPlan: "Pro Plan",
            freePlan: "Free Plan",
         },
         home: {
            header: {
               title: "Land More Interviews",
               title2: "With an Applicant Tracking System-Optimized Resume",
               subtitle: "Our AI-powered platform analyzes job descriptions and optimizes your resume to beat Applicant Tracking Systems (ATS).",
               seeHowItWorks: "What is ATS?"
            },
            whatIsAts: {
               title: "Understanding ATS",
               subtitle: "What is an Applicant Tracking System?",
               whatIs: "ATS (Applicant Tracking System) is a software used by recruiters and employers to manage job applications and filter candidates.",
               affects: "How ATS Affects Your Job Search",
               bulletPoints: [
                  "• Over 75% of large companies use ATS to screen resumes before a human sees them.",
                  "• ATS scans your resume for keywords and ranks candidates based on match percentage.",
                  "• Poorly formatted resumes or missing keywords get automatically rejected.",
                  "• Job Booster helps you optimize your resume specifically for ATS requirements and stand out for human recruiters.",
               ],
               howToBeat: "See how we work"
            },
            features: {
               featureTitle: "Features",
               title: "Everything you need to beat the ATS",
               subtitle: "Our platform uses cutting-edge technology to give your resume the best chance of getting seen.",
               feature: {
                  one: {
                     name: "AI-Powered Optimization",
                     description: "Our advanced AI analyzes job descriptions and builds/optimizes your resume to match perfectly",
                  },
                  two: {
                     name: "ATS Score Tracking",
                     description: "Get real-time feedback on how well your resume performs in applicant tracking systems",
                  },
                  three: {
                     name: "Keyword Analysis",
                     description: "Identify the most important keywords to include for each specific job application",
                  },
                  four: {
                     name: "Instant Downloads",
                     description: "Export your resume in multiple formats with one click",
                  },
               }
            },
            howItWorks: {
               title: "How It Works",
               title2: "From Blank Page to Interview-Ready in 4 Simple Steps",
               subtitle: "Our AI does the heavy lifting in while you focus on your job search.",
               steps: {
                  step1: {
                     title: "Setup your profile",
                     description: "Setup a profile with all your skills in our system",
                  },
                  step2: {
                     title: "Add the Job Description",
                     description: "Paste the text from the job posting you're applying for",
                  },
                  step3: {
                     title: "AI Magic Happens",
                     description: "Our system analyzes and creates an exclusive resume for the job you're applying for",
                  },
                  step4: {
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
            getStartedBtn: "Get Started - It's Free"
         },
         formLogin: {
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
            forgotPassword: "Forgot Password?",
         },
         formSignup: {
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
                  { label: "Mexico", value: "mex" },
                  { label: "Canada", value: "cad" },
                  { label: "USA", value: "usa" },
                  { label: "Australia", value: "aut" },
                  { label: "Bosnia and Herzegovina", value: "ba" }
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
            loginHere: "Login Here",
         },
         formImproveResume: {
            title: "Let's analyse your resume and get you the best advice to stand out for recruiters",
            resumeFile: {
               label: "Upload Your Resume (PDF)",
               placeholder: "Click to upload or drag and drop",
               required: "Resume file is required",
               invalidType: "Only PDF files are allowed",
               invalidSize: "File size must be less than 5MB",
            },
            jobTitle: {
               label: "Job title",
               placeholder: "Paste the job title here",
               required: "Job title is required",
            },
            jobDescription: {
               label: "Job Description",
               placeholder: "Paste the job description here",
               required: "Job description is required",
            },
            uploadBtn: {
               label: "Optimize Resume",
               loading: "Optimizing...",
            },
         },
         formProfile: {
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
               degree: "Degree",
               currently: "I currently study here",
               btnAdd: "+ Add Another Education"
            },
            work: {
               title: "Work History",
               jobTitle: "Job Title",
               company: "Company",
               responsibilities: "Responsibilities",
               currently: "I currently study here",
               btnAdd: "+ Add Another job"
            },
            project: {
               title: "Projects",
               name: "Project Name",
               description: "Description",
               technologies: "Technologies",
               btnAdd: "+ Add Project"
            },
            saveChanges: "*Save all your changes with the green button below.",
            startDate: "Start Date",
            endDate: "EndDate",
            btnSave: "Save all",
            btnSaving: "Saving...",
            btnSaved: "Saved",
         },
         formFeedback: {
            title: "Your feedback",
            titleSubmitted: "Thank you for your feedback!",
            titleRate: "How would you rate your experience?",
            placeholder: "We'd love to hear from you!",
            titleSuggestions: "Any comments or suggestions?",
            btn: "Send feedback",
            btnLoading: "Sending feedback..."
         },
         formPatternValidation: {
            phone: "Phone must be a valid format (10 digits).",
            email: "Email must be a valid format.",
            url: "URL must be a valid format."
         },
         previewResume: {
            title: "AI suggestions",
            subtitle: "Here you go your new suggestions to boost your job hunting. Please read carefully and keep it up!",
         },
         dashboardPage: {
            welcome: "Welcome",
            subWelcome: "We're glad to have you here.",
            monthlyCredits: "Montly Credits",
            creditsLeft: "credits left",
            actionCosts: "Action Costs",
            atsReoptimization: "ATS Score analysis",
            keywordOptimization: "Keyword Extraction",
            resumeOptimization: "Resume advice",
            credit: "credit",
            upgrade: "Upgrade to Pro for 50 credits/month →",
            resumeCreation: "Resume Creation",
            improvements: "Improvements",
            creations: "Creations",
            drafts: "Drafts",
            noDrafts: "There are not drafts yet.",
            noCreations: "Create your first resume",
            noImprovements: "Improve your first resume",
            expires: "Expires",
            nextReset: "Next reset",
            quickActions: "Quick actions",
            newResume: "Create resume",
            improveCurrent: "Improve existing",
            sort: "Sort",
            newest: "Newest first",
            oldest: "Oldest first",
            settings: "Manage My Plan",
            settingsLoading: "Generating Management...",
         },
         createResumePage: {
            title: "Complete Your Profile",
            subtitle: "Unlock personalized recommendations and full access by setting up your professional profile",
            getStartedBtn: "Get Started",
            form: {
               jobTitle: "Job Title",
               jobTitlePlaceholder: "e.g. 'Sales executive @ Amazon'",
               jobDescription: "Job Description",
               jobDescriptionPlaceholder: "Paste the full job description here",
               jobDescriptionMinimumError: "Please provide at least 10 characters",
               jobDescriptionMinimum: "Minimum 10 characters",
               steps: {
                  step1: {
                     step: "Job Info",
                     title: "Tell us about the job",
                  },
                  step2: {
                     step: "Keywords",
                     title: "Job Description Analysis",
                     title2: "Your Resume Keywords",
                     keywordsAmount: "keywords",
                     withoutKeywords: "No keywords saved with this draft",
                     subtitle: "Analyze the job description",
                     extractInfo: "Extract key skills and requirements to optimize your resume.",
                     extractBtn: "Analyze Job Description",
                     reExtractBtn: "Re-analyze Job Description",
                  },
                  step3: {
                     step: "Design",
                     title: "Choose your design",
                     preview: "Preview",
                     popular: "Popular"
                  },
                  step4: {
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
               templates: {
                  template1: "Classic",
                  template2: "Modern",
                  template3: "ATS-Optimized",
                  template4: "Executive",
                  bestScore: "Best Score"
               }
            },
            modalLoading: {
               title: "Crafting Your Resume",
               subtitle: "This usually takes 15-30 seconds",
               progress: "Progress",
               step: "Step",
               stepOf: "of",
               proTipInf: "Our AI is crafting your resume to Stand Out for recruiters and maximize your interview chances! We wil also ensure a high change to beat the Applicant Tracking Systems (ATS).",
               step1: {
                  title: "Initializing resume creation"
               },
               step2: {
                  title: "Analyzing content structure"
               },
               step3: {
                  title: "Optimizing for ATS scoring"
               },
               step4: {
                  title: "Generating your layout"
               },
               step5: {
                  title: "Final quality checks"
               },
               step6: {
                  title: "Preparing your resume"
               },
            }
         },
         proLabel: {
            proFeature: "Pro Feature:",
            upgradeToPro: "Upgrade to Pro",
            proUnlocks: "Pro unlocks:",
            buyExtraCredits: "Buy Extra Credits",
            proTip: "Pro Tip",
            unlockFullKwAnalysis: "Unlock Full Keyword Analysis"
         },
         keywordList: {
            appears: "Appears",
            time: "time/s in this job description",
            coreRequirements: "Core Requirements",
            mustInclude: "Must Include",
            noHardSkills: "No hard skills identified",
            toolsAndTech: "Tools & Technologies",
            noTools: "No tools identified",
            softSkills: "Soft Skills",
            noSoftSkills: "No soft skills identified",
            certs: "Certifications",
            proEnabled: "Advanced keyword analysis enabled",
            lastExtracted: "Last extracted keywords",
            freeUsersSee: "Free users see",
            freeUsersSeeKw: "keywords",
            proMembersGet: "Pro members get",
            proMembersGetMore: "more",
            proMembersGetIncluding: "including",
         },
         creditEmptyModal: {
            outOf: "Out of Credits!",
            used: "You've used all your",
            thisMonth: "free credits this month.",
            noCredits: "0 credits left",
            resetIn: "Credits reset in",
            days: "days",
            poweredAIKWExtraction: "Smarter AI, Tools+",
            moreCredits: "x3 more credits",
            proUsed: "You’ve used all",
            proThisMonth: "credits this month.",
         },
         previewImprovement: {
            title: "AI suggestions",
            subtitle: "Here you go your new suggestions to boost your job hunting. Please read carefully and keep it up!",
         },
         verifyEmailReminder: {
            title: "Please verify your email",
            subtitle: "We have sent you an email at:",
         },
         error: {
            userNotFound: "Email or password incorrect. Please try again.",
            userAlreadyInUse: "User already exists. Please use a different one.",
            userNotVerified: "Please verify your email before using this service.",
            resumeNotUploaded: "Failed to submit resume. Please try again.",
            withoutImprovements: "You don't have improvements left :(! Please upgrade your plan...",
            universalError: "Something went wrong. Please try again later!",
         },
         msg: {
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
            resume: "Impulsar CV",
            createResume: "Crear currículum",
            pricing: "Precios",
            profile: "Perfil",
         },
         welcomePro:{
            welcome: "¡Bienvenido abordo!",
            text: "Gracias por tu suscripción. Tu plan ha sido exitosamente activado.",
            redirecting: "Redirigiéndote a tu Panel de Usuario...",
         },
         pricingPage: {
            title:"Precios simples para sueños grandes",
            subtitle:"Seas un cazador de trabajos activo o casual, tenemos el mejor plan pensado para cuidar de tu bolsillo.",
            faqLabel: "Preguntas Frecuentes",
            currentPlan: "Plan Actual",
            includes: "Esto incluye:",
            freeTierPlan:{
               plan: "Plan Gratuito",
               description: "Sácale provecho a todas las herramientas básicas que te harán destacar para los reclutadores de tabajo.",
               price: "MXN 0",
               priceRecurrent: "por mes",
               cta: "Empieza totalmente GRATIS",
               ctaLoading:"Casi listo...",
               items:{
                  kwExtraction: "Extracción de Palabras Clave",
                  AI: "Potente Inteligencia Artificial de Asistente ",
                  downloads: "Sólo descargas en formato PDF",
                  breakdown: "Resúmen detallado del análisis de Currículum",
                  editor: "Editor de Currículum+",
                  credits: "+15 Creditos reset / mes",
                  templates: "Plantillas básicas para Currículums",
               }
            },
            proTierPlan:{
               plan: "Plan Pro",
               description: "Desbloquea el potencial de tu carrera con las herramientas de última tecnología para mejorar e impulsar tu Currículum y destacar para los empleadores.",
               price: "MXN 249",
               priceRecurrent: "por mes",
               cta: "¡Prueba 7 Días de Pro Plan Gratis!",
               ctaLoading:"Casi listo...",
               items:{
                  kwExtraction: "Extracción de Palabras Clave Pro+",
                  AI: "SUPER Inteligencia Artificial de Asistente",
                  downloads: "Descargas en Formado PDF+WORD",
                  breakdown: "Resumen detallado de análisis de Currículum",
                  editor: "Editor de Currículum+",
                  credits: "+50 Créditos reset / mes",
                  templates: "Plantillas Premium para Currículums",
               }
            },
            faq: [
               {
                  question: '¿Cómo funciona Job Booster?',
                  answer: 'Nuestra especialidad es analizar las Descripciones de Trabajo. Nuestra Avanzada Inteligencia Artificial busca las palabras clave más importantes y las agrega/o sugiere en tu Curriculum para destacar para los reclutadores de trabajo.'
               },
               {
                  question: '¿Cómo funcionan los Créditos en Job Booster?',
                  answer: 'Los Créditos se utilizan para realizar cada acción, es decir, la creación u optimización de tu CV, costará créditos. Para ver la tabla de Costos de Acción, visita tu Panel de Usuario.'
               },
               {
                  question: "¿Puedo cambiar mi plan en cualquier momento?",
                  answer: "Sí, puedes mejorar tu plan, o seguir con el plan gratuito en cualquier momento."
               },
               {
                  question: "¿Hay algún contrato o tengo un compromiso a largo plazo?",
                  answer: "No, todos los planes son MENSUALES y no incluyen ningun tipo de contrato a largo plazo."
               },
               {
                  question: "¿Qué métodos de pago aceptan?",
                  answer: "Aceptamos la mayoría de tarjetas de Crédito/Débito, y también pagos mediante Oxxo."
               },
               {
                  question: "¿Almacenan mi información de pago?",
                  answer: "Nosotros NUNCA almacenamos o interactuamos con tu información de pago. Todo sucede a través de la plataforma de Stripe."
               },
               {
                  question: '¿Almacenan mis datos de Currículum?',
                  answer: 'Tus datos de perfil se almacenan seguros, y NUNCA los compartimos con terceros. Puedes eliminar tus perfil en cualquier momento.'
               }
            ]
         },
         user: {
            proPlan: "Plan Pro",
            freePlan: "Plan Gratuito",
         },
         home: {
            header: {
               title: "Consigue más entrevistas de trabajo",
               title2: "Con un Curriculum Vitae optimizado para el Sistema de Selección Automatizado",
               subtitle: "Nuestra plataforma de IA potenciada analiza descripciones de trabajo y crea/optimiza tu Currículum Vitae (CV) para vencer al Sistema de Selección Automatizado (ATS).",
               seeHowItWorks: "¿Qué es el ATS?"
            },
            whatIsAts: {
               title: "Entendiendo al ATS",
               subtitle: "¿Qué es el Sistema de Selección Automatizado?",
               whatIs: "ATS (Applicant Tracking System o Sistema de Selección Automatizado) es un software usado por los reclutadores y empleadores para gestionar y filtrar las aplicaciones de candidatos automáticamente.",
               affects: "¿Cómo el ATS afecta en tu búsqueda de empleo?",
               bulletPoints: [
                  "• Más del 75% de grandes compañías utilizan el ATS para filtrar los CVs de los candidatos antes de que lleguen a manos de un reclutador humano.",
                  "• El ATS escanea tu CV en búsqueda de Palabras Clave y clasifica a los candidatos basados en el porcentaje de coincidencia.",
                  "• Los CVs con malos formatos o con Palabras Clave faltantes son rechazados automáticamente.",
                  "• Job Booster te ayuda a optimizar tu CV específicamente para los requerimientos del ATS, y ser destacado entre los candidatos para cuando tu CV llegue a manos de un reclutador humano.",
               ],
               howToBeat: "Míra cómo lo hacemos"
            },
            features: {
               featureTitle: "Características",
               title: "Todo lo que necesitas para vencer al ATS",
               subtitle: "Nuestra plataforma utiliza tecnologías innovadoras para darle a tu CV el mejor chance de ser visto por los reclutadores.",
               feature: {
                  one: {
                     name: "Optimización de IA potenciada",
                     description: "Nuestra IA avanzada analiza las descripciones de trabajo y crea/optimiza tu CV para adaptarlo perfectamente",
                  },
                  two: {
                     name: "Seguimiento de puntaje ATS",
                     description: "Obtén retroalimentación en tiempo real del desempeño de tu CV para el Sistema de Selección Automatizado",
                  },
                  three: {
                     name: "Análisis de Palabras Clave",
                     description: "Identifica las Palabras Clave más importantes de la descripción de trabajo para incluírlas en tu aplicación",
                  },
                  four: {
                     name: "Descargas instantes",
                     description: "Exporta tu CV en múltiples formatos con un solo clic",
                  },
               }
            },
            howItWorks: {
               title: "Cómo funciona",
               title2: "De página en blanco a estar listo para la entrevista en 4 sencillos pasos",
               subtitle: "Nuestra IA hace el trabajo pesado mientras tú te ocupas de la búsqueda de trabajo.",
               steps: {
                  step1: {
                     title: "Configura tu Perfil",
                     description: "Crea tu Perfil con todas tus habilidades y experiencias de trabajo",
                  },
                  step2: {
                     title: "Agrega la descripción de trabajo",
                     description: "Pega el texto de la Descripción del Puesto para el que estás aplicando",
                  },
                  step3: {
                     title: "La magia de IA sucede",
                     description: "Job Booster analiza y crea un CV EXCLUSIVO para el puesto de trabajo para el que estás aplicando",
                  },
                  step4: {
                     title: "Descarga y aplica con confianza",
                     description: "Obtén un CV optimizado para el ATS y adaptado al puesto de trabajo para la cual aplica",
                  },
               },
            },
            footer: {
               title: "¿Ready para impulsar tu CV?",
               title2: "Empieza tu prueba gratis de Pro play hoy.",
               subtitle: "Obtén 7 días de características Pro para que veas las diferencias por tí mismo. Debido a la sesión de pruebas pre venta, obtén más días gratis de Pro contactando al administrador.",
               tryPro: "Prueba 7 días gratis de Pro"
            },
            getStartedBtn: "Inicia - Es gratis"
         },
         formLogin: {
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
            forgotPassword: "Olvidé la contraseña",
         },
         formSignup: {
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
                  { label: "México", value: "mex" },
                  { label: "Canadá", value: "cad" },
                  { label: "USA", value: "usa" },
                  { label: "Australia", value: "aut" },
                  { label: "Bosnia y Herzegovina", value: "ba" }
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
            loginHere: "Inicia sesión aquí",
         },
         formImproveResume: {
            title: "Analicemos tu CV para darte los mejores consejos de cómo destacar para los reclutadores",
            resumeFile: {
               label: "Sube tu curriculum (PDF)",
               placeholder: "Clic para subir o arrastra y suelta tu archivo",
               required: "El archivo de currículum es obligatorio",
               invalidType: "Sólo se permiten archivos PDF",
               invalidSize: "El tamaño del archivo debe ser menos de 5MB",
            },
            jobTitle: {
               label: "Título del puesto",
               placeholder: "Pega el título de puesto aquí",
               required: "El título del puesto es obligatorio",
            },
            jobDescription: {
               label: "Descripción del puesto",
               placeholder: "Pega la descripción del puesto aquí",
               required: "La descripción del puesto es obligatoria",
            },
            uploadBtn: {
               label: "Optimizar",
               loading: "Optimizando...",
            },
         },
         formProfile: {
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
               degree: "Grado académico / Carrera",
               currently: "Actualmente estudio aquí",
               btnAdd: "+ Agregar otra educación"
            },
            work: {
               title: "Historial de trabajo",
               jobTitle: "Nombre del puesto",
               company: "Empresa",
               responsibilities: "Responsabilidades",
               currently: "Actualmente trabajo aquí",
               btnAdd: "+ Agregar otro trabajo"
            },
            project: {
               title: "Proyectos",
               name: "Nombre del proyecto",
               description: "Descripción",
               technologies: "Tecnologías",
               btnAdd: "+ Agregar proyecto"
            },
            saveChanges: "*Guarda todos tus cambios con el botón verde de abajo.",
            startDate: "Fecha de inicio",
            endDate: "Fecha de terminación",
            btnSave: "Guardar todo",
            btnSaving: "Guardando...",
            btnSaved: "Guardado",
         },
         formFeedback: {
            title: "Comentarios",
            titleSubmitted: "¡Gracias por tus comentarios!",
            titleRate: "¿Cómo calificarías tu experiencia?",
            placeholder: "¡Nos encantaría escuchar tus comentarios!",
            titleSuggestions: "¿Algún comentario o sugerencias?",
            btn: "Enviar comentarios",
            btnLoading: "Enviando comentarios..."
         },
         formPatternValidation: {
            phone: "El teléfono debe ser de un formato válido (10 digitos).",
            email: "El correo debe ser de un formato válido.",
            url: "La URL debe tener un formato válido."
         },
         dashboardPage: {
            welcome: "Bienvenid@",
            subWelcome: "Qué gusto tenerte por aquí.",
            monthlyCredits: "Créditos Mensuales",
            creditsLeft: "créditos disponibles",
            actionCosts: "Costo de Acciones",
            atsReoptimization: "Análisis de puntaje de ATS",
            keywordOptimization: "Extracción de palabras clave",
            resumeOptimization: "Consejos de CV",
            resumeCreation: "Creación de CV",
            credit: "crédito",
            upgrade: "Actualizar a Pro para tener 50 créditos/mes →",
            improvements: "Sugerencias de mejora",
            creations: "CV creados",
            drafts: "Borradores",
            noDrafts: "No hay borradores todavía.",
            noCreations: "Crea tu primer CV",
            noImprovements: "Haz tu primera mejora de CV",
            expires: "Expira",
            nextReset: "Próximo reset",
            quickActions: "Acciones rápidas",
            newResume: "Crear CV",
            improveCurrent: "Mejorar exitente",
            sort: "Orden",
            newest: "Nuevos primero",
            oldest: "Viejos primero",
            settings: "Administrar mi Plan",
            settingsLoading: "Generando administración...",
         },
         createResumePage: {
            title: "Completa tu Perfil",
            subtitle: "Desbloquea recomendaciones personalizadas y acceso completo a la creación de CVs con Inteligencia Artificial completando tu perfil profesional.",
            getStartedBtn: "Empezar",
            form: {
               jobTitle: "Título de trabajo",
               jobTitlePlaceholder: "Ejemplo. 'Ejecutivo de ventas @ Amazon'",
               jobDescription: "Descripción del puesto",
               jobDescriptionPlaceholder: "Pega aquí la descripción del trabajo",
               jobDescriptionMinimumError: "Escribe al menos 10 caracteres",
               jobDescriptionMinimum: "Mínimo 10 caracteres",
               steps: {
                  step1: {
                     step: "Info del puesto",
                     title: "Platícanos acerca del puesto de trabajo",
                  },
                  step2: {
                     step: "Palabras clave",
                     title: "Análisis de la descripción de trabajo",
                     title2: "Tus palabras clave",
                     keywordsAmount: "palabras clave",
                     withoutKeywords: "No hay palabras clave guardadas con este borrador",
                     subtitle: "Analiza la descripción de trabajo",
                     extractInfo: "Extrae las habilidades claves y requerimientos para optimizar tu CV.",
                     extractBtn: "Analizar descripción de trabajo",
                     reExtractBtn: "Re-analizar descripción de trabajo",
                  },
                  step3: {
                     step: "Dieño",
                     title: "Elige tu diseño",
                     preview: "Previsualizar",
                     popular: "Popular"
                  },
                  step4: {
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
               templates: {
                  template1: "Clásico",
                  template2: "Moderno",
                  template3: "Optimizado para ATS",
                  template4: "Ejecutivo",
                  bestScore: "Mejor puntaje"
               }
            },
            modalLoading: {
               title: "Elaborando tu CV",
               subtitle: "Usualmente toma 15-30 segundos",
               progress: "Progreso",
               step: "Paso",
               stepOf: "de",
               proTipInf: "¡Nuestra IA está construyendo tu CV para destacarte con los reclutadores y maximizar tus chances de tener entrevistas! También aseguramos un gran chance de pasar los Sistema de Selección Automatizado (ATS).",
               step1: {
                  title: "Inicializando la creación de CV"
               },
               step2: {
                  title: "Analizando la estructura del contenido"
               },
               step3: {
                  title: "Optimizando para el puntaje de ATS"
               },
               step4: {
                  title: "Generando el diseño de tu CV"
               },
               step5: {
                  title: "Chequeos finales de la calidad"
               },
               step6: {
                  title: "Preparando tu CV"
               },
            }
         },
         proLabel: {
            proFeature: "Características Pro:",
            upgradeToPro: "Actualízate a Pro",
            proUnlocks: "Desbloqueos de Pro:",
            buyExtraCredits: "Comprar Créditos extras",
            proTip: "Tip Pro",
            unlockFullKwAnalysis: "Desbloquea el análisis completo de Palabras Clave"
         },
         keywordList: {
            appears: "Aparece",
            time: "tiempo/s en esta descripción de trabajo",
            coreRequirements: "Requirementos de Núcleo",
            mustInclude: "Debe incluír",
            noHardSkills: "Habilidades de peso no encontradas",
            toolsAndTech: "Herramientas y Tecnologías",
            noTools: "Herramientas o Tecnologías no encontradas",
            softSkills: "Habilidades suaves",
            noSoftSkills: "Habilidades suaves no encontradas",
            certs: "Certificaciones",
            proEnabled: "Análisis de Palabras Clave habilitada",
            lastExtracted: "Últimas Palabras Clave extraídas",
            freeUsersSee: "Usuarios con plan gratuito ven",
            freeUsersSeeKw: "Palabras Clave",
            proMembersGet: "Miembros Pro obtienen",
            proMembersGetMore: "más",
            proMembersGetIncluding: "incluyendo",
         },
         creditEmptyModal: {
            outOf: "¡Sin Créditos!",
            used: "Has usado todos tus",
            thisMonth: "créditos gratuitos de este mes.",
            noCredits: "0 créditos disponibles",
            resetIn: "Reseteo de créditos en",
            days: "días",
            poweredAIKWExtraction: "IA más inteligente, Herramientas+",
            moreCredits: "x3+ veces más créditos",
            proUsed: "Has usado todos tus",
            proThisMonth: "créditos de este mes.",
         },
         previewImprovement: {
            title: "Sugerencias de IA",
            subtitle: "Aquí tienes tus nuevas sugerencias para impulsar tu búsqueda de empleo. ¡Por favor léalo cuidadosamente y manténgalo actualizado!",
         },
         verifyEmailReminder: {
            title: "Por favor verifica tu correo electrónico",
            subtitle: "Te hemos enviado un correo a:",
         },
         error: {
            userNotFound: "Correo o contraseña incorrecta. Por favor inténtalo de nuevo.",
            userAlreadyInUse: "Usuario ya existe, por favor usa uno diferente.",
            userNotVerified: "Por favor verifica tu correo electrónico antes de usar este servicio.",
            resumeNotUploaded: "Falló al subir curriculum. Por favor inténtalo de nuevo.",
            withoutImprovements: "¡No quedan más mejoras :(! Por favor mejora tu plan...",
            universalError: "Algo salió mal. Por favor inténtalo más tarde!",
         },
         msg: {
            emailSendAgain: "Enviar de nuevo",
            emailSent: "Correo enviado. Podrás enviar el correo nuevamente en: "
         }
      },
   },
};