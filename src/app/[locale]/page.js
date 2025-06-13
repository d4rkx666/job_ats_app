import React from 'react';
import { BoltIcon, ChartBarIcon, CloudArrowDownIcon, CommandLineIcon, DocumentTextIcon, SparklesIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

function Home() {
  // Translation
  const t = useTranslations('home');

  const features = [
    {
      name: t("features.feature.one.name"),
      description: t("features.feature.one.description"),
      icon: SparklesIcon
    },
    {
      name: t("features.feature.two.name"),
      description: t("features.feature.two.description"),
      icon: ChartBarIcon
    },
    {
      name: t("features.feature.three.name"),
      description: t("features.feature.three.description"),
      icon: CommandLineIcon
    },
    {
      name: t("features.feature.four.name"),
      description: t("features.feature.four.description"),
      icon: CloudArrowDownIcon
    }
  ];

  const steps = [
    {
      step: 1,
      title: t("howItWorks.steps.step1.title"),
      description: t("howItWorks.steps.step1.description"),
      visual: (
        <div className="flex items-center justify-center h-30 rounded-lg">
          <DocumentTextIcon className="h-12 w-12 text-blue-500" />
        </div>
      )
    },
    {
      step: 2,
      title: t("howItWorks.steps.step2.title"),
      description: t("howItWorks.steps.step2.description"),
      visual: (
        <div className="flex items-center justify-center h-30 rounded-lg">
          <BoltIcon className="h-12 w-12 text-blue-500" />
        </div>
      )
    },
    {
      step: 3,
      title: t("howItWorks.steps.step3.title"),
      description: t("howItWorks.steps.step3.description"),
      visual: (
        <div className="flex items-center justify-center h-30 rounded-lg">
          <SparklesIcon className="h-12 w-12 text-blue-500" />
        </div>
      )
    },
    {
      step: 4,
      title: t("howItWorks.steps.step4.title"),
      description: t("howItWorks.steps.step4.description"),
      visual: (
        <div className="flex items-center justify-center h-30 rounded-lg">
          <CloudArrowDownIcon className="h-12 w-12 text-blue-500" />
        </div>
      )
    }
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-5xl">
                  <span className="block">{t("header.title")}</span>
                  <span className="block text-blue-400">{t("header.title2")}</span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                {t("header.subtitle")}
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link href="/resume-advisor" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10">
                      {t("getStartedBtn")}
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#what-is-ats"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 demo-step"
                    >
                      {t("header.seeHowItWorks")}
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <Image
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src="/home.jpg"
            alt="header img"
            fill
            title='Photo by Christina @ wocintechchat.com Unsplash'
          />
        </div>
      </div>

      

      {/* ATS Explanation Section */}
      <div className="py-16 bg-white" id="what-is-ats">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">{t("whatIsAts.title")}</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {t("whatIsAts.subtitle")}
            </p>
            <p className="mt-4 max-w-3xl text-xl text-gray-500 lg:mx-auto">
            {t("whatIsAts.whatIs")}
            </p>
          </div>

          <div className="mt-12">
            <div className="bg-blue-50 rounded-lg p-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <ShieldCheckIcon className="h-12 w-12 text-blue-500" />
                </div>
                <div className="ml-6">
                  <h3 className="text-xl font-bold text-gray-900">{t("whatIsAts.affects")}</h3>
                  <div className="mt-4 text-gray-600 space-y-4">
                    <p>{t("whatIsAts.bulletPoints.1")}</p>
                    <p>{t("whatIsAts.bulletPoints.2")}</p>
                    <p>{t("whatIsAts.bulletPoints.3")}</p>
                    <p>{t("whatIsAts.bulletPoints.4")}</p>
                  </div>
                  <div className="mt-8">
                    <a
                      href="#how-it-works"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                    >
                      {t("whatIsAts.howToBeat")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">{t("features.featureTitle")}</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {t("features.title")}
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            {t("features.subtitle")}
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature) => (
                <div key={feature.name} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.name}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div id="how-it-works" className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">{t("howItWorks.title")}</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {t("howItWorks.title2")}
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            {t("howItWorks.subtitle")}
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-16 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-x-8">
              {steps.map((item) => (
                <div key={item.step} className="text-center">
                    <div className="mb-4">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-bold">
                        {item.step}
                      </span>
                    </div>
                    {item.visual}
                  <h3 className="mt-6 text-lg font-medium text-gray-900">{item.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">{t("footer.title")}</span>
            <span className="block">{t("footer.title2")}</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-blue-200">
          {t("footer.subtitle")}
          </p>
          <Link href="/signup" className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 sm:w-auto">
          {t("footer.tryPro")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

export async function generateMetadata({ params: { locale } }) {
  const t = await getTranslations("home");
  
  return {
    title: `${process.env.NEXT_PUBLIC_NAME} - ${t("metadata.title")}`,
    description: t('metadata.description'),
    keywords: t('metadata.keywords').split(','),
    alternates: {
      canonical: `https://perfectocv.com/${locale}`,
      languages: {
        'en': 'https://perfectocv.com/en',
        'es': 'https://perfectocv.com/es',
      },
    }
  };
}