module.exports = {

"[project]/.next-internal/server/app/api/reports/route/actions.js (ecmascript)": (function({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_dynamic__, p: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__, m: module, e: exports, t: require }) { !function() {

__turbopack_export_value__({});

}.call(this) }),
"[project]/app/api/reports/route.ts [app-rsc] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_dynamic__, p: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, x: __turbopack_external_require__, y: __turbopack_external_import__ }) => (() => {
"use strict";

__turbopack_esm__({
    "GET": ()=>GET
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$web$2f$exports$2f$next$2d$response$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/server/web/exports/next-response.js [app-rsc] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const month = searchParams.get('month') || (new Date().getMonth() + 1).toString();
        const year = searchParams.get('year') || new Date().getFullYear().toString();
        // Fetch data from Google Sheets
        const sheetsUrl = ("TURBOPACK compile-time value", "https://script.google.com/macros/s/AKfycbxnyacmLOW4Ts93_S56wLJj1i4eT76sm1SvJhXu8w-MAmyAtj9DPtoaY28mvD9OkmD2/exec");
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        const response = await fetch(`${sheetsUrl}?action=get&month=${month}&year=${year}`, {
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
        // Process data for reports
        const dailyData = {};
        const treatmentCounts = {};
        let totalPatients = 0;
        let bpjsPatients = 0;
        let umumPatients = 0;
        records.forEach((row)=>{
            if (row.length === 0) return;
            const tanggalKunjungan = row[0];
            const jenisPasien = row[5] || '';
            // Extract treatments
            const treatments = {
                obat: row[6] === 'Ya',
                cabut_anak: row[7] === 'Ya',
                cabut_dewasa: row[8] === 'Ya',
                tambal_sementara: row[9] === 'Ya',
                tambal_tetap: row[10] === 'Ya',
                scaling: row[11] === 'Ya',
                rujuk: row[12] === 'Ya',
                lainnya: row[13] && row[13].trim() !== ''
            };
            // Count treatments
            Object.entries(treatments).forEach(([treatment, isTrue])=>{
                if (isTrue) {
                    treatmentCounts[treatment] = (treatmentCounts[treatment] || 0) + 1;
                }
            });
            // Group by date
            const dateKey = tanggalKunjungan.split('T')[0]; // Get YYYY-MM-DD format
            if (!dailyData[dateKey]) {
                dailyData[dateKey] = {
                    date: dateKey,
                    totalPatients: 0,
                    bpjsPatients: 0,
                    umumPatients: 0,
                    treatments: {}
                };
            }
            dailyData[dateKey].totalPatients += 1;
            if (jenisPasien === 'BPJS') {
                dailyData[dateKey].bpjsPatients += 1;
                bpjsPatients += 1;
            } else if (jenisPasien === 'UMUM') {
                dailyData[dateKey].umumPatients += 1;
                umumPatients += 1;
            }
            // Count daily treatments
            Object.entries(treatments).forEach(([treatment, isTrue])=>{
                if (isTrue) {
                    dailyData[dateKey].treatments[treatment] = (dailyData[dateKey].treatments[treatment] || 0) + 1;
                }
            });
            totalPatients += 1;
        });
        // Find most popular treatment
        const mostPopularTreatment = Object.entries(treatmentCounts).sort(([, a], [, b])=>b - a)[0]?.[0] || 'Tidak ada';
        // Convert to array and sort by date
        const dailyDataArray = Object.values(dailyData).sort((a, b)=>new Date(a.date).getTime() - new Date(b.date).getTime());
        // Calculate average per day
        const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
        const averagePerDay = totalPatients / daysInMonth;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$web$2f$exports$2f$next$2d$response$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].json({
            totalPatients,
            bpjsPatients,
            umumPatients,
            averagePerDay,
            mostPopularTreatment: getTreatmentLabel(mostPopularTreatment),
            dailyData: dailyDataArray
        });
    } catch (error) {
        console.error('Error generating report:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$web$2f$exports$2f$next$2d$response$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].json({
            error: 'Failed to generate report'
        }, {
            status: 500
        });
    }
}
function getTreatmentLabel(treatment) {
    const labels = {
        obat: 'Obat',
        cabut_anak: 'Cabut Anak',
        cabut_dewasa: 'Cabut Dewasa',
        tambal_sementara: 'Tambal Sementara',
        tambal_tetap: 'Tambal Tetap',
        scaling: 'Scaling',
        rujuk: 'Rujuk',
        lainnya: 'Lainnya'
    };
    return labels[treatment] || treatment;
}

})()),

};

//# sourceMappingURL=_66e60a._.js.map