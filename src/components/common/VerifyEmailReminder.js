import React, {useState, useEffect, useRef} from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useConfig } from "../../contexts/ConfigContext";

const VerifiEmailReminder = () => {

  // Language
  const {config, language} = useConfig();
  const labels = config.labels[language];

  const auth = useAuth();
  const [disabled, setDisabled] = useState(false);
  const [successful, setSuccessful] = useState("");
  const wait = process.env.REACT_APP_TIME_EMAIL_RESEND; // in sec
  const [counter, setCounter] = useState({seconds:0, minutes:0});
  const interval = useRef(null);

  const handleResendEmail = async() =>{
    try {
      await auth.resendVerificationEmail();
      setDisabled(true);
      setSuccessful(labels.msg.emailSent);

      // countdown
      let min = (Math.floor(wait / 60));
      let secs = (wait - (min * 60));

      setCounter({seconds: secs, minutes: min});

      interval.current = setInterval(() => {
          setCounter(counter => {
            let { seconds, minutes } = { ...counter};
            if(seconds === 0) {
                seconds = 59;
                minutes --;
            } else if(minutes >= 0){
                seconds --;
            }
            
            return {
                seconds,
                minutes
            }
        }); 
      }, 1000);
      
    } catch (error) {
      //console.error("Error resending verification email:", error.message);
      //alert(error.message);
    }
  }

  // clear interval
  useEffect(()=>{
    if(counter.minutes === 0 && counter.seconds === 0){
      clearInterval(interval.current);
      interval.current = null;
      setSuccessful(labels.msg.emailSendAgain);
      setDisabled(false);
    }
  });

  return (
    <div>
    { !auth.verified && 
      <div className="text-center rounded-xl bg-white p-3 m-5 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
        <div>
          <div className="text-sm font-medium text-black dark:text-white">{labels.verifyEmailReminder.title}</div>
          <p className="text-gray-500 dark:text-gray-400">{labels.verifyEmailReminder.subtitle} {auth.user.email}</p>
          <button onClick={handleResendEmail} disabled={disabled} className="w-full rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-700">
            {successful} {interval.current ? (String(counter.minutes).padStart(2, '0') + ":" + String(counter.seconds).padStart(2, '0')) : ""}
            </button>
        </div>
      </div>
      }
    </div>
  );
};

export default VerifiEmailReminder;