document.addEventListener('DOMContentLoaded', () => {
    const balanceToggle = document.getElementById('balanceToggle');
    const displayBalance = document.getElementById('displayBalance');

    if(balanceToggle && displayBalance) {
        balanceToggle.addEventListener('change', (e) => {
            if(e.target.checked) {
                displayBalance.textContent = `₹${HDFC_MOCK_DATA.account.balanceStr}/-`;
            } else {
                displayBalance.textContent = 'XXXXXXXX';
            }
        });
    }

    // Quick Transfer logic
    const quickProceedBtn = document.getElementById('quickProceedBtn');
    const successModal = document.getElementById('successModal');
    const quickFromAcc = document.getElementById('quickFromAcc');
    
    // Populate the dropdown with mock data account
    if(quickFromAcc) {
        quickFromAcc.innerHTML = `<option value="${HDFC_MOCK_DATA.account.accountNo}">${HDFC_MOCK_DATA.account.accountNo} - ₹${HDFC_MOCK_DATA.account.balanceStr}</option>`;
    }
    
    if(quickProceedBtn) {
        quickProceedBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const amount = document.getElementById('quickAmount').value;
            const toAcc = document.getElementById('quickToAcc').value || 'Selected Payee';
            const transferType = document.getElementById('quickTransferType').value;
            
            if(!amount || amount <= 0) { return; }
            
            const txnDetails = {
                type: transferType,
                refNo: transferType.charAt(0) + Math.floor(Math.random() * 1000000000),
                date: new Date().toLocaleString(),
                fromAccount: HDFC_MOCK_DATA.account.accountNo,
                toAccount: toAcc,
                payeeName: 'Quick Payee',
                amount: amount,
                remarks: 'Quick Transfer'
            };
            
            // Show Loading Overlay
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';
            loadingOverlay.innerHTML = '<div class="spinner"></div><h3 style="color:#004b8f;">Processing Transaction...</h3><p style="color:#666;font-size:14px;margin-top:10px;">Please do not refresh the page.</p>';
            document.body.appendChild(loadingOverlay);
            loadingOverlay.style.display = 'flex';
            
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
                loadingOverlay.remove();
                
                if (successModal) {
                    document.getElementById('modalRefNo').textContent = txnDetails.refNo;
                    document.getElementById('modalAmount').textContent = '₹' + txnDetails.amount;
                    successModal.style.display = 'flex';
                    
                    const btnDownload = document.getElementById('btnDownloadSlip');
                    btnDownload.onclick = () => {
                        if (typeof generateSlipAndZip === 'function') generateSlipAndZip(txnDetails);
                    };
                }
            }, 2000);
        });
    }
});
