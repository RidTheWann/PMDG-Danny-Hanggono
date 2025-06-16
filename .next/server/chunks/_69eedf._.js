module.exports = {

"[project]/.next-internal/server/app/api/dashboard-stats/route/actions.js (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_dynamic__, p: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

__turbopack_export_value__({});

}.call(this) }),
"[project]/app/api/dashboard-stats/route.ts [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_dynamic__, p: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "GET": ()=>GET
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$web$2f$exports$2f$next$2d$response$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/web/exports/next-response.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
async function GET(request) {
    try {
        const today = new Date();
        const currentMonth = today.getMonth() + 1;
        const currentYear = today.getFullYear();
        // Get current date in YYYY-MM-DD format
        const todayStr = today.toISOString().split('T')[0];
        // Fetch data from Google Sheets
        const sheetsUrl = ("TURBOPACK compile-time value", "https://script.google.com/macros/s/AKfycbxnyacmLOW4Ts93_S56wLJj1i4eT76sm1SvJhXu8w-MAmyAtj9DPtoaY28mvD9OkmD2/exec");
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        // Get data for current month
        const response = await fetch(`${sheetsUrl}?action=get&month=${currentMonth}&year=${currentYear}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data from Google Sheets');
        }
        const data = await response.json();
        const sheetData = data.data || [];
        // Skip header row
        const records = sheetData.slice(1);
        // Calculate stats
        let totalPasienHariIni = 0;
        let totalPasienBulanIni = records.length;
        let antreanTerakhir = 0;
        let pendapatanBulanIni = 0;
        records.forEach((row)=>{
            if (row.length === 0) return;
            const tanggalKunjungan = row[0];
            const noAntrean = row[1];
            const biaya = parseFloat(row[5]) || 0;
            // Count patients for today
            if (tanggalKunjungan && tanggalKunjungan.includes(todayStr)) {
                totalPasienHariIni++;
                // Get latest queue number for today
                const currentAntrean = parseInt(noAntrean) || 0;
                if (currentAntrean > antreanTerakhir) {
                    antreanTerakhir = currentAntrean;
                }
            }
            // Sum up monthly revenue
            pendapatanBulanIni += biaya;
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$web$2f$exports$2f$next$2d$response$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].json({
            totalPasienHariIni,
            totalPasienBulanIni,
            antreanTerakhir,
            pendapatanBulanIni
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$web$2f$exports$2f$next$2d$response$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].json({
            error: 'Failed to fetch dashboard stats'
        }, {
            status: 500
        });
    }
}

})()),

};

//# sourceMappingURL=_69eedf._.js.map