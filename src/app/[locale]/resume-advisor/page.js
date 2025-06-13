import { getTranslations } from 'next-intl/server';
import ResumeAdvisorPage from './ResumeAdvisorPage';

export async function generateMetadata({ params }) {
  const t = await getTranslations("formImproveResume");
  const p = await params;
  
  return {
    title: `${process.env.NEXT_PUBLIC_NAME} - ${t("metadata.title")}`,
    description: t('metadata.description'),
    keywords: t('metadata.keywords').split(','),
    alternates: {
      canonical: `https://perfectocv.com/${p.locale}/resume-advisor`,
      languages: {
        'en': 'https://perfectocv.com/en/resume-advisor',
        'es': 'https://perfectocv.com/es/resume-advisor',
      },
    }
  };
}

export default function ResumeAdvisor() {
  return <ResumeAdvisorPage/>
}