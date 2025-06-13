"use client"
import Link from 'next/link';
import Head from 'next/head';

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>Page Not Found | Perfecto CV</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
        <link rel="icon" href="/logo.svg" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-800 flex flex-col items-center justify-center p-4 text-white">
        <div className="max-w-2xl w-full text-center">
          {/* Animated 404 text */}
          <div className="relative">
            <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4 animate-pulse">
              404
            </h1>
            <div className="absolute -inset-4 rounded-full bg-blue-500/20 blur-xl animate-pulse"></div>
          </div>
          
          <h2 className="text-3xl font-semibold mb-4">Oops! Page Not Found</h2>
          
          <p className="text-blue-200 mb-8 text-lg">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. 
            Let&apos;s get you back on track.
          </p>
          
          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Return Home
            </Link>
          </div>
        </div>
        
        {/* Footer */}
        <div className="absolute bottom-6 text-blue-400 text-sm">
          © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_NAME}. All rights reserved.
        </div>

        {/* Subtle decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-cyan-500/10 blur-3xl -z-10"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-blue-600/10 blur-3xl -z-10"></div>
      </div>
    </>
  );
};

export default NotFoundPage;
