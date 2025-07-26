// Halaman penghubung/daftar fitur antrean
export default function AntreanIndexPage(): JSX.Element {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow text-center space-y-4">
      <h1 className="text-2xl font-bold mb-4">Sistem Antrean</h1>
      <a href="/antrean/cetak" className="block bg-blue-600 text-white px-4 py-2 rounded">
        Cetak Nomor Antrean
      </a>
      <a href="/antrean/display" className="block bg-green-600 text-white px-4 py-2 rounded">
        Display Antrean
      </a>
      <a href="/antrean/kontrol" className="block bg-gray-700 text-white px-4 py-2 rounded">
        Kontrol Antrean
      </a>
    </div>
  );
}
