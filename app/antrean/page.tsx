// Halaman penghubung/daftar fitur antrean
export default function AntreanIndexPage(): JSX.Element {
  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl text-center space-y-6 border border-blue-200 dark:border-gray-700">
      <h1 className="text-3xl font-extrabold mb-2 text-blue-800 dark:text-blue-200 drop-shadow">
        Portal Sistem Antrean
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-200 mb-6">
        Akses fitur antrean klinik secara cepat dan mudah
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a
          href="/antrean/cetak"
          className="block bg-blue-600 hover:bg-blue-700 text-white px-6 py-5 rounded-xl shadow-md font-semibold text-lg transition-all duration-200"
        >
          Cetak Nomor Antrean
        </a>
        <a
          href="/antrean/display"
          className="block bg-green-600 hover:bg-green-700 text-white px-6 py-5 rounded-xl shadow-md font-semibold text-lg transition-all duration-200"
        >
          Display Antrean
        </a>
        <a
          href="/antrean/kontrol"
          className="block bg-gray-700 hover:bg-gray-800 text-white px-6 py-5 rounded-xl shadow-md font-semibold text-lg transition-all duration-200"
        >
          Kontrol Antrean
        </a>
      </div>
    </div>
  );
}
