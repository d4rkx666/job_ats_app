import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('menu');
  const f = useTranslations('footer');

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Main links */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{f("navigate")}</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <ul className="space-y-3">
                  <li>
                    <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      {t("home")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/resume-advisor" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      {t("resume")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/pricing" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      {t("pricing")}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-3">
                  <li>
                    <Link href="/pricing#faq" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                      {t("faq")}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{f("contact")}</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:customer@perfectocv.com" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  customer@perfectocv.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter (optional) */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{f("benefits")}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{f("createLabel")}</p>
            <form className="flex gap-2">
              <Link href={"/signup"}>
                <button
                  type="submit"
                  className="px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  {f("create")}
                </button>
              </Link>
              <Link href={"/login"}>
                <button
                  type="submit"
                  className="px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  {f("login")}
                </button>
              </Link>
            </form>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            © {currentYear} {process.env.NEXT_PUBLIC_NAME}. {f("right")}.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm">
              {f("privacy")}
            </Link>
            <Link href="/terms" className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 text-sm">
              {f("terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}