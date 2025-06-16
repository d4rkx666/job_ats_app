import { useTranslations } from 'next-intl';

export default function PrivacyPolicy() {
   const t = useTranslations('privacy');

   return (
      <div className="max-w-4xl mx-auto px-4 py-12">
         <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('title')}</h1>
         <p className="text-gray-600 mb-8">
            {t('lastUpdated')}: {new Date().toLocaleDateString()}
         </p>

         <div className="prose">
            {/* Introduction */}
            <section className="mb-8">
               <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('sections.introduction.title')}
               </h2>
               <p>{t('sections.introduction.content')}</p>
            </section>

            {/* Information Collected */}
            <section className="mb-8">
               <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('sections.informationCollected.title')}
               </h2>
               <p>{t('sections.informationCollected.intro')}</p>
               <ul className="list-disc pl-5 space-y-2">
                  <li>{t('sections.informationCollected.personalInfo')}</li>
                  <li>{t('sections.informationCollected.usageData')}</li>
                  <li>{t('sections.informationCollected.technicalData')}</li>
               </ul>
            </section>

            {/* How We Use */}
            <section className="mb-8">
               <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('sections.howWeUse.title')}
               </h2>
               <p>{t('sections.howWeUse.intro')}</p>
               <ul className="list-disc pl-5 space-y-2">
                  <li>{t('sections.howWeUse.provideService')}</li>
                  <li>{t('sections.howWeUse.createResume')}</li>
                  <li>{t('sections.howWeUse.improveApp')}</li>
                  <li>{t('sections.howWeUse.communicate')}</li>
                  <li>{t('sections.howWeUse.ensureSecurity')}</li>
               </ul>
            </section>

            {/* Data Security */}
            <section className="mb-8">
               <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('sections.dataSecurity.title')}
               </h2>
               <p>{t('sections.dataSecurity.content')}</p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
               <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('sections.yourRights.title')}
               </h2>
               <p>{t('sections.yourRights.intro')}</p>
               <ul className="list-disc pl-5 space-y-2">
                  <li>{t('sections.yourRights.accessInfo')}</li>
                  <li>{t('sections.yourRights.optOut')}</li>
                  <li>{t('sections.yourRights.requestCopy')}</li>
                  <li>{t('sections.yourRights.withdrawConsent')}</li>
               </ul>
            </section>

            {/* Changes */}
            <section className="mb-8">
               <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('sections.changes.title')}
               </h2>
               <p>{t('sections.changes.content')}</p>
            </section>

            {/* Contact */}
            <section>
               <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('sections.contact.title')}
               </h2>
               <p>
                  {t('sections.contact.content')} <a
                     href={`mailto:${process.env.NEXT_PUBLIC_CORPORATE_EMAIL}`}
                     className="text-blue-600 hover:underline"
                  >
                     {process.env.NEXT_PUBLIC_CORPORATE_EMAIL}
                  </a>
                  .
               </p>
            </section>
         </div>
      </div>
   );
}