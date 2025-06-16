import { useTranslations } from 'next-intl';

export default function TermsOfService() {
   const t = useTranslations('terms');
   const currentYear = new Date().getFullYear();

   return (
      <div className="max-w-4xl mx-auto px-4 py-12">
         <h1 className="text-3xl font-bold text-gray-900 mb-6">{t('title')}</h1>
         <p className="text-gray-600 mb-8">
            {t('lastUpdated')}: {new Date().toLocaleDateString()}
         </p>

         <div className="prose">
            {/* Acceptance */}
            <section className="mb-8">
               <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('sections.acceptance.title')}
               </h2>
               <p>{t('sections.acceptance.content')}</p>
            </section>

            {/* Description */}
            <section className="mb-8">
               <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('sections.description.title')}
               </h2>
               <p>{t('sections.description.content')}</p>
            </section>

            {/* Responsibilities */}
            <section className="mb-8">
               <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('sections.responsibilities.title')}
               </h2>
               <p>{t('sections.responsibilities.intro')}</p>
               <ul className="list-disc pl-5 space-y-2">
                  <li>{t('sections.responsibilities.provideInfo')}</li>
                  <li>{t('sections.responsibilities.checkInfo')}</li>
                  <li>{t('sections.responsibilities.maintainConfidentiality')}</li>
                  <li>{t('sections.responsibilities.lawfulUse')}</li>
                  <li>{t('sections.responsibilities.noMisuse')}</li>
               </ul>
            </section>

            {/* Subscriptions */}
            <section className="mb-8">
               <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('sections.subscriptions.title')}
               </h2>
               <ul className="list-disc pl-5 space-y-2">
                  <li>{t('sections.subscriptions.premiumFeatures')}</li>
                  <li>{t('sections.subscriptions.autoRenew')}</li>
                  <li>{t('sections.subscriptions.nonRefundable')}</li>
                  <li>{t('sections.subscriptions.priceChanges')}</li>
               </ul>
            </section>

            {/* IP */}
            <section className="mb-8">
               <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('sections.ip.title')}
               </h2>
               <p>{t('sections.ip.content')}</p>
            </section>

            {/* Warranties */}
            <section className="mb-8">
               <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('sections.warranties.title')}
               </h2>
               <p>{t('sections.warranties.intro')}</p>
               <ul className="list-disc pl-5 space-y-2">
                  <li>{t('sections.warranties.uninterrupted')}</li>
                  <li>{t('sections.warranties.employment')}</li>
                  <li>{t('sections.warranties.requirements')}</li>
               </ul>
            </section>

            {/* Liability */}
            <section className="mb-8">
               <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('sections.liability.title')}
               </h2>
               <p>{t('sections.liability.content')}</p>
            </section>

            {/* Termination */}
            <section className="mb-8">
               <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {t('sections.termination.title')}
               </h2>
               <p>{t('sections.termination.content')}</p>
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