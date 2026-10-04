document.addEventListener('DOMContentLoaded', () => {
    // Populate header
    document.getElementById('stName').textContent = HDFC_MOCK_DATA.account.name;
    document.getElementById('stAccNo').textContent = HDFC_MOCK_DATA.account.accountNo;
    document.getElementById('stBranch').textContent = HDFC_MOCK_DATA.account.branch;
    document.getElementById('stBal').textContent = `₹${HDFC_MOCK_DATA.account.balanceStr}/-`;

    // Populate table
    const tbody = document.getElementById('statementBody');
    HDFC_MOCK_DATA.transactions.forEach(txn => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${txn.date}</td>
            <td>${txn.naration}</td>
            <td>${txn.ref}</td>
            <td>${txn.valueDate}</td>
            <td class="debit">${txn.debit}</td>
            <td class="credit">${txn.credit}</td>
            <td>${txn.balance}</td>
        `;
        tbody.appendChild(tr);
    });

    // PDF Download Logic
    document.getElementById('downloadPdfBtn').addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // --- DRAW HDFC LOGO ---
        const startX = 14;
        let startY = 15;
        
        doc.setFillColor(237, 35, 42);
        doc.rect(startX, startY, 18, 18, 'F');
        doc.setFillColor(255, 255, 255);
        doc.rect(startX+3.5, startY+3.5, 11, 11, 'F');
        doc.setFillColor(0, 75, 143);
        doc.rect(startX+6, startY+6, 6, 6, 'F');
        
        doc.setFillColor(0, 75, 143);
        doc.rect(startX+20, startY, 65, 18, 'F');
        
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.setTextColor(255, 255, 255);
        doc.text("HDFC BANK", startX + 22, startY + 13.5);

        // --- LEFT COLUMN (Customer Address) ---
        doc.setFontSize(9);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "normal");
        
        startY += 25;
        doc.rect(startX, startY, 90, 45, 'S'); // Box around address
        
        let leftY = startY + 6;
        doc.text(HDFC_MOCK_DATA.account.name, startX + 2, leftY); leftY += 5;
        doc.text("NACHAN ROAD", startX + 2, leftY); leftY += 5;
        doc.text("OLD DUTTA AUTOMOBILE BUILDING", startX + 2, leftY); leftY += 5;
        doc.text("BENACHITY", startX + 2, leftY); leftY += 5;
        doc.text("DURGAPUR 713213", startX + 2, leftY); leftY += 5;
        doc.text("WEST BENGAL INDIA", startX + 2, leftY); leftY += 8;
        doc.text("JOINT HOLDERS :", startX + 2, leftY);
        
        doc.line(startX, leftY + 3, startX + 90, leftY + 3);
        doc.text("Nomination : Registered", startX + 2, leftY + 7);

        // --- RIGHT COLUMN (Account Details) ---
        let rightX = 110;
        let rightY = 20;
        const colWidth = 25;
        
        const details = [
            ["Account Branch", ": " + HDFC_MOCK_DATA.account.branch],
            ["Address", ": NACHAN ROAD, OLD DUTTA"],
            ["", "  AUTOMOBILE BUILDING, BENACHITY"],
            ["City", ": " + HDFC_MOCK_DATA.account.city],
            ["State", ": " + HDFC_MOCK_DATA.account.state],
            ["Phone no.", ": " + HDFC_MOCK_DATA.account.phone],
            ["OD Limit", ": " + HDFC_MOCK_DATA.account.odLimit],
            ["Currency", ": " + HDFC_MOCK_DATA.account.currency],
            ["Email", ": " + HDFC_MOCK_DATA.account.email],
            ["Cust ID", ": " + HDFC_MOCK_DATA.account.custId],
            ["Account No", ": " + HDFC_MOCK_DATA.account.accountNo],
            ["A/C Open Date", ": " + HDFC_MOCK_DATA.account.openDate],
            ["Account Status", ": " + HDFC_MOCK_DATA.account.status],
            ["RTGS/NEFT IFSC", ": " + HDFC_MOCK_DATA.account.ifsc + "     MICR : " + HDFC_MOCK_DATA.account.micr],
            ["Branch Code", ": " + HDFC_MOCK_DATA.account.branchCode + "     Product Code : 1482"]
        ];

        doc.setFontSize(8);
        details.forEach(row => {
            if(row[0] !== "") {
                doc.text(row[0], rightX, rightY);
            }
            doc.text(row[1], rightX + colWidth, rightY);
            rightY += 4.5;
        });

        // --- TITLE ---
        startY += 55;
        doc.setFontSize(14);
        doc.text("Statement of account", 105, startY, null, null, "center");

        // --- DATE RANGE ---
        startY += 8;
        doc.setFontSize(9);
        doc.text("From : 01/09/2026", startX, startY);
        doc.text("To : 04/10/2026", startX + 45, startY);

        // --- TABLE ---
        doc.autoTable({
            startY: startY + 2,
            html: '#statementTable',
            theme: 'grid',
            headStyles: { fillColor: [230, 242, 245], textColor: [0,0,0], lineWidth: 0.1, lineColor: [0, 150, 150] }, 
            styles: { fontSize: 8, cellPadding: 2, lineWidth: 0.1, lineColor: [0, 150, 150] },
            alternateRowStyles: { fillColor: [245, 250, 250] },
            columnStyles: {
                4: { halign: 'right' },
                5: { halign: 'right' },
                6: { halign: 'right' }
            }
        });

        let finalY = doc.lastAutoTable.finalY + 10;
        
        // --- SUMMARY ---
        doc.setFont("helvetica", "bold");
        doc.text("STATEMENT SUMMARY :-", startX + 5, finalY);
        finalY += 5;
        
        doc.setFontSize(8);
        const headers = ["Opening Balance", "Dr Count", "Cr Count", "Debits", "Credits", "Closing Bal"];
        const values = ["99,64,999.00", "1", "2", "15,000.00", "50,000.00", "99,99,999.00"];
        
        let sumX = startX + 25;
        for(let i=0; i<headers.length; i++) {
            doc.text(headers[i], sumX, finalY, {align: 'center'});
            doc.setFont("helvetica", "normal");
            doc.text(values[i], sumX, finalY + 4, {align: 'center'});
            doc.setFont("helvetica", "bold");
            sumX += 25;
        }

        // --- FOOTER INFO ---
        finalY += 20;
        doc.setFont("helvetica", "bold");
        doc.text("Generated On: 04-Oct-2026 09:54", startX + 10, finalY);
        doc.text("Generated By: 68898578", startX + 70, finalY);
        doc.text("Requesting Branch Code: NET", startX + 130, finalY);

        // --- DISCLAIMER ---
        finalY += 20;
        doc.setFont("helvetica", "normal");
        doc.text("This is a computer generated statement and does", 196, finalY, {align: 'right'});
        doc.text("not require signature.", 196, finalY + 5, {align: 'right'});

        finalY += 25;
        doc.setTextColor(0, 0, 200);
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold");
        doc.text("HDFC BANK LIMITED", startX, finalY);
        doc.setFont("helvetica", "normal");
        doc.text("*Closing balance includes funds earmarked for hold and uncleared funds", startX, finalY + 4);
        doc.text("Contents of this statement will be considered correct if no error is reported within 30 days of receipt of statement.", startX, finalY + 8);

        doc.save('HDFC_Statement.pdf');
    });
});
