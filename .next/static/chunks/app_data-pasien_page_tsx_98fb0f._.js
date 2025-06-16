(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_data-pasien_page_tsx_98fb0f._.js", {

"[project]/app/data-pasien/page.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_dynamic__, p: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>DataPasien
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__ArrowLeft$7d$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) {export default as ArrowLeft}");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__Search$7d$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) {export default as Search}");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__Edit$7d$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/pen-square.js [app-client] (ecmascript) {export default as Edit}");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__Trash2$7d$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/trash-2.js [app-client] (ecmascript) {export default as Trash2}");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__Plus$7d$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) {export default as Plus}");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__Calendar$7d$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) {export default as Calendar}");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__Download$7d$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) {export default as Download}");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__RefreshCw$7d$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) {export default as RefreshCw}");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
function DataPasien() {
    _s();
    const [patients, setPatients] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [filteredPatients, setFilteredPatients] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](true);
    const [searchTerm, setSearchTerm] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [selectedMonth, setSelectedMonth] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [selectedYear, setSelectedYear] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [editingPatient, setEditingPatient] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const [showEditModal, setShowEditModal] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [deleteConfirm, setDeleteConfirm] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        fetchPatients();
    }, [
        selectedMonth,
        selectedYear
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        filterPatients();
    }, [
        patients,
        searchTerm
    ]);
    const fetchPatients = async ()=>{
        setLoading(true);
        try {
            const currentDate = new Date();
            const month = selectedMonth || (currentDate.getMonth() + 1).toString();
            const year = selectedYear || currentDate.getFullYear().toString();
            const sheetsUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || ("TURBOPACK compile-time value", "https://script.google.com/macros/s/AKfycbxnyacmLOW4Ts93_S56wLJj1i4eT76sm1SvJhXu8w-MAmyAtj9DPtoaY28mvD9OkmD2/exec");
            const response = await fetch(`${sheetsUrl}?action=get&month=${month}&year=${year}`);
            if (response.ok) {
                const data = await response.json();
                if (data.result === 'success' && data.data) {
                    const headers = data.data[0] || [];
                    const rows = data.data.slice(1) || [];
                    const formattedPatients = rows.filter((row)=>row.length > 0 && row[0]).map((row)=>({
                            tanggal_kunjungan: row[0] || '',
                            no_antrean: parseInt(row[1]) || 0,
                            nama_pasien: row[2] || '',
                            no_rm: row[3] || '',
                            kelamin: row[4] || '',
                            jenis_pasien: row[5] || '',
                            obat: row[6] || '',
                            cabut_anak: row[7] || '',
                            cabut_dewasa: row[8] || '',
                            tambal_sementara: row[9] || '',
                            tambal_tetap: row[10] || '',
                            scaling: row[11] || '',
                            rujuk: row[12] || '',
                            lainnya: row[13] || ''
                        }));
                    setPatients(formattedPatients);
                }
            }
        } catch (error) {
            console.error('Error fetching patients:', error);
        } finally{
            setLoading(false);
        }
    };
    const filterPatients = ()=>{
        if (!searchTerm) {
            setFilteredPatients(patients);
            return;
        }
        const filtered = patients.filter((patient)=>patient.nama_pasien.toLowerCase().includes(searchTerm.toLowerCase()) || patient.no_rm.toLowerCase().includes(searchTerm.toLowerCase()) || patient.tanggal_kunjungan.includes(searchTerm));
        setFilteredPatients(filtered);
    };
    const handleEdit = (patient)=>{
        setEditingPatient(patient);
        setShowEditModal(true);
    };
    const handleDelete = async (patient)=>{
        if (!deleteConfirm) {
            setDeleteConfirm(patient);
            return;
        }
        try {
            const formData = new FormData();
            formData.append('action', 'delete');
            formData.append('tanggal_kunjungan', patient.tanggal_kunjungan);
            formData.append('nama_pasien', patient.nama_pasien);
            formData.append('no_rm', patient.no_rm);
            const sheetsUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || ("TURBOPACK compile-time value", "https://script.google.com/macros/s/AKfycbxnyacmLOW4Ts93_S56wLJj1i4eT76sm1SvJhXu8w-MAmyAtj9DPtoaY28mvD9OkmD2/exec");
            const response = await fetch(sheetsUrl, {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.result === 'success') {
                await fetchPatients();
                setDeleteConfirm(null);
            }
        } catch (error) {
            console.error('Error deleting patient:', error);
        }
    };
    const handleUpdatePatient = async (updatedPatient)=>{
        try {
            const formData = new FormData();
            formData.append('action', 'edit');
            // Original identifiers
            formData.append('Tanggal Kunjungan_asli', editingPatient?.tanggal_kunjungan || '');
            formData.append('Nama Pasien_asli', editingPatient?.nama_pasien || '');
            formData.append('No.RM_asli', editingPatient?.no_rm || '');
            // Updated data
            formData.append('Tanggal Kunjungan', updatedPatient.tanggal_kunjungan);
            formData.append('Nama Pasien', updatedPatient.nama_pasien);
            formData.append('No.RM', updatedPatient.no_rm);
            formData.append('Kelamin', updatedPatient.kelamin);
            formData.append('Jenis Pasien', updatedPatient.jenis_pasien);
            formData.append('Obat', updatedPatient.obat);
            formData.append('Cabut Anak', updatedPatient.cabut_anak);
            formData.append('Cabut Dewasa', updatedPatient.cabut_dewasa);
            formData.append('Tambal Sementara', updatedPatient.tambal_sementara);
            formData.append('Tambal Tetap', updatedPatient.tambal_tetap);
            formData.append('Scaling', updatedPatient.scaling);
            formData.append('Rujuk', updatedPatient.rujuk);
            formData.append('Lainnya', updatedPatient.lainnya);
            const sheetsUrl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || ("TURBOPACK compile-time value", "https://script.google.com/macros/s/AKfycbxnyacmLOW4Ts93_S56wLJj1i4eT76sm1SvJhXu8w-MAmyAtj9DPtoaY28mvD9OkmD2/exec");
            const response = await fetch(sheetsUrl, {
                method: 'POST',
                body: formData
            });
            const result = await response.json();
            if (result.result === 'success') {
                await fetchPatients();
                setShowEditModal(false);
                setEditingPatient(null);
            }
        } catch (error) {
            console.error('Error updating patient:', error);
        }
    };
    const formatDate = (dateString)=>{
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('id-ID', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } catch  {
            return dateString;
        }
    };
    const getTreatmentSummary = (patient)=>{
        const treatments = [];
        if (patient.obat === 'Ya') treatments.push('Obat');
        if (patient.cabut_anak === 'Ya') treatments.push('Cabut Anak');
        if (patient.cabut_dewasa === 'Ya') treatments.push('Cabut Dewasa');
        if (patient.tambal_sementara === 'Ya') treatments.push('Tambal Sementara');
        if (patient.tambal_tetap === 'Ya') treatments.push('Tambal Tetap');
        if (patient.scaling === 'Ya') treatments.push('Scaling');
        if (patient.rujuk === 'Ya') treatments.push('Rujuk');
        if (patient.lainnya) treatments.push(patient.lainnya);
        return treatments.length > 0 ? treatments.join(', ') : 'Tidak ada';
    };
    if (loading) {
        return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
            className: "min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100",
            children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                className: "text-center",
                children: [
                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                        className: "animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"
                    }, void 0, false, {
                        fileName: "<[project]/app/data-pasien/page.tsx>",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("p", {
                        className: "text-gray-600",
                        children: "Memuat data pasien..."
                    }, void 0, false, {
                        fileName: "<[project]/app/data-pasien/page.tsx>",
                        lineNumber: 214,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "<[project]/app/data-pasien/page.tsx>",
                lineNumber: 212,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "<[project]/app/data-pasien/page.tsx>",
            lineNumber: 211,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
        className: "min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50",
        children: [
            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("header", {
                className: "bg-white shadow-soft border-b border-gray-200",
                children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                        className: "flex items-center justify-between h-16",
                        children: [
                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                className: "flex items-center space-x-4",
                                children: [
                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/",
                                        className: "flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors",
                                        children: [
                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__ArrowLeft$7d$__["ArrowLeft"], {
                                                className: "w-5 h-5"
                                            }, void 0, false, {
                                                fileName: "<[project]/app/data-pasien/page.tsx>",
                                                lineNumber: 231,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("span", {
                                                children: "Kembali"
                                            }, void 0, false, {
                                                fileName: "<[project]/app/data-pasien/page.tsx>",
                                                lineNumber: 232,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "<[project]/app/data-pasien/page.tsx>",
                                        lineNumber: 227,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                        className: "h-6 w-px bg-gray-300"
                                    }, void 0, false, {
                                        fileName: "<[project]/app/data-pasien/page.tsx>",
                                        lineNumber: 234,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                        children: [
                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("h1", {
                                                className: "text-xl font-bold text-gray-900",
                                                children: "Data Pasien"
                                            }, void 0, false, {
                                                fileName: "<[project]/app/data-pasien/page.tsx>",
                                                lineNumber: 236,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("p", {
                                                className: "text-sm text-gray-500",
                                                children: "Kelola dan lihat data pasien"
                                            }, void 0, false, {
                                                fileName: "<[project]/app/data-pasien/page.tsx>",
                                                lineNumber: 237,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "<[project]/app/data-pasien/page.tsx>",
                                        lineNumber: 235,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "<[project]/app/data-pasien/page.tsx>",
                                lineNumber: 226,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                href: "/tambah-pasien",
                                className: "flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors btn-hover",
                                children: [
                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__Plus$7d$__["Plus"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "<[project]/app/data-pasien/page.tsx>",
                                        lineNumber: 244,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("span", {
                                        children: "Tambah Pasien"
                                    }, void 0, false, {
                                        fileName: "<[project]/app/data-pasien/page.tsx>",
                                        lineNumber: 245,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "<[project]/app/data-pasien/page.tsx>",
                                lineNumber: 240,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "<[project]/app/data-pasien/page.tsx>",
                        lineNumber: 225,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "<[project]/app/data-pasien/page.tsx>",
                    lineNumber: 224,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "<[project]/app/data-pasien/page.tsx>",
                lineNumber: 223,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
                children: [
                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                        className: "bg-white rounded-xl shadow-soft border border-gray-100 p-6 mb-6",
                        children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                            className: "flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0",
                            children: [
                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                    className: "flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4",
                                    children: [
                                        /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                            className: "relative",
                                            children: [
                                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__Search$7d$__["Search"], {
                                                    className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                                    lineNumber: 257,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("input", {
                                                    type: "text",
                                                    placeholder: "Cari nama, no. RM, atau tanggal...",
                                                    value: searchTerm,
                                                    onChange: (e)=>setSearchTerm(e.target.value),
                                                    className: "pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus transition-all w-full sm:w-80"
                                                }, void 0, false, {
                                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                                    lineNumber: 258,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "<[project]/app/data-pasien/page.tsx>",
                                            lineNumber: 256,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                            className: "flex space-x-3",
                                            children: [
                                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("select", {
                                                    value: selectedMonth,
                                                    onChange: (e)=>setSelectedMonth(e.target.value),
                                                    className: "px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus transition-all",
                                                    children: [
                                                        /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("option", {
                                                            value: "",
                                                            children: "Bulan"
                                                        }, void 0, false, {
                                                            fileName: "<[project]/app/data-pasien/page.tsx>",
                                                            lineNumber: 273,
                                                            columnNumber: 19
                                                        }, this),
                                                        Array.from({
                                                            length: 12
                                                        }, (_, i)=>/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("option", {
                                                                value: i + 1,
                                                                children: new Date(0, i).toLocaleDateString('id-ID', {
                                                                    month: 'long'
                                                                })
                                                            }, i + 1, false, {
                                                                fileName: "<[project]/app/data-pasien/page.tsx>",
                                                                lineNumber: 275,
                                                                columnNumber: 21
                                                            }, this))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                                    lineNumber: 268,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("select", {
                                                    value: selectedYear,
                                                    onChange: (e)=>setSelectedYear(e.target.value),
                                                    className: "px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus transition-all",
                                                    children: [
                                                        /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("option", {
                                                            value: "",
                                                            children: "Tahun"
                                                        }, void 0, false, {
                                                            fileName: "<[project]/app/data-pasien/page.tsx>",
                                                            lineNumber: 286,
                                                            columnNumber: 19
                                                        }, this),
                                                        Array.from({
                                                            length: 5
                                                        }, (_, i)=>{
                                                            const year = new Date().getFullYear() - 2 + i;
                                                            return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("option", {
                                                                value: year,
                                                                children: year
                                                            }, year, false, {
                                                                fileName: "<[project]/app/data-pasien/page.tsx>",
                                                                lineNumber: 290,
                                                                columnNumber: 23
                                                            }, this);
                                                        })
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                                    lineNumber: 281,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "<[project]/app/data-pasien/page.tsx>",
                                            lineNumber: 267,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                    lineNumber: 255,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                    className: "flex items-center space-x-3",
                                    children: [
                                        /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("button", {
                                            onClick: fetchPatients,
                                            className: "flex items-center space-x-2 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors",
                                            children: [
                                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__RefreshCw$7d$__["RefreshCw"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                                    lineNumber: 304,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("span", {
                                                    children: "Refresh"
                                                }, void 0, false, {
                                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                                    lineNumber: 305,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "<[project]/app/data-pasien/page.tsx>",
                                            lineNumber: 300,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("button", {
                                            className: "flex items-center space-x-2 px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors",
                                            children: [
                                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__Download$7d$__["Download"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                                    lineNumber: 308,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("span", {
                                                    children: "Export"
                                                }, void 0, false, {
                                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                                    lineNumber: 309,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "<[project]/app/data-pasien/page.tsx>",
                                            lineNumber: 307,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                    lineNumber: 299,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "<[project]/app/data-pasien/page.tsx>",
                            lineNumber: 254,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "<[project]/app/data-pasien/page.tsx>",
                        lineNumber: 253,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                        className: "bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden",
                        children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                            className: "overflow-x-auto",
                            children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("table", {
                                className: "w-full table-auto",
                                children: [
                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("thead", {
                                        className: "bg-gray-50",
                                        children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("tr", {
                                            children: [
                                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("th", {
                                                    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                    children: "Tanggal"
                                                }, void 0, false, {
                                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                                    lineNumber: 321,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("th", {
                                                    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                    children: "Antrean"
                                                }, void 0, false, {
                                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                                    lineNumber: 324,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("th", {
                                                    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                    children: "Nama Pasien"
                                                }, void 0, false, {
                                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                                    lineNumber: 327,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("th", {
                                                    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                    children: "No. RM"
                                                }, void 0, false, {
                                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                                    lineNumber: 330,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("th", {
                                                    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                    children: "Kelamin"
                                                }, void 0, false, {
                                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                                    lineNumber: 333,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("th", {
                                                    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                    children: "Jenis Pasien"
                                                }, void 0, false, {
                                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                                    lineNumber: 336,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("th", {
                                                    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                    children: "Tindakan"
                                                }, void 0, false, {
                                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                                    lineNumber: 339,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("th", {
                                                    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",
                                                    children: "Aksi"
                                                }, void 0, false, {
                                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                                    lineNumber: 342,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "<[project]/app/data-pasien/page.tsx>",
                                            lineNumber: 320,
                                            columnNumber: 17
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "<[project]/app/data-pasien/page.tsx>",
                                        lineNumber: 319,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("tbody", {
                                        className: "bg-white divide-y divide-gray-200",
                                        children: filteredPatients.length === 0 ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("tr", {
                                            children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("td", {
                                                colSpan: 7,
                                                className: "px-6 py-12 text-center text-gray-500",
                                                children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                                    className: "flex flex-col items-center",
                                                    children: [
                                                        /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__Calendar$7d$__["Calendar"], {
                                                            className: "w-12 h-12 text-gray-300 mb-4"
                                                        }, void 0, false, {
                                                            fileName: "<[project]/app/data-pasien/page.tsx>",
                                                            lineNumber: 352,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("p", {
                                                            className: "text-lg font-medium",
                                                            children: "Tidak ada data pasien"
                                                        }, void 0, false, {
                                                            fileName: "<[project]/app/data-pasien/page.tsx>",
                                                            lineNumber: 353,
                                                            columnNumber: 25
                                                        }, this),
                                                        /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("p", {
                                                            className: "text-sm",
                                                            children: "Belum ada pasien yang terdaftar untuk periode ini"
                                                        }, void 0, false, {
                                                            fileName: "<[project]/app/data-pasien/page.tsx>",
                                                            lineNumber: 354,
                                                            columnNumber: 25
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                                    lineNumber: 351,
                                                    columnNumber: 23
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "<[project]/app/data-pasien/page.tsx>",
                                                lineNumber: 350,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "<[project]/app/data-pasien/page.tsx>",
                                            lineNumber: 349,
                                            columnNumber: 19
                                        }, this) : filteredPatients.map((patient, index)=>/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("tr", {
                                                className: "hover:bg-gray-50 transition-colors",
                                                children: [
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("td", {
                                                        className: "px-6 py-4 whitespace-nowrap text-sm text-gray-900",
                                                        children: formatDate(patient.tanggal_kunjungan)
                                                    }, void 0, false, {
                                                        fileName: "<[project]/app/data-pasien/page.tsx>",
                                                        lineNumber: 361,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("td", {
                                                        className: "px-6 py-4 whitespace-nowrap",
                                                        children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("span", {
                                                            className: "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800",
                                                            children: [
                                                                "#",
                                                                patient.no_antrean
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "<[project]/app/data-pasien/page.tsx>",
                                                            lineNumber: 365,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "<[project]/app/data-pasien/page.tsx>",
                                                        lineNumber: 364,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("td", {
                                                        className: "px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900",
                                                        children: patient.nama_pasien
                                                    }, void 0, false, {
                                                        fileName: "<[project]/app/data-pasien/page.tsx>",
                                                        lineNumber: 369,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("td", {
                                                        className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                                        children: patient.no_rm || '-'
                                                    }, void 0, false, {
                                                        fileName: "<[project]/app/data-pasien/page.tsx>",
                                                        lineNumber: 372,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("td", {
                                                        className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                                        children: patient.kelamin
                                                    }, void 0, false, {
                                                        fileName: "<[project]/app/data-pasien/page.tsx>",
                                                        lineNumber: 375,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("td", {
                                                        className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                                        children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("span", {
                                                            className: `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${patient.jenis_pasien === 'BPJS' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`,
                                                            children: patient.jenis_pasien || '-'
                                                        }, void 0, false, {
                                                            fileName: "<[project]/app/data-pasien/page.tsx>",
                                                            lineNumber: 379,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "<[project]/app/data-pasien/page.tsx>",
                                                        lineNumber: 378,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("td", {
                                                        className: "px-6 py-4 text-sm text-gray-500 max-w-xs",
                                                        children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                                            className: "truncate",
                                                            title: getTreatmentSummary(patient),
                                                            children: getTreatmentSummary(patient)
                                                        }, void 0, false, {
                                                            fileName: "<[project]/app/data-pasien/page.tsx>",
                                                            lineNumber: 388,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "<[project]/app/data-pasien/page.tsx>",
                                                        lineNumber: 387,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("td", {
                                                        className: "px-6 py-4 whitespace-nowrap text-sm text-gray-500",
                                                        children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                                            className: "flex items-center space-x-2",
                                                            children: [
                                                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("button", {
                                                                    onClick: ()=>handleEdit(patient),
                                                                    className: "p-1 text-blue-600 hover:text-blue-800 transition-colors",
                                                                    title: "Edit",
                                                                    children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pen$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__Edit$7d$__["Edit"], {
                                                                        className: "w-4 h-4"
                                                                    }, void 0, false, {
                                                                        fileName: "<[project]/app/data-pasien/page.tsx>",
                                                                        lineNumber: 399,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                                                    lineNumber: 394,
                                                                    columnNumber: 27
                                                                }, this),
                                                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("button", {
                                                                    onClick: ()=>handleDelete(patient),
                                                                    className: "p-1 text-red-600 hover:text-red-800 transition-colors",
                                                                    title: "Hapus",
                                                                    children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trash$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__Trash2$7d$__["Trash2"], {
                                                                        className: "w-4 h-4"
                                                                    }, void 0, false, {
                                                                        fileName: "<[project]/app/data-pasien/page.tsx>",
                                                                        lineNumber: 406,
                                                                        columnNumber: 29
                                                                    }, this)
                                                                }, void 0, false, {
                                                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                                                    lineNumber: 401,
                                                                    columnNumber: 27
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "<[project]/app/data-pasien/page.tsx>",
                                                            lineNumber: 393,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "<[project]/app/data-pasien/page.tsx>",
                                                        lineNumber: 392,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "<[project]/app/data-pasien/page.tsx>",
                                                lineNumber: 360,
                                                columnNumber: 21
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "<[project]/app/data-pasien/page.tsx>",
                                        lineNumber: 347,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "<[project]/app/data-pasien/page.tsx>",
                                lineNumber: 318,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "<[project]/app/data-pasien/page.tsx>",
                            lineNumber: 317,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "<[project]/app/data-pasien/page.tsx>",
                        lineNumber: 316,
                        columnNumber: 9
                    }, this),
                    filteredPatients.length > 0 && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                        className: "mt-6 flex items-center justify-between",
                        children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("p", {
                            className: "text-sm text-gray-700",
                            children: [
                                "Menampilkan ",
                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("span", {
                                    className: "font-medium",
                                    children: filteredPatients.length
                                }, void 0, false, {
                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                    lineNumber: 422,
                                    columnNumber: 27
                                }, this),
                                " pasien"
                            ]
                        }, void 0, true, {
                            fileName: "<[project]/app/data-pasien/page.tsx>",
                            lineNumber: 421,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "<[project]/app/data-pasien/page.tsx>",
                        lineNumber: 420,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "<[project]/app/data-pasien/page.tsx>",
                lineNumber: 251,
                columnNumber: 7
            }, this),
            deleteConfirm && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                className: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
                children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                    className: "bg-white rounded-lg p-6 max-w-md w-full mx-4",
                    children: [
                        /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("h3", {
                            className: "text-lg font-medium text-gray-900 mb-4",
                            children: "Konfirmasi Hapus"
                        }, void 0, false, {
                            fileName: "<[project]/app/data-pasien/page.tsx>",
                            lineNumber: 432,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("p", {
                            className: "text-sm text-gray-600 mb-6",
                            children: [
                                "Apakah Anda yakin ingin menghapus data pasien ",
                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("strong", {
                                    children: deleteConfirm.nama_pasien
                                }, void 0, false, {
                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                    lineNumber: 434,
                                    columnNumber: 61
                                }, this),
                                "? Tindakan ini tidak dapat dibatalkan."
                            ]
                        }, void 0, true, {
                            fileName: "<[project]/app/data-pasien/page.tsx>",
                            lineNumber: 433,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                            className: "flex justify-end space-x-3",
                            children: [
                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("button", {
                                    onClick: ()=>setDeleteConfirm(null),
                                    className: "px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors",
                                    children: "Batal"
                                }, void 0, false, {
                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                    lineNumber: 438,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("button", {
                                    onClick: ()=>handleDelete(deleteConfirm),
                                    className: "px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors",
                                    children: "Hapus"
                                }, void 0, false, {
                                    fileName: "<[project]/app/data-pasien/page.tsx>",
                                    lineNumber: 444,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "<[project]/app/data-pasien/page.tsx>",
                            lineNumber: 437,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "<[project]/app/data-pasien/page.tsx>",
                    lineNumber: 431,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "<[project]/app/data-pasien/page.tsx>",
                lineNumber: 430,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "<[project]/app/data-pasien/page.tsx>",
        lineNumber: 221,
        columnNumber: 5
    }, this);
}
_s(DataPasien, "sQCET8MRQxRIABv3E8hHAdZRi0o=");
_c = DataPasien;
var _c;
__turbopack_refresh__.register(_c, "DataPasien");

})()),
}]);

//# sourceMappingURL=app_data-pasien_page_tsx_98fb0f._.js.map