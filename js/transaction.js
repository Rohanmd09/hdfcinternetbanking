document.addEventListener('DOMContentLoaded', () => {
    // Shared Transaction Form Logic
    const form = document.getElementById('transferForm');
    const successModal = document.getElementById('successModal');
    
    if (form) {
        // Pre-fill from account
        const fromAccSelect = document.getElementById('fromAccount');
        if (fromAccSelect) {
            fromAccSelect.innerHTML = `<option value="${HDFC_MOCK_DATA.account.accountNo}">${HDFC_MOCK_DATA.account.accountNo} - ₹${HDFC_MOCK_DATA.account.balanceStr}</option>`;
        }
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Collect Data
            const type = document.getElementById('txnType').value;
            const payeeName = document.getElementById('payeeName') ? document.getElementById('payeeName').value : '';
            const toAccount = document.getElementById('toAccount').value;
            const amount = document.getElementById('amount').value;
            const remarks = document.getElementById('remarks').value;
            
            const refNo = `${type.charAt(0)}${Math.floor(Math.random() * 1000000000)}`;
            const dateStr = new Date().toLocaleString();
            
            const txnDetails = {
                type: type,
                refNo: refNo,
                date: dateStr,
                fromAccount: HDFC_MOCK_DATA.account.accountNo,
                toAccount: toAccount,
                payeeName: payeeName || 'N/A',
                amount: amount,
                remarks: remarks || 'N/A'
            };
            
            // Show Loading Overlay
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';
            loadingOverlay.innerHTML = '<div class="spinner"></div><h3 style="color:#004b8f;">Processing Transaction...</h3><p style="color:#666;font-size:14px;margin-top:10px;">Please do not refresh the page.</p>';
            document.body.appendChild(loadingOverlay);
            loadingOverlay.style.display = 'flex';
            
            // Simulate API delay
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                loadingOverlay.remove();
                
                // Show Success Modal
                if (successModal) {
                    document.getElementById('modalRefNo').textContent = txnDetails.refNo;
                    document.getElementById('modalAmount').textContent = `₹${txnDetails.amount}`;
                    successModal.style.display = 'flex';
                    
                    // Bind Download button
                    const btnDownload = document.getElementById('btnDownloadSlip');
                    btnDownload.onclick = () => {
                        generateSlipAndZip(txnDetails);
                    };
                }
            }, 2500);
        });
    }
});
