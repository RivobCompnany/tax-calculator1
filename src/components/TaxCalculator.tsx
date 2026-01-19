"use client";

import { useState, useEffect, useRef } from "react";
import {
  Play,
  RefreshCw,
  Users,
  ShieldCheck,
  Info,
  Briefcase,
  Car,
  PiggyBank,
  Copy,
  Wallet,
  X,
  AlertCircle,
} from "lucide-react";

type TaxResult = {
  monthly_gross: number;
  monthly_paye: number;
  monthly_pension: number;
  monthly_uif: number;
  monthly_net_pay: number;
};

const formatCurrency = (value?: number) =>
  value !== undefined
    ? new Intl.NumberFormat("en-ZA", {
        style: "currency",
        currency: "ZAR",
      }).format(value)
    : "R 0.00";

export default function TaxCalculator() {
  const [ctcAnnual, setCtcAnnual] = useState<number>(0);
  const [travelAllowance, setTravelAllowance] = useState<number>(0);
  const [pensionPerc, setPensionPerc] = useState<number>(0.0);
  const [dependants, setDependants] = useState<number>(0);
  const [result, setResult] = useState<TaxResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showCloseModal, setShowCloseModal] = useState(false);
  const [ctcError, setCtcError] = useState<string>("");
  const copyTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    };
  }, []);

  const handleCloseApp = () => {
    setShowCloseModal(true);
  };

  const confirmClose = () => {
    window.close();
  };

  const validateCTC = (): boolean => {
    if (!ctcAnnual || ctcAnnual <= 0) {
      setCtcError("Annual CTC must be filled and greater than 0");
      return false;
    }
    setCtcError("");
    return true;
  };

  const calculate = async () => {
    if (!validateCTC()) return;

    setLoading(true);
    try {
      // Use environment variable (fallback to localhost:8000)
      const url = "/calculate-tax";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ctc_annual: ctcAnnual,
          travel_allowance_annual: travelAllowance,
          pension_perc: pensionPerc / 100,
          num_dependants: dependants,
        }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Backend error ${response.status}: ${text}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (e) {
      console.error(e);
      alert(
        "Calculation failed. Ensure the Flask backend is running (http://localhost:8000) and CORS is enabled."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen py-16 bg-[#f8fafc] dark:bg-gray-950 transition-colors duration-300 relative">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header Section */}
        <header className="mb-10 text-center md:text-left">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Tax <span className="text-emerald-600">Calculator</span>
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">
            Get an instant breakdown of your take-home pay, including PAYE, UIF,
            and pension contributions based on South African tax law.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Inputs Panel */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-2 mb-6 text-gray-800 dark:text-gray-200 font-semibold text-lg">
                <Briefcase className="text-emerald-500" size={20} />
                <h3>Income Details</h3>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Annual CTC */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    Annual CTC
                    <Info size={14} className="text-gray-400" />
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                      R
                    </span>
                    <input
                      type="number"
                      placeholder="500 000"
                      className={`w-full pl-8 pr-4 py-3 rounded-xl border-2 transition-all dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none ${
                        ctcError
                          ? "border-red-500 dark:border-red-500"
                          : "border-gray-200 dark:border-gray-700"
                      }`}
                      value={ctcAnnual || ""}
                      onChange={(e) => {
                        setCtcAnnual(Number(e.target.value));
                        if (ctcError) setCtcError("");
                      }}
                    />
                  </div>
                  {ctcError && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <AlertCircle size={16} />
                      <span>{ctcError}</span>
                    </div>
                  )}
                </div>

                {/* Travel Allowance */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    Travel Allowance
                    <Car size={14} className="text-gray-400" />
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                      R
                    </span>
                    <input
                      type="number"
                      placeholder="0"
                      className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                      value={travelAllowance || ""}
                      onChange={(e) =>
                        setTravelAllowance(Number(e.target.value))
                      }
                    />
                  </div>
                </div>

                {/* Pension Range */}
                <div className="md:col-span-2 space-y-4 pt-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <PiggyBank size={18} className="text-emerald-500" />
                      Pension Contribution
                    </label>
                    <span className="text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded text-sm">
                      {pensionPerc.toFixed(1)}%
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={30}
                    step={0.5}
                    value={pensionPerc}
                    onChange={(e) => setPensionPerc(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>

                {/* Dependants */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Users size={18} className="text-emerald-500" />
                    Medical Aid Dependants
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                    value={dependants}
                    onChange={(e) =>
                      setDependants(Math.max(0, Number(e.target.value)))
                    }
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <button
                  onClick={calculate}
                  disabled={loading}
                  className="flex-1 min-w-[160px] inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-200 dark:shadow-none hover:bg-emerald-700 active:scale-[0.98] transition-all disabled:opacity-70"
                >
                  {loading ? (
                    <RefreshCw className="animate-spin" size={18} />
                  ) : (
                    <Play size={18} fill="currentColor" />
                  )}
                  {loading ? "Calculating..." : "Calculate Take-Home"}
                </button>

                <button
                  onClick={() => {
                    setCtcAnnual(0);
                    setTravelAllowance(0);
                    setResult(null);
                    setDependants(0);
                    setPensionPerc(0.0);
                    setCtcError("");
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-gray-100 dark:border-gray-800 px-6 py-3.5 text-sm font-bold text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all"
                >
                  <RefreshCw size={18} />
                  Reset
                </button>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <aside className="lg:col-span-5">
            <div className="sticky top-8 bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-xl border border-gray-200 dark:border-gray-800">
              <div className="bg-emerald-600 p-8 text-white">
                <div className="flex justify-between items-start mb-4">
                  <p className="text-emerald-100 text-sm font-medium uppercase tracking-wider">
                    Estimated Monthly Net
                  </p>
                  <Wallet className="opacity-50" size={24} />
                </div>
                <h2 className="text-4xl font-black">
                  {formatCurrency(result?.monthly_net_pay)}
                </h2>
              </div>

              <div className="p-8 space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                  Breakdown
                </h4>

                {[
                  {
                    label: "Gross Salary",
                    val: result?.monthly_gross,
                    color: "text-gray-900 dark:text-white",
                  },
                  {
                    label: "PAYE (Tax)",
                    val: result?.monthly_paye,
                    color: "text-red-500",
                  },
                  {
                    label: "Pension Fund",
                    val: result?.monthly_pension,
                    color: "text-blue-500",
                  },
                  {
                    label: "UIF Contribution",
                    val: result?.monthly_uif,
                    color: "text-orange-500",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-800 last:border-0"
                  >
                    <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                      {item.label}
                    </span>
                    <span className={`text-sm font-bold ${item.color}`}>
                      {item.val ? formatCurrency(item.val) : "R 0.00"}
                    </span>
                  </div>
                ))}

                <button
                  onClick={async () => {
                    if (!result?.monthly_net_pay) return;
                    try {
                      await navigator.clipboard.writeText(
                        String(result.monthly_net_pay)
                      );
                      setCopied(true);
                      if (copyTimeoutRef.current)
                        clearTimeout(copyTimeoutRef.current);
                      copyTimeoutRef.current = window.setTimeout(
                        () => setCopied(false),
                        2000
                      );
                    } catch (err) {
                      console.error("Copy failed", err);
                    }
                  }}
                  disabled={!result}
                  className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-gray-900 dark:bg-white dark:text-gray-900 px-4 py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-30"
                >
                  {copied ? (
                    "Copied"
                  ) : (
                    <>
                      <Copy size={16} /> Copy to Clipboard
                    </>
                  )}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
