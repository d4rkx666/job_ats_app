import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {useConfig} from "../contexts/ConfigContext"

import WelcomePro from "../components/common/WelcomePro"

const WelcomeProPage = () => {
  const { config, language } = useConfig();
  const labels = config.labels[language];

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/dashboard');
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <WelcomePro labels={labels}/>
  )
};

export default WelcomeProPage;