function generateSlipAndZip(transactionDetails) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(227, 24, 55); // HDFC Red
    doc.text("HDFC BANK", 105, 20, null, null, "center");
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Transaction E-Receipt", 105, 30, null, null, "center");
    
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);
    
    // Details
    doc.setFontSize(11);
    let yPos = 45;
    const lineHeight = 8;
    
    const fields = [
        { label: "Reference Number:", value: transactionDetails.refNo },
        { label: "Transaction Type:", value: transactionDetails.type },
        { label: "Date & Time:", value: transactionDetails.date },
        { label: "From Account:", value: transactionDetails.fromAccount },
        { label: "To Account / Mobile:", value: transactionDetails.toAccount },
        { label: "Beneficiary Name:", value: transactionDetails.payeeName },
        { label: "Amount:", value: `INR ${transactionDetails.amount}` },
        { label: "Remarks:", value: transactionDetails.remarks },
        { label: "Status:", value: "SUCCESS" }
    ];
    
    fields.forEach(field => {
        doc.setFont("helvetica", "bold");
        doc.text(field.label, 25, yPos);
        doc.setFont("helvetica", "normal");
        doc.text(field.value, 80, yPos);
        yPos += lineHeight;
    });
    
    doc.line(20, yPos, 190, yPos);
    yPos += 10;
    
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    doc.text("This is a computer generated receipt and does not require a signature.", 105, yPos, null, null, "center");
    
    // Generate PDF Blob
    const pdfOutput = doc.output('blob');
    
    // Create ZIP
    const zip = new JSZip();
    zip.file(`HDFC_Receipt_${transactionDetails.refNo}.pdf`, pdfOutput);
    
    zip.generateAsync({ type: "blob" }).then(function(content) {
        saveAs(content, `HDFC_Transaction_${transactionDetails.refNo}.zip`);
    });
}
