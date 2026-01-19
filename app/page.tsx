import Link from "next/link";
import React from "react";
import { Calculator, TrendingDown, Wallet } from "lucide-react";

export default function Welcome3() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-slate-100 dark:from-gray-900 dark:via-emerald-900 dark:to-gray-950 flex items-center">
      <div className="max-w-6xl mx-auto w-full px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Features */}
          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                SARS Tax Compliance 2025/26
              </p>
              <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                Tax Calculator
              </h1>
            </div>

            <p className="text-gray-700 dark:text-gray-300 text-lg">
              Get an instant breakdown of your take-home pay, including PAYE,
              UIF, and pension contributions based on South African tax law.
            </p>

            {/* Feature List */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Calculator className="text-emerald-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Accurate Calculations
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    SARS compliant 2025/26 tax brackets
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <TrendingDown className="text-emerald-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Instant Results
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    See your monthly net pay instantly
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Wallet className="text-emerald-600" size={24} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Full Breakdown
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    PAYE, UIF, pension & net pay details
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/tax-calculator"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-8 py-3 text-sm font-semibold text-white hover:bg-emerald-700 transition shadow-lg"
            >
              Open Calculator
            </Link>
          </div>

          {/* Right: Visual */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-80 h-80">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400 to-blue-500 opacity-20 blur-2xl" />
              <div className="relative rounded-3xl bg-white dark:bg-gray-800 shadow-2xl p-8 border border-gray-200 dark:border-gray-700">
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Monthly Net Pay
                    </p>
                    <p className="text-3xl font-bold text-emerald-600">
                      R 25,000
                    </p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>Gross</span>
                      <span>R 35,000</span>
                    </div>
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>PAYE</span>
                      <span>-R 6,500</span>
                    </div>
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>Pension (7.5%)</span>
                      <span>-R 2,625</span>
                    </div>
                    <div className="flex justify-between text-gray-700 dark:text-gray-300">
                      <span>UIF</span>
                      <span>-R 350</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
