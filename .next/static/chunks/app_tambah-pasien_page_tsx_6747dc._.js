(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/app_tambah-pasien_page_tsx_6747dc._.js", {

"[project]/app/tambah-pasien/page.tsx [app-client] (ecmascript)": (({ r: __turbopack_require__, f: __turbopack_require_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, l: __turbopack_load__, j: __turbopack_dynamic__, p: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, g: global, __dirname, k: __turbopack_refresh__ }) => (() => {
"use strict";

__turbopack_esm__({
    "default": ()=>TambahPasien
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__ArrowLeft$7d$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) {export default as ArrowLeft}");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__Save$7d$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) {export default as Save}");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__User$7d$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) {export default as User}");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__Stethoscope$7d$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/stethoscope.js [app-client] (ecmascript) {export default as Stethoscope}");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__AlertCircle$7d$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/alert-circle.js [app-client] (ecmascript) {export default as AlertCircle}");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"__TURBOPACK__ecmascript__hoisting__location__";
;
var _s = __turbopack_refresh__.signature();
'use client';
;
;
;
function TambahPasien() {
    _s();
    const [formData, setFormData] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        tanggal_kunjungan: new Date().toISOString().split('T')[0],
        nama_pasien: '',
        no_rm: '',
        kelamin: '',
        jenis_pasien: '',
        obat: false,
        cabut_anak: false,
        cabut_dewasa: false,
        tambal_sementara: false,
        tambal_tetap: false,
        scaling: false,
        rujuk: false,
        lainnya: ''
    });
    const [loading, setLoading] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [success, setSuccess] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const [error, setError] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]('');
    const [antreanNumber, setAntreanNumber] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](null);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            // Prepare form data for Google Sheets
            const submitData = new FormData();
            submitData.append('action', 'add');
            submitData.append('Tanggal Kunjungan', formData.tanggal_kunjungan);
            submitData.append('Nama Pasien', formData.nama_pasien);
            submitData.append('No.RM', formData.no_rm || '-');
            submitData.append('Kelamin', formData.kelamin);
            submitData.append('Jenis Pasien', formData.jenis_pasien);
            submitData.append('Obat', formData.obat ? 'Ya' : 'Tidak');
            submitData.append('Cabut Anak', formData.cabut_anak ? 'Ya' : 'Tidak');
            submitData.append('Cabut Dewasa', formData.cabut_dewasa ? 'Ya' : 'Tidak');
            submitData.append('Tambal Sementara', formData.tambal_sementara ? 'Ya' : 'Tidak');
            submitData.append('Tambal Tetap', formData.tambal_tetap ? 'Ya' : 'Tidak');
            submitData.append('Scaling', formData.scaling ? 'Ya' : 'Tidak');
            submitData.append('Rujuk', formData.rujuk ? 'Ya' : 'Tidak');
            submitData.append('Lainnya', formData.lainnya);
            const response = await fetch(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_GOOGLE_SHEETS_URL || '/api/sheets', {
                method: 'POST',
                body: submitData
            });
            const result = await response.json();
            if (result.result === 'success') {
                setSuccess(true);
                if (result.data?.antrean_number) {
                    setAntreanNumber(result.data.antrean_number);
                }
                // Reset form
                setFormData({
                    tanggal_kunjungan: new Date().toISOString().split('T')[0],
                    nama_pasien: '',
                    no_rm: '',
                    kelamin: '',
                    jenis_pasien: '',
                    obat: false,
                    cabut_anak: false,
                    cabut_dewasa: false,
                    tambal_sementara: false,
                    tambal_tetap: false,
                    scaling: false,
                    rujuk: false,
                    lainnya: ''
                });
            } else {
                setError(result.message || 'Terjadi kesalahan saat menyimpan data');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setError('Terjadi kesalahan jaringan. Silakan coba lagi.');
        } finally{
            setLoading(false);
        }
    };
    const handleInputChange = (e)=>{
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = e.target.checked;
            setFormData((prev)=>({
                    ...prev,
                    [name]: checked
                }));
        } else {
            setFormData((prev)=>({
                    ...prev,
                    [name]: value
                }));
        }
    };
    const treatmentOptions = [
        {
            key: 'obat',
            label: 'Obat'
        },
        {
            key: 'cabut_anak',
            label: 'Cabut Anak'
        },
        {
            key: 'cabut_dewasa',
            label: 'Cabut Dewasa'
        },
        {
            key: 'tambal_sementara',
            label: 'Tambal Sementara'
        },
        {
            key: 'tambal_tetap',
            label: 'Tambal Tetap'
        },
        {
            key: 'scaling',
            label: 'Scaling'
        },
        {
            key: 'rujuk',
            label: 'Rujuk'
        }
    ];
    return /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
        className: "min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50",
        children: [
            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("header", {
                className: "bg-white shadow-soft border-b border-gray-200",
                children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                    children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                        className: "flex items-center justify-between h-16",
                        children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                            className: "flex items-center space-x-4",
                            children: [
                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    href: "/",
                                    className: "flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors",
                                    children: [
                                        /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__ArrowLeft$7d$__["ArrowLeft"], {
                                            className: "w-5 h-5"
                                        }, void 0, false, {
                                            fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                            lineNumber: 142,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("span", {
                                            children: "Kembali"
                                        }, void 0, false, {
                                            fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                            lineNumber: 143,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                    lineNumber: 138,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                    className: "h-6 w-px bg-gray-300"
                                }, void 0, false, {
                                    fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                    lineNumber: 145,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                    children: [
                                        /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("h1", {
                                            className: "text-xl font-bold text-gray-900",
                                            children: "Tambah Pasien Baru"
                                        }, void 0, false, {
                                            fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                            lineNumber: 147,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("p", {
                                            className: "text-sm text-gray-500",
                                            children: "Daftarkan pasien dan kelola antrean"
                                        }, void 0, false, {
                                            fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                            lineNumber: 148,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                    lineNumber: 146,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "<[project]/app/tambah-pasien/page.tsx>",
                            lineNumber: 137,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                        lineNumber: 136,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "<[project]/app/tambah-pasien/page.tsx>",
                    lineNumber: 135,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8",
                children: [
                    success && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                        className: "mb-6 bg-green-50 border border-green-200 rounded-lg p-4 fade-in",
                        children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                    className: "flex-shrink-0",
                                    children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                        className: "w-8 h-8 bg-green-100 rounded-full flex items-center justify-center",
                                        children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("span", {
                                            className: "text-green-600 font-bold text-sm",
                                            children: "✓"
                                        }, void 0, false, {
                                            fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                            lineNumber: 162,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                        lineNumber: 161,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                    lineNumber: 160,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                    className: "ml-3",
                                    children: [
                                        /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("h3", {
                                            className: "text-sm font-medium text-green-800",
                                            children: "Pasien berhasil ditambahkan!"
                                        }, void 0, false, {
                                            fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                            lineNumber: 166,
                                            columnNumber: 17
                                        }, this),
                                        antreanNumber && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("p", {
                                            className: "text-sm text-green-700 mt-1",
                                            children: [
                                                "Nomor antrean: ",
                                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("span", {
                                                    className: "font-semibold",
                                                    children: antreanNumber
                                                }, void 0, false, {
                                                    fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                    lineNumber: 169,
                                                    columnNumber: 36
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                            lineNumber: 168,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                    lineNumber: 165,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "<[project]/app/tambah-pasien/page.tsx>",
                            lineNumber: 159,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                        lineNumber: 158,
                        columnNumber: 11
                    }, this),
                    error && /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                        className: "mb-6 bg-red-50 border border-red-200 rounded-lg p-4 fade-in",
                        children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$alert$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__AlertCircle$7d$__["AlertCircle"], {
                                    className: "w-5 h-5 text-red-500 mr-3"
                                }, void 0, false, {
                                    fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                    lineNumber: 181,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("p", {
                                    className: "text-sm text-red-700",
                                    children: error
                                }, void 0, false, {
                                    fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                    lineNumber: 182,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "<[project]/app/tambah-pasien/page.tsx>",
                            lineNumber: 180,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                        lineNumber: 179,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("form", {
                        onSubmit: handleSubmit,
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                className: "bg-white rounded-xl shadow-soft border border-gray-100 overflow-hidden",
                                children: [
                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                        className: "p-6 border-b border-gray-200",
                                        children: [
                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                                className: "flex items-center space-x-3 mb-4",
                                                children: [
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                                        className: "w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center",
                                                        children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__User$7d$__["User"], {
                                                            className: "w-4 h-4 text-blue-600"
                                                        }, void 0, false, {
                                                            fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                            lineNumber: 194,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                        lineNumber: 193,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("h2", {
                                                        className: "text-lg font-semibold text-gray-900",
                                                        children: "Informasi Pasien"
                                                    }, void 0, false, {
                                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                        lineNumber: 196,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                lineNumber: 192,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-6",
                                                children: [
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                                        children: [
                                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("label", {
                                                                htmlFor: "tanggal_kunjungan",
                                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                                children: "Tanggal Kunjungan *"
                                                            }, void 0, false, {
                                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                                lineNumber: 201,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("input", {
                                                                type: "date",
                                                                id: "tanggal_kunjungan",
                                                                name: "tanggal_kunjungan",
                                                                value: formData.tanggal_kunjungan,
                                                                onChange: handleInputChange,
                                                                required: true,
                                                                className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus transition-all"
                                                            }, void 0, false, {
                                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                                lineNumber: 204,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                        lineNumber: 200,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                                        children: [
                                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("label", {
                                                                htmlFor: "nama_pasien",
                                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                                children: "Nama Pasien *"
                                                            }, void 0, false, {
                                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                                lineNumber: 216,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("input", {
                                                                type: "text",
                                                                id: "nama_pasien",
                                                                name: "nama_pasien",
                                                                value: formData.nama_pasien,
                                                                onChange: handleInputChange,
                                                                required: true,
                                                                placeholder: "Masukkan nama lengkap pasien",
                                                                className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus transition-all"
                                                            }, void 0, false, {
                                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                                lineNumber: 219,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                        lineNumber: 215,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                                        children: [
                                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("label", {
                                                                htmlFor: "no_rm",
                                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                                children: "No. Rekam Medis"
                                                            }, void 0, false, {
                                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                                lineNumber: 232,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("input", {
                                                                type: "text",
                                                                id: "no_rm",
                                                                name: "no_rm",
                                                                value: formData.no_rm,
                                                                onChange: handleInputChange,
                                                                placeholder: "Opsional",
                                                                className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus transition-all"
                                                            }, void 0, false, {
                                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                                lineNumber: 235,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                        lineNumber: 231,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                                        children: [
                                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("label", {
                                                                htmlFor: "kelamin",
                                                                className: "block text-sm font-medium text-gray-700 mb-2",
                                                                children: "Jenis Kelamin *"
                                                            }, void 0, false, {
                                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                                lineNumber: 247,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("select", {
                                                                id: "kelamin",
                                                                name: "kelamin",
                                                                value: formData.kelamin,
                                                                onChange: handleInputChange,
                                                                required: true,
                                                                className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus transition-all",
                                                                children: [
                                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("option", {
                                                                        value: "",
                                                                        children: "Pilih jenis kelamin"
                                                                    }, void 0, false, {
                                                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                                        lineNumber: 258,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("option", {
                                                                        value: "Laki-laki",
                                                                        children: "Laki-laki"
                                                                    }, void 0, false, {
                                                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                                        lineNumber: 259,
                                                                        columnNumber: 21
                                                                    }, this),
                                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("option", {
                                                                        value: "Perempuan",
                                                                        children: "Perempuan"
                                                                    }, void 0, false, {
                                                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                                        lineNumber: 260,
                                                                        columnNumber: 21
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                                lineNumber: 250,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                        lineNumber: 246,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                lineNumber: 199,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                        lineNumber: 191,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                        className: "p-6 border-b border-gray-200",
                                        children: [
                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                                className: "flex items-center space-x-3 mb-4",
                                                children: [
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                                        className: "w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center",
                                                        children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$stethoscope$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__Stethoscope$7d$__["Stethoscope"], {
                                                            className: "w-4 h-4 text-green-600"
                                                        }, void 0, false, {
                                                            fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                            lineNumber: 270,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                        lineNumber: 269,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("h2", {
                                                        className: "text-lg font-semibold text-gray-900",
                                                        children: "Tindakan Medis"
                                                    }, void 0, false, {
                                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                        lineNumber: 272,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                lineNumber: 268,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                                className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6",
                                                children: treatmentOptions.map((option)=>/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("label", {
                                                        className: "flex items-center space-x-3 cursor-pointer",
                                                        children: [
                                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("input", {
                                                                type: "checkbox",
                                                                name: option.key,
                                                                checked: formData[option.key],
                                                                onChange: handleInputChange,
                                                                className: "w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                                            }, void 0, false, {
                                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                                lineNumber: 278,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("span", {
                                                                className: "text-sm text-gray-700",
                                                                children: option.label
                                                            }, void 0, false, {
                                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                                lineNumber: 285,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, option.key, true, {
                                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                        lineNumber: 277,
                                                        columnNumber: 19
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                lineNumber: 275,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                                children: [
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("label", {
                                                        htmlFor: "lainnya",
                                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                                        children: "Tindakan Lainnya"
                                                    }, void 0, false, {
                                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                        lineNumber: 291,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("textarea", {
                                                        id: "lainnya",
                                                        name: "lainnya",
                                                        value: formData.lainnya,
                                                        onChange: handleInputChange,
                                                        rows: 3,
                                                        placeholder: "Deskripsi tindakan lainnya (opsional)",
                                                        className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus transition-all resize-none"
                                                    }, void 0, false, {
                                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                        lineNumber: 294,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                lineNumber: 290,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                        lineNumber: 267,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                        className: "p-6",
                                        children: [
                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                                className: "flex items-center space-x-3 mb-4",
                                                children: [
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                                        className: "w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center",
                                                        children: /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__User$7d$__["User"], {
                                                            className: "w-4 h-4 text-orange-600"
                                                        }, void 0, false, {
                                                            fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                            lineNumber: 310,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                        lineNumber: 309,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("h2", {
                                                        className: "text-lg font-semibold text-gray-900",
                                                        children: "Jenis Pasien"
                                                    }, void 0, false, {
                                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                        lineNumber: 312,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                lineNumber: 308,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                                className: "max-w-md",
                                                children: [
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("label", {
                                                        htmlFor: "jenis_pasien",
                                                        className: "block text-sm font-medium text-gray-700 mb-2",
                                                        children: "Kategori Pasien *"
                                                    }, void 0, false, {
                                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                        lineNumber: 316,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("select", {
                                                        id: "jenis_pasien",
                                                        name: "jenis_pasien",
                                                        value: formData.jenis_pasien,
                                                        onChange: handleInputChange,
                                                        required: true,
                                                        className: "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-focus transition-all",
                                                        children: [
                                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("option", {
                                                                value: "",
                                                                children: "Pilih jenis pasien"
                                                            }, void 0, false, {
                                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                                lineNumber: 327,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("option", {
                                                                value: "BPJS",
                                                                children: "BPJS"
                                                            }, void 0, false, {
                                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                                lineNumber: 328,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("option", {
                                                                value: "UMUM",
                                                                children: "UMUM"
                                                            }, void 0, false, {
                                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                                lineNumber: 329,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                        lineNumber: 319,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                lineNumber: 315,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                        lineNumber: 307,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                className: "flex justify-end space-x-4",
                                children: [
                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        href: "/",
                                        className: "px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors",
                                        children: "Batal"
                                    }, void 0, false, {
                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                        lineNumber: 337,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("button", {
                                        type: "submit",
                                        disabled: loading,
                                        className: "px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed btn-hover transition-all flex items-center space-x-2",
                                        children: [
                                            loading ? /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("div", {
                                                className: "animate-spin rounded-full h-4 w-4 border-b-2 border-white"
                                            }, void 0, false, {
                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                lineNumber: 349,
                                                columnNumber: 17
                                            }, this) : /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$7b$export__default__as__Save$7d$__["Save"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                lineNumber: 351,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"]("span", {
                                                children: loading ? 'Menyimpan...' : 'Simpan Pasien'
                                            }, void 0, false, {
                                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                                lineNumber: 353,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                        lineNumber: 343,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                                lineNumber: 336,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "<[project]/app/tambah-pasien/page.tsx>",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "<[project]/app/tambah-pasien/page.tsx>",
                lineNumber: 155,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "<[project]/app/tambah-pasien/page.tsx>",
        lineNumber: 132,
        columnNumber: 5
    }, this);
}
_s(TambahPasien, "VFN6inW5MJyIUAeWn/Scgi9vfp0=");
_c = TambahPasien;
var _c;
__turbopack_refresh__.register(_c, "TambahPasien");

})()),
}]);

//# sourceMappingURL=app_tambah-pasien_page_tsx_6747dc._.js.map