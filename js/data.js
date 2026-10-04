const HDFC_MOCK_DATA = {
    account: {
        name: "SKYLINE BUILDERS & DEVELOPERS",
        custId: "62393867",
        accountNo: "59209609819999 CAGEN",
        accountType: "BIZ PRO PLUS ACCOUNT(1482)",
        balanceNum: 9999999,
        balanceStr: "99,99,999",
        status: "Regular",
        openDate: "30/09/2020",
        branch: "BENACHITY",
        address: "NACHAN ROAD, OLD DUTTA AUTOMOBILE BUILDING, BENACHITY",
        city: "DURGAPUR 713213",
        state: "WEST BENGAL",
        email: "ROYDIBYENDU841@GMAIL.COM",
        ifsc: "HDFC0001275",
        micr: "713240203",
        branchCode: "1275",
        odLimit: "0.00",
        currency: "INR",
        phone: "18002600/18001600"
    },
    transactions: [
        { date: "04-Oct-2026", naration: "NEFT-RETURN-HDFC0001234", ref: "N123456789", valueDate: "04-Oct-2026", debit: "", credit: "50000.00", balance: "9999999.00" },
        { date: "02-Oct-2026", naration: "IMPS-1234567-PAYMENT", ref: "I098765432", valueDate: "02-Oct-2026", debit: "15000.00", credit: "", balance: "9949999.00" },
        { date: "28-Sep-2026", naration: "RTGS-XYZ CORP-INV01", ref: "R112233445", valueDate: "28-Sep-2026", debit: "100000.00", credit: "", balance: "9964999.00" },
        { date: "25-Sep-2026", naration: "BY CASH DEP-BENACHITY", ref: "C554433", valueDate: "25-Sep-2026", debit: "", credit: "200000.00", balance: "10064999.00" }
    ]
};

// Global utility for downloading files
function downloadFile(filename, content, type) {
    const blob = new Blob([content], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
