import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
            <Link
              href="/terms"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Support Contact */}
          <div className="text-sm text-gray-600">
            Support: <a
              href="mailto:support@iqtestzone.net"
              className="text-gray-900 hover:text-gray-700 transition-colors font-medium"
            >
              support@iqtestzone.net
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
