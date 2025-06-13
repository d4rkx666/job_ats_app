import { getTranslations } from 'next-intl/server';
import PricingPage from './PricingPage';

export async function generateMetadata({ params }) {
  const t = await getTranslations("pricingPage");
  const p = await params;
  
  return {
    title: `${process.env.NEXT_PUBLIC_NAME} - ${t("metadata.title")}`,
    description: t('metadata.description'),
    keywords: t('metadata.keywords').split(','),
    alternates: {
      canonical: `https://perfectocv.com/${p.locale}/pricing`,
      languages: {
        'en': 'https://perfectocv.com/en/pricing',
        'es': 'https://perfectocv.com/es/pricing',
      },
    }
  };
}

export default function Pricing() {
  return <PricingPage/>
}