import type { UploadHubProps } from '@/../product/sections/card-upload/types'

export function UploadHub({
  onUploadPhoto,
  onAddManually
}: UploadHubProps) {
  return (
    <div className="relative min-h-screen">
      {/* Full-width background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-violet-50 via-sky-50 to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />

      <div className="py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            Add Cards
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Upload a notebook photo or add cards manually
          </p>
        </div>

        {/* Main actions */}
        <div className="space-y-4">
          {/* Upload photo - primary action */}
          <button
            onClick={onUploadPhoto}
            className="w-full bg-gradient-to-r from-violet-500 to-violet-600 hover:from-violet-600 hover:to-violet-700 text-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Upload Notebook Photo</h2>
              <p className="text-white/80 text-sm">
                Scan your handwritten notes with AI-powered OCR
              </p>
            </div>
          </button>

          {/* Add manually - secondary action */}
          <button
            onClick={onAddManually}
            className="w-full bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-2xl p-6 shadow-sm border-2 border-slate-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-600 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-violet-100 to-sky-100 dark:from-violet-900/30 dark:to-sky-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  Add Card Manually
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Type Spanish and English text yourself
                </p>
              </div>
              <svg className="w-5 h-5 text-slate-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        </div>

        {/* How it works */}
        <div className="mt-12 bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-violet-600 dark:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How Photo Upload Works
          </h3>
          <ol className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center text-xs font-semibold">1</span>
              <span>Take a photo of your notebook page or upload an existing image</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center text-xs font-semibold">2</span>
              <span>AI extracts Spanish-English pairs from your handwriting</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center text-xs font-semibold">3</span>
              <span>Review and edit the extracted flashcards</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center text-xs font-semibold">4</span>
              <span>Accept the cards you want and save to your chosen deck</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}
