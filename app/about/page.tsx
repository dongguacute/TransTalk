'use client';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">關於我們</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <p className="text-lg text-gray-700 mb-4">
            TransTalk 是一個專為翻譯和語言學習設計的平台。
          </p>
          <p className="text-gray-600">
            我們致力於提供高品質的翻譯服務和語言學習工具，幫助用戶打破語言障礙。
          </p>
        </div>
      </div>
    </div>
  );
}